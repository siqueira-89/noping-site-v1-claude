# Border Scale — NoPing

## Objetivo

Padronizar bordas translúcidas, estados de hover e linhas internas.

Na NoPing, bordas são quase sempre sutis. Elas ajudam a separar camadas sem parecer uma grade rígida.

## Tokens oficiais

| Token | Valor | Uso |
|---|---|---|
| `--np-border` | `rgba(255,255,255,0.06)` | borda padrão |
| `--np-border-strong` | `rgba(255,255,255,0.15)` | card/input importante |
| `--np-border-hover` | `rgba(255,255,255,0.40)` | hover/focus |
| `--np-border-primary` | `#93FF18` | ativo/selecionado |
| `--np-border-primary-soft` | `rgba(147,255,24,0.18)` | destaque sutil |

## Espessura

| Uso | Espessura |
|---|---:|
| padrão | `1px` |
| ativo/selecionado | `1px` |
| divisores internos | `1px` |
| foco acessível | `2px` |

## Regras

### Card padrão

```css
border: 1px solid var(--np-border);
```

### Card hover

```css
border-color: var(--np-border-hover);
```

### Card ativo

```css
border-color: var(--np-border-primary-soft);
```

### Focus acessível

```css
outline: 2px solid var(--np-border-primary);
outline-offset: 2px;
```

## O que evitar

- divisórias brancas rígidas;
- bordas muito visíveis em todas as superfícies;
- múltiplas bordas verdes competindo;
- borda 2px em todos os cards;
- separar seções com linhas horizontais fortes.
