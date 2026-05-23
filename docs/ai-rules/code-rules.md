# AI Code Rules — NoPing

## Objetivo

Definir regras obrigatórias para qualquer agente de IA que altere código, crie features ou implemente animações no site NoPing.

---

## Regra absoluta

Antes de alterar código, consultar `/docs`.

Nunca improvisar arquitetura, layout, container, header, footer, tokens ou animações sem validar as regras documentadas.

---

## Arquivos protegidos

Não alterar sem pedido explícito:

- `src/components/header.js`
- `src/components/footer.js`
- `src/components/faq.js`
- `src/components/carousel.js`
- `src/components/buttons.js`
- `src/styles/components/header.css`
- `src/styles/components/footer.css`
- scripts de particles
- scripts de canvas
- scripts de Three.js
- scripts GSAP aprovados
- keyframes complexos
- páginas visualmente aprovadas
- `/affiliates`
- `/games`
- `/download`
- home principal

---

## Regra de implementação

Toda alteração deve ser mínima e localizada.

Não refatorar se a tarefa é ajustar.

Não recriar se já existe componente.

Não substituir lógica aprovada sem motivo.

---

## Tailwind-first

Usar Tailwind para:

- layout;
- spacing;
- responsividade;
- container;
- grid simples;
- cards simples;
- botões;
- cores;
- radius;
- bordas;
- tipografia utilitária.

Não usar Tailwind para forçar efeitos visuais complexos.

---

## CSS

Usar CSS apenas para:

- keyframes;
- pseudo-elements;
- backgrounds complexos;
- masks;
- scanlines;
- grid background;
- glow avançado;
- wrappers de Canvas/Three.js;
- estilos de feature que Tailwind não resolve bem;
- componentes globais existentes;
- exceções documentadas.

Não criar CSS local desnecessário.

---

## GSAP

Usar GSAP para:

- entrada de textos;
- stagger de cards;
- parallax de camadas;
- transições de hero;
- timelines;
- animações de CTA;
- scroll controlado;
- coreografias premium.

Regras:

- GSAP deve viver em arquivo de feature sempre que possível;
- usar `data-attributes` como contrato;
- não depender de classes visuais frágeis;
- verificar se `gsap` existe antes de executar;
- respeitar `prefers-reduced-motion`;
- não usar GSAP para hover simples ou layout.

---

## Three.js / Canvas

Usar para:

- globe;
- partículas 3D;
- rotas 3D;
- mapas;
- campos de pontos;
- experiências gráficas avançadas.

Regras:

- sempre usar wrapper;
- sempre adaptar ao tamanho do container;
- usar `ResizeObserver`;
- pausar/simplificar quando necessário;
- não renderizar fora da área definida;
- não cobrir header/footer.

---

## `overrides.css`

O arquivo canônico de CSS complementar (exceções fora do Tailwind) chama-se **`src/styles/overrides.css`**.

Referências antigas a `complementary.css` em documentação ou prompts devem ser lidas como `overrides.css` (ver D-013 em `decisions/decisions.md`).

`overrides.css` é para exceções globais compartilhadas.

Não colocar todo efeito novo nele.

Se a animação for específica, criar CSS específico:

```txt
src/styles/features/nome-da-feature.css
```

---

## Dependências de feature

Todo JS de feature deve declarar no topo:

```js
/**
 * Feature:
 * Depends on:
 * Mount:
 * Used by:
 */
```

Se depender de CSS, declarar o arquivo CSS.

Se depender de GSAP, declarar GSAP.

Se depender de Three.js, declarar Three.js.

---

## Integração de feature

Ao integrar feature em uma página:

1. não reescrever a feature;
2. adicionar `data-attributes`;
3. carregar dependências;
4. carregar CSS, se existir;
5. carregar JS;
6. validar screenshot before/after;
7. testar responsivo;
8. documentar arquivos alterados.

---

## Proibições

- não alterar header/footer sem pedido explícito;
- não duplicar JS;
- não criar nova versão de componente existente;
- não remover CSS legado sem validação;
- não alterar páginas sensíveis durante experimento;
- não trocar 1360 por 1280 em páginas aprovadas sem auditoria;
- não alterar ordem de scripts sem justificar;
- não mudar ids/classes usadas por JS sem verificar dependências;
- não aplicar GSAP diretamente em elementos globais fora do root da feature;
- não criar animação sem respeitar `prefers-reduced-motion`;
- não criar CSS local quando Tailwind resolve;
- não usar `100vh` em código novo — usar `100svh` com `calc(100svh - var(--np-header-height))`;
- não copiar `max-w-[1360px]` para páginas novas — usar `max-w-np-container`;
- não alterar `tailwind-config.js` para alinhar com `tailwind-token-mapping.md` sem antes migrar o HTML que depende do esquema atual.

---

## Diagnóstico antes de correção

Se algo quebrar, primeiro diagnosticar.

Não corrigir diretamente.

O diagnóstico deve apontar:

- o que quebrou;
- onde quebrou;
- arquivo responsável;
- regra violada;
- correção mínima recomendada;
- risco da correção.

---

## Regra final

O agente deve preservar o visual aprovado.

A implementação deve servir ao design system, não reinventá-lo.
