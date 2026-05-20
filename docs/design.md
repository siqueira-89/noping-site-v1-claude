# NoPing — Design System (consolidado)

> "The Kinetic Pulse" — escuro, bioluminescente, sem linhas finas; cor reservada para a ação.
> Página de **/afiliados** é a *source of truth* visual deste workspace.

## 1. Direção criativa

O sistema tira a UI da estética de "caixa estática" e a trata como um fluxo vivo de energia em um vácuo escuro. A informação se destaca por **luz**, não por linhas. Camadas se sobrepõem com vidro, profundidade vem de luminosidade, e o **verde neon** funciona como pulso vital do sistema.

- Asymmetric layouts deliberados (alinhamentos diferentes para métricas, conteúdo, ações)
- Cards flutuam sobre `#000` puro — o "vácuo" precisa respirar
- Pulsações lentas (2–3s) imitam um data-center "respirando"

## 2. Paleta

| Token CSS              | Hex / valor                                        | Uso                                                    |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------ |
| `--np-primary`         | `#93FF18`                                          | Neon-green — única cor cromática. CTA, status, foco.   |
| `--np-primary-dim`     | `#6BBD10`                                          | Hover do CTA primário.                                 |
| `--np-primary-glow`    | `rgba(147,255,24,0.55)`                            | Sombra/halo do verde.                                  |
| `--np-bg`              | `#000000`                                          | Base "vácuo" — fundo da home / heroes principais.      |
| `--np-bg-2`            | `#05070A`                                          | Quase-preto do footer e da faixa de certificados.      |
| `--np-surface`         | `#1D2028`                                          | Carvão midnight — superfícies elevadas, cards sólidos. |
| `--np-surface-elev`    | `#12141A`                                          | Hover de cards.                                        |
| `--np-claro-red`       | `#DA291C`                                          | **Apenas** dentro do logo da Claro / banner.           |
| `--np-fg-1`            | `#FFFFFF`                                          | Texto primário.                                        |
| `--np-fg-2`            | `rgba(255,255,255,0.72)`                           | Texto secundário.                                      |
| `--np-fg-3`            | `rgba(255,255,255,0.52)`                           | Texto terciário.                                       |
| `--np-fg-4`            | `rgba(255,255,255,0.34)`                           | Texto faded.                                           |
| `--np-border`          | `rgba(255,255,255,0.06)`                           | Ghost border padrão.                                   |
| `--np-border-strong`   | `rgba(255,255,255,0.15)`                           | Ghost border de inputs/cards.                          |
| `--np-border-hover`    | `rgba(255,255,255,0.40)`                           | Hover.                                                 |
| `--np-border-primary`  | `#93FF18`                                          | Active.                                                |

> **Regra:** azuis, roxos e gradientes "tech-startup" são **off-brand**. Não usar.

## 3. Tipografia

Família única: **Bai Jamjuree** (200–700, regular + itálico). JetBrains Mono apenas para eyebrows curtas e dados monoespaçados.

- Display & Headlines: `600/700`, `letter-spacing: -0.02em`, line-height curtinha.
- Body: `400` (`500` em hover/active states).
- **UPPERCASE com letter-spacing largo** (`0.10em` para cima) para nav, CTAs, eyebrows, badges.
- **Sentence-case** para body e títulos longos.
- *Italics* reservados para nomes de feature em verde neon (`Multi Internet`, `Boost FPS`).

## 4. Grid e respiração

Container max: **1360px**. Gutters laterais **32px** (mobile 20px). 8-pt spacing scale: `8 / 16 / 24 / 40 / 64 / 96 / 128`.

Seções principais respeitam **100vh** quando esse é o propósito (hero, faq de página inteira, etc.) — não quebrar esse padrão na reorganização.

### Fundo grid padrão

```css
.grid-bg {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(80% 60% at 50% 20%, #000 30%, transparent 100%);
}
```

Aplicar a **todas as seções de conteúdo** (hero, tutoriais, ranks, áreas de cards, páginas vazias como /suporte e /precos).

**Exceções:** o `header`, o `footer` e a `faq` da página de afiliados **não recebem** o grid — eles têm o padrão visual sólido (`#000000` / `#05070A`).

## 5. Cards

Quatro variantes:

1. **Solid card** — `--np-surface` no fundo preto, raio `--np-radius-md` (12 px), borda transparente que vai para `var(--np-border-hover)` no hover.
2. **Glass card** — `rgba(29,32,40,0.6)` + `backdrop-filter: blur(12–24px)` + borda translúcida; usado nos affiliate cards e CTAs grandes.
3. **Neon card** — superfície sólida com borda 1 px verde-neon; ênfase em info-cards do bloco de parceria.
4. **Help card** — fundo verde tênue `rgba(147,255,24,0.04)`, borda `12% verde`; aparece quando o usuário pode estar perdido.

Cards **nunca sobem** no hover. A interação é via **brilho** (surface clareia, border-opacity 15 % → 40 %, halo verde aparece).

## 6. CTAs e botões

- **Primário** — `--np-primary` no fundo, texto preto, raio 8 px, uppercase tracked. Hover: `--np-primary-dim` + glow externo.
- **Outline / ghost** — fundo transparente, borda `--np-border-strong`. Hover: borda → `--np-border-hover`, fundo → 4 % branco.
- **CTA pill** — versão grande para heroes; pill, com sombra interna verde.

## 7. Animação

`0.25s ease` é o cavalo de batalha. `0.4s ease` para cross-fades. **Sem bounce, sem spring.** Os pulses de status duram 2–3 s e são o único movimento "vivo" persistente.

## 8. O que NÃO fazer

- Não usar borders 1 px brancas como divisor entre seções — usar mudança de fundo.
- Não usar gradientes saturados azul-roxo.
- Não introduzir emojis decorativos.
- Não criar uma segunda cor cromática "para variedade" — o verde é precioso, justamente porque é único.

## 9. Ícones

SVG inline ou em `src/assets/icons/`. Stroke `2px`, estilo monoline. Usar `currentColor` para que o ícone herde a cor do contexto (ativos ficam verdes ao mudar `color`).

Onde precisar de algo que não está em `assets/icons/`, padrão da casa é **Lucide** (`https://unpkg.com/lucide-static`) — Heroicons / Feather / Material **não combinam** com o sistema.

## 10. Referências de página

| Página         | Status        | Fonte de verdade                                                                                              |
| -------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `/`            | **Pronta**    | Tutorial Claro (parceria oficial)                                                                             |
| `/afiliados`   | **Referência** | Define header, footer, faq, grid bg, espaçamentos, componentes reutilizáveis                                  |
| `/downloads`   | **Pronta**    | Hero único com seletor de plataforma                                                                          |
| `/jogos`       | **Pronta**    | Hero com deck 3D + catálogo de 25 minis                                                                       |
| `/suporte`     | **Em construção** | Header + footer + hero vazio sobre o grid                                                                   |
| `/precos`      | **Em construção** | Header + footer + hero vazio sobre o grid                                                                   |
