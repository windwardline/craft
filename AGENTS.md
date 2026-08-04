# Loft (craft) — operating contract

Operating contract for AI work in this repo; the global `~/AGENTS.md` still applies. Loft is a public log of runnable React interaction studies — each one a drawn motion curve, a live demo, argued notes, and source. Live at craft.windwardline.com.

## Stack — do not substitute without flagging

Next.js 16.3.0 and React 19.2.8, both exact pins. Tailwind v4 via `@theme` in `src/app/globals.css`. motion, shiki, vitest + vitest-axe. Node 24.

## Commands

`npm run dev` · `npm test` · `npm run lint` · `npm run typecheck` · `npm run build`

Typecheck needs route types first: run `npx next typegen` (or a build) before `tsc --noEmit`.

## Gates — CI in order

`npm ci` → `npx next typegen` → `tsc --noEmit` → lint → vitest → build. Push to main deploys production. A parallel `security.yml` (PRs, pushes, weekly cron) gates Semgrep, secret scan, and dependency scan; a post-deploy job asserts the production security headers.

## Laws

- The approved spec and plan fix design decisions: `docs/superpowers/specs/2026-08-03-craft-site-design.md` and `docs/superpowers/plans/2026-08-03-loft-implementation-plan.md` — palette values, the fixed seven-slot study order, Fraunces italic at most once per page, `--magenta` reserved for running state, `--buff` for shipped marks only, no `!important`.
- The token contract is test-enforced: `src/lib/palette.ts` holds the exact hexes; `tests/designTokens.test.ts` matches them inside the `:root` and `[data-lamp="day"]` blocks of `globals.css`, and `tests/contrast.test.ts` re-derives WCAG AA for every token pairing (`buff` is the documented 3.0 large-text exception). Change a color in both files or the build goes red.
- `src/lib/registry.ts` is the only source for study pages, the index, and static params. New studies register there.
- Lighthouse budgets (100/100/100/100 on `/`, ≥95 per study) are specified in the plan but not yet wired into CI — `@lhci/cli` is installed, no lighthouserc exists. Check budgets manually until that lands.
- Security headers and font caching live in `vercel.json`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
