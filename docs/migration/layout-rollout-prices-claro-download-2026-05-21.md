# Layout Rollout — /prices, /claro, /download — 2026-05-21

> **Etapa:** Bloco 4 — expansão das regras aprovadas em `/support` para as próximas páginas.
> **Status:** implementado em ordem (`/prices` → `/claro` → `/download`), com screenshots before/after e validação técnica via DOM/CSS computed em cada passo.

---

## 1. Resumo executivo

3 páginas migradas para o padrão consolidado (page shell + container 1280 + `Header + Section = 100svh` + footer global preservado).

| Página | CSS de base | Tailwind? | Mudança principal | Arquivos alterados | Risco |
|---|---|---|---|---|---|
| `/prices` | só global + components | ✅ ativo | Body shell + hero `min-h-screen pt-header` → `min-h-[calc(100svh-72px)]` + container `max-w-[720px] px-8 py-np-2xl` → `max-w-[720px] mx-auto px-5 md:px-8 py-np-md` | `prices/index.html` (1 edit) + `overrides.css` (1 bloco) | **Baixo** |
| `/claro` | `pages/home.css` | ❌ não ativo | Body class `claro-page` + override de `.hero` para 100svh + container 1280 + page shell tudo escopado em `overrides.css` | `claro/index.html` (2 edits) + `overrides.css` (1 bloco) | **Médio** |
| `/download` | só global + components | ✅ ativo | Body shell + hero `min-h-screen pt-header` → `min-h-[calc(100svh-72px)]` (remove dupla compensação) + container interno migrado de `.container min-h-[calc(100vh-72px)]` para `max-w-[1280px] mx-auto` | `download/index.html` (1 edit) + `overrides.css` (1 bloco) | **Alto** (canvas particles) — validado preservado |

Nenhuma página sensível (`/support`, `/affiliates`, `/games`, home) foi tocada. Header global, footer global, scripts globais e tokens de CSS não foram alterados.

---

## 2. Arquivos sensíveis identificados (antes da execução)

Antes de qualquer alteração, foram identificados como protegidos:

- `src/components/header.js` + `header.css` — header fixo global.
- `src/components/footer.js` + `footer.css` — footer global (com `.section-footer { height: 100vh }` que `/affiliates` usa).
- `src/components/faq.js`, `carousel.js`, `buttons.js` — JS de componentes globais.
- `src/scripts/global/interactions.js` — canvas particles + dataParticles. **Usado por `/download`.**
- `src/scripts/pages/download.js` — boot do `dataParticles` + toggle group.
- `src/styles/pages/affiliates.css` — referência visual aprovada.
- `src/styles/pages/games.css`, `pages/download.css` (órfão), `pages/home.css`.
- `src/scripts/home-v2/*.jsx` — toda a home v2 (Globe, Coverage, AppDashboard).
- `src/scripts/global/tailwind-config.js` — tokens compartilhados.

Nenhum desses arquivos foi alterado nesta etapa.

`src/styles/overrides.css` foi alterado de forma **aditiva** (3 blocos novos `@supports` + 1 bloco para `/claro` page shell). Nenhuma regra preexistente foi modificada ou removida.

---

## 3. Implementação por página

### 3.1 `/prices`

**Arquivos alterados:**

- `prices/index.html` — 1 edit (body + main + hero + container)
- `src/styles/overrides.css` — bloco `@supports not (height: 100svh) { .prices-page { min-height: 100vh } }` adicionado

**Mudanças no HTML:**

```html
<!-- Antes -->
<body class="prices-page" data-page="prices" data-screen-label="Preços">
  ...
  <main>
    <section id="hero" class="relative min-h-screen pt-header flex items-center justify-center text-center overflow-hidden">
      <div class="relative z-[2] max-w-[720px] px-8 py-np-2xl mx-auto">

<!-- Depois -->
<body class="prices-page min-h-[100svh] flex flex-col" data-page="prices" data-screen-label="Preços">
  ...
  <main class="flex-1 flex flex-col pt-header">
    <section id="hero" class="relative min-h-[calc(100svh-theme(spacing.header))] flex items-center justify-center text-center overflow-hidden">
      <div class="relative z-[2] w-full max-w-[720px] mx-auto px-5 md:px-8 py-np-md">
```

**Motivo de cada mudança:**

| Mudança | Motivo |
|---|---|
| `min-h-[100svh] flex flex-col` no body | Page shell prescrito por D-010. |
| `flex-1 flex flex-col pt-header` no main | Main cresce para empurrar o footer + compensa header uma única vez. |
| `min-h-screen pt-header` → `min-h-[calc(100svh-theme(spacing.header))]` na section | D-009 (100svh) + remove a dupla declaração (`min-h-screen pt-header` somava 100vh + 72). Agora hero = `100svh - 72`, ocupa exatamente a dobra abaixo do header. |
| `px-8 py-np-2xl` → `mx-auto px-5 md:px-8 py-np-md` no inner | Padding lateral D-012 (20 mobile / 32 desktop) + padding vertical reduzido (`py-np-md` = 24+24) seguindo a lição aprendida em `/support` (`py-np-xl` overflowava). |
| `max-w-[720px]` mantido | Limite intencional de leitura (mais estreito que o container 1280). |

**Verificação técnica (iframe 924×540):**

```
body: display=flex, flex-direction=column, min-height=540 ✓
main: display=flex, flex=1 1 0%, padding-top=72px, height=540 ✓
hero: height=468 (= 540 - 72), min-height=468 ✓
section-footer: height=1742 (regra global preservada, @media 1100 aplicado) ✓
total scroll: 2282 (main 540 + footer 1742)
```

**Screenshots:**

- Before: `00/migration/01-prices-before-2026-05-21.png` (hero) + `02-prices-before-2026-05-21.png` (footer)
- After: `00/migration/01-prices-after-2026-05-21.png` (hero) + `02-prices-after-2026-05-21.png` (footer)

**Comparação visual:** layout idêntico. Conteúdo do hero (eyebrow + título + parágrafo + pill "PÁGINA EM CONSTRUÇÃO") centrado na dobra com respiração equivalente.

**Riscos:** nenhum identificado. Página simples, sem features sensíveis.

---

### 3.2 `/claro`

**Arquivos alterados:**

- `claro/index.html` — 2 edits:
  1. Body recebe classe `claro-page`
  2. Adiciona `<link rel="stylesheet" href="../src/styles/overrides.css">` ao `<head>` (não estava linkado antes)
- `src/styles/overrides.css` — bloco completo de page shell + container 1280 + fallback `@supports`

**Mudanças via `overrides.css` (escopadas a `.claro-page`):**

```css
.claro-page {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}
.claro-page > main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.claro-page .hero {
  min-height: calc(100svh - var(--np-header-height));
}
.claro-page .container {
  max-width: 1280px;
}

@supports not (height: 100svh) {
  .claro-page { min-height: 100vh; }
  .claro-page .hero { min-height: calc(100vh - var(--np-header-height)); }
}
```

**Por que essa abordagem (e não Tailwind inline):**

- `/claro` não carrega Tailwind hoje (legacy `pages/home.css`). Inserir Tailwind CDN seria mudança maior (e arrisca o JS do tutorial em `pages/home.js`).
- `pages/home.css` define `.hero { min-height: 100vh; padding-top: calc(var(--header-height) + 0px) }` — sobreescrita apenas para `.claro-page .hero` mantém o resto intacto.
- `.container` global = 1360px. Override para 1280 SÓ em `.claro-page` mantém outras páginas inalteradas.
- O `<link>` de `overrides.css` faltava no `<head>` da página — adicionei na posição correta (depois de `pages/home.css`, igual a `/support`).

**Mudança no HTML:**

```html
<!-- Antes -->
<body data-page="claro" data-screen-label="Claro · Tutorial NoPing">

<!-- Depois -->
<body data-page="claro" data-screen-label="Claro · Tutorial NoPing" class="claro-page">
```

E no `<head>`:

```html
<!-- Page -->
<link rel="stylesheet" href="../src/styles/pages/home.css">
<!-- Overrides (exceções fora do CSS de página — keyframes, page-shell scoped) -->
<link rel="stylesheet" href="../src/styles/overrides.css">
```

**Verificação técnica (iframe 924×540):**

```
body: display=flex, flex-direction=column, min-height=540 ✓
main: display=flex, flex=1 1 0%, height=2740 (conteúdo do tutorial expande naturalmente)
hero: height=2740, min-height=468 (= 540 - 72) ✓
container: max-width=1280 ✓ (era 1360)
section-footer: height=1742 (regra global preservada) ✓
```

**Screenshots:**

- Before: `00/migration/claro-before-2026-05-21.png`
- After: `00/migration/claro-after-2026-05-21.png`

**Comparação visual:** layout **pixel-idêntico** ao before. Banner Claro + NoPing, título com "NoPing ativado." em verde, subtítulo, platform selector — tudo preservado. A redução do container de 1360 para 1280 não é percebida no iframe estreito (~924px) porque o conteúdo já está mais estreito que ambos os limites.

**Riscos:**

- ⚠️ **Médio**: tutorial em `src/scripts/pages/home.js` injeta steps dinamicamente em `.tutorial__steps` e `.tutorial__panels`. Não verifiquei se a redução do container afeta o lightbox de imagens (que é position fixed e independente do container). Recomendação: testar clicando em uma imagem do tutorial em revisão visual humana.
- ✅ Animações/CSS hover do tutorial: nenhum CSS foi removido, apenas adicionado em overrides.css.

---

### 3.3 `/download`

**Arquivos alterados:**

- `download/index.html` — 1 edit (body + main + hero + container interno)
- `src/styles/overrides.css` — bloco `@supports not (height: 100svh) { .downloads-page { min-height: 100vh } }` adicionado

**Arquivos sensíveis preservados:**

- `src/scripts/global/interactions.js` (canvas particles + dataParticles) — não tocado.
- `src/scripts/pages/download.js` (boot do canvas + toggle group de plataforma) — não tocado.
- Block `.downloads-page .hero__downloads .btn .active` em `overrides.css` — não tocado.

**Mudanças no HTML:**

```html
<!-- Antes -->
<body class="downloads-page" data-page="download" data-screen-label="Downloads">
  ...
  <main>
    <section id="hero" class="relative min-h-screen pt-header overflow-hidden flex items-center justify-center bg-np-bg bg-cover bg-top bg-no-repeat bg-[url('../src/assets/download/bg-hero.png')] before:content-[''] before:absolute ...">
      <canvas id="particles-canvas" ...></canvas>
      <div class="container relative z-[3] w-full min-h-[calc(100vh-theme(spacing.header))] flex items-center justify-start ...">

<!-- Depois -->
<body class="downloads-page min-h-[100svh] flex flex-col" data-page="download" data-screen-label="Downloads">
  ...
  <main class="flex-1 flex flex-col pt-header">
    <section id="hero" class="relative min-h-[calc(100svh-theme(spacing.header))] overflow-hidden flex items-center justify-center bg-np-bg bg-cover bg-top bg-no-repeat bg-[url('../src/assets/download/bg-hero.png')] before:content-[''] before:absolute ...">
      <canvas id="particles-canvas" ...></canvas>
      <div class="relative z-[3] w-full max-w-[1280px] mx-auto px-5 md:px-8 flex items-center justify-start ...">
```

**Motivo de cada mudança:**

| Mudança | Motivo |
|---|---|
| `min-h-[100svh] flex flex-col` no body | Page shell. |
| `flex-1 flex flex-col pt-header` no main | Cresce para empurrar footer; compensa header **uma única vez**. |
| `min-h-screen pt-header` → `min-h-[calc(100svh-theme(spacing.header))]` na section | Remove a **dupla compensação** que o briefing de Bloco 1 já tinha sinalizado: antes a section era `min-h: 100vh` + `pt-header` (= 100vh + 72), agora é exatamente `100svh - 72`, ocupando a dobra abaixo do header. |
| `.container` → `max-w-[1280px] mx-auto px-5 md:px-8` no inner | Container 1280 (D-008 + D-014). |
| `min-h-[calc(100vh-theme(spacing.header))]` removido do inner | Redundante: era a tentativa antiga de fazer o conteúdo interno preencher o restante, mas com a section já dimensionada corretamente (`min-h-[calc(100svh-72px)]`), essa medida no filho não precisa mais existir. |
| Background image + before-gradient mantidos | Preservados intactos. |

**Verificação técnica (iframe 908×540):**

```
body: display=flex, flex-direction=column, min-height=540 ✓
main: display=flex, flex=1 1 0%, padding-top=72px, height=540 ✓
hero: height=468 (= 540 - 72), min-height=468, padding-top=0 (single compensation via main) ✓
canvas#particles-canvas: width=908, height=468 (auto-sized para o novo tamanho do parent) ✓
inner container: max-width=1280 ✓, no redundant min-height
section-footer: height=1742 (regra global preservada) ✓
```

**Como o canvas se adapta:**

`src/scripts/global/interactions.js` linha 263: `width = canvas.parentElement.clientWidth; height = canvas.parentElement.clientHeight;` — lê dimensões do hero a cada `resize()`. Quando o hero diminuiu de 540 para 468 (na transição), o canvas readaptou no próximo frame. **Particles continuam funcionando.**

**Screenshots:**

- Before: `00/migration/download-before-2026-05-21.png`
- After: `00/migration/download-after-2026-05-21.png`

**Comparação visual:** layout preservado. Hero shorter by ~72px (área de background image reduzida proporcionalmente), conteúdo (eyebrow + título + descrição + 4 botões de plataforma) **centrado na nova dobra**. Botão "Windows" continua com a classe `.active` em verde neon. Particles canvas opera na nova área.

**Riscos:**

- ✅ Canvas continuou renderizando (verificado: `offsetWidth/Height` corretos pós-mudança).
- ✅ Toggle de plataforma (`.btn .active`) preservado — CSS em `overrides.css` não foi tocado.
- ⚠️ Mouse-reactive pulses do `dataParticles`: dependem de `canvas.getBoundingClientRect()` para calcular posição do mouse. Como o canvas mudou de tamanho, os pulses continuam funcionando mas em uma área 72px menor. Não foi testado interativamente (não dá para mover mouse via screenshot), mas a lógica está intacta.
- ⚠️ Background image (`bg-hero.png`) é `bg-cover bg-top` — o crop muda ligeiramente porque o aspect ratio do hero mudou (de 16:9 para algo mais quadrado). Pode parecer levemente diferente em alguns viewports. Não considerado regressão.

---

## 4. Regras aplicadas — mapeamento direto

| Item do briefing | `/prices` | `/claro` | `/download` |
|---|---|---|---|
| 1. Container 1280px | `max-w-[720px]` mantido (intencional) | `.claro-page .container { max-width: 1280px }` | `max-w-[1280px]` |
| 2. `Header + Section = 100svh` | `min-h-[calc(100svh-theme(spacing.header))]` | `.claro-page .hero { min-height: calc(100svh - var(--np-header-height)) }` | `min-h-[calc(100svh-theme(spacing.header))]` |
| 2. `min-height`, não `height` | ✓ | ✓ | ✓ |
| 2. Sem dupla compensação | `<main pt-header>` único | Hero mantém seu próprio `padding-top: 72px` de `pages/home.css` (única compensação) | `<main pt-header>` único; section sem `pt-header` |
| 3. Page shell `body flex-col / main flex-1 / footer flex-shrink-0` | Tailwind inline | CSS escopado em `overrides.css` | Tailwind inline |
| 3. Footer fora da hero, regra estrutural global | ✓ | ✓ | ✓ |
| 3. Certificados dentro do footer global | ✓ (footer global injetado intacto) | ✓ | ✓ |
| 5. Tailwind-first | ✓ (inline) | CSS via overrides (única opção sem rewriting do tutorial) | ✓ (inline) |

---

## 5. Pendências e recomendações para próximas etapas

### Curto prazo (limpeza, baixo risco)

1. **`pages/download.css` órfão** — não é mais necessário; pode ser removido em uma etapa de cleanup (não removido aqui para preservar reversibilidade).
2. **`--max-width: 1280px`** órfão em `variables.css` — pode ser removido.
3. **`.section-fullscreen`** órfão em `layout.css` — pode ser removido.

### Médio prazo (exige aprovação humana)

4. **Migração do container global 1360 → 1280** (D-014) — hoje cada página migrada usa `max-w-[1280px]` inline. Para deixar o `--np-container-max` em 1280 globalmente, ainda falta:
   - `/affiliates` (sensível, referência visual)
   - `/games` (sensível, deck 3D + carousel)
   - home v2 (sensível, React + Globe + Coverage)
5. **Adicionar `--gutter` mobile (20px)** em `variables.css` via `@media (max-width: 640px)` — hoje cada página migrada usa `px-5 md:px-8` inline, mas o token global ainda é só 32 desktop.
6. **Aplicar `100svh` em `/affiliates`, `/games`, home v2** — fora de escopo desta etapa por serem páginas sensíveis.

### Longo prazo (decisão estratégica)

7. **`.section-footer { height: 100vh }` legacy** — o briefing originalmente queria remover essa "gambiarra de altura", mas a lição de `/support` mostrou que ela é o que dá ao footer sua respiração interna (via `.footer__top { align-content: center }`). Recomendação: **manter** essa regra global e documentar como intencional em `decisions/decisions.md` (atualizar D-010).

---

## 6. Critérios de aceite — verificação

- ✅ `/prices` visualmente consistente com o design system
- ✅ `/claro` visualmente consistente (pixel-perfect preservação)
- ✅ `/download` preservando partículas e efeitos (canvas mensurado em 908×468 pós-fix)
- ✅ Footer funcionando corretamente nas 3 páginas (`section-footer` height 1742 com `align-content: center` ativo)
- ✅ Hero sem dupla compensação em nenhuma das 3 páginas
- ✅ Container 1280 aplicado em `/claro` (e em `/download` via inline). `/prices` usa `max-w-[720px]` ainda mais estreito (intencional)
- ✅ Header global e footer global preservados (zero alterações em `header.js`, `footer.js`, `header.css`, `footer.css`)
- ✅ Screenshot before/after gerado para cada página
- ✅ Nenhuma página aprovada quebrada (`/affiliates`, `/games`, `/support`, home não foram tocadas; CSS adicionado é escopado por classe)

---

## 7. Próxima ação recomendada

Revisão humana visual de:
- `/prices/` em diferentes alturas de viewport (testar 720, 900, 1080)
- `/claro/` validando o tutorial step-by-step + lightbox de imagens
- `/download/` validando o efeito de particles mouse-reactive

Se aprovado, próxima etapa pode ser:
- **Limpeza de órfãos** (item 1-3 da seção 5)
- **OU** começar a documentar D-018 (decisão de manter `.section-footer { height: 100vh }` como intencional)

---

**Fim do relatório.**
