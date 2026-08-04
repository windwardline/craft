import Link from "next/link";
import { studies } from "../lib/registry";

export default function Floor() {
  return (
    <section className="max-w-3xl pt-16">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-chalk-faint">
        The floor
      </p>
      <h1 className="thesis mt-6 text-4xl text-chalk sm:text-5xl">
        Interaction studies, lofted before they run.
      </h1>
      <p className="mt-8 max-w-xl leading-relaxed text-chalk-soft">
        In a shipyard, the mold loft is the dark floor where hull lines are
        drawn at full size in chalk before anything is built. This is that
        floor for interfaces: every study starts as a drawn motion curve, then
        runs live beside its own reasoning, source, and budget.
      </p>

      {studies.length === 0 ? (
        <p className="mt-12 font-mono text-xs uppercase tracking-[0.22em] text-chalk-faint">
          Study 01 is on the bench — the index takes its place here.
        </p>
      ) : (
        <ol className="mt-14">
          {[...studies].reverse().map((study) => (
            <li key={study.slug} className="border-t border-batten">
              <Link
                href={`/study/${study.slug}`}
                className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.22em] text-chalk-faint">
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
                  <span className="block font-mono text-sm uppercase tracking-[0.18em] text-chalk transition-colors group-hover:text-magenta">
                    {study.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-chalk-soft">
                    {study.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
