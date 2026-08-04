import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DAY, NIGHT } from "./palette";

// The token contract: the loft's palette is the family night palette,
// held in tests/palette.ts as exact values. A drive-by hex tweak is a
// red build.
const css = readFileSync("src/app/globals.css", "utf8");

function rootBlock(source: string): string {
  const match = source.match(/:root\s*{([^}]+)}/);
  return match ? match[1] : "";
}

function dayBlock(source: string): string {
  const match = source.match(/\[data-lamp="day"\]\s*{([^}]+)}/);
  return match ? match[1] : "";
}

describe("the token contract", () => {
  it("defines every night token at :root with the exact family value", () => {
    const block = rootBlock(css);
    for (const [name, hex] of Object.entries(NIGHT)) {
      expect(block).toMatch(new RegExp(`--${name}:\\s*${hex}`, "i"));
    }
  });

  it("defines every day (tracing) override with the exact portfolio value", () => {
    const block = dayBlock(css);
    for (const [name, hex] of Object.entries(DAY)) {
      expect(block).toMatch(new RegExp(`--${name}:\\s*${hex}`, "i"));
    }
  });

  it("maps every token through @theme inline so utilities read the raw layer", () => {
    const theme = css.match(/@theme inline\s*{([^}]+)}/)?.[1] ?? "";
    for (const name of Object.keys(NIGHT)) {
      expect(theme).toMatch(
        new RegExp(`--color-${name}:\\s*var\\(--${name}\\)`),
      );
    }
  });

  it("declares the three font roles", () => {
    expect(css).toMatch(/--font-mono:.*IBM Plex Mono/);
    expect(css).toMatch(/--font-sans:.*Public Sans/);
    expect(css).toMatch(/--font-display:.*Fraunces/);
  });

  it("never uses !important", () => {
    expect(css).not.toMatch(/!important/);
  });
});
