# Prompt — Diagnosticar regressão de animação

Use este prompt se algo quebrar depois de integrar GSAP, Three.js, Canvas ou CSS de feature.

```txt
DIAGNÓSTICO DE REGRESSÃO — SEM ALTERAR CÓDIGO

Algo que estava funcionando visualmente/animação/layout quebrou após a última alteração.

Objetivo:
Identificar exatamente o que quebrou, qual arquivo causou a regressão e qual regra do projeto foi violada, sem aplicar correção ainda.

Regra absoluta:
Não alterar HTML, CSS, JS ou assets nesta etapa.

Tarefas:
1. Comparar o estado atual com o estado anterior/esperado.
2. Identificar qual seção, componente ou animação foi afetada.
3. Verificar se algum destes itens foi alterado:
   - classe usada por JS
   - id usado por JS
   - data-attribute
   - wrapper estrutural
   - ordem de scripts
   - CSS de animação
   - overflow
   - position
   - z-index
   - min-height / height
   - container
   - grid background
   - canvas
   - keyframes
4. Verificar se a alteração violou alguma regra em:
   - /docs/ai-rules/code-rules.md
   - /docs/ai-rules/visual-rules.md
   - /docs/frontend/features.md
   - /docs/frontend/animation-feature-architecture.md
   - /docs/frontend/feature-css-strategy.md
   - /docs/design-system/animations.md
   - /docs/frontend/tailwind.md
5. Informar:
   - arquivo afetado
   - alteração suspeita
   - regra violada
   - impacto visual
   - risco da correção
   - proposta de correção mínima

Proibições:
- Não refatorar.
- Não reescrever componente.
- Não recriar animação.
- Não trocar abordagem.
- Não alterar página sensível sem aprovação.

Entrega:
Gerar diagnóstico curto com:
1. O que quebrou
2. Por que quebrou
3. Onde quebrou
4. Correção mínima recomendada
5. Se a correção é segura ou precisa de aprovação
```
