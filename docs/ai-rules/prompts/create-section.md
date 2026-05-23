# Prompt — Create Section

## Objetivo

Criar uma nova seção para uma página do site NoPing.

## Template

```txt
Objetivo:
Criar uma nova seção [nome da seção] para a página [rota].

Contexto:
A seção deve seguir o design system NoPing: fundo escuro, grid sutil, verde #93FF18 como cor de ação, container 1280px e visual premium/gamer/tech.

Arquivos envolvidos:
- [listar arquivos]
- docs/layout/container.md
- docs/layout/sections.md
- docs/design-system/design.md
- docs/frontend/tailwind.md

O que deve ser feito:
- criar a seção com HTML semântico
- usar Tailwind-first
- respeitar container 1280px
- manter espaçamento premium
- prever desktop, tablet e mobile

O que não deve ser feito:
- não alterar header
- não alterar footer
- não alterar outras seções
- não criar cor protagonista nova
- não duplicar componentes existentes

Conteúdo obrigatório:
- [inserir textos]
- [inserir CTAs]
- [inserir cards/itens]
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
