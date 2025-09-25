import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Layout from "../Layout";

describe("Layout", () => {
  it("renders section title and children", () => {
    customRender(
      <Layout id="test-section" sectionTitle="Test Section">
        <div>Test content</div>
      </Layout>
    );

    expect(screen.getByTestId("section-title")).toHaveTextContent("Test Section");
    expect(screen.getByTestId("section-content")).toHaveTextContent("Test content");
  });

  it("uses correct heading level for section title", () => {
    customRender(
      <Layout id="test-section" sectionTitle="About Me">
        <div>Content</div>
      </Layout>
    );

    const heading = screen.getByTestId("section-title");
    expect(heading).toHaveTextContent("About Me");
    expect(heading.tagName.toLowerCase()).toBe("h2");
  });

  it("sets correct id on section element", () => {
    customRender(
      <Layout id="about" sectionTitle="About">
        <div>Content</div>
      </Layout>
    );

    const section = screen.getByTestId("section-about");
    expect(section).toHaveAttribute("id", "about");
  });
});
