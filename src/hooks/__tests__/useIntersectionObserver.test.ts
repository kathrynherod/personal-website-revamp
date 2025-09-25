import { renderHook } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";

import { useIntersectionObserver } from "../useIntersectionObserver";

describe("useIntersectionObserver", () => {
  it("returns false initially", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useIntersectionObserver(ref, { threshold: 0.5 });
    });

    expect(result.current).toBe(false);
  });

  it("accepts threshold and rootMargin options", () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useIntersectionObserver(ref, {
        threshold: 0.8,
        rootMargin: "10px",
      });
    });

    // Should not throw and should return initial false value
    expect(result.current).toBe(false);
  });

  it("handles null ref gracefully", () => {
    const { result } = renderHook(() => {
      const ref = { current: null };
      return useIntersectionObserver(ref, { threshold: 0.5 });
    });

    expect(result.current).toBe(false);
  });
});
