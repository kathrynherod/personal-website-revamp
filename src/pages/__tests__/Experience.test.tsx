import resumeData from "@assets/resume.json";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Experience from "../Experience";

vi.mock("@hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: vi.fn(() => true),
}));

describe("Experience", () => {
  it("renders", () => {
    customRender(<Experience />);

    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("displays all job experiences with companies and titles from resume data", () => {
    customRender(<Experience />);

    const timelineElements = screen.getAllByTestId(/timeline-item-/);
    expect(timelineElements).toHaveLength(resumeData.experience.length);

    const mobileElements = screen.getAllByTestId(/mobile-experience-/);
    expect(mobileElements).toHaveLength(resumeData.experience.length);

    resumeData.experience.forEach((exp) => {
      expect(screen.getByTestId(`company-${exp.id}`)).toHaveTextContent(
        exp.company
      );
      expect(screen.getByTestId(`mobile-company-${exp.id}`)).toHaveTextContent(
        exp.company
      );
      expect(screen.getByTestId(`desktop-job-title`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`mobile-job-title-${exp.id}`)
      ).toHaveTextContent(exp.title);
    });
  });

  it("displays all skill categories from resume data", () => {
    customRender(<Experience />);

    resumeData.skills[0].categories.forEach((category) => {
      const testId = `skill-category-${category.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  it("displays all education institutions and degrees from resume data", () => {
    customRender(<Experience />);

    const educationElements = screen.getAllByTestId(/education-item-/);
    expect(educationElements).toHaveLength(resumeData.education.length);

    resumeData.education.forEach((edu) => {
      expect(
        screen.getByTestId(`education-institution-${edu.id}`)
      ).toHaveTextContent(edu.institution);
      expect(
        screen.getByTestId(`education-degree-${edu.id}`)
      ).toHaveTextContent(edu.degree);
    });
  });

  it("renders section with id 'experience'", () => {
    const { container } = customRender(<Experience />);

    const section = container.querySelector('section[id="experience"]');
    expect(section).toBeInTheDocument();
  });

  it("displays timeline, skills, and education components", () => {
    const { container } = customRender(<Experience />);

    const experienceSection = container.querySelector(
      'section[id="experience"]'
    );
    expect(experienceSection).toBeInTheDocument();

    const timeline = container.querySelector('[data-testid*="timeline"]');
    const skills = container.querySelector('[data-testid*="skill"]');
    const education = container.querySelector('[data-testid*="education"]');

    expect(timeline).toBeInTheDocument();
    expect(skills).toBeInTheDocument();
    expect(education).toBeInTheDocument();
  });

  it("displays 'Experience' heading", () => {
    customRender(<Experience />);

    const heading = screen.getByRole("heading", { name: "Experience" });
    expect(heading).toBeInTheDocument();
  });

  it("validates resume data structure and renders matching number of items", () => {
    expect(resumeData.experience).toBeDefined();
    expect(resumeData.skills).toBeDefined();
    expect(resumeData.education).toBeDefined();
    expect(Array.isArray(resumeData.experience)).toBe(true);
    expect(Array.isArray(resumeData.skills)).toBe(true);
    expect(Array.isArray(resumeData.education)).toBe(true);

    customRender(<Experience />);

    const timelineItems = screen.getAllByTestId(/timeline-item-/);
    expect(timelineItems).toHaveLength(resumeData.experience.length);
  });
});
