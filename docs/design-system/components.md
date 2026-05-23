# Components

## Objetivo
Documentar os componentes reutilizáveis do site e como eles devem ser usados.

## Componentes globais

### Header
Arquivos:
- `src/components/header.js`
- `src/styles/components/header.css`

Regras:
- fixo no topo
- mesma estrutura em todas as páginas
- não duplicar manualmente no HTML
- usar placeholder:
```html
<header id="global-header" data-active="home"></header>
```

### Footer
Arquivos:
- `src/components/footer.js`
- `src/styles/components/footer.css`

Regras:
- componente global único
- certificados fazem parte do footer
- não criar versão alternativa por página
- usar placeholder:
```html
<footer id="global-footer"></footer>
```

### FAQ
Arquivo:
- `src/components/faq.js`

Regras:
- componente global reutilizável
- padrão visual sólido com fundo preto
- comportamento accordion: um aberto por vez
- ideal para páginas institucionais e landings

### Carousel
Arquivo:
- `src/components/carousel.js`

Uso:
- carrosséis de cards
- auto-scroll
- progresso / barra
- fade rotators

### Buttons helpers
Arquivo:
- `src/components/buttons.js`

Uso:
- grupos de botões
- smooth scroll
- comportamento compartilhado de UI

## Componentes visuais recorrentes

### Cards de afiliados
- devem seguir padrão aprovado da página `/affiliates`
- se reutilizados em outras páginas, reaproveitar o mesmo JS/markup, não duplicar lógica

### Hero CTAs
- usar padrão global de botão
- não reinventar variantes locais desnecessárias

### FAQ buttons
- comportamento visual reutilizável em outras páginas quando houver padrão similar

## Regra de reutilização
Se um elemento aparece em mais de uma página:
- primeiro tentar reutilizar
- se for animado ou interativo, transformar em feature global ou componente reutilizável

## O que não fazer
- duplicar lógica JS em múltiplas páginas
- criar pequenas variações locais sem necessidade
- reescrever header/footer/faq para cada landing
