"use client";

import { motion, useReducedMotion } from "motion/react";

type Mark = { x: number; y: number; label: string };

type Props = {
  title: string;
  d: string;
  width: number;
  height: number;
  marks?: Mark[];
};

/* The signature: a study's motion curve, chalked on the floor before it
   runs. Draws itself once on entry; under reduced motion it renders
   complete and still — the drawing is the fallback, not a casualty. */
export function LoftedLine({ title, d, width, height, marks = [] }: Props) {
  const reduced = useReducedMotion();

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-2xl overflow-visible text-chalk"
    >
      {reduced ? (
        <path
          data-lofted
          data-static="true"
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : (
        <motion.path
          data-lofted
          data-static="false"
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      )}
      {marks.map((mark) => {
        const anchorEnd = mark.x > width / 2;
        return (
          <g key={mark.label} className="font-mono">
            <circle cx={mark.x} cy={mark.y} r={3} className="fill-chalk-faint" />
            <text
              x={anchorEnd ? mark.x - 8 : mark.x + 8}
              y={mark.y - 8}
              textAnchor={anchorEnd ? "end" : "start"}
              fontSize={10}
              className="fill-chalk-faint uppercase tracking-widest"
            >
              {mark.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
