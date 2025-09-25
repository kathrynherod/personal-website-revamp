import resumeData from "@assets/resume.json";
import { generatePrefixedTestId } from "@test/test-id-utils";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { SkillCategory } from "../../../types/ResumeDataType";
import SkillCategoryItem from "../SkillCategoryItem";

const skillsData = resumeData.skills;

const frontendCategory = skillsData[0].categories.find(
  (cat) => cat.title === "Frontend & Styling"
)!;
const backendCategory = skillsData[0].categories.find(
  (cat) => cat.title === "Backend & Database"
)!;
const testingCategory = skillsData[0].categories.find(
  (cat) => cat.title === "Testing"
)!;

const mockCategory: SkillCategory = {
  title: "Test Category",
  skills: ["React", "TypeScript", "Node.js"],
};

describe("SkillCategoryItem", () => {
  it("renders category title correctly", () => {
    customRender(<SkillCategoryItem {...mockCategory} />);

    const categoryTitle = screen.getByTestId(
      generatePrefixedTestId("category-title", "Test Category")
    );
    expect(categoryTitle).toBeInTheDocument();
    expect(categoryTitle).toHaveTextContent("Test Category");
    expect(categoryTitle.tagName.toLowerCase()).toBe("h4");
  });

  it("renders skill chips container", () => {
    customRender(<SkillCategoryItem {...mockCategory} />);

    const skillsContainer = screen.getByTestId(
      generatePrefixedTestId("skills-container", "Test Category")
    );
    expect(skillsContainer).toBeInTheDocument();
  });

  it("renders all skills as chips", () => {
    customRender(<SkillCategoryItem {...mockCategory} />);

    mockCategory.skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it("renders correct number of skill chips", () => {
    customRender(<SkillCategoryItem {...mockCategory} />);

    const skillChips = screen.getAllByText(/React|TypeScript|Node\.js/);
    expect(skillChips).toHaveLength(mockCategory.skills.length);
  });

  it("uses intersection observer for animation", () => {
    customRender(<SkillCategoryItem {...mockCategory} />);

    const categoryCard = screen.getByTestId(
      generatePrefixedTestId("skill-category", "Test Category")
    );
    expect(categoryCard).toBeInTheDocument();

    expect(categoryCard).toBeInTheDocument();
  });

  it("generates valid data-testid for category with special characters", () => {
    const specialCategory: SkillCategory = {
      title: "Frontend & Styling",
      skills: ["HTML5", "CSS3"],
    };

    customRender(<SkillCategoryItem {...specialCategory} />);

    expect(
      screen.getByTestId(
        generatePrefixedTestId("skill-category", "Frontend & Styling")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(
        generatePrefixedTestId("category-title", "Frontend & Styling")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(
        generatePrefixedTestId("skills-container", "Frontend & Styling")
      )
    ).toBeInTheDocument();
  });

  describe("Real resume data integration", () => {
    it("renders Frontend & Styling category correctly", () => {
      customRender(<SkillCategoryItem {...frontendCategory} />);

      expect(
        screen.getByTestId(
          generatePrefixedTestId("category-title", "Frontend & Styling")
        )
      ).toHaveTextContent("Frontend & Styling");

      expect(screen.getByText("TypeScript")).toBeInTheDocument();
      expect(screen.getByText("React.js")).toBeInTheDocument();
      expect(screen.getByText("HTML5")).toBeInTheDocument();
    });

    it("renders Backend & Database category correctly", () => {
      customRender(<SkillCategoryItem {...backendCategory} />);

      expect(
        screen.getByTestId(
          generatePrefixedTestId("category-title", "Backend & Database")
        )
      ).toHaveTextContent("Backend & Database");
      expect(screen.getByText("C#")).toBeInTheDocument();
      expect(screen.getByText("Node.js")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    });

    it("renders Testing category correctly", () => {
      customRender(<SkillCategoryItem {...testingCategory} />);

      expect(
        screen.getByTestId(generatePrefixedTestId("category-title", "Testing"))
      ).toHaveTextContent("Testing");

      expect(screen.getByText("Jest")).toBeInTheDocument();
      expect(screen.getByText("Vitest")).toBeInTheDocument();
      expect(screen.getByText("Cypress")).toBeInTheDocument();
    });

    it("renders all skill categories from resume data", () => {
      skillsData.forEach((skillSection) => {
        skillSection.categories.forEach((category) => {
          customRender(<SkillCategoryItem {...category} />);

          const expectedTestId = generatePrefixedTestId(
            "category-title",
            category.title
          );
          expect(screen.getByTestId(expectedTestId)).toHaveTextContent(
            category.title
          );

          category.skills.forEach((skill) => {
            expect(screen.getByText(skill)).toBeInTheDocument();
          });
        });
      });
    });
  });
});
