/* ============================================================
   <footer> — global NoPing footer component
   Inject into any page with `<footer id="global-footer"></footer>`
   then call `initFooter('#global-footer')`
   ============================================================ */

(function (global) {
  'use strict';

  function detectBase() {
    const path = global.location.pathname.replace(/\\/g, '/');
    const segments = path.split('/').slice(0, -1).filter(Boolean);
    const knownPages = new Set(['affiliates','download','games','support','prices','claro']);
    const lastSegment = segments[segments.length - 1] || '';
    if (knownPages.has(lastSegment)) return '../';
    return '';
  }

  // ---------- Footer link columns (data) ----------
  const COLUMNS = [
    {
      title: 'NOPING', links: [
        ['Servidores', '#'],
        ['Jogos', '__BASE__games/index.html'],
        ['Preços', '__BASE__prices/index.html'],
        ['Download', '__BASE__download/index.html'],
        ['Teste Grátis', '#trial'],
        ['Trabalhe Conosco', '#'],
        ['Programa de Teste Beta', '#']
      ]
    },
    {
      title: 'TECNOLOGIA', links: [
        ['Conexão MultiPath', '#'],
        ['Multi Internets', '#'],
        ['Boost FPS', '#'],
        ['Redução de Ping', '#'],
        ['Correção de Perda de Pacotes', '#'],
        ['Correção de Desconexão', '#'],
        ['Correção de Picos de Ping', '#'],
        ['Melhoria de Velocidade do Teclado', '#'],
        ['Estatísticas Abrangentes', '#'],
        ['Monitoramento de Conexão', '#'],
        ['Troca Manual de Servidor', '#'],
        ['IP Block', '#'],
        ['Otimização de DNS', '#'],
        ['AudioPad', '#'],
        ['Green Aim', '#'],
        ['Pro Settings', '#']
      ]
    },
    {
      title: 'AJUDA', links: [
        ['Tutorial Windows', '#'],
        ['Tutorial Console', '#'],
        ['Tutorial IOS', '#'],
        ['Tutorial Android', '#'],
        ['Centro de Suporte', '__BASE__support/index.html'],
        ['Contato B2B', '#'],
        ['Política de Privacidade', '#'],
        ['Termos de Uso', '#'],
        ['Afiliados', '__BASE__affiliates/index.html'],
        ['FAQ', '#faq']
      ]
    },
    {
      title: 'BLOG', links: [
        ['Como Aumentar o FPS', '#'],
        ['Como Tirar o Lag', '#'],
        ['Dicas para Gamers', '#'],
        ['Notícias NoPing', '#'],
        ['Atualizações do App', '#']
      ]
    },
    {
      title: 'FEEDBACKS', links: [
        ['Avalie Nossa Plataforma', '#'],
        ['Sugestão de Funcionalidade', '#']
      ],
      langPill: true
    }
  ];

  // ---------- Social icons (inline SVG, stroke=primary green) ----------
  const SOCIALS = [
    { label: 'TikTok',    line1: 'SIGA-NOS NO', line2: 'TIK TOK', svg: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>' },
    { label: 'LinkedIn',  line1: 'SIGA-NOS NO', line2: 'LINKEDIN', svg: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>' },
    { label: 'Facebook',  line1: 'SIGA-NOS NO', line2: 'FACEBOOK', svg: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>' },
    { label: 'Discord',   line1: 'COMUNIDADE',  line2: 'NO DISCORD', svg: '<path d="M9 12h.01M15 12h.01"/><path d="M7.5 4.2c-1.8.8-3.4 2-4.5 3.5-1.5 3.8-1.7 8.5-.6 12.1 1.6 1.4 3.7 2.2 5.6 2.2 0 0 1-1.2 1.8-2-1.5-.4-2.8-1.2-3.8-2.2 2 .5 4 1 6 1s4-.5 6-1c-1 1-2.3 1.8-3.8 2.2.8.8 1.8 2 1.8 2 1.9 0 4-.8 5.6-2.2 1.1-3.6.9-8.3-.6-12.1-1.1-1.5-2.7-2.7-4.5-3.5-1-.2-2-.3-3-.3-1 0-2 .1-3 .3z"/>' },
    { label: 'Instagram', line1: 'SIGA-NOS NO', line2: 'INSTAGRAM', svg: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>' },
    { label: 'X',         line1: 'SIGA-NOS NO', line2: 'X',         svg: '<path d="M4 4l11.73 16h4.27L8.27 4zm16 0L4 20"/>' }
  ];

  function renderColumn(col, base) {
    const links = col.links.map(([label, href]) => {
      const finalHref = (href || '#').replace('__BASE__', base);
      return `<a href="${finalHref}" class="footer__link">${label}</a>`;
    }).join('');
    const langPill = col.langPill ? `
      <button class="footer__lang-badge" type="button" aria-label="Idioma">
        <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/br.svg" alt="BR">
        <span>PT</span>
        <span aria-hidden="true">▸</span>
      </button>` : '';
    return `
      <div class="footer__column">
        <h4 class="footer__column-title">${col.title}</h4>
        ${links}
        ${langPill}
      </div>`;
  }

  function renderSocials() {
    return SOCIALS.map(s => `
      <a href="#" class="footer__social-link" aria-label="${s.label}">
        <span class="footer__social-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#93ff18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${s.svg}</svg>
        </span>
        <span class="footer__social-label">${s.line1}<br>${s.line2}</span>
      </a>
    `).join('');
  }

  /**
   * Initialize the global footer by replacing the placeholder element.
   *
   * @param {string} selector
   * @param {object} [opts]
   * @param {string} [opts.assetBase] — override the detected base path.
   * @param {boolean} [opts.compact]  — if true, omit the promo/guides region.
   */
  function initFooter(selector, opts) {
    const el = document.querySelector(selector);
    if (!el) return;
    opts = opts || {};
    const base = (opts.assetBase != null ? opts.assetBase : detectBase());

    const promoBlock = opts.compact ? '' : `
      <div class="footer__promo">
        <h3 class="footer__promo-title">Pronto pra tirar o lag?</h3>
        <p class="footer__promo-text">Jogue com ping baixo em +3.000 jogos. Rota otimizada por IA, Boost FPS automático e Multi Conexão por 5 rotas. Teste 1 dia grátis, sem cartão.</p>
        <div class="footer__promo-actions">
          <a href="${base}#trial" class="footer__promo-btn">COMEÇAR 1 DIA GRÁTIS (SEM CARTÃO)</a>
          <div class="footer__promo-rating">
            <div class="footer__promo-stars">★★★★★</div>
            <p class="footer__promo-rating-text"><strong>4,9/5</strong> em +20.000 avaliações • +3M players • 10 anos no mercado</p>
          </div>
        </div>
      </div>
      <div class="footer__guides">
        <h4 class="footer__guides-title">GUIA DE PERFORMANCE ONLINE</h4>
        <div class="footer__guides-list">
          <a href="#">Guia Completo para Tirar o Lag em Jogos Online: Dicas e Soluções</a>
          <a href="#">Guia Completo para Entender e Acabar com o Jitter em Jogos: Dicas e Soluções</a>
          <a href="#">Estabilidade de Conexão em Jogos Competitivos: Por Que Cada Ms Conta</a>
          <a href="#">Como Melhorar o Ping e a Experiência de Jogo: Guia Prático</a>
          <a href="#">Dicas para Corrigir o Packet Loss e Melhorar Seu Desempenho em Jogos Online</a>
        </div>
      </div>`;

    el.outerHTML = `
      <section class="section-footer">
      <footer class="footer" id="footer">
        <div class="footer__container">
          <div class="footer__certificates">
            <div class="footer__certificates-left">
              <span class="footer__certificates-text">Certificado por</span>
              <div class="footer__certificates-logos">
                <img src="${base}src/assets/shared/footer/svg_microsoft_certified.svg" alt="Microsoft Certified" class="footer__cert-logo" style="height: 56px;">
                <img src="${base}src/assets/shared/footer/svg_digicert.svg" alt="DigiCert Secured" class="footer__cert-logo" style="height: 44px;">
                <img src="${base}src/assets/shared/footer/svg_googlecloud.svg" alt="Google Cloud" class="footer__cert-logo" style="height: 32px;">
              </div>
            </div>
            <div class="footer__certificates-right">
              <a href="#" class="footer__store-btn" aria-label="App Store"><img src="${base}src/assets/shared/footer/app-store.svg" alt="App Store"></a>
              <a href="#" class="footer__store-btn" aria-label="Google Play"><img src="${base}src/assets/shared/footer/google-play.svg" alt="Google Play"></a>
            </div>
          </div>
          <div class="footer__certificates-divider"></div>

          <div class="footer__top">
            <div class="footer__brand">
              <div class="footer__brand-logos">
                <img src="${base}src/assets/logos/logo-noping-dark.svg" alt="NoPing" class="footer__brand-logo">
              </div>
              ${promoBlock}
            </div>
            ${COLUMNS.map(c => renderColumn(c, base)).join('')}
          </div>

          <div class="footer__divider"></div>

          <div class="footer__bottom">
            <p class="footer__copyright">Direitos autorais 2026 © NOPING - INCRÍVEL SISTEMAS, INC</p>
            <div class="footer__socials">
              ${renderSocials()}
            </div>
          </div>
        </div>
      </footer>
      </section>
    `;
  }

  global.NoPingFooter = { init: initFooter };
  global.initFooter   = initFooter; // backward-compat
})(window);
