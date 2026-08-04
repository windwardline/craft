// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { getLamp, setLamp } from "../src/lib/lamp";

describe("the lamp", () => {
  beforeEach(() => {
    window.localStorage.clear();
    delete document.documentElement.dataset.lamp;
  });

  it("stores an explicit choice and stamps the root", () => {
    setLamp("day");
    expect(document.documentElement.dataset.lamp).toBe("day");
    expect(localStorage.getItem("loft-lamp")).toBe("day");
    expect(getLamp()).toBe("day");
  });

  it("night stamps the root explicitly", () => {
    setLamp("night");
    expect(document.documentElement.dataset.lamp).toBe("night");
  });

  it("system clears the stamp and the stored choice", () => {
    setLamp("day");
    setLamp("system");
    expect(document.documentElement.dataset.lamp).toBeUndefined();
    expect(localStorage.getItem("loft-lamp")).toBeNull();
    expect(getLamp()).toBe("system");
  });
});
