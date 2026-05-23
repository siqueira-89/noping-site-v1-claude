# Motion Tokens — NoPing

## Objetivo

Padronizar tempos, easing e comportamento de movimento.

## Durações

| Token | Valor | Uso |
|---|---:|---|
| `--np-duration-instant` | `100ms` | resposta mínima |
| `--np-duration-fast` | `180ms` | hover simples |
| `--np-duration-base` | `250ms` | micro interações |
| `--np-duration-slow` | `400ms` | cross-fades e transições |
| `--np-duration-enter` | `600ms` | entrada de seção/card |
| `--np-duration-pulse` | `2000ms–3000ms` | glow/status persistente |

## Easing

| Token | Valor | Uso |
|---|---|---|
| `--np-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | padrão geral |
| `--np-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | entrada suave |
| `--np-ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | saída |
| `--np-ease-linear` | `linear` | loops, progress bars |

## Regras

### Hover

```css
transition: border-color 250ms var(--np-ease-standard),
            background-color 250ms var(--np-ease-standard),
            box-shadow 250ms var(--np-ease-standard);
```

### Entrada de cards

Usar stagger leve:

```js
duration: 0.6
stagger: 0.08
ease: "power2.out"
```

### Loop

Loops devem ser sutis e compatíveis entre início e fim.

## Quando usar CSS

- hover;
- opacity simples;
- pulse;
- border/glow;
- pequenas transições.

## Quando usar GSAP

- entrada de vários cards;
- animação por scroll;
- timeline;
- parallax leve;
- hero motion;
- sequências coordenadas.

## O que evitar

- bounce;
- spring exagerado;
- overshoot;
- escalas bruscas;
- parallax agressivo;
- animação que rouba atenção do CTA.
