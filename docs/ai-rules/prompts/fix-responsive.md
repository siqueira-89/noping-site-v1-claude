# Prompt — Fix Responsive

## Objetivo

Corrigir responsividade de uma página ou seção sem redesenhar o layout aprovado.

## Template

```txt
Objetivo:
Corrigir responsividade da seção/página [nome] mantendo o visual aprovado.

Contexto:
A versão desktop está aprovada. A tarefa é ajustar tablet/mobile sem alterar a direção visual.

Arquivos envolvidos:
- [HTML/CSS/JS da página]
- docs/layout/container.md
- docs/frontend/tailwind.md
- docs/design-system/design.md

Verificar breakpoints:
- mobile
- tablet
- desktop
- telas grandes

O que deve ser feito:
- ajustar grid/flex
- ajustar espaçamentos
- ajustar tamanho de fonte se necessário
- evitar overflow horizontal
- manter CTAs visíveis
- preservar hierarquia

O que não deve ser feito:
- não redesenhar a seção inteira
- não alterar copy
- não alterar header/footer
- não criar CSS duplicado
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
