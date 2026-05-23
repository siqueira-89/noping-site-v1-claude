# Tokens — NoPing

## Objetivo

Centralizar os valores reutilizáveis do sistema visual da NoPing.

Tokens são a ponte entre design, Tailwind, CSS e implementação com IA.

## Regra principal

Sempre que existir um token oficial, não criar valor paralelo no HTML ou CSS.

Exemplo:

```html
<!-- Preferir -->
<div class="max-w-np-container px-np-page">

<!-- Evitar -->
<div class="max-w-[1360px] px-[31px]">
```

## Arquivos

- `spacing.md` — espaçamentos, gaps e padding de seção
- `radius.md` — bordas arredondadas
- `shadows.md` — sombras estruturais
- `glow.md` — brilho neon
- `borders.md` — bordas e opacidades
- `icons.md` — tamanhos e regras de ícones
- `typography.md` — escala tipográfica
- `motion.md` — tempos e easing

## Hierarquia de decisão

1. `brand/brand-guidelines.md` define a intenção da marca.
2. `design-system/design.md` define a linguagem visual.
3. `tokens/` define os valores operacionais.
4. `frontend/tailwind-token-mapping.md` define como isso vira classe Tailwind.
5. O código deve seguir essa cadeia.

## Regra para IA

Ao criar ou alterar qualquer seção, componente ou página:

- consultar tokens antes de inventar medidas;
- não criar novas cores sem justificativa;
- não misturar vários `max-width`;
- não criar radius, glow ou shadow fora da escala;
- usar tokens para manter consistência entre páginas.
