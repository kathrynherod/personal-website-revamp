import resumeData from "@assets/resume.json";
import { generatePrefixedTestId } from "@test/test-id-utils";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SkillChip from "../SkillChip";

describe("SkillChip", () => {
  it("renders skill name", () => {
    customRender(<SkillChip skill="React" index={0} isVisible={true} />);

    const chip = screen.getByTestId(
      generatePrefixedTestId("skill-chip", "React")
    );
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveTextContent("React");
  });

  it("applies animation class when visible", () => {
    customRender(<SkillChip skill="TypeScript" index={1} isVisible={true} />);

    const chip = screen.getByTestId(
      generatePrefixedTestId("skill-chip", "TypeScript")
    );
    expect(chip).toHaveClass("animate-in");
  });

  it("does not apply animation class when not visible", () => {
    customRender(<SkillChip skill="JavaScript" index={0} isVisible={false} />);

    const chip = screen.getByTestId(
      generatePrefixedTestId("skill-chip", "JavaScript")
    );
    expect(chip).not.toHaveClass("animate-in");
  });

  it("applies correct animation delay based on index", () => {
    customRender(<SkillChip skill="Node.js" index={3} isVisible={true} />);

    const chip = screen.getByTestId(
      generatePrefixedTestId("skill-chip", "Node.js")
    );
    // Check that the delay contains the expected value (accounting for floating point precision)
    const style = getComputedStyle(chip as Element);
    expect(style.animationDelay).toMatch(/0\.3/);
  });

  it("generates valid data-testid for all resume skills", () => {
    // Get a sample of skills with various special characters from resume data
    const allSkills = resumeData.skills.flatMap((skill) =>
      skill.categories.flatMap((category) => category.skills)
    );

    // Test a representative sample including ones with special characters
    const testSkills = [
      "Node.js",
      "C#",
      ".NET",
      "ASP.NET",
      "REST APIs",
      "HTML5",
      "CSS3",
    ].filter((skill) => allSkills.includes(skill));

    testSkills.forEach((skill) => {
      customRender(<SkillChip skill={skill} index={0} isVisible={true} />);

      const expectedTestId = generatePrefixedTestId("skill-chip", skill);

      const chip = screen.getByTestId(expectedTestId);
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveTextContent(skill);
    });
  });
});
