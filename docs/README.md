# Docs README — NoPing

## Objetivo

Este arquivo é o índice principal da pasta `/docs/`.

Ele **não é o mesmo README da raiz do projeto**.

### Diferença

- `README.md` na **raiz do projeto** → explica o projeto como um todo, setup, estrutura geral, deploy e convenções principais.
- `docs/README.md` → organiza e explica **somente a documentação interna** do projeto.

---

## Estrutura da documentação

### `/docs/brand`

Documentos ligados à marca e identidade institucional.

- `brand-guidelines.md`  
  Regras centrais de marca, posicionamento, essência, tom visual e relação com o front-end.

---

### `/docs/design-system`

Documentos ligados ao sistema visual e aos componentes.

- `design.md`  
  Paleta, tipografia, cards, botões, fundo visual e linguagem estética do produto.

- `components.md`  
  Header, footer, FAQ, carrosséis, botões e regras de reutilização.

- `animations.md`  
  Durações, princípios de movimento, performance e regras para animações reutilizáveis.

- `buttons.md`  
  Sistema operacional de botões: tamanhos, estados, uso e restrições.

- `cards.md`  
  Sistema operacional de cards: variantes, padding, hover, borda e responsividade.

---

### `/docs/tokens`

Documentos ligados aos valores reutilizáveis do sistema visual.

- `README.md`  
  Explica como usar os tokens.

- `spacing.md`  
  Escala de espaçamento, gaps, padding de seção e regras de uso.

- `radius.md`  
  Escala de bordas arredondadas.

- `shadows.md`  
  Escala de sombras estruturais.

- `glow.md`  
  Escala de brilho neon e regras de intensidade.

- `borders.md`  
  Escala de bordas, opacidade e estados.

- `icons.md`  
  Tamanhos, stroke e regras para ícones.

- `typography.md`  
  Escala tipográfica operacional.

- `motion.md`  
  Tokens de duração, easing e movimento.

---

### `/docs/layout`

Documentos ligados à estrutura visual e comportamento de seção.

- `container.md`  
  Regra do container global de 1280px e alinhamento lateral de conteúdo.

- `sections.md`  
  Regra de sections full-screen, viewport, footer por regra estrutural e relação com o header.

- `grid.md`  
  Sistema de grid, spacing e respiração visual.

- `responsive.md`  
  Breakpoints, comportamento mobile/tablet/desktop e regras de reorganização.

---

### `/docs/frontend`

Documentos ligados à implementação técnica do front-end.

- `tailwind.md`  
  Regra de uso do Tailwind como sistema principal e CSS apenas para exceções.

- `features.md`  
  Scripts e animações reutilizáveis do projeto.

- `architecture.md`  
  Estrutura geral do front-end, princípios e arquitetura das páginas.

- `tailwind-token-mapping.md`  
  Como mapear tokens do design system para `tailwind-config.js`.

---

### `/docs/pages`

Documentação de cada rota do site.

- `pages.md`  
  Explica o propósito, estrutura e regras de cada página.

- `affiliates-reference.md`  
  Referência operacional da página `/affiliates/`, baseada no HTML atual.

---

### `/docs/decisions`

Histórico de decisões importantes do projeto.

- `decisions.md`  
  Registro das decisões estruturais para manter consistência e evitar retrabalho.

---

### `/docs/migration`

Documentação de transições técnicas.

- `tailwind-migration.md`  
  Estratégia, regras e cuidados da migração para Tailwind.

- `layout-audit-2026-05-21.md`  
  Auditoria de layout, container, hero, footer e Tailwind. Fonte de verdade do estado atual vs documentado.

- `docs-validation-2026-05-21.md`  
  Consolidação e validação da pasta `/docs` em si — conflitos encontrados, decisões adicionadas, pontos pendentes.

- `support-implementation-plan.md`  
  Plano seguro de implementação da página de suporte.

- `affiliates-html-audit-2026-05-21.md`  
  Auditoria do HTML atual da página de afiliados.

- `animation-feature-checklist.md`  
  Checklist para criar e integrar features de animação.

---

### `/docs/ai-rules`

Regras e prompts reutilizáveis para IA.

- `global-rules.md`
- `visual-rules.md`
- `code-rules.md`
- `prompt-patterns.md`
- `review-checklist.md`
- `prompts/`

---

### `/docs/archive`

Materiais antigos, descontinuados ou apenas de referência.

- `README.md`  
  Explica o propósito da pasta de archive.

---

## Ordem de leitura recomendada

Para entender o projeto do jeito certo:

1. `brand/brand-guidelines.md`
2. `design-system/design.md`
3. `tokens/README.md`
4. `tokens/typography.md`
5. `tokens/spacing.md`
6. `layout/container.md`
7. `layout/sections.md`
8. `layout/responsive.md`
9. `frontend/tailwind.md`
10. `frontend/tailwind-token-mapping.md`
11. `design-system/components.md`
12. `design-system/buttons.md`
13. `design-system/cards.md`
14. `pages/pages.md`
15. `pages/affiliates-reference.md`
16. `decisions/decisions.md`

---

## Regra para agentes e futuras alterações

Antes de implementar qualquer mudança no projeto, consultar nesta ordem:

1. `docs/ai-rules/`
2. `docs/layout/`
3. `docs/tokens/`
4. `docs/frontend/`
5. `docs/design-system/`
6. `docs/pages/`
7. `docs/decisions/`

---

## Regras mais importantes do projeto

### Layout

- Container global: **1280px**
- Gutters (padding lateral): **32px desktop / 20px mobile**
- Textos, botões, grids e cards respeitam o container
- Backgrounds e efeitos podem ultrapassar o container
- Header fixo: **72px**
- Regra principal de tela: **Header + Section = 100svh**
- Fórmula canônica: `min-height: calc(100svh - var(--np-header-height))`
- Page shell esperado: `<body class="min-h-[100svh] flex flex-col"> + <main class="flex-1"> + <footer>`
- **`1360px` em código é legado temporário** — ver D-014 em `decisions/decisions.md`

### Tailwind

- Tailwind é o sistema principal sempre que possível
- CSS tradicional fica para exceções:
  - animações complexas
  - keyframes
  - particles
  - canvas
  - efeitos visuais avançados
  - estilos dependentes de JS
- O arquivo canônico para CSS complementar é **`src/styles/overrides.css`** (referências antigas a `complementary.css` em docs apontam para o mesmo arquivo — ver D-013)
- Esquema de tokens Tailwind **atualmente em uso**: `np-xs..np-3xl + header` (spacing), `np-sm..np-xl + np-pill` (radius), `np-card/elev + np-glow-*` (shadow). O esquema alternativo descrito em `frontend/tailwind-token-mapping.md` é meta futura, não atual (ver D-017)

### Tokens

- Tokens são a fonte de verdade operacional para spacing, radius, sombras, glow, bordas, tipografia, ícones e motion.
- Valores avulsos no HTML devem ser evitados quando já existir token equivalente.

### Tipografia

- A única família tipográfica oficial usada no projeto/site é **Bai Jamjuree**.
- JetBrains Mono pode ser usado apenas para dados, eyebrows técnicos e micro labels.

### Paleta central

- Verde principal: `#93FF18`
- Fundos estruturais principais: `#000000`, `#05070A` e `#1D2028`
- Cores secundárias podem ser usadas como apoio visual controlado, sem competir com o verde principal

### Componentes globais

Não recriar manualmente:

- header
- footer
- FAQ global
- features reutilizáveis
- carrosséis compartilhados

---

## Observação final

A pasta `/docs/` deve ser tratada como a fonte de verdade operacional do projeto.

Se houver conflito entre implementação e documentação:

1. revisar a documentação;
2. auditar a implementação;
3. corrigir com screenshot antes/depois;
4. registrar a decisão.
