# Final Audit — 2026-05-21

> **Tipo:** auditoria de prontidão. Somente leitura. Nenhum HTML/CSS/JS/asset alterado.
> **Escopo:** todas as 7 páginas do site após Blocos 1-5. Foco especial no problema da home no GitHub Pages.

---

## 1. Resumo executivo

| Categoria | Veredito | Observação |
|---|---|---|
| Container | ⚠️ atenção | 4 páginas em 1280px (inline/scoped), 3 em 1360px (legacy). Tokens globais ainda em 1360. |
| Hero / 100svh | ✅ correto | Padrão `Header + Section = 100svh` aplicado em todas as páginas migradas. `/affiliates` e parte da home usam `100vh` ainda (decisão consciente). |
| Page shell | ⚠️ atenção | Implementado em 4 páginas. `/affiliates` (sections direto no body) e `/games`/home (estrutura diferente) usam padrões equivalentes. |
| Footer global | ✅ correto | Funcionando consistentemente nas 7 páginas. `.section-footer { height: 100vh }` legacy preservado intencional (D-018 sugerido). |
| Header global | ✅ correto | Fixo, 72px, intacto. |
| Componentes globais | ✅ correto | header.js, footer.js, faq.js, carousel.js, buttons.js — zero alterações. |
| Tailwind config | ⚠️ atenção | Esquema de tokens `np-xs..3xl` ainda diverge de `tailwind-token-mapping.md` (meta `np-1..32`). Documentado em D-017. |
| Particles / Canvas | ✅ correto | `interactions.js` intacto. Canvas em `/affiliates` e `/download` opera. |
| Carousel / Deck 3D | ✅ correto | `carousel.js` + deck 3D em `/games` operacionais. |
| Globe / React (home v2) | ✅ correto | 15 JSX modules + Globe intactos. |
| **Home no GitHub Pages** | ❌ **problema** | Página inicia visualmente próxima ao footer, depois "volta" para a hero. **Diagnóstico em § 8.** |
| Documentação | ✅ correto | `/docs` consistente. Reports completos por bloco. |
| Próximas páginas | ✅ pronto | Padrão consolidado; pequena limpeza de órfãos sugerida antes. |

**Veredito geral:** projeto **estável e pronto para próximas páginas**, com 1 problema conhecido (home no GitHub) documentado abaixo, e 3 itens de limpeza de baixa prioridade.

---

## 2. Situação geral do projeto

**Arquivos NUNCA alterados desde o início desta iteração:**

- `src/components/header.js`, `footer.js`, `faq.js`, `carousel.js`, `buttons.js`
- `src/styles/components/header.css`, `footer.css`, `buttons.css`, `cards.css`, `forms.css`
- `src/scripts/global/interactions.js` (canvas + particles)
- `src/scripts/global/main.js`, `helpers.js`, `navigation.js`, `tailwind-config.js`
- `src/scripts/pages/*.js` (todos os 6 JS de página)
- `src/scripts/home-v2/*.jsx` (todos os 15 JSX)
- `src/styles/home-v2/*.css` (todos: tokens, base, components, layout, _integration)
- `src/styles/pages/affiliates.css`, `games.css`, `home.css`
- `src/styles/global/variables.css`, `reset.css`, `typography.css`, `layout.css`, `utilities.css`

**Arquivos alterados nesta iteração (apenas em estágios de migração):**

| Arquivo | Etapa de mudança |
|---|---|
| `support/index.html` | Bloco 3 (page shell + container 1280 inline) |
| `prices/index.html` | Bloco 4 |
| `claro/index.html` | Bloco 4 (body class + link de overrides) |
| `download/index.html` | Bloco 4 |
| `affiliates/index.html` | Bloco 5 (body class + link de overrides — sem CSS overrides) |
| `games/index.html` | Bloco 5 (link de overrides) |
| `index.html` (home) | Bloco 5 (link de overrides) |
| `src/styles/overrides.css` | Blocos 3-5 (apenas aditivas, escopadas por classe de página) |

---

## 3. Auditoria por página

### 3.1 `/` (home v2) — ⚠️ atenção (problema do GitHub Pages — ver § 8)

**Estrutura:**
- Body: `class="home-page min-h-[100svh] flex flex-col" data-page="home"` (essas classes Tailwind NÃO são aplicadas — home não carrega Tailwind, mas estão no HTML como documentação intencional). Display real: `block`.
- `<div class="grid-bg">` — fixed background
- `<header id="global-header">` — placeholder vazio, injeção via JS
- `<div id="root">` — React mount point (15 JSX modules)
- `<footer id="global-footer">` — placeholder vazio, injeção via JS

**CSS aplicado:**
- `home-v2/{tokens, base, components, layout, _integration}.css`
- `components/header.css`, `footer.css`
- `overrides.css` (`.home-page #root { min-height: calc(100svh - 72px) }`)

**Hero / viewport:**
- `#root { padding-top: 72px; min-height: calc(100svh - 72px) }` (Bloco 5)
- `#root > .section, #root > .hero { min-height: calc(100vh - 72px) }` (de `_integration.css`, NÃO migrado para svh para preservar `.section-sm { min-height: 0 }`)

**Footer:** global injetado, `.section-footer { height: 100vh }`. ✅

**Container:** 1360 (legacy via `.shell`, `.container`). Globo + Coverage + AppDashboard dimensionados nessa largura. **Migração para 1280 fora de escopo.**

**Animações sensíveis:** Globe.jsx, Coverage.jsx, AppDashboard.jsx, Hero.jsx, Stats.jsx, Tech.jsx, FpsBooster.jsx, MultiGame.jsx, ProPlayers.jsx, Media.jsx, Faq.jsx, CtaBanner.jsx.

**Risco:** ❌ problema de scroll inicial no GitHub Pages (ver § 8).

---

### 3.2 `/claro/` — ✅ correto

**Estrutura:** body `class="claro-page"`, `<main>` interna ao layout.
**Hero:** `min-height: calc(100svh - 72px)` via override scoped.
**Container:** `.claro-page .container { max-width: 1280px }`.
**Footer:** global. ✅
**JS sensível:** tutorial de 6 passos com platform selector + lightbox (em `pages/home.js`).
**Risco:** baixo.

---

### 3.3 `/affiliates/` — ✅ correto (preservação intencional)

**Estrutura:** body `class="affiliates-page"`, sections direto no body (sem `<main>` wrapper).
**Hero:** `min-height: 100vh + padding-top: 72px + box-sizing: border-box` (de `pages/affiliates.css`). Equivalente visual a `calc(100svh - 72)` em desktop.
**Container:** `.shell` em 1360 (legacy, intencional — referência visual aprovada).
**Footer:** global. ✅
**JS sensível:** particles canvas (`hero-particles`), carousel de cards (`affiliates-track`), fade rotator de embaixadores, FAQ accordion.
**Tentativa de override de svh em sections foi revertida no Bloco 5** porque quebrou a responsividade do hero-wrapper.
**Risco:** baixo (preservação intencional).

---

### 3.4 `/games/` — ✅ correto

**Estrutura:** body `class="jogos-page"`. Sections direto no body.
**Hero:** `.jogos-page .hero-wrapper { min-height: 100svh }` (Bloco 5 svh upgrade).
**Catálogo:** `.sect-2 { min-height: 100svh }` (Bloco 5 svh upgrade).
**Container:** `.shell` em 1360 (legacy — deck 3D dimensionado nessa largura).
**Footer:** global. ✅
**JS sensível:** deck 3D rotação (`#deck-stack` com 5 cards), dropdowns sort/genre.
**Risco:** baixo.

---

### 3.5 `/download/` — ✅ correto

**Estrutura:** body `class="downloads-page min-h-[100svh] flex flex-col"`, `<main class="flex-1 flex flex-col pt-header">`.
**Hero:** `min-h-[calc(100svh-theme(spacing.header))]` Tailwind (Bloco 4).
**Container:** `max-w-[1280px] mx-auto px-5 md:px-8` (Bloco 4).
**Footer:** global. ✅
**JS sensível:** dataParticles canvas (mouse-reactive pulses), toggle group de plataforma.
**Risco:** baixo.

---

### 3.6 `/support/` — ✅ correto

**Estrutura:** body `class="support-page min-h-[100svh] flex flex-col"`, `<main class="flex-1 flex flex-col pt-header">`.
**Hero:** `min-h-[calc(100svh-theme(spacing.header))]` + `py-np-md` (Bloco 3).
**FAQ:** `max-w-[1280px] mx-auto px-5 md:px-8` (Bloco 3).
**Container:** 1280 inline.
**Footer:** global. ✅ (`.section-footer { height: 100vh }` mantido após lição de Bloco 3 sobre o `.footer__top { align-content: center }`).
**JS sensível:** FAQ accordion compartilhado com /affiliates.
**Risco:** baixo.

---

### 3.7 `/prices/` — ✅ correto

**Estrutura:** body `class="prices-page min-h-[100svh] flex flex-col"`, `<main class="flex-1 flex flex-col pt-header">`.
**Hero:** `min-h-[calc(100svh-theme(spacing.header))]` + `py-np-md`.
**Container:** `max-w-[720px]` (mais estreito que 1280, intencional pelo conteúdo simples).
**Footer:** global. ✅
**Risco:** baixo (página mais simples do site).

---

## 4. Auditoria de layout

| Regra | Status | Detalhe |
|---|---|---|
| Container 1280px | ⚠️ parcial | `/support`, `/prices`, `/download` aplicam 1280 via Tailwind inline. `/claro` aplica via override CSS. `/affiliates`, `/games`, home v2 continuam em 1360 (legacy). Tokens globais (`--np-container-max`, Tailwind `np-container`) ainda em 1360. |
| Gutters (32 desktop / 20 mobile) | ⚠️ parcial | `--gutter` ainda em 32 globalmente. Mobile 20 só nas páginas migradas (via `px-5 md:px-8`). |
| Header 72px fixo | ✅ correto | `--np-header-height` único, intacto. |
| `Header + Section = 100svh` | ⚠️ parcial | Padrão canônico aplicado em 4 páginas. `/affiliates` usa `100vh` (decisão D-015). Home v2 usa svh apenas em `#root` (decisão para não quebrar `.section-sm`). `/games` aplica em `.hero-wrapper` e `.sect-2`. |
| `min-height` em vez de `height` fixo | ⚠️ parcial | Padrão respeitado nas páginas novas. Existe `.section-footer { height: 100vh }` global INTENCIONAL (preserva centralização vertical do footer). Existe `.section-five { height: 100vh }` em `pages/affiliates.css` legacy. |
| Sem dupla compensação | ✅ correto | Validado em todas as 4 páginas migradas (Blocos 3-5). |
| Page shell `body flex-col + main flex-1 + footer flex-shrink-0` | ⚠️ parcial | Aplicado em `/support`, `/prices`, `/download`, `/claro`. `/affiliates` (sections no body) e `/games` (legacy) usam padrões equivalentes funcionais. Home v2 usa `#root` como main equivalent. |
| Footer fora da hero | ✅ correto | Sempre `<footer id="global-footer">` no fim do body, injetado independente da hero. |
| Certificados no footer | ✅ correto | Faixa `footer__certificates` global, dentro de todas as páginas. |

---

## 5. Auditoria de Tailwind / CSS

### 5.1 Tailwind ativo por página

| Página | Tailwind CDN | Comentário |
|---|---|---|
| `/` (home v2) | ❌ | React app — exceção formal (`tailwind-migration.md`). |
| `/affiliates` | ❌ | Referência legacy — exceção formal. |
| `/games` | ❌ | Legacy — exceção formal (deck 3D + carousel). |
| `/claro` | ❌ | Legacy `pages/home.css` — migração via overrides CSS. |
| `/download` | ✅ | Migrada (Bloco 4). |
| `/support` | ✅ | Migrada (Bloco 3). |
| `/prices` | ✅ | Migrada (Bloco 4). |

### 5.2 Conflitos / divergências

| Item | Status |
|---|---|
| Classes utilitárias `.flex`, `.grid` em `layout.css` vs Tailwind | ⚠️ Cascade frágil — funciona por ordem de carregamento. Documentado em audit Bloco 1. |
| Token de container declarado em 4 lugares (todos = 1360) | ⚠️ Manutenção atômica impossível sem tocar todos. Documentado D-014. |
| `--max-width: 1280px` órfão | ⚠️ Não usado. Candidato a limpeza. |
| `src/styles/pages/download.css` órfão | ⚠️ Não linkado mas presente. Candidato a remoção. |
| `.section-fullscreen` órfã em `layout.css` | ⚠️ Não usado. Candidato a remoção. |
| Esquema de tokens Tailwind (`np-xs..3xl`) vs meta em `tailwind-token-mapping.md` (`np-1..32`) | ⚠️ Divergência documentada como D-017. Recomendação: atualizar a meta para refletir o esquema atual, não o contrário. |

### 5.3 `overrides.css`

Estado atual (revisado 2026-05-21):

- `/support` — page shell fallback `@supports`
- `/prices` — page shell fallback `@supports`
- `/claro` — page shell completo + container 1280 + svh override + `@supports`
- `/download` — page shell fallback `@supports`
- `/affiliates` — apenas comentário documentando que NÃO usa overrides
- `/games` — svh upgrade (min-height) + `@supports`
- `/` (home v2) — svh upgrade apenas em `#root` + `@supports`
- (Existente) `.support-topics` override do FAQ-as-topics
- (Existente) `.downloads-page .hero__downloads .btn.active` styles
- (Existente) hover glows dos cards de contato

Tudo escopado por classe de página — nenhuma regra global tocada.

---

## 6. Auditoria de componentes globais

| Componente | Arquivos | Status |
|---|---|---|
| Header | `src/components/header.js` + `header.css` | ✅ INTACTO desde o início |
| Footer | `src/components/footer.js` + `footer.css` | ✅ INTACTO desde o início |
| FAQ | `src/components/faq.js` | ✅ INTACTO |
| Carousel | `src/components/carousel.js` | ✅ INTACTO |
| Buttons helpers | `src/components/buttons.js` | ✅ INTACTO (smoothAnchors, toggleGroup) |
| Tailwind config | `src/scripts/global/tailwind-config.js` | ✅ INTACTO |
| Interactions (particles) | `src/scripts/global/interactions.js` | ✅ INTACTO |
| Main boot | `src/scripts/global/main.js` | ✅ INTACTO |

---

## 7. Arquivos sensíveis identificados

### Animações + Canvas

| Arquivo | Páginas que usam | Tipo |
|---|---|---|
| `src/scripts/global/interactions.js` | `/affiliates`, `/download` | Canvas 2D — particles + dataParticles |
| `src/components/carousel.js` | `/affiliates` | Auto-scroll horizontal + fade rotator |
| `src/scripts/pages/games.js` | `/games` | Deck 3D rotação + dropdowns |
| `src/scripts/pages/affiliates.js` | `/affiliates` | Boot canvas + carousel + faq |
| `src/scripts/pages/download.js` | `/download` | Boot dataParticles + toggle group |
| `src/scripts/pages/home.js` | `/claro` | Tutorial dinâmico + lightbox |

### React (home v2 only)

| Arquivo | Componente |
|---|---|
| `src/scripts/home-v2/App.jsx` | Boot da app |
| `src/scripts/home-v2/Hero.jsx` | Hero + globe layout |
| `src/scripts/home-v2/Globe.jsx` | **Globe animado** |
| `src/scripts/home-v2/Stats.jsx` | 4 stat cards |
| `src/scripts/home-v2/Tech.jsx` | Tech grid |
| `src/scripts/home-v2/FpsBooster.jsx` | FPS section |
| `src/scripts/home-v2/MultiGame.jsx` | Game tiles |
| `src/scripts/home-v2/AppDashboard.jsx` | Dashboard mock |
| `src/scripts/home-v2/Coverage.jsx` | **Mapa de cobertura** |
| `src/scripts/home-v2/ProPlayers.jsx` | Carousel reutilizado |
| `src/scripts/home-v2/Media.jsx` | Media grid |
| `src/scripts/home-v2/Faq.jsx` | FAQ reutilizado |
| `src/scripts/home-v2/CtaBanner.jsx` | CTA strip |
| `src/scripts/home-v2/TweaksPanel.jsx` | Painel de tweaks (oculto) |

### CSS sensível (não tocar)

- `src/styles/pages/affiliates.css` — REFERÊNCIA visual aprovada (D-002, D-015)
- `src/styles/pages/games.css` — deck 3D + carousel
- `src/styles/home-v2/_integration.css` — bridge React + global
- `src/styles/components/footer.css` — `.footer__top { align-content: center }` depende de `height: 100vh` (D-018 sugerido)

**Nenhuma biblioteca externa** detectada (sem GSAP, sem Three.js, sem anime.js).

---

## 8. Diagnóstico — home no GitHub Pages

### 8.1 Sintoma reportado

> "A página inicial começa visualmente no footer e depois volta para a hero."

### 8.2 Investigação

**O que o código tenta fazer (atualmente):**

1. `<head>` tem script inline que executa em parse-time:
   ```html
   <script>
     try { history.scrollRestoration = 'manual'; } catch (e) {}
     window.scrollTo(0, 0);
   </script>
   ```
2. `_integration.css` reserva espaço no `#root`:
   ```css
   #root { padding-top: 72px; min-height: calc(100vh - 72px); background: var(--bg-1); }
   ```
3. Footer não tem reserva mínima — `<footer id="global-footer"></footer>` placeholder vazio tem 0px.

**O que acontece na realidade:**

| Tempo | Estado do DOM | Document height | Visibilidade |
|---|---|---|---|
| t=0 (HTML parsed) | head script roda `scrollTo(0,0)` | — | scroll set a 0 |
| t=10ms (body renderizado) | grid-bg (fixed, 0 flow) + header empty (0px) + #root reserved (≈928px) + footer empty (0px) | ~928px (< viewport) | Usuário vê espaço escuro vazio. Não há rolagem (page < viewport). |
| t=200ms (footer.js sincrono) | footer.js injeta `<section class="section-footer">` com **`height: 100vh`** (de `footer.css`) | ~928 + 1000 = ~1928px | scrollY ainda 0. Topo 1000px visível: 928 de #root vazio + ~72px de topo do footer (que tem `padding-top: 72px` interno, então é escuro também). |
| t=300-800ms (Babel transpila JSX) | nada visível ainda | mesmo | — |
| t=800-1200ms (React mounta) | `#root` cresce de 928px → ~6500px | ~6500 + 1000 = ~7500px | **AQUI O PROBLEMA**: scroll-anchoring do navegador pode reagir. |

### 8.3 Causa provável: **scroll anchoring + footer placeholder sem reserva**

Navegadores modernos (Chrome 56+, Firefox 66+, Safari 17+) usam **scroll anchoring por padrão**: quando o conteúdo *acima* da viewport cresce dinamicamente, o navegador tenta manter o elemento *visível* na mesma posição visual, ajustando o `scrollY`.

**Sequência exata:**

1. Antes de React mountar: scrollY=0. Visível: y=0..1000. O elemento "ancorável" para o scroll-anchoring é geralmente o último elemento *renderizado* na viewport — neste caso, o topo do `.section-footer` (parte visível em y=928..1000).
2. React monta. `#root` cresce de ~928px → ~6500px. O `.section-footer` desloca de y=928 → y=6500 no documento.
3. Scroll anchoring reage: para manter o `.section-footer` visualmente onde estava (em y=928 da viewport), o navegador ajusta `scrollY` de 0 → ~5572.
4. **Resultado:** o usuário agora está em scrollY=5572, vendo a área próxima ao footer (FAQ + CTA + topo do footer).
5. Eventualmente o usuário rola manualmente para o topo, OU algum script força scroll (mas não há nenhum no código atual).

### 8.4 Por que acontece no GitHub Pages mas talvez não localmente?

- **Localmente** (file://, dev server rápido): Babel transpila em <50ms. React mounta antes que footer.js injete (ou no mesmo frame). Sem janela perceptível de "footer visível sem React" → sem trigger do scroll anchoring.
- **GitHub Pages** (latência de rede + Babel CDN cold): a janela entre footer.js (rápido, no DOM logo) e React mount (lento, depende de Babel) é de ~500-1000ms. Tempo suficiente para o navegador estabelecer o scroll anchor no footer.

### 8.5 Possíveis correções (NÃO IMPLEMENTAR — apenas diagnóstico)

| Opção | Custo | Risco |
|---|---|---|
| **A.** `#root { min-height: 100vh }` em vez de `calc(100vh - 72px)` | Trivial (1 linha em `_integration.css` ou em `overrides.css`) | Baixo — empurra footer ABAIXO da dobra inicial, eliminando o anchor. |
| **B.** Adicionar `overflow-anchor: none` em `body` enquanto React não mounta, depois remover | Médio (precisa de JS sincronizado com React mount) | Médio. |
| **C.** Reservar espaço para o footer placeholder via CSS: `footer#global-footer:empty { min-height: 100vh; display: block; background: #000 }` | Trivial (1 regra CSS) | Baixo — footer placeholder ocupa 100vh, total empty = 928 + 1000 = 1928. Mas não muda o anchor. **NÃO resolve.** |
| **D.** Esconder footer placeholder até React mount: `body:not(.app-ready) footer#global-footer { display: none }` + JS marca `app-ready` quando React mounta | Baixo (1 CSS + 1 JS em App.jsx) | Baixo — footer literalmente não existe no DOM até React mount, sem anchor possível. |
| **E.** Pre-render do React (SSR) | Alto (build step novo) | — |

**Recomendação técnica:** opção A (`#root { min-height: 100vh }`). Empurra o footer placeholder para baixo da dobra inicial, eliminando o trigger do scroll anchoring. Custo 1 linha, baixíssimo risco.

A inline script `scrollTo(0, 0)` no head já existe mas é insuficiente porque roda ANTES do scroll anchoring reagir (que reage durante reflow do React mount).

---

## 9. Riscos encontrados

### Risco ALTO

1. **Home no GitHub Pages — flash de footer no boot** — diagnosticado em § 8. Não foi corrigido nesta etapa.

### Risco MÉDIO

2. **`.section-footer { height: 100vh }` é dependência crítica**, mas não está documentada como decisão em `decisions.md`. Sugerido D-018.
3. **Drift entre páginas Tailwind e não-Tailwind** — qualquer mudança em token de container/header precisa ser propagada em CSS var + Tailwind config + `home-v2/tokens.css`.
4. **`overflow-anchor` não está documentado** — o comportamento padrão do navegador é mantê-lo ON. Sem documentação, agentes futuros podem não saber.

### Risco BAIXO

5. **`--max-width: 1280px` órfão** em `variables.css`.
6. **`src/styles/pages/download.css` órfão** (não linkado).
7. **`.section-fullscreen` órfã** em `layout.css`.
8. **`home-v2/base.css` hardcoda `max-width: 1360px`** no divider.
9. **Esquema de tokens Tailwind divergente da meta documentada** (D-017).
10. **Body class `min-h-[100svh] flex flex-col` em `index.html` (home)** — essas classes Tailwind NÃO funcionam porque home não carrega Tailwind. Estão no HTML mas sem efeito. Não causa bug, mas confunde leitores.

---

## 10. Pontos que ainda merecem atenção antes de criar novas páginas

### 10.1 Limpeza recomendada (custo zero, baixo risco)

- [ ] Remover `src/styles/pages/download.css` órfão
- [ ] Remover `--max-width: 1280px` órfão de `variables.css`
- [ ] Remover `.section-fullscreen` órfã de `layout.css`
- [ ] Substituir `max-width: 1360px` hardcoded em `home-v2/base.css` por `var(--np-container-max)` (caso D-014 seja executado depois)
- [ ] Remover classes Tailwind do body de `index.html` (home) que não funcionam (`min-h-[100svh] flex flex-col`) — manter apenas `home-page`

### 10.2 Documentação a atualizar

- [ ] Adicionar **D-018** em `decisions.md`: `.section-footer { height: 100vh }` global é INTENCIONAL para preservar centralização interna do footer (lição de Bloco 3).
- [ ] Adicionar **D-019** em `decisions.md`: ao criar overrides scoped por classe de página, NUNCA usar `height` se o CSS original tem `@media` com `height: auto` (lição de Bloco 5 / `/affiliates`).
- [ ] Adicionar **D-020** em `decisions.md`: cuidado com sections com `min-height: 0` intencional ao overriding `#root > .section` no React app (lição de Bloco 5 / home v2).
- [ ] Adicionar **D-021** em `decisions.md`: documentar o problema de scroll anchoring no boot do React (home v2) e a solução escolhida (se/quando aplicada).
- [ ] Atualizar `docs/migration/layout-audit-2026-05-21.md` para refletir que os "pontos pendentes" listados foram parcialmente executados (4 páginas migradas).
- [ ] Atualizar `docs/frontend/tailwind-token-mapping.md` para refletir o esquema atual (`np-xs..3xl`) como **canônico**, não como meta futura.

### 10.3 Decisão a tomar antes de mexer no container global

- [ ] **Manter `--np-container-max` em 1360 indefinidamente** (porque `/affiliates`, `/games`, home v2 foram dimensionadas nessa largura)?
- [ ] **OU migrar para 1280** com revalidação visual de 3 páginas sensíveis?

Recomendação: **manter em 1360 como "legado consolidado"** e atualizar `decisions.md` D-014 para indicar que a migração foi adiada indefinidamente para preservar as páginas aprovadas. Novas páginas continuam usando `max-w-[1280px]` inline.

### 10.4 Padrão consolidado para próximas páginas

Quando criar uma nova página, usar este template:

```html
<body class="<page-key>-page min-h-[100svh] flex flex-col" data-page="<page-key>" data-screen-label="<Label>">
  <div class="grid-bg"></div>
  <header id="global-header" data-active="<page-key>"></header>
  <main class="flex-1 flex flex-col pt-header">
    <section id="hero" class="relative min-h-[calc(100svh-theme(spacing.header))] py-np-md flex flex-col items-center justify-center text-center">
      <div class="relative z-[2] w-full max-w-[1280px] mx-auto px-5 md:px-8">
        <!-- conteúdo -->
      </div>
    </section>
    <!-- outras sections -->
  </main>
  <footer id="global-footer"></footer>
  <!-- scripts pipeline padrão -->
</body>
```

E no `overrides.css`, adicionar:

```css
@supports not (height: 100svh) {
  .<page-key>-page { min-height: 100vh; }
}
```

---

## 11. Recomendação de próximos passos

1. **Decidir sobre o flash do GitHub Pages** (home v2): aplicar correção A do § 8.5 (alterar `#root { min-height: 100vh }` em `_integration.css` ou via override em `overrides.css`).
2. **Limpar órfãos** (§ 10.1) em uma etapa única de baixo risco.
3. **Atualizar `decisions.md`** com D-018 a D-021 (§ 10.2).
4. **Atualizar `tailwind-token-mapping.md`** para refletir esquema atual.
5. **Criar nova página** seguindo o template do § 10.4.

---

## Apêndice — checklist de prontidão

| Critério | Status |
|---|---|
| 7 páginas renderizam sem erro de console (exceto warn esperado do Tailwind CDN) | ✅ |
| Header global injetado em todas as páginas | ✅ |
| Footer global injetado em todas as páginas | ✅ |
| Certificados visíveis no footer | ✅ |
| Hero ocupa primeira dobra em todas as páginas migradas | ✅ |
| Sem dupla compensação de header | ✅ |
| Container respeitado por textos, botões, cards (cada página com seu valor: 1280 ou 1360 legacy) | ✅ |
| Backgrounds e canvas full-width | ✅ |
| Animações sensíveis preservadas | ✅ |
| Documentação consolidada | ✅ |
| Próximas páginas têm template canônico | ✅ |
| Flash de footer no boot da home no GitHub Pages | ❌ |

---

**Fim da auditoria. Pronto para próximas páginas após decisão sobre o item 1.**
