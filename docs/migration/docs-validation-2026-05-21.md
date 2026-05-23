# Docs Validation — 2026-05-21

> **Tipo:** consolidação documental, somente leitura/edição de markdown.
> **Escopo:** valida a estrutura de `/docs/`, registra conflitos resolvidos entre documentos e lista pontos que ainda dependem de implementação futura.
> **Regra absoluta respeitada:** nenhum arquivo de produção (HTML, CSS, JS, Tailwind config, assets, componentes, scripts) foi alterado. Apenas `.md` dentro de `/docs/` foi tocado.

---

## 1. Arquivos revisados

### Lidos integralmente

- `docs/README.md`
- `docs/brand/brand-guidelines.md`
- `docs/design-system/design.md`
- `docs/design-system/components.md`
- `docs/design-system/animations.md`
- `docs/layout/container.md`
- `docs/layout/sections.md`
- `docs/layout/grid.md`
- `docs/layout/responsive.md`
- `docs/frontend/tailwind.md`
- `docs/frontend/architecture.md`
- `docs/frontend/features.md`
- `docs/frontend/animation-feature-architecture.md`
- `docs/frontend/feature-css-strategy.md`
- `docs/frontend/tailwind-token-mapping.md`
- `docs/tokens/README.md`
- `docs/tokens/typography.md`
- `docs/pages/pages.md`
- `docs/pages/affiliates-reference.md`
- `docs/decisions/decisions.md`
- `docs/migration/tailwind-migration.md`
- `docs/migration/affiliates-html-audit-2026-05-21.md`
- `docs/migration/layout-audit-2026-05-21.md`
- `docs/migration/support-implementation-plan.md`
- `docs/migration/animation-feature-checklist.md`
- `docs/ai-rules/README.md`
- `docs/ai-rules/global-rules.md`
- `docs/ai-rules/visual-rules.md`
- `docs/ai-rules/code-rules.md`
- `docs/ai-rules/review-checklist.md`
- `docs/ai-rules/prompt-patterns.md`
- `docs/ai-rules/prompts/*` (listado, não re-lido por completo)
- `docs/archive/README.md`

### Editados nesta etapa

| Arquivo | Mudança |
|---|---|
| `docs/decisions/decisions.md` | D-009 alinhada para `100svh`. D-010 detalhada (page shell). D-012 → D-017 adicionadas (gutters 32/20, `overrides.css` canônico, 1360 legado, `/affiliates` referência, componentes globais protegidos, esquema de tokens Tailwind atual). |
| `docs/layout/container.md` | Padding lateral alinhado para **32 px desktop / 20 px mobile** (estava 24/20). Exemplo CSS e Tailwind atualizados. Nota sobre `max-w-np-container = 1360 px` legado. |
| `docs/pages/affiliates-reference.md` | Removida afirmação falsa de que `/affiliates/` carrega Tailwind CDN e `overrides.css`. Corrigido o pseudo-fato "`affiliates.css` foi removido". Bloco de container reescrito explicando que 1360 vem do token CSS (não de classe inline). |
| `docs/pages/pages.md` | Entrada `/claro/` detalhada (consome `pages/home.css`, sem Tailwind, migração fora de escopo). |
| `docs/frontend/feature-css-strategy.md` | Trocadas menções de `complementary.css` por `overrides.css`. |
| `docs/frontend/features.md` | Idem. |
| `docs/frontend/animation-feature-architecture.md` | Idem. |
| `docs/frontend/tailwind-token-mapping.md` | Adicionado bloco "Status (revisado 2026-05-21)" no topo declarando este arquivo como **meta**, não reflexo do código atual. Tabela explicitando esquema meta vs atual. |
| `docs/migration/animation-feature-checklist.md` | `complementary.css` → `overrides.css`. |
| `docs/ai-rules/global-rules.md` | Seções 5 (Container) e 6 (Sections) reforçadas com gutters 32/20, fórmula `calc(100svh - var(--np-header-height))`, e tratamento de 1360 como legado. Lista "Não fazer" expandida (proibir `100vh` novo, proibir recriação de globais, exigir plano antes de mudanças grandes). |
| `docs/ai-rules/code-rules.md` | Seção `overrides.css` esclarece o nome canônico (referências antigas a `complementary.css` apontam para o mesmo arquivo). Lista de "Proibições" expandida: nada de `100vh` novo, nada de `max-w-[1360px]` em página nova, nada de tocar `tailwind-config.js` sem migrar HTML que depende dele. |
| `docs/ai-rules/review-checklist.md` | Checklist de Layout expandido (1280 + gutters 32/20 + `calc(100svh - header)` + page shell + não copiar `max-w-[1360px]`). Tailwind/CSS expandido (esquema de tokens atual vs meta, `overrides.css` canônico). Documentação expandida (ordem de consulta, exigir plano para escopos grandes). |
| `docs/README.md` | Bloco "Layout" detalha gutters, fórmula canônica e page shell. Bloco "Tailwind" registra `overrides.css` canônico e esquema de tokens atual. Entrada `migration/` lista esta validação e a auditoria. |

---

## 2. Estrutura `/docs/` — validação

### Estrutura está correta?

**Sim, com uma observação.** Cada pasta tem responsabilidade clara e sem sobreposição significativa:

| Pasta | Responsável por | Status |
|---|---|---|
| `brand/` | Marca, identidade, tom visual, paleta institucional. | ✅ |
| `design-system/` | Linguagem visual, componentes, cards, botões, animações. | ✅ |
| `layout/` | Container, sections, viewport, grid, responsivo. | ✅ |
| `frontend/` | Arquitetura, Tailwind, features, padrões técnicos. | ✅ |
| `pages/` | Inventário e referência das páginas. | ✅ |
| `decisions/` | Decisões estruturais e histórico técnico. | ✅ |
| `migration/` | Auditorias, planos e processos temporários. | ✅ |
| `tokens/` | Escalas oficiais do sistema visual. | ✅ |
| `ai-rules/` | Regras para agentes de IA e prompts reutilizáveis. | ✅ |
| `archive/` | Material antigo / referência fora da árvore principal. | ✅ |

**Observação:** `tokens/spacing.md` está referenciado no índice do `tokens/README.md` mas não foi inspecionado nesta validação; recomendar leitura/atualização porém não foi alterado.

### Header/footer/FAQ globais documentados

Cobertos por `design-system/components.md` + `decisions.md` D-004 + D-016. ✅

### Tipografia

Cobertos por `brand/brand-guidelines.md`, `design-system/design.md`, `tokens/typography.md`, `ai-rules/visual-rules.md` e `README.md`. Todos batem: **Bai Jamjuree é a única família oficial**. ✅

---

## 3. Conflitos encontrados

Os 9 conflitos diagnosticados em `layout-audit-2026-05-21.md` foram tratados a seguir.

### 3.1 Resolvidos nesta etapa (somente docs)

| # | Conflito | Ação tomada |
|---|---|---|
| 1 | `decisions.md` D-009 dizia `100vh`; `sections.md` diz `100svh`. | D-009 atualizada para `100svh` + nota histórica. Reforçada em `global-rules.md` e `review-checklist.md`. |
| 2 | `affiliates-reference.md` afirmava que `/affiliates/` carrega Tailwind CDN e `overrides.css`. | Lista de includes corrigida. Adicionado bloco "O que não está incluso hoje". |
| 3 | `affiliates-reference.md` afirmava que `affiliates.css` foi removido. | Bloco "Page" corrigido para mostrar o link real. |
| 4 | `affiliates-reference.md` mencionava `max-w-[1360px]` no HTML. | Esclarecido que o `1360px` vem do token CSS, não de classe inline. |
| 5 | `pages.md` não mencionava `/claro/`. | Entrada `/claro/` adicionada e detalhada. |
| 6 | Referências a `complementary.css` em 5 arquivos. | Substituídas por `overrides.css`. Nome canônico registrado em D-013 + reforçado em `code-rules.md` e `README.md`. |
| 7 | `tailwind-token-mapping.md` prescrevia esquema (`np-1..np-32`, etc.) divergente do código. | Adicionada nota de "Status" explicitando que o arquivo é **meta**, não reflexo do código atual. Esquema atual registrado em D-017. |
| 8 | `container.md` prescrevia padding lateral 24/20, divergindo do `--gutter: 32px` no código e do briefing (`32/20`). | `container.md` alinhada para **32 / 20**. D-012 adicionada. |
| 9 | `layout-audit-2026-05-21.md` apontava o footer com `height: 100vh` como desvio da regra estrutural prevista em `sections.md`. | D-010 detalhada explicitando o page shell esperado (`body flex-col / main flex-1 / footer flex-shrink-0`). Migração do código permanece como pendência. |

### 3.2 Conflitos não resolvidos nesta etapa (exigem código)

| Conflito | Por que não foi resolvido | Próxima ação |
|---|---|---|
| Container em código (1360) vs docs (1280) | Exige mudança em código (`variables.css`, `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`) + revalidação de 7 páginas. | Etapa B do `layout-audit-2026-05-21.md` § 10. |
| Gutters em código (32) vs docs (32 — agora alinhado) | Código já está em 32. Apenas falta implementar `20px` em mobile via media query. | Pequeno ajuste em `variables.css` ou em `.container`/`.shell` quando autorizado. |
| `100vh` em código vs `100svh` em docs | Exige alteração de múltiplos CSS de página + revalidação em mobile Safari. | Etapa C do audit § 10. |
| Page shell não implementado | Exige edição de HTML em todas as 7 páginas + `reset.css`. | Etapa C, página piloto primeiro (`/prices` ou `/support`). |
| `.section-footer { height: 100vh }` vs regra estrutural | Exige edição de `footer.css` após page shell estar em produção. | Etapa C item 10 do audit. |
| Tokens Tailwind esquema atual vs meta | Exige alteração de `tailwind-config.js` + revalidação de toda página migrada. | Etapa D. **Recomendação atual: manter esquema atual e atualizar `tailwind-token-mapping.md`**, não o contrário. |
| `src/scripts/features/` + `src/styles/features/` ausentes | Exige criação de pastas + extração do que está em `interactions.js`. | Etapa E. |
| `src/styles/pages/download.css` órfão | Exige remoção no código. | Etapa B item 5 do audit. |
| `--max-width: 1280px` órfão em `variables.css` | Idem. | Idem. |
| `home-v2/base.css` hardcoda `1360px` | Idem. | Idem. |
| Colisão `.flex` / `.grid` entre `layout.css` e Tailwind | Exige renome ou remoção. | Etapa D. |

---

## 4. Decisões adicionadas (em `decisions.md`)

| ID | Título | Resumo |
|---|---|---|
| D-009 (atualizado) | Rule of sections | Header + Section = **100svh**. Fórmula canônica: `calc(100svh - var(--np-header-height))`. `100vh` tratado como legado. |
| D-010 (detalhado) | Footer behavior | Page shell `body flex-col / main flex-1 / footer flex-shrink-0`. `.section-footer { height: 100vh }` removido após shell em produção. |
| D-012 (novo) | Gutters | **32 px desktop / 20 px mobile**. |
| D-013 (novo) | Arquivo de CSS complementar canônico | **`src/styles/overrides.css`**. Referências antigas a `complementary.css` apontam para o mesmo arquivo. |
| D-014 (novo) | 1360 px é legado temporário | Novas páginas nascem em 1280 (`max-w-np-container`). Migração de `1360` página a página, com snapshot antes/depois. `/affiliates` migra por último. |
| D-015 (novo) | `/affiliates` é referência visual aprovada | Reforço explícito de D-002. |
| D-016 (novo) | Componentes globais não devem ser recriados por página | Lista de globais + placeholders. |
| D-017 (novo) | Esquema de tokens Tailwind atual | `np-xs..np-3xl + header`, radius `np-sm..np-xl + np-pill`, shadows `np-card/elev + np-glow-*`. Esquema em `tailwind-token-mapping.md` é meta futura. |

---

## 5. Regras reforçadas para agentes de IA

Em `docs/ai-rules/`:

- **Ordem de leitura obrigatória** antes de implementar: `ai-rules/` → `layout/` → `tokens/` → `frontend/` → `design-system/` → `pages/` → `decisions/` (já estava documentado; reforçado em `review-checklist.md`).
- **Não improvisar layout, container, header, footer, tokens ou animações.**
- **Não copiar `max-w-[1360px]` para página nova.**
- **Não introduzir `100vh` novo — usar `100svh` + fórmula canônica.**
- **Não alterar `tailwind-config.js` para alinhar com `tailwind-token-mapping.md`** sem antes migrar o HTML que depende do esquema atual.
- **Plano antes de implementações grandes** — explicitado em `global-rules.md` "Não fazer" e em `review-checklist.md` item 8.
- **CSS complementar canônico = `overrides.css`** — nome registrado em D-013.

---

## 6. Pontos que ainda exigem implementação futura

> Lista compacta. Detalhes e priorização em `docs/migration/layout-audit-2026-05-21.md` § 10.

### Curto prazo (impacto baixo, sem revalidação visual)

1. Remover `--max-width: 1280px` órfão em `src/styles/global/variables.css`.
2. Remover `.section-fullscreen` órfã em `src/styles/global/layout.css`.
3. Remover `src/styles/pages/download.css` órfão.
4. Substituir `max-width: 1360px` hardcoded em `src/styles/home-v2/base.css` por `var(--np-container-max)`.

### Médio prazo (exige snapshot antes/depois por página)

5. Adicionar media query mobile para `--gutter` ou para padding do `.container`/`.shell` aplicando **20 px** abaixo de `640px`.
6. Migrar `100vh` → `100svh` página por página, validando em mobile Safari.
7. Implementar o page shell (`body.flex-col + main.flex-1 + footer.flex-shrink-0`) em página piloto e propagar.
8. Após page shell em produção, remover `height: 100vh` de `.section-footer`.

### Longo prazo (decisão + migração coordenada)

9. Migrar container 1360 → 1280 nos 4 lugares (`variables.css`, `tailwind-config.js`, `home-v2/tokens.css`, `home-v2/base.css`). Revalidar 7 páginas, `/affiliates` por último.
10. Decidir se `tailwind-token-mapping.md` será atualizado para refletir o esquema atual (recomendado, baixo custo) ou se o `tailwind-config.js` será migrado para o esquema da meta (alto custo, exige tocar todo HTML já migrado).
11. Criar `src/scripts/features/` + `src/styles/features/` quando a primeira feature reutilizável for extraída (candidato: particles em `interactions.js`).
12. Resolver colisão `.flex` / `.grid` entre `layout.css` e Tailwind (renomear para `.np-flex` etc. **ou** remover quando todas as páginas estiverem em Tailwind).

### Pendências documentais residuais

13. Inspecionar `docs/tokens/spacing.md`, `tokens/radius.md`, `tokens/shadows.md`, `tokens/glow.md`, `tokens/borders.md`, `tokens/icons.md`, `tokens/motion.md` (existem no índice; não foram re-lidos linha a linha nesta validação).
14. Verificar se `docs/ai-rules/prompts/*` refletem as regras consolidadas hoje (não foi feito nesta etapa).

---

## 7. Resumo executivo

A pasta `/docs/` está **internamente consistente** após esta etapa:

- Conflitos doc ↔ doc resolvidos (D-009, `affiliates-reference.md`, `pages.md`, `container.md`, referências `complementary.css`).
- Regras de container, sections, header, footer, Tailwind e tokens **estão documentadas com clareza** e apontam para as mesmas decisões.
- Decisões novas (D-012 a D-017) cobrem as zonas onde antes havia ambiguidade.

A pasta `/docs/` **não reflete a implementação atual** em vários pontos estruturais (container 1360, `100vh`, page shell, esquema de tokens, `overrides.css` em vez de `complementary.css`). Esses gaps estão catalogados acima como "pontos que exigem implementação futura" e foram detalhados em `layout-audit-2026-05-21.md`.

A documentação agora está pronta para guiar a Etapa 3 (implementação) sem margem para improviso. Próxima recomendação:

1. **Aprovar D-012, D-013, D-014, D-015, D-016, D-017** explicitamente (revisão humana das novas entradas em `decisions.md`).
2. **Priorizar os 4 itens de curto prazo** acima (limpeza sem revalidação visual).
3. **Escolher página piloto** para o page shell + `100svh` (recomendado: `/prices` ou `/support`).

---

**Fim da validação. Nenhum arquivo de produção foi alterado.**
