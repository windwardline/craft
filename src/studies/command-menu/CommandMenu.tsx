"use client";

import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import { ENTRY_MS, commandFilter, type Command } from "./logic";

/* Study 01. Opens in 120ms — the slowest invisible entry — and closes in
   zero: dismissal gets no animation because the intent is already gone. */
export function CommandMenu({ items }: { items: Command[] }) {
  const reduced = usePrefersReducedMotion();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => commandFilter(query, items), [query, items]);
  const clampedActive = Math.min(active, Math.max(results.length - 1, 0));

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      event.preventDefault(); // the input is the trap; the list is virtual
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((v) => (results.length ? (v + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((v) =>
        results.length ? (v - 1 + results.length) % results.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const chosen = results[clampedActive];
      if (chosen) {
        setLastRun(chosen.label);
        close();
      }
    }
  }

  const panel = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
      className="absolute inset-x-0 top-0 z-10"
    >
      <div className="rounded-sm border border-batten bg-floor-raised shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]">
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={
            results[clampedActive] ? `${listId}-${results[clampedActive].id}` : undefined
          }
          aria-label="Type a command"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          placeholder="Type a command…"
          className="w-full border-b border-batten bg-transparent px-4 py-3 font-mono text-sm text-chalk outline-none placeholder:text-chalk-faint"
        />
        <ul id={listId} role="listbox" aria-label="Commands" className="max-h-64 overflow-y-auto py-1">
          {results.length === 0 ? (
            <li className="px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-chalk-faint">
              Nothing answers to that.
            </li>
          ) : (
            results.map((command, index) => (
              <li
                key={command.id}
                id={`${listId}-${command.id}`}
                role="option"
                aria-selected={index === clampedActive}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setLastRun(command.label);
                  close();
                }}
                className={`cursor-pointer px-4 py-2.5 font-mono text-sm ${
                  index === clampedActive
                    ? "bg-batten/40 text-chalk"
                    : "text-chalk-soft"
                }`}
              >
                {command.label}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-72">
      <div className="flex items-baseline justify-between">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm border border-batten px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-chalk-soft transition-colors hover:border-chalk-faint hover:text-chalk"
        >
          Open command menu <span className="ml-2 text-chalk-faint">⌘K</span>
        </button>
        <p aria-live="polite" className="font-mono text-xs text-chalk-faint">
          {lastRun ? `Ran: ${lastRun}` : "Nothing run yet"}
        </p>
      </div>

      <div className="relative mt-6">
        {open &&
          (reduced ? (
            <div data-panel data-static="true">
              {panel}
            </div>
          ) : (
            <motion.div
              data-panel
              data-static="false"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: ENTRY_MS / 1000, ease: "easeOut" }}
            >
              {panel}
            </motion.div>
          ))}
      </div>
    </div>
  );
}
