import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { afterEach, describe, expect, it } from "vitest";
import { DrawerToast } from "../src/studies/drawer-toast/DrawerToast";
import { SPRINGS } from "../src/studies/drawer-toast/springs";
import { toastQueue, type Toast } from "../src/studies/drawer-toast/queue";

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

afterEach(cleanup);

describe("the constants", () => {
  it("pins both springs exactly", () => {
    expect(SPRINGS).toEqual({
      drawer: { stiffness: 380, damping: 34 },
      toast: { stiffness: 300, damping: 26 },
    });
  });
});

describe("toastQueue", () => {
  const t = (id: number): Toast => ({ id: String(id), label: `Toast ${id}` });

  it("appends up to three visible toasts", () => {
    let q: Toast[] = [];
    q = toastQueue(q, t(1));
    q = toastQueue(q, t(2));
    q = toastQueue(q, t(3));
    expect(q.map((x) => x.id)).toEqual(["1", "2", "3"]);
  });

  it("collapses FIFO past three — oldest leaves first", () => {
    let q: Toast[] = [t(1), t(2), t(3)];
    q = toastQueue(q, t(4));
    expect(q.map((x) => x.id)).toEqual(["2", "3", "4"]);
  });
});

describe("the drawer", () => {
  it("opens with focus inside, makes the background inert, and Escape returns focus", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    render(<DrawerToast />);

    const open = screen.getByRole("button", { name: /open the drawer/i });
    await user.click(open);

    const drawer = screen.getByRole("dialog", { name: /drawer/i });
    expect(drawer).toBeInTheDocument();
    expect(drawer.contains(document.activeElement)).toBe(true);
    expect(
      document.querySelector("[data-background]")?.hasAttribute("inert"),
    ).toBe(true);

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(open).toHaveFocus();
    expect(
      document.querySelector("[data-background]")?.hasAttribute("inert"),
    ).toBe(false);
  });

  it("raises toasts that cap at three, and the destructive confirm mounts with no motion", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    render(<DrawerToast />);
    await user.click(screen.getByRole("button", { name: /open the drawer/i }));

    const raise = screen.getByRole("button", { name: /raise a toast/i });
    await user.click(raise);
    await user.click(raise);
    await user.click(raise);
    await user.click(raise);
    expect(screen.getAllByRole("status")).toHaveLength(3);

    await user.click(
      screen.getByRole("button", { name: /delete the offsets book/i }),
    );
    const confirm = screen.getByRole("alertdialog");
    expect(confirm).toHaveAttribute("data-motion", "none");
  });

  it("renders drawer and toasts statically under reduced motion", async () => {
    setReducedMotion(true);
    const user = userEvent.setup();
    render(<DrawerToast />);
    await user.click(screen.getByRole("button", { name: /open the drawer/i }));
    expect(
      screen.getByRole("dialog", { name: /drawer/i }).getAttribute("data-static"),
    ).toBe("true");
    await user.click(screen.getByRole("button", { name: /raise a toast/i }));
    expect(screen.getByRole("status").getAttribute("data-static")).toBe("true");
  });

  it("has no axe violations with the drawer open", async () => {
    setReducedMotion(false);
    const user = userEvent.setup();
    const { container } = render(<DrawerToast />);
    await user.click(screen.getByRole("button", { name: /open the drawer/i }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
