import { expect, test, describe } from "bun:test";
import { getBuildDate } from "./macros";

describe("Utility Functions", () => {
  test("getBuildDate should return a valid string", () => {
    const date = getBuildDate();
    expect(typeof date).toBe("string");
    expect(date.length).toBeGreaterThan(0);
  });
});
