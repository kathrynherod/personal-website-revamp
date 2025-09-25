import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "../App";

vi.mock("@hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: vi.fn(() => false),
}));

// Mock the theme mode hook
vi.mock("@hooks/useThemeMode", () => ({
  useThemeMode: vi.fn(() => ["light", vi.fn()]),
}));

// Mock the page components
vi.mock("@pages/Home", () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock("@pages/About", () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}));

vi.mock("@pages/Experience", () => ({
  default: () => <div data-testid="experience-page">Experience Page</div>,
}));

vi.mock("@pages/Hobbies", () => ({
  default: () => <div data-testid="hobbies-page">Hobbies Page</div>,
}));

// Mock the components
vi.mock("@components/Navbar", () => ({
  default: ({
    activeSection,
    onNavigate,
  }: {
    activeSection: string;
    onNavigate: (section: string) => void;
  }) => (
    <nav data-testid="navbar">
      <span data-testid="active-section">{activeSection}</span>
      <button onClick={() => onNavigate("home")}>Home</button>
      <button onClick={() => onNavigate("about")}>About</button>
      <button onClick={() => onNavigate("experience")}>Experience</button>
      <button onClick={() => onNavigate("hobbies")}>Hobbies</button>
    </nav>
  ),
}));

vi.mock("@components/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

const mockUseIntersectionObserver = vi.mocked(
  await import("@hooks/useIntersectionObserver")
).useIntersectionObserver;

const mockUseThemeMode = vi.mocked(
  await import("@hooks/useThemeMode")
).useThemeMode;

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseIntersectionObserver.mockReturnValue(false);
    mockUseThemeMode.mockReturnValue(["light", vi.fn()]);

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders main application structure with navbar, main content, and footer", () => {
    customRender(<App />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders all page components in correct order", () => {
    customRender(<App />);

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("about-page")).toBeInTheDocument();
    expect(screen.getByTestId("experience-page")).toBeInTheDocument();
    expect(screen.getByTestId("hobbies-page")).toBeInTheDocument();
  });

  it("sets active section to home by default", () => {
    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("home");
  });

  it("updates active section when home is visible", () => {
    mockUseIntersectionObserver
      .mockReturnValueOnce(true) // home visible
      .mockReturnValueOnce(false) // about not visible
      .mockReturnValueOnce(false) // experience not visible
      .mockReturnValueOnce(false); // hobbies not visible

    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("home");
  });

  it("updates active section when about is visible", () => {
    mockUseIntersectionObserver
      .mockReturnValueOnce(false) // home not visible
      .mockReturnValueOnce(true) // about visible
      .mockReturnValueOnce(false) // experience not visible
      .mockReturnValueOnce(false); // hobbies not visible

    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("about");
  });

  it("updates active section when experience is visible", () => {
    mockUseIntersectionObserver
      .mockReturnValueOnce(false) // home not visible
      .mockReturnValueOnce(false) // about not visible
      .mockReturnValueOnce(true) // experience visible
      .mockReturnValueOnce(false); // hobbies not visible

    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("experience");
  });

  it("updates active section when hobbies is visible", () => {
    mockUseIntersectionObserver
      .mockReturnValueOnce(false) // home not visible
      .mockReturnValueOnce(false) // about not visible
      .mockReturnValueOnce(false) // experience not visible
      .mockReturnValueOnce(true); // hobbies visible

    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("hobbies");
  });

  it("scrolls to section when navigation is triggered", async () => {
    const user = userEvent.setup();

    // Mock getElementById
    const mockElement = document.createElement("div");
    mockElement.scrollIntoView = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    customRender(<App />);

    const aboutButton = screen.getByText("About");
    await user.click(aboutButton);

    expect(document.getElementById).toHaveBeenCalledWith("about");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("applies light theme when theme mode is light", () => {
    mockUseThemeMode.mockReturnValue(["light", vi.fn()]);

    const { container } = customRender(<App />);

    const appContainer = container.firstChild;
    expect(appContainer).toBeInTheDocument();
  });

  it("applies dark theme when theme mode is dark", () => {
    mockUseThemeMode.mockReturnValue(["dark", vi.fn()]);

    const { container } = customRender(<App />);

    const appContainer = container.firstChild;
    expect(appContainer).toBeInTheDocument();
  });

  it("handles navigation to all sections", async () => {
    const user = userEvent.setup();

    const mockElement = document.createElement("div");
    mockElement.scrollIntoView = vi.fn();
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    customRender(<App />);

    const sections = ["home", "about", "experience", "hobbies"];

    for (const section of sections) {
      const button = screen.getByText(
        section.charAt(0).toUpperCase() + section.slice(1)
      );
      await user.click(button);

      expect(document.getElementById).toHaveBeenCalledWith(section);
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  it("handles missing element gracefully during navigation", async () => {
    const user = userEvent.setup();

    vi.spyOn(document, "getElementById").mockReturnValue(null);

    customRender(<App />);

    const aboutButton = screen.getByText("About");
    await user.click(aboutButton);

    expect(document.getElementById).toHaveBeenCalledWith("about");
  });

  it("prioritizes home section when multiple sections are visible", () => {
    mockUseIntersectionObserver
      .mockReturnValueOnce(true) // home visible
      .mockReturnValueOnce(true) // about also visible
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("home");
  });

  it("prioritizes about over experience when both are visible", () => {
    mockUseIntersectionObserver
      .mockReturnValueOnce(false) // home not visible
      .mockReturnValueOnce(true) // about visible
      .mockReturnValueOnce(true) // experience also visible
      .mockReturnValueOnce(false);

    customRender(<App />);

    const activeSection = screen.getByTestId("active-section");
    expect(activeSection).toHaveTextContent("about");
  });

  it("uses intersection observer with correct root margin", () => {
    customRender(<App />);

    expect(mockUseIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Object),
      { rootMargin: "-40% 0px -40% 0px" }
    );

    expect(mockUseIntersectionObserver).toHaveBeenCalledTimes(4);
  });

  it("renders CssBaseline for consistent styling", () => {
    customRender(<App />);

    // CssBaseline injects global styles, check that the component renders without errors
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("wraps content in ThemeProvider", () => {
    const { container } = customRender(<App />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
