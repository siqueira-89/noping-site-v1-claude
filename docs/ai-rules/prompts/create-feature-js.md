# Prompt — Create Feature JS

## Objetivo

Criar uma feature JavaScript reutilizável para o site NoPing.

## Template

```txt
Objetivo:
Criar uma feature JS chamada [nome-da-feature] para [comportamento].

Contexto:
Features reutilizáveis devem viver em estrutura compartilhada e não duplicar lógica entre páginas.

Arquivos envolvidos:
- src/scripts/features/[nome].js
- docs/frontend/features.md
- docs/design-system/animations.md

O que deve ser feito:
- criar função de inicialização clara
- aceitar seletor ou elemento raiz
- evitar vazar escopo para outras seções
- permitir configuração básica por data attributes ou objeto config
- não depender de markup frágil sem documentar

Padrão esperado:
- init seguro
- validação de existência do elemento
- sem erro se elemento não existir
- comentários apenas em partes importantes

O que não deve ser feito:
- não duplicar feature existente
- não criar dependência desnecessária
- não alterar componentes globais
- não poluir window sem necessidade
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
