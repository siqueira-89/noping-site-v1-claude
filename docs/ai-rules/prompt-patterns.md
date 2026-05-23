# Prompt Patterns — NoPing

## Objetivo

Padronizar como escrever prompts para IA trabalhar no site da NoPing com menos retrabalho.

---

## Estrutura padrão de prompt

Todo prompt importante deve conter:

```txt
Objetivo:
Contexto:
Arquivos envolvidos:
O que deve ser feito:
O que não deve ser feito:
Regras obrigatórias:
Critérios de aceite:
```

---

## Bloco de objetivo

Explicar em uma frase o resultado esperado.

Exemplo:

```txt
Objetivo:
Redesenhar a seção de suporte mantendo as informações atuais, sem adicionar sistema de busca.
```

---

## Bloco de contexto

Explicar de onde vem a referência.

Exemplo:

```txt
Contexto:
A página deve seguir o design system da NoPing, com fundo escuro, grid sutil, verde #93FF18 e cards dark.
```

---

## Arquivos envolvidos

Listar apenas os arquivos necessários.

Exemplo:

```txt
Arquivos envolvidos:
- support/index.html
- src/styles/pages/support.css
- docs/layout/sections.md
```

---

## O que deve ser feito

Ser direto.

Exemplo:

```txt
O que deve ser feito:
- manter header global
- manter footer global
- criar accordion de tópicos
- manter os dois cards de contato
```

---

## O que não deve ser feito

Esse bloco é essencial.

Exemplo:

```txt
O que não deve ser feito:
- não adicionar search bar
- não alterar header
- não usar azul/roxo como linguagem principal
- não alterar outras páginas
```

---

## Regras obrigatórias

Referenciar documentação.

Exemplo:

```txt
Regras obrigatórias:
- seguir docs/layout/container.md
- seguir docs/layout/sections.md
- seguir docs/frontend/tailwind.md
- seguir docs/ai-rules/visual-rules.md
```

---

## Critérios de aceite

Definir como saber que a tarefa terminou.

Exemplo:

```txt
Critérios de aceite:
- seção respeita container 1280px
- header/footer não foram alterados
- não há search bar
- accordion contém os 5 tópicos corretos
- layout funciona em desktop e mobile
```

---

## Regra prática

Prompts bons são específicos e limitados.

Evitar:

```txt
Melhore a página inteira.
```

Preferir:

```txt
Redesenhe apenas a seção de suporte, mantendo conteúdo atual, sem alterar header/footer, usando Tailwind-first e container 1280px.
```
