# Componentes reutilizáveis

Inventário do que vive em `/src/components/` (lógica JS) e o CSS que cada um usa em `/src/styles/components/`.

> Convenção: **componentes vivem na página via um placeholder vazio** (`<header id="global-header"></header>`, `<footer id="global-footer"></footer>`). Os scripts de componentes expõem `init*()` no `window` e o `main.js` global os chama no `DOMContentLoaded`, lendo `data-page` do `<body>` para customizar (ex.: estado *ativo* do nav).

---

## Header — `src/components/header.js` + `src/styles/components/header.css`

Header fixo de 72 px com logo NoPing centralizado-esquerda, nav primária e CTA `TESTE GRÁTIS` à direita. Funciona em **qualquer profundidade de rota** — o componente detecta sozinho se a página atual está na raiz ou dentro de `/<page>/` e ajusta os hrefs e o `src=` do logo de forma transparente.

**Como usar em uma nova página:**

```html
<header id="global-header" data-active="precos"></header>
…
<script src="../src/components/header.js"></script>
<script src="../src/scripts/global/main.js"></script>
```

O `data-active="precos"` faz o link "PREÇOS" receber a classe `.on` (sublinhado neon).

**Nav links** vivem no array `NAV` dentro de `header.js`. Editar lá adiciona o link em todas as páginas.

---

## Footer — `src/components/footer.js` + `src/styles/components/footer.css`

Footer mega — três zonas verticais:

1. Faixa **certificados + lojas** (Microsoft / DigiCert / Google Cloud + App Store / Play Store)
2. **Grid principal** (brand + 5 colunas: NoPing · Tecnologia · Ajuda · Blog · Feedbacks). Brand inclui *promo box* "Pronto pra tirar o lag?" + guias.
3. **Bottom bar** com copyright e ícones sociais com glow verde.

```html
<footer id="global-footer"></footer>
<script src="../src/components/footer.js"></script>
```

**Modo compacto:** passar `compact: true` para `NoPingFooter.init('#global-footer', { compact: true })` esconde o promo box / guides. Útil para páginas onde a CTA grande iria competir com o hero.

---

## FAQ — `src/components/faq.js`

Accordion exclusivo: um item aberto por vez. CSS vive em `src/styles/pages/affiliates.css` (a página onde nasceu).

```js
NoPingFAQ.init('.faq-accordion');
```

Procura `.faq-item` (com `.faq-trigger` interno). Aplica `.active` no clicado e remove dos irmãos.

**Markup esperado:**

```html
<div class="faq-accordion">
  <div class="faq-item">
    <button class="faq-trigger" type="button">
      <span class="faq-question">…</span>
      <span class="faq-icon-indicator">+</span>
    </button>
    <div class="faq-content">
      <div class="faq-answer-inner">Resposta…</div>
    </div>
  </div>
</div>
```

---

## Carousel — `src/components/carousel.js`

Dois utilitários:

- `NoPingCarousel.init({ container, track, thumb, autoDelay, scrollAmount })` — carrossel horizontal auto-scroll com barra de progresso. Usado em `/afiliados` para os cards de testimonial.
- `NoPingCarousel.fadeRotator(containerSel, { interval })` — fade crossfade entre `.ambassador-fade-item` (`.active` / `.next` / `.prev`). Usado no hero de embaixadores em `/afiliados`.

Ambos pausam interação durante hover/toque e voltam sozinhos.

---

## Buttons — `src/components/buttons.js`

Dois helpers usados em mais de uma página:

- `NoPingButtons.toggleGroup(groupSel, opts)` — controle segmentado (clicar um botão remove `.active` dos irmãos). Dispara um `change` event com `{ value, button }`.
- `NoPingButtons.smoothAnchors(root)` — todo `a[href^="#"]` (exceto `#`) faz scroll suave para `getElementById(target)`.

---

## CSS componentizado

| Arquivo                                | O que define                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `src/styles/components/header.css`     | Layout fixo do header + nav links + CTA + lang pill                              |
| `src/styles/components/footer.css`     | Faixa de certs, grid de colunas, promo box, socials, divisores                   |
| `src/styles/components/buttons.css`    | `.btn` (primary/outline/lg/sm/icon), `.cta` (pill), `.faq-btn` (tonal green/purple) |
| `src/styles/components/cards.css`      | `.card` solid/glass/neon/help + `.gtile` (game tile placeholder)                 |
| `src/styles/components/forms.css`      | `.input`, `.field`, `.lang-pill`, `.np-check`                                    |

Estes são carregados em **toda** página antes do CSS de página.
