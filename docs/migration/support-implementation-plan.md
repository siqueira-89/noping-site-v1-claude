# Support Implementation Plan

## Objetivo

Planejar a implementação segura da nova página/seção de suporte da NoPing sem quebrar layout global, header, footer ou páginas aprovadas.

---

## Contexto

A página `/support/` está em construção/evolução e deve ser usada como primeiro teste seguro para aplicar:

- container 1280px;
- regra de sections;
- footer estrutural;
- Tailwind-first;
- visual consistente com NoPing;
- layout mais limpo e objetivo.

---

## Escopo

Implementar ou ajustar apenas a página:

```txt
/support/
```

Não alterar:

- `/affiliates/`
- `/games/`
- `/download/`
- home
- header global
- footer global
- componentes compartilhados, salvo necessidade explícita

---

## Layout aprovado

A seção de suporte deve conter somente as informações aprovadas:

### Headline

```txt
Como podemos ajudá-lo?
```

Com `ajudá-lo?` destacado em verde.

### Tópicos

Label:

```txt
Tópicos
```

Accordion com 5 itens:

```txt
CONTA
ASSOCIAÇÃO
RESOLVER PROBLEMAS
FUNCIONALIDADE
DICIONÁRIO
```

Cada tópico deve ter:

- ícone diferente;
- card escuro;
- borda/glow verde sutil;
- sinal de `+` à direita.

### Cards de contato

Dois cards lado a lado no desktop:

#### Card 1

```txt
Converse conosco
Encontre soluções e compartilhe ideias em nossa comunidade do Discord!
BATE-PAPO ABERTO
```

#### Card 2

```txt
Abra um ticket
Entre em contato com nossos especialistas se tiver dúvidas ou precisar de ajuda.
CRIAR UM TICKET
```

---

## O que remover/evitar

Não incluir:

- sistema de busca;
- lista de artigos;
- FAQ strip extra;
- categorias extras;
- cards não solicitados;
- excesso de informação;
- roxo/azul como linguagem principal.

Pode usar somente preto, carvão, branco e verde NoPing como base.

---

## Regras visuais

Seguir:

- `docs/brand/brand-guidelines.md`
- `docs/design-system/design.md`
- `docs/layout/container.md`
- `docs/layout/sections.md`
- `docs/layout/grid.md`
- `docs/ai-rules/visual-rules.md`

---

## Regras técnicas

Seguir:

- Tailwind-first;
- CSS apenas para exceções;
- header/footer globais;
- container 1280px;
- `min-height`, não `height`;
- footer por estrutura global.

---

## Estrutura recomendada

```html
<body class="min-h-[100svh] flex flex-col support-page" data-page="support">
  <header id="global-header" data-active="support"></header>

  <main class="flex-1">
    <section class="support-hero min-h-[calc(100svh_-_var(--np-header-height))] flex items-center">
      <div class="layout-container">
        ...
      </div>
    </section>
  </main>

  <footer id="global-footer"></footer>
</body>
```

---

## Classes sugeridas

### Container

```html
<div class="max-w-[1280px] mx-auto px-6">
```

### Section

```html
<section class="min-h-[calc(100svh_-_var(--np-header-height))] flex items-center py-24">
```

### Grid dos cards

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

### Accordion

```html
<div class="space-y-3">
```

---

## Processo seguro

### Etapa 1 — Screenshot antes

Salvar:

```txt
00/migration/support-before.png
```

### Etapa 2 — Auditar

Verificar:

- HTML atual;
- CSS atual;
- uso de 100vh;
- header;
- footer;
- container;
- Tailwind.

### Etapa 3 — Implementar

Alterar somente:

- seção principal da `/support/`;
- CSS/Tailwind necessário para ela.

### Etapa 4 — Validar

Verificar:

- desktop;
- tablet;
- mobile;
- header;
- footer;
- console;
- altura da dobra;
- alinhamento do container.

### Etapa 5 — Screenshot depois

Salvar:

```txt
00/migration/support-after.png
```

### Etapa 6 — Comparar

Não remover CSS antigo até validar.

---

## Critérios de aceite

- [ ] Header não foi alterado.
- [ ] Footer não foi alterado.
- [ ] Footer não sobrepõe conteúdo.
- [ ] A seção usa container 1280px.
- [ ] Não existe search bar.
- [ ] Existem apenas os 5 tópicos aprovados.
- [ ] Existem apenas os 2 cards de contato aprovados.
- [ ] Cada tópico usa ícone diferente.
- [ ] A seção segue visual NoPing.
- [ ] Não há azul/roxo como linguagem principal.
- [ ] Funciona em desktop, tablet e mobile.
- [ ] Screenshot before/after foi salvo.

---

## Próxima etapa após aprovação

Depois que `/support/` estiver aprovado:

1. documentar qualquer ajuste necessário;
2. aplicar regra estrutural em `/prices/`;
3. revisar se o mesmo padrão deve virar componente reutilizável.
