# Global Container Alignment — 2026-05-21 (Bloco 8)

> Padronização global do container em **1280px**, com base no alinhamento aprovado em `/games` (Blocos 6 e 7). Header global, footer global e todas as seções passam a herdar essa regra.

---

## Arquivos alterados (5)

| Arquivo | Mudança |
|---|---|
| `src/styles/global/variables.css` | `--np-container-max: 1360px → 1280px` |
| `src/styles/components/footer.css` | `.footer__container { padding: 0 40px → 0 32px }` |
| `src/styles/home-v2/tokens.css` | `--page-max: 1360px → 1280px` |
| `src/styles/home-v2/base.css` | divider `max-width: 1360px → 1280px` |
| `src/scripts/global/tailwind-config.js` | `maxWidth.np-container: '1360px' → '1280px'` |

**Documentação atualizada:**
- `docs/decisions/decisions.md` — D-008 e D-014 marcadas como executadas
- `docs/layout/container.md` — header com status atualizado

**Componentes globais (NÃO recriados):**
- `header.css` — já usava `var(--np-container-max)`, herda automaticamente
- `footer.css` — só o padding foi ajustado (40 → 32). Estrutura interna intacta.

---

## Resultado verificado (DOM/CSS computed em iframe)

| Página | `.header__inner` | `.footer__container` | `.shell`/`.container` |
|---|---|---|---|
| `/prices` | max 1280, pad 20 (mobile) | max 1280, pad 32 | — |
| `/affiliates` | max 1280, pad 20 (mobile) | max 1280, pad 32 | max 1280 |
| `/` (home v2) | max 1280, pad 20 (mobile) | max 1280, pad 32 | container 1280 |

`/games` continua com seu override scoped (`.jogos-page .X { max-width: 1280px }`) — agora **redundante** com o global, mas inofensivo. Pode ser removido em etapa futura.

---

## O que NÃO foi alterado

- header.js, footer.js, faq.js, carousel.js, buttons.js
- JS de página, animações, Globe, Coverage, particles
- `pages/affiliates.css`, `pages/games.css`, `pages/home.css`
- Conteúdo, comportamento, estética além do alinhamento lateral

---

## Riscos remanescentes (a observar)

1. **Página `/affiliates`** — referência visual aprovada — agora renderiza com 80px a menos de largura no container global. O carousel + cards do hero não foram redimensionados; podem parecer ligeiramente mais apertados em desktop ≥1360.
2. **Home v2** — Globe + Coverage + AppDashboard foram dimensionados visualmente em 1360. Agora renderizam em 1280. Componentes React usam viewport-based units e clamp() — não devem quebrar, mas conferir visualmente.
3. **Overrides scoped em `/games`** ficam redundantes mas não conflitam.

---

## Próximas etapas sugeridas

1. Revisão visual humana das páginas sensíveis (`/affiliates`, home v2) em desktop ≥1440.
2. Limpeza dos overrides scoped redundantes em `overrides.css` (`.jogos-page .X { max-width: 1280px }`, `.claro-page .container { max-width: 1280px }`).
3. Remover `--max-width: 1280px` órfão em `variables.css` (agora coincide com `--np-container-max` mas pode confundir).

---

**Fim.**
