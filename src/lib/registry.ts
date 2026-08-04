// The single source for what exists on the floor. A study's page, its
// index row, and its static params all read this and nothing else.

export type Study = {
  slug: string;
  number: number;
  date: string;
  title: string;
  thesis: string;
  status: "interactive" | "drawn";
  summary: string;
};

export const studies: Study[] = [
  {
    slug: "drawer-toast",
    number: 3,
    date: "2026-08-04",
    title: "Drawer & toast physics",
    thesis: "Two springs, stated — and the flat line danger gets instead.",
    status: "interactive",
    summary:
      "A drawer that settles with authority, toasts that cap at three, and a destructive confirm that refuses to bounce.",
  },
  {
    slug: "optimistic-table",
    number: 2,
    date: "2026-08-04",
    title: "Optimistic table",
    thesis: "Show people their own edit before the server agrees.",
    status: "interactive",
    summary:
      "Instant paint, a latency plateau, and the settle/return fork — motion only where meaning changes.",
  },
  {
    slug: "command-menu",
    number: 1,
    date: "2026-08-04",
    title: "Command menu",
    thesis: "A command menu earns its speed by refusing to perform it.",
    status: "interactive",
    summary:
      "Scale, fade, and the argument for 120 milliseconds — with no exit animation at all.",
  },
];
