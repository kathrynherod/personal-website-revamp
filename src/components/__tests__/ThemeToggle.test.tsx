import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ThemeToggle from "../ThemeToggle";

// Mock the hook with a simple implementation
const mockToggleMode = vi.fn();
vi.mock("../../hooks/useThemeMode", () => ({
  useThemeMode: () => ["light", mockToggleMode],
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders theme toggle button", () => {
    customRender(<ThemeToggle />);

    const button = screen.getByTestId("theme-toggle-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveRole("button");
  });

  it("shows dark mode icon when in light mode", () => {
    customRender(<ThemeToggle />);

    const button = screen.getByTestId("theme-toggle-button");
    const darkModeIcon = button.querySelector("svg");

    expect(darkModeIcon).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(button).toHaveAttribute("title", "Switch to Dark Mode");
  });

  it("calls toggleMode when clicked", async () => {
    const user = userEvent.setup();
    customRender(<ThemeToggle />);

    const button = screen.getByTestId("theme-toggle-button");
    await user.click(button);

    expect(mockToggleMode).toHaveBeenCalledTimes(1);
  });

  it("can be activated with keyboard", async () => {
    const user = userEvent.setup();
    customRender(<ThemeToggle />);

    const button = screen.getByTestId("theme-toggle-button");
    button.focus();
    await user.keyboard("{Enter}");

    expect(mockToggleMode).toHaveBeenCalledTimes(1);
  });

  it("can be activated with space key", async () => {
    const user = userEvent.setup();
    customRender(<ThemeToggle />);

    const button = screen.getByTestId("theme-toggle-button");
    button.focus();
    await user.keyboard(" ");

    expect(mockToggleMode).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility attributes for screen readers", () => {
    customRender(<ThemeToggle />);

    const button = screen.getByTestId("theme-toggle-button");

    expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(button).toHaveAttribute("title", "Switch to Dark Mode");
    expect(button).toHaveAttribute("type", "button");
  });

  it("renders with proper styling structure", () => {
    const { container } = customRender(<ThemeToggle />);

    const styledButton = container.querySelector("button");
    expect(styledButton).toBeInTheDocument();

    const icon = styledButton?.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});