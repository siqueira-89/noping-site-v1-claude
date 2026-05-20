/* ============================================================
   /index.html — home page script
   NoPing × Claro tutorial: step rendering per platform, dots,
   prev/next, platform toggle, click-to-zoom lightbox.
   ============================================================ */

(function () {
  'use strict';

  // Detect base path so the same script works at site root (/index.html
  // — legacy/redirect) AND at sub-folder routes (/claro/index.html).
  // Mirrors the convention used by header.js / footer.js.
  function detectBase() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const segments = path.split('/').slice(0, -1).filter(Boolean);
    const knownPages = new Set(['affiliates','download','games','support','prices','claro']);
    const lastSegment = segments[segments.length - 1] || '';
    return knownPages.has(lastSegment) ? '../' : '';
  }
  const BASE = detectBase();
  const asset = (p) => BASE + p;

  const tutorialData = {
    desktop: [
      { title: "Acesse o site",        desc: "Entre em noping.com e clique em “Download” no menu superior.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-01.png")] },
      { title: "Baixe o instalador",   desc: "Clique no botão de “Download” e aguarde o arquivo ser baixado.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-02.png")] },
      { title: "Execute o instalador", desc: "Abra o arquivo baixado para iniciar o processo.",            imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-03.png")] },
      { title: "Instale o NoPing",     desc: "Siga as instruções na tela para concluir a instalação.",     imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-04.png")] },
      { title: "Abra o programa",      desc: "Após instalar, execute o NoPing pelo desktop ou menu iniciar.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-05.png")] },
      { title: "Acesse como provedor", desc: "Na tela de login, clique em “Entrar com provedor”.",         imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-06.png")] },
      { title: "Escolha a operadora",  desc: "Você será redirecionado para a nossa página de parceiros. Selecione “Claro” e clique em “Continue”.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-07.png")] },
      { title: "Confirme seu número",  desc: "Insira seu número de celular e clique em “Enviar código” para receber o SMS.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-08.png")] },
      { title: "Confirme o código",    desc: "Insira o código recebido e clique em “Verificar”. Se não funcionar ou expirar, clique em “Reenviar código”.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-09.png")] },
      { title: "Comece a usar",        desc: "Você será redirecionado para a tela inicial do NoPing. Pronto! Agora é só escolher o jogo ou app e clicar em “Otimizar jogo”.", imgs: [asset("src/assets/home/tutorial-steps/web/img-web-step-10.png")] }
    ],
    mobile: [
      { title: "Baixe o aplicativo",   desc: "Acesse a loja do seu celular, procure por “NoPing” e instale o app.", imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-01-ios.png"), asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-01-android.png")] },
      { title: "Abra o NoPing",        desc: "Após a instalação, abra o aplicativo no seu celular.",      imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-02-ios.png"), asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-02-android.png")] },
      { title: "Acesse como provedor", desc: "Na tela de login, toque em “Entrar com provedor”.",         imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-03-both.png")] },
      { title: "Escolha a operadora",  desc: "Você será redirecionado para a nossa página de parceiros. Selecione “Claro” e clique em “Continue”.", imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-04-ios.png"), asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-04-android.png")] },
      { title: "Confirme seu número",  desc: "Insira seu número de celular para receber o SMS.",          imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-05-ios.png"), asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-05-android.png")] },
      { title: "Confirme o código",    desc: "Insira o código recebido e toque em “Verificar”. Se não funcionar ou expirar, toque em “Reenviar código”.", imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-06-ios.png"), asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-06-android.png")] },
      { title: "Acesse o app",         desc: "Você será redirecionado para a tela inicial do NoPing.",    imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-07-both.png")] },
      { title: "Escolha seu jogo",     desc: "Toque no jogo ou app que você deseja otimizar.",            imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-08-both.png")] },
      { title: "Escolha o servidor",   desc: "Toque no servidor com menor latência.",                     imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-09-both.png")] },
      { title: "Comece a jogar",       desc: "Toque em “Otimizar jogo”. Pronto! Agora é só jogar com menos lag.", imgs: [asset("src/assets/home/tutorial-steps/mobile/img-mobile-step-10-both.png")] }
    ]
  };

  let currentPlatform = 'desktop';
  let currentStep    = 1;

  function renderTutorial() {
    const data = tutorialData[currentPlatform];
    const stepsContainer = document.getElementById('tutorial-steps');
    const panelsContainer = document.getElementById('tutorial-panels');
    const stepNumEl = document.getElementById('current-step-num');
    if (!stepsContainer || !panelsContainer) return;

    if (currentStep > data.length) currentStep = data.length;

    let stepsHTML = '';
    let panelsHTML = '';
    let dotsHTML = '';

    data.forEach((step, index) => {
      const stepNum = index + 1;
      const stepActive = stepNum === currentStep ? 'tutorial__step--active' : '';
      const panelActive = stepNum === currentStep ? 'tutorial__panel--active' : '';

      stepsHTML += `
        <button class="tutorial__step ${stepActive}" data-step="${stepNum}" type="button">
          <span class="tutorial__step-num">${stepNum}</span>
          <span class="tutorial__step-label">${step.title}</span>
          <span class="tutorial__step-arrow">›</span>
        </button>`;

      const imageTags = step.imgs.map(src =>
        `<img src="${src}" alt="Passo ${stepNum}" class="click-to-zoom" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px; flex:1;">`
      ).join('');

      panelsHTML += `
        <div class="tutorial__panel ${panelActive}" data-panel="${stepNum}">
          <div class="tutorial__panel-text">
            <h3 class="tutorial__panel-title">${step.title}</h3>
            <p class="tutorial__panel-desc">${step.desc}</p>
          </div>
          <div class="tutorial__panel-preview" style="display:flex; justify-content:center; align-items:center; gap:.5rem; width:100%; height:500px; padding:10px;">
            ${imageTags}
          </div>
        </div>`;

      dotsHTML += `<span class="tutorial__dot ${stepNum === currentStep ? 'tutorial__dot--active' : ''}" data-dot="${stepNum}"></span>`;
    });

    stepsContainer.innerHTML = stepsHTML;
    panelsContainer.innerHTML = panelsHTML;

    const dotsContainer = document.querySelector('.tutorial__dots');
    if (dotsContainer) dotsContainer.innerHTML = dotsHTML;

    if (stepNumEl && stepNumEl.parentNode) {
      stepNumEl.parentNode.innerHTML = `PASSO <span id="current-step-num">${currentStep}</span>/${data.length}`;
    }

    wireStepper();
  }

  function wireStepper() {
    const steps  = document.querySelectorAll('.tutorial__step');
    const panels = document.querySelectorAll('.tutorial__panel');
    const dots   = document.querySelectorAll('.tutorial__dot');
    const stepNumEl = document.getElementById('current-step-num');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    if (!steps.length) return;
    const total = steps.length;

    function goTo(n) {
      if (n < 1) n = total;
      if (n > total) n = 1;
      currentStep = n;
      steps.forEach(s => s.classList.remove('tutorial__step--active'));
      const aStep = document.querySelector(`.tutorial__step[data-step="${n}"]`);
      if (aStep) aStep.classList.add('tutorial__step--active');
      panels.forEach(p => p.classList.remove('tutorial__panel--active'));
      const aPanel = document.querySelector(`.tutorial__panel[data-panel="${n}"]`);
      if (aPanel) aPanel.classList.add('tutorial__panel--active');
      document.querySelectorAll('.tutorial__dot').forEach(d => d.classList.remove('tutorial__dot--active'));
      const aDot = document.querySelector(`.tutorial__dot[data-dot="${n}"]`);
      if (aDot) aDot.classList.add('tutorial__dot--active');
      if (stepNumEl) stepNumEl.textContent = n;
    }

    steps.forEach(s => s.addEventListener('click', () => goTo(parseInt(s.dataset.step, 10))));
    document.querySelectorAll('.tutorial__dot').forEach(d =>
      d.addEventListener('click', () => goTo(parseInt(d.dataset.dot, 10)))
    );
    if (btnPrev) btnPrev.onclick = () => goTo(currentStep - 1);
    if (btnNext) btnNext.onclick = () => goTo(currentStep + 1);

    goTo(currentStep);
  }

  function initPlatformSelector() {
    const btns = document.querySelectorAll('.platform-selector__btn');
    if (!btns.length) return;
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('platform-selector__btn--active'));
        btn.classList.add('platform-selector__btn--active');
        const next = btn.dataset.platform;
        if (next && next !== currentPlatform) {
          currentPlatform = next;
          renderTutorial();
        }
      });
    });
  }

  function initLightbox() {
    let overlay = document.querySelector('.lightbox-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Fechar">&times;</button>
          <img alt="" class="lightbox-img">
        </div>`;
      document.body.appendChild(overlay);
    }
    const img   = overlay.querySelector('.lightbox-img');
    const close = overlay.querySelector('.lightbox-close');

    function open(src) { img.src = src; overlay.classList.add('active'); }
    function shut()    { overlay.classList.remove('active'); setTimeout(() => { img.removeAttribute('src'); }, 300); }

    document.body.addEventListener('click', e => {
      if (e.target.classList && e.target.classList.contains('click-to-zoom')) open(e.target.src);
    });
    overlay.addEventListener('click', e => { if (e.target === overlay || e.target === close) shut(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) shut();
    });
  }

  function boot() {
    renderTutorial();
    initPlatformSelector();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
