# Loft (craft) — operating contract

Operating contract for AI work in this repo; the global `~/AGENTS.md` still applies. Work here follows the CONVERGE cycle and delivery discipline in `FLEET.md` (windwardline/windwardline) — find → refute → verify yourself → fix → re-rank → test → update → report; enumerate the gates rather than counting them, stage explicit paths, validate before mutating, preserve standing claims, derive populations rather than curating them, and never let a harness failure read as the subject refusing. `FLEET.md` governs where it and this summary differ. Loft is a public log of runnable React interaction studies — each one a drawn motion curve, a live demo, argued notes, and source. Live at craft.windwardline.com.

## Stack — do not substitute without flagging

Next.js 16.3.0 and React 19.2.8, both exact pins. Tailwind v4 via `@theme` in `src/app/globals.css`. motion, shiki, vitest + vitest-axe. Node 24.

## Commands

`npm run dev` · `npm test` · `npm run lint` · `npm run typecheck` · `npm run build`

Typecheck needs route types first: run `npx next typegen` (or a build) before `tsc --noEmit`.

## Gates — CI in order

`ci.yml` runs the gate sequence in order on pull requests to main and pushes to main, as one `verify` job on Node 24: `npm ci` → `npx next typegen` → `tsc --noEmit` → lint → vitest → build. Push to main deploys production. A parallel `security.yml` (PRs, pushes, weekly cron; a daily cron runs only the production headers probe) gates Semgrep, secret scan, and dependency scan; a post-deploy job asserts the production security headers. An advisory Claude review runs on every same-repo PR via `claude-review.yml`, which deliberately calls the fleet reusable at `@main` — one merge updates every repo. It activates only when the `CLAUDE_CODE_OAUTH_TOKEN` secret is present — reviews bill the owner's Claude subscription, not Console credits; fork PRs never receive secrets, so they skip it by security design. `dependabot-auto-merge.yml` merges nothing itself: on a Dependabot PR raised from a branch of this repo it arms GitHub's native auto-merge (`gh pr merge --squash --auto`), so the branch ruleset stays the only thing that decides whether a merge happens — and it asserts that gate rather than assuming it, holding for a human when the repo allows auto-merge without any required status check, since arming there would merge immediately. It also holds — withdrawing an auto-merge armed on an earlier push, not merely declining to renew it — when the `no-automerge` label is set, when the release changed maintainers, on pre-1.0 packages whose bump carries no compatibility contract, on unverifiable Dependabot metadata, and on majors, which it labels `deferred-major` for the deferred-majors issue before holding. The credential upgrades itself: it mints a GitHub App token when `FLEET_AUTOMERGE_APP_ID` and `FLEET_AUTOMERGE_PRIVATE_KEY` are present as Dependabot secrets (Actions secrets are unreadable from a Dependabot-triggered run and resolve to empty), and degrades to `GITHUB_TOKEN` when they are absent — a push attributed to `GITHUB_TOKEN` creates no workflow run at all, so an auto-merged commit on the fallback path never fires `security.yml`'s post-push `Headers live` probe; the run summary names which credential was used. The job carries no `name:` so the check renders exactly `dependabot-auto-merge`, the string the fleet conformance audit excludes — it must never become a required check. The file is byte-identical in every fleet repo that takes it; fix it in the fleet, not here.

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
