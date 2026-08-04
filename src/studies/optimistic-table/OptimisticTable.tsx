"use client";

import { useEffect, useReducer, useRef } from "react";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import { optimisticReducer, type RowState } from "./reducer";

const CREW = ["Ada", "Grace", "Katherine", "Margaret", "Radia", "Annie"];

const SEED_ROWS: Omit<RowState, "committed">[] = [
  { id: "r1", label: "Berth 12 survey", owner: "Ada" },
  { id: "r2", label: "Hull lines fairing", owner: "Grace" },
  { id: "r3", label: "Batten inventory", owner: "Katherine" },
  { id: "r4", label: "Chalk order, Q3", owner: "Margaret" },
  { id: "r5", label: "Floor regrid, aft bay", owner: "Radia" },
  { id: "r6", label: "Offsets book audit", owner: "Annie" },
];

/* Deterministic simulated server: a tiny LCG seeded per mount, so a
   demo (and a test) can pin whether the next answer settles or rejects.
   Roughly one edit in five comes back rejected. */
function makeServer(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state * 48271) % 2147483647;
    return state % 5 !== 1;
  };
}

export function OptimisticTable({
  seed = 7,
  latencyMs = 900,
}: {
  seed?: number;
  latencyMs?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const server = useRef(makeServer(seed));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [rows, dispatch] = useReducer(
    optimisticReducer,
    SEED_ROWS.map((row) => ({ ...row, committed: row.owner })),
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function reassign(row: RowState) {
    const next =
      CREW[(CREW.indexOf(row.owner) + 1 + CREW.length) % CREW.length];
    dispatch({ type: "edit", id: row.id, owner: next });
    const accepts = server.current();
    timers.current.push(
      setTimeout(
        () => dispatch({ type: accepts ? "settle" : "reject", id: row.id }),
        latencyMs,
      ),
    );
  }

  return (
    /* Wide content scrolls in its own container; the page never does.
       `relative` keeps absolute descendants (sr-only text) inside that
       containment — without it they escape to the page as phantom width. */
    <div className="relative overflow-x-auto rounded-sm border border-batten bg-floor-raised">
      <table className="w-full min-w-[560px] text-[13px] sm:text-sm">
        <caption className="sr-only">
          Work items and owners; reassigning an owner applies instantly and
          settles or returns when the server answers.
        </caption>
        <thead>
          <tr className="border-b border-batten text-left font-mono text-[11px] uppercase tracking-[0.2em] text-chalk-faint sm:text-xs">
            <th scope="col" className="px-4 py-3 font-medium">Item</th>
            <th scope="col" className="px-4 py-3 font-medium">Owner</th>
            <th scope="col" className="px-4 py-3 font-medium">State</th>
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              data-rejected={row.rejected ? "true" : undefined}
              className={`border-b border-batten/50 last:border-b-0 ${
                row.rejected && !reduced ? "animate-returned" : ""
              }`}
            >
              <th scope="row" className="px-4 py-3 text-left font-normal text-chalk-soft">
                {row.label}
              </th>
              <td className="px-4 py-3 text-chalk">{row.owner}</td>
              <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] sm:text-xs">
                {row.pending ? (
                  <span className="text-magenta">Pending</span>
                ) : row.rejected ? (
                  <span className="text-buff">Returned</span>
                ) : (
                  <span className="text-chalk-faint">Held</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  disabled={row.pending}
                  onClick={() => reassign(row)}
                  className="rounded-sm border border-batten px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-soft transition-colors hover:border-chalk-faint hover:text-chalk disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
                >
                  Reassign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p aria-live="polite" className="sr-only">
        {rows.some((r) => r.pending)
          ? "An edit is pending."
          : rows.some((r) => r.rejected)
            ? "An edit was returned; the committed owner is restored."
            : "All rows held."}
      </p>
    </div>
  );
}
