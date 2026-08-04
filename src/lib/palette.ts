// The palette of record, shared by the token-contract and contrast suites.
// Night is the family night palette verbatim. Day is the portfolio's tracing
// palette with one recorded deviation: chalk-faint darkens from the family's
// #5C7080 to #576B7E because the deep tracing ground (#F3EADA) drops the
// family value to 4.31 — below AA. The colophon documents this.

export const NIGHT = {
  floor: "#0A141C",
  "floor-raised": "#0F1D28",
  chalk: "#DCE8EE",
  "chalk-soft": "#93A9B6",
  "chalk-faint": "#71889A",
  batten: "#2E4150",
  magenta: "#FF5C9E",
  buff: "#C9BB8E",
} as const;

export const DAY = {
  floor: "#FBF6EC",
  "floor-raised": "#F3EADA",
  chalk: "#14303F",
  "chalk-soft": "#4A6272",
  "chalk-faint": "#576B7E",
  batten: "#C3B896",
  magenta: "#C4106B",
  buff: "#8A7A45",
} as const;
