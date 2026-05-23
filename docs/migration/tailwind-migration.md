# Tailwind Migration

## Objetivo
Registrar a estratégia de migração progressiva do CSS tradicional para Tailwind.

## Estratégia
- sem build step
- Tailwind via CDN
- preflight desabilitado
- migração progressiva
- validação visual por página

## Regras
1. converter layout, spacing, tipografia e estrutura para Tailwind
2. preservar exceções em CSS complementar
3. não quebrar header/footer
4. não mexer em animações complexas sem necessidade
5. não migrar a home complexa sem estratégia específica

## Exceções clássicas
- three.js
- globe
- particles
- mapas
- keyframes complexos
- transformações 3D
- carrosséis dependentes de CSS específico

## Arquivo complementar
Manter um arquivo complementar para tudo que o Tailwind não cobre de forma elegante.

## Processo recomendado
1. screenshot before
2. migração
3. screenshot after
4. validação
5. só depois remover CSS legado

## Regra de segurança
Não apagar CSS antigo antes da validação completa da página.
