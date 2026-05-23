# Responsive Rules — NoPing

## Objetivo

Padronizar comportamento responsivo das páginas, seções e componentes.

## Estratégia

O projeto deve ser **mobile-first**, mas o design visual principal geralmente nasce desktop.

A implementação deve garantir que:

- desktop mantenha composição premium;
- tablet preserve leitura e hierarquia;
- mobile simplifique layout sem perder identidade.

## Breakpoints oficiais

Usar breakpoints padrão do Tailwind:

| Prefixo | Largura | Uso |
|---|---:|---|
| `sm` | `640px` | celulares grandes |
| `md` | `768px` | tablets |
| `lg` | `1024px` | laptops |
| `xl` | `1280px` | desktop |
| `2xl` | `1536px` | telas grandes |

## Container responsivo

```html
<div class="max-w-np-container mx-auto px-5 md:px-6">
```

Regras:

- mobile: `20px`
- tablet/desktop: `24px`
- conteúdo máximo: `1280px`

## Hero

### Desktop

- pode usar section full;
- composição em 2 colunas quando fizer sentido;
- `Header + Section = 100svh`.

### Mobile

- não forçar conteúdo a caber em 100svh se isso cortar informação;
- priorizar fluxo natural;
- reduzir efeitos decorativos;
- CTA visível sem excesso de scroll.

## Grids

### 4 cards

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### 3 cards

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
```

### 2 colunas

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

## Cards

Mobile:
- empilhar;
- reduzir padding;
- manter texto legível;
- evitar cards muito altos sem necessidade.

Desktop:
- alinhar alturas quando a comparação for importante;
- manter gaps consistentes.

## Header

- header global não deve ser recriado por página;
- comportamento mobile deve ser resolvido no componente global;
- páginas não devem criar hacks locais para o header.

## Footer

- footer global deve respeitar fluxo estrutural;
- em páginas curtas, `main` deve usar `flex: 1`;
- não usar margem manual para empurrar footer.

## Motion no mobile

Reduzir ou simplificar:

- partículas;
- parallax;
- transformações 3D;
- animações muito longas;
- carrosséis automáticos agressivos.

## O que evitar

- `height: 100vh` fixo em mobile;
- texto pequeno demais;
- cards com overflow horizontal acidental;
- containers diferentes por página;
- duplicar header/footer para resolver responsivo;
- esconder conteúdo importante em mobile.
