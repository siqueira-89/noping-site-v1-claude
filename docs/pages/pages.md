# Pages

## Objetivo
Descrever a função, estrutura e estado de cada página do site.

## Rotas

### `/`
Home principal

### `/affiliates/`
Página de afiliados
- referência visual principal do projeto
- define header/footer/faq/grid/padrões

### `/download/`
Página de download

### `/games/`
Página de jogos
- hero com deck 3D
- catálogo

### `/support/`
Página de suporte
- em construção ou em evolução
- deve usar hero, faq e footer globais

### `/prices/`
Página de preços
- em construção ou em evolução
- deve usar hero e footer no padrão do sistema

### `/claro/`
Página da parceria Claro / home antiga reaproveitada provisoriamente via link do blog
- usa `src/styles/pages/home.css` (compartilha estrutura do tutorial original)
- sem Tailwind ativo hoje
- header global com `data-active="claro"`
- conteúdo do tutorial vem de `src/scripts/pages/home.js` (`tutorialData` desktop + mobile)
- migração para Tailwind está fora de escopo até que haja refator do JS do tutorial

## Regras por página
- toda página deve usar header global
- toda página deve usar footer global
- sections principais devem respeitar section system
- textos e botões devem respeitar o container global
- backgrounds e efeitos podem ser full-width

## Regra de source of truth
A página `/affiliates/` é a principal referência aprovada para:
- header
- footer
- faq
- espaçamentos
- visual de componentes compartilhados
