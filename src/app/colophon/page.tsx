import type { Metadata } from "next";
import { DAY, NIGHT } from "../../lib/palette";

export const metadata: Metadata = {
  title: "Colophon — Loft",
  description:
    "How this site enforces its own taste: the token contract, the contrast suite, and the budgets.",
};

const LABEL = "font-mono text-[11px] uppercase tracking-[0.24em] text-chalk-faint sm:text-xs";

export default function Colophon() {
  const tokens = Object.keys(NIGHT) as (keyof typeof NIGHT)[];

  return (
    <section className="max-w-4xl pt-16">
      <p className={LABEL}>Colophon</p>
      <h1 className="thesis mt-6 text-3xl text-chalk sm:text-4xl">
        Taste, enforced by machinery.
      </h1>
      <p className="mt-8 max-w-xl text-sm leading-relaxed text-chalk-soft sm:text-base">
        This page and the test suite read the same file. The palette below is
        imported from the module the contract tests import; if a value on this
        page ever disagrees with a value in CI, one of us is lying and the
        build is red.
      </p>

      <h2 className={`${LABEL} mt-14`}>The token contract</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-t border-batten font-mono text-[11px] sm:text-xs">
          <thead>
            <tr className="text-left uppercase tracking-[0.18em] text-chalk-faint">
              <th scope="col" className="py-3 pr-4 font-medium">Token</th>
              <th scope="col" className="py-3 pr-4 font-medium">Night</th>
              <th scope="col" className="py-3 pr-4 font-medium">Day</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((name) => (
              <tr key={name} className="border-t border-batten/60 text-chalk-soft">
                <th scope="row" className="py-3 pr-4 font-normal text-chalk">
                  --{name}
                </th>
                <td className="py-3 pr-4">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block size-3 rounded-[2px] border border-batten align-[-2px]"
                    style={{ backgroundColor: NIGHT[name] }}
                  />
                  {NIGHT[name]}
                </td>
                <td className="py-3 pr-4">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block size-3 rounded-[2px] border border-batten align-[-2px]"
                    style={{ backgroundColor: DAY[name] }}
                  />
                  {DAY[name]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={`${LABEL} mt-14`}>One recorded deviation</h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-chalk-soft sm:text-base">
        Day <span className="font-mono text-chalk">--chalk-faint</span> is{" "}
        <span className="font-mono">#576B7E</span>, not the family&apos;s{" "}
        <span className="font-mono">#5C7080</span>. The family value measures
        4.31 against the deep tracing ground — below the 4.5 the contrast
        suite demands — because the portfolio never renders that pair and the
        loft does. The contract caught it before the first pixel shipped.
      </p>

      <h2 className={`${LABEL} mt-14`}>The gates</h2>
      <ul className="mt-4 max-w-xl space-y-3 text-sm leading-relaxed text-chalk-soft sm:text-base">
        <li className="border-l-2 border-batten pl-4">
          Every token&apos;s name and exact hex, asserted in both modes — a
          drive-by tweak is a red build.
        </li>
        <li className="border-l-2 border-batten pl-4">
          Every text token measured against both grounds, both modes, at AA
          for small text. Buff is the one large-mark exception, held at 3.0
          and used only for ≥18px shipped marks.
        </li>
        <li className="border-l-2 border-batten pl-4">
          Behavior and axe checks on every study; reduced-motion branches are
          asserted, not assumed.
        </li>
        <li className="border-l-2 border-batten pl-4">
          Typecheck, lint, tests, and build on every push and pull request.
        </li>
      </ul>

      <h2 className={`${LABEL} mt-14`}>Type, stack, budgets</h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-chalk-soft sm:text-base">
        IBM Plex Mono carries the instrument voice; Public Sans carries prose;
        Fraunces italic appears once per page, as a study&apos;s thesis. All
        three are self-hosted latin subsets. Next.js App Router, React 19,
        Tailwind v4 with the family tokens mapped through{" "}
        <span className="font-mono">@theme inline</span>, Motion for the
        curves. Interaction budgets print in every study&apos;s footer; the
        floor targets a perfect Lighthouse pass and each study holds
        ninety-five or better.
      </p>
    </section>
  );
}
