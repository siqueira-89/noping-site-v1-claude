# NoPing — Workspace unificado

Site institucional da **NoPing** consolidado em um único projeto, com páginas separadas por rota, componentes reutilizáveis e assets organizados por escopo.

> Sistema visual: **"The Kinetic Pulse"** — escuro, bioluminescente, sem linhas finas; cor reservada para a ação. A página de **/afiliados** é a fonte de verdade visual: header, footer, FAQ, fundo grid e espaçamentos vêm dela.

---

## Estrutura

```
/
├── index.html                 → home (Tutorial NoPing × Claro)
├── afiliados/index.html       → programa de parceiros (REFERÊNCIA)
├── downloads/index.html       → downloads multi-plataforma
├── jogos/index.html           → catálogo de jogos
├── suporte/index.html         → em construção
├── precos/index.html          → em construção
│
├── src/
│   ├── components/            JS de componentes globais
│   │   ├── header.js          NoPingHeader.init(sel, { active })
│   │   ├── footer.js          NoPingFooter.init(sel, { compact })
│   │   ├── faq.js             NoPingFAQ.init('.faq-accordion')
│   │   ├── carousel.js        NoPingCarousel.init / .fadeRotator
│   │   └── buttons.js         NoPingButtons.toggleGroup / .smoothAnchors
│   │
│   ├── styles/
│   │   ├── global/            reset · variables · typography · layout · utilities
│   │   ├── components/        header · footer · buttons · cards · forms
│   │   └── pages/             home · afiliados · downloads · jogos · suporte · precos
│   │
│   ├── scripts/
│   │   ├── global/            main · navigation · interactions · helpers
│   │   └── pages/             home · afiliados · downloads · jogos · suporte · precos
│   │
│   ├── assets/
│   │   ├── logos/             logo-noping-dark · NoPing_Icon_Verde · logo-claro-*
│   │   ├── fonts/             BaiJamjuree (200–700 + italics)
│   │   ├── icons/             stroke icons (download, lock, mac, android, …)
│   │   ├── shared/            footer/ — certs · store badges · social icons
│   │   ├── home/              tutorial-steps/{web,mobile}/*.png
│   │   ├── afiliados/         affiliates · ambassadors · medals-rank · bg-hero
│   │   ├── downloads/         hero bg
│   │   ├── jogos/             cards · games
│   │   ├── suporte/           (vazio — popular conforme o design)
│   │   └── precos/            (vazio — popular conforme o design)
│   │
│   └── data/                  navigation · footer-links · affiliates · games · pricing
│
├── docs/
│   ├── design.md              referência visual consolidada
│   ├── components.md          inventário dos componentes
│   ├── pages.md               status, includes e responsabilidades por rota
│   └── decisions.md           decisões estruturais com motivação
│
└── 00/                        material guardado-mas-pode-precisar:
    ├── source/                index.html / styles originais antes da reorganização
    ├── reference/             mockups, screenshots de moodboard
    ├── DESIGN.md, etc.        design docs originais por landing
    └── nunca apagar           regra do time
```

---

## Como rodar

Sem build step. Sirva a raiz do projeto com qualquer static server:

```bash
# Python
python3 -m http.server 8000

# Node
npx http-server -p 8000

# VS Code Live Server, Vite preview, Nginx... qualquer um serve.
```

Abrir `http://localhost:8000/`. As rotas funcionam tanto via `/affiliates/` quanto `/affiliates/index.html`.

---

## Como adicionar uma página nova

1. Criar a pasta `<rota>/index.html`. Copiar a estrutura `<head>` de qualquer página existente — todos os `<link>` apontam para `../src/styles/...`.
2. Setar `<body data-page="<rota>" class="<rota>-page">` (a classe é opcional, usar quando precisar *scopar* CSS).
3. Adicionar a placeholder do header: `<header id="global-header" data-active="<rota>"></header>` e o footer: `<footer id="global-footer"></footer>`.
4. Criar `src/styles/pages/<rota>.css` (escopado dentro de `.<rota>-page` quando útil).
5. Criar `src/scripts/pages/<rota>.js` (vazio para começar).
6. Linkar os dois no final do HTML como nas outras páginas.
7. Adicionar a entrada em `src/data/navigation.json` e no array `NAV` em `src/components/header.js`.
8. Atualizar `docs/pages.md`.

---

## Como adicionar / mover assets

| Tipo                       | Vai para                                  |
| -------------------------- | ----------------------------------------- |
| Logo NoPing/Claro          | `src/assets/logos/`                       |
| Ícone monoline (download, lock, …) | `src/assets/icons/`                |
| Certificado, badge de loja, ícone social | `src/assets/shared/footer/` |
| Asset usado em **uma** página | `src/assets/<page>/`                   |
| Fonte                      | `src/assets/fonts/<Family>/`              |
| Material de referência     | `00/reference/`                           |

Imagens não otimizadas? Converter para WebP antes (`.webp` para fotos / arts; SVG para vetorial).

---

## Convenções rápidas

- **Tokens CSS** vivem em `src/styles/global/variables.css`. Usar `--np-*` (canônicos) sempre que possível; aliases legacy (`--green`, `--color-primary`) existem para manter compatibilidade com CSS de páginas antigas.
- **JavaScript** é vanilla (sem build). Componentes globais expõem `NoPing<Coisa>.init()`. O `main.js` global chama tudo no `DOMContentLoaded`.
- **Comentários em pt-BR** quando úteis — todo o conteúdo do site é em português brasileiro.
- **Sem framework** — quando alguma página precisar reativamente, escalar para Astro/Vite *começando pela página nova*, não reescrevendo o que já funciona.

---

## Status

| Página       | Estado            |
| ------------ | ----------------- |
| `/`          | Pronta            |
| `/afiliados` | **Referência**    |
| `/downloads` | Pronta            |
| `/jogos`     | Pronta            |
| `/suporte`   | Em construção     |
| `/precos`    | Em construção     |
