import { describe, expect, it } from "vitest";
import { DAY, NIGHT } from "./palette";

// Every text token is measured against both grounds, in both modes.
// Text tokens hold AA for small text (4.5); buff is a large-mark token
// (≥18px "shipped" marks only) and holds the 3.0 large-text floor —
// that exception is documented here and in the colophon.

function luminance(hex: string): number {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(a: string, b: string): number {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const TEXT_TOKENS = ["chalk", "chalk-soft", "chalk-faint", "magenta"] as const;
const GROUNDS = ["floor", "floor-raised"] as const;

for (const [mode, palette] of [
  ["night", NIGHT],
  ["day", DAY],
] as const) {
  describe(`${mode} mode contrast`, () => {
    for (const ground of GROUNDS) {
      for (const token of TEXT_TOKENS) {
        it(`${token} on ${ground} clears AA small text (4.5)`, () => {
          expect(ratio(palette[token], palette[ground])).toBeGreaterThanOrEqual(
            4.5,
          );
        });
      }
      it(`buff on ${ground} clears the large-mark floor (3.0)`, () => {
        expect(ratio(palette.buff, palette[ground])).toBeGreaterThanOrEqual(
          3.0,
        );
      });
    }
  });
}
