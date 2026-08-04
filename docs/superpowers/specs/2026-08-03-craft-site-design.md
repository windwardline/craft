# craft.windwardline.com — design spec (Gate 1)
**Michael Peacock · Windward Line · 2026-08-03 · Status: awaiting Gate 1 approval — no code until then**

## 1 · The job

One surface that proves, in public, the thing the YC role hires for: interaction craft in real React/TypeScript, argued rather than asserted. It houses the dated log of runnable interaction studies (the "craft log" convention every elite design-engineer portfolio shares), later the essays, and it is itself the React 19 + Tailwind v4 + Motion proof the vanilla portfolio deliberately can't be. Audience: the YC software team, HN, recruiters who click one level past the resume. Register: Vercel/Linear restraint — working demos, no spectacle.

## 2 · The concept: the mold loft

The portfolio is the finished chart — cream paper, plotted course, soundings. This site is **where the lines get drawn**: in shipbuilding, the mold loft is the room where hull lines are laid down at full size on a dark floor in chalk before anything is built. That is exactly what an interaction study is — lofting the motion curve before the component ships.

So the site inverts the portfolio: **chalk on the loft floor** instead of ink on paper. Dark-first by design (the portfolio's own night palette, extended), with every motion curve literally drawn as a chalked line before it runs.

Name treatment: the site is simply **Loft — Windward Line** at craft.windwardline.com.

## 3 · Directions considered

**A — Chart Sheet Continuation (rejected).** Extend the cream portfolio look directly. Rejected because it duplicates the portfolio's register instead of complementing it, cream-serif-accent is the most templated look on the current web (it reads as default even when it isn't), and interactive admin-UI demos fight a warm paper ground.

**B — Neutral Lab (rejected).** The shadcn-docs look: near-white, hairline borders, system sans. Instantly legible to engineers and instantly forgettable — zero identity, and for a *design*-engineer application, a templated frame is self-defeating.

**C — The Mold Loft (recommended).** Same token contract as the fleet, night-side first, workshop vernacular. Distinct from the portfolio yet unmistakably the same house; subject-true (the loft is a real place with real conventions); and the dark ground makes demos, code panes, and the magenta "running" state read beautifully.

## 4 · Visual system

**Palette** (ported from the family contract into Tailwind v4 `@theme`; loft-specific names, family values):
| Token | Hex | Role |
|---|---|---|
| `--floor` | `#0A141C` | the loft floor (family night paper) |
| `--floor-raised` | `#0F1D28` | panels, code panes |
| `--chalk` | `#DCE8EE` | primary ink — the chalk line |
| `--chalk-soft` | `#93A9B6` | secondary text |
| `--chalk-faint` | `#71889A` | captions, dates, soundings |
| `--batten` | `#2E4150` | hairlines, rules (the flexible strips that hold a lofted curve) |
| `--magenta` | `#FF5C9E` | reserved: the running state — a demo that is live, a line being drawn |
| `--buff` | `#C9BB8E` | rare warm accent for "shipped to production" marks |

Light mode exists ("tracing-paper" — the portfolio's day tokens) via the family lamp, but **night is the design**; the lamp defaults to system.

**Type** — the family's three roles, reweighted for a workshop: **IBM Plex Mono** leads (labels, dates, nav, study titles — instrument voice), **Public Sans** for prose, **Fraunces italic** used once per page at most (the study's one-line thesis — the only serif on the floor). This inverts the portfolio's serif-forward voice without leaving the family.

**The signature: the lofted line.** Every study opens with its motion curve drawn as a chalked SVG line on the floor grid — the drawer's spring path, the toast's arc, the ⌘K scale curve — with mono annotations like a real lofting (offsets, duration marks). The line draws itself once on entry (Motion pathLength), then the live demo sits beside it. It is the thesis of the whole site made visible: **loft the line, then run it.** It is also the reduced-motion fallback — with motion off, the line appears complete and static, and the demo renders end-states with instant transitions; the page loses nothing it needs.

**Motion philosophy.** Springs with stated constants, one orchestrated entry per page, zero ambient decoration. Every study's notes must include one "when not to animate" observation — argued restraint is the differentiator the research kept surfacing.

## 5 · Structure

```
/                 The floor — dated study index (newest first), one line + thumbnail lofted line each
/study/[slug]     One study: lofted line · live demo · notes · source
/writing          Reserved (essays land Week 2–3); hidden from nav until first essay
/colophon         How this site enforces its own taste: tokens, tests, budgets — the machinery page
```

**Study page anatomy (the contract, every study identical):**
1. Mono eyebrow: date · study number · status (magenta dot = interactive)
2. Fraunces italic thesis line (one sentence: what this interaction believes)
3. The lofted line (signature block)
4. The live demo — isolated client island, keyboard-first, focus-visible
5. "Why it feels right" — 3–5 argued notes (constants chosen, alternatives rejected)
6. Source pane — the actual component code, syntax-lit on `--floor-raised`
7. Footer strip: a11y notes · reduced-motion behavior · interaction budget (ms)

## 6 · First three studies

1. **Command menu (⌘K)** — scale+fade entry tuned against Raycast/Linear reference feel; focus trapping, typeahead, and the argument for 120ms.
2. **Dense table with optimistic updates** — the internal-tools centerpiece: row edit → instant optimistic state → server settle/rollback, motion only where state changes meaning.
3. **Drawer & toast physics** — spring constants side-by-side with the lofted curves; includes the "when not to animate" case (destructive confirms get no spring).

## 7 · Machinery

- **Stack:** Next.js (App Router) · React 19 · TypeScript · Tailwind v4 `@theme` · Motion. Repo `windwardline/craft`, public.
- **The two-stack proof:** the family token contract ported to `@theme` — same names, same values, second implementation. This is itself case-study material ("one design language, two stacks").
- **CI gates (the machinery signature, from day one):** typecheck · lint · Vitest with **ported designTokens + contrast tests** (every chalk-on-floor pair AA in both modes) · axe · Lighthouse CI budgets (100/100/100/100 on `/`; every study ≥ 95 perf).
- **Deploy:** Vercel → craft.windwardline.com, family vercel.json headers, auto-merge ruleset per house rules.
- **Registry decision (needs your call at Gate 1):** I propose Loft is registry-exempt like the portfolio and apex (it's a personal craft surface, not a product) — but the portfolio links it prominently (the chart's "Instruments" section gains a "the loft" line) and both READMEs update in the same change set.

## 8 · Out of scope

Foundry (its own spec + Figma-first pass, Week 2). Essay content. Any change to the vanilla portfolio beyond the single link. Case studies remain portfolio "sheets" (separate WS1 item, separate approvals).

## 9 · Gate 1 — what approval covers

The concept (mold loft, dark-first), palette/type as specced, the lofted-line signature, the four routes, the study contract, the first three studies, repo `craft` + registry exemption. Direction-level redlines welcome: swap a study, rename the site, reject the inversion, tighten anything.
