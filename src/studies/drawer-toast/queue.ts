export type Toast = { id: string; label: string };

export const MAX_VISIBLE = 3;

/* Three toasts, first in first out. A fourth arrival retires the
   oldest: news that has queued behind three newer items is no longer
   news, and a stack that grows without limit is a log, not a toast. */
export function toastQueue(queue: Toast[], next: Toast): Toast[] {
  return [...queue, next].slice(-MAX_VISIBLE);
}
