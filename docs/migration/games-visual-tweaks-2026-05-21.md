# /games Visual Tweaks — 2026-05-21

> **Bloco 6** — três ajustes visuais pontuais aplicados SOMENTE na página `/games`.
> **Status:** implementado, validado via DOM/CSS computed.

---

## Arquivos alterados

| Arquivo | Mudança |
|---|---|
| `games/index.html` | 1 edit: `Counter Strike 2 → CS2` (no `.nm` do card e no `data-name`). |
| `src/styles/overrides.css` | 1 bloco aditivo escopado em `.jogos-page` (background + padding hero + hover catálogo). |

**Nenhum outro arquivo tocado.** `/support`, `/prices`, `/download`, `/affiliates`, `/claro`, home, header, footer, JS, animações — tudo intacto.

---

## Alteração 1 — Background da página

Substitui o background global do `body` (de `layout.css`) por uma composição mais moderna inspirada em **staging-site.noping.com/pt**:

```css
.jogos-page {
  background:
    radial-gradient(70% 45% at 50% -8%,  rgba(147, 255, 24, 0.10), transparent 70%),
    radial-gradient(40% 28% at 12% 32%,  rgba(46, 205, 255, 0.05), transparent 70%),
    radial-gradient(40% 28% at 88% 58%,  rgba(147, 255, 24, 0.04), transparent 70%),
    radial-gradient(85% 55% at 50% 112%, rgba(147, 255, 24, 0.07), transparent 72%),
    linear-gradient(180deg, #05070A 0%, #000000 60%, #05070A 100%) !important;
  background-attachment: fixed !important;
}
```

- 4 gradientes radiais: glow verde no topo + cyan tênue lateral esquerdo + verde tênue lateral direito + glow verde na base
- Base linear `#05070A → #000 → #05070A` para profundidade
- `background-attachment: fixed` mantém o fundo parado no scroll
- Não compete com o conteúdo, mantém legibilidade
- Aplicado **somente** em `.jogos-page` — outras páginas continuam com o body bg original

---

## Alteração 2 — Hero deck cards

**Mudanças:**

1. **HTML:** renomeado `Counter Strike 2 → CS2` em:
   - `<div class="nm">CS2</div>` (texto visível)
   - `data-name="CS2"` (metadata, não consumido por JS — verificado via grep)

2. **CSS:** o `.hdr` (top text + genre badge) sobe um pouco através da redução do `padding-top` do card:

```css
.jogos-page .gcard {
  padding-top: 14px; /* era 24px */
}
```

**O que NÃO foi tocado:**
- Animação de rotação do deck
- Transformações (translate/rotate/translateZ das classes `.s1..s5`)
- Setas de navegação `.deck-nav-lateral .arrow`
- Dots do `.deck-idx-strip`
- Estrutura do componente
- `.mt` (parte inferior com SEM NOPING / COM NOPING)

---

## Alteração 3 — Catálogo de jogos

**Comportamento novo:** sem hover, as imagens aparecem **limpas e completas**. Overlays e textos aparecem **apenas no hover**.

```css
.jogos-page .mini::before {
  opacity: 0;
  transition: opacity 220ms ease;
}
.jogos-page .mini .tg,
.jogos-page .mini .info {
  opacity: 0;
  transition: opacity 220ms ease;
}
.jogos-page .mini:hover::before,
.jogos-page .mini:hover .tg,
.jogos-page .mini:hover .info {
  opacity: 1;
}
```

**O que foi afetado por opacity:**
- `.mini::before` — overlay de gradiente (linha + radial + repeating)
- `.mini .tg` — badge de gênero no canto superior esquerdo
- `.mini .info` — caixa inferior com nome + ms before/after

**O que NÃO foi tocado:**
- `background-image` (a imagem do jogo permanece sempre visível)
- `aspect-ratio: 3/4` do card (tamanho preservado)
- Layout do `.deck-grid` (grid de 5 colunas desktop, 3 tablet, 2 mobile)
- Border do card
- Hover transform `translateY(-3px)` + border-color (mantidos para feedback de interação)

---

## Verificação técnica (DOM/CSS computed)

```json
{
  ".mini::before opacity (default)": "0",        // hidden by default
  ".mini .tg opacity": "0",                       // hidden by default
  ".mini .info opacity": "0",                     // hidden by default
  "body backgroundImage": "radial-gradient(70%...) + linear-gradient(180deg, #05070A...)",  // new bg active
  ".gcard padding-top": "14px",                   // reduced from 24px
  "deck card CS2 text in HTML source": "CS2"      // rename applied
}
```

Todos os 3 ajustes confirmados via computed styles.

---

## Riscos / pendências

- **Nenhum risco identificado.** Todas as mudanças são escopadas por `.jogos-page` e usam `opacity` + transitions (não `display: none`), preservando layout/posição.
- O `.mini:hover .info` ainda usa o backdrop-filter blur original (não foi alterado).
- O hover transform `translateY(-3px)` continua funcionando.

---

## Critério de aceite — checklist

- ✅ Novo background aplicado somente em `/games`
- ✅ Hero continua legível e premium
- ✅ Texto superior dos 5 cards ligeiramente mais alto (padding-top reduzido de 24 → 14)
- ✅ `Counter Strike 2 → CS2` aplicado
- ✅ Catálogo limpo sem hover (opacity: 0 em overlays)
- ✅ Informações aparecem apenas no hover (opacity: 1)
- ✅ Nenhuma outra página alterada (verificado: scope `.jogos-page` em todas as regras)

---

**Fim.**
