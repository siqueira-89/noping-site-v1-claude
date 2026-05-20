/* ============================================================
   /affiliates — page-specific behavior
   - Ambassadors fade rotator
   - Affiliate cards carousel + progress bar
   - FAQ accordion
   - Hero particles canvas
   ============================================================ */

(function () {
  'use strict';

  function boot() {
    // Ambassadors fade rotator (right-side hero ambassadors).
    if (window.NoPingCarousel && NoPingCarousel.fadeRotator) {
      NoPingCarousel.fadeRotator('.ambassadors-right', { interval: 4000 });
    }

    // Affiliates horizontal carousel + progress thumb.
    if (window.NoPingCarousel && NoPingCarousel.init) {
      NoPingCarousel.init({
        container: '#affiliates-carousel-container',
        track:     '#affiliates-track',
        thumb:     '#affiliates-progress-thumb',
        autoDelay: 4000,
        scrollAmount: 330
      });
    }

    // FAQ accordion.
    if (window.NoPingFAQ && NoPingFAQ.init) {
      NoPingFAQ.init('.faq-accordion');
    }

    // Hero particles canvas — use the rich data-pulse engine
    // (same effect as the /download page hero).
    if (window.NoPingFX && NoPingFX.dataParticles) {
      NoPingFX.dataParticles('#hero-particles');
    } else if (window.NoPingFX && NoPingFX.particles) {
      NoPingFX.particles('#hero-particles');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
