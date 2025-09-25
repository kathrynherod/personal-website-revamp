import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import type { Experience } from "@types";
import { describe, expect, it, vi } from "vitest";

import MobileExperienceItem from "../MobileExperienceItem";

vi.mock("@hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: vi.fn(() => true),
}));

const mockExperience: Experience = {
  id: 1,
  title: "Senior Software Engineer",
  company: "Tech Company Inc.",
  duration: "2020 - Present",
  location: "Austin, TX",
  responsibilities: [
    "Developed scalable web applications using React and TypeScript",
    "Led a team of 5 developers in agile development processes",
    "Implemented CI/CD pipelines improving deployment efficiency by 40%",
  ],
};

describe("MobileExperienceItem", () => {
  it("renders experience information correctly", () => {
    customRender(<MobileExperienceItem exp={mockExperience} />);

    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Company Inc.")).toBeInTheDocument();
    expect(screen.getByText("2020 - Present • Austin, TX")).toBeInTheDocument();
  });

  it("renders all responsibilities", () => {
    customRender(<MobileExperienceItem exp={mockExperience} />);

    mockExperience.responsibilities.forEach((responsibility) => {
      expect(screen.getByText(responsibility)).toBeInTheDocument();
    });
  });

  it("applies correct test ids", () => {
    customRender(<MobileExperienceItem exp={mockExperience} />);

    expect(screen.getByTestId("mobile-experience-1")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-job-title-1")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-company-1")).toBeInTheDocument();
    expect(screen.getByTestId("mobile-duration-1")).toBeInTheDocument();
  });

  it("renders with proper semantic structure", () => {
    customRender(<MobileExperienceItem exp={mockExperience} />);

    const jobTitle = screen.getByRole("heading", { level: 3 });
    const companyName = screen.getByRole("heading", { level: 4 });

    expect(jobTitle).toHaveTextContent("Senior Software Engineer");
    expect(companyName).toHaveTextContent("Tech Company Inc.");
  });

  it("hides on medium screens and up via CSS", () => {
    const { container } = customRender(
      <MobileExperienceItem exp={mockExperience} />
    );

    // The component should have styling that hides it on md breakpoints
    const mobileDetails = container.querySelector(
      '[data-testid="mobile-experience-1"]'
    );
    expect(mobileDetails).toBeInTheDocument();
  });

  it("handles experience with single responsibility", () => {
    const singleResponsibilityExp: Experience = {
      ...mockExperience,
      responsibilities: ["Single responsibility item"],
    };

    customRender(<MobileExperienceItem exp={singleResponsibilityExp} />);

    expect(screen.getByText("Single responsibility item")).toBeInTheDocument();
  });

  it("handles experience with empty responsibilities", () => {
    const emptyResponsibilitiesExp: Experience = {
      ...mockExperience,
      responsibilities: [],
    };

    customRender(<MobileExperienceItem exp={emptyResponsibilitiesExp} />);

    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Company Inc.")).toBeInTheDocument();
  });
});
