# Layout Audit — NoPing (2026-05-21)

> **Tipo:** diagnóstico técnico, somente leitura. Nenhum HTML, CSS, JS, Tailwind config ou asset foi alterado nesta etapa.
> **Fonte de verdade:** `/docs/` (lida integralmente — ver § 3.0). O código foi auditado **contra** as regras documentadas, e cada divergência é registrada como gap.
> **Versão:** substitui o rascunho anterior (que foi escrito antes da pasta `/docs/` existir). A versão preservada com sufixo `-986ea890.md` permanece no histórico para referência.

---

## 1. Resumo executivo

A pasta `/docs/` está completa e prescreve um sistema coerente. **A implementação atual não está alinhada com ela em diversos pontos estruturais.** Os desvios mais importantes:

| # | Tema | Docs prescrevem | Código implementa | Severidade |
|---|---|---|---|---|
| 1 | Container | `1280px`, padding `24px` desktop / `20px` mobile (`docs/layout/container.md`, `docs/README.md`, D-008, `tailwind-token-mapping.md`) | `1360px`, padding `32px` em todas as páginas (`variables.css`, `tailwind-config.js`, `home-v2/tokens.css`) | **Alto** |
| 2 | Hero / sections | `min-height: calc(100svh - var(--np-header-height))` + `Header + Section = 100svh` (`docs/layout/sections.md`) | `min-height: 100vh; padding-top: 72px` em todas as páginas. **Zero ocorrências de `100svh`** | **Alto** |
| 3 | Page shell | `body { min-height: 100svh; flex; flex-col } / main { flex: 1 } / footer { flex-shrink: 0 }` (`sections.md`, `architecture.md`) | `body { min-height: 100vh; overflow-x: hidden }` (`reset.css`). **Nenhuma página** aplica `flex-col` no body nem `flex-1` no `main`. | **Alto** |
| 4 | Footer | Estrutural (via flex do body) — não dependente de tamanho fixo (`sections.md`, D-010) | `.section-footer { height: 100vh; padding-top: 72px }` — auto-suficiente por altura própria (`components/footer.css`) | **Médio** |
| 5 | Tailwind tokens | `np-container = 1280px`, spacing `np-1..np-32` + `np-page`, radius `np-xs..np-2xl + np-pill`, shadows `np-sm/md/lg + np-glow-*` (`tailwind-token-mapping.md`) | `np-container = 1360px`, spacing `np-xs..np-3xl + header`, radius `np-sm..np-xl + np-pill` (sem `xs/2xl`), shadows `np-card/elev + np-glow-*` (`tailwind-config.js`) | **Alto** |
| 6 | CSS complementar | Nome canônico: `complementary.css` (`feature-css-strategy.md`, `features.md`, `tailwind.md`) | Nome real: `overrides.css` (`src/styles/overrides.css`) | Baixo (semântico) |
| 7 | Estrutura de features | `src/scripts/features/` + `src/styles/features/` previstas (`features.md`, `animation-feature-architecture.md`) | **Pastas não existem.** Animações vivem em `src/scripts/global/interactions.js` (canvas/particles) e em `src/scripts/home-v2/*.jsx`. | Médio |
| 8 | Tailwind ativo | "Tailwind-first" como regra global. `/affiliates` referenciado como tendo Tailwind CDN em `affiliates-reference.md` | Tailwind CDN ativo apenas em `/download`, `/prices`, `/support`. `/affiliates` **não carrega Tailwind**. | **Alto** (docs e código se contradizem) |
| 9 | D-009 vs sections.md | `decisions.md` D-009 diz `100vh`. `sections.md` diz `100svh`. | Código segue D-009 (`100vh`). | Médio (inconsistência interna nos docs) |

Tudo o mais (header global 72 px, footer global injetado, certificados dentro do footer, paleta, Bai Jamjuree carregado via `@font-face` local) **está alinhado** com a documentação.

---

## 2. Tabela por página

> Convenção: **Tailwind** = página linka `cdn.tailwindcss.com` + `tailwind-config.js`.
> **Hero/100vh** = padrão observado na seção hero. **Header compensado** = como o gap de 72 px do header fixo é absorvido. **Footer seguro** = se `<footer id="global-footer">` está fora da hero e injetado uma única vez.
> **Container atual** = largura real aplicada hoje (não a desejada, que é 1280 px pelas docs).

| Página         | Tailwind | CSS página | CSS global | overrides.css | Componentes globais | JS de página | Features / scripts reutilizáveis | Hero / 100vh | Header compensado | Footer seguro | Container atual | Risco |
| -------------- | -------- | ---------- | ---------- | ------------- | ------------------- | ------------ | -------------------------------- | ------------ | ----------------- | ------------- | --------------- | ----- |
| `/` (home v2)  | ❌ | `home-v2/{tokens,base,components,layout,_integration}.css` | `variables.css` apenas | ❌ | `header`, `footer` | — (React app) | `interactions.js` (não usado aqui); 15 JSX modules + canvas internos (Globe, AppDashboard, etc.) | `#root > .hero { min-height: calc(100vh - 72px) }` | `#root { padding-top: 72px }` (única compensação) | ✅ injetado, fora da hero | `1360 px` (via `--page-max` em `home-v2/tokens.css`) | **Alto** (canvas + Globe acoplados ao viewport) |
| `/affiliates`  | ❌ | `pages/affiliates.css` (878 linhas) | `reset · variables · typography · layout · utilities` | ❌ | `header`, `footer`, `faq`, `carousel` | `pages/affiliates.js` | `interactions.js` (particles canvas no hero); `carousel.js` (auto-scroll + fade rotator) | `.section-one { min-height: 100vh; padding-top: 72px }` + `.hero-wrapper { height: calc(100vh - 72px) }` | Por seção (`section-one/two/three/four/five`) | ✅ injetado, fora da hero | `1360 px` via `.shell` / `.container` | **Alto** (referência visual aprovada — não tocar) |
| `/download`    | ✅ | `pages/download.css` **órfão (não linkado)** | `reset · variables · typography · layout · utilities` | ✅ (estiliza `.downloads-page .hero__downloads .btn.active`) | `header`, `footer` | `pages/download.js` | `interactions.js` → `dataParticles` (canvas) | `min-h-screen pt-header` (Tailwind) + filho `min-h-[calc(100vh-theme(spacing.header))]` | `pt-header` (token = 72 px) | ✅ injetado | `container` global (1360 px) | **Alto** (dupla declaração de altura + canvas) |
| `/games`       | ❌ | `pages/games.css` | `reset · variables · typography · layout · utilities` | ❌ | `header`, `footer` | `pages/games.js` | Deck 3D + dropdowns (próprios) | `.jogos-page .hero-wrapper { min-height: 100vh; padding: 72px 0 60px }` | `padding: 72px 0 60px` | ✅ injetado | `1360 px` via `.shell` | Médio |
| `/prices`      | ✅ | sem `pages/prices.css` (removido) | `reset · variables · typography · layout · utilities` | ✅ (linkado, mas não tem regras específicas pra esta página) | `header`, `footer` | `pages/prices.js` | — | `min-h-screen pt-header` (Tailwind) | `pt-header` | ✅ injetado | **Não usa container** — `max-w-[720px]` inline | Baixo |
| `/support`     | ✅ | depende de `pages/affiliates.css` (importado só pelo FAQ) | `reset · variables · typography · layout · utilities` | ✅ (estiliza `.support-topics__list` e cards de contato) | `header`, `footer`, `faq` | `pages/support.js` | `faq.js` (accordion) | `pt-[calc(theme(spacing.header)+32px)]` ≈ 104 px (intencional) | `pt-header + 32px` | ✅ injetado | `.container` global (1360 px) | **Médio** (dependência cruzada de `pages/affiliates.css`) |
| `/claro`       | ❌ | `pages/home.css` | `reset · variables · typography · layout · utilities` | ❌ | `header`, `footer` | `pages/home.js` | — | `.hero { min-height: 100vh; padding-top: calc(var(--header-height) + 0px) }` | `padding-top: 72px` | ✅ injetado | `.container` (1360 px) | Baixo |

> ❌ = não usa · ✅ = usa · **negrito** = pode quebrar facilmente se a regra de container/section for movida.

### Observações estruturais (de leitura cruzada)

- **Nenhuma das 7 páginas implementa o page shell prescrito em `sections.md` / `architecture.md`**: `<body class="min-h-[100svh] flex flex-col"> + <main class="flex-1"> + footer`. O `<body>` real tem `min-height: 100vh` (de `reset.css`) e `overflow-x: hidden`, sem `flex-col`. O `<main>` existe em algumas páginas (`/prices`, `/support`, `/download`, `/claro`) mas **sem** `flex: 1`.
- O footer hoje funciona não por estrutura global, mas porque `.section-footer { height: 100vh }` se sustenta sozinha — exatamente o oposto da regra D-010 ("o footer deve funcionar por regra estrutural global, não por consequência").
- **`affiliates-reference.md` está desatualizado** em três pontos: afirma que a página linka `<script src="https://cdn.tailwindcss.com">`, que linka `overrides.css`, e que `affiliates.css` "foi removido". Na realidade, o HTML atual da `/affiliates/` **não** linka Tailwind nem `overrides.css`, e `affiliates.css` continua presente (878 linhas, linkado em `<head>`). Recomendar correção do doc.

---

## 3. Arquivos analisados

### 3.0 Documentação lida (`/docs/`)

| Arquivo | Função |
|---|---|
| `docs/README.md` | Índice + regras-síntese (container 1280, header 72, Header+Section=100svh, Tailwind-first, Bai Jamjuree única). |
| `docs/ai-rules/global-rules.md` | Regras de processo + lista de arquivos protegidos. |
| `docs/ai-rules/visual-rules.md` | Direção visual + paleta + tipografia + ícones + layout. |
| `docs/ai-rules/code-rules.md` | Regras técnicas para mudanças em código. |
| `docs/ai-rules/review-checklist.md` | Checklist de aceite (inclui "container 1280px"). |
| `docs/layout/container.md` | **Container 1280px**, padding `24/20`. |
| `docs/layout/sections.md` | **Header + Section = 100svh**. Page shell `body flex-col / main flex-1 / footer flex-shrink-0`. Tipos `section-full`, `section-default`, `section-compact`. |
| `docs/layout/grid.md` | Escala 8-pt (`8/16/24/40/64/96/128`). Grid bg fora do container. |
| `docs/layout/responsive.md` | Breakpoints Tailwind padrão. Container `max-w-np-container`. |
| `docs/frontend/tailwind.md` | Tailwind-first como regra. Container desejado: 1280. |
| `docs/frontend/architecture.md` | Layout base `body flex-col + main flex-1`. |
| `docs/frontend/tailwind-token-mapping.md` | **Tokens Tailwind alvo**: container 1280, spacing `np-1..32` + `np-page`, radius `np-xs..np-2xl + np-pill`, shadows `np-sm/md/lg + np-glow-*`. |
| `docs/frontend/features.md` | Define `src/scripts/features/` + `src/styles/features/` + `complementary.css`. |
| `docs/frontend/animation-feature-architecture.md` | Fluxo `preview → feature → integração`. |
| `docs/frontend/feature-css-strategy.md` | Quando usar `complementary.css` × CSS por feature. |
| `docs/design-system/design.md` | "Kinetic Pulse" — paleta NoPing + cards + botões. |
| `docs/design-system/components.md` | Header / Footer / FAQ / Carousel / Buttons globais. |
| `docs/design-system/animations.md` | Durações, easing, regras de hover, GSAP / Canvas / Three.js. |
| `docs/tokens/README.md` | Hierarquia: brand → design → tokens → tailwind-mapping → código. |
| `docs/tokens/spacing.md` (referenciado) | Escala operacional. |
| `docs/tokens/typography.md` | Família única Bai Jamjuree. |
| `docs/pages/pages.md` | Status por rota. |
| `docs/pages/affiliates-reference.md` | Referência operacional `/affiliates` (com 3 imprecisões — ver § 2). |
| `docs/decisions/decisions.md` | D-001 a D-011. **D-008** define container 1280. **D-009** diz `Header+Section=100vh` (conflita com `sections.md` que diz `100svh`). **D-010** prescreve footer estrutural. **D-011** "Tailwind-first". |
| `docs/migration/tailwind-migration.md` | Estratégia da migração progressiva. |
| `docs/migration/affiliates-html-audit-2026-05-21.md` | Auditoria existente do HTML de `/affiliates/` (parcialmente desatualizada). |
| `docs/migration/support-implementation-plan.md` | Plano da nova `/support/` com shell `min-h-[100svh] flex flex-col`. |
| `docs/brand/brand-guidelines.md` | Marca + Bai Jamjuree oficial. |
| `docs/ai-rules/prompt-patterns.md`, `ai-rules/prompts/*` | Prompts reutilizáveis (não impactam diagnóstico estrutural). |

### 3.1 HTML por rota

| Rota | Arquivo |
|---|---|
| `/` | `index.html` |
| `/affiliates` | `affiliates/index.html` |
| `/download` | `download/index.html` |
| `/games` | `games/index.html` |
| `/prices` | `prices/index.html` |
| `/support` | `support/index.html` |
| `/claro` | `claro/index.html` |

### 3.2 CSS global

- `src/styles/global/variables.css` (tokens `--np-*` + aliases legacy)
- `src/styles/global/reset.css`
- `src/styles/global/typography.css` (`@font-face` de Bai Jamjuree, 7 pesos + itálicos, servida de `src/assets/fonts/BaiJamjuree/`)
- `src/styles/global/layout.css` (`.container`, `.shell`, `.section`, `.section-viewport`, `.section-fullscreen`, `.grid-bg`, utilitárias `.flex` / `.grid` que conflitam com Tailwind por nome)
- `src/styles/global/utilities.css` (`.chip`, `.glass`, `.glow-dot`, motion fallback)
- `src/styles/overrides.css` (CSS complementar)

### 3.3 CSS de componente

- `src/styles/components/header.css` (header fixo 72 px)
- `src/styles/components/footer.css` (`.section-footer` 100vh + grid de colunas + breakpoints)
- `src/styles/components/buttons.css`
- `src/styles/components/cards.css`
- `src/styles/components/forms.css`

### 3.4 CSS de página

- `src/styles/pages/affiliates.css` (878 linhas — referência aprovada)
- `src/styles/pages/games.css`
- `src/styles/pages/home.css` (consumido por `/claro`)
- `src/styles/pages/download.css` (órfão — não linkado)

### 3.5 CSS home-v2 (escopo isolado)

- `src/styles/home-v2/tokens.css`
- `src/styles/home-v2/base.css`
- `src/styles/home-v2/components.css`
- `src/styles/home-v2/layout.css`
- `src/styles/home-v2/_integration.css` (ponte com sistema global)

### 3.6 JS

- Globais: `src/scripts/global/{helpers, navigation, interactions, main, tailwind-config}.js`
- Componentes: `src/components/{header, footer, faq, carousel, buttons}.js`
- Por página: `src/scripts/pages/{home, affiliates, download, games, prices, support}.js`
- Home v2: `src/scripts/home-v2/*.jsx` (15 módulos — incluindo Globe, Coverage, AppDashboard)

---

## 4. Ocorrências encontradas

### 4.1 Container / max-width / padding lateral

> Docs alvo: **1280 px / padding 24 px desktop / 20 px mobile**.

| Arquivo | Linha | Trecho | Comentário |
|---|---|---|---|
| `src/styles/global/variables.css` | 162 | `--np-container-max: 1360px;` | **Diverge da regra D-008 (1280).** Token canônico do projeto hoje. |
| `src/styles/global/variables.css` | 164 | `--max-width: 1280px;` | **Token órfão.** Não referenciado em nenhum CSS ativo. Curiosamente é o valor alvo das docs. |
| `src/styles/global/variables.css` | 165 | `--page-max: var(--np-container-max);` | Alias → 1360. Diverge. |
| `src/styles/global/variables.css` | 167 | `--gutter: 32px;` | Padding lateral atual. Docs querem 24 (desktop) / 20 (mobile). |
| `src/styles/global/layout.css` | 12 | `max-width: var(--np-container-max);` | Aplicado em `.container` e `.shell`. |
| `src/styles/global/layout.css` | 13 | `padding: 0 var(--gutter);` | Aplica os 32 px do `--gutter`. |
| `src/scripts/global/tailwind-config.js` | 86 | `'np-container': '1360px'` | Diverge de `tailwind-token-mapping.md` (1280). |
| `src/scripts/global/tailwind-config.js` | 77–82 | `spacing: { 'np-xs':'8px', ..., 'np-3xl':'128px', 'header':'72px' }` | Esquema diverge de `tailwind-token-mapping.md` (`np-1..np-32` + `np-page`). |
| `src/scripts/global/tailwind-config.js` | 89–95 | `borderRadius: { 'np-sm':'8px', 'np-md':'12px', 'np-lg':'16px', 'np-xl':'24px', 'np-pill':'9999px' }` | Faltam `np-xs` e `np-2xl` previstos nas docs. |
| `src/scripts/global/tailwind-config.js` | 96–101 | `boxShadow: { 'np-card', 'np-elev', 'np-glow-*' }` | Docs querem `np-sm/md/lg` + `np-glow-*`. Nomes divergentes. |
| `src/styles/home-v2/tokens.css` | 59 | `--page-max: 1360px;` | Duplicação hardcoded dentro do escopo home-v2. |
| `src/styles/home-v2/base.css` | 108 | `max-width: 1360px;` | Hardcoded no divider — não usa var. |
| `src/styles/components/footer.css` | 382 | `@media (max-width: 1280px)` | **Breakpoint responsivo legítimo.** Não é largura de container. |
| `prices/index.html` | 41 | `class="… max-w-[720px] px-8 …"` | Hero usa max-width próprio (720 px) + padding 32 px (px-8). |
| `support/index.html` | 41 | `class="container … max-w-[1080px] …"` | Container 1360 sobrescrito por max-width 1080 inline. |
| `00/source/*` | — | `max-width: 1360px / 1280px` | Arquivos arquivados — não servidos. |

**Ocorrências de `1350 px`:** **nenhuma** em arquivo ativo. Único registro é a menção textual no briefing do usuário.

**Ocorrências de `max-w-[1280px]` / `max-w-[1350px]` / `max-w-[1360px]` literais no HTML servido:** **nenhuma**. (Diferente do que `affiliates-html-audit-2026-05-21.md` afirma sobre `max-w-[1360px]` aparecer 5 vezes na `/affiliates` — auditoria anterior estava errada ou se referia a uma versão diferente do HTML.)

### 4.2 100vh / 100svh / min-height / pt-header / page-shell / main flex

> Docs alvo: `min-height: calc(100svh - var(--np-header-height))` + page shell `body flex-col / main flex-1 / footer flex-shrink-0`.

| Arquivo | Linha | Trecho | Diverge dos docs? |
|---|---|---|---|
| `src/styles/global/reset.css` | 26 | `body { min-height: 100vh; overflow-x: hidden }` | Sim — docs querem `100svh` + `display: flex; flex-direction: column`. |
| `src/styles/global/layout.css` | 24–34 | `.section-viewport { min-height: 100vh; padding-top: var(--np-header-height); display: flex; flex-direction: column; … }` | Sim — `100vh` em vez de `100svh`. |
| `src/styles/global/layout.css` | 36–46 | `.section-fullscreen { height: 100vh; padding-top: var(--np-header-height) … }` | Sim. **Classe órfã** — não consumida em nenhum HTML/CSS. |
| `src/styles/global/layout.css` | 100–106 | `.flex { display:flex } .flex-col { flex-direction:column } .flex-1 { flex:1 } …` | Conflita com Tailwind por nome. Hoje vence o CSS global (cascade). |
| `src/styles/pages/affiliates.css` | 11–24 | `.section-one/.section-five { min-height: 100vh; padding-top: var(--np-header-height) }` | Sim. |
| `src/styles/pages/affiliates.css` | 38 | `.hero-wrapper { height: calc(100vh - 72px); max-height: 840px; min-height: 600px }` | Sim — `100vh`, `72px` hardcoded. |
| `src/styles/pages/games.css` | 11 | `.jogos-page .hero-wrapper { min-height: 100vh; padding: 72px 0 60px }` | Sim. |
| `src/styles/pages/games.css` | 243 | `.sect-2 { min-height: 100vh }` | Sim. |
| `src/styles/pages/download.css` | 13–56 | `.downloads-page .hero { min-height: 100vh; padding-top: var(--np-header-height) }` + filho `min-height: calc(100vh - var(--np-header-height))` | Arquivo **órfão** (não linkado), mas ainda existe. |
| `src/styles/pages/home.css` | 12 | `.hero { min-height: 100vh; padding-top: calc(var(--header-height) + 0px) }` (consumido por `/claro`) | Sim. |
| `src/styles/home-v2/_integration.css` | 25–41 | `#root { padding-top: 72px; min-height: calc(100vh - 72px) }` + `#root > .section { min-height: calc(100vh - 72px) }` | Sim — `100vh`. |
| `src/styles/components/footer.css` | 20–22 | `.section-footer { height: 100vh; padding-top: var(--np-header-height) }` | Sim — `height` fixo, **proibido pelas docs** (`sections.md` "usar min-height, não height fixo"). |
| `prices/index.html` | 40 | `class="… min-h-screen pt-header …"` | Sim — `min-h-screen` = `100vh`. |
| `download/index.html` | 42 | `class="… min-h-screen pt-header …"` | Sim. |
| `download/index.html` | 46 | `class="container … min-h-[calc(100vh-theme(spacing.header))] …"` | Compensa de novo o header em um filho. Não é dupla compensação somativa, mas é padrão ambíguo. |
| `support/index.html` | 41 | `class="… pt-[calc(theme(spacing.header)+32px)] …"` | Sem `min-h-screen` — só o padding-top ampliado para 104 px (header + 32). Não há regra de altura mínima visível. |

**`100svh` no projeto inteiro:** **0 (zero) ocorrências.**
**`pt-header` (Tailwind class):** 2 ocorrências (`/download`, `/prices`). Em `/support` é `pt-[calc(theme(spacing.header)+32px)]`.
**`<main class="flex-1">` (page shell prescrito):** **0 ocorrências.** Nenhuma página adota o shell.
**`<body class="min-h-[100svh] flex flex-col">` (page shell prescrito):** **0 ocorrências.**

### 4.3 Footer

| Arquivo | Linha | Trecho | Comentário |
|---|---|---|---|
| `src/components/footer.js` | 162 | `el.outerHTML = ' <section class="section-footer"> <footer class="footer" id="footer"> … '` | Injetor único. Sempre envolve o footer em `.section-footer`. |
| `src/styles/components/footer.css` | 20–24 | `.section-footer { height: 100vh; padding-top: 72px; box-sizing: border-box; display: flex; … }` | Altura **fixa** (proibido por `sections.md`). |
| `src/styles/components/footer.css` | 390 | `@media (max-width: 1100px) { .section-footer { height: auto; min-height: 100vh } }` | Em mobile relaxa para `min-height`. |
| `src/styles/components/footer.css` (estilos `.footer__certs*`) | — | Faixa de certificados (Microsoft / DigiCert / Google Cloud + lojas) **dentro** do footer global. ✅ Alinhado com `components.md`. | — |
| HTML de todas as 7 páginas | — | `<footer id="global-footer"></footer>` (placeholder único, fora da hero). ✅ | — |

**Footer não depende do tamanho da section anterior** — tem altura própria. **Não há sobreposição** observada. **Páginas curtas** (`/prices`, `/support`, `/claro`) ficam em ~200vh (hero 100vh + footer 100vh), o que é intencional. Mas isso é resolvido por *altura própria do footer*, não por *fluxo estrutural do shell* (regra D-010).

### 4.4 Animações / Canvas / Particles / Carousel / Globe / Mapa / Features

> Buscas: `gsap`, `three`, `canvas`, `particles`, `globe`. Resultado:

| Arquivo | Página(s) | Tipo | Dependência | Risco em mudança de layout/container/overflow/z-index |
|---|---|---|---|---|
| `src/scripts/global/interactions.js` | `/affiliates`, `/download` | Canvas 2D — `NoPingFX.particles` (rede de partículas) + `NoPingFX.dataParticles` (pulsos reativos a mouse) | Lógica + visual. Dimensão calculada via `canvas.parentElement.clientWidth/Height`. | **Alto** — qualquer overflow/clip/z-index/transform no pai quebra a área do canvas ou esconde o efeito. |
| `src/components/carousel.js` | `/affiliates` | Carousel horizontal auto-scroll + `fadeRotator` | Lógica + visual | **Médio** — depende de `overflow-x`/largura do container. Se o container ficar mais estreito (1360 → 1280), o passo do scroll muda. |
| `src/components/faq.js` | `/affiliates`, `/support` | Accordion (open/close) | Lógica | Baixo. |
| `src/components/buttons.js` | toda página que importa | `toggleGroup`, `smoothAnchors` | Lógica | Baixo. |
| `src/scripts/pages/affiliates.js` | `/affiliates` | Boot do `particles` + `carousel` + `faq` + fade rotator | Lógica + visual | Médio (herda particles + carousel). |
| `src/scripts/pages/games.js` | `/games` | Rotação do deck 3D + dropdowns sort/genre | Visual + lógica. Depende de `transform: translate3d/rotate` + `position: absolute`. | Médio. |
| `src/scripts/pages/download.js` | `/download` | Boot do `dataParticles` + toggle group | Visual + lógica | Alto (canvas). |
| `src/scripts/home-v2/Globe.jsx` | `/` | **Globe React** — SVG + canvas/animação | Visual + lógica. Acoplado a `min-height` da hero. | **Alto** |
| `src/scripts/home-v2/Coverage.jsx` | `/` | Mapa de cobertura | Visual + lógica. | **Alto** |
| `src/scripts/home-v2/AppDashboard.jsx` | `/` | Mock animado | Visual | Médio. |
| `src/scripts/home-v2/{Hero, Tech, FpsBooster, MultiGame, ProPlayers, Media, Faq, CtaBanner, Stats}.jsx` | `/` | Componentes React com layout próprio | Visual | Médio. |
| `src/styles/home-v2/components.css` | `/` | Keyframes próprios (pulses, halos) | CSS | Baixo. |
| `src/styles/global/utilities.css` | global | `@keyframes np-pulse` + `.glow-dot--pulse` | CSS | Baixo. |
| `src/styles/global/typography.css` | global | `@font-face` Bai Jamjuree (7 pesos + 2 italics) | Asset | Baixo. |

**Não foram encontradas** dependências de **GSAP**, **Three.js**, **anime.js** ou qualquer biblioteca externa de animação. **`src/scripts/features/` e `src/styles/features/` não existem** (documentados em `features.md` como estrutura alvo, mas ainda não materializados). **`complementary.css` não existe** — `overrides.css` exerce o papel equivalente.

### 4.5 Estrutura de seções

| Padrão / classe | Onde é definido | Onde é consumido | Status |
|---|---|---|---|
| `.section-viewport` | `src/styles/global/layout.css` | `/affiliates` (section-two/three/four) | OK como pattern local. Usa `100vh` em vez de `100svh` (diverge das docs). |
| `.section-fullscreen` | `src/styles/global/layout.css` | **Nenhum lugar** | Órfã. |
| `.section-full` | docs (`sections.md`) | **Nenhum CSS** | Documentada, mas **não implementada como classe global**. |
| `.section-default` | docs | **Nenhum CSS** | Idem. |
| `.section-compact` | docs | **Nenhum CSS** | Idem. |
| `.section` | `layout.css` | `/support` (FAQ) | OK. |
| `.section-footer` | `footer.css` + `footer.js` | Todas as páginas | OK estrutural; `height: 100vh` diverge da regra "usar min-height". |
| `.section-one`/`-two`/...`-five` | `pages/affiliates.css` | `/affiliates` | OK como pattern local. |
| `.hero-wrapper` | `pages/affiliates.css`, `pages/games.css` | `/affiliates`, `/games` | Duas definições diferentes, escopadas por `body.<page>-page`. |
| `min-h-screen` Tailwind | inline | `/download`, `/prices` | Não é `100svh`. |

---

## 5. Diagnóstico de container

| Item | Estado |
|---|---|
| Docs canonizam container em | `1280 px`, padding `24/20`. |
| `--np-container-max` em código | `1360 px`. **Diverge.** |
| `--max-width` em código | `1280 px`. **Órfão** — bate com a regra mas não é referenciado. |
| `--page-max` em código | Alias → `1360 px`. **Diverge.** |
| `--gutter` em código | `32 px`. **Diverge** (docs querem 24). |
| `maxWidth.np-container` no Tailwind | `1360 px`. **Diverge.** |
| `.container` Tailwind nativo | Desabilitado (`corePlugins.container = false`) ✅. |
| Tokens Tailwind extras divergentes | spacing (esquema `xs..3xl + header` × esquema `np-1..32 + np-page`), radius (faltam `np-xs / np-2xl`), shadows (`np-card/elev` × `np-sm/md/lg`). |
| Ocorrências literais `max-w-[1360px]` no HTML servido | **Nenhuma**. |
| Ocorrências literais `max-w-[1350px]` em qualquer lugar | **Nenhuma**. |
| Ocorrências literais `max-w-[1280px]` no HTML servido | **Nenhuma**. |
| `home-v2/tokens.css` redefine container | Sim — `--page-max: 1360px` hardcoded. |
| `home-v2/base.css` hardcoda 1360 | Sim — divider. |

**Conclusão § 5:**

O sistema está **convergido em 1360 px e padding 32 px** — o oposto da regra documentada. A migração de **1360 → 1280** e **32 → 24** afeta no mínimo 5 arquivos:

1. `src/styles/global/variables.css` (`--np-container-max`, `--gutter`)
2. `src/scripts/global/tailwind-config.js` (`maxWidth.np-container`)
3. `src/styles/home-v2/tokens.css` (`--page-max`)
4. `src/styles/home-v2/base.css` (max-width hardcoded)
5. `00/reference/docs-legacy/*` (apenas se quiser limpar a referência legada — não afeta produção)

E exige re-validação visual em **todas as 7 páginas** porque hero, deck 3D, carrossel, particles e Globe foram desenhados na largura atual.

**Onde 1360 aparece como legado** (mais detalhes em § 4.1): `variables.css`, `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`.
**Onde deve migrar para 1280 no futuro**: os 4 arquivos acima, depois validar `.container` / `.shell` em todas as páginas.
**Nada deve ser alterado nesta etapa.**

---

## 6. Diagnóstico de hero / header

### 6.1 Header

- Token único: `--np-header-height: 72px` (`variables.css` linha 163) + Tailwind `spacing.header: 72px`. ✅
- Header injetado por `src/components/header.js`. `position: fixed`, `height: 72px`, `background: rgba(5,7,10,0.92)` + `backdrop-filter: blur(20px)`, `z-index: 1000`. ✅
- **Nenhuma página redefine** a altura do header. ✅

### 6.2 Hero — compensação do header e dupla compensação

| Página | Mecanismo | Dupla compensação? |
|---|---|---|
| `/` (home v2) | `#root { padding-top: 72px }` + `#root > .section { min-height: calc(100vh - 72px) }` | ❌ Não — `padding-top` consome o espaço, filhos usam exatamente o restante. |
| `/affiliates` | `.section-one { min-height: 100vh; padding-top: 72px }` (uma única compensação por seção) | ❌ Não. |
| `/download` | `<section class="… min-h-screen pt-header …">` + filho `min-h-[calc(100vh-theme(spacing.header))]` | ⚠️ **Quase.** O filho compensa de novo, mas como `min-height` no container — não soma 144 px ao layout, só garante que o conteúdo interno alcance o fundo. **Padrão ambíguo.** |
| `/games` | `.jogos-page .hero-wrapper { min-height: 100vh; padding: 72px 0 60px }` | ❌ Não. |
| `/prices` | `min-h-screen pt-header` (uma vez) | ❌ Não. |
| `/support` | `pt-[calc(theme(spacing.header)+32px)]` (intencional, 104 px) — sem `min-h-screen` | ❌ Não. |
| `/claro` | `.hero { min-height: 100vh; padding-top: calc(var(--header-height) + 0px) }` | ❌ Não. |

**Padrão padrão hoje:** `min-height: 100vh; padding-top: 72px`. Funciona, mas o cálculo correto seria `min-height: calc(100svh - 72px)` (sem padding-top) — pois `100vh + 72px` empurra o fundo da hero 72 px abaixo da dobra.

**Em outras palavras: hoje toda hero do site é 72 px maior do que a dobra real.** Não há "espaço cortado" em desktop porque o conteúdo está centralizado, mas em mobile com chrome dinâmico (Safari) a hero pode "saltar". **Risco médio.**

### 6.3 Page shell

Docs prescrevem (`sections.md`, `architecture.md`):

```html
<body class="min-h-[100svh] flex flex-col">
  <header id="global-header"></header>
  <main class="flex-1">…</main>
  <footer id="global-footer"></footer>
</body>
```

**Realidade:**
- Nenhum `<body>` aplica `flex` ou `flex-col`.
- `<main>` existe em `/prices`, `/support`, `/download`, `/claro` mas **sem `flex-1`**.
- `/games` e `/affiliates` colocam sections diretamente no `<body>` (sem `<main>`).
- `/` (home v2) tem `<div id="root">` em vez de `<main>`.

→ Page shell **não implementado em nenhuma página**.

---

## 7. Diagnóstico de footer

- **Injeção:** `<footer id="global-footer"></footer>` em todas as 7 páginas. ✅ Alinhado com `components.md`.
- **Estrutura interna:** `<section class="section-footer"> <footer class="footer"> … </footer> </section>` montada por JS. ✅
- **Certificados:** dentro do footer (`.footer__certs`). ✅ Alinhado com `components.md` e `layout/sections.md`.
- **Altura:** `.section-footer { height: 100vh }` em desktop. **Diverge da regra "min-height, não height fixo"** (`sections.md`). Em mobile (≤1100px) relaxa para `min-height: 100vh`.
- **Padding-top de 72 px na seção do footer:** mantido como compensação simbólica do header, mas o footer não está colado ao header — esses 72 px viram **espaço morto** no topo do footer.
- **Comportamento estrutural (D-010):** **não cumprido.** O footer hoje se sustenta por **altura própria**, não pelo fluxo `body flex-col / main flex-1 / footer flex-shrink-0`. Se essa migração for feita, a regra `height: 100vh` deve sair junto.
- **Páginas curtas:** `/prices`, `/support`, `/claro` totalizam ~200vh (hero + footer). Não há sobreposição. Há scroll obrigatório para chegar ao footer — comportamento intencional, mas frágil porque depende inteiramente do `height: 100vh` do footer.

---

## 8. Diagnóstico de Tailwind

### 8.1 Tailwind ativo por página

| Página | Tailwind CDN | Comentário |
|---|---|---|
| `/` | ❌ | Home v2 React. Documentada como exceção em `tailwind-migration.md`. |
| `/affiliates` | ❌ | **`affiliates-reference.md` afirma erradamente que tem Tailwind ativo.** |
| `/download` | ✅ | Conversor Tailwind aplicado. |
| `/games` | ❌ | Fora de escopo da migração (carousel + deck 3D). |
| `/prices` | ✅ | Migrada (sem CSS de página). |
| `/support` | ✅ | Migrada com dependência cruzada de `pages/affiliates.css` (para FAQ). |
| `/claro` | ❌ | Usa `pages/home.css`. |

### 8.2 Tailwind config — divergências de tokens

| Categoria | Token doc (`tailwind-token-mapping.md`) | Token código (`tailwind-config.js`) | Status |
|---|---|---|---|
| Container | `maxWidth.np-container = 1280px` | `maxWidth.np-container = 1360px` | **Diverge** |
| Spacing | `np-1=4 / np-2=8 / np-3=12 / np-4=16 / np-5=20 / np-6=24 / np-8=32 / np-10=40 / np-12=48 / np-16=64 / np-24=96 / np-32=128 / np-page=24` | `np-xs=8 / np-sm=16 / np-md=24 / np-lg=40 / np-xl=64 / np-2xl=96 / np-3xl=128 / header=72` | **Esquema diferente** |
| Radius | `np-xs=6 / np-sm=8 / np-md=12 / np-lg=16 / np-xl=24 / np-2xl=32 / np-pill=9999` | `np-sm=8 / np-md=12 / np-lg=16 / np-xl=24 / np-pill=9999` (faltam `np-xs`, `np-2xl`) | **Parcial** |
| Shadows | `np-sm / np-md / np-lg / np-glow-sm / np-glow-md / np-glow-lg` | `np-card / np-elev / np-glow-sm / np-glow-md / np-glow-lg` | **Nomes divergentes** |
| Fontes | `np-display=['Bai Jamjuree','sans-serif']` | `np-display=['"Bai Jamjuree"','ui-sans-serif','system-ui','sans-serif']` | Funcionalmente equivalente. |
| Colors | `np.primary=#93FF18`, `np.bg=#000`, etc. | Idênticas. | ✅ |
| Preflight / container | Desabilitados | Idem. | ✅ |

### 8.3 Conflitos / duplicações

| Tipo | Onde | Severidade |
|---|---|---|
| Classes utilitárias do projeto (`.flex`, `.flex-col`, `.items-center`, `.justify-center`, `.justify-between`, `.flex-1`, `.grid`, `.grid-2`, `.grid-3`, `.grid-4`) em `layout.css` **vs** Tailwind. | Páginas Tailwind (`/download`, `/prices`, `/support`). CSS global vence porque carrega depois do JIT inline do CDN — frágil. | **Médio** |
| Token de container declarado em 4 lugares (`variables.css`, `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`). | Manutenção atômica impossível sem tocar todos. | Baixo (valores convergem hoje em 1360). |
| `--max-width: 1280px` órfão em `variables.css`. | Único lugar que bate com a regra das docs — mas não é usado. | Baixo. |
| `src/styles/pages/download.css` órfão (não linkado, mas presente). | Risco de retornar à cascade num futuro mau import. | Médio. |
| Plano de migração das docs prevê `complementary.css`, código usa `overrides.css`. | Inconsistência semântica. | Baixo. |
| `affiliates-reference.md` descreve uma realidade que não bate com `affiliates/index.html`. | Docs ↔ código divergem. | **Médio** (instrução errada para próximos agentes). |
| `decisions.md` D-009 (`100vh`) ↔ `sections.md` (`100svh`). | Inconsistência interna nas docs. | Médio. |
| `pages/pages.md` lista status, mas não menciona `/claro`. | Doc parcialmente desatualizada. | Baixo. |

### 8.4 Regra de prioridade Tailwind ↔ CSS (documentada)

`docs/frontend/tailwind.md` e `docs/ai-rules/code-rules.md` já estabelecem a regra:

> Tailwind é a primeira escolha. CSS tradicional só para exceções (animações complexas, keyframes, canvas, particles, globe, mapa, blur/glow avançado, estilos dependentes de JS).

→ **Não é preciso "criar" a regra.** O que falta é alinhar implementação aos tokens prescritos (1280, padding 24, esquema spacing `np-1..32`, etc.).

---

## 9. Riscos classificados

### Risco ALTO

1. **Migração de container 1360 → 1280**: afeta 4 arquivos centrais + revalidação visual em 7 páginas. `/affiliates` (referência aprovada), `/games` (deck 3D), `/` (Globe + AppDashboard) podem quebrar visualmente.
2. **Migração de spacing tokens** (Tailwind config): `tailwind-token-mapping.md` propõe esquema numérico (`np-1..32`) totalmente diferente do esquema atual (`np-xs..3xl`). Qualquer HTML que use `p-np-md`, `gap-np-sm`, etc. pára de funcionar se a config mudar sem nomes legacy preservados.
3. **Canvas particles em `/affiliates` e `/download`**: dimensão calculada via `parentElement.clientWidth/Height`. Mudança de container/overflow/z-index quebra o efeito.
4. **Componentes home-v2 (Globe, Coverage, AppDashboard)**: acoplados a `padding-top: 72px` do `#root` e `min-height: calc(100vh - 72px)` em `_integration.css`. Migração para `100svh` ou para page shell `flex-col` precisa de validação dedicada.
5. **`/affiliates` é fonte de verdade visual aprovada**: qualquer alteração nesta página exige snapshot antes/depois e classificação explícita de risco (D-002, `affiliates-reference.md`).

### Risco MÉDIO

6. **Migração de `100vh` → `100svh` em mobile Safari**: heroes hoje "saltam" 60–80 px quando o chrome dinâmico recolhe. A regra das docs já é `100svh` — mas o código está todo em `100vh`. Migrar exige validação em iOS Safari.
7. **Adoção do page shell prescrito**: `body { flex-col } / main { flex-1 } / footer { flex-shrink-0 }`. Implica remover `.section-footer { height: 100vh }`. Hoje o footer "se sustenta sozinho"; com o shell, ele passa a depender do `main` empurrá-lo.
8. **Drift entre páginas Tailwind e não-Tailwind**: ajuste no token de container/header precisa ser propagado em CSS var + Tailwind config + `home-v2/tokens.css` simultaneamente.
9. **`.flex` / `.grid` colidindo entre `layout.css` e Tailwind**: funciona por acidente de ordem de carregamento. Solução: renomear utilitárias do projeto (`.np-flex`, etc.) **ou** remover do `layout.css` quando todas as páginas estiverem migradas.
10. **`/download` com dupla declaração de `pt-header`** (`min-h-screen pt-header` + filho `min-h-[calc(100vh-spacing.header)]`): padrão ambíguo. Padronizar.
11. **`/support` dependendo de `pages/affiliates.css`** apenas para o FAQ. Refator de `affiliates.css` quebra `/support` silenciosamente.
12. **`.section-footer` com `height: 100vh` + `padding-top: 72px`**: cria 72 px de espaço morto e fere a regra "usar `min-height`".
13. **`src/scripts/features/` e `src/styles/features/` ausentes**: features existentes (`interactions.js`, carousel) não seguem o contrato prescrito (`data-attributes`, `complementary.css` × CSS por feature). Quando GSAP/Three.js entrarem (previstos nos docs), essa estrutura precisa nascer primeiro.
14. **Docs internamente inconsistentes**: D-009 (`100vh`) ↔ `sections.md` (`100svh`); `affiliates-reference.md` ↔ realidade do HTML.

### Risco BAIXO

15. **`--max-width: 1280px` órfão** em `variables.css` — limpar quando for tocar tokens.
16. **`.section-fullscreen`** órfã em `layout.css`.
17. **`home-v2/base.css` hardcoda `1360px`** no divider — substituir por var.
18. **Plano da migração legacy menciona `complementary.css`**, código usa `overrides.css` — renomear no doc ou no código.
19. **`src/styles/pages/download.css` órfão** — remover quando confirmar que `overrides.css` cobre tudo.
20. **`docs/design.md` (local mount)** diverge do design system NoPing — não é a fonte de verdade do projeto.
21. **Faixa de `<style id="__om-edit-overrides">` ou similar** — não detectada; nada para preservar.

---

## 10. Recomendações para a próxima etapa

> Ordem sugerida — **nenhuma alteração de código nesta etapa**. Cada item exige um pedido explícito separado.

### Etapa A — Reconciliar docs ↔ docs (custo zero em código)

1. Resolver **D-009 vs `sections.md`**: o projeto vai usar `100vh` ou `100svh`? Recomendação técnica: `100svh` (alinhado com `sections.md`, `responsive.md`, `support-implementation-plan.md`). Atualizar D-009 em `decisions.md`.
2. Atualizar **`affiliates-reference.md`** para refletir o HTML real (`affiliates.css` continua presente, Tailwind CDN não está ativo, `overrides.css` não é linkado). Marcar `max-w-[1360px]` que ainda lá está **não no HTML**, mas no token CSS subjacente.
3. Renomear ocorrências de **`complementary.css` → `overrides.css`** em `features.md`, `feature-css-strategy.md`, `animation-feature-architecture.md`, `tailwind.md`, ou inverter (renomear o arquivo de código). Recomendar manter `overrides.css` (já existe e funciona) e atualizar docs.
4. Adicionar `/claro` ao `pages/pages.md` (hoje só consta no `README.md`).
5. Documentar a estrutura **atual** dos tokens Tailwind (`np-xs..3xl`, `np-card/elev`) como "atual" e a estrutura prescrita em `tailwind-token-mapping.md` como "alvo" — ou alinhar uma com a outra.

### Etapa B — Decisão de container (1360 vs 1280)

6. Aceitar formalmente a meta de **1280 px**. Aplicação em **branch isolada**, ordem sugerida:
   1. `prices/` → migrar primeiro (página mais simples, sem dependências visuais críticas).
   2. `support/` → segunda (validar com plano `support-implementation-plan.md`).
   3. `download/` → terceira (atenção ao canvas).
   4. `claro/` → quarta.
   5. `games/` → revalidar deck 3D e catálogo.
   6. `affiliates/` → **última** e com snapshot antes/depois obrigatório.
   7. `/` (home v2) → final, com validação dedicada do Globe.
7. Trocar `--gutter: 32px` por `--gutter: 24px` (e `20px` em mobile) somente depois de validar item 6.
8. Limpar `--max-width: 1280px` órfão (após migração; hoje é a única regra alinhada).

### Etapa C — Hero, sections e page shell

9. Implementar **page shell global** (`body.flex-col + main.flex-1 + footer.flex-shrink-0`) em uma página piloto (`/prices` ou `/support`). Validar que o footer continua íntegro **antes** de propagar.
10. Após page shell rodando, remover `height: 100vh` de `.section-footer` (passa a depender do flow estrutural).
11. Migrar `100vh` → `100svh` por página, validando em mobile Safari.
12. Substituir o atual `min-height: 100vh; padding-top: 72px` por `min-height: calc(100svh - var(--np-header-height))` (sem padding-top) — alinhado com `sections.md`. Validação visual por página.

### Etapa D — Tailwind config e tokens

13. Decidir se os tokens vão para o esquema `np-1..32` (proposto em `tailwind-token-mapping.md`) ou se as docs serão atualizadas para refletir o esquema atual (`np-xs..3xl`). Recomendação: manter `np-xs..3xl` (menor custo, esquema já enraizado nos arquivos de página).
14. Adicionar `np-page: 24px` ao spacing Tailwind (token usado em `tailwind-token-mapping.md` mas ausente no config).
15. Adicionar `np-xs: 6px` e `np-2xl: 32px` ao borderRadius do Tailwind, se a doc for mantida como alvo.
16. Resolver colisão de classes utilitárias `.flex`/`.grid` (renomear no `layout.css` para `.np-flex` etc., ou remover quando todas as páginas estiverem migradas para Tailwind).

### Etapa E — Features e animações

17. Criar `src/scripts/features/` + `src/styles/features/` quando a primeira feature reutilizável for extraída. Hoje o `interactions.js` já é candidato (particles + dataParticles).
18. Migrar o canvas das particles para `data-attributes` + wrapper isolado conforme `animation-feature-architecture.md`.
19. **Não tocar** em `Globe.jsx`, `Coverage.jsx`, `AppDashboard.jsx`, `interactions.js`, `carousel.js` sem pedido explícito.

### Proibido nesta etapa (já documentado em `code-rules.md`, `global-rules.md`)

- ❌ Alterar `affiliates/` visualmente.
- ❌ Alterar header / footer.
- ❌ Alterar animações.
- ❌ Trocar 1360 por 1280 ainda.
- ❌ Aplicar Tailwind migration ainda.
- ❌ Criar novos componentes.
- ❌ Apagar arquivos.

---

## Apêndice A — Stack de includes por página

**`/` (home v2)** — CSS: `variables → home-v2/tokens → home-v2/base → home-v2/components → home-v2/layout → components/header → components/footer → home-v2/_integration` · JS: React + Babel CDN → 15 JSX modules → `header → footer → faq → carousel → helpers → navigation → interactions → main`.

**`/affiliates`** — CSS: `variables → reset → typography → layout → utilities → components/{header,footer,buttons,cards,forms} → pages/affiliates` · JS: `header → footer → faq → carousel → buttons → helpers → navigation → interactions → main → pages/affiliates`.

**`/download`** — CSS: **Tailwind CDN + tailwind-config** → `variables → reset → typography → layout → utilities → components/{header,footer,buttons,cards,forms} → overrides` · JS: pipeline padrão + `pages/download`.

**`/games`** — CSS: idêntico a `/affiliates` substituindo `pages/affiliates` por `pages/games`. **Sem Tailwind.**

**`/prices`** — idêntico a `/download` (sem CSS de página).

**`/support`** — idêntico a `/download` **mais** `pages/affiliates.css` (necessário para o FAQ).

**`/claro`** — CSS: `variables → reset → typography → layout → utilities → components/{header,footer,buttons,cards,forms} → pages/home`. **Sem Tailwind.**

---

## Apêndice B — Comandos de busca usados nesta auditoria

| Para verificar | Padrão regex |
|---|---|
| Container hardcoded | `1280\|1350\|1360` |
| Compensação de header | `100vh\|100svh\|min-h-screen\|pt-header\|section-viewport\|--np-header-height` |
| Page shell | `flex-1\|flex:.*1\|flex-shrink` |
| Animações / canvas | `gsap\|three\|canvas\|particles\|globe` |
| Arquivos previstos | `complementary\.css\|features/` |
| Footer global | `section-footer` |
| Tipografia | `Bai Jamjuree\|@font-face` |

---

## Apêndice C — Diferenças entre docs e código (resumo em uma linha)

```
container.max-w     docs=1280px    code=1360px      (4 fontes)
container.padding   docs=24/20px   code=32px        (--gutter)
section.unit        docs=100svh    code=100vh       (0 ocorrências de svh)
section.formula     docs=calc(100svh - header)   code=100vh + padding-top:72px
shell.body          docs=min-h:100svh; flex-col   code=min-h:100vh; overflow-x:hidden
shell.main          docs=<main class="flex-1">    code=<main> sem flex
footer.height       docs=via flex shell           code=height:100vh
tw.spacing-scheme   docs=np-1..32 + np-page       code=np-xs..3xl + header
tw.radius-scheme    docs=np-xs..2xl + np-pill     code=np-sm..xl + np-pill
tw.shadow-scheme    docs=np-sm/md/lg              code=np-card/elev
css-extra-name      docs=complementary.css        code=overrides.css
features-folder     docs=src/scripts/features/    code=ausente
affiliates-doc      doc.claims=tailwind+overrides  code.real=affiliates.css only
decisions.D-009     doc=100vh                     sections.md=100svh   (conflito interno)
```

---

**Fim do diagnóstico. Nada foi alterado.**
Próximo passo recomendado: revisar a Etapa A (alinhamento docs ↔ docs) antes de qualquer migração de código.
