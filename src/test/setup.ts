import "@testing-library/jest-dom";

import { vi } from "vitest";

// Mock IntersectionObserver since it's not available in jsdom
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = "0px";
  thresholds = [];
  takeRecords() {
    return [];
  }
} as typeof IntersectionObserver;

// Mock scrollIntoView since it's not available in jsdom
Element.prototype.scrollIntoView = vi.fn();

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
