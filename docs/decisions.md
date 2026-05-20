# Decisões estruturais

Histórico curto das escolhas de arquitetura — quando aplicáveis, com a alternativa rejeitada e o motivo.

---

## D-001 · Single workspace ao invés de pastas por landing

**Antes:** o projeto vivia como 4 sandboxes paralelas (`affiliates-noping/`, `download-noping/`, `games-noping/`, `lp-tutorial-claro/`). Cada uma tinha sua cópia das fontes Bai Jamjuree, dos ícones de footer e do header.

**Agora:** um único workspace com `src/assets/` compartilhado, `src/styles/` em três níveis (global/components/pages) e `src/components/` JS. Cada página vira uma rota com `index.html`.

**Motivo:** evita drift visual (3 versões do mesmo header com larguras diferentes), reduz peso em ~120 arquivos duplicados e dá uma base única para todas as próximas páginas (`/suporte`, `/precos`, …) crescerem.

---

## D-002 · Página de afiliados como source-of-truth

A reorganização tratou **/afiliados** como o desenho aprovado mais recente. Header, footer, grid background, espaçamentos e componentes vieram de lá. As outras páginas se ajustaram para esse padrão (não o contrário).

Não foi voto técnico — é o que o time já validou visualmente, então adotar como referência reduz idas e voltas.

---

## D-003 · CSS em três camadas (global / components / pages)

```
src/styles/
├── global/     reset · variables · typography · layout · utilities
├── components/ header · footer · buttons · cards · forms
└── pages/      home · afiliados · downloads · jogos · suporte · precos
```

**Antes:** cada landing tinha um `style.css` monolítico (3.000+ linhas) misturando tokens, hero, footer e variantes.
**Agora:** todo CSS de página tem como pré-requisito **global → components**. Adicionar uma página nova é sempre o mesmo bloco de `<link>` no `<head>` + um arquivo em `pages/`.

A alternativa de extrair *todos* os blocos para componentes ainda mais granulares (cada seção um partial CSS) foi recusada por agora — pesava muito em arquivos pequenos sem ganho real até termos uma 2ª página de afiliados.

---

## D-004 · Header e footer injetados via JS (não via include estático)

A injeção via `outerHTML` no DOM dá três coisas que static include não daria sem build step:

1. **Detecção automática de profundidade** — header sabe se foi carregado de `/` ou de `/<page>/` e ajusta `href` e `src` dos assets sem hardcode.
2. **`active` state declarativo** — basta `<header id="global-header" data-active="jogos"></header>`.
3. **Atualização única para o site inteiro** — mudar o array `NAV` em `header.js` propaga em todas as páginas.

Trade-off conhecido: o header *aparece* depois do primeiro paint (~30–80ms em conexões boas). Considerado aceitável dado que o `position: fixed` + background blur escondem o "pulo" visual; quando virar um problema, o caminho é gerar HTML estático via build step (Vite/Astro/etc).

---

## D-005 · Pasta `00/` para "guardado-mas-pode-precisar"

Em vez de apagar arquivos antigos (refs visuais, design docs, sandbox versions, `extract.js`), eles vão para `/00/` — fora da árvore principal mas dentro do projeto. A regra do time é **`/00/` nunca é apagada**.

Isso libera a árvore principal de ruído sem o risco de perder um arquivo que volte a ser útil. Dentro do `/00/` há sub-pastas claras (`source/`, `reference/layout/`, `reference/hero/`) e os 4 arquivos `*-DESIGN.md` originais.

---

## D-006 · Páginas vazias em /suporte e /precos com base visual completa

Esses dois rota foram pedidos sem conteúdo final. A escolha foi:

- Criar a estrutura (`index.html`, `pages/<name>.css`, `pages/<name>.js`)
- Renderizar header + footer + um hero vazio sobre o grid bg
- Marcar visualmente "em construção" com um pill discreto (não um banner gritante)

**Por que** — links no header e no footer para essas rotas já existem. Apontar para 404 quebra a experiência; apontar para *algo* (mesmo vazio) mantém a navegação fluida e dá ao time uma base pronta para popular sem reescrever boilerplate.

---

## D-007 · Tokens duplicados (legacy + canônicos) durante a transição

`src/styles/global/variables.css` define **dois conjuntos de nomes** para a mesma cor — os canônicos `--np-*` (do design system NoPing) e os legacy (`--green`, `--font-sans`, `--r-md`, `--color-primary`, …) usados pelas páginas antigas. Os dois são `var()` aliases um do outro.

**Motivo:** evita ter que reescrever 4 mil linhas de CSS de páginas que estavam funcionando. Conforme as páginas forem revisadas, podemos migrar as referências para `--np-*` e remover os aliases. Por enquanto, **manter os dois**.

---

## D-008 · Imagens de referência viraram assets do projeto, não checked-in design

`affiliates-noping/images/layout/ref-*.png` (mockups, screenshots de moodboard) foram movidos para `00/reference/`. Eles **não fazem parte** do site servido — são material de referência para o time. Mantê-los em `src/assets/` confundiria com produção.

Step-screenshots do tutorial (`img-mobile-step-*.png` / `img-web-step-*.png`) **foram** para `src/assets/home/tutorial-steps/` porque a home consome eles.

---

## D-009 · JSON data files em /src/data/

`navigation.json`, `footer-links.json`, `affiliates.json`, `games.json`, `pricing.json` ficam em `/src/data/`. Hoje o conteúdo dos componentes (nav, footer) ainda vive **inline nos JS de componente** — os JSONs estão lá como contrato/documentação do shape esperado.

Próximo passo natural é fazer o `header.js` ler `data/navigation.json` em vez de embedar o array — quando isso fizer falta. Por enquanto a duplicação é deliberada para manter os componentes auto-contidos (não dependem de fetch).
