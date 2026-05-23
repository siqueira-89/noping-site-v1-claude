# Section System

## Objetivo

Padronizar o comportamento vertical das seções do site, evitando que cada página interprete `100vh`, header e footer de uma forma diferente.

---

## Regra principal

Para seções principais:

**Header + Section = 100svh**

Isso significa que a primeira dobra da página deve considerar o header fixo dentro da altura total visível.

---

## Variável global do header

Usar sempre a mesma variável.

```css
:root {
  --np-header-height: 72px;
}
```

> Compatibilidade: se o projeto ainda usar `--header-height`, manter temporariamente como alias, mas a variável canônica deve ser `--np-header-height`.

```css
:root {
  --np-header-height: 72px;
  --header-height: var(--np-header-height);
}
```

---

## Implementação recomendada

Sempre usar `min-height`, nunca `height` fixo, para não cortar conteúdo.

### CSS

```css
.section-full {
  min-height: calc(100svh - var(--np-header-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

### Tailwind

```html
<section class="min-h-[calc(100svh_-_var(--np-header-height))] flex flex-col justify-center">
  ...
</section>
```

---

## Estrutura base da página

Toda página deve seguir a estrutura global:

```html
<body class="min-h-[100svh] flex flex-col">
  <header id="global-header"></header>

  <main class="flex-1">
    <!-- sections -->
  </main>

  <footer id="global-footer"></footer>
</body>
```

### CSS equivalente

```css
body {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
```

---

## Tipos de section

### 1. Section Full

Usar para:

- hero
- FAQ full-screen
- seções principais de landing
- blocos que precisam ocupar a primeira dobra
- footer full-screen quando esse for o propósito visual da tela

Regra:

```css
.section-full {
  min-height: calc(100svh - var(--np-header-height));
}
```

---

### 2. Section Default

Usar para:

- grids grandes
- listas longas
- conteúdos editoriais
- páginas que crescem naturalmente
- áreas onde o conteúdo define a altura

Regra:

```css
.section-default {
  padding-block: 96px;
}
```

---

### 3. Section Compact

Usar para:

- blocos auxiliares
- CTAs pequenos
- strips
- alertas
- navegação contextual

Regra:

```css
.section-compact {
  padding-block: 40px;
}
```

---

## Footer

O footer deve funcionar por regra estrutural, não por consequência do tamanho das sections.

### Regra estrutural global

```css
body {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

footer {
  flex-shrink: 0;
}
```

Com isso:

- o footer permanece no final;
- o layout não depende do volume de conteúdo;
- páginas curtas não ficam com footer “flutuando” no meio;
- páginas longas crescem naturalmente;
- o que já funciona hoje por consequência continua visualmente correto.

---

## Regra importante

- o footer não deve ser empurrado manualmente por seções;
- os certificados fazem parte do footer;
- se o footer for desenhado para ocupar a tela, ele também pode usar a lógica de viewport;
- o footer não deve ser colocado dentro da hero;
- o footer não deve depender de `margin-top` manual por página.

---

## O que evitar

Evitar:

```css
.hero {
  height: 100vh;
}
```

Evitar também:

```css
main {
  padding-top: 72px;
}

.hero {
  min-height: 100vh;
}
```

Esse padrão pode criar uma dobra de `100vh + 72px`, empurrando footer e conteúdo para baixo.

---

## Padrão correto para hero com header fixo

```css
.hero {
  min-height: calc(100svh - var(--np-header-height));
}
```

Se a página já compensa o header com padding no `main`, revisar antes de aplicar outra compensação na hero.

---

## Compatibilidade

Essa regra deve coexistir com o comportamento atual sem quebrar páginas aprovadas.

Antes de alterar uma página:

1. identificar como ela trata header;
2. identificar se usa `100vh`, `100svh`, `min-height` ou `height`;
3. verificar se o footer funciona por estrutura ou por consequência;
4. fazer screenshot antes;
5. aplicar regra mínima;
6. fazer screenshot depois.

---

## Prioridade de aplicação

Aplicar primeiro em páginas simples ou em construção:

1. `/support/`
2. `/prices/`
3. `/download/`

Evitar aplicar sem plano em páginas complexas:

- `/affiliates/`
- `/games/`
- home com animações complexas
