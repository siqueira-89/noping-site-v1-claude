/* ============================================================
   <header> — global NoPing header component
   Inject into any page with `<header id="global-header"></header>`
   then call `initHeader('#global-header', { active: 'affiliates' })`
   ============================================================ */

(function (global) {
  'use strict';

  // Nav config — single source of truth.
  // Order matches the design reference (affiliates page).
  const NAV = [
    { key: 'games',      label: 'JOGOS',     href: '__BASE__games/index.html' },
    { key: 'prices',     label: 'PREÇOS',    href: '__BASE__prices/index.html',     highlight: true },
    { key: 'download',   label: 'DOWNLOAD',  href: '__BASE__download/index.html' },
    { key: 'affiliates', label: 'AFILIADOS', href: '__BASE__affiliates/index.html' },
    { key: 'support',    label: 'SUPORTE',   href: '__BASE__support/index.html' },
    { key: 'blog',       label: 'BLOG',      href: '__BASE__claro/index.html' }
  ];

  /**
   * Compute the base path that routes back to the project root from
   * the current page. For "/index.html" this is "" — for "/games/index.html"
   * it is "../". This keeps the header working both at site root and
   * inside any /<page>/ folder.
   */
  function detectBase() {
    const path = global.location.pathname.replace(/\\/g, '/');
    // Strip filename, count remaining segments (excluding empty).
    const segments = path.split('/').slice(0, -1).filter(Boolean);
    // If served as a flat file (file://), there is no concept of "root"
    // beyond the parent folder of the current HTML — so we walk up 1 level
    // per route segment matching a known page key. Otherwise the URL is
    // already absolute to the site root, walk up `segments.length` parents
    // when we are deeper than the project root.
    const knownPages = new Set(NAV.map(n => n.key).concat(['affiliates','download','games','support','prices','claro']));
    // Find the deepest "page folder" — assume project root is one above it.
    const lastSegment = segments[segments.length - 1] || '';
    if (knownPages.has(lastSegment)) return '../';
    return '';
  }

  /**
   * Initialize the global header by replacing the placeholder element.
   *
   * @param {string} selector — CSS selector for the <header> placeholder.
   * @param {object} [opts]
   * @param {string} [opts.active] — key of the active nav item (e.g. 'affiliates').
   * @param {string} [opts.assetBase] — override the asset base (defaults to detected).
   */
  function initHeader(selector, opts) {
    const el = document.querySelector(selector);
    if (!el) return;

    opts = opts || {};
    const base = (opts.assetBase != null ? opts.assetBase : detectBase());
    const active = opts.active || el.getAttribute('data-active') || '';

    const navHTML = NAV.map(item => {
      const href = item.href.replace('__BASE__', base);
      const classes = ['header__nav-link'];
      if (item.highlight) classes.push('highlight-pulse');
      if (active && active === item.key) classes.push('on');
      return `<a href="${href}" class="${classes.join(' ')}">${item.label}</a>`;
    }).join('');

    el.outerHTML = `
      <header class="header" id="header">
        <div class="header__inner">
          <div class="header__left">
            <a href="${base}index.html" class="header__logo" id="header-logo" aria-label="NoPing">
              <img src="${base}src/assets/logos/logo-noping-dark.svg" alt="NoPing" class="header__logo-noping">
            </a>
            <nav class="header__nav-left" id="header-nav" aria-label="Principal">
              ${navHTML}
            </nav>
          </div>
          <div class="header__right">
            <button class="header__lang" id="lang-toggle" aria-label="Idioma" type="button">
              <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/br.svg" alt="BR">
              <span>PT</span>
              <span aria-hidden="true">▸</span>
            </button>
            <a href="${base}#login" class="header__nav-link">LOGIN</a>
            <a href="${base}#trial" class="header__cta-btn">TESTE GRÁTIS</a>
          </div>
        </div>
      </header>
    `;
  }

  // Expose
  global.NoPingHeader = { init: initHeader, NAV };
  global.initHeader   = initHeader; // backward-compat
})(window);
