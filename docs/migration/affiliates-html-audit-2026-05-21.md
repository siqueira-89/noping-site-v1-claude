# Affiliates HTML Audit — 2026-05-21

## Objetivo

Registrar os principais pontos encontrados no HTML atual da página `/affiliates/`.

Este arquivo é uma auditoria documental. Não representa autorização para alterar código automaticamente.

## Fonte analisada

Arquivo recebido:

```text
index.html
```

## Achados principais

| Item | Quantidade/estado | Observação |
|---|---:|---|
| `max-w-[1360px]` | 5 ocorrências | legado visual; migrar para `max-w-np-container` após validação |
| `min-h-screen` | 4 ocorrências | revisar contra regra `Header + Section = 100svh` |
| `pt-header` | 1 ocorrência | confirma relação com header fixo |
| `.grid-bg` | 1 ocorrência | confirma background full-width fora do container |
| `overrides.css` | presente | confirma uso de CSS complementar |
| Header global | presente | `<header id="global-header">` |
| Footer global | presente | `<footer id="global-footer">` |
| Tailwind CDN | presente | Tailwind ativo sem build step |

## Estrutura de seções

### Section 1 — Header + Hero

- header global;
- hero ambassadors;
- canvas de partículas;
- carrossel de cards;
- viewport controlado por classes Tailwind e valores específicos.

### Section 2 — Tutorial

- passo a passo;
- showcase visual;
- grid de 4 cards;
- usa estilos inline em alguns textos.

### Section 3 — Rank

- cards de níveis;
- benefícios para parceiros;
- usa cores secundárias em tiers.

### Section 4 — FAQ

- FAQ com accordion;
- fundo preto sólido;
- CTA para suporte.

## Riscos atuais

### 1. Container legacy

O projeto já decidiu padronizar container em `1280px`, mas esta página ainda usa `1360px`.

Risco:
- desalinhamento com páginas novas;
- IA copiar `1360px` para outras páginas;
- inconsistência entre docs e implementação.

Regra:
- tratar `1360px` como legado temporário;
- novas páginas devem usar `1280px`.

### 2. Sections com `min-h-screen`

O uso de `min-h-screen` precisa ser comparado com a regra atual:

```text
Header + Section = 100svh
```

Risco:
- header ser contado duas vezes;
- footer ser empurrado indevidamente;
- páginas curtas ficarem desalinhadas.

### 3. Inline styles

Existem estilos inline em títulos, descrições e labels.

Risco:
- valores fora dos tokens;
- dificuldade de manutenção;
- inconsistência entre páginas.

Regra:
- não remover sem screenshot before/after;
- migrar gradualmente para tokens/Tailwind.

## Ações recomendadas

### Curto prazo

1. Não alterar a página `/affiliates/` sem necessidade.
2. Usar esta página como referência visual.
3. Não copiar `max-w-[1360px]` para novas páginas.
4. Usar `max-w-np-container` em novas implementações.
5. Manter header/footer globais.

### Médio prazo

1. Criar screenshot before.
2. Trocar containers para `1280px` em uma branch/etapa isolada.
3. Validar se cards, hero e carrossel continuam corretos.
4. Trocar estilos inline por tokens onde for seguro.
5. Atualizar documentação se houver exceção visual justificada.

## Critério de aceite para futura migração

- visual permanece aprovado;
- header/footer não mudam;
- hero não quebra;
- carousel continua funcional;
- nenhuma section corta conteúdo;
- footer permanece em fluxo correto;
- container final usa `1280px`;
- screenshots before/after registrados.
