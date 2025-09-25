import { describe, expect, it } from "vitest";

import { generatePrefixedTestId, generateTestId } from "../test-id-utils";

describe("test-id-utils", () => {
  describe("generateTestId", () => {
    it("converts simple text to lowercase", () => {
      expect(generateTestId("React")).toBe("react");
      expect(generateTestId("TypeScript")).toBe("typescript");
    });

    it("replaces spaces with hyphens", () => {
      expect(generateTestId("REST APIs")).toBe("rest-apis");
      expect(generateTestId("React Native")).toBe("react-native");
    });

    it("replaces special characters with hyphens", () => {
      expect(generateTestId("Node.js")).toBe("node-js");
      expect(generateTestId("C#")).toBe("c-");
      expect(generateTestId(".NET")).toBe("-net");
      expect(generateTestId("ASP.NET")).toBe("asp-net");
    });

    it("replaces multiple special characters", () => {
      expect(generateTestId("Frontend & Styling")).toBe("frontend---styling");
      expect(generateTestId("C++")).toBe("c--");
    });

    it("handles mixed alphanumeric and special characters", () => {
      expect(generateTestId("HTML5")).toBe("html5");
      expect(generateTestId("CSS3")).toBe("css3");
      expect(generateTestId("Vue.js 3")).toBe("vue-js-3");
    });

    it("handles empty string", () => {
      expect(generateTestId("")).toBe("");
    });

    it("handles string with only special characters", () => {
      expect(generateTestId("&*!@#")).toBe("-----");
    });
  });

  describe("generatePrefixedTestId", () => {
    it("combines prefix with transformed text", () => {
      expect(generatePrefixedTestId("skill-chip", "React")).toBe("skill-chip-react");
      expect(generatePrefixedTestId("category-title", "Frontend & Styling")).toBe("category-title-frontend---styling");
    });

    it("works with various prefixes", () => {
      expect(generatePrefixedTestId("education-item", "University")).toBe("education-item-university");
      expect(generatePrefixedTestId("photo-item", "Dog Photo")).toBe("photo-item-dog-photo");
    });

    it("handles special characters in text with prefix", () => {
      expect(generatePrefixedTestId("skill-chip", "Node.js")).toBe("skill-chip-node-js");
      expect(generatePrefixedTestId("skill-chip", "C#")).toBe("skill-chip-c-");
    });
  });
});