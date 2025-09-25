import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ThemeModeContext } from "../../contexts/ThemeModeContext";
import { useThemeMode } from "../useThemeMode";

// Mock context value
const mockToggleThemeMode = vi.fn();

const createWrapper = (themeMode: "light" | "dark" = "light") => {
  const mockContextValue = {
    themeMode,
    toggleThemeMode: mockToggleThemeMode,
  };

  return ({ children }: { children: React.ReactNode }) => (
    <ThemeModeContext.Provider value={mockContextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
};

describe("useThemeMode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns current theme mode and toggle function", () => {
    const wrapper = createWrapper("light");
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    expect(result.current[0]).toBe("light");
    expect(result.current[1]).toBe(mockToggleThemeMode);
  });

  it("returns dark theme mode when context provides dark mode", () => {
    const wrapper = createWrapper("dark");
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    expect(result.current[0]).toBe("dark");
    expect(result.current[1]).toBe(mockToggleThemeMode);
  });

  it("returns readonly tuple with correct types", () => {
    const wrapper = createWrapper("light");
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    // Test that it returns a tuple with specific positions
    const [themeMode, toggleFunction] = result.current;

    expect(typeof themeMode).toBe("string");
    expect(typeof toggleFunction).toBe("function");
    expect(themeMode).toBe("light");
  });

  it("throws error when used outside ThemeModeProvider", () => {
    // Mock console.error to avoid noisy test output
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      renderHook(() => useThemeMode());
    } catch (error: unknown) {
      expect((error as Error).message).toBe(
        "useThemeMode must be used within a ThemeModeProvider"
      );
    }

    consoleSpy.mockRestore();
  });

  it("throws error with correct message when context is undefined", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => useThemeMode()).toBeDefined();

    consoleSpy.mockRestore();
  });

  it("maintains referential stability", () => {
    const wrapper = createWrapper("light");
    const { result, rerender } = renderHook(() => useThemeMode(), { wrapper });

    const firstResult = result.current;
    rerender();
    const secondResult = result.current;

    // The toggle function should be the same reference
    expect(firstResult[1]).toBe(secondResult[1]);
  });

  it("provides access to toggle function that can be called", () => {
    const wrapper = createWrapper("light");
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    const [, toggleThemeMode] = result.current;

    // Call the toggle function
    toggleThemeMode();

    expect(mockToggleThemeMode).toHaveBeenCalledTimes(1);
  });

  it("works with dynamic context value changes", () => {
    let contextValue = {
      themeMode: "light" as "light" | "dark",
      toggleThemeMode: mockToggleThemeMode,
    };

    const DynamicWrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeModeContext.Provider value={contextValue}>
        {children}
      </ThemeModeContext.Provider>
    );

    const { result, rerender } = renderHook(() => useThemeMode(), {
      wrapper: DynamicWrapper,
    });

    expect(result.current[0]).toBe("light");

    // Change context value
    contextValue = {
      themeMode: "dark" as "light" | "dark",
      toggleThemeMode: mockToggleThemeMode,
    };

    rerender();

    expect(result.current[0]).toBe("dark");
  });

  it("returns const assertion type", () => {
    const wrapper = createWrapper("light");
    const { result } = renderHook(() => useThemeMode(), { wrapper });

    // This test ensures the return type is properly typed as readonly tuple
    const hookResult = result.current;

    // TypeScript should infer this as readonly [string, function]
    expect(Array.isArray(hookResult)).toBe(true);
    expect(hookResult.length).toBe(2);
  });
});
