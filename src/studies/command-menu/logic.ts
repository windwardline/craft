export type Command = { id: string; label: string };

/* The slowest entry that still reads as instant. The note argues it;
   the suite pins it. */
export const ENTRY_MS = 120;

type Scored = { command: Command; score: number; index: number };

/* Prefix beats word-start beats fuzzy; ties keep author order. */
export function commandFilter(query: string, items: Command[]): Command[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...items];

  const scored: Scored[] = [];
  items.forEach((command, index) => {
    const label = command.label.toLowerCase();
    let score: number | null = null;
    if (label.startsWith(q)) {
      score = 0;
    } else if (label.split(/\s+/).some((word) => word.startsWith(q))) {
      score = 1;
    } else if (isSubsequence(q, label)) {
      score = 2;
    }
    if (score !== null) scored.push({ command, score, index });
  });

  return scored
    .sort((a, b) => a.score - b.score || a.index - b.index)
    .map((s) => s.command);
}

function isSubsequence(needle: string, haystack: string): boolean {
  let i = 0;
  for (const ch of haystack) {
    if (ch === needle[i]) i += 1;
    if (i === needle.length) return true;
  }
  return false;
}
