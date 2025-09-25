import resumeData from "@assets/resume.json";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Skills from "../Skills";

const skillsData = resumeData.skills;

describe("Skills", () => {
  it("renders all skill sections from resume data", () => {
    customRender(<Skills />);

    skillsData.forEach((skill) => {
      const sectionTitle = screen.getByTestId(`skills-section-title-${skill.id}`);
      expect(sectionTitle).toBeInTheDocument();
      expect(sectionTitle).toHaveTextContent(skill.title);
    });
  });

  it("renders skills grids for all sections", () => {
    customRender(<Skills />);

    skillsData.forEach((skill) => {
      const skillsGrid = screen.getByTestId(`skills-grid-${skill.id}`);
      expect(skillsGrid).toBeInTheDocument();
    });
  });

  it("uses correct heading level for section titles", () => {
    customRender(<Skills />);

    skillsData.forEach((skill) => {
      const sectionTitle = screen.getByTestId(`skills-section-title-${skill.id}`);
      expect(sectionTitle.tagName.toLowerCase()).toBe("h3");
    });
  });

  it("renders all skill categories from resume data", () => {
    customRender(<Skills />);

    skillsData.forEach((skill) => {
      skill.categories.forEach((category) => {
        expect(screen.getByText(category.title)).toBeInTheDocument();
      });
    });
  });

  it("renders all individual skills from resume data", () => {
    customRender(<Skills />);

    skillsData.forEach((skill) => {
      skill.categories.forEach((category) => {
        category.skills.forEach((skillName) => {
          expect(screen.getByText(skillName)).toBeInTheDocument();
        });
      });
    });
  });
});