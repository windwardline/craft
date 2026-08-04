/* The lofted line for study 02: an edit paints instantly (the vertical
   rise at t=0), holds through latency, and forks when the server
   answers — settle carries the plateau on; reject falls back to the
   committed value, drawn as the dashed ghost. */
export const line = {
  title:
    "Optimistic edit — instant paint, latency plateau, and the settle/return fork",
  d: "M 24 118 L 24 60 L 420 60 L 616 54",
  ghostD: "M 420 60 C 470 60, 500 114, 616 116",
  width: 640,
  height: 140,
  marks: [
    { x: 24, y: 118, label: "0ms · edit painted", below: true },
    { x: 616, y: 54, label: "settle · committed" },
    { x: 616, y: 116, label: "return · restored", below: true },
  ],
};
