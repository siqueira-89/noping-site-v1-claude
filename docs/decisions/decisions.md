# Decisions

## Objetivo
Registrar decisões estruturais importantes do projeto para evitar retrabalho e regressão.

## D-001 — Single workspace
O projeto vive em um único workspace com assets e componentes compartilhados.

## D-002 — Página de afiliados como referência
A rota `/affiliates/` é a source of truth visual do projeto.

## D-003 — CSS em camadas
Estrutura:
- global
- components
- pages

## D-004 — Header e footer globais
Header e footer são componentes injetados via JS e não devem ser recriados por página.

## D-005 — Pasta `00/`
Tudo que não está em produção mas pode ser útil fica guardado em `00/`.

## D-006 — Suporte e preços
Essas páginas podem nascer com base mínima, mas devem seguir o sistema global.

## D-007 — Tokens legacy e canônicos
Durante transições, manter compatibilidade entre tokens antigos e novos quando necessário.

## D-008 — Container padrão
Container global padronizado em 1280px.

**Status (atualizado em Bloco 8 — 2026-05-21):** EXECUTADO. `--np-container-max` migrado de 1360 → 1280 em `variables.css`; `--page-max` em `home-v2/tokens.css` idem; `maxWidth.np-container` em `tailwind-config.js` idem; `max-width: 1360px` hardcoded em `home-v2/base.css` substituído por 1280.

A referência operacional aprovada é a página `/games` após Blocos 6 e 7. Header global, footer global e todas as seções passam a herdar esse alinhamento.

## D-009 — Rule of sections
Sections principais seguem a regra:

**Header + Section = 100svh**

- usar `min-height`, nunca `height` fixo;
- a regra canônica é `calc(100svh - var(--np-header-height))`;
- `100vh` é tratado como legado a ser migrado para `100svh` por página, com validação visual.

> Nota histórica: versões anteriores deste arquivo usavam `100vh`. A regra foi alinhada com `docs/layout/sections.md` em 2026-05-21 após a auditoria de layout.

## D-010 — Footer behavior
O footer deve funcionar por regra estrutural global (layout), e não por consequência do tamanho das sections.

Implementação esperada:

```html
<body class="min-h-[100svh] flex flex-col">
  <header id="global-header"></header>
  <main class="flex-1">…</main>
  <footer id="global-footer"></footer>
</body>
```

- `main` recebe `flex: 1`;
- `footer` recebe `flex-shrink: 0`;
- `.section-footer` não deve depender de `height: 100vh` próprio depois que o page shell for adotado.

## D-011 — Tailwind-first
Tailwind é o sistema principal para layout e UI. CSS tradicional fica para exceções (keyframes, pseudo-elements, backgrounds complexos, canvas/particles/globe/mapa, componentes globais existentes, estilos dependentes de JS).

## D-012 — Gutters (padding lateral do container)

- desktop: **32 px**
- mobile: **20 px**

Valores aplicados via `--gutter` em `src/styles/global/variables.css` e replicados nas classes utilitárias do Tailwind. Mantém compatibilidade com `/affiliates` (referência visual aprovada).

## D-013 — Arquivo de CSS complementar canonizado como `overrides.css`

O arquivo de exceções fora do Tailwind é `src/styles/overrides.css`.

Referências antigas a `complementary.css` em documentação devem ser lidas como `overrides.css`.

## D-014 — 1360 px é legado temporário

**Status (atualizado em Bloco 8 — 2026-05-21):** RESOLVIDO. A migração 1360 → 1280 foi executada globalmente. As 5 fontes de verdade (`variables.css`, `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`, mais o `footer.css` ajustado de padding 40 → 32) estão convergidas em 1280px + 32px lateral.

Páginas migradas anteriormente com `.shell` ou `.container` em 1360 herdam automaticamente o novo valor. Overrides scoped por página (em `overrides.css`) que tinham `max-width: 1280px` ficam **redundantes mas não conflitantes** — podem ser removidos em etapa futura de limpeza.

Histórico original abaixo:

O container atual implementado em código está em `1360 px` (`--np-container-max`, `--page-max`, `maxWidth.np-container` no Tailwind config, `home-v2/tokens.css`).

A meta documentada é **1280 px** (D-008).

Regras:

- novas páginas e novos blocos devem nascer em **1280 px**;
- `1360 px` continua válido apenas onde já estiver consolidado e enquanto não houver migração aprovada;
- não copiar `max-w-[1360px]` para páginas novas;
- a migração deve ser feita página a página, com snapshot antes/depois;
- `/affiliates` migra por último (referência visual aprovada).

## D-015 — `/affiliates` é referência visual aprovada

Reforço explícito de D-002:

- não alterar `affiliates/index.html` ou `src/styles/pages/affiliates.css` visualmente sem pedido explícito + snapshot antes/depois;
- usar como base ao desenhar novas páginas;
- a página é fonte de verdade para header, footer, FAQ, espaçamentos, grid bg e componentes compartilhados.

## D-016 — Componentes globais não devem ser recriados por página

- header (`src/components/header.js` + `header.css`);
- footer (`src/components/footer.js` + `footer.css`);
- FAQ (`src/components/faq.js`);
- carousel (`src/components/carousel.js`);
- buttons helpers (`src/components/buttons.js`).

Páginas devem usar os placeholders globais (`<header id="global-header">`, `<footer id="global-footer">`).

Não duplicar lógica JS reutilizável.

## D-017 — Tokens Tailwind: esquema atual `np-xs..3xl`

O Tailwind config implementado usa o esquema **`np-xs..3xl + header`** para spacing, **`np-sm..xl + np-pill`** para radius e **`np-card/elev + np-glow-*`** para shadows.

O esquema alternativo proposto em `frontend/tailwind-token-mapping.md` (`np-1..np-32 + np-page`, radius `np-xs..np-2xl`, shadows `np-sm/md/lg`) é tratado como **meta futura** e não substitui o esquema atual sem migração explícita e aprovada.

Qualquer novo HTML deve usar o esquema atual para evitar quebra silenciosa.
