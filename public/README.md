# /public

Assets centralizados para futura exportação/build do projeto NoPing.

Os arquivos aqui são **cópias** dos assets em `/src/assets/*`.
A pasta `/src` permanece intacta — os imports atuais no código continuam
funcionando normalmente. Esta pasta serve como ponto de partida para a
migração futura para um pipeline de build (Vite, Next.js, etc.) onde
`/public` é a raiz pública servida estaticamente.

## Estrutura

```
public/
├── fonts/
│   └── BaiJamjuree/            ← família principal (TTF, todos os pesos)
├── logos/                      ← logos NoPing, Claro, NoPing+Claro
├── icons/                      ← ícones de UI (download, mobile, install…)
│   └── social/                 ← ícones sociais + certificados + lojas
├── images/
│   ├── home/                   ← tutorial steps (web + mobile)
│   ├── games/                  ← capa de jogos (cards + catálogo)
│   ├── affiliates/             ← embaixadores, cards, medalhas, hero
│   └── download/               ← hero da página download
└── assets/
    └── shared/footer/          ← certificados + botões de loja + sociais
```

## Mapeamento src → public

| Origem (`/src/assets/...`)            | Destino (`/public/...`)        |
| ------------------------------------- | ------------------------------ |
| `fonts/BaiJamjuree/`                  | `fonts/BaiJamjuree/`           |
| `logos/`                              | `logos/`                       |
| `icons/`                              | `icons/`                       |
| `shared/footer/`                      | `icons/social/` *e* `assets/shared/footer/` |
| `home/`                               | `images/home/`                 |
| `games/`                              | `images/games/`                |
| `affiliates/`                         | `images/affiliates/`           |
| `download/`                           | `images/download/`             |

## Notas de migração (futura)

- Não substituir os caminhos no HTML/CSS/JS ainda.
- Quando for migrar para um build estático, basta apontar os imports
  para `/public/...` (ou apenas `/...` se a raiz pública for `/public`).
- Os arquivos `.gitkeep` de `src/assets/prices/` e `src/assets/support/`
  não foram copiados (pastas vazias).
