/* ============================================================
   FAQ — accordion component
   Looks for elements matching `.faq-item` with a `.faq-trigger`.
   Clicking the trigger toggles `.active` and closes its siblings.
   ============================================================ */

(function (global) {
  'use strict';

  /**
   * Initialize FAQ accordion(s) inside a root element.
   *
   * @param {string|Element} [rootSel='document'] — container; defaults to document.
   * @param {object} [opts]
   * @param {boolean} [opts.exclusive=true] — if true, only one item open at a time.
   * @param {string}  [opts.itemSel='.faq-item']
   * @param {string}  [opts.triggerSel='.faq-trigger']
   */
  function initFAQ(rootSel, opts) {
    opts = Object.assign({
      exclusive:  true,
      itemSel:    '.faq-item',
      triggerSel: '.faq-trigger'
    }, opts || {});

    const root = typeof rootSel === 'string' ? document.querySelector(rootSel) : (rootSel || document);
    if (!root) return;

    root.querySelectorAll(opts.triggerSel).forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest(opts.itemSel);
        if (!item) return;
        const wasActive = item.classList.contains('active');

        if (opts.exclusive) {
          root.querySelectorAll(opts.itemSel).forEach(i => i.classList.remove('active'));
        }
        if (!wasActive) item.classList.add('active');
      });
    });
  }

  global.NoPingFAQ = { init: initFAQ };
  global.initFAQ   = initFAQ;
})(window);
