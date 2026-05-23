# Prompt — Migrate to Tailwind

## Objetivo

Migrar uma página ou seção de CSS tradicional para Tailwind com segurança.

## Template

```txt
Objetivo:
Migrar [página/seção] para Tailwind-first sem quebrar o layout.

Contexto:
O projeto usa Tailwind progressivamente, sem build step e com preflight desabilitado. CSS tradicional deve ficar apenas para exceções.

Arquivos envolvidos:
- [HTML da página]
- [CSS da página]
- docs/frontend/tailwind.md
- docs/migration/tailwind-migration.md
- docs/layout/container.md
- docs/layout/sections.md

Etapa 1 — Auditoria:
- identificar classes CSS atuais
- identificar layout/flex/grid
- identificar spacing
- identificar tipografia
- identificar exceções que devem continuar em CSS

Etapa 2 — Migração:
- converter layout para Tailwind
- converter spacing para Tailwind
- converter tipografia para Tailwind
- preservar JS
- manter CSS complementar apenas para exceções

Etapa 3 — Validação:
- screenshot before
- screenshot after
- comparar visualmente
- não apagar CSS antigo antes da validação

O que não deve ser feito:
- não refatorar JS
- não alterar header/footer
- não mudar design aprovado
- não remover CSS legado antes da validação
```

---

## Regras obrigatórias

- Seguir `docs/ai-rules/global-rules.md`
- Seguir `docs/ai-rules/visual-rules.md`
- Seguir `docs/ai-rules/code-rules.md`
- Usar Tailwind-first
- Respeitar container 1280px
- Não alterar header/footer sem pedido explícito
- Não alterar outras páginas
- Não apagar CSS legado antes de validação

## Critérios gerais de aceite

- Entrega limitada ao escopo
- Visual consistente com NoPing
- Sem regressão aparente
- Responsivo considerado
- Código simples e reaproveitável
