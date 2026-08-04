import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it } from "vitest";
import { OptimisticTable } from "../src/studies/optimistic-table/OptimisticTable";
import {
  optimisticReducer,
  type RowState,
} from "../src/studies/optimistic-table/reducer";

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

const initial: RowState[] = [
  { id: "r1", label: "Berth 12 survey", owner: "Ada", committed: "Ada" },
  { id: "r2", label: "Hull lines fairing", owner: "Grace", committed: "Grace" },
];

afterEach(cleanup);

describe("optimisticReducer", () => {
  it("edit applies the value instantly and marks the row pending", () => {
    const next = optimisticReducer(initial, {
      type: "edit",
      id: "r1",
      owner: "Katherine",
    });
    const row = next.find((r) => r.id === "r1")!;
    expect(row.owner).toBe("Katherine");
    expect(row.pending).toBe(true);
    expect(row.committed).toBe("Ada");
  });

  it("settle clears pending and commits the value", () => {
    const edited = optimisticReducer(initial, {
      type: "edit",
      id: "r1",
      owner: "Katherine",
    });
    const settled = optimisticReducer(edited, { type: "settle", id: "r1" });
    const row = settled.find((r) => r.id === "r1")!;
    expect(row.pending).toBeUndefined();
    expect(row.committed).toBe("Katherine");
    expect(row.rejected).toBeUndefined();
  });

  it("reject restores the committed value and flags the row", () => {
    const edited = optimisticReducer(initial, {
      type: "edit",
      id: "r2",
      owner: "Margaret",
    });
    const rejected = optimisticReducer(edited, { type: "reject", id: "r2" });
    const row = rejected.find((r) => r.id === "r2")!;
    expect(row.owner).toBe("Grace");
    expect(row.pending).toBeUndefined();
    expect(row.rejected).toBe(true);
  });
});

describe("the optimistic table", () => {
  it("shows an edit instantly, then settles or rejects when the server answers", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    render(<OptimisticTable seed={7} latencyMs={40} />);

    const firstEdit = screen.getAllByRole("button", { name: /reassign/i })[0];
    await user.click(firstEdit);

    // Optimistic: the new owner is visible immediately, marked pending.
    expect(screen.getAllByText(/pending/i).length).toBeGreaterThan(0);

    // The simulated server answers; pending clears one way or the other.
    await waitFor(
      () => expect(screen.queryAllByText(/pending/i)).toHaveLength(0),
      { timeout: 2000 },
    );
  });

  it("a rejected edit restores the committed owner and says so", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    // seed=1 makes the first simulated answer a rejection: 48271 % 5 === 1.
    render(<OptimisticTable seed={1} latencyMs={30} />);

    const row = screen.getAllByRole("row")[1];
    const before = row.textContent;
    await user.click(screen.getAllByRole("button", { name: /reassign/i })[0]);

    await waitFor(
      () => expect(screen.getAllByText(/returned/i).length).toBeGreaterThan(0),
      { timeout: 2000 },
    );
    expect(screen.getAllByRole("row")[1].textContent).toContain(
      before?.includes("Ada") ? "Ada" : "",
    );
  });

  it("has no axe violations", async () => {
    setReducedMotion(false);
    const { container } = render(<OptimisticTable seed={7} latencyMs={40} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("the scroll wrapper is its own containing block", () => {
    // sr-only text is position:absolute; without `relative` on the scroll
    // wrapper it escapes containment and widens the page itself.
    setReducedMotion(false);
    const { container } = render(<OptimisticTable seed={7} latencyMs={40} />);
    const wrapper = container.querySelector(".overflow-x-auto")!;
    expect(wrapper.classList.contains("relative")).toBe(true);
  });
});
