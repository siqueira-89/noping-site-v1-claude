# AI Review Checklist — NoPing

## Objetivo

Checklist para revisar qualquer entrega feita por IA, Antigravity, Claude ou dev.

---

## 1. Escopo

- [ ] Alterou apenas o que foi pedido?
- [ ] Não mexeu em páginas aprovadas sem necessidade?
- [ ] Não alterou header/footer sem pedido explícito?
- [ ] Não criou arquivos extras sem justificar?

---

## 2. Layout

- [ ] Container usa 1280px (ou `max-w-np-container`)?
- [ ] Padding lateral usa 32px (desktop) / 20px (mobile)?
- [ ] Textos, botões, cards e grids respeitam container?
- [ ] Backgrounds e efeitos podem ser full-width sem quebrar alinhamento?
- [ ] Header + Section respeitam 100svh quando aplicável?
- [ ] Usa `min-height: calc(100svh - var(--np-header-height))`, não `height: 100vh` fixo?
- [ ] Não introduziu `100vh` novo no HTML/CSS?
- [ ] Footer funciona por regra estrutural (body flex-col / main flex-1 / footer flex-shrink-0)?
- [ ] Não copiou `max-w-[1360px]` para página nova?

---

## 3. Visual

- [ ] Parece NoPing?
- [ ] Usa verde `#93FF18` com intenção?
- [ ] Não usa azul/roxo como linguagem principal?
- [ ] Tem respiro suficiente?
- [ ] Cards têm glow/borda sutil?
- [ ] Ícones seguem estilo consistente?

---

## 4. Tailwind/CSS

- [ ] Tailwind foi usado quando fazia sentido?
- [ ] CSS tradicional ficou restrito a exceções?
- [ ] Não criou CSS duplicado?
- [ ] Não removeu CSS legado antes de validar?
- [ ] CSS extra foi para `src/styles/overrides.css` (não `complementary.css` — nome antigo)?
- [ ] Usou o esquema de tokens **atual** (`np-xs..np-3xl`, `np-card/elev`) e não o esquema proposto em `tailwind-token-mapping.md` (que é meta futura)?

---

## 5. Componentes

- [ ] Header/footer continuam globais?
- [ ] Não duplicou FAQ, carrossel ou helpers?
- [ ] Elementos reutilizáveis foram tratados como componentes/features?
- [ ] JS novo é realmente necessário?

---

## 6. Responsivo

- [ ] Desktop ok?
- [ ] Tablet ok?
- [ ] Mobile ok?
- [ ] Não existe corte de texto importante?
- [ ] CTAs continuam acessíveis?

---

## 7. Segurança visual

- [ ] Screenshot before foi salvo quando aplicável?
- [ ] Screenshot after foi salvo quando aplicável?
- [ ] Diferenças visuais foram revisadas?
- [ ] Console sem erro?

---

## 8. Documentação

- [ ] Alguma regra nova precisa ir para `/docs`?
- [ ] Alguma decisão nova precisa ir para `decisions.md`?
- [ ] Alguma feature reutilizável precisa ir para `features.md`?
- [ ] A documentação foi consultada **antes** da implementação (ordem: `ai-rules/` → `layout/` → `tokens/` → `frontend/` → `design-system/` → `pages/` → `decisions/`)?
- [ ] Para escopos grandes, um plano foi proposto antes de implementar?
