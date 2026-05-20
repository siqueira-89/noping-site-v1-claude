/* ============================================================
   Buttons — interaction helpers for toggle groups, download
   selectors, segmented controls. Pure DOM, no framework.
   ============================================================ */

(function (global) {
  'use strict';

  /**
   * Make a group of buttons behave like a segmented control —
   * clicking one removes `.active` from siblings and applies it to
   * the clicked button. Emits a `change` event on the group with
   * `{ value }` where value is the data-value attribute of the
   * selected button.
   *
   * @param {string|Element} groupSel — the wrapping element.
   * @param {object} [opts]
   * @param {string} [opts.btnSel] — selector for child buttons.
   * @param {string} [opts.activeClass='active']
   */
  function initToggleGroup(groupSel, opts) {
    opts = Object.assign({ btnSel: 'button, [role="tab"]', activeClass: 'active' }, opts || {});
    const group = typeof groupSel === 'string' ? document.querySelector(groupSel) : groupSel;
    if (!group) return;

    const buttons = group.querySelectorAll(opts.btnSel);
    buttons.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        buttons.forEach(b => b.classList.remove(opts.activeClass));
        btn.classList.add(opts.activeClass);
        const value = btn.dataset.value || btn.dataset.platform || btn.textContent.trim();
        group.dispatchEvent(new CustomEvent('change', { detail: { value, button: btn } }));
      });
    });
  }

  /**
   * Wire up generic anchor smooth-scroll for in-page links.
   * Skip plain '#' (used as placeholders).
   */
  function initSmoothAnchors(rootSel) {
    const root = typeof rootSel === 'string' ? document.querySelector(rootSel) : (rootSel || document);
    if (!root) return;

    root.querySelectorAll('a[href^="#"]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      a.addEventListener('click', e => {
        const id = href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  global.NoPingButtons = { toggleGroup: initToggleGroup, smoothAnchors: initSmoothAnchors };
})(window);
