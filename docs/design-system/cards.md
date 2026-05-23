# Card System — NoPing

## Objetivo

Padronizar cards visuais e funcionais do site.

## Princípio

Cards na NoPing devem parecer camadas sobre um vácuo escuro.

A profundidade vem de:
- superfície;
- borda translúcida;
- contraste;
- glow controlado.

## Variantes

### 1. Solid Card

Uso:
- cards comuns;
- listas;
- benefícios;
- conteúdo institucional.

Visual:
- fundo `--np-surface`;
- borda `--np-border`;
- radius `--np-radius-lg`.

### 2. Glass Card

Uso:
- cards premium;
- hero panels;
- tutorial panels;
- cards sobre background com grid/glow.

Visual:
- fundo translúcido;
- blur controlado;
- borda suave;
- sombra interna.

### 3. Neon Card

Uso:
- destaque de informação;
- card selecionado;
- métrica importante;
- elemento de alto foco.

Visual:
- borda verde suave;
- glow moderado;
- não usar em todos os cards da grade.

### 4. Help Card

Uso:
- suporte;
- orientação;
- estado de ajuda;
- CTA auxiliar.

Visual:
- fundo verde muito tênue;
- borda verde suave;
- ícone claro;
- CTA direto.

### 5. Affiliate Card

Uso:
- depoimentos, embaixadores e afiliados.

Regras:
- imagem deve parecer intencional e não cortada de forma acidental;
- texto precisa ter altura controlada;
- badges e social icons devem manter escala pequena;
- footer interno deve ser consistente.

## Padding

| Tipo | Padding desktop | Padding mobile |
|---|---:|---:|
| card pequeno | `20px` | `16px` |
| card padrão | `24px` | `20px` |
| card premium | `32px` | `24px` |
| painel grande | `40px` | `24px` |

## Radius

| Tipo | Radius |
|---|---:|
| card pequeno | `12px` |
| card padrão | `16px` |
| card premium | `24px` |
| painel grande | `32px` |

## Hover

Cards não devem subir como regra geral.

Preferir:

```css
border-color: var(--np-border-hover);
background: var(--np-surface-elev);
box-shadow: var(--np-glow-sm);
```

## Grid de cards

### 4 cards

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### 3 cards

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
```

### 2 cards

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
```

## O que evitar

- cards com hover de `translateY` como padrão;
- múltiplos cards neon lado a lado;
- bordas brancas fortes;
- radius diferente sem função;
- imagem quebrando alinhamento;
- conteúdo sem respiro;
- criar variação local quando uma variante existente resolve.
