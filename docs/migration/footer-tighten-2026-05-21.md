# Footer Tighten — 2026-05-21 (Bloco 9)

> Apenas ajustes verticais no footer global. Header, redes sociais, textos, links e alinhamento lateral intactos.

## Arquivos alterados (1)

- `src/styles/components/footer.css` — 4 edits localizadas

## Mudanças

| Item | Antes | Depois |
|---|---|---|
| `.footer__certificates` padding vertical | `24px 0` | `16px 0` (−16px no total) |
| `.footer__cert-logo` altura | `48px` | `40px` |
| `.footer__store-btn img` altura | `42px` | `36px` |
| `.footer__top` padding vertical | `0` | `32px 0` (+64px de respiro central) |

## Resultado

- Faixa de certificados **mais baixa** (cerca de 24px a menos no total: 16px do padding + 8px da redução de logo)
- Área central com **respiro vertical** explícito de 32px top + 32px bottom (era 0)
- Certificados continuam centralizados; mesma margem em cima e embaixo
- Redes sociais não tocadas
- Alinhamento lateral preservado (max-width 1280, padding 32)
- Textos, links e conteúdo intactos

## O que NÃO foi alterado

- footer.js (componente JS)
- Header
- Hero, sections, páginas
- Conteúdo textual, links, ordem das colunas
- Redes sociais (`.footer__bottom`, `.footer__socials`, `.footer__social-link`, etc.)
- Padding lateral do footer (continua 32px desktop)
- Outros arquivos do projeto

## Verificação

Aplicado globalmente via `footer.css` (componente global). Reflete em todas as páginas que usam o footer global.

**Fim.**
