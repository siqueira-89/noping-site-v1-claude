# Design System — NoPing

> “The Kinetic Pulse” — escuro, bioluminescente, premium, com cor reservada para ação.

## Objetivo
Padronizar a linguagem visual das interfaces do site e das landing pages.

## Fonte de verdade visual
- Página `/affiliates`
- Manual de marca da NoPing
- Header e footer globais aprovados

## Direção criativa
A interface deve parecer um sistema vivo em um vácuo escuro. A informação aparece por luz, contraste, ritmo e glow controlado.

## Paleta operacional
### Primárias
- `--np-primary: #93FF18`
- `--np-primary-dim: #6BBD10`
- `--np-primary-glow: rgba(147,255,24,0.55)`

### Base / estruturais
- `--np-bg: #000000`
- `--np-bg-2: #05070A`
- `--np-surface: #1D2028`
- `--np-surface-elev: #12141A`

### Texto
- `--np-fg-1: #FFFFFF`
- `--np-fg-2: rgba(255,255,255,0.72)`
- `--np-fg-3: rgba(255,255,255,0.52)`
- `--np-fg-4: rgba(255,255,255,0.34)`

### Bordas
- `--np-border: rgba(255,255,255,0.06)`
- `--np-border-strong: rgba(255,255,255,0.15)`
- `--np-border-hover: rgba(255,255,255,0.40)`
- `--np-border-primary: #93FF18`

### Apoio visual / secundárias
- `#AEF55C`
- `#D4FF27`
- `#2ECDFF`
- `#5849FF`
- `#A8A8DC`
- `#8C3FD9`
- `#CC4194`
- `#E47435`
- `#424A5B`
- `#656D82`
- `#879BAB`

## Regra de cor
- O verde é a cor de ação
- `#05070A` e `#1D2028` são cores primárias de superfície e estrutura
- `#05070A` pode ser usada em fundos sólidos e faixas institucionais
- `#1D2028` pode ser usada em boxes, cards, tutorials, surfaces e blocos de conteúdo
- azul/roxo/laranja só entram como apoio visual controlado
- não introduzir uma segunda cor protagonista

## Tipografia
### Família oficial única do projeto
- Bai Jamjuree

### Regras
- Títulos: 600/700
- Tracking mais fechado para headlines
- UI, nav, eyebrow, badges e CTA em uppercase tracked
- Body em sentence case
- Itálico reservado para destaque controlado de feature names
- Não utilizar Outfit no site atual

## Cards
### Variantes aprovadas
1. Solid card
2. Glass card
3. Neon card
4. Help card

### Regra de hover
- cards não “sobem”
- interação por brilho, halo e mudança sutil de borda

## Botões
### Primário
- fundo verde
- texto preto
- glow sutil no hover

### Ghost / outline
- fundo transparente
- borda translúcida
- hover com ganho de contraste

### CTA pill
- usado em hero e CTAs de destaque

## Ícones
- SVG inline ou em `src/assets/icons/`
- stroke 2px
- estilo monoline
- `currentColor` como padrão
- biblioteca preferida: Lucide

## Fundo visual
- grid background é parte da linguagem visual do produto
- ele deve ser full-width
- ele não deve obedecer ao container de conteúdo

## O que não fazer
- não usar divisórias brancas rígidas entre seções
- não usar gradientes azul-roxo de startup como linguagem principal
- não exagerar glow
- não usar emojis decorativos
- não criar variedade cromática sem necessidade
