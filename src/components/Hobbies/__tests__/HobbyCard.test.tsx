import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Hobby } from "@types";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HobbyCard from "../HobbyCard";

// Mock the PhotoDialog since it's tested separately
vi.mock("../PhotoDialog", () => ({
  default: ({ open, photo, onClose }: { open: boolean; photo: { src: string; caption: string } | null; onClose: () => void }) => (
    <div data-testid="photo-dialog-mock">
      {open && photo && <div data-testid="dialog-open">Dialog Open</div>}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const mockHobbyWithMultipleParagraphs: Hobby = {
  title: "Dog Rescue",
  icon: <div data-testid="hobby-icon">🐕</div>,
  description: [
    "First paragraph about dog rescue.",
    "Second paragraph with more details.",
    "Third paragraph with even more information.",
  ],
  photos: [
    { src: "/dog1.jpg", caption: "Rescue dog 1" },
    { src: "/dog2.jpg", caption: "Rescue dog 2" },
  ],
};

const mockHobbyWithSingleParagraph: Hobby = {
  title: "Photography",
  icon: <div data-testid="hobby-icon">📸</div>,
  description: ["Single paragraph about photography."],
};

const mockHobbyWithoutPhotos: Hobby = {
  title: "Reading",
  icon: <div data-testid="hobby-icon">📚</div>,
  description: ["I love reading books."],
};

describe("HobbyCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders hobby title and icon", () => {
    customRender(<HobbyCard hobby={mockHobbyWithSingleParagraph} index={0} />);

    expect(screen.getByTestId("hobby-title-0")).toHaveTextContent("Photography");
    expect(screen.getByTestId("hobby-icon")).toBeInTheDocument();
  });

  it("renders first paragraph by default", () => {
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    expect(screen.getByText("First paragraph about dog rescue.")).toBeInTheDocument();
  });

  it("shows expand button when there are multiple paragraphs", () => {
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    const expandButton = screen.getByTestId("expand-button-0");
    expect(expandButton).toBeInTheDocument();
    expect(expandButton).toHaveTextContent("Continue reading about dog rescue");
  });

  it("does not show expand button when there is only one paragraph", () => {
    customRender(<HobbyCard hobby={mockHobbyWithSingleParagraph} index={0} />);

    expect(screen.queryByTestId("expand-button-0")).not.toBeInTheDocument();
  });

  it("expands to show all paragraphs when expand button is clicked", async () => {
    const user = userEvent.setup();
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    // Initially only first paragraph should be visible
    expect(screen.getByText("First paragraph about dog rescue.")).toBeInTheDocument();
    expect(screen.queryByText("Second paragraph with more details.")).not.toBeInTheDocument();

    // Click expand button
    const expandButton = screen.getByTestId("expand-button-0");
    await user.click(expandButton);

    // Now all paragraphs should be visible
    expect(screen.getByText("First paragraph about dog rescue.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph with more details.")).toBeInTheDocument();
    expect(screen.getByText("Third paragraph with even more information.")).toBeInTheDocument();
  });

  it("shows collapse button when expanded", async () => {
    const user = userEvent.setup();
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    // Expand first
    const expandButton = screen.getByTestId("expand-button-0");
    await user.click(expandButton);

    // Should now show collapse button
    const collapseButton = screen.getByTestId("collapse-button-0");
    expect(collapseButton).toBeInTheDocument();
    expect(collapseButton).toHaveTextContent("Show less");
  });

  it("collapses back to first paragraph when collapse button is clicked", async () => {
    const user = userEvent.setup();
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    // Expand first
    await user.click(screen.getByTestId("expand-button-0"));

    // Then collapse
    await user.click(screen.getByTestId("collapse-button-0"));

    // Should be back to first paragraph only
    expect(screen.getByText("First paragraph about dog rescue.")).toBeInTheDocument();
    expect(screen.queryByText("Second paragraph with more details.")).not.toBeInTheDocument();
    expect(screen.getByTestId("expand-button-0")).toBeInTheDocument();
  });

  it("renders photo gallery when hobby has photos", () => {
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    const photoGallery = screen.getByTestId("photo-gallery-0");
    expect(photoGallery).toBeInTheDocument();
  });

  it("does not render photo gallery when hobby has no photos", () => {
    customRender(<HobbyCard hobby={mockHobbyWithoutPhotos} index={0} />);

    expect(screen.queryByTestId("photo-gallery-0")).not.toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    customRender(<HobbyCard hobby={mockHobbyWithMultipleParagraphs} index={0} />);

    const expandButton = screen.getByTestId("expand-button-0");
    expect(expandButton).toHaveAttribute("aria-expanded", "false");
    expect(expandButton).toHaveAttribute("aria-controls", "hobby-content-dog-rescue");
  });
});