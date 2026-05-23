# Glow Scale — NoPing

## Objetivo

Padronizar o uso do brilho neon da NoPing.

O glow é parte essencial da identidade, mas deve ser controlado. O verde é precioso justamente porque aparece com intenção.

## Escala oficial

| Token | Valor sugerido | Uso |
|---|---|---|
| `--np-glow-xs` | `0 0 8px rgba(147,255,24,0.18)` | ícones e detalhes |
| `--np-glow-sm` | `0 0 16px rgba(147,255,24,0.22)` | hover sutil |
| `--np-glow-md` | `0 0 32px rgba(147,255,24,0.28)` | cards ativos |
| `--np-glow-lg` | `0 0 64px rgba(147,255,24,0.32)` | hero, CTA principal |
| `--np-glow-xl` | `0 0 120px rgba(147,255,24,0.18)` | atmosfera/background |

## Regras de uso

### Usar glow em

- CTA primário;
- estado ativo;
- borda de card selecionado;
- pontos de status;
- hero visual;
- partículas e efeitos atmosféricos.

### Não usar glow em

- todo texto;
- todo card;
- parágrafos;
- footer inteiro;
- blocos de conteúdo longos;
- ícones pequenos em excesso.

## Intensidade por contexto

| Contexto | Intensidade |
|---|---|
| Ícone em card | `xs` |
| Botão hover | `sm` |
| Card destacado | `md` |
| Hero CTA | `lg` |
| Fundo atmosférico | `xl`, com opacidade baixa |

## Regra de equilíbrio

Em uma mesma seção, escolher no máximo:

- 1 elemento com glow forte;
- 2–3 elementos com glow médio;
- detalhes restantes com glow sutil.

## O que evitar

- neon em tudo;
- glow verde competindo com textos;
- glow forte em cards lado a lado;
- aura verde sem hierarquia;
- misturar glow verde com azul/roxo forte como linguagem principal.
