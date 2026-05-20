/* ============================================================
   /support — page script
   Wires the global FAQ accordion behaviour to both the topic
   buttons in the hero AND the standard FAQ section below.
   Both blocks render the same `.faq-item / .faq-trigger /
   .faq-content` markup so the same JS works on both.
   ============================================================ */

(function () {
  'use strict';

  function boot() {
    if (window.NoPingFAQ && NoPingFAQ.init) {
      // Topic buttons in the hero — collapsible like the global FAQ.
      NoPingFAQ.init('.support-topics__list');
      // Standard FAQ section below.
      NoPingFAQ.init('.section-four .faq-accordion');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
