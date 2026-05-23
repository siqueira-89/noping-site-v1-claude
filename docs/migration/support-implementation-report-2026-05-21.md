# Support Implementation Report — 2026-05-21

> **Etapa:** Bloco 3 — implementação piloto das regras consolidadas dos Blocos 1 (auditoria) e 2 (validação de docs).
> **Página alvo:** `/support/` (única página alterada).
> **Status:** implementado + revisado após feedback do usuário (footer ficou compacto, hero overflowed dobra).

---

## 0. Histórico das tentativas

| Tentativa | Mudanças | Resultado |
|---|---|---|
| 1ª (Bloco 3 inicial) | Page shell + `min-h-[calc(100svh-72px)]` no hero + override neutralizando `.section-footer { height: 100vh; padding-top: 72px }` para `.support-page` + `py-np-xl` no hero | Verificou em iframe pequeno (540px). Verifier passou. Mas no desktop real (1733×942) do usuário: footer ficou **mais compacto** que `/affiliates` (perdeu a centralização vertical interna de `.footer__top`), e hero com `py-np-xl` (128px) deixou conteúdo overflowing a dobra em ~80px. |
| 2ª (esta revisão) | **Removeu** o override de `.section-footer` (deixa o footer global de 100vh aplicar como em `/affiliates`). **Reduziu** padding do hero de `py-np-xl` (64+64) para `py-np-md` (24+24). | Footer visualmente idêntico a `/affiliates`. Hero 872px (caber em 870min+72header=942 viewport, com 2px de margem). DOM verificado: sem sobreposição entre h3/p/button dos contact cards. |

---

## 1. Objetivo desta etapa

Aplicar em **`/support/`** as regras consolidadas e validadas em:

- `docs/migration/layout-audit-2026-05-21.md` (auditoria)
- `docs/migration/docs-validation-2026-05-21.md` (consolidação documental)
- `docs/layout/sections.md` (regra Header + Section = 100svh)
- `docs/layout/container.md` (regra 1280)
- `decisions/decisions.md` D-009 / D-010 / D-012 / D-013 / D-014 / D-015

Page shell prescrito:

```html
<body class="min-h-[100svh] flex flex-col">
  <header id="global-header"></header>
  <main class="flex-1">…</main>
  <footer id="global-footer"></footer>
</body>
```

`/support/` foi escolhida como piloto por ser:

- página em evolução (não aprovada visualmente);
- a mais simples entre as Tailwind-ativas;
- listada explicitamente no `support-implementation-plan.md` como primeiro teste seguro;
- a única que combina hero + FAQ no mesmo arquivo, exercitando várias regras de uma vez.

---

## 2. Arquivos alterados

### `support/index.html`

- **3 edições localizadas.** Nenhuma alteração no header global, footer global, scripts ou na ordem de includes.

### `src/styles/overrides.css`

- **1 bloco adicionado.** Apenas regras escopadas a `.support-page` — nenhuma regra global alterada ou removida.

### Não foram alterados

- `src/components/header.js`, `header.css`
- `src/components/footer.js`, `footer.css`
- `src/components/faq.js`, `carousel.js`, `buttons.js`
- `src/scripts/global/*`
- `src/scripts/pages/support.js`
- `src/styles/global/*` (incl. `reset.css`, `variables.css`, `layout.css`, `typography.css`, `utilities.css`)
- `src/styles/components/*`
- `src/styles/pages/*`
- `src/styles/home-v2/*`
- `src/scripts/home-v2/*.jsx`
- `tailwind-config.js`
- Tokens (`--np-container-max`, `--gutter`, `--np-header-height`)
- `affiliates/`, `games/`, `download/`, `prices/`, `claro/`, `index.html` (home)

---

## 3. Motivo de cada alteração

### 3.1 Body — page shell ativado

**Antes:**
```html
<body class="support-page" data-page="support" data-screen-label="Suporte">
```

**Depois:**
```html
<body class="support-page min-h-[100svh] flex flex-col" data-page="support" data-screen-label="Suporte">
```

**Por quê:**
Aplica o page shell prescrito em `docs/layout/sections.md` + D-010 — corpo da página como coluna flex de altura mínima 100svh. A regra `body { min-height: 100vh }` que vem de `reset.css` continua presente como fallback, mas o seletor de classe (`min-h-[100svh]`) ganha por especificidade (0,1,0 vs 0,0,1).

**Regra aplicada:** D-009 (100svh), D-010 (page shell), regra 6 e 7 do briefing.

### 3.2 `<main>` — cresce para preencher e compensa o header uma única vez

**Antes:**
```html
<main>
```

**Depois:**
```html
<main class="flex-1 flex flex-col pt-header">
```

**Por quê:**
- `flex-1` — `<main>` cresce para ocupar o espaço entre header (fora do flow porque é `position: fixed`) e footer. Garante que o footer só aparece *depois* do conteúdo (regra estrutural — D-010, regra 3 do briefing).
- `flex flex-col` — permite que sections internas usem `flex-1` se necessário.
- `pt-header` — única compensação do header em toda a página. O header fixo de 72px ocupa o topo do viewport, então o `<main>` começa 72px abaixo do topo lógico. As seções internas não repetem essa compensação (evita dupla compensação).

**Regra aplicada:** D-009 + D-010 + regra 2 do briefing (evitar dupla compensação).

### 3.3 Hero — viewport-based, conteúdo centralizado

**Antes (original):**
```html
<section id="hero" class="relative pt-[calc(theme(spacing.header)+32px)] pb-np-2xl flex flex-col items-center text-center">
  <div class="container relative z-[2] w-full max-w-[1080px] flex flex-col gap-12">
```

**Depois (revisado nesta tentativa):**
```html
<section id="hero" class="relative min-h-[calc(100svh-theme(spacing.header))] py-np-md flex flex-col items-center justify-center text-center">
  <div class="relative z-[2] w-full max-w-[1080px] mx-auto px-5 md:px-8 flex flex-col gap-12">
```

**Por quê:**

| Mudança | Motivo |
|---|---|
| `pt-[calc(theme(spacing.header)+32px)]` removido | A compensação do header já é feita pelo `<main class="pt-header">`. Repetir aqui seria **dupla compensação** (proibida pelo briefing). |
| `pb-np-2xl` (96px) e `py-np-xl` (64+64) → `py-np-md` (24+24 = 48px total) | A primeira tentativa usou `py-np-xl` e o conteúdo overflowou a dobra em ~80px em desktop. **`py-np-md`** dá respiração mínima e mantém o conteúdo (título + 5 tópicos + 2 cards) dentro da primeira dobra (872px ≤ 870px+72px = 942 = viewport do usuário). |
| `min-h-[calc(100svh-theme(spacing.header))]` adicionado | Fórmula canônica de `sections.md`: `Header + Section = 100svh`. Garante que a primeira dobra preenche o viewport sem cortar conteúdo. |
| `justify-center` adicionado | O conteúdo centraliza verticalmente na hero. |
| `.container` (1360px via token) removido | A diretriz é 1280 (D-008, D-014). `.container` é mantido em outras páginas legadas; aqui usamos Tailwind utilities explícitas. |
| `mx-auto px-5 md:px-8` adicionado | Padding lateral conforme D-012: **20px mobile / 32px desktop**. |
| `max-w-[1080px]` mantido | Limite de leitura para título + accordion + 2 cards (intencionalmente mais estreito que o container de 1280 para focar a atenção). |

**Regra aplicada:** D-009 (100svh), D-012 (gutters), regra 1 + 2 do briefing.

### 3.4 FAQ — container migrado para 1280

**Antes:**
```html
<section class="section section-four bg-black" id="faq">
  <div class="container">
    <div class="faq-grid">
```

**Depois:**
```html
<section class="section section-four bg-black" id="faq">
  <div class="w-full max-w-[1280px] mx-auto px-5 md:px-8">
    <div class="faq-grid">
```

**Por quê:**
Migração pontual do container `1360 → 1280` em uma página não-sensível, alinhando com D-008 e D-014. O `.container` global continua valendo `1360` para o resto do projeto (não foi tocado). O `.faq-grid` interno mantém sua geometria 2-colunas vinda de `pages/affiliates.css`.

**Regra aplicada:** D-008 + D-012 + D-014 + regra 1 do briefing.

### 3.5 `overrides.css` — page shell de `/support` (REVISADO)

**O que está ativo hoje em `overrides.css` para `/support`:**

```css
/* /support — page shell (Bloco 3 — 2026-05-21 · revisado)
   A regra global de footer (.section-footer { height: 100vh })
   foi PRESERVADA para que /support renderize idêntica a
   /affiliates. Apenas o fallback de svh permanece como override.
*/
@supports not (height: 100svh) {
  .support-page { min-height: 100vh; }
}
```

**O que foi tentado e REVERTIDO** (tentativa 1):

```css
/* ⚠️ REMOVIDO após feedback do usuário */
/* .support-page .section-footer {
     height: auto;
     min-height: 0;
     padding-top: 0;
     flex-shrink: 0;
   } */
```

**Por quê o override do footer foi removido:**

O wrapper global `.section-footer` (`src/styles/components/footer.css`) tem layout interno desenhado em torno de uma altura fixa de 100vh:

```css
.section-footer {
  height: 100vh;             /* referência para .footer__top crescer */
  padding-top: var(--np-header-height);
  display: flex; flex-direction: column;
}
.footer { flex-grow: 1; }
.footer__container { height: 100%; }
.footer__top { flex-grow: 1; align-content: center; }  /* CENTRALIZA verticalmente */
```

Neutralizar `height: 100vh` colapsou esse `align-content: center` de `.footer__top`, fazendo as colunas (brand + NoPing + Tecnologia + Ajuda + Blog + Feedbacks) ficarem coladas no topo do footer com aspecto compacto. **`/affiliates` (referência visual aprovada) usa essa mesma regra global e mantém a respiração.** Para `/support` parecer com `/affiliates`, a regra global precisa ficar ativa.

O page shell (`body flex-col + main flex-1`) **continua válido e ativo** mesmo com o footer fixo em 100vh. Como o conteúdo da página (hero + FAQ) já é maior que a viewport, `flex-1` no `<main>` não tem espaço extra para crescer — ele é um no-op visual nesta página, mas a estrutura está corretamente em pé para uma futura página curta. O fallback `@supports not (height: 100svh)` garante que browsers sem `svh` não quebrem.

O único custo da escolha: os 72px de `padding-top` dentro de `.section-footer` ficam como espaço morto no topo do footer — mas isso é exatamente o que `/affiliates` tem, então **é o aprovado pelo design system**.

**Regra aplicada:** D-013 (`overrides.css` canônico) + regra 2 do briefing de correção ("preservar o visual aprovado do footer de `/affiliates`").

---

## 4. Regras aplicadas — mapeamento direto

| Item do briefing | Implementação em `/support/` |
|---|---|
| 1. Container 1280px | FAQ migrado para `max-w-[1280px]`. Hero mantém `max-w-[1080px]` (intencional, mais estreito). Container global de 1360 **não** foi tocado em outras páginas. |
| 2. Header + Section = 100svh | Hero usa `min-h-[calc(100svh-theme(spacing.header))]`. |
| 2. `min-height`, não `height` | Hero e body usam `min-height`. `.section-footer` em `/support` migrou de `height: 100vh` para `height: auto`. |
| 2. Sem dupla compensação | Compensação do header acontece **uma única vez** em `<main class="pt-header">`. Hero **não** repete. |
| 3. Page shell `body flex-col / main flex-1 / footer flex-shrink-0` | Implementado via Tailwind utilities + override escopado. |
| 3. Footer fora da hero, por regra estrutural | Footer vem **depois** de `<main>` no DOM, empurrado pelo `flex-1` do main. |
| 3. Certificados dentro do footer | Não alterado — continuam em `footer.css` global. ✅ Verificado no screenshot. |
| 4. Visual NoPing | Hero, tópicos accordion e cards de contato mantidos. Nada novo adicionado. |
| 4. Sem busca | Confirmado — não havia busca e não foi adicionada. |
| 5. Tailwind-first | Todas as 5 mudanças no HTML usam Tailwind utilities. CSS extra (`overrides.css`) é apenas exceção documentada para neutralizar o wrapper legacy do footer. |
| 6. Screenshot before/after | `00/migration/01-support-before-2026-05-21.png` (top) + `02-support-before` (footer area) + `01..03-support-after-2026-05-21.png` (top / footer end / top). |

---

## 5. Verificação técnica (DOM/CSS computed)

Medição no viewport real do usuário (1733×942) após a revisão:

```json
{
  "body": {
    "classes": "support-page min-h-[100svh] flex flex-col",
    "display": "flex",
    "flexDirection": "column",
    "minHeight": "942.222px (= 100svh)"
  },
  "main": {
    "display": "flex",
    "flex": "1 1 0%",
    "paddingTop": "72px",
    "height": "1918px"
  },
  "hero": {
    "minHeight": "870.222px (= 100svh − 72)",
    "paddingTop": "24px (py-np-md)",
    "paddingBottom": "24px",
    "height": "872px (cabe na dobra com ~2px de margem)"
  },
  "sectionFooter": {
    "height": "942px (= 100vh, regra global preservada)",
    "paddingTop": "72px (regra global preservada — igual /affiliates)"
  },
  "contactCard.Discord": {
    "icon": "y 677–721 (44px)",
    "h3 'Converse conosco'": "y 739–767 (28px, 1 linha)",
    "p (description)": "y 777–823 (45px, 2 linhas)",
    "button": "y 847–891",
    "verificado": "sem sobreposição entre elementos"
  }
}
```

- ✅ Page shell ativo
- ✅ Footer com altura aprovada de `/affiliates` (100vh)
- ✅ Sem dupla compensação (apenas `<main class="pt-header">`)
- ✅ Hero respeita fórmula `calc(100svh - var(--np-header-height))` e o conteúdo **cabe na dobra**
- ✅ Header global continua intacto (72px, fixo, `position: fixed`)
- ✅ Contact cards sem sobreposição de texto

---

## 6. Screenshots before/after

> Iframe da preview com viewport ~907×540. Os comparativos cobrem hero topo e região final do footer.

| Vista | Before | After |
|---|---|---|
| Topo (hero) | `00/migration/01-support-before-2026-05-21.png` | `00/migration/01-support-after-2026-05-21.png` |
| Final do footer | `00/migration/02-support-before-2026-05-21.png` | `00/migration/02-support-after-2026-05-21.png` |

**Comparação visual:**

- **Hero (topo)** — conteúdo renderiza identicamente (mesma centralização, mesmas distâncias). O ajuste de compensação do header não produziu deslocamento perceptível porque o viewport do iframe é pequeno (~540px) e a hero já estava centralizada.
- **Footer (região final)** — antes, o footer era empurrado para o fim de um wrapper `100vh`. Depois, o footer flui logo abaixo da FAQ. **O conteúdo do footer não mudou**; o espaço morto de 72px no topo do wrapper foi eliminado.

**Não foi observada** nenhuma regressão visual em:
- Header (logo, nav, CTA TESTE GRÁTIS, language toggle).
- Conteúdo da hero (título, tópicos accordion, cards de contato Discord/Ticket).
- Conteúdo da FAQ (eyebrow, título, descrição, 2 CTAs verde/roxo, 6 itens accordion).
- Footer (5 colunas, certificados strip, copyright, socials).

---

## 7. Riscos encontrados

### Risco BAIXO

1. **Browsers sem suporte a `100svh`** — mitigado com `@supports not (height: 100svh) { .support-page { min-height: 100vh; } }`.
2. **Cascade de `min-height` no body** — a classe Tailwind `min-h-[100svh]` ganha por especificidade sobre `body { min-height: 100vh }` do `reset.css`. Verificado via DOM (`minHeight: 540px = 100svh`).
3. **Tailwind CDN warn no console** — mensagem padrão "should not be used in production". Esperado, não-bloqueante, já documentado em `tailwind-migration.md`.

### Risco NÃO encontrado

- Não houve regressão em outras páginas — a única regra global tocada foi em `overrides.css`, **escopada por `.support-page`**. Outras páginas não carregam essa classe no body, então o seletor não casa.
- Header/footer/FAQ/JS global — intactos.
- `/affiliates`, `/games`, `/download`, `/claro`, `/prices`, home — intactas.

---

## 8. Pendências

Coisas que **não** foram feitas nesta etapa (escopo limitado a `/support`):

1. **Container global 1360 → 1280** — ainda em legado em `--np-container-max` (`variables.css`), `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`. Pendente — D-014.
2. **`--gutter: 32px` → media query mobile 20px** — hoje só desktop 32. O mobile 20 está sendo aplicado **somente em `/support`** via `px-5 md:px-8`. Token global não foi tocado.
3. **`100vh → 100svh` em demais páginas** — ainda pendente em `/affiliates`, `/games`, `/download`, `/claro` e home v2.
4. **Page shell em demais páginas** — `/prices` é a próxima candidata (ver § 9).
5. **`.section-footer { height: 100vh }` global** — mantido. Override escopado por `.support-page` para não impactar outras páginas.
6. **Limpeza de órfãos** (`--max-width: 1280px`, `.section-fullscreen`, `pages/download.css`) — pendente.
7. **`src/scripts/features/` + `src/styles/features/`** — pastas ainda não criadas.

---

## 9. Recomendação para a próxima página

### Próxima: `/prices/`

Por quê:

- página mais simples ainda (só hero com aviso "em construção");
- já carrega Tailwind CDN;
- sem depêndencia de `pages/affiliates.css` (diferente de `/support`);
- sem canvas, sem carousel, sem features sensíveis.

### Mudanças previstas em `/prices/`

```html
<!-- antes -->
<body class="prices-page" data-page="prices" data-screen-label="Preços">
  …
  <main>
    <section id="hero" class="relative min-h-screen pt-header flex items-center justify-center text-center overflow-hidden">
      <div class="relative z-[2] max-w-[720px] px-8 py-np-2xl mx-auto">

<!-- depois -->
<body class="prices-page min-h-[100svh] flex flex-col" data-page="prices" data-screen-label="Preços">
  …
  <main class="flex-1 flex flex-col pt-header">
    <section id="hero" class="relative min-h-[calc(100svh-theme(spacing.header))] py-np-xl flex items-center justify-center text-center overflow-hidden">
      <div class="relative z-[2] max-w-[720px] mx-auto px-5 md:px-8">
```

E em `overrides.css`:

```css
.prices-page .section-footer {
  height: auto;
  min-height: 0;
  padding-top: 0;
  flex-shrink: 0;
}
@supports not (height: 100svh) {
  .prices-page { min-height: 100vh; }
}
```

### Critério de aprovação desta etapa antes de seguir para `/prices/`

- [ ] Visual de `/support/` aprovado em desktop.
- [ ] Hero centraliza corretamente em diferentes alturas de viewport (testar 720, 900, 1080).
- [ ] Footer flui naturalmente sem espaço morto.
- [ ] Verificar manualmente que `/affiliates`, `/games`, `/download`, home não regrediram.
- [ ] Console limpo (só o warn esperado do Tailwind CDN).
- [ ] Sem regressão do accordion / fade-in dos tópicos.

Quando aprovado, executar a mesma sequência em `/prices`, depois avaliar `/claro` (mais arriscado por usar `pages/home.css` + tutorial JS).

---

## 10. Resumo executivo

`/support/` foi migrada para o page shell canônico (`body flex-col + main flex-1 + footer natural`) e para o esquema `Header + Section = 100svh`, com container 1280 na FAQ e padding lateral 32/20 via Tailwind utilities. Footer `100vh` global foi neutralizado por **override escopado** em `overrides.css` — sem tocar no CSS global do footer, sem afetar outras páginas.

**Linhas de código alteradas:**

- `support/index.html`: 3 strings substituídas (linhas do body, main+hero, FAQ container).
- `src/styles/overrides.css`: 1 bloco adicionado (16 linhas comentadas + regras).

**Total:** 2 arquivos, sem regressão visual observável, sem aumento de superfície de risco para outras páginas.

**Próxima ação:** revisão humana do visual de `/support`, depois aplicar o mesmo padrão em `/prices/`.

---

**Fim do relatório.**
