# Loft (craft.windwardline.com) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline). Steps use checkbox syntax. This file moves to `craft/docs/superpowers/plans/` at T1 and lives there afterward.

**Goal:** Ship the approved mold-loft craft site — floor index, study contract, three interaction studies, colophon — live at craft.windwardline.com with the machinery gates green.

**Architecture:** Next.js App Router (RSC pages, client islands per demo). Family design tokens ported to Tailwind v4 `@theme` as a tested contract. Every study = registry entry + MDX-free TSX page composed from `StudyShell` + one demo island + one `LoftedLine`. Motion via `motion/react`; every animated behavior has a reduced-motion branch asserted in tests.

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 (`@theme`) · Motion · Vitest + Testing Library + vitest-axe · shiki (server-side source panes) · @lhci/cli.

## Global Constraints (from the approved spec — verbatim values)

- Palette tokens exactly: `--floor #0A141C · --floor-raised #0F1D28 · --chalk #DCE8EE · --chalk-soft #93A9B6 · --chalk-faint #71889A · --batten #2E4150 · --magenta #FF5C9E · --buff #C9BB8E`; light "tracing" mode = portfolio day tokens (`#FBF6EC` paper family); lamp defaults to system, night is primary.
- Type roles: IBM Plex Mono leads (labels/nav/titles); Public Sans prose; **Fraunces italic at most once per page** (the thesis line). All three self-hosted woff2, latin subsets.
- `--magenta` is **reserved**: running/live state only. `--buff`: "shipped" marks only.
- Signature: every study opens with its lofted-line SVG (path self-draws once on entry; static-complete under reduced motion).
- Study anatomy order is fixed: eyebrow → thesis → lofted line → demo → argued notes (3–5, incl. one when-not-to-animate) → source pane → footer strip (a11y · reduced-motion · budget ms).
- Routes: `/`, `/study/[slug]`, `/writing` (hidden until first essay), `/colophon`.
- CI gates: typecheck · lint · vitest (token contract + contrast AA both modes + axe) · build; Lighthouse budgets 100/100/100/100 on `/`, ≥95 perf per study (lhci wired at T7 when pages exist).
- Registry-exempt (approved): no Labs register row; portfolio gains one "loft" link + READMEs in the same change set (T8).
- House rules: branch → conventional commits → PR → `gh pr merge --squash --auto --delete-branch`; family vercel.json headers; fonts/assets self-hosted; no `!important` theming.

## File Structure

```
craft/
  src/app/layout.tsx            floor ground, grid, rules, wordmark, lamp mount
  src/app/page.tsx              the floor — dated study index from the registry
  src/app/study/[slug]/page.tsx StudyShell composition per registry entry
  src/app/colophon/page.tsx     machinery page (tokens, tests, budgets)
  src/app/globals.css           @theme tokens + lamp overrides + floor grid
  src/lib/registry.ts           Study type + ordered registry (single source)
  src/lib/lamp.ts               pre-paint theme script (family pattern)
  src/components/LoftedLine.tsx signature SVG (pathLength draw, RM static)
  src/components/StudyShell.tsx anatomy contract (slots, fixed order)
  src/components/SourcePane.tsx shiki-lit source block on --floor-raised
  src/studies/command-menu/     demo island + logic.ts + line.ts (curve data)
  src/studies/optimistic-table/ demo island + reducer.ts + line.ts
  src/studies/drawer-toast/     demo island + springs.ts + queue.ts + line.ts
  tests/designTokens.test.ts    token contract (names + exact hex, both modes)
  tests/contrast.test.ts        WCAG AA for every chalk-on-floor pair, both modes
  tests/loftedLine.test.tsx     draw + reduced-motion branches
  tests/studyShell.test.tsx     anatomy order + axe
  tests/commandMenu.test.tsx    filter/rank pure fns + focus trap + keys + axe
  tests/optimisticTable.test.ts reducer: apply/settle/rollback + component + axe
  tests/drawerToast.test.tsx    spring constants + queue reducer + inert + axe
  .github/workflows/ci.yml      gates above
  vercel.json                   family headers
  docs/superpowers/specs/…      spec (moved in)
  docs/superpowers/plans/…      this plan (moved in)
```

---

### Task 1: Scaffold + infra ✅-when: dev server renders empty floor, fonts local, CI stub green
- [ ] create-next-app (TS, App Router, Tailwind v4, src dir, npm) as `~/Projects/craft`; add `motion`, `shiki`; dev-deps `vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest-axe @lhci/cli`
- [ ] Vendor woff2 latin subsets (reuse the proper-form fetch pipeline): Fraunces ital 400 (opsz axis ok as static 400i + 600i optional), Public Sans 400/500/700, IBM Plex Mono 400/500 → `src/app/fonts/`; `@font-face` in globals
- [ ] `vercel.json` = family headers (CSP fully 'self', HSTS, XCTO, Referrer-Policy, XFO, Permissions-Policy, COOP)
- [ ] `.github/workflows/ci.yml`: typecheck, lint, vitest run, build (lhci job added T7)
- [ ] Move spec + this plan into `docs/superpowers/`; repo `git init -b main`; initial commit `feat: scaffold the loft`
- [ ] Verify: `npm run dev` renders; `npm run build` passes. Commit.

### Task 2: Token contract (test-first) + lamp + base layout
Interfaces → produces: CSS vars per Global Constraints; `lamp.ts` exports `LAMP_SNIPPET` (inline pre-paint script string) and `setLamp(mode: "day"|"night"|"system")`; layout slots `children`.
- [ ] Write `tests/designTokens.test.ts` RED: parses `globals.css`; asserts `@theme` block defines exact token names/hex above; asserts `[data-lamp="day"]` overrides define the tracing palette; asserts no `!important` anywhere in file
- [ ] Write `tests/contrast.test.ts` RED: WCAG ratio fn (local, no dep); every text token (chalk, chalk-soft, chalk-faint, magenta, buff) vs floor + floor-raised ≥ 4.5 (chalk-faint vs floor-raised ≥ 4.5; buff usage is ≥18px "shipped" marks → ≥3.0 documented exception, asserted at 3.0) — both modes
- [ ] Run both RED (no tokens yet)
- [ ] Implement `globals.css` `@theme` + day overrides + floor graticule background + focus-visible ring (magenta 2px) + `::selection` chalk-on-batten; adjust any hex only if a contrast assertion demands (record in colophon)
- [ ] `src/lib/lamp.ts` + layout.tsx: html[data-lamp], pre-paint script, mono nav (wordmark "LOFT · WINDWARD LINE" left, lamp right), top double-rule / bottom hairline per spec
- [ ] GREEN both tests; `npm run dev` visual check night + day; commit `feat: token contract, lamp, and the floor`

### Task 3: LoftedLine + StudyShell + floor index + colophon
Interfaces → produces: `LoftedLine({d, width, height, marks?: {x,y,label}[], title})` draws once 1200ms ease; RM: full path, no transition. `StudyShell({meta: Study, line: ReactNode, demo: ReactNode, notes: string[], source: string, footer: {a11y: string, reducedMotion: string, budgetMs: number}})` enforces anatomy order. `registry.ts` exports `Study = {slug, number, date, title, thesis, status: "interactive"|"drawn", summary}` + `studies: Study[]`.
- [ ] `tests/loftedLine.test.tsx` RED: renders path with `pathLength` animation attrs; with `matchMedia` mocked reduced → no animation props, full opacity path; marks render as mono labels
- [ ] Implement LoftedLine (motion/react `useReducedMotion`) → GREEN
- [ ] `tests/studyShell.test.tsx` RED: children appear in fixed anatomy order; eyebrow shows date/number/status dot (magenta only when interactive); exactly one `.thesis` (Fraunces italic class); axe clean
- [ ] Implement StudyShell + SourcePane (shiki `night-owl`-adjacent theme on floor-raised, server component) → GREEN
- [ ] Floor index page from registry (mono rows: number · date · title · one-liner · thumbnail line svg static); colophon page (tokens table read from the same source the tests read, gates list, budgets)
- [ ] Build + visual pass both modes; commit `feat: the study contract — lofted line, shell, floor, colophon`

### Task 4: Study 1 — command menu (⌘K)
Interfaces → produces: `commandFilter(query, items) : ranked` pure; `CommandMenu` island; `ENTRY_MS = 120` exported.
- [ ] `tests/commandMenu.test.tsx` RED: filter ranks prefix > word-start > fuzzy, stable tie-break; ⌘K opens / Esc closes / focus trapped / arrows wrap / Enter fires; `ENTRY_MS === 120`; RM: no scale animation; axe clean
- [ ] Implement logic.ts then island (motion scale 0.98→1 + fade at 120ms; overlay on floor-raised) → GREEN
- [ ] line.ts: entry curve path + marks ("0ms scale .98", "120ms settle"); registry entry; study page composed; notes (incl. why 120ms, and the when-not-to-animate note: no exit animation — dismissal is instant because intent is already gone)
- [ ] Build; commit `feat: study 01 — command menu`

### Task 5: Study 2 — dense table, optimistic updates
Interfaces → produces: `optimisticReducer(state, action)` pure (`edit`, `settle`, `reject` actions; pending Set; rollback restores prior value); `OptimisticTable` island (20-row fixture, inline edit, simulated 900ms server with 20% reject).
- [ ] `tests/optimisticTable.test.ts` RED: reducer — edit marks pending + applies value; settle clears pending; reject restores prior + flags row; component — edit shows instantly; reject row shows batten-flash + restored value; RM: no flash animation, state changes instant; axe clean
- [ ] Implement reducer → island → GREEN
- [ ] line.ts (edit→settle/reject fork curve), registry entry, page, notes (motion only where state changes meaning — pending shimmer no, reject flash yes)
- [ ] Build; commit `feat: study 02 — optimistic table`

### Task 6: Study 3 — drawer & toast physics
Interfaces → produces: `SPRINGS = {drawer: {stiffness: 380, damping: 34}, toast: {stiffness: 300, damping: 26}}`; `toastQueue` reducer (max 3 visible, FIFO collapse); `DrawerToast` island (open drawer; actions raise toasts; destructive confirm renders with NO spring — instant).
- [ ] `tests/drawerToast.test.tsx` RED: SPRINGS exact values; queue reducer caps at 3 + FIFO; drawer open sets `inert` on background + focus moves in, Esc returns focus; destructive confirm mounts with no motion props; RM: drawer/toast instant; axe clean
- [ ] Implement springs/queue → island → GREEN
- [ ] line.ts (two spring curves overlaid + the flat line labeled "destructive: no spring"), registry entry, page, notes
- [ ] Build; commit `feat: study 03 — drawer and toast physics`

### Task 7: Deploy + live verification + Lighthouse gate
- [ ] `gh repo create windwardline/craft --public --source=. --push`; description "Loft — interaction studies, lofted before they run"; homepage craft.windwardline.com
- [ ] `vercel link` → `vercel git connect` → `vercel domains add craft.windwardline.com` → `cf-dns` CNAME craft → cname.vercel-dns.com (DNS-only, house pattern)
- [ ] Add lhci job to ci.yml (`lhci autorun` vs `next start`; assertions: `/` cat ≥ 100/100/100/100 minus PWA n/a → use categories perf/a11y/bp/seo = 1.0 with tolerance 0.05 documented; studies ≥ .95 perf) — commit via PR, automerge
- [ ] Live verify: 200 + headers on craft.windwardline.com; lamp round-trip via computed styles; each study interactive headless (⌘K opens; table edit; drawer opens); screenshots night+day archived to scratchpad
- [ ] Commit any fixes; automerge; re-verify

### Task 8: Portfolio link + READMEs (registry-exempt change set)
- [ ] Portfolio `index.html` Instruments section gains one line linking craft.windwardline.com ("The loft — where the lines are drawn"), + portfolio README one-liner; craft README written (hero screenshot per fleet standard, live link top); same-change-set rule satisfied; PR portfolio (CI automerge) + push craft README
- [ ] Verify live portfolio link + craft README render

### Task 9: Sync
- [ ] Spec + plan status flips; pursuit memory (craft live, studies 1–3, next: resume v2/case studies); tasks board updated; report with URLs + screenshots
