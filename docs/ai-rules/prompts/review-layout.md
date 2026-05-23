# Prompt — Review Layout

## Objetivo

Auditar layout sem alterar código.

## Template

```txt
Objetivo:
Auditar a página [rota] sem alterar código.

Contexto:
Precisamos entender se a página segue as regras de container, sections, header, hero, footer e Tailwind.

Arquivos envolvidos:
- [listar arquivos da página]
- docs/layout/container.md
- docs/layout/sections.md
- docs/frontend/tailwind.md

Verificar:
- usa Tailwind?
- usa CSS de página?
- usa CSS global?
- usa componentes globais?
- existe 100vh, 100svh, min-height ou height?
- a hero considera header?
- o footer funciona por regra estrutural?
- container é 1280px?
- existe 1350px ou 1360px?
- há regras duplicadas?

Entregável:
Criar relatório com problemas encontrados, riscos e recomendações.

O que não deve ser feito:
- não alterar HTML
- não alterar CSS
- não alterar JS
- não apagar arquivos
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
