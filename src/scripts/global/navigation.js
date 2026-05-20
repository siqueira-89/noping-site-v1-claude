/* ============================================================
   Navigation — language toggle, mobile menu hooks, active page
   ============================================================ */

(function (global) {
  'use strict';

  /**
   * Wire up the language toggle in the global header.
   * No-op for now — placeholder that emits a custom event so
   * future i18n logic can hook in without touching the markup.
   */
  function initLanguageToggle() {
    const triggers = document.querySelectorAll('#lang-toggle, .footer__lang-badge');
    triggers.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        global.dispatchEvent(new CustomEvent('np:lang-toggle-requested'));
      });
    });
  }

  /**
   * Hides the header on scroll-down and re-shows it on scroll-up,
   * unless the page is at the very top. Pure scroll-direction
   * detection — keep the chrome subtle.
   */
  function initHeaderScrollChrome() {
    const header = document.getElementById('header');
    if (!header) return;
    let lastY = global.scrollY;
    let ticking = false;

    function onScroll() {
      const y = global.scrollY;
      if (!ticking) {
        requestAnimationFrame(() => {
          if (y > 12) header.classList.add('is-scrolled');
          else        header.classList.remove('is-scrolled');
          lastY = y;
          ticking = false;
        });
        ticking = true;
      }
    }
    global.addEventListener('scroll', onScroll, { passive: true });
  }

  global.NoPingNav = { init() {
    initLanguageToggle();
    initHeaderScrollChrome();
  }};
})(window);
