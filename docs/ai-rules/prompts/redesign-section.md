# Prompt — Redesign Section

## Objetivo

Redesenhar uma seção existente sem alterar outras partes da página.

## Template

```txt
Objetivo:
Redesenhar apenas a seção [nome da seção] da página [rota].

Contexto:
A seção atual não está alinhada ao visual NoPing. A nova versão deve seguir o sistema visual aprovado: dark, premium, neon green controlado, grid sutil, cards com bordas/glow e boa hierarquia.

Arquivos envolvidos:
- [listar HTML/CSS/JS da seção]
- docs/design-system/design.md
- docs/layout/container.md
- docs/layout/sections.md
- docs/ai-rules/visual-rules.md

O que deve ser mantido:
- textos atuais
- função da seção
- header/footer globais
- componentes globais já existentes

O que deve ser melhorado:
- hierarquia
- espaçamento
- alinhamento
- consistência visual
- responsividade

O que não deve ser feito:
- não alterar header
- não alterar footer
- não adicionar funcionalidades não pedidas
- não alterar outras páginas
- não criar novo sistema visual
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
