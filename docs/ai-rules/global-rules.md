# AI Global Rules — NoPing

## Objetivo

Regras globais para qualquer IA ou agente trabalhando no site da NoPing.

---

## Regras obrigatórias

### 1. Consultar documentação antes de agir

Antes de alterar qualquer arquivo, consultar:

1. `docs/ai-rules/`
2. `docs/layout/`
3. `docs/frontend/`
4. `docs/design-system/`
5. `docs/pages/`
6. `docs/decisions/`

---

### 2. Não alterar header/footer sem pedido explícito

Header e footer são componentes globais.

Não alterar:

- `src/components/header.js`
- `src/components/footer.js`
- `src/styles/components/header.css`
- `src/styles/components/footer.css`

A menos que o pedido cite claramente header ou footer.

---

### 3. Não recriar componentes globais

Não criar versões locais de:

- header;
- footer;
- FAQ global;
- carrossel compartilhado;
- helpers de botões;
- features já existentes.

Primeiro verificar se já existe componente reutilizável.

---

### 4. Tailwind-first

Usar Tailwind sempre que possível para:

- layout;
- flex/grid;
- espaçamento;
- container;
- tipografia;
- cores simples;
- bordas;
- radius;
- responsividade.

CSS tradicional apenas para exceções documentadas.

---

### 5. Container único

Usar sempre:

```txt
1280px
```

Não usar:

```txt
1350px
1360px
max-width aleatório
```

Qualquer exceção precisa ser documentada.

**Gutters (padding lateral) padrão:**

- desktop: `32px`
- mobile: `20px`

`1360px` continua presente em código legado (`--np-container-max`, `--page-max`, Tailwind config, `home-v2/tokens.css`). Tratar como **legado temporário** — ver D-014 em `decisions/decisions.md`. **Não copiar `max-w-[1360px]`** para páginas novas; usar `max-w-np-container` (que será ajustado para 1280 quando o token for migrado).

---

### 6. Sections

Regra principal:

```txt
Header + Section = 100svh
```

Fórmula canônica:

```css
min-height: calc(100svh - var(--np-header-height));
```

Usar `min-height`, não `height` fixo.

`100vh` em código existente é tratado como legado até a migração por página (ver D-009 atualizado).

---

### 7. Preservar páginas aprovadas

Não modificar páginas aprovadas ou complexas sem necessidade.

Evitar alterações sem escopo em:

- `/affiliates/`
- `/games/`
- home com animações complexas.

---

### 8. Não fazer refatoração invisível

Se a tarefa é visual, não reorganizar arquitetura.

Se a tarefa é documentação, não alterar código.

Se a tarefa é uma seção, não alterar outras seções.

---

### 9. Screenshot antes/depois

Para mudanças visuais ou migração:

1. gerar screenshot antes;
2. implementar;
3. gerar screenshot depois;
4. comparar visualmente;
5. só depois remover CSS legado.

---

### 10. Registrar mudanças relevantes

Quando uma regra estrutural mudar, atualizar:

- `docs/decisions/decisions.md`
- arquivo específico da área afetada.

---

## Não fazer

- Não apagar CSS antigo antes de validar.
- Não duplicar JS.
- Não criar novas cores protagonistas.
- Não misturar regras globais dentro de `pages.md`.
- Não criar workaround por página para resolver problema global.
- Não adicionar bibliotecas sem necessidade.
- Não alterar assets originais sem pedido.
- Não trocar `1360px` por `1280px` em páginas aprovadas sem auditoria visual + snapshot antes/depois.
- Não introduzir `100vh` em HTML/CSS novo — usar `100svh` com a fórmula `calc(100svh - var(--np-header-height))`.
- Não gerar plano improvisado para alterar layout, container, header ou footer — sempre **propor plano antes** quando o escopo for grande.
- Não recriar `header`, `footer`, `FAQ`, `carousel` ou `buttons` helpers globais por página.
