import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LoftedLine } from "../../components/LoftedLine";
import { SourcePane } from "../../components/SourcePane";
import { StudyShell } from "../../components/StudyShell";
import type { Study } from "../../lib/registry";
import { OptimisticTable } from "./OptimisticTable";
import { line } from "./line";

const source = readFileSync(
  join(process.cwd(), "src/studies/optimistic-table/reducer.ts"),
  "utf8",
);

export function OptimisticTableStudy({ meta }: { meta: Study }) {
  return (
    <StudyShell
      meta={meta}
      line={<LoftedLine {...line} />}
      demo={<OptimisticTable />}
      notes={[
        "The edit paints before the server answers because waiting to show someone their own action is a lie about who is in charge.",
        "Pending is a state, not an animation. The row says Pending in magenta — the running color — and nothing shimmers, because shimmer decorates uncertainty instead of naming it.",
        "Rejection restores the committed value and says Returned in buff. The flash happens once, on the state change, and never under reduced motion — motion only where meaning changes.",
        "The reducer is three transitions and owns every rule; the component just schedules the server's answer. Pure logic first is what makes the optimistic path testable at all.",
      ]}
      source={<SourcePane code={source} lang="ts" />}
      footer={{
        a11y: "A real table: column headers, row headers, a caption, and a polite live region narrating pending and returned states. Buttons disable while their row is in flight.",
        reducedMotion: "The returned flash is suppressed; state changes land instantly.",
        budgetMs: 0,
      }}
    />
  );
}
