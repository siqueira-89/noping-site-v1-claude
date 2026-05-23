# Animation Feature Architecture

## Objetivo

Definir como criar animações isoladas em GSAP, Three.js ou Canvas para depois integrar com segurança nas páginas do site NoPing.

A regra principal é:

```txt
A animação nasce isolada, vira feature e só depois entra na página real.
```

---

## Por que isolar animações

Criar animações direto na página real aumenta o risco de:

- quebrar layout aprovado;
- alterar header/footer sem querer;
- misturar CSS local com CSS global;
- duplicar JS;
- depender de medidas específicas;
- dificultar manutenção futura;
- criar regressões em outras páginas.

O preview isolado permite testar visual, movimento e performance sem risco.

---

## Estrutura recomendada

```txt
preview/
  hero-network-preview.html

src/scripts/features/
  hero-network-gsap.js

src/styles/features/
  hero-network.css
```

Para features simples, o CSS específico pode não existir.

Para padrões globais, usar:

```txt
src/styles/overrides.css
```

---

## Tipos de feature

### 1. Feature GSAP

Usar para animação de interface.

Exemplos:

- entrada de hero;
- stagger de cards;
- parallax de elementos;
- CTA reveal;
- timeline de seções;
- scroll animation.

Estrutura:

```txt
src/scripts/features/hero-reveal-gsap.js
```

Pode depender ou não de CSS específico.

---

### 2. Feature Three.js

Usar para renderização gráfica avançada.

Exemplos:

- globo;
- rotas 3D;
- campo de pontos;
- mapa interativo;
- visual de rede;
- partículas em 3D.

Estrutura:

```txt
src/scripts/features/hero-globe-three.js
src/styles/features/hero-globe.css
```

Deve usar `ResizeObserver`.

---

### 3. Feature Canvas

Usar para efeitos gráficos 2D leves.

Exemplos:

- partículas 2D;
- linhas de rede;
- grid interativo;
- noise;
- trails;
- halos.

Estrutura:

```txt
src/scripts/features/hero-particles-canvas.js
```

Pode ter CSS mínimo para o wrapper/canvas.

---

## Contrato via data-attributes

Toda feature deve usar `data-attributes` como contrato.

Não depender exclusivamente de classes visuais.

Bom:

```html
<section data-hero-gsap>
  <h1 data-hero-title></h1>
  <p data-hero-text></p>
  <div data-hero-visual></div>
</section>
```

Evitar:

```js
document.querySelector(".title")
```

Preferir:

```js
root.querySelector("[data-hero-title]")
```

---

## Estrutura base de JS

```js
(function () {
  function initFeature(rootSelector = "[data-feature]") {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Init da feature aqui
  }

  window.NoPingFeatureName = {
    init: initFeature
  };

  document.addEventListener("DOMContentLoaded", () => {
    initFeature();
  });
})();
```

---

## Regras para GSAP

- verificar se `window.gsap` existe antes de animar;
- não quebrar se GSAP não estiver carregado;
- usar timeline para sequência;
- usar `stagger` para grupos;
- evitar animações agressivas;
- respeitar `prefers-reduced-motion`;
- não animar layout crítico se isso causar CLS;
- não depender de `height` fixo.

Exemplo:

```js
if (typeof gsap === "undefined") return;
```

---

## Regras para Three.js / Canvas

- o canvas deve ocupar o wrapper, não a página inteira por padrão;
- usar `ResizeObserver`;
- limpar listeners quando necessário;
- não travar a UI;
- usar `requestAnimationFrame` com controle;
- pausar ou simplificar em telas pequenas, se necessário;
- respeitar `prefers-reduced-motion`.

---

## Integração com página real

Quando a feature estiver pronta, o agente deve:

1. adicionar os `data-attributes` na seção;
2. adicionar o CSS da feature, se existir;
3. carregar dependências, como GSAP ou Three.js;
4. carregar o JS da feature;
5. validar visual;
6. gerar screenshot before/after;
7. documentar a alteração.

---

## Checklist antes de integrar

- A feature funciona isolada?
- O CSS não vaza para outras páginas?
- O JS não depende de classe visual frágil?
- Existe proteção para `prefers-reduced-motion`?
- Funciona sem tamanho fixo?
- O wrapper tem `position: relative` quando necessário?
- O canvas/visual respeita o container correto?
- Não altera header/footer?
- Não altera páginas sensíveis sem aprovação?

---

## Regra final

A animação deve se adaptar à página.

A página não deve ser quebrada para acomodar a animação.
