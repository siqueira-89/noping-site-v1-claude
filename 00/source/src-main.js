/* ============================================
   Main JS — LP Tutorial Claro
   ============================================ */

const tutorialData = {
  desktop: [
    {
      title: "Acesse o site",
      desc: "Entre em noping.com e clique em “Download” no menu superior.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-01.png"]
    },
    {
      title: "Baixe o instalador",
      desc: "Clique no botão de “Download” e aguarde o arquivo ser baixado.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-02.png"]
    },
    {
      title: "Execute o instalador",
      desc: "Abra o arquivo baixado para iniciar o processo.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-03.png"]
    },
    {
      title: "Instale o NoPing",
      desc: "Siga as instruções na tela para concluir a instalação.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-04.png"]
    },
    {
      title: "Abra o programa",
      desc: "Após instalar, execute o NoPing pelo desktop ou menu iniciar.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-05.png"]
    },
    {
      title: "Acesse como provedor",
      desc: "Na tela de login, clique em “Entrar com provedor”.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-06.png"]
    },
    {
      title: "Escolha a operadora",
      desc: "Você será redirecionado para a nossa página de parceiros. Selecione “Claro” e clique em “Continue”.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-07.png"]
    },
    {
      title: "Confirme seu número",
      desc: "Insira seu número de celular e clique em “Enviar código” para receber o SMS.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-08.png"]
    },
    {
      title: "Confirme o código",
      desc: "Insira o código recebido e clique em “Verificar”. Se não funcionar ou expirar, clique em “Reenviar código”.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-09.png"]
    },
    {
      title: "Comece a usar",
      desc: "Você será redirecionado para a tela inicial do NoPing. Pronto! Agora é só escolher o jogo ou app e clicar em “Otimizar jogo”.",
      imgs: ["public/images-tutorial/steps-web/img-web-step-10.png"]
    }
  ],
  mobile: [
    {
      title: "Baixe o aplicativo",
      desc: "Acesse a loja do seu celular, procure por “NoPing” e instale o app.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-01-ios.png", "public/images-tutorial/steps-mobile/img-mobile-step-01-android.png"]
    },
    {
      title: "Abra o NoPing",
      desc: "Após a instalação, abra o aplicativo no seu celular.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-02-ios.png", "public/images-tutorial/steps-mobile/img-mobile-step-02-android.png"]
    },
    {
      title: "Acesse como provedor",
      desc: "Na tela de login, toque em “Entrar com provedor”.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-03-both.png"]
    },
    {
      title: "Escolha a operadora",
      desc: "Você será redirecionado para a nossa página de parceiros. Selecione “Claro” e clique em “Continue”.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-04-ios.png", "public/images-tutorial/steps-mobile/img-mobile-step-04-android.png"]
    },
    {
      title: "Confirme seu número",
      desc: "Insira seu número de celular para receber o SMS.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-05-ios.png", "public/images-tutorial/steps-mobile/img-mobile-step-05-android.png"]
    },
    {
      title: "Confirme o código",
      desc: "Insira o código recebido e toque em “Verificar”. Se não funcionar ou expirar, toque em “Reenviar código”.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-06-ios.png", "public/images-tutorial/steps-mobile/img-mobile-step-06-android.png"]
    },
    {
      title: "Acesse o app",
      desc: "Você será redirecionado para a tela inicial do NoPing.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-07-both.png"]
    },
    {
      title: "Escolha seu jogo ou app",
      desc: "Toque no jogo ou app que você deseja otimizar.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-08-both.png"]
    },
    {
      title: "Escolha o servidor",
      desc: "Toque no servidor com menor latência.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-09-both.png"]
    },
    {
      title: "Comece a jogar",
      desc: "Toque em “Otimizar jogo”. Pronto! Agora é só jogar com menos lag.",
      imgs: ["public/images-tutorial/steps-mobile/img-mobile-step-10-both.png"]
    }
  ]
};

let currentPlatform = 'desktop';
let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
  renderTutorial();
  initPlatformSelector();
  initLightbox();
});

function renderTutorial() {
  const data = tutorialData[currentPlatform];
  const stepsContainer = document.getElementById('tutorial-steps');
  const panelsContainer = document.getElementById('tutorial-panels');
  const stepNumEl = document.getElementById('current-step-num');

  if (!stepsContainer || !panelsContainer) return;

  // Ensure current step is within bounds for the new platform
  if (currentStep > data.length) {
    currentStep = data.length;
  }

  let stepsHTML = '';
  let panelsHTML = '';
  let dotsHTML = '';

  data.forEach((step, index) => {
    const stepNum = index + 1;
    const isActive = stepNum === currentStep ? 'tutorial__step--active' : '';
    const isPanelActive = stepNum === currentStep ? 'tutorial__panel--active' : '';

    stepsHTML += `
      <button class="tutorial__step ${isActive}" data-step="${stepNum}">
        <span class="tutorial__step-num">${stepNum}</span>
        <span class="tutorial__step-label">${step.title}</span>
        <span class="tutorial__step-arrow">›</span>
      </button>
    `;

    // Render multiple images if provided
    const imageTags = step.imgs.map(src => {
      return `<img src="${src}" alt="Passo ${stepNum}" class="click-to-zoom" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px; flex:1;">`;
    }).join('');

    panelsHTML += `
      <div class="tutorial__panel ${isPanelActive}" data-panel="${stepNum}">
        <div class="tutorial__panel-text">
          <h3 class="tutorial__panel-title">${step.title}</h3>
          <p class="tutorial__panel-desc">${step.desc}</p>
        </div>
        <div class="tutorial__panel-preview" style="display:flex; justify-content:center; align-items:center; gap: 0.5rem; width:100%; height:500px; padding: 10px;">
          ${imageTags}
        </div>
      </div>
    `;

    const isDotActive = stepNum === currentStep ? 'tutorial__dot--active' : '';
    dotsHTML += `<span class="tutorial__dot ${isDotActive}" data-dot="${stepNum}"></span>`;
  });

  stepsContainer.innerHTML = stepsHTML;
  panelsContainer.innerHTML = panelsHTML;

  // Update dots and total step indicator
  const dotsContainer = document.querySelector('.tutorial__dots');
  if (dotsContainer) dotsContainer.innerHTML = dotsHTML;
  
  if (stepNumEl && stepNumEl.parentNode) {
    stepNumEl.parentNode.innerHTML = `PASSO <span id="current-step-num">${currentStep}</span>/${data.length}`;
  }

  initTutorialStepper();
}

function initTutorialStepper() {
  const steps = document.querySelectorAll('.tutorial__step');
  const panels = document.querySelectorAll('.tutorial__panel');
  const dots = document.querySelectorAll('.tutorial__dot');
  const stepNumEl = document.getElementById('current-step-num');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (!steps.length || !panels.length) return;

  const total = steps.length;

  function goToStep(n) {
    if (n < 1 || n > total) return;
    currentStep = n;

    // Update sidebar steps
    steps.forEach(s => s.classList.remove('tutorial__step--active'));
    const activeStep = document.querySelector(`.tutorial__step[data-step="${n}"]`);
    if (activeStep) activeStep.classList.add('tutorial__step--active');

    // Update panels
    panels.forEach(p => p.classList.remove('tutorial__panel--active'));
    const activePanel = document.querySelector(`.tutorial__panel[data-panel="${n}"]`);
    if (activePanel) activePanel.classList.add('tutorial__panel--active');

    // Update dots
    const currentDots = document.querySelectorAll('.tutorial__dot');
    currentDots.forEach(d => d.classList.remove('tutorial__dot--active'));
    const activeDot = document.querySelector(`.tutorial__dot[data-dot="${n}"]`);
    if (activeDot) activeDot.classList.add('tutorial__dot--active');

    // Update step number
    if (stepNumEl) stepNumEl.textContent = n;

    // Update nav buttons to never be disabled and act as a loop
    const activeBtnPrev = document.getElementById('btn-prev');
    if (activeBtnPrev) {
      activeBtnPrev.disabled = false;
    }
    const activeBtnNext = document.getElementById('btn-next');
    if (activeBtnNext) {
      activeBtnNext.disabled = false;
      activeBtnNext.innerHTML = 'Próximo Passo <span>→</span>';
    }
  }

  // Sidebar step clicks
  steps.forEach(step => {
    step.addEventListener('click', () => {
      const num = parseInt(step.dataset.step);
      goToStep(num);
    });
  });

  // Dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const num = parseInt(dot.dataset.dot);
      goToStep(num);
    });
  });

  // Prev / Next (Remove previous listeners if any to avoid duplicates)
  if (btnPrev) {
    const newBtnPrev = btnPrev.cloneNode(true);
    newBtnPrev.disabled = false; // Ensure it's not disabled from HTML clone
    btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);
    newBtnPrev.addEventListener('click', () => {
      if (currentStep === 1) {
        goToStep(total);
      } else {
        goToStep(currentStep - 1);
      }
    });
  }
  if (btnNext) {
    const newBtnNext = btnNext.cloneNode(true);
    newBtnNext.disabled = false;
    btnNext.parentNode.replaceChild(newBtnNext, btnNext);
    newBtnNext.addEventListener('click', () => {
      if (currentStep === total) {
        goToStep(1);
      } else {
        goToStep(currentStep + 1);
      }
    });
  }

  // Init UI state
  goToStep(currentStep);
}

function initPlatformSelector() {
  const btns = document.querySelectorAll('.platform-selector__btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('platform-selector__btn--active'));
      btn.classList.add('platform-selector__btn--active');
      
      const selectedPlatform = btn.dataset.platform;
      if (selectedPlatform && selectedPlatform !== currentPlatform) {
        currentPlatform = selectedPlatform;
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
        <button class="lightbox-close">&times;</button>
        <img src="" alt="Zoomed Image" class="lightbox-img">
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const lightboxImg = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src) {
    lightboxImg.src = src;
    overlay.classList.add('active');
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    setTimeout(() => {
      lightboxImg.src = '';
    }, 300);
  }

  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('click-to-zoom')) {
      openLightbox(e.target.src);
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === closeBtn) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}
