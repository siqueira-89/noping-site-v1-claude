# Shadow Scale — NoPing

## Objetivo

Padronizar sombras estruturais sem transformar o site em uma interface pesada.

Na NoPing, profundidade vem principalmente de:
- contraste;
- superfície escura;
- borda translúcida;
- glow controlado.

Sombras tradicionais devem ser discretas.

## Escala oficial

| Token | Valor sugerido | Uso |
|---|---|---|
| `--np-shadow-sm` | `0 8px 24px rgba(0,0,0,0.24)` | cards pequenos |
| `--np-shadow-md` | `0 16px 48px rgba(0,0,0,0.32)` | cards e panels |
| `--np-shadow-lg` | `0 24px 80px rgba(0,0,0,0.45)` | hero panels |
| `--np-shadow-inner` | `inset 0 1px 0 rgba(255,255,255,0.04)` | superfícies glass |

## Uso recomendado

### Card padrão

```css
box-shadow: var(--np-shadow-sm);
```

### Painel premium

```css
box-shadow: var(--np-shadow-md), var(--np-shadow-inner);
```

### Hero panel

```css
box-shadow: var(--np-shadow-lg), var(--np-shadow-inner);
```

## Relação com glow

Shadow não substitui glow.

- `shadow` cria profundidade estrutural.
- `glow` cria energia da marca.

## O que evitar

- sombras brancas fortes;
- sombras coloridas em excesso;
- múltiplas sombras sobrepostas sem intenção;
- box-shadow muito pesado em todos os cards;
- usar shadow como divisor entre seções.
