import { describe, expect, it } from "vitest";
import { exploreResponseSchema } from "./exploreResponseSchema.js";

describe("exploreResponseSchema", () => {
  it("rejects an invalid response before a request can be made", () => {
    const result = exploreResponseSchema.safeParse({ displayName: "", answer: "short", anonymous: false });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.map((issue) => issue.message)).toContain("Answer must be at least 10 characters.");
  });
});
