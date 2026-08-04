"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import { SPRINGS } from "./springs";
import { toastQueue, type Toast } from "./queue";

/* Study 03. The drawer and the toast each get a stated spring; the
   destructive confirm gets none at all — danger should not bounce. */
export function DrawerToast() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const openRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) drawerRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    setConfirming(false);
    openRef.current?.focus();
  }

  function raise() {
    idRef.current += 1;
    setToasts((q) =>
      toastQueue(q, {
        id: String(idRef.current),
        label: `Offsets logged · entry ${idRef.current}`,
      }),
    );
  }

  const drawerBody = (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Drawer"
      tabIndex={-1}
      data-static={reduced ? "true" : "false"}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        }
      }}
      className="absolute inset-y-0 right-0 w-72 border-l border-batten bg-floor-raised p-5 outline-none"
    >
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-chalk-faint">
        The offsets book
      </p>
      <div className="mt-5 flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={raise}
          className="rounded-sm border border-batten px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-chalk-soft transition-colors hover:border-chalk-faint hover:text-chalk"
        >
          Raise a toast
        </button>
        {confirming ? (
          <div
            role="alertdialog"
            aria-modal="false"
            aria-label="Confirm deletion"
            data-motion="none"
            className="w-full border border-buff/60 p-3"
          >
            <p className="text-sm text-chalk">
              Delete the offsets book? There is no undo.
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-sm border border-batten px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-chalk"
              >
                Keep it
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-sm border border-buff px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-buff"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="rounded-sm border border-batten px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-chalk-soft transition-colors hover:border-buff hover:text-buff"
          >
            Delete the offsets book
          </button>
        )}
        <button
          type="button"
          onClick={close}
          className="rounded-sm border border-batten px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-chalk-soft transition-colors hover:border-chalk-faint hover:text-chalk"
        >
          Close drawer
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-96 overflow-hidden rounded-sm border border-batten">
      <div data-background inert={open || undefined} className="p-5">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-chalk-faint">
          The bench
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-chalk-soft">
          Background work sits here. While the drawer is open this whole
          region is inert — unreachable by pointer, keyboard, and screen
          reader alike.
        </p>
        <button
          ref={openRef}
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 rounded-sm border border-batten px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-chalk-soft transition-colors hover:border-chalk-faint hover:text-chalk"
        >
          Open the drawer
        </button>
      </div>

      {open &&
        (reduced ? (
          drawerBody
        ) : (
          <motion.div
            initial={{ x: 288 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", ...SPRINGS.drawer }}
            className="absolute inset-y-0 right-0"
          >
            {drawerBody}
          </motion.div>
        ))}

      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-2">
        {toasts.map((toast) =>
          reduced ? (
            <output
              key={toast.id}
              data-static="true"
              className="rounded-sm border border-batten bg-floor px-3 py-2 font-mono text-xs text-chalk-soft"
            >
              {toast.label}
            </output>
          ) : (
            <motion.output
              key={toast.id}
              data-static="false"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", ...SPRINGS.toast }}
              className="rounded-sm border border-batten bg-floor px-3 py-2 font-mono text-xs text-chalk-soft"
            >
              {toast.label}
            </motion.output>
          ),
        )}
      </div>
    </div>
  );
}
