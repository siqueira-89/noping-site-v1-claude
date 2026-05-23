# Typography Scale — NoPing

## Objetivo

Padronizar tamanhos, pesos, line-height e tracking da tipografia do site.

## Famílias

### Principal

```css
--np-font-body: "Bai Jamjuree", sans-serif;
--np-font-display: "Bai Jamjuree", sans-serif;
```

### Mono auxiliar

```css
--np-font-mono: "JetBrains Mono", monospace;
```

JetBrains Mono deve ser usado apenas para:
- eyebrows técnicos;
- dados;
- labels pequenas;
- códigos;
- métricas.

## Escala operacional

| Token | Tamanho | Line-height | Peso | Uso |
|---|---:|---:|---:|---|
| `--np-text-2xs` | `10px` | `12px` | `600` | micro labels |
| `--np-text-xs` | `11px` | `14px` | `700` | eyebrow uppercase |
| `--np-text-sm` | `12.5px` | `18px` | `400` | descrições pequenas |
| `--np-text-base` | `14px` | `22px` | `400` | body compacto |
| `--np-text-md` | `16px` | `24px` | `400` | body padrão |
| `--np-text-lg` | `18px` | `28px` | `500` | destaque curto |
| `--np-title-sm` | `20px` | `26px` | `700` | card title |
| `--np-title-md` | `28px` | `36px` | `700` | section title compacto |
| `--np-title-lg` | `40px` | `48px` | `700` | section title |
| `--np-display-sm` | `48px` | `56px` | `700` | hero menor |
| `--np-display-md` | `56px` | `64px` | `700` | hero padrão |
| `--np-display-lg` | `72px` | `80px` | `700` | hero especial |

## Tracking

| Token | Valor | Uso |
|---|---:|---|
| `--np-tracking-tight` | `-0.02em` | headlines |
| `--np-tracking-normal` | `0` | body |
| `--np-tracking-wide` | `0.04em` | botões |
| `--np-tracking-wider` | `0.10em` | nav / badges |
| `--np-tracking-mega` | `0.18em` | eyebrows técnicos |

## Eyebrow padrão

```css
font-family: var(--np-font-mono);
font-size: 11px;
line-height: 14px;
font-weight: 700;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--np-primary);
```

## Headline padrão de section

```css
font-size: clamp(32px, 4vw, 56px);
line-height: 1.05;
font-weight: 700;
letter-spacing: -0.02em;
```

## Body padrão

```css
font-size: 16px;
line-height: 24px;
font-weight: 400;
color: var(--np-fg-2);
```

## Regras de uso

- Headlines usam peso 600/700.
- Body nunca deve ficar excessivamente pequeno em páginas principais.
- Textos longos devem priorizar legibilidade, não impacto visual.
- Uppercase deve ser reservado para UI curta: nav, CTA, badges, eyebrows.
- Não usar Outfit no projeto/site atual.

## O que evitar

- misturar muitas escalas na mesma seção;
- usar `font-size` inline sem necessidade;
- parágrafos com contraste baixo demais;
- tracking exagerado em textos longos;
- usar uppercase em parágrafos.
