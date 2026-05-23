# Prompt — Integrar feature de animação em página real

Use este prompt depois que a animação isolada estiver aprovada.

```txt
Integre a feature de animação na página [rota].

Feature:
- JS: src/scripts/features/[nome].js
- CSS: src/styles/features/[nome].css, se existir
- Dependências: [GSAP / Three.js / nenhuma]

Página alvo:
[rota da página]

Regras:
- Não reescrever a feature.
- Não alterar header/footer.
- Não alterar visual aprovado além do mínimo necessário.
- Não alterar páginas sensíveis sem autorização.
- Adicionar apenas os data-attributes necessários.
- Carregar dependências antes da feature.
- Carregar CSS da feature, se existir.
- Manter Tailwind-first.
- Manter Header + Section = 100svh.
- Manter container 1280px, exceto se a página estiver documentada como legado temporário.
- Não remover CSS antigo sem validação.
- Não alterar ordem de scripts globais sem justificar.

Validação obrigatória:
1. screenshot before
2. alteração mínima
3. screenshot after
4. verificar desktop
5. verificar responsivo
6. verificar header
7. verificar footer
8. verificar console errors
9. documentar arquivos alterados

Entrega:
Criar relatório em /docs/migration/[nome]-integration-report-[data].md com:
- arquivos alterados
- data-attributes adicionados
- dependências carregadas
- riscos
- screenshots before/after
- pendências
```
