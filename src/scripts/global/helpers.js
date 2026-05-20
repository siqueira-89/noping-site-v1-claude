/* ============================================================
   Global helpers — tiny pure utilities used by everything else
   ============================================================ */

(function (global) {
  'use strict';

  const helpers = {
    /**
     * Query single — wrapped to never throw on a missing root.
     */
    $(sel, root) { return (root || document).querySelector(sel); },

    /**
     * Query all — returns a real Array.
     */
    $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); },

    /**
     * Throttle a function to at most one call per `wait` ms.
     */
    throttle(fn, wait) {
      let last = 0, timer;
      return function (...args) {
        const now = Date.now();
        const remaining = wait - (now - last);
        if (remaining <= 0) {
          if (timer) { clearTimeout(timer); timer = null; }
          last = now;
          fn.apply(this, args);
        } else if (!timer) {
          timer = setTimeout(() => { last = Date.now(); timer = null; fn.apply(this, args); }, remaining);
        }
      };
    },

    /**
     * Debounce a function — only fires after `wait` ms of silence.
     */
    debounce(fn, wait) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
      };
    },

    /**
     * Determine the relative path back to the project root from
     * the currently-loaded HTML file. Returns '' or '../'.
     */
    detectBase() {
      const path = global.location.pathname.replace(/\\/g, '/');
      const segments = path.split('/').slice(0, -1).filter(Boolean);
      const lastSegment = segments[segments.length - 1] || '';
      const knownPages = new Set(['afiliados', 'downloads', 'jogos', 'suporte', 'precos']);
      return knownPages.has(lastSegment) ? '../' : '';
    },

    /**
     * Read a `data-*` attribute parsed as JSON, with a fallback.
     */
    readData(el, attr, fallback) {
      try {
        const raw = el.getAttribute('data-' + attr);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    }
  };

  global.NPHelpers = helpers;
  global.$  = helpers.$;
  global.$$ = helpers.$$;
})(window);
