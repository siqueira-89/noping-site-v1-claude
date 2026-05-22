# Migração CSS → Tailwind (em andamento)

> Padronização do CSS do projeto usando Tailwind como base principal.
> Migração **progressiva**, sem refatoração e sem quebrar layout/animações.

---

## Decisões

| Tópico | Decisão |
|---|---|
| Setup | **Tailwind Play CDN** (sem build step) |
| Tokens | Estendidos no `tailwind.config` com prefixo `np-` (ex. `bg-np-primary`, `p-np-md`) |
| CSS complementar | Único arquivo `src/styles/complementary.css` para o que Tailwind não cobre |
| Preflight | **Desabilitado** (`corePlugins.preflight = false`) — projeto tem `reset.css` próprio |
| Breakpoints | Tailwind padrão (mobile-first: `sm/md/lg/xl`) |
| Aliases legacy | **Mantidos** (`--green`, `--color-primary`, `--bg-0`…) |
| Responsivo | Mobile-first do Tailwind |
| Verificação | Screenshot antes/depois por página |

---

## Exceções (NÃO converter)

- `src/scripts/home-v2/*.jsx` + `src/styles/home-v2/*.css` — app React da home
- `src/components/header.js` + `src/styles/components/header.css`
- `src/components/footer.js` + `src/styles/components/footer.css`
- `src/styles/global/*` — reset, tipografia, layout primitives, utilities (`.eyebrow`, `.glass`, `.chip`, `.grid-bg`)
- `src/styles/components/buttons.css`, `cards.css`, `forms.css` — base compartilhada
- Keyframes próprios do projeto

---

## Como migrar uma página (passo a passo)

1. **Screenshot antes** → `00/migration/<page>-before.png`
2. No `<head>` da página, adicionar **antes dos CSS globais**:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   <script src="../src/scripts/global/tailwind-config.js"></script>
   ```
3. Substituir o link `../src/styles/pages/<page>.css` por:
   ```html
   <link rel="stylesheet" href="../src/styles/complementary.css">
   ```
4. Converter classes inline na ordem:
   - Layout (`flex`, `grid`, `min-h-screen`, `pt-header`, …)
   - Espaçamentos (`p-np-md`, `gap-np-sm`, `mx-auto`, …)
   - Tipografia (`text-np-primary`, `font-np-mono`, `tracking-np-wider`, …)
   - Cor/borda/sombra (`bg-np-surface`, `border-np-border-strong`, `shadow-np-glow-lg`, …)
   - Responsividade (`md:grid-cols-2`, `sm:hidden`, …)
5. O que **não couber** em Tailwind → `complementary.css`
6. **Screenshot depois** → `00/migration/<page>-after.png`
7. Comparar visualmente. Se OK, apagar o `pages/<page>.css` antigo.

---

## Tokens disponíveis (resumo)

### Cores
```
bg-np-primary           text-np-primary           border-np-primary
bg-np-primary-dim       text-np-primary/25        bg-np-primary/[0.04]
bg-np-bg / bg-np-bg-2 / bg-np-bg-3
bg-np-surface / bg-np-surface-elev
text-np-fg-1 .. text-np-fg-4 (rgba whites)
text-np-fg-dim / text-np-fg-mute / text-np-fg-faint
border-np-border / border-np-border-strong / border-np-border-hover
text-np-cyan / text-np-purple / text-np-warning / text-np-danger / text-np-good
text-np-claro (Claro red — só dentro do logo)
```

### Tipografia
```
font-np-display    Bai Jamjuree
font-np-body       Bai Jamjuree
font-np-mono       JetBrains Mono
tracking-np-tight  -0.02em
tracking-np-wide    0.04em
tracking-np-wider   0.10em
tracking-np-mega    0.20em
leading-np-tight  / -snug / -normal / -loose
```

### Spacing (grid 8pt) — funciona em `p-`, `m-`, `gap-`, `w-`, `h-`, etc.
```
np-xs  8px     np-sm  16px    np-md  24px    np-lg  40px
np-xl  64px    np-2xl 96px    np-3xl 128px
header 72px    (altura do header global)
```

### Raio
```
rounded-np-sm    8px
rounded-np-md   12px
rounded-np-lg   16px
rounded-np-xl   24px
rounded-np-pill 9999px
```

### Sombras / glow
```
shadow-np-card
shadow-np-elev
shadow-np-glow-sm / -md / -lg
```

### Outros
```
max-w-np-container       (1360px)
backdrop-blur-np-glass   (16px)
duration-np-fast / -base / -slow
ease-np-ease
```

---

## Status

| Página | Status | Screenshot diff |
|---|---|---|
| `/precos` | ✅ Migrada | `00/migration/prices-{before,after}.png` |
| `/suporte` | ⏳ Próxima | |
| `/download` | ⏳ Aguardando | |
| `/claro` | ⏳ Aguardando | |
| `/` (home v2) | ❌ Exceção (React + animações) | |
| `/afiliados` | ❌ Fora de escopo (878 linhas CSS, referência visual) | |
| `/jogos` | ❌ Fora de escopo (carousel complexo) | |
