# Tailwind Token Mapping — NoPing

> **Status (revisado 2026-05-21):**
> Este arquivo descreve a **meta** de mapeamento entre os tokens do design system e o Tailwind config.
>
> O `src/scripts/global/tailwind-config.js` **já está parcialmente alinhado**: cores, fontes, blur, durações e easing batem. Os seguintes itens divergem hoje e serão ajustados em uma etapa de migração própria (ver D-014, D-017 em `decisions/decisions.md`):
>
> | Categoria | Meta (este arquivo) | Atual no código |
> |---|---|---|
> | Container `np-container` | `1280px` | `1360px` |
> | Spacing | `np-1..np-32 + np-page` | `np-xs..np-3xl + header` |
> | Radius | `np-xs..np-2xl + np-pill` | `np-sm..np-xl + np-pill` (faltam `np-xs`, `np-2xl`) |
> | Shadow | `np-sm/md/lg + np-glow-*` | `np-card/elev + np-glow-*` |
>
> **Para HTML novo escrito hoje**, usar o esquema **atual** (`np-xs..np-3xl`, etc.) até que a migração seja executada. Trocar a config sem migrar páginas quebra o que já está publicado.

## Objetivo

Definir como os tokens do design system devem ser mapeados para o Tailwind.

## Regra principal

Tailwind deve refletir os tokens do projeto.

Não usar valores arbitrários quando o token já existir.

## Container

```js
maxWidth: {
  "np-container": "1280px"
}
```

Uso:

```html
<div class="max-w-np-container mx-auto px-np-page">
```

## Header

```js
spacing: {
  "header": "72px"
}
```

Uso:

```html
<section class="pt-header">
```

## Spacing

```js
spacing: {
  "np-1": "4px",
  "np-2": "8px",
  "np-3": "12px",
  "np-4": "16px",
  "np-5": "20px",
  "np-6": "24px",
  "np-8": "32px",
  "np-10": "40px",
  "np-12": "48px",
  "np-16": "64px",
  "np-24": "96px",
  "np-32": "128px",
  "np-page": "24px"
}
```

## Colors

```js
colors: {
  np: {
    primary: "#93FF18",
    "primary-dim": "#6BBD10",
    bg: "#000000",
    "bg-2": "#05070A",
    surface: "#1D2028",
    "surface-elev": "#12141A"
  }
}
```

## Text colors

```js
colors: {
  "np-fg": {
    1: "#FFFFFF",
    2: "rgba(255,255,255,0.72)",
    3: "rgba(255,255,255,0.52)",
    4: "rgba(255,255,255,0.34)"
  }
}
```

## Radius

```js
borderRadius: {
  "np-xs": "6px",
  "np-sm": "8px",
  "np-md": "12px",
  "np-lg": "16px",
  "np-xl": "24px",
  "np-2xl": "32px",
  "np-pill": "9999px"
}
```

## Shadows / glow

```js
boxShadow: {
  "np-sm": "0 8px 24px rgba(0,0,0,0.24)",
  "np-md": "0 16px 48px rgba(0,0,0,0.32)",
  "np-lg": "0 24px 80px rgba(0,0,0,0.45)",
  "np-glow-sm": "0 0 16px rgba(147,255,24,0.22)",
  "np-glow-md": "0 0 32px rgba(147,255,24,0.28)",
  "np-glow-lg": "0 0 64px rgba(147,255,24,0.32)"
}
```

## Fonts

```js
fontFamily: {
  "np-display": ["Bai Jamjuree", "sans-serif"],
  "np-body": ["Bai Jamjuree", "sans-serif"],
  "np-mono": ["JetBrains Mono", "monospace"]
}
```

## Classes recomendadas

### Container

```html
<div class="max-w-np-container mx-auto px-5 md:px-np-page">
```

### Section default

```html
<section class="py-16 lg:py-24">
```

### Section full

```html
<section class="min-h-[calc(100svh-var(--np-header-height))] flex items-center">
```

### Card

```html
<div class="rounded-np-xl border border-white/10 bg-np-surface p-np-6 shadow-np-md">
```

### CTA

```html
<a class="inline-flex h-[52px] items-center justify-center rounded-np-sm bg-np-primary px-np-6 text-black">
```

## Valores legacy a migrar

O HTML atual da página `/affiliates/` ainda usa:

```html
max-w-[1360px]
```

Diretriz:

- não alterar sem auditoria visual;
- quando migrar, trocar por `max-w-np-container`;
- validar screenshot antes/depois.
