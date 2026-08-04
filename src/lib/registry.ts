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
