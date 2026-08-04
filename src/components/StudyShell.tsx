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

const LABEL = "font-mono text-xs uppercase tracking-[0.24em] text-chalk-faint";

/* The anatomy contract. Every study renders these seven slots in this
   order; the suite asserts it, so a page can't quietly rearrange. */
export function StudyShell({ meta, line, demo, notes, source, footer }: Props) {
  const number = String(meta.number).padStart(2, "0");
  const interactive = meta.status === "interactive";

  return (
    <article className="max-w-3xl pt-14">
      <header
        data-shell-slot="eyebrow"
        className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.24em] text-chalk-faint"
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

      <h1 data-shell-slot="thesis" className="thesis mt-5 text-3xl text-chalk sm:text-4xl">
        {meta.thesis}
      </h1>

      <div data-shell-slot="line" className="mt-10">
        {line}
      </div>

      <div data-shell-slot="demo" className="mt-10">
        {demo}
      </div>

      <section data-shell-slot="notes" aria-label="Why it feels right" className="mt-12">
        <h2 className={LABEL}>Why it feels right</h2>
        <ul className="mt-4 space-y-3 leading-relaxed text-chalk-soft">
          {notes.map((note) => (
            <li key={note} className="border-l-2 border-batten pl-4">
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section data-shell-slot="source" aria-label="Source" className="mt-12">
        <h2 className={LABEL}>Source</h2>
        <div className="mt-4">{source}</div>
      </section>

      <footer data-shell-slot="footer" className="mt-12 border-t border-batten pt-5">
        <dl className="grid gap-4 font-mono text-xs sm:grid-cols-3">
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
