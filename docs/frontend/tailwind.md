# Tailwind Rules

## Objetivo
Padronizar o uso do Tailwind como sistema principal de layout e UI.

## Regra principal
**Tailwind é a primeira escolha sempre que possível.**

## Tailwind deve ser usado para
- layout
- container
- flex/grid
- espaçamento
- tipografia
- cores utilitárias
- bordas
- radius
- alinhamento
- responsividade

## CSS tradicional deve ser usado apenas para
- animações complexas
- keyframes
- canvas
- particles
- globe
- mapa
- blur/glow avançado
- estilos dependentes de JS
- efeitos muito específicos que Tailwind não cobre bem

## Setup atual
- Tailwind via CDN
- sem build step
- preflight desabilitado
- projeto mantém `reset.css`

## Tokens
Mapear tokens do projeto no Tailwind config:
- cores
- spacing
- radius
- shadows
- container

## Container padrão
Configuração desejada:
- 1280px
- centralizado
- padding lateral consistente

## Regras de migração
Ao migrar uma página:
1. converter layout para Tailwind
2. preservar exceções em CSS complementar
3. não quebrar JS
4. validar visualmente

## Não converter
- `header.js`
- `footer.js`
- `header.css`
- `footer.css`
- animações complexas da home
- features críticas em canvas/three.js

## CSS complementar
Usar um arquivo complementar para exceções, evitando espalhar estilos especiais em muitos arquivos.

## Objetivo final
Projeto Tailwind-first, com CSS tradicional apenas onde ele é realmente necessário.
