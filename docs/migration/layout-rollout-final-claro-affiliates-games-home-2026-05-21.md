# Layout Rollout Final — /claro, /affiliates, /games, / (home) — 2026-05-21

> **Etapa:** Bloco 5 — expansão final das regras aprovadas para as 4 páginas restantes.
> **Status:** implementado com snapshots before/after por página, validação técnica via DOM/CSS computed, e duas reversões pontuais (em /affiliates e em /home) após detectar regressões reais.

---

## 1. Resumo executivo

4 páginas verificadas e alinhadas estruturalmente, com graus diferentes de aplicação dependendo do risco visual:

| Página | Estratégia aplicada | Mudanças | Status |
|---|---|---|---|
| `/claro` | **Já migrada em Bloco 4.** Apenas verificada. | (Nenhuma nesta etapa) | ✅ verificado |
| `/affiliates` | **Minimal-only.** Body class + link de overrides.css. Sem CSS overrides. | 1 edit em `affiliates/index.html`. Nenhuma regra CSS adicionada. | ✅ preservado |
| `/games` | **Min-height upgrade.** `100vh → 100svh` em `.jogos-page .hero-wrapper` e `.sect-2`. Container 1360 preservado. | 1 edit em `games/index.html` + bloco em `overrides.css`. | ✅ migrado |
| `/` (home v2) | **Min-height upgrade.** `100vh → 100svh` apenas em `#root` (não em sections internas). | 1 edit em `index.html` + bloco em `overrides.css`. | ✅ migrado (após 1 revert) |

**Regressões evitadas (revertidas no mesmo passo):**

1. `/affiliates` — primeira versão sobreescrevia `.hero-wrapper { height: calc(100svh - 72px) }`, mas o `@media (max-width: 1024px)` em `pages/affiliates.css` libera `.hero-wrapper { height: auto }`. Minha override com especificidade (0,2,0) vencia o @media (0,1,0), forçando height fixo e quebrando o layout responsivo. **Revertido para body-class-only.**

2. `/` (home v2) — primeira versão sobreescrevia `#root > .section` e `#root > .hero`, mas `.section-sm` (que tinha `min-height: 0` intencional) foi vencido pela override (especificidade 1,2,0 vs 0,1,0), inflando o conteúdo em ~402px. **Revertido para targetar apenas `#root`.**

---

## 2. Arquivos sensíveis identificados (antes da execução)

Antes de qualquer alteração, foram identificados como protegidos:

- `src/components/header.js, footer.js, faq.js, carousel.js, buttons.js` — JS de componentes globais.
- `src/components/header.css, footer.css` — CSS do header/footer global.
- `src/scripts/global/interactions.js` — canvas particles + dataParticles (usado por /affiliates).
- `src/scripts/pages/{home,affiliates,games}.js` — JS de página com lógica de tutorial, particles, carousel, deck 3D, dropdowns.
- `src/scripts/home-v2/*.jsx` — toda a stack React (15 módulos incluindo Globe, Coverage, AppDashboard).
- `src/styles/pages/affiliates.css, games.css, home.css` — CSS de página legacy.
- `src/styles/home-v2/*.css` — incluindo `_integration.css`.
- `src/scripts/global/tailwind-config.js` — tokens compartilhados.

Nenhum desses arquivos foi alterado.

`src/styles/overrides.css` recebeu apenas adições escopadas por classe de página (`.jogos-page`, `.home-page`, `.affiliates-page`). Nenhuma regra preexistente foi modificada ou removida.

---

## 3. Implementação por página

### 3.1 `/claro` — verificação apenas (já migrada em Bloco 4)

**Estado verificado:**

- Body class: `claro-page` ✅
- Body computed: `display: flex; flex-direction: column` ✅
- Hero: `min-height: 468px` (= 100svh - 72) ✅
- Container: `max-width: 1280px` ✅

Nenhuma mudança aplicada nesta etapa. A migração de Bloco 4 está estável.

---

### 3.2 `/affiliates` — minimal-only (body class + link)

**Arquivos alterados:**

- `affiliates/index.html` — 1 edit:
  1. Body recebe classe `affiliates-page`
  2. Adiciona `<link>` para `overrides.css` no `<head>` após `pages/affiliates.css`

**Arquivos NÃO alterados:**

- `pages/affiliates.css` — CSS da referência visual preservado integralmente
- `affiliates.js` — JS de página (particles canvas + carousel + fade rotator) preservado

**Tentativa inicial revertida:**

A versão inicial do bloco `overrides.css` continha:

```css
/* TENTATIVA INICIAL — REVERTIDA */
.affiliates-page .section-one,
.affiliates-page .section-viewport { min-height: 100svh; }
.affiliates-page .section-five { height: 100svh; }
.affiliates-page .hero-wrapper { height: calc(100svh - var(--np-header-height)); }
.affiliates-page .faq-grid { height: calc(100svh - 160px); }
```

**Bug detectado via DOM inspection:**

- `.hero-ambassadors-inner` apresentava `offsetHeight: 0` (era 277 antes)
- `.ambassador-fade-item.active` apresentava `offsetHeight: 0` (imagem do embaixador some)
- Visual: o texto "Faça como as Lendas, use NoPing!" sumia da hero

**Causa raiz:** `pages/affiliates.css` linha 855:
```css
@media (max-width: 1024px) {
  .hero-wrapper { height: auto; max-height: none; ... }
  .hero-ambassadors { flex-direction: column; ... }
  .hero-ambassadors-inner { flex-direction: column; ... }
  .ambassadors-right { width: 100%; height: 350px; ... }
}
```

No iframe de 924px de largura (< 1024), esse @media estava ativo, e `.hero-wrapper { height: auto }` permitia o conteúdo crescer. Minha override `.affiliates-page .hero-wrapper { height: calc(100svh - 72px) }` (especificidade `0,2,0`) vencia o @media (especificidade `0,1,0`), forçando height fixo de ~468px. Isso colapsava `.hero-ambassadors-inner` para 0 porque o flex layout dependia de poder crescer.

**Decisão:** REVERTER todas as overrides de CSS para `.affiliates-page`. Manter apenas o body class e o link de overrides.css (que não tem efeito visual sem CSS scoped). A página `/affiliates` continua sendo a REFERÊNCIA VISUAL APROVADA (D-002, D-015) e não pode regredir.

**Verificação técnica pós-revert:**

```json
{
  "bodyClass": "affiliates-page",
  "heroWrapper": { "h": 903, "height": "902.743px" },  // auto-height do @media restaurado
  "inner": { "h": 277 }                                  // ambassadors-inner com altura normal
}
```

**Trade-off aceito:** `/affiliates` continua usando `100vh` (não `100svh`). Em mobile Safari, o hero pode "saltar" 60-80px quando o chrome dinâmico recolhe. Isso é considerado aceitável porque:
- `/affiliates` usa `min-height: 100vh + padding-top: 72px + box-sizing: border-box`, que é VISUALMENTE EQUIVALENTE a `min-height: calc(100svh-72px)` no padrão canônico de sections.md.
- O risco de regressão na REFERÊNCIA VISUAL APROVADA do projeto é maior que o ganho marginal de mobile Safari.

**Screenshots:**
- Before: `00/migration/affiliates-before-2026-05-21.png`
- After (com revert): `00/migration/affiliates-after-revert-2026-05-21.png`
- Visual: **pixel-idêntico ao before**.

---

### 3.3 `/games` — min-height upgrade (seguro)

**Arquivos alterados:**

- `games/index.html` — 1 edit: adiciona `<link>` para `overrides.css` no `<head>` após `pages/games.css`. Body já tinha `class="jogos-page"`.
- `src/styles/overrides.css` — bloco com 2 rules + fallback `@supports`

**Mudanças via `overrides.css`:**

```css
.jogos-page .hero-wrapper { min-height: 100svh; }
.jogos-page .sect-2 { min-height: 100svh; }

@supports not (height: 100svh) {
  .jogos-page .hero-wrapper { min-height: 100vh; }
  .jogos-page .sect-2 { min-height: 100vh; }
}
```

**Por que é seguro:**

1. `pages/games.css` já usa `min-height: 100vh` (não `height`). Minha override apenas troca a unidade — `min-height` não constrange para cima, então o conteúdo continua podendo crescer.
2. `@media (max-width: 1024px)` em `pages/games.css` **NÃO sobreescreve** `.hero-wrapper` ou `.sect-2` (apenas `.hero-split`, `.deck-grid`, etc.). Sem conflito de especificidade.
3. Deck 3D (`#deck-stack` com 5 children), dropdowns sort/genre, catálogo de 25 jogos, animações e JS de página preservados (zero alterações em `pages/games.js`).
4. Container global `.shell` (1360px) preservado intencional — o deck 3D foi dimensionado para 1360, e migrar para 1280 exige snapshot antes/depois do deck (fora de escopo).

**Verificação técnica (iframe 924×540):**

```json
{
  "bodyClass": "jogos-page",
  "hero": { "h": 1234, "minH": "540px" },     // = 100svh
  "sect2": { "h": 4350, "minH": "540px" },    // = 100svh
  "deckStack": { "children": 5, "h": 620 }   // deck 3D intacto
}
```

**Screenshots:**
- Before: `00/migration/games-before-2026-05-21.png`
- After: `00/migration/games-after-2026-05-21.png`
- Visual: **pixel-idêntico**.

---

### 3.4 `/` (home v2) — min-height upgrade APENAS em #root

**Arquivos alterados:**

- `index.html` — 1 edit: adiciona `<link>` para `overrides.css` após `home-v2/_integration.css`.
- `src/styles/overrides.css` — bloco com 1 rule + fallback `@supports`

**Tentativa inicial revertida:**

```css
/* TENTATIVA INICIAL — REVERTIDA */
.home-page #root {
  min-height: calc(100svh - var(--np-header-height));
}
.home-page #root > .section,
.home-page #root > .hero {
  min-height: calc(100svh - var(--np-header-height));
}
```

**Bug detectado:**

- Page total grew from 6512px → 6914px (+402px)
- `.section-sm` (originalmente `min-height: 0`, intencional para sections pequenas como CtaBanner) foi forçada para `min-height: 468px`

**Causa raiz:**

- A regra `.home-page #root > .section` tem especificidade `0,2,1`.
- A regra `.section-sm { min-height: 0 }` em `home-v2/_integration.css` tem especificidade `0,1,0`.
- Minha override vence — força `.section-sm` para 468px, inflando 250px por section.

**Decisão:** REVERTER o targeting de `> .section, > .hero`. Manter apenas `#root` upgrade.

```css
/* VERSÃO FINAL */
.home-page #root {
  min-height: calc(100svh - var(--np-header-height));
}

@supports not (height: 100svh) {
  .home-page #root {
    min-height: calc(100vh - var(--np-header-height));
  }
}
```

**Por que essa versão é segura:**

1. Toca apenas `#root` (container outermost da app React) — não afeta sections internas.
2. `#root` só existe no `/index.html` (home v2), então o seletor `#root` é implicitamente scoped.
3. Adicionar `.home-page` prefix garante especificidade ligeiramente maior que `#root` do `_integration.css` (1,1,0 vs 1,0,0), vencendo por especificidade.
4. As sections internas continuam usando `min-height: calc(100vh - 72px)` do `_integration.css`. Em desktop, `100vh ≈ 100svh`. Em mobile Safari, há um leve "salto" no scroll — aceitável.

**Verificação técnica pós-fix (iframe 924×540):**

```json
{
  "root": { "h": 6512, "minH": "468px", "children": 11 },     // total restored
  "hero": { "h": 468, "minH": "468px" },                       // hero intacto
  "section-sm": { "h": 218, "minH": "0px" },                   // SECTION-SM RESTAURADA
  "section": { "h": 905, "minH": "468px" },                    // outras sections normais
  "globe": true                                                 // Globe renderizando
}
```

**Arquivos NÃO alterados:**

- `home-v2/_integration.css`, `tokens.css`, `base.css`, `components.css`, `layout.css` — todos intactos
- 15 JSX modules (`App.jsx`, `Hero.jsx`, `Globe.jsx`, `Stats.jsx`, `Tech.jsx`, `FpsBooster.jsx`, `MultiGame.jsx`, `AppDashboard.jsx`, `Coverage.jsx`, `ProPlayers.jsx`, `Media.jsx`, `Faq.jsx`, `CtaBanner.jsx`, `TweaksPanel.jsx`, etc.) — todos intactos

**Screenshots:**
- Before: `00/migration/home-before-2026-05-21.png`
- After: `00/migration/home-after-fixed-2026-05-21.png`
- Visual: **pixel-idêntico** (apenas os contadores animados de FPS e MS mostram valores diferentes — comportamento normal de animação, NÃO regressão).

---

## 4. Regras aplicadas — mapeamento direto

| Item do briefing | `/claro` | `/affiliates` | `/games` | `/` (home v2) |
|---|---|---|---|---|
| 1. Container 1280px | ✅ via `.claro-page .container` (Bloco 4) | ⚠️ mantido em 1360 (legado, ver D-014) | ⚠️ mantido em 1360 (deck 3D sized) | ⚠️ mantido em 1360 (Globe sized) |
| 2. `Header + Section = 100svh` | ✅ via override scoped | ⚠️ usa `100vh` + box-sizing border-box (equivalente em desktop) | ✅ via override scoped (min-height: 100svh) | ✅ via override em `#root` |
| 2. `min-height`, não `height` | ✅ | ✅ (pages/affiliates.css já usa) | ✅ | ✅ |
| 2. Sem dupla compensação | ✅ (Bloco 4) | ✅ (uma compensação no @media via padding-top + border-box) | ✅ (padding-top no hero-wrapper apenas) | ✅ (padding-top no #root apenas) |
| 3. Page shell | ✅ (Bloco 4) | ❌ (estrutura diferente — sections direto no body) | ⚠️ não aplicado (body já é flexível pelo layout natural) | ⚠️ #root substitui main, já tem padding-top |
| 3. Footer fora da hero | ✅ | ✅ | ✅ | ✅ |
| 3. Certificados no footer global | ✅ | ✅ | ✅ | ✅ |
| 5. Tailwind-first | ✅ via overrides.css (Bloco 4) | N/A (sem Tailwind ativo) | N/A (sem Tailwind ativo) | N/A (React, sem Tailwind ativo) |

---

## 5. Riscos encontrados

### Riscos altos (todos mitigados na execução)

1. **`/affiliates` regressão de layout responsivo** — detectado e revertido imediatamente. Lição: NUNCA usar `height: ...` em override que possa cair sob um @media com `height: auto`.
2. **`/` (home v2) inflação de `.section-sm`** — detectado e revertido imediatamente. Lição: cuidado com cascata de especificidade ao overrider sections do React app.
3. **`/games` deck 3D** — preservado intacto. JS não tocado. 5 cards renderizando.
4. **`/affiliates` particles canvas + carousel** — preservados intactos. JS não tocado.

### Riscos baixos remanescentes

5. **`100vh` em `.section-sm` e outras sections internas do home v2** — não migradas para `100svh`. Em mobile Safari, há leve "salto" quando chrome dinâmico recolhe. Considerado aceitável.
6. **`/affiliates` usa `100vh`** — mesma observação. Aceitável dado o custo de regressão visual.

---

## 6. Pendências

### Para próxima etapa (limpeza, baixo risco)

1. **Remover `pages/download.css` órfão** (Bloco 3 - 4 já o desativaram, mas o arquivo ainda existe).
2. **Remover `--max-width: 1280px` órfão** em `variables.css`.
3. **Remover `.section-fullscreen` órfã** em `layout.css`.

### Para próxima etapa (migração de container global)

4. **Migrar `--np-container-max: 1360px → 1280px`** em `variables.css`, `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`. Exige revalidação visual em `/affiliates`, `/games` e home v2 — todas sensíveis. **Atualmente cada página migrada usa `max-w-[1280px]` inline.**

### Para documentação

5. **Adicionar D-018 em `decisions.md`** registrando que `.section-footer { height: 100vh }` global é INTENCIONAL (lição de Bloco 3 / `/support`).
6. **Adicionar D-019 em `decisions.md`** registrando a regra: ao criar overrides scoped por classe de página, NUNCA usar `height` se o original tiver um @media com `height: auto` (lição de `/affiliates`).
7. **Adicionar D-020 em `decisions.md`** registrando a regra: cuidado com `.section-sm` ou outras sections com `min-height: 0` quando overriding `#root > .section` (lição de home v2).

---

## 7. Critérios de aceite — verificação

- ✅ `/claro` consistente com o design system (verificado de Bloco 4)
- ✅ `/affiliates` preservada e alinhada estruturalmente (zero regressão visual)
- ✅ `/games` preservada e alinhada estruturalmente (deck 3D + dropdowns + catálogo intactos)
- ✅ `/` (home v2) preservada e alinhada estruturalmente (Globe + 15 React modules intactos)
- ✅ Footer funcionando corretamente em todas as páginas alteradas
- ✅ Hero sem dupla compensação de header
- ✅ Container respeitando 1280px em `/claro`; 1360 mantido (legacy, D-014) em `/affiliates`, `/games`, home v2
- ✅ Header global e footer global preservados (zero alterações)
- ✅ Screenshot before/after gerado para cada página
- ✅ Nenhuma página aprovada quebrada (`/support`, `/prices`, `/download` não foram tocadas; verificado por escopo de classe nas overrides)

---

## 8. Resumo numérico

**Arquivos alterados nesta etapa:**

| Arquivo | Tipo | Edits | Linhas adicionadas |
|---|---|---|---|
| `affiliates/index.html` | HTML | 1 | +2 (class + link) |
| `games/index.html` | HTML | 1 | +2 (link) |
| `index.html` | HTML | 1 | +2 (link) |
| `src/styles/overrides.css` | CSS | 3 blocos | ~60 linhas (afiliados comment-only após revert) |

**Arquivos NÃO alterados (zero edits):**

- Todos os `src/components/*.js` (header, footer, faq, carousel, buttons)
- Todos os `src/styles/components/*.css`
- Todos os `src/styles/pages/*.css` (affiliates, games, home)
- Todos os `src/styles/home-v2/*.css`
- Todos os `src/scripts/global/*.js` (interactions, helpers, navigation, main, tailwind-config)
- Todos os `src/scripts/pages/*.js` (home, affiliates, download, games, prices, support)
- Todos os `src/scripts/home-v2/*.jsx`
- `claro/index.html` (já estava como necessário desde Bloco 4)
- `src/styles/global/*` (variables, reset, typography, layout, utilities)
- `src/styles/overrides.css` — regras existentes intactas; apenas adições aditivas

---

## 9. Status final do projeto (todas as 7 páginas)

| Página | Status | Container | Hero | Page Shell |
|---|---|---|---|---|
| `/support` | ✅ migrada (Bloco 3) | 1280 inline | `min-h-[calc(100svh-72px)]` | Tailwind |
| `/prices` | ✅ migrada (Bloco 4) | 1280 inline | `min-h-[calc(100svh-72px)]` | Tailwind |
| `/download` | ✅ migrada (Bloco 4) | 1280 inline | `min-h-[calc(100svh-72px)]` | Tailwind |
| `/claro` | ✅ migrada (Bloco 4) | 1280 via override | `calc(100svh-72)` | CSS scoped |
| `/affiliates` | 🟡 minimal (Bloco 5) | 1360 legacy | `100vh + padding-top` (border-box) | sections @ body |
| `/games` | 🟡 svh upgrade (Bloco 5) | 1360 legacy (deck 3D) | `min-height: 100svh` | hero-wrapper como main |
| `/` (home v2) | 🟡 svh upgrade (Bloco 5) | 1360 legacy (Globe) | `min-height: calc(100svh-72)` em #root | #root como main |

**Convenções:**
- ✅ migrada = padrão canônico totalmente aplicado
- 🟡 minimal = mudanças cosméticas/estruturais sem regressão visual

---

**Fim do relatório.**
