import type { ReactNode } from "react";
import type { Study } from "../lib/registry";

type Props = {
  meta: Study;
  line: ReactNode;
  demo: ReactNode;
  notes: string[];
  source: ReactNode;
  footer: { a11y: string; reducedMotion: string; budgetMs: number };
};

const LABEL = "font-mono text-[11px] uppercase tracking-[0.24em] text-chalk-faint sm:text-xs";

/* The anatomy contract. Every study renders these seven slots in this
   order; the suite asserts it, so a page can't quietly rearrange. */
export function StudyShell({ meta, line, demo, notes, source, footer }: Props) {
  const number = String(meta.number).padStart(2, "0");
  const interactive = meta.status === "interactive";

  return (
    /* Prose holds a reading measure; drawings and demos take the floor. */
    <article className="pt-14">
      <header
        data-shell-slot="eyebrow"
        className="flex max-w-3xl items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-chalk-faint sm:text-xs"
      >
        <span>{meta.date}</span>
        <span aria-hidden="true">·</span>
        <span>Study {number}</span>
        <span
          data-status-dot
          data-status={meta.status}
          className={`inline-block size-2 rounded-full ${
            interactive ? "bg-magenta" : "bg-batten"
          }`}
        >
          <span className="sr-only">
            {interactive ? "Interactive study" : "Drawn study"}
          </span>
        </span>
      </header>

      <h1 data-shell-slot="thesis" className="thesis mt-5 max-w-3xl text-2xl text-chalk sm:text-4xl">
        {meta.thesis}
      </h1>

      <div data-shell-slot="line" className="mt-10 max-w-4xl">
        {line}
      </div>

      <div data-shell-slot="demo" className="mt-10 max-w-5xl">
        {demo}
      </div>

      <section data-shell-slot="notes" aria-label="Why it feels right" className="mt-12 max-w-3xl">
        <h2 className={LABEL}>Why it feels right</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-chalk-soft sm:text-base">
          {notes.map((note) => (
            <li key={note} className="border-l-2 border-batten pl-4">
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section data-shell-slot="source" aria-label="Source" className="mt-12 max-w-4xl">
        <h2 className={LABEL}>Source</h2>
        <div className="mt-4">{source}</div>
      </section>

      <footer data-shell-slot="footer" className="mt-12 max-w-4xl border-t border-batten pt-5">
        <dl className="grid gap-4 font-mono text-[11px] sm:grid-cols-3 sm:text-xs">
          <div>
            <dt className="uppercase tracking-[0.2em] text-chalk-faint">Access</dt>
            <dd className="mt-1 leading-relaxed text-chalk-soft">{footer.a11y}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.2em] text-chalk-faint">Reduced motion</dt>
            <dd className="mt-1 leading-relaxed text-chalk-soft">{footer.reducedMotion}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.2em] text-chalk-faint">Budget</dt>
            <dd className="mt-1 text-chalk-soft">{footer.budgetMs} ms</dd>
          </div>
        </dl>
      </footer>
    </article>
  );
}
