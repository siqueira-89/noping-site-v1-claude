# Feature CSS Strategy

## Objetivo

Definir quando usar `overrides.css` e quando criar CSS específico para uma feature.

---

## Regra principal

```txt
overrides.css é para exceções globais.
CSS de feature é para efeitos específicos.
```

Não transformar `overrides.css` em um arquivo gigante com tudo que não coube no Tailwind.

---

## O que vai no `overrides.css`

Usar para padrões visuais compartilhados:

- grid background global;
- glow helpers;
- scanline genérico;
- masks reutilizáveis;
- surfaces especiais;
- classes auxiliares usadas em múltiplas páginas;
- fallback de animações globais;
- pseudo-elements reutilizáveis;
- estilos que complementam o design system.

Exemplo:

```css
.np-soft-glow {
  box-shadow: 0 0 32px rgba(147, 255, 24, 0.20);
}
```

---

## O que NÃO deve ir no `overrides.css`

Evitar colocar:

- CSS específico de uma única hero;
- keyframes usados por apenas uma feature;
- estilos de um único experimento;
- wrappers de um único canvas;
- regras que dependem de uma página específica;
- hacks temporários;
- correções visuais locais.

---

## Quando criar CSS por feature

Criar arquivo específico quando a feature tiver visual próprio.

Exemplos:

```txt
src/styles/features/hero-network.css
src/styles/features/hero-globe.css
src/styles/features/support-orbit.css
```

Usar CSS por feature para:

- pseudo-elements próprios;
- keyframes próprios;
- wrappers de Canvas/Three.js;
- layers de parallax;
- masks específicas;
- efeitos que não devem aparecer em outras páginas;
- visual experimental.

---

## Relação entre JS e CSS

Um arquivo `.js` não fica automaticamente ligado ao `.css`.

O HTML precisa carregar os dois:

```html
<link rel="stylesheet" href="../src/styles/features/hero-network.css">
<script src="../src/scripts/features/hero-network-gsap.js"></script>
```

O JS pode animar classes ou elementos estilizados pelo CSS, mas o carregamento é separado.

---

## Features que não precisam de CSS

Nem toda feature precisa de CSS.

Exemplo: uma animação GSAP simples de entrada pode usar apenas Tailwind + JS.

```js
gsap.from("[data-hero-title]", {
  y: 32,
  opacity: 0,
  duration: 0.8
});
```

Nesse caso, não criar CSS adicional.

---

## Features que precisam de CSS

Criar CSS quando houver:

- pseudo-element;
- keyframe;
- radial-gradient complexo;
- mask;
- canvas wrapper;
- overlay;
- glow com múltiplas camadas;
- visual que não deve poluir o HTML com classes enormes.

---

## Padrão de comentário obrigatório

Todo CSS de feature deve começar com:

```css
/* ============================================================
   Feature: Hero Network
   Depends on:
   - src/scripts/features/hero-network-gsap.js
   Used by:
   - preview/hero-network-preview.html
   - /support/hero, se aprovado
   ============================================================ */
```

Todo JS de feature deve declarar:

```js
/**
 * Feature: Hero Network GSAP
 * Depends on:
 * - GSAP
 * - src/styles/features/hero-network.css
 * Mount:
 * - [data-hero-network]
 */
```

---

## Regra de remoção

Não remover CSS de feature sem verificar:

- se a feature ainda existe;
- se outro JS depende das classes;
- se algum preview usa o arquivo;
- se alguma página real carrega o arquivo.

---

## Regra final

CSS de feature deve ser pequeno, claro e isolado.

Se começar a ficar grande demais, revisar se parte dele deveria virar componente, token ou helper global.
