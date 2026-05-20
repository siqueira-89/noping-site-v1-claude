# Páginas

| Rota              | Status            | CSS de página                     | JS de página                       | `data-page`  |
| ----------------- | ----------------- | --------------------------------- | ---------------------------------- | ------------ |
| `/`               | Pronta            | `src/styles/pages/home.css`       | `src/scripts/pages/home.js`        | `home`       |
| `/affiliates/`     | **Referência**    | `src/styles/pages/affiliates.css`  | `src/scripts/pages/affiliates.js`   | `affiliates`  |
| `/download/`     | Pronta            | `src/styles/pages/download.css`  | `src/scripts/pages/download.js`   | `download`  |
| `/games/`         | Pronta            | `src/styles/pages/games.css`      | `src/scripts/pages/games.js`       | `games`      |
| `/support/`       | Em construção     | `src/styles/pages/support.css`    | `src/scripts/pages/support.js`     | `support`    |
| `/prices/`        | Em construção     | `src/styles/pages/prices.css`     | `src/scripts/pages/prices.js`      | `prices`     |

Todas as páginas seguem a mesma "pilha" de includes — `global → components → page` para CSS, `components → global → page` para JS — e usam os mesmos placeholders `<header id="global-header"></header>` / `<footer id="global-footer"></footer>` para a chrome.

---

## `/` — Home (Tutorial NoPing × Claro)

**Objetivo:** ativar o NoPing como benefício do plano Claro em 6 passos. Visualmente é o canto mais "azul-corporativo" do site — banner de parceria oficial no topo, paleta NoPing pura mas com Claro red estritamente confinado dentro do logo composto.

**Seções:**
1. Banner de parceria (gradient sutil verde/charcoal).
2. Hero (título + subtítulo + segmented control desktop/mobile).
3. Tutorial — sidebar com steps numerados + content area com badge, dots, imagens (lightbox ao clicar) e botões prev/next que fazem loop.
4. Linha de 3 cards de download (Windows / App Store / Play Store).
5. Strip de certificações (Microsoft / DigiCert / Google Cloud + store badges).
6. Footer global.

**JS de página:** define o conjunto `tutorialData` (desktop 10 passos + mobile 10 passos), renderiza steps/panels/dots, inicializa o platform selector e o lightbox.

---

## `/affiliates/` — Programa de afiliados **(REFERÊNCIA)**

**Objetivo:** apresentar o programa de parceria — embaixadores e top affiliates, como participar, níveis de comissão, FAQ.

**Seções (cada uma é uma `section-viewport` ou afim, respeitando 100vh):**

1. **Hero combinado** — Ambassadors (fade rotator entre 3 pros) à direita; texto + CTA à esquerda. Embaixo, **carrossel auto-scroll** com 7 cards de afiliados, com barra de progresso.
2. **Tutorial** — Como participar (mock de "Overwatch 2 procurando servidor" + 4 step cards numerados).
3. **Rank** — 4 tier cards (Explorer/Adventure/Champion/Hero), depois 3 benefit cards.
4. **FAQ** — Layout 2 colunas; texto + CTA verde/purple à esquerda, accordion à direita.

**Por que é a referência:** define **header, footer, faq, grid bg, espaçamentos e componentes reutilizáveis** do site. Qualquer nova página deve copiar deste padrão.

**JS de página:** boota o fade-rotator, o carousel + progresso, o FAQ accordion e o canvas de partículas do hero.

---

## `/download/` — Download

**Objetivo:** uma só tela — hero centrado com seletor de plataforma (4 botões em 2 grupos: Windows/Mac · App Store/Play Store).

**JS de página:** ativa o toggle group + canvas de partículas decorativo. Botão ativo recebe `.active` (CSS verde no `pages/download.css`).

---

## `/games/` — Catálogo

**Seções:**

1. **Hero** — Stat strip (5 métricas), título + CTAs, deck 3D de 5 cartas (Dota / CS / Valorant / Fortnite / Minecraft) com setas laterais e dots.
2. **Catálogo** — Search input + 2 filter dropdowns (Sort, Genre) + grid de 25 "minis" com before/after de ping. Termina com um CTA banner verde.

**JS de página:** rotação do deck (com path mais curto quando clicando um dot) + abrir/fechar dos dropdowns (com close-on-outside-click + label sync).

---

## `/support/` — **Em construção**

Header + footer + hero vazio sobre o grid bg, com a nota visual "Página em construção". CSS e JS já criados como base para crescer.

## `/prices/` — **Em construção**

Mesmo padrão que `/suporte`. Quando os planos forem definidos, popular `src/data/pricing.json` e construir os cards aqui.

---

## Convenção de marcação

Todo `<body>` carrega dois atributos:

- `data-page="<key>"` — lido pelo `main.js` para acertar o estado *ativo* do header.
- `data-screen-label="..."` — usado pelo sistema de revisão para identificar a tela em comentários.

Algumas páginas adicionam uma classe `.<page>-page` no body (ex.: `.games-page`, `.support-page`) — usada para *scopar* CSS de página e evitar colisões entre regras (especialmente quando duas páginas usam o mesmo nome de classe, ex.: `.hero`).
