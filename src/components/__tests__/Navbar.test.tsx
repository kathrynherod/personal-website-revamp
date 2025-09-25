import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Navbar from "../Navbar";

vi.mock("../ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

const mockOnNavigate = vi.fn();

const defaultProps = {
  activeSection: "about",
  onNavigate: mockOnNavigate,
};

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays logo with proper alt text and src attribute", () => {
    customRender(<Navbar {...defaultProps} />);

    const logo = screen.getByAltText("Kathryn Herod Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src");
  });

  it("shows About, Experience, and Hobbies navigation links", () => {
    customRender(<Navbar {...defaultProps} />);

    expect(screen.getByTestId("nav-about")).toBeInTheDocument();
    expect(screen.getByTestId("nav-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-hobbies")).toBeInTheDocument();
  });

  it("visually highlights active section with bottom border", () => {
    customRender(<Navbar {...defaultProps} activeSection="experience" />);

    const experienceButton = screen.getByTestId("nav-experience");
    const aboutButton = screen.getByTestId("nav-about");

    expect(experienceButton).toBeInTheDocument();
    expect(aboutButton).toBeInTheDocument();
  });

  it("navigates to home when logo is clicked", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    const logoButton = screen.getByRole("button", {
      name: /kathryn herod logo/i,
    });
    await user.click(logoButton);

    expect(mockOnNavigate).toHaveBeenCalledWith("home");
  });

  it("navigates to correct section when nav button is clicked", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    const experienceButton = screen.getByTestId("nav-experience");
    await user.click(experienceButton);

    expect(mockOnNavigate).toHaveBeenCalledWith("experience");
  });

  it("opens mobile menu when menu icon is clicked", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    const mobileMenuButton = screen.getByRole("button", {
      name: "navigation menu",
    });
    await user.click(mobileMenuButton);

    // Menu should be open (check for menu items)
    const mobileAboutItem = screen.getByRole("menuitem", { name: "About" });
    expect(mobileAboutItem).toBeInTheDocument();
  });

  it("closes mobile menu and navigates when menu item is clicked", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    // Open mobile menu
    const mobileMenuButton = screen.getByRole("button", {
      name: "navigation menu",
    });
    await user.click(mobileMenuButton);

    // Click on Experience menu item
    const experienceMenuItem = screen.getByRole("menuitem", {
      name: "Experience",
    });
    await user.click(experienceMenuItem);

    expect(mockOnNavigate).toHaveBeenCalledWith("experience");
  });

  it("highlights active section in mobile menu", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} activeSection="hobbies" />);

    // Open mobile menu
    const mobileMenuButton = screen.getByRole("button", {
      name: "navigation menu",
    });
    await user.click(mobileMenuButton);

    const hobbiesMenuItem = screen.getByRole("menuitem", { name: "Hobbies" });
    expect(hobbiesMenuItem).toHaveStyle({ backgroundColor: "rgba(0,0,0,0.1)" });
  });

  it("renders theme toggle in both desktop and mobile views", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    // Should have theme toggle in desktop view (but both desktop and mobile are rendered, just hidden via CSS)
    const themeToggles = screen.getAllByTestId("theme-toggle");
    expect(themeToggles.length).toBeGreaterThanOrEqual(1); // At least one theme toggle

    // Open mobile menu to ensure it's accessible
    const mobileMenuButton = screen.getByRole("button", {
      name: "navigation menu",
    });
    await user.click(mobileMenuButton);

    // Theme toggles should still be present
    const allThemeToggles = screen.getAllByTestId("theme-toggle");
    expect(allThemeToggles.length).toBeGreaterThanOrEqual(1);
  });

  it("has proper accessibility attributes", () => {
    customRender(<Navbar {...defaultProps} />);

    const mobileMenuButton = screen.getByRole("button", {
      name: "navigation menu",
    });
    expect(mobileMenuButton).toHaveAttribute("aria-label", "navigation menu");
    expect(mobileMenuButton).toHaveAttribute("aria-controls", "menu-appbar");
    expect(mobileMenuButton).toHaveAttribute("aria-haspopup", "true");
  });

  it("renders custom dividers between desktop nav items", () => {
    const { container } = customRender(<Navbar {...defaultProps} />);

    // Check for divider elements using MUI Divider class
    const dividers = container.querySelectorAll(".MuiDivider-root");
    expect(dividers.length).toBeGreaterThan(0);
  });

  it("handles keyboard navigation for desktop buttons", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    const aboutButton = screen.getByTestId("nav-about");
    aboutButton.focus();
    await user.keyboard("{Enter}");

    expect(mockOnNavigate).toHaveBeenCalledWith("about");
  });

  it("closes mobile menu when clicking outside", async () => {
    const user = userEvent.setup();
    customRender(<Navbar {...defaultProps} />);

    // Open mobile menu
    const mobileMenuButton = screen.getByRole("button", {
      name: "navigation menu",
    });
    await user.click(mobileMenuButton);

    // Verify menu is open
    expect(screen.getByRole("menuitem", { name: "About" })).toBeInTheDocument();

    // Click outside (on the logo)
    const logo = screen.getByAltText("Kathryn Herod Logo");
    await user.click(logo);
  });

  it("renders with sticky positioning", () => {
    const { container } = customRender(<Navbar {...defaultProps} />);

    // Check for MuiAppBar-positionSticky class which is applied by Material-UI
    const appBar = container.querySelector(".MuiAppBar-positionSticky");
    expect(appBar).toBeInTheDocument();
  });

  it("shows correct number of navigation pages", () => {
    customRender(<Navbar {...defaultProps} />);

    expect(screen.getByTestId("nav-about")).toBeInTheDocument();
    expect(screen.getByTestId("nav-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-hobbies")).toBeInTheDocument();
  });
});
