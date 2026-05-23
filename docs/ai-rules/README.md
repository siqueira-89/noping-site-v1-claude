# AI Rules — NoPing

## Objetivo

Esta pasta reúne regras e prompts para orientar agentes de IA, Antigravity, Claude, ChatGPT e qualquer automação que altere ou revise o site da NoPing.

A função desta pasta é evitar:

- drift visual;
- duplicação de componentes;
- alterações grandes sem plano;
- quebra de header/footer;
- uso inconsistente de container;
- CSS espalhado sem necessidade;
- decisões contraditórias entre páginas.

---

## Como usar

Antes de pedir qualquer implementação para uma IA, anexar ou referenciar:

1. `global-rules.md`
2. `visual-rules.md`
3. `code-rules.md`
4. o prompt específico dentro de `prompts/`
5. a documentação de apoio da área afetada:
   - `layout/`
   - `frontend/`
   - `design-system/`
   - `pages/`

---

## Diferença entre rules e prompts

### Rules

Arquivos de regra são permanentes.

Eles dizem o que a IA sempre deve obedecer.

Exemplos:

- não alterar header/footer sem pedido explícito;
- usar container 1280px;
- usar Tailwind-first;
- evitar azul/roxo como linguagem principal;
- preservar páginas aprovadas.

### Prompts

Prompts são comandos reutilizáveis para tarefas específicas.

Exemplos:

- criar seção;
- redesenhar seção;
- migrar para Tailwind;
- revisar layout;
- corrigir responsivo;
- criar feature JS;
- criar animação GSAP.

---

## Estrutura

```txt
/docs/ai-rules/
  README.md
  global-rules.md
  visual-rules.md
  code-rules.md
  prompt-patterns.md
  review-checklist.md
  prompts/
    create-section.md
    redesign-section.md
    implement-html.md
    migrate-tailwind.md
    review-layout.md
    fix-responsive.md
    create-feature-js.md
    create-gsap-animation.md
```

---

## Regra de ouro

Toda IA deve trabalhar em etapas pequenas:

1. entender o contexto;
2. auditar antes de alterar;
3. propor plano;
4. executar com escopo limitado;
5. validar visualmente;
6. registrar o que foi alterado.

Nunca fazer grandes refatorações silenciosas.
