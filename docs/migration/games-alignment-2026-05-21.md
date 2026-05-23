# /games Alignment — 2026-05-21

> **Bloco 7** — alinhamento lateral exato entre header, footer, hero e catálogo de `/games`.

---

## Auditoria inicial (estado antes)

| Elemento | max-width | padding lateral (desktop) |
|---|---|---|
| `.header__inner` | 1360px | 32px |
| `.footer__container` | 1360px | **40px** ← divergência |
| `.hero-wrapper.shell` | 1360px | **0px** (sobrescrito por `pages/games.css`: `padding: 72px 0 60px`) |
| `.sect-2.shell` | 1360px | **0px** (sobrescrito por `.sect { padding: 56px 0 24px }`) |

**Conclusão:** 3 paddings laterais diferentes (32/40/0) + container em 1360 (legacy). Visualmente, o footer ficava 8px mais "para dentro" que o header, e hero/catálogo ficavam 32px "para fora" do header.

---

## Mudança aplicada

**Arquivos alterados:**
- `src/styles/overrides.css` — 1 bloco aditivo escopado em `.jogos-page`

**Outras páginas:** ZERO mudanças. Header global, footer global, `pages/games.css`, JS, animações — tudo intacto.

```css
.jogos-page .header__inner,
.jogos-page .footer__container,
.jogos-page .hero-wrapper.shell,
.jogos-page .sect-2.shell {
  max-width: 1280px;
}

.jogos-page .footer__container,
.jogos-page .hero-wrapper.shell,
.jogos-page .sect-2.shell {
  padding-left: var(--gutter);   /* 32px */
  padding-right: var(--gutter);  /* 32px */
}

@media (max-width: 1024px) {
  .jogos-page .footer__container,
  .jogos-page .hero-wrapper.shell,
  .jogos-page .sect-2.shell {
    padding-left: 20px;
    padding-right: 20px;
  }
}
```

**Por que essa abordagem:**

1. **`max-width: 1280px`** alinhado com `docs/layout/container.md` (D-008). Mantém o token global `--np-container-max: 1360px` intacto (D-014) para não impactar `/affiliates`, `/games` (deck 3D), home v2 (Globe) em escopos não-tocados.
2. **`padding-left/padding-right`** explícitos para forçar o lateral correto. Não usa o shorthand `padding` para evitar sobrescrever os valores verticais que `pages/games.css` definiu (`72px 0 60px` na hero, `56px 0 24px` na catalog).
3. **Especificidade** `.jogos-page .X` (0,2,0) vence as regras originais em `pages/games.css` (0,2,0) — tie-breaker por ordem de carregamento, com `overrides.css` linkado depois.
4. **Mobile responsive** ajustado para 20px lateral em `<1024px`, alinhado com o `@media (max-width: 1024px)` do header.

---

## Verificação (estado depois — iframe 924px)

```json
{
  "headerInner":    { "maxW": "1280px", "padL": "20px", "padR": "20px", "left": 0, "right": 907.78 },
  "footerContainer":{ "maxW": "1280px", "padL": "20px", "padR": "20px", "left": 0, "right": 907.78 },
  "heroShell":      { "maxW": "1280px", "padL": "20px", "padR": "20px", "left": 0, "right": 907.78 },
  "catalogShell":   { "maxW": "1280px", "padL": "20px", "padR": "20px", "left": 0, "right": 907.78 }
}
```

✅ Os 4 containers agora têm **valores idênticos** em max-width, padding lateral, left e right.

---

## O que NÃO foi tocado

- Header global (componente)
- Footer global (componente)
- JS de página
- Animações
- Dropdowns
- Deck 3D (transformações `s1..s5`)
- Tamanho/posição dos cards do catálogo
- Outras páginas (`/support`, `/prices`, `/download`, `/affiliates`, `/claro`, home)

---

## Critério de aceite

- ✅ Header perfeitamente alinhado com o container (1280px, 32/20)
- ✅ Footer perfeitamente alinhado com o container (1280px, 32/20)
- ✅ Hero e catálogo de `/games` respeitando o mesmo alinhamento
- ✅ Tudo funcionando normalmente
- ✅ Nenhuma outra página alterada

---

## Screenshots

| Vista | Before | After |
|---|---|---|
| Hero | `00/migration/01-games-align-before-2026-05-21.png` | `00/migration/01-games-align-after-2026-05-21.png` |
| Footer | `00/migration/02-games-align-before-2026-05-21.png` | `00/migration/02-games-align-after-2026-05-21.png` |

**Fim.**
