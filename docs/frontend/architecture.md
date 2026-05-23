# Frontend Architecture

## Objetivo
Descrever a arquitetura do front-end do site da NoPing.

## Estrutura atual
- páginas em rotas próprias (`/games/`, `/affiliates/`, etc.)
- header e footer globais via JS
- estilos divididos em:
  - global
  - components
  - pages
- Tailwind adotado progressivamente

## Princípios
1. reutilizar antes de recriar
2. manter header/footer globais
3. usar Tailwind para layout
4. usar CSS complementar para exceções
5. documentar regras antes de escalar páginas novas

## Layout base recomendado
```html
<body class="min-h-screen flex flex-col">
  <header id="global-header"></header>
  <main class="flex-1">
    <!-- sections -->
  </main>
  <footer id="global-footer"></footer>
</body>
```

## Injeção de componentes
Header e footer são injetados via JS.
Isso facilita:
- rotas com profundidades diferentes
- estado ativo do menu
- manutenção centralizada

## Dados
Quando fizer sentido, usar `/src/data/` para evitar hardcode excessivo.

## Escalabilidade
Toda nova página deve respeitar:
- container de 1280
- section system
- design system
- componentes globais
- Tailwind-first
