# Spacing Scale — NoPing

## Objetivo

Padronizar espaços internos, gaps, padding de seção e distância entre blocos.

## Escala oficial

| Token | Valor | Uso principal |
|---|---:|---|
| `--np-space-0` | `0px` | reset |
| `--np-space-1` | `4px` | micro ajustes, ícones, labels |
| `--np-space-2` | `8px` | gaps pequenos |
| `--np-space-3` | `12px` | label → título, pequenos grupos |
| `--np-space-4` | `16px` | texto → CTA, gaps internos |
| `--np-space-5` | `20px` | mobile gutter |
| `--np-space-6` | `24px` | gutter padrão, gap de cards |
| `--np-space-8` | `32px` | blocos médios, cards grandes |
| `--np-space-10` | `40px` | header de seção, grupos importantes |
| `--np-space-12` | `48px` | grids e blocos amplos |
| `--np-space-16` | `64px` | respiro entre blocos |
| `--np-space-24` | `96px` | seção média |
| `--np-space-32` | `128px` | seção grande / landing hero |

## Spacing de seção

| Contexto | Desktop | Tablet | Mobile |
|---|---:|---:|---:|
| Section default | `96px` | `80px` | `64px` |
| Section full | centralizado por viewport | centralizado por viewport | conteúdo natural |
| Hero | `72px header + conteúdo` | `72px header + conteúdo` | conteúdo natural com respiro |
| Entre título e descrição | `16px–24px` | `16px` | `12px–16px` |
| Entre descrição e CTA | `24px–32px` | `24px` | `20px` |
| Entre cards | `24px` | `20px` | `16px` |

## Regras práticas

### Eyebrow para título

```css
margin-bottom: 12px;
```

### Título para descrição

```css
margin-bottom: 16px;
```

### Descrição para ação

```css
margin-bottom: 24px;
```

### Card padding

```css
padding: 24px;
```

Para cards maiores:

```css
padding: 32px;
```

## Tailwind recomendado

```html
<section class="py-16 lg:py-24">
  <div class="max-w-np-container mx-auto px-np-page">
    ...
  </div>
</section>
```

## O que evitar

- `margin` aleatório por página
- `padding` diferente sem motivo visual claro
- misturar `px-6`, `px-8`, `px-[31px]` sem regra
- colar cards nas bordas do viewport
- criar novas escalas paralelas
