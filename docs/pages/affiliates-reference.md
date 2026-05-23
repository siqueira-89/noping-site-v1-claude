# Affiliates Reference — NoPing

## Objetivo

Registrar a página `/affiliates/` como referência operacional do site.

Esta página é a principal source of truth visual do workspace.

## Estrutura atual observada no HTML

A página possui:

1. Header global injetado
2. Grid background global
3. Hero com embaixadores
4. Carrossel de cards de afiliados
5. Seção tutorial / passo a passo
6. Seção de recompensas / rank
7. FAQ
8. Footer global injetado

## Includes principais

> Lista revalidada em 2026-05-21 contra o HTML atual de `affiliates/index.html`.

### Global

```html
<link rel="stylesheet" href="../src/styles/global/variables.css">
<link rel="stylesheet" href="../src/styles/global/reset.css">
<link rel="stylesheet" href="../src/styles/global/typography.css">
<link rel="stylesheet" href="../src/styles/global/layout.css">
<link rel="stylesheet" href="../src/styles/global/utilities.css">
```

### Components

```html
<link rel="stylesheet" href="../src/styles/components/header.css">
<link rel="stylesheet" href="../src/styles/components/footer.css">
<link rel="stylesheet" href="../src/styles/components/buttons.css">
<link rel="stylesheet" href="../src/styles/components/cards.css">
<link rel="stylesheet" href="../src/styles/components/forms.css">
```

### Page

```html
<link rel="stylesheet" href="../src/styles/pages/affiliates.css">
```

### O que **não** está incluso hoje na `/affiliates/`

- **Tailwind CDN** — não linkado.
- **`tailwind-config.js`** — não linkado.
- **`overrides.css`** — não linkado.

A página usa CSS de página (`pages/affiliates.css`, 878 linhas) + CSS global + componentes. Migração para Tailwind está fora de escopo até que haja plano explícito.

## Regras que a página confirma

- Header e footer são globais (injetados via JS).
- O grid background é aplicado fora do container.
- Seções usam comportamento de viewport (`.section-one`, `.section-viewport`).
- O hero compensa o header fixo via `padding-top: var(--np-header-height)`.
- A página usa CSS de página; **Tailwind não está ativo nesta página hoje**.
- Há JS global e JS de página.

## Pontos que precisam ser tratados como legacy

### Container

O CSS subjacente da página (`pages/affiliates.css` + `.shell` / `.container` em `layout.css`) usa hoje **`1360px`** via `var(--np-container-max)`.

Diretriz atual do projeto:

```html
max-w-np-container = 1280px (alvo)
```

Portanto, `1360px` deve ser tratado como legacy visual temporário até auditoria visual (D-014).

**Não** existem ocorrências literais de `max-w-[1360px]` no HTML servido — a largura vem inteiramente do token CSS. A migração será feita ajustando `--np-container-max` e o Tailwind config, não reescrevendo o HTML.

### Sections

O HTML atual usa:

```html
min-h-screen
```

Diretriz atual:

```html
Header + Section = 100svh
```

Essa diferença deve ser auditada antes de alterar.

### Inline styles

Existem estilos inline em títulos, descrições e blocos internos.

Diretriz:

- manter enquanto a página estiver aprovada;
- ao refatorar, mover para tokens/Tailwind;
- não alterar visual sem screenshot antes/depois.

## Componentes de referência

### Hero

Serve como referência para:

- uso de embaixadores;
- composição assimétrica;
- CTA forte;
- headline com destaque verde.

### Affiliate cards

Servem como referência para:

- card com imagem;
- badge;
- texto curto;
- footer interno;
- social icons;
- carousel horizontal.

### Tutorial

Serve como base para redesenhar o passo a passo da página.

### Rank

Serve como referência de cards de níveis/recompensas.

### FAQ

Serve como referência para FAQ institucional e CTA para suporte.

## Regra para próximas alterações

A página `/affiliates/` não deve ser usada como local para experimentar regras globais sem antes:

1. criar mockup;
2. validar visual;
3. auditar classes existentes;
4. alterar em branch/etapa separada;
5. comparar screenshot antes/depois.

## Como usar esta referência

Ao criar uma página nova:

- copiar o padrão visual, não o HTML inteiro;
- reutilizar header/footer;
- reutilizar tokens;
- respeitar container 1280;
- evitar trazer `max-w-[1360px]` para páginas novas;
- manter grid e glow na intensidade correta.
