# Features

## Objetivo

Documentar scripts, animações e comportamentos reutilizáveis do projeto NoPing.

Uma feature é qualquer comportamento visual ou interativo que pode ser isolado, testado e reaproveitado sem depender de uma página específica.

Exemplos:

- hero animada com GSAP
- grid background
- partículas
- carrossel
- FAQ accordion
- globe / Three.js
- mapa de rotas
- cards com stagger
- parallax de hero
- efeitos de mouse tracking

---

## Regra principal

Se uma feature é usada em mais de uma página, ou tem potencial de reutilização, ela deve ser tratada como reutilizável.

Não duplicar lógica JS em múltiplas páginas.

---

## Matriz de responsabilidade — Tailwind, CSS, GSAP, Three.js e Canvas

### Tailwind

Usar para:

- layout
- spacing
- responsividade
- containers
- grids simples
- botões
- cards simples
- cores
- radius
- bordas
- tipografia utilitária
- estados simples de hover/focus
- organização estrutural da seção

Não usar Tailwind para forçar efeitos visuais complexos.

Tailwind deve organizar a interface, não substituir animação premium.

---

### CSS complementar

Usar para:

- glow complexo
- keyframes simples
- pseudo-elements
- grid background
- masks
- scanlines
- noise
- backgrounds técnicos
- efeitos visuais que ficariam ilegíveis em Tailwind
- estilos base de wrappers usados por GSAP, Canvas ou Three.js

CSS complementar não deve substituir Tailwind em layout comum.

---

### GSAP

Usar para:

- entrada de textos
- stagger de cards
- parallax de camadas
- animação de CTAs
- transições de hero
- scroll suave/controlado
- timelines de interface
- coreografias visuais premium
- microinterações com sequência

GSAP deve animar elementos existentes, preferencialmente usando `data-attributes` como contrato.

GSAP não deve ser usado para hover simples, troca de cor básica ou espaçamentos que Tailwind resolve.

---

### Three.js / Canvas

Usar para:

- globe
- partículas 3D
- campo de pontos
- rotas 3D
- mapa interativo
- efeitos gráficos avançados
- elementos visuais que precisam de renderização própria
- simulações visuais que dependem de canvas

Three.js e Canvas devem viver em features isoladas, com `ResizeObserver` e proteção para `prefers-reduced-motion`.

---

## Regra principal da matriz

Cada tecnologia deve resolver o problema certo:

```txt
Tailwind → organiza e estiliza a interface
CSS → cria efeitos visuais especiais
GSAP → anima a interface
Three.js / Canvas → renderiza experiências gráficas avançadas
```

---

## Estrutura recomendada

```txt
src/scripts/features/
  hero-reveal-gsap.js
  hero-network-gsap.js
  hero-globe-three.js
  grid-background.js
  affiliate-carousel.js

src/styles/features/
  hero-network.css
  hero-globe.css

src/styles/overrides.css
```

---

## Quando usar `overrides.css`

Usar `overrides.css` para padrões globais ou exceções visuais compartilhadas.

Exemplos:

- grid background reutilizável
- glow helpers
- scanline global
- masks reutilizáveis
- classes auxiliares de superfície
- efeitos visuais usados por mais de uma página

Não jogar toda feature nova dentro de `overrides.css`.

---

## Quando criar CSS específico por feature

Criar um CSS próprio quando a animação tiver visual específico e não reutilizável.

Exemplos:

```txt
src/styles/features/hero-network.css
src/styles/features/hero-globe.css
src/styles/features/pricing-orbit.css
```

Usar CSS específico quando houver:

- pseudo-elements próprios
- keyframes próprios
- wrappers especiais
- layers visuais específicas
- canvas/Three.js com sizing especial
- efeitos que não devem vazar para outras páginas

---

## Contrato de uma feature

Toda feature deve ter um contrato claro.

### Exemplo de HTML

```html
<section data-hero-network>
  <div data-hero-eyebrow></div>
  <h1 data-hero-title></h1>
  <p data-hero-text></p>
  <div data-hero-actions></div>
  <div data-hero-visual></div>
</section>
```

### Exemplo de JS

```js
/**
 * Feature: Hero Network GSAP
 * Depends on:
 * - GSAP
 * - src/styles/features/hero-network.css
 *
 * Mount:
 * - [data-hero-network]
 *
 * Animated elements:
 * - [data-hero-eyebrow]
 * - [data-hero-title]
 * - [data-hero-text]
 * - [data-hero-actions]
 * - [data-hero-visual]
 */
```

---

## Regras para integração

Ao integrar uma feature em uma página real:

- não reescrever a feature;
- não alterar header/footer;
- adicionar apenas os `data-attributes` necessários;
- carregar o JS depois do GSAP, se depender de GSAP;
- carregar CSS da feature, se existir;
- preservar container, header e section system;
- validar com screenshot before/after;
- testar responsivo;
- respeitar `prefers-reduced-motion`.

---

## Regras para animações isoladas

Toda animação premium deve nascer primeiro como preview isolado:

```txt
preview/
  hero-network-preview.html
```

Depois, separar:

```txt
src/scripts/features/
  hero-network-gsap.js

src/styles/features/
  hero-network.css
```

Só depois integrar na página real.

---

## Padrão de segurança

Features não devem depender de tamanho fixo da página.

Para GSAP:

- usar wrappers e `data-attributes`;
- evitar medidas absolutas desnecessárias;
- animar elementos dentro do root da feature.

Para Canvas / Three.js:

- medir o container pai;
- usar `ResizeObserver`;
- recriar ou redimensionar renderer no resize;
- pausar ou simplificar em `prefers-reduced-motion`.

---

## O que não fazer

- não criar animação diretamente na página real sem preview;
- não misturar lógica de feature dentro de `main.js`;
- não duplicar JS entre páginas;
- não colocar CSS específico demais no `overrides.css`;
- não alterar HTML aprovado além do necessário;
- não usar GSAP para resolver layout;
- não usar Three.js quando CSS/GSAP resolve;
- não quebrar header/footer globais;
- não remover CSS antigo sem validação.

---

## Documentar quando

Criar entrada neste arquivo sempre que:

- uma feature passar a ser compartilhada;
- uma animação virar padrão visual;
- um JS for usado em mais de uma página;
- uma animação específica depender de CSS próprio;
- um efeito tiver contrato de `data-attributes`.
