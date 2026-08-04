/* The lofted line for study 03: the drawer's spring — one small
   overshoot, then settled authority. The dashed flat line beneath it is
   the destructive confirm: no spring at all, by argument. */
export const line = {
  title:
    "Drawer spring at stiffness 380, damping 34 — and the flat line danger gets instead",
  d: "M 24 116 C 56 116, 66 34, 108 44 C 138 51, 148 74, 188 70 C 228 66, 250 60, 300 62 C 380 65, 500 64, 616 64",
  ghostD: "M 24 100 L 616 100",
  width: 640,
  height: 140,
  marks: [
    { x: 24, y: 116, label: "t=0 · off-canvas", below: true },
    { x: 616, y: 64, label: "drawer · 380/34" },
    { x: 616, y: 100, label: "destructive · no spring", below: true },
  ],
};
