import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { ModeSwitch } from "./ModeSwitch.js";

describe("ModeSwitch", () => {
  it("renders the Explore and Discover navigation choices", () => {
    render(<MemoryRouter><ModeSwitch /></MemoryRouter>);
    expect(screen.getByRole("link", { name: "Explore" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Discover" })).toBeInTheDocument();
  });
});
