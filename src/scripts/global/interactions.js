/* ============================================================
   Interactions — reusable visual effects (particles canvas,
   pulse halos, etc.) that any page can opt into.
   ============================================================ */

(function (global) {
  'use strict';

  /**
   * Render a soft floating-particles canvas inside its parent
   * with line connections at close distances. Used as a subtle
   * decoration behind hero sections.
   *
   * @param {string|HTMLCanvasElement} canvasSel
   * @param {object} [opts]
   * @param {number} [opts.count=40]
   * @param {string} [opts.color='rgba(147,255,24,0.4)']
   * @param {string} [opts.lineColor='rgba(147,255,24,0.08)']
   * @param {number} [opts.maxLinkDist=120]
   */
  function initParticles(canvasSel, opts) {
    const canvas = typeof canvasSel === 'string' ? document.querySelector(canvasSel) : canvasSel;
    if (!canvas || !canvas.getContext) return;

    const cfg = Object.assign({
      count: 40,
      color: 'rgba(147,255,24,0.4)',
      lineColor: 'rgba(147,255,24,0.08)',
      maxLinkDist: 120
    }, opts || {});

    const ctx = canvas.getContext('2d');
    const particles = [];

    function resize() {
      const parent = canvas.parentElement || document.body;
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }
    resize();
    global.addEventListener('resize', resize);

    for (let i = 0; i < cfg.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.5 + 0.5
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = cfg.color;
      ctx.strokeStyle = cfg.lineColor;

      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < cfg.maxLinkDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  global.NoPingFX = {
    particles: initParticles,
    dataParticles: initDataParticles
  };

  /**
   * Rich data-pulse particle engine.
   *
   * The "premium" hero canvas effect — mouse-reactive data pulses
   * that propagate through neighboring nodes. Originally written
   * for the /download page; extracted here so any page can reuse
   * the EXACT same effect (no reimplementation, no simplification).
   *
   * @param {string|HTMLCanvasElement} canvasSel
   */
  function initDataParticles(canvasSel) {
    const canvas = typeof canvasSel === 'string' ? document.querySelector(canvasSel) : canvasSel;
    if (!canvas || !canvas.getContext) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles;
    let pulses = [];
    let mouseX = -9999;
    let mouseY = -9999;

    const CONFIG = {
      densityFactor: 0.00004,
      minCount: 20,
      maxCount: 60,
      color: { r: 147, g: 255, b: 24 },
      minSize: 0.8,
      maxSize: 2.2,
      minOpacity: 0.08,
      maxOpacity: 0.35,
      minSpeed: 0.15,
      maxSpeed: 0.45,
      linkDistance: 140,
      linkOpacity: 0.12,
      linkWidth: 0.6,
      pulseSpeed: 0.008,
      dataPulseSpeed: 0.03,
      dataPulseSize: 2,
      dataPulseOpacity: 0.8,
      dataPulseMaxDepth: 2,
      mouseThreshold: 25
    };

    function updateMouse(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    global.addEventListener('mousemove', updateMouse);
    global.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

    function getDistSq(p1, p2) { return (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2; }
    function getDistToSegment(p, v, w) {
      const l2 = getDistSq(v, w);
      if (l2 === 0) return Math.sqrt(getDistSq(p, v));
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      const projection = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
      return Math.sqrt(getDistSq(p, projection));
    }

    class DataPulse {
      constructor(startNode, endNode, depth = 0, history = []) {
        this.startNode = startNode;
        this.endNode   = endNode;
        this.progress  = 0;
        this.depth     = depth;
        this.history   = [...history, startNode];
        this.finished  = false;
      }
      update() {
        this.progress += CONFIG.dataPulseSpeed;
        if (this.progress >= 1) {
          this.progress = 1;
          this.finished = true;
          this.propagate();
        }
      }
      propagate() {
        if (this.depth >= CONFIG.dataPulseMaxDepth) return;
        for (let i = 0; i < particles.length; i++) {
          const neighbor = particles[i];
          if (neighbor === this.endNode || this.history.includes(neighbor)) continue;
          const distSq = getDistSq(this.endNode, neighbor);
          if (distSq < CONFIG.linkDistance ** 2) {
            pulses.push(new DataPulse(this.endNode, neighbor, this.depth + 1, this.history));
            if (pulses.length > 25) break;
          }
        }
      }
      draw() {
        const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
        const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
        const { r, g, b } = CONFIG.color;
        const opacity = CONFIG.dataPulseOpacity * (1 - this.depth / (CONFIG.dataPulseMaxDepth + 1));
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, CONFIG.dataPulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    class Particle {
      constructor() { this.reset(true); this.lastPulseTime = 0; }
      reset(initial) {
        this.x = initial ? Math.random() * width : (Math.random() < 0.5 ? -10 : width + 10);
        this.y = Math.random() * height;
        this.size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
        this.baseOpacity = CONFIG.minOpacity + Math.random() * (CONFIG.maxOpacity - CONFIG.minOpacity);
        this.opacity = this.baseOpacity;
        const angle = Math.random() * Math.PI * 2;
        const speed = CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }
      update(time) {
        this.x += this.vx;
        this.y += this.vy;
        const pulse = Math.sin(time * CONFIG.pulseSpeed + this.pulseOffset);
        this.opacity = this.baseOpacity * (0.6 + 0.4 * ((pulse + 1) / 2));
        const margin = 20;
        if (this.x < -margin) this.x = width + margin;
        if (this.x > width + margin) this.x = -margin;
        if (this.y < -margin) this.y = height + margin;
        if (this.y > height + margin) this.y = -margin;
      }
      draw() {
        const { r, g, b } = CONFIG.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.fill();
      }
    }

    function drawLinks() {
      const { r, g, b } = CONFIG.color;
      const maxDist = CONFIG.linkDistance;
      const maxDistSq = maxDist * maxDist;
      const now = Date.now();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distSq = getDistSq(p1, p2);
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = CONFIG.linkOpacity * (1 - dist / maxDist);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            ctx.lineWidth = CONFIG.linkWidth;
            ctx.stroke();
            if (mouseX !== -9999 && pulses.length < 15) {
              const mouseDist = getDistToSegment({ x: mouseX, y: mouseY }, p1, p2);
              if (mouseDist < CONFIG.mouseThreshold) {
                if (now - p1.lastPulseTime > 800 && now - p2.lastPulseTime > 800) {
                  pulses.push(new DataPulse(p1, p2));
                  p1.lastPulseTime = now;
                  p2.lastPulseTime = now;
                }
              }
            }
          }
        }
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width  = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width  = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width  = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const area = width * height;
      const count = Math.floor(area * CONFIG.densityFactor);
      const targetCount = Math.max(CONFIG.minCount, Math.min(CONFIG.maxCount, count));
      if (!particles) {
        particles = [];
        for (let i = 0; i < targetCount; i++) particles.push(new Particle());
      } else {
        while (particles.length < targetCount) particles.push(new Particle());
        while (particles.length > targetCount) particles.pop();
      }
    }

    let frameCount = 0;
    function animate() {
      frameCount++;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) particles[i].update(frameCount);
      drawLinks();
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].update();
        pulses[i].draw();
        if (pulses[i].finished) pulses.splice(i, 1);
      }
      for (let i = 0; i < particles.length; i++) particles[i].draw();
      requestAnimationFrame(animate);
    }

    resize();
    animate();

    let resizeTimer;
    global.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
  }
})(window);
