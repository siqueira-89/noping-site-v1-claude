# Checklist — Animações e Features

## Objetivo

Checklist para criar, validar e integrar animações GSAP, Three.js ou Canvas sem quebrar páginas aprovadas.

---

## Antes de criar

- [ ] A animação precisa mesmo existir?
- [ ] O objetivo visual está claro?
- [ ] A tecnologia escolhida está correta?
- [ ] Tailwind resolve?
- [ ] CSS resolve?
- [ ] GSAP é necessário?
- [ ] Three.js/Canvas é realmente necessário?
- [ ] Existe referência visual aprovada?
- [ ] Existe página alvo?

---

## Preview isolado

- [ ] Criado em `/preview`
- [ ] Não altera página real
- [ ] Usa container 1280px
- [ ] Simula header 72px ou usa header global
- [ ] Respeita Header + Section = 100svh
- [ ] Usa grid/glow com moderação
- [ ] Não usa roxo/azul como linguagem principal
- [ ] Funciona em desktop
- [ ] Funciona em responsivo básico

---

## JS da feature

- [ ] Criado em `src/scripts/features/`
- [ ] Tem comentário de dependências no topo
- [ ] Usa data-attributes
- [ ] Não depende de classe visual frágil
- [ ] Verifica se dependência existe
- [ ] Respeita `prefers-reduced-motion`
- [ ] Não altera elementos fora do root
- [ ] Não altera header/footer
- [ ] Não cria listeners globais sem necessidade

---

## CSS da feature

- [ ] Só existe se necessário
- [ ] Criado em `src/styles/features/`
- [ ] Não foi jogado desnecessariamente no `overrides.css`
- [ ] Não vaza para outras páginas
- [ ] Usa nomes específicos da feature
- [ ] Não sobrescreve componentes globais
- [ ] Não altera `.container`, `.header`, `.footer` ou classes globais

---

## Integração

- [ ] Screenshot before
- [ ] Data-attributes adicionados
- [ ] Dependência carregada
- [ ] CSS carregado, se existir
- [ ] JS carregado depois da dependência
- [ ] Header/footer preservados
- [ ] Container preservado
- [ ] Footer validado
- [ ] Console sem erros
- [ ] Screenshot after
- [ ] Relatório criado em `/docs/migration`

---

## Se quebrar

- [ ] Parar implementação
- [ ] Rodar diagnóstico de regressão
- [ ] Não corrigir diretamente
- [ ] Identificar regra violada
- [ ] Propor correção mínima
- [ ] Validar antes de aplicar

---

## Critério de aceite

A animação está aprovada quando:

- melhora o visual sem poluir;
- não quebra layout;
- não altera páginas sensíveis;
- não cria dependência frágil;
- respeita performance;
- respeita design system;
- possui preview;
- possui feature JS isolada;
- possui CSS isolado, se necessário;
- foi validada com screenshot.
