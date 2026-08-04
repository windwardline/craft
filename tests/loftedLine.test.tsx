import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LoftedLine } from "../src/components/LoftedLine";

function setReducedMotion(matches: boolean) {
  window.matchMedia = (query: string) =>
    ({
      matches: query.includes("prefers-reduced-motion") ? matches : false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

const props = {
  title: "Entry curve, command menu",
  d: "M 0 80 C 40 80, 60 10, 200 10",
  width: 200,
  height: 90,
  marks: [
    { x: 0, y: 80, label: "0ms · scale .98" },
    { x: 200, y: 10, label: "120ms · settle" },
  ],
};

afterEach(cleanup);

describe("the lofted line", () => {
  it("is an image with the study's title and draws the given path", () => {
    setReducedMotion(false);
    render(<LoftedLine {...props} />);
    const svg = screen.getByRole("img", { name: props.title });
    const path = svg.querySelector("path[data-lofted]");
    expect(path).not.toBeNull();
    expect(path).toHaveAttribute("d", props.d);
    expect(path).toHaveAttribute("data-static", "false");
  });

  it("renders every mark as a mono annotation", () => {
    setReducedMotion(false);
    render(<LoftedLine {...props} />);
    for (const mark of props.marks) {
      expect(screen.getByText(mark.label)).toBeInTheDocument();
    }
  });

  it("renders complete and static under reduced motion", () => {
    setReducedMotion(true);
    render(<LoftedLine {...props} />);
    const svg = screen.getByRole("img", { name: props.title });
    const path = svg.querySelector("path[data-lofted]");
    expect(path).toHaveAttribute("data-static", "true");
  });
});
