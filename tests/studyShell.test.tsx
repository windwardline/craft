import { cleanup, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it } from "vitest";
import { StudyShell } from "../src/components/StudyShell";
import type { Study } from "../src/lib/registry";

const meta: Study = {
  slug: "command-menu",
  number: 1,
  date: "2026-08-04",
  title: "Command menu",
  thesis: "A command menu earns its speed by refusing to perform it.",
  status: "interactive",
  summary: "Scale, fade, and the argument for 120 milliseconds.",
};

function subject() {
  return (
    <StudyShell
      meta={meta}
      line={<svg role="img" aria-label="line" />}
      demo={<button type="button">demo</button>}
      notes={[
        "Prefix beats word-start beats fuzzy.",
        "120ms is the slowest invisible entry.",
        "No exit animation: intent is already gone.",
      ]}
      source={<pre>{"export const x = 1;"}</pre>}
      footer={{
        a11y: "Focus trapped; arrows wrap; Escape returns focus.",
        reducedMotion: "Menu appears and dismisses instantly.",
        budgetMs: 120,
      }}
    />
  );
}

afterEach(cleanup);

describe("the study shell", () => {
  it("renders the anatomy in the fixed order", () => {
    const { container } = render(subject());
    const slots = [...container.querySelectorAll("[data-shell-slot]")].map(
      (el) => el.getAttribute("data-shell-slot"),
    );
    expect(slots).toEqual([
      "eyebrow",
      "thesis",
      "line",
      "demo",
      "notes",
      "source",
      "footer",
    ]);
  });

  it("shows date, padded number, and a magenta running dot when interactive", () => {
    render(subject());
    expect(screen.getByText("2026-08-04")).toBeInTheDocument();
    expect(screen.getByText(/Study 01/)).toBeInTheDocument();
    const dot = document.querySelector("[data-status-dot]");
    expect(dot).toHaveAttribute("data-status", "interactive");
  });

  it("sets exactly one thesis line in the display face", () => {
    const { container } = render(subject());
    expect(container.querySelectorAll(".thesis")).toHaveLength(1);
  });

  it("prints the footer strip: a11y, reduced motion, budget", () => {
    render(subject());
    expect(screen.getByText(/Focus trapped/)).toBeInTheDocument();
    expect(screen.getByText(/instantly/)).toBeInTheDocument();
    expect(screen.getByText(/120 ms/)).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(subject());
    expect(await axe(container)).toHaveNoViolations();
  });
});
