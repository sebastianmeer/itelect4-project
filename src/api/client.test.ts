import { afterEach, describe, expect, it, vi } from "vitest";
import { request } from "./client.js";

describe("request", () => {
  afterEach(() => vi.restoreAllMocks());

  it("adds JSON and bearer headers and returns the decoded body", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );

    await expect(request<{ ok: boolean }>("/private", {}, "jwt-token")).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/private"),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer jwt-token",
        }),
      }),
    );
  });

  it("surfaces the API error message for failed responses", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Invalid email or password." }), { status: 401 }),
    );

    await expect(request("/auth/login", { method: "POST" })).rejects.toThrow("Invalid email or password.");
  });
});
