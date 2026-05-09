import { expect, test, describe } from "bun:test";
import { sortResearchByYear } from "./utils";
import { getBuildDate } from "./macros";

describe("Utility Functions", () => {
  test("sortResearchByYear should sort research items by year descending", () => {
    const mockItems = [
      { title: "Paper A", meta: "2023 · Python" },
      { title: "Paper B", meta: "2025 · Jupyter" },
      { title: "Paper C", meta: "2024 · Python" },
    ];

    const sorted = sortResearchByYear(mockItems);

    expect(sorted[0].title).toBe("Paper B");
    expect(sorted[1].title).toBe("Paper C");
    expect(sorted[2].title).toBe("Paper A");
  });

  test("getBuildDate should return a valid string", () => {
    const date = getBuildDate();
    expect(typeof date).toBe("string");
    expect(date.length).toBeGreaterThan(0);
  });
});
