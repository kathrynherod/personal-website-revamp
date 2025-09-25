import resumeData from "@assets/resume.json";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import EducationItem from "../EducationItem";

const educationData = resumeData.education;

describe("EducationItem", () => {
  it("renders education item with correct content", () => {
    const testEdu = educationData[0];
    customRender(<EducationItem edu={testEdu} />);

    const institution = screen.getByTestId(
      `education-institution-${testEdu.id}`
    );
    const degree = screen.getByTestId(`education-degree-${testEdu.id}`);
    const year = screen.getByTestId(`education-year-${testEdu.id}`);

    expect(institution).toBeInTheDocument();
    expect(institution).toHaveTextContent(testEdu.institution);
    expect(institution.tagName.toLowerCase()).toBe("h4");

    expect(degree).toBeInTheDocument();
    expect(degree).toHaveTextContent(testEdu.degree);

    expect(year).toBeInTheDocument();
    expect(year).toHaveTextContent(testEdu.year);
  });

  it("renders all education items from resume data correctly", () => {
    educationData.forEach((edu) => {
      customRender(<EducationItem edu={edu} />);

      expect(
        screen.getByTestId(`education-item-${edu.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`education-institution-${edu.id}`)
      ).toHaveTextContent(edu.institution);
      expect(
        screen.getByTestId(`education-degree-${edu.id}`)
      ).toHaveTextContent(edu.degree);
      expect(screen.getByTestId(`education-year-${edu.id}`)).toHaveTextContent(
        edu.year
      );
    });
  });

  it("applies intersection observer for animation", () => {
    const testEdu = educationData[0];
    customRender(<EducationItem edu={testEdu} />);

    const educationItem = screen.getByTestId(`education-item-${testEdu.id}`);
    expect(educationItem).toBeInTheDocument();

    expect(educationItem).toBeInTheDocument();
  });
});
