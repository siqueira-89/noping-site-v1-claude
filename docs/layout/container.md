# Container System

## Objetivo
Padronizar o alinhamento lateral de conteúdo em todas as páginas.

## Regra global
Todo conteúdo estrutural deve respeitar um container central com largura máxima de 1280px.

## Implementação padrão
### CSS
```css
.layout-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-left: 32px;
  padding-right: 32px;
}

@media (max-width: 640px) {
  .layout-container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
```

### Tailwind
```html
<div class="max-w-np-container mx-auto px-5 md:px-8">
```

> `px-8` = 32 px (desktop), `px-5` = 20 px (mobile). O alias `max-w-np-container` deve apontar para `1280px` no Tailwind config quando a migração de container for executada — hoje aponta para `1360px` (legado, ver D-014).

## O que respeita o container
- textos
- botões
- grids
- cards
- blocos de conteúdo
- títulos
- CTAs
- FAQ content
- rank sections
- tutorial content

## O que não respeita o container
- backgrounds
- grid background
- partículas
- canvas
- glow decorativo
- imagens ou efeitos full-width

## Regra de consistência
- usar sempre 1280px
- não usar 1360px, 1350px ou outros valores paralelos
- header e footer devem obedecer o mesmo alinhamento estrutural dos demais conteúdos

## Padding lateral (gutters)
- desktop: **32 px**
- mobile: **20 px**
- manter consistência entre páginas

> Valores aplicados via `--gutter` em `src/styles/global/variables.css`. Ver `decisions/decisions.md` D-012.

## Objetivo visual
O conteúdo deve parecer alinhado em todo o site, independentemente da página.
