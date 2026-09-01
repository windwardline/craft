# Loft (craft) — operating contract

Operating contract for AI work in this repo; the global `~/AGENTS.md` still applies. Work here follows the CONVERGE cycle and delivery discipline in `FLEET.md` (windwardline/windwardline) — find → refute → verify yourself → fix → re-rank → test → update → report; enumerate the gates rather than counting them, stage explicit paths, validate before mutating, preserve standing claims, derive populations rather than curating them, and never let a harness failure read as the subject refusing. `FLEET.md` governs where it and this summary differ. Loft is a public log of runnable React interaction studies — each one a drawn motion curve, a live demo, argued notes, and source. Live at craft.windwardline.com.

## Stack — do not substitute without flagging

Next.js 16.3.0 and React 19.2.8, both exact pins. Tailwind v4 via `@theme` in `src/app/globals.css`. motion, shiki, vitest + vitest-axe. Node 24.

## Commands

`npm run dev` · `npm test` · `npm run lint` · `npm run typecheck` · `npm run build`

Typecheck needs route types first: run `npx next typegen` (or a build) before `tsc --noEmit`.

## Gates — CI in order

`ci.yml` runs the gate sequence in order on pull requests to main and pushes to main, as one `verify` job on Node 24: `npm ci` → `npx next typegen` → `tsc --noEmit` → lint → vitest → build. Push to main deploys production. `security.yml` runs Semgrep, Secret scan, and Dependency scan on PRs, pushes, and the weekly cron, plus Headers live after pushes and on both crons. The daily cron runs Headers live only; Dependency scan retains its weekly schedule guard under the fleet hold. The required `Secret scan` check also executes the pinned `verify-action-pins` step, so a mutable third-party `uses:` ref or a SHA/tag-comment mismatch blocks under `Secret scan`.

`claude-review.yml` runs an advisory review on every eligible same-repo PR event when `github.event.pull_request.user.login` (the stable pull-request author across reruns) is not `dependabot[bot]` and the base equals the repository's dynamic default branch. It deliberately calls the fleet reusable at `@main`, so one merge updates every repo. The review activates only with `CLAUDE_CODE_OAUTH_TOKEN`; fork and missing-secret events skip. Reviews bill the owner's Claude subscription, not Console credits.

`dependabot-auto-merge.yml` is byte-identical fleet-wide. It merges nothing itself; on a same-repo Dependabot PR it arms GitHub's native auto-merge, leaving the branch ruleset as the merge gate. It holds for a human when the repo has no required merge check or auto-merge is off, when `no-automerge` is set, when a release changed maintainers, on a 0.x minor or 0.0.x patch, when Dependabot metadata is empty or unverifiable, when the update type is unrecognised, and on a major bump. The empty-or-unverifiable metadata hold and the unrecognised-update-type hold are distinct. A merge-gate hold can occur before the lane reaches deferred-major labeling. Every hold withdraws any auto-merge armed earlier.

Dependabot groups npm production dependencies as `production-dependencies`, npm development dependencies as `development-dependencies`, and GitHub Actions as `github-actions`. `fetch-metadata` reports the highest semver change across the entire grouped PR; one held member holds the group, and arm/hold is per grouped PR rather than per dependency. The lane mints a GitHub App token when `FLEET_AUTOMERGE_APP_ID` and `FLEET_AUTOMERGE_PRIVATE_KEY` are present as Dependabot secrets. Actions secrets are unreadable in a Dependabot-triggered run; absent Dependabot secrets degrade to `GITHUB_TOKEN`, whose merge creates no push workflow. The run summary names the credential used. The job carries no `name:`, so the check renders exactly `dependabot-auto-merge`; it must never become a required check. Fix the canonical file in the fleet, not here.

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

## Declared gates

The machine-readable gate set. `scripts/fleet-conformance.sh` requires this block
and the workspace done-gate hook runs every `gate:` line before a session may
finish, so what runs is what is written here rather than what a hook guessed from
`package.json`. Each key states its own boundary: `gate:` runs at session end and
must be local and quick; `release:` runs before a pull request and may be slow;
`cadence:` is scheduled or needs the live machine and is run by neither.

```fleet-gates
gate: npx next typegen
gate: npm run typecheck
gate: npm run lint
gate: npm test
gate: npm run build
```
