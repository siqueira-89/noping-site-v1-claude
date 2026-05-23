/* ============================================================
   Carousel — horizontal auto-scrolling track with progress thumb
   Used by /affiliates (affiliate testimonial cards).
   ============================================================ */

(function (global) {
  'use strict';

  /**
   * Initialize an auto-scrolling horizontal carousel.
   *
   * @param {object} opts
   * @param {string|Element} opts.container  — scroll container (overflow-x auto)
   * @param {string|Element} opts.track      — the inner row of cards
   * @param {string|Element} opts.thumb      — the progress thumb element
   * @param {number} [opts.autoDelay=4000]   — ms between auto-scroll ticks
   * @param {number} [opts.scrollAmount=320] — px to scroll each tick
   */
  function initCarousel(opts) {
    const container = typeof opts.container === 'string' ? document.querySelector(opts.container) : opts.container;
    const track     = typeof opts.track     === 'string' ? document.querySelector(opts.track)     : opts.track;
    const thumb     = typeof opts.thumb     === 'string' ? document.querySelector(opts.thumb)     : opts.thumb;
    if (!container || !track || !thumb) return;

    const cfg = Object.assign({ autoDelay: 4000, scrollAmount: 320 }, opts);

    let isInteracting = false;
    let scrollTimer = null;

    function updateProgress() {
      const max = container.scrollWidth - container.clientWidth;
      if (max <= 0) {
        thumb.style.width = '100%';
        thumb.style.left = '0';
        return;
      }
      const ratio = container.scrollLeft / max;
      const trackWidth = thumb.parentElement.clientWidth;
      const visible = Math.max(30, Math.min(80, (container.clientWidth / container.scrollWidth) * 100));
      thumb.style.width = visible + '%';
      thumb.style.left  = ((trackWidth - (trackWidth * visible / 100)) * ratio) + 'px';
    }

    /* Measure the real per-card step (card width + flex gap) from the DOM
       so every auto-scroll tick snaps to a card boundary. Falls back to
       the cfg.scrollAmount if we can't read two cards yet. */
    function getStep() {
      const cards = track.children;
      if (cards.length >= 2) {
        const a = cards[0].getBoundingClientRect();
        const b = cards[1].getBoundingClientRect();
        const s = b.left - a.left;
        if (s > 0) return s;
      }
      return cfg.scrollAmount;
    }

    function autoTick() {
      if (isInteracting) return;
      const max = container.scrollWidth - container.clientWidth;
      if (max <= 0) return;
      // already parked at the last stage → wrap back to the start
      if (container.scrollLeft >= max - 2) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      const step = getStep();
      // Snap to the next card boundary (round to current stage, then +1).
      // Clamping to `max` keeps the final stage exactly at the end so
      // the trailing cards stay whole — no progressive misalignment.
      const stage = Math.round(container.scrollLeft / step);
      const nextLeft = Math.min(max, (stage + 1) * step);
      container.scrollTo({ left: nextLeft, behavior: 'smooth' });
    }

    function start() {
      stop();
      scrollTimer = setInterval(autoTick, cfg.autoDelay);
    }
    function stop() {
      if (scrollTimer) { clearInterval(scrollTimer); scrollTimer = null; }
    }

    container.addEventListener('scroll', updateProgress, { passive: true });
    container.addEventListener('mouseenter', () => { isInteracting = true; });
    container.addEventListener('mouseleave', () => { isInteracting = false; });
    container.addEventListener('touchstart', () => { isInteracting = true; }, { passive: true });
    container.addEventListener('touchend',   () => { isInteracting = false; }, { passive: true });
    global.addEventListener('resize', updateProgress);

    /* ----- Drag-to-scroll on the carousel (mouse + touch) ----- */
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let pointerMoved = false;

    function onDragStart(e) {
      dragging = true;
      pointerMoved = false;
      isInteracting = true;
      startX = (e.touches ? e.touches[0].pageX : e.pageX) - container.offsetLeft;
      startScroll = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.scrollBehavior = 'auto';
    }
    function onDragMove(e) {
      if (!dragging) return;
      const x = (e.touches ? e.touches[0].pageX : e.pageX) - container.offsetLeft;
      const delta = x - startX;
      if (Math.abs(delta) > 4) pointerMoved = true;
      container.scrollLeft = startScroll - delta;
      if (e.cancelable) e.preventDefault();
    }
    function onDragEnd() {
      if (!dragging) return;
      dragging = false;
      container.style.cursor = '';
      container.style.scrollBehavior = '';
      // small delay before auto-scroll resumes so the user feels in control
      setTimeout(() => { isInteracting = false; }, 800);
    }

    container.style.cursor = 'grab';
    container.addEventListener('mousedown', onDragStart);
    container.addEventListener('mousemove', onDragMove);
    container.addEventListener('mouseup',   onDragEnd);
    container.addEventListener('mouseleave', onDragEnd);
    container.addEventListener('touchstart', onDragStart, { passive: true });
    container.addEventListener('touchmove',  onDragMove,  { passive: false });
    container.addEventListener('touchend',   onDragEnd);
    // suppress click-through on dragged anchors
    container.addEventListener('click', (e) => {
      if (pointerMoved) { e.preventDefault(); e.stopPropagation(); pointerMoved = false; }
    }, true);

    /* ----- Drag the progress thumb to scroll the carousel ----- */
    let thumbDragging = false;
    let thumbStartX = 0;
    let scrollStartLeft = 0;

    function onThumbDragStart(e) {
      thumbDragging = true;
      isInteracting = true;
      thumbStartX = e.touches ? e.touches[0].pageX : e.pageX;
      scrollStartLeft = container.scrollLeft;
      container.style.scrollBehavior = 'auto';
      if (e.cancelable) e.preventDefault();
    }
    function onThumbDragMove(e) {
      if (!thumbDragging) return;
      const x = e.touches ? e.touches[0].pageX : e.pageX;
      const trackWidth = thumb.parentElement.clientWidth;
      const visible = thumb.offsetWidth;
      const maxThumbTravel = trackWidth - visible;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const deltaX = x - thumbStartX;
      // map thumb pixel movement to scroll position
      const scrollRatio = maxThumbTravel > 0 ? (deltaX / maxThumbTravel) : 0;
      container.scrollLeft = scrollStartLeft + scrollRatio * maxScroll;
    }
    function onThumbDragEnd() {
      if (!thumbDragging) return;
      thumbDragging = false;
      container.style.scrollBehavior = '';
      setTimeout(() => { isInteracting = false; }, 800);
    }

    thumb.style.cursor = 'grab';
    thumb.addEventListener('mousedown', onThumbDragStart);
    global.addEventListener('mousemove', onThumbDragMove);
    global.addEventListener('mouseup',   onThumbDragEnd);
    thumb.addEventListener('touchstart', onThumbDragStart, { passive: false });
    global.addEventListener('touchmove',  onThumbDragMove, { passive: false });
    global.addEventListener('touchend',   onThumbDragEnd);

    setTimeout(() => { updateProgress(); start(); }, 100);

    return { start, stop, update: updateProgress };
  }

  /**
   * Initialize an ambassador fade-rotator (3-up card fade through items).
   * Used in the /affiliates hero ambassadors block.
   *
   * @param {string|Element} containerSel — wrapper holding `.ambassador-fade-item` children
   * @param {object} [opts]
   * @param {number} [opts.interval=4000]
   */
  function initFadeRotator(containerSel, opts) {
    opts = Object.assign({ interval: 4000 }, opts || {});
    const root = typeof containerSel === 'string' ? document.querySelector(containerSel) : containerSel;
    if (!root) return;
    const items = Array.from(root.querySelectorAll('.ambassador-fade-item'));
    if (items.length < 2) return;

    let idx = items.findIndex(i => i.classList.contains('active'));
    if (idx < 0) idx = 0;

    function paint() {
      items.forEach((it, i) => {
        it.classList.remove('active', 'next', 'prev');
        if (i === idx) it.classList.add('active');
        else if (i === (idx + 1) % items.length) it.classList.add('next');
        else if (i === (idx - 1 + items.length) % items.length) it.classList.add('prev');
      });
    }
    paint();

    const timer = setInterval(() => {
      idx = (idx + 1) % items.length;
      paint();
    }, opts.interval);

    return { stop: () => clearInterval(timer) };
  }

  global.NoPingCarousel = { init: initCarousel, fadeRotator: initFadeRotator };
})(window);
