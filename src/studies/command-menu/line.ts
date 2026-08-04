/* The lofted line for study 01: opacity/scale settling over 120ms.
   Time runs left to right; the curve eases out because the menu should
   arrive faster than it seems to. */
export const line = {
  title: "Entry curve — command menu, 0 to 120 milliseconds",
  d: "M 0 88 C 34 88, 52 16, 200 10",
  width: 200,
  height: 100,
  marks: [
    { x: 0, y: 88, label: "0ms · scale .98 · α 0" },
    { x: 200, y: 10, label: "120ms · settle" },
  ],
};
