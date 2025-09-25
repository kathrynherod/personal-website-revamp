import resumeData from "@assets/resume.json";
import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import JobExperienceTimeline from "../JobExperienceTimeline";

vi.mock("@hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: vi.fn(() => true),
}));

const experienceData = resumeData.experience;

describe("JobExperienceTimeline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all experience items from resume data", () => {
    customRender(<JobExperienceTimeline />);

    experienceData.forEach((exp) => {
      expect(screen.getByTestId(`timeline-item-${exp.id}`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`timeline-marker-${exp.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`mobile-experience-${exp.id}`)
      ).toBeInTheDocument();
    });
  });

  it("displays company names and durations for all experiences", () => {
    customRender(<JobExperienceTimeline />);

    experienceData.forEach((exp) => {
      expect(screen.getByTestId(`company-${exp.id}`)).toHaveTextContent(
        exp.company
      );
      expect(screen.getByTestId(`duration-${exp.id}`)).toHaveTextContent(
        exp.duration
      );
    });
  });

  it("shows first experience as active by default", () => {
    customRender(<JobExperienceTimeline />);

    const firstExperience = experienceData[0];

    // Desktop view should show first experience details
    expect(screen.getByTestId("desktop-job-title")).toHaveTextContent(
      firstExperience.title
    );
    expect(screen.getByTestId("desktop-company")).toHaveTextContent(
      firstExperience.company
    );
    expect(screen.getByTestId("desktop-duration")).toHaveTextContent(
      `${firstExperience.duration} • ${firstExperience.location}`
    );
  });

  it("renders mobile experience items with correct content", () => {
    customRender(<JobExperienceTimeline />);

    experienceData.forEach((exp) => {
      expect(
        screen.getByTestId(`mobile-job-title-${exp.id}`)
      ).toHaveTextContent(exp.title);
      expect(screen.getByTestId(`mobile-company-${exp.id}`)).toHaveTextContent(
        exp.company
      );
      expect(screen.getByTestId(`mobile-duration-${exp.id}`)).toHaveTextContent(
        `${exp.duration} • ${exp.location}`
      );
    });
  });

  it("changes active experience when timeline item is clicked", async () => {
    const user = userEvent.setup();
    customRender(<JobExperienceTimeline />);

    // Initially first experience should be active
    const firstExperience = experienceData[0];
    const secondExperience = experienceData[1];

    expect(screen.getByTestId("desktop-job-title")).toHaveTextContent(
      firstExperience.title
    );

    // Click on second timeline item
    const secondTimelineItem = screen.getByTestId(
      `timeline-item-${secondExperience.id}`
    );
    await user.click(secondTimelineItem);

    // Desktop view should now show second experience
    expect(screen.getByTestId("desktop-job-title")).toHaveTextContent(
      secondExperience.title
    );
    expect(screen.getByTestId("desktop-company")).toHaveTextContent(
      secondExperience.company
    );
  });

  it("renders desktop experience details", () => {
    customRender(<JobExperienceTimeline />);

    const desktopDetails = screen.getByTestId("desktop-experience-details");
    expect(desktopDetails).toBeInTheDocument();
    expect(screen.getByTestId("desktop-job-title")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-company")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-duration")).toBeInTheDocument();
  });

  it("renders responsibilities for active experience", () => {
    customRender(<JobExperienceTimeline />);

    const firstExperience = experienceData[0];

    // Check that first responsibility is rendered (more efficient than checking all)
    const firstResponsibility = firstExperience.responsibilities[0];
    const responsibilities = screen.getAllByText(firstResponsibility);
    expect(responsibilities.length).toBeGreaterThan(0);
  });

  it("updates responsibilities when active experience changes", async () => {
    const user = userEvent.setup();
    customRender(<JobExperienceTimeline />);

    const firstExperience = experienceData[0];
    const secondExperience = experienceData[1];

    // Check first experience responsibility is present
    const firstResponsibility = firstExperience.responsibilities[0];
    expect(screen.getAllByText(firstResponsibility).length).toBeGreaterThan(0);

    // Click to switch to second experience
    await user.click(
      screen.getByTestId(`timeline-item-${secondExperience.id}`)
    );

    // Check second experience responsibility is present
    const secondResponsibility = secondExperience.responsibilities[0];
    expect(screen.getAllByText(secondResponsibility).length).toBeGreaterThan(0);
  });

  it("renders correct number of experience items", () => {
    customRender(<JobExperienceTimeline />);

    const timelineItems = screen.getAllByTestId(/^timeline-item-\d+$/);
    const mobileItems = screen.getAllByTestId(/^mobile-experience-\d+$/);

    expect(timelineItems).toHaveLength(experienceData.length);
    expect(mobileItems).toHaveLength(experienceData.length);
  });

  it("uses intersection observer for mobile experience items", () => {
    customRender(<JobExperienceTimeline />);

    // Mobile experience items should render without errors
    // (intersection observer is mocked in our test setup)
    experienceData.forEach((exp) => {
      expect(
        screen.getByTestId(`mobile-experience-${exp.id}`)
      ).toBeInTheDocument();
    });
  });
});
