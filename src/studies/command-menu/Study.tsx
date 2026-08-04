import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LoftedLine } from "../../components/LoftedLine";
import { SourcePane } from "../../components/SourcePane";
import { StudyShell } from "../../components/StudyShell";
import type { Study } from "../../lib/registry";
import { CommandMenu } from "./CommandMenu";
import { line } from "./line";

const ITEMS = [
  { id: "lamp", label: "Toggle the lamp" },
  { id: "chart", label: "Open the chart" },
  { id: "colophon", label: "Go to the colophon" },
  { id: "study-02", label: "Open study 02" },
  { id: "soundings", label: "Search the soundings" },
];

/* The source pane shows the real island, read from disk at build time —
   what renders is what ships. */
const source = readFileSync(
  join(process.cwd(), "src/studies/command-menu/CommandMenu.tsx"),
  "utf8",
);

export function CommandMenuStudy({ meta }: { meta: Study }) {
  return (
    <StudyShell
      meta={meta}
      line={<LoftedLine {...line} />}
      demo={<CommandMenu items={ITEMS} />}
      notes={[
        "Prefix beats word-start beats fuzzy, and ties keep author order — ranking you can predict is ranking you can trust.",
        "120 milliseconds is the slowest entry that still reads as instant; anything faster is imperceptible, anything slower is a pause. The constant is exported and pinned by the suite.",
        "Dismissal gets no animation. When someone closes a menu their intent is already elsewhere; an exit transition performs for nobody.",
        "The input is the focus trap. Tab goes nowhere because there is nowhere else to go — the list is virtual, driven by arrows, announced by aria-activedescendant.",
      ]}
      source={<SourcePane code={source} />}
      footer={{
        a11y: "Combobox with virtual listbox; focus held in the input; arrows wrap; Escape returns focus to the trigger; selection announced via a polite live region.",
        reducedMotion: "The panel appears and dismisses instantly; nothing else changes.",
        budgetMs: 120,
      }}
    />
  );
}
