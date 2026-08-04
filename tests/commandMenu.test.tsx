import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it } from "vitest";
import { CommandMenu } from "../src/studies/command-menu/CommandMenu";
import {
  ENTRY_MS,
  commandFilter,
  type Command,
} from "../src/studies/command-menu/logic";

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

const items: Command[] = [
  { id: "lamp", label: "Toggle the lamp" },
  { id: "study-02", label: "Open study 02" },
  { id: "colophon", label: "Go to the colophon" },
  { id: "chart", label: "Open the chart" },
];

afterEach(cleanup);

describe("commandFilter", () => {
  it("returns everything, in order, for an empty query", () => {
    expect(commandFilter("", items)).toEqual(items);
  });

  it("ranks prefix over word-start over fuzzy", () => {
    const ranked = commandFilter("o", items).map((c) => c.id);
    // "Open study 02" and "Open the chart" are prefix matches (stable order),
    // "Go to the colophon" and "Toggle the lamp" match later.
    expect(ranked.slice(0, 2)).toEqual(["study-02", "chart"]);
  });

  it("matches fuzzily but excludes non-matches", () => {
    const ranked = commandFilter("clh", items).map((c) => c.id);
    expect(ranked).toContain("colophon");
    expect(ranked).not.toContain("study-02");
  });

  it("keeps the entry constant at 120", () => {
    expect(ENTRY_MS).toBe(120);
  });
});

describe("the command menu", () => {
  it("opens on meta+k, traps focus in the input, and closes on Escape returning focus", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    render(<CommandMenu items={items} />);

    const trigger = screen.getByRole("button", { name: /command menu/i });
    await user.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const input = screen.getByRole("combobox");
    expect(input).toHaveFocus();

    await user.tab();
    expect(input).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    await user.keyboard("{Meta>}k{/Meta}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("wraps with arrows and selects with Enter", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    render(<CommandMenu items={items} />);
    await user.click(screen.getByRole("button", { name: /command menu/i }));

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("option", { name: /open the chart/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.keyboard("{ArrowDown}");
    expect(
      screen.getByRole("option", { name: /toggle the lamp/i }),
    ).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Enter}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText(/ran: toggle the lamp/i)).toBeInTheDocument();
  });

  it("animates entry normally and renders static under reduced motion", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    const first = render(<CommandMenu items={items} />);
    await user.click(screen.getByRole("button", { name: /command menu/i }));
    expect(
      first.container.querySelector("[data-panel]")?.getAttribute("data-static"),
    ).toBe("false");
    cleanup();

    setReducedMotion(true);
    const user2 = userEvent.setup();
    const second = render(<CommandMenu items={items} />);
    await user2.click(screen.getByRole("button", { name: /command menu/i }));
    expect(
      second.container
        .querySelector("[data-panel]")
        ?.getAttribute("data-static"),
    ).toBe("true");
  });

  it("has no axe violations while open", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    const { container } = render(<CommandMenu items={items} />);
    await user.click(screen.getByRole("button", { name: /command menu/i }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
