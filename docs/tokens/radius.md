# Radius Scale — NoPing

## Objetivo

Padronizar o arredondamento de cards, botões, inputs, badges e containers.

## Escala oficial

| Token | Valor | Uso |
|---|---:|---|
| `--np-radius-xs` | `6px` | badges pequenos, micro UI |
| `--np-radius-sm` | `8px` | botões, inputs menores |
| `--np-radius-md` | `12px` | cards pequenos, accordions |
| `--np-radius-lg` | `16px` | cards padrão |
| `--np-radius-xl` | `24px` | cards premium, panels, sections internas |
| `--np-radius-2xl` | `32px` | hero panels e grandes blocos visuais |
| `--np-radius-pill` | `9999px` | pills, chips, botões arredondados |

## Regras por componente

### Botão padrão

```css
border-radius: var(--np-radius-sm);
```

### CTA pill

```css
border-radius: var(--np-radius-pill);
```

### Card padrão

```css
border-radius: var(--np-radius-lg);
```

### Card premium / glass

```css
border-radius: var(--np-radius-xl);
```

### Painel grande de tutorial

```css
border-radius: var(--np-radius-2xl);
```

## O que evitar

- radius aleatório por página
- misturar muitos raios dentro da mesma seção
- usar cards quadrados em áreas premium
- exagerar arredondamento em cards técnicos
