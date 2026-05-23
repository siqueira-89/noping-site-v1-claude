# Icon System — NoPing

## Objetivo

Padronizar tamanhos, estilo, stroke e uso de ícones.

## Estilo oficial

- SVG inline ou em `src/assets/icons/`
- estilo monoline
- `stroke-width: 2px`
- `currentColor` como padrão
- cantos arredondados quando possível
- biblioteca preferida: Lucide

## Escala oficial

| Token | Valor | Uso |
|---|---:|---|
| `--np-icon-xs` | `12px` | micro labels, social icons |
| `--np-icon-sm` | `14px` | badges, chips |
| `--np-icon-md` | `16px` | botões, links |
| `--np-icon-lg` | `20px` | listas, cards menores |
| `--np-icon-xl` | `24px` | cards padrão |
| `--np-icon-2xl` | `32px` | feature cards |
| `--np-icon-3xl` | `48px` | hero support cards |
| `--np-icon-display` | `64px` | blocos decorativos raros |

## Regras por componente

### Button icon

```css
width: 16px;
height: 16px;
```

### Badge icon

```css
width: 12px;
height: 12px;
```

### Card icon

```css
width: 20px;
height: 20px;
```

### Feature icon

```css
width: 24px;
height: 24px;
```

## Cores

Ícones devem herdar cor:

```svg
stroke="currentColor"
```

Assim o estado ativo pode ser controlado por CSS/Tailwind.

## O que evitar

- misturar bibliotecas de ícones diferentes;
- usar ícones filled quando o sistema pede monoline;
- usar emoji como ícone;
- ícones com muitas linhas finas;
- ícones coloridos sem motivo;
- imagens raster para ícones simples.
