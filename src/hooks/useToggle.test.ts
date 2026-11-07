import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToggle } from "./useToggle.js";

describe("useToggle", () => {
  it("switches its boolean value when toggled", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
  });
});
