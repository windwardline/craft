import { readFileSync } from "node:fs";
import { join } from "node:path";
import { LoftedLine } from "../../components/LoftedLine";
import { SourcePane } from "../../components/SourcePane";
import { StudyShell } from "../../components/StudyShell";
import type { Study } from "../../lib/registry";
import { DrawerToast } from "./DrawerToast";
import { line } from "./line";

/* The argued core of this study is the constants and the queue rule —
   so that is the source on display. */
const source = [
  readFileSync(join(process.cwd(), "src/studies/drawer-toast/springs.ts"), "utf8"),
  readFileSync(join(process.cwd(), "src/studies/drawer-toast/queue.ts"), "utf8"),
].join("\n");

export function DrawerToastStudy({ meta }: { meta: Study }) {
  return (
    <StudyShell
      meta={meta}
      line={<LoftedLine {...line} />}
      demo={<DrawerToast />}
      notes={[
        "The drawer is stiffer and better damped than the toast. Furniture settles with authority; news may carry one visible degree of bounce. Both springs are stated as constants and pinned by the suite.",
        "While the drawer is open the background is inert — unreachable by pointer, keyboard, and screen reader. A scrim without inert is theater: it dims the page and leaves every trap in it armed.",
        "The destructive confirm mounts with no motion at all. Danger should not bounce; a spring on a delete reads as charm, and charm is the wrong voice for consequence.",
        "Toasts cap at three, first in first out. News that has queued behind three newer items is no longer news — a stack that grows without limit is a log wearing a toast's clothes.",
      ]}
      source={<SourcePane code={source} lang="ts" />}
      footer={{
        a11y: "Drawer is a focused dialog; Escape returns focus to its trigger; the background carries the inert attribute while open; each toast is a status output announcing itself.",
        reducedMotion: "Drawer and toasts appear in place; the confirm is unchanged — it never moved.",
        budgetMs: 300,
      }}
    />
  );
}
