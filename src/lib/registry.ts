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

export const studies: Study[] = [];
