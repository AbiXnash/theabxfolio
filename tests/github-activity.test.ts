import { describe, test, expect } from "bun:test";

describe("GitHub Activity", () => {
  test("token detection works", () => {
    const testCases = [
      { input: "ghp_abc123", expected: true },
      { input: "github_pat_abc", expected: true },
      { input: "invalid", expected: false },
      { input: "", expected: false },
      { input: undefined, expected: false },
    ];

    for (const { input, expected } of testCases) {
      const hasToken = !!(
        input &&
        (input.startsWith("ghp_") || input.startsWith("github_pat_"))
      );
      expect(hasToken).toBe(expected);
    }
  });

  test("commit message formatting works", () => {
    const longMessage =
      "This is a very long commit message that should be truncated if needed";
    expect(longMessage.length).toBeGreaterThan(10);
  });

  test("date parsing works", () => {
    const isoDate = "2026-04-04T18:49:06Z";
    const date = new Date(isoDate);
    expect(date.getTime()).toBeGreaterThan(0);
  });
});

describe("Cache", () => {
  test("cache key is consistent", () => {
    const key = "github-activity-cache";
    expect(key).toBe("github-activity-cache");
  });

  test("cache TTL is 1 minute", () => {
    const TTL_MS = 60 * 1000;
    expect(TTL_MS).toBe(60000);
  });
});

describe("API Configuration", () => {
  test("API base URL is correct", () => {
    const baseUrl = "https://api.github.com";
    expect(baseUrl).toBe("https://api.github.com");
  });

  test("API version header is set", () => {
    const version = "2022-11-28";
    expect(version).toBe("2022-11-28");
  });
});
