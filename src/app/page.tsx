import Link from "next/link";
import { LineThumb } from "../components/LineThumb";
import { studies } from "../lib/registry";
import { line as commandMenuLine } from "../studies/command-menu/line";
import { line as drawerToastLine } from "../studies/drawer-toast/line";
import { line as optimisticTableLine } from "../studies/optimistic-table/line";

const THUMBS: Record<
  string,
  { d: string; ghostD?: string; width: number; height: number }
> = {
  "command-menu": commandMenuLine,
  "optimistic-table": optimisticTableLine,
  "drawer-toast": drawerToastLine,
};

export default function Floor() {
  return (
    <section className="pt-16">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-chalk-faint sm:text-xs">
          The floor
        </p>
        <h1 className="thesis mt-6 text-3xl text-chalk sm:text-5xl">
          Interaction studies, lofted before they run.
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-chalk-soft sm:text-base">
          In a shipyard, the mold loft is the dark floor where hull lines are
          drawn at full size in chalk before anything is built. This is that
          floor for interfaces: every study starts as a drawn motion curve,
          then runs live beside its own reasoning, source, and budget.
        </p>
      </div>

      {studies.length === 0 ? (
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-chalk-faint">
          Study 01 is on the bench — the index takes its place here.
        </p>
      ) : (
        <ol className="mt-14 max-w-5xl">
          {[...studies].reverse().map((study) => {
            const thumb = THUMBS[study.slug];
            return (
              <li key={study.slug} className="border-t border-batten">
                <Link
                  href={`/study/${study.slug}`}
                  className="group flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:gap-8 sm:py-6"
                >
                  <span className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-faint sm:text-xs">
                    <span>{String(study.number).padStart(2, "0")}</span>
                    <span>{study.date}</span>
                    <span
                      aria-hidden="true"
                      className={`inline-block size-2 rounded-full ${
                        study.status === "interactive" ? "bg-magenta" : "bg-batten"
                      }`}
                    />
                  </span>
                  <span className="flex-1">
                    <span className="block font-mono text-[13px] uppercase tracking-[0.18em] text-chalk transition-colors group-hover:text-magenta sm:text-sm">
                      {study.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-chalk-soft sm:text-sm">
                      {study.summary}
                    </span>
                  </span>
                  {thumb ? (
                    <span className="hidden self-center opacity-70 transition-opacity group-hover:opacity-100 lg:block">
                      <LineThumb {...thumb} />
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
