"use client";

import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

type Mark = { x: number; y: number; label: string; below?: boolean };

type Props = {
  title: string;
  d: string;
  /* An alternate outcome, drawn dashed and faint — a fork in the curve. */
  ghostD?: string;
  width: number;
  height: number;
  marks?: Mark[];
};

/* The signature: a study's motion curve, chalked on the floor before it
   runs. The draw is pure CSS (stroke-dashoffset over a normalized
   pathLength), so it needs no JavaScript and reduced motion renders it
   complete and still via the same stylesheet. Author geometry in a
   ~640-wide viewBox so annotations render at true text size. */
export function LoftedLine({ title, d, ghostD, width, height, marks = [] }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-2xl overflow-visible text-chalk"
    >
      <path
        data-lofted
        data-static={reduced ? "true" : "false"}
        className={reduced ? undefined : "lofted-path"}
        pathLength={1}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {ghostD ? (
        /* The ghost never animates: the alternate outcome is already
           charted while the main line draws toward it. */
        <path
          data-lofted-ghost
          className="text-chalk-faint"
          d={ghostD}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
      ) : null}
      {marks.map((mark) => {
        const anchorEnd = mark.x > width / 2;
        return (
          <g key={mark.label} className="font-mono">
            <circle cx={mark.x} cy={mark.y} r={3} className="fill-chalk-faint" />
            <text
              x={anchorEnd ? mark.x - 10 : mark.x + 10}
              y={mark.below ? mark.y + 22 : mark.y - 10}
              textAnchor={anchorEnd ? "end" : "start"}
              fontSize={11}
              className="fill-chalk-faint tracking-widest"
            >
              {mark.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
