/* ============================================================
   main.js — boots the shared chrome on every page.
   Page-specific scripts live in /src/scripts/pages/<name>.js
   and run AFTER this file. They can read `window.NoPingPage`
   for the page key the host HTML declared via:
       <body data-page="afiliados">
   ============================================================ */

(function (global) {
  'use strict';

  function getPageKey() {
    const el = document.querySelector('[data-page]');
    return el ? el.getAttribute('data-page') : '';
  }

  function boot() {
    const pageKey = getPageKey();
    global.NoPingPage = pageKey;

    // ---------- Global header + footer ----------
    if (global.NoPingHeader && typeof global.NoPingHeader.init === 'function') {
      global.NoPingHeader.init('#global-header', { active: pageKey });
    }
    if (global.NoPingFooter && typeof global.NoPingFooter.init === 'function') {
      global.NoPingFooter.init('#global-footer');
    }

    // ---------- Navigation chrome (lang toggle, scrolled state) ----------
    if (global.NoPingNav && typeof global.NoPingNav.init === 'function') {
      global.NoPingNav.init();
    }

    // ---------- Smooth anchor scroll for in-page hash links ----------
    if (global.NoPingButtons && typeof global.NoPingButtons.smoothAnchors === 'function') {
      global.NoPingButtons.smoothAnchors(document);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
