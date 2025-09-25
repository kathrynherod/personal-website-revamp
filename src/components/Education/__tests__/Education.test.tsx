import resumeData from "@assets/resume.json";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Education from "../Education";

const educationData = resumeData.education;

describe("Education", () => {
  it("renders education title", () => {
    customRender(<Education />);

    const title = screen.getByTestId("education-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Education & Certifications");
    expect(title.tagName.toLowerCase()).toBe("h3");
  });

  it("renders education list container", () => {
    customRender(<Education />);

    const list = screen.getByTestId("education-list");
    expect(list).toBeInTheDocument();
  });

  it("renders all education items from resume data", () => {
    customRender(<Education />);

    educationData.forEach((edu) => {
      const educationItem = screen.getByTestId(`education-item-${edu.id}`);
      expect(educationItem).toBeInTheDocument();
    });
  });

  it("renders correct number of education items", () => {
    customRender(<Education />);

    const educationItems = screen.getAllByTestId(/^education-item-\d+$/);
    expect(educationItems).toHaveLength(educationData.length);
  });
});