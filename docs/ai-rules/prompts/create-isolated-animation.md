# Prompt — Criar animação isolada

Use este prompt para criar uma animação GSAP, Three.js ou Canvas em preview isolado, sem alterar páginas reais.

```txt
Crie uma animação isolada para preview da NoPing.

Objetivo:
[descrever objetivo da animação]

Tipo de animação:
[GSAP / Three.js / Canvas]

Contexto visual:
- dark premium
- grid sutil
- verde #93FF18 como cor principal
- glow controlado
- sem roxo/azul como linguagem principal
- sem animações agressivas

Regras:
- Não alterar arquivos existentes.
- Criar apenas preview isolado.
- Usar Tailwind para layout.
- Usar CSS apenas para efeitos especiais.
- Usar JS de feature para animação.
- Usar data-attributes como contrato.
- Respeitar Header + Section = 100svh.
- Container 1280px.
- Respeitar prefers-reduced-motion.
- Não depender de tamanho fixo.
- Não alterar header/footer.

Entregas:
1. preview/[nome]-preview.html
2. src/scripts/features/[nome].js
3. src/styles/features/[nome].css, apenas se necessário

O JS deve declarar no topo:
- nome da feature
- dependências
- mount selector
- arquivos CSS necessários
- páginas previstas para uso

A animação deve funcionar isolada antes de qualquer integração.
```
