"use client";

import { useSyncExternalStore } from "react";
import { getLamp, setLamp, subscribeLamp, type LampMode } from "../lib/lamp";

const MODES: { mode: LampMode; label: string }[] = [
  { mode: "day", label: "Day" },
  { mode: "night", label: "Night" },
  { mode: "system", label: "System" },
];

export function Lamp() {
  const current = useSyncExternalStore(subscribeLamp, getLamp, () => "system");

  return (
    <div
      role="group"
      aria-label="Lamp"
      className="flex gap-4 font-mono text-xs uppercase tracking-[0.18em]"
    >
      {MODES.map(({ mode, label }) => (
        <button
          key={mode}
          type="button"
          aria-pressed={current === mode}
          onClick={() => setLamp(mode)}
          className="text-chalk-faint transition-colors hover:text-chalk aria-pressed:text-magenta"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
