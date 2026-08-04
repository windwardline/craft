/* The lofted line for study 01: opacity/scale settling over 120ms.
   Time runs left to right; the curve eases out because the menu should
   arrive faster than it seems to. Geometry lives in a 640-wide space so
   annotations render at true size. */
export const line = {
  title: "Entry curve — command menu, 0 to 120 milliseconds",
  d: "M 24 96 C 130 96, 180 26, 616 18",
  width: 640,
  height: 120,
  marks: [
    { x: 24, y: 96, label: "0ms · scale .98 · α 0" },
    { x: 616, y: 18, label: "120ms · settle" },
  ],
};
