# Animation Rules

## Objetivo

Padronizar animações do site NoPing para manter coerência visual, performance e previsibilidade.

---

## Filosofia

A NoPing deve parecer viva, mas não nervosa.

O movimento é controlado, elegante e funcional.

Animação existe para:

- dar sensação premium;
- guiar atenção;
- reforçar tecnologia;
- organizar entrada de conteúdo;
- melhorar percepção de fluidez.

Animação não deve competir com o conteúdo.

---

## Durações padrão

- `120ms` → respostas muito rápidas / estados simples;
- `250ms` → microinterações;
- `400ms` → transições e cross-fades;
- `600ms` a `900ms` → entrada de hero ou grupos;
- `2s` a `3s` → pulses persistentes de status ou glow.

---

## Easing padrão

Usar movimento suave e controlado.

Recomendado:

```txt
cubic-bezier(0.22, 0.61, 0.36, 1)
power2.out
power3.out
sine.inOut
```

Evitar:

- bounce;
- spring exagerado;
- overshoot agressivo;
- elastic;
- movimentos caricatos.

---

## Matriz de tecnologia

### Tailwind

Usar para:

- hover simples;
- transições simples;
- opacidade simples;
- scale leve;
- border/radius/color transition;
- layout e responsividade.

### CSS

Usar para:

- keyframes simples;
- glow em loop;
- pseudo-elements;
- scanlines;
- masks;
- grid background;
- background técnico.

### GSAP

Usar para:

- entrada de textos;
- stagger de cards;
- parallax de camadas;
- animação de CTAs;
- transições de hero;
- timelines;
- scroll controlado;
- coreografias premium.

### Three.js / Canvas

Usar para:

- globe;
- partículas 3D;
- campo de pontos;
- rotas 3D;
- mapas interativos;
- efeitos gráficos avançados.

---

## O que pode animar

- glow;
- opacidade;
- borda;
- indicadores;
- partículas sutis;
- carrosséis;
- estados de cards;
- transições de plataforma;
- gráficos internos;
- camadas visuais de hero;
- CTAs;
- textos de entrada;
- mockups e painéis.

---

## O que deve evitar

- bounce;
- spring exagerado;
- overshoot;
- movimentos gratuitos;
- parallax agressivo;
- escalas bruscas;
- animação em excesso em todas as seções;
- loop que distrai;
- qualquer coisa que pareça “template tech genérico”.

---

## Regra de hover

Hover padrão NoPing:

- brilho;
- contraste;
- borda com mais presença;
- halo sutil;
- mudança suave de background.

Evitar como regra geral:

- cards subindo com `translateY`;
- scale exagerado;
- glow forte demais;
- animação que desloca layout.

---

## Regra para cards

Cards não devem “pular”.

Interação de card deve ser por:

- border opacity;
- glow;
- background surface;
- contraste;
- icon color.

---

## Regra de loop

Sempre que uma animação for em loop:

- primeiro e último estado devem parecer compatíveis;
- evitar sensação de reinício quebrado;
- não competir com leitura;
- velocidade deve ser lenta;
- usar variação sutil.

---

## Performance

Animações complexas devem permanecer fora do Tailwind e viver em:

- CSS complementar;
- CSS de feature;
- Canvas;
- Three.js;
- JS específico;
- GSAP.

Sempre considerar:

- `transform` e `opacity` antes de propriedades caras;
- evitar animar layout;
- cuidado com `filter: blur()` muito pesado;
- reduzir efeitos em mobile, se necessário.

---

## Acessibilidade

Respeitar:

```css
@media (prefers-reduced-motion: reduce) {
  /* reduzir ou desativar animações */
}
```

Features GSAP, Canvas e Three.js devem verificar `prefers-reduced-motion` no JS.

---

## Exceções clássicas

- globe da home;
- mapa global;
- partículas;
- carrosséis com lógica própria;
- transformações 3D;
- keyframes específicos;
- hero com GSAP;
- Three.js / Canvas.

---

## Regra para novas animações premium

Toda animação premium deve seguir o fluxo:

```txt
1. Preview HTML isolado
2. Validação visual
3. JS de feature
4. CSS de feature, se necessário
5. Integração na página real
6. Screenshot before/after
```

---

## Regra final

Animação premium deve parecer intencional.

Se a animação não melhora percepção, hierarquia ou experiência, ela deve ser removida ou simplificada.
