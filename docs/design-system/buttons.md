# Button System — NoPing

## Objetivo

Padronizar botões, CTAs, estados e tamanhos.

## Princípio

Botão é ação. Na NoPing, a ação principal deve ser claramente verde.

O verde `#93FF18` deve ser usado com intenção, não como decoração em todos os elementos.

## Variantes

### 1. Primary

Uso:
- CTA principal;
- conversão;
- teste grátis;
- download;
- ação mais importante da seção.

Visual:
- fundo verde;
- texto preto;
- peso 700;
- uppercase;
- hover com verde mais escuro e glow sutil.

```css
background: var(--np-primary);
color: #000;
border: 1px solid var(--np-primary);
```

### 2. Ghost / Outline

Uso:
- ação secundária;
- link importante;
- navegação auxiliar.

Visual:
- fundo transparente;
- borda translúcida;
- texto branco;
- hover com borda mais clara.

### 3. CTA Pill

Uso:
- hero;
- blocos promocionais;
- chamadas grandes.

Visual:
- pill;
- padding maior;
- brilho controlado;
- ícone opcional à direita.

### 4. Icon Button

Uso:
- carrossel;
- navegação curta;
- controles.

Visual:
- área clicável mínima confortável;
- ícone centralizado;
- hover por brilho/borda.

## Tamanhos

| Tamanho | Altura | Padding horizontal | Uso |
|---|---:|---:|---|
| `sm` | `36px` | `16px` | filtros, chips |
| `md` | `44px` | `20px` | botão padrão |
| `lg` | `52px` | `24px` | CTA de seção |
| `xl` | `60px` | `32px` | hero CTA |

## Tipografia

```css
font-size: 12px;
font-weight: 700;
letter-spacing: 0.10em;
text-transform: uppercase;
```

Para botões maiores:

```css
font-size: 13px;
```

## Ícones

- tamanho padrão: `16px`;
- espaço entre texto e ícone: `8px`;
- ícone à direita para avanço;
- ícone à esquerda para contexto.

## Estados

### Default

Botão normal.

### Hover

- primary: escurece levemente + glow;
- ghost: aumenta contraste de borda/fundo;
- icon: borda e cor ficam mais evidentes.

### Active

- manter contraste alto;
- pode usar borda verde.

### Disabled

```css
opacity: 0.45;
pointer-events: none;
```

### Loading

- manter largura;
- trocar texto por estado de carregamento apenas se necessário;
- não mudar layout.

## O que evitar

- vários botões verdes competindo na mesma seção;
- usar verde em botões secundários sem motivo;
- botões com altura inconsistente;
- ícones desalinhados;
- CTA com texto muito longo;
- botões com `border-radius` aleatório.
