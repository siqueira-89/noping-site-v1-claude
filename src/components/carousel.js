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

    function autoTick() {
      if (isInteracting) return;
      const max = container.scrollWidth - container.clientWidth;
      const atEnd = container.scrollLeft >= max - 4;
      if (atEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cfg.scrollAmount, behavior: 'smooth' });
      }
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
