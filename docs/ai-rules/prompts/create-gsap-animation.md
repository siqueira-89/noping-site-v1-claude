# Prompt — Create GSAP Animation

## Objetivo

Criar animação GSAP controlada, performática e coerente com a linguagem NoPing.

## Template

```txt
Objetivo:
Criar animação GSAP para [elemento/seção].

Contexto:
A NoPing deve parecer viva, mas não nervosa. Movimento deve ser elegante, funcional e discreto.

Arquivos envolvidos:
- [arquivo JS da feature ou página]
- docs/design-system/animations.md
- docs/frontend/features.md

O que deve ser animado:
- [listar elementos]

Tipo de animação:
- entrada
- scroll
- stagger
- glow
- transição
- pin/scrub, se necessário

Regras:
- duração curta/moderada
- ease suave
- sem bounce exagerado
- sem spring gratuito
- sem parallax agressivo
- respeitar performance

O que não deve ser feito:
- não animar tudo ao mesmo tempo
- não criar movimento sem função
- não quebrar mobile
- não adicionar GSAP onde CSS resolver melhor
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
