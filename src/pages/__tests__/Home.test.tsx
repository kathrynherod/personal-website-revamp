import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../Home";

describe("Home", () => {
  it("renders the main heading with correct text", () => {
    customRender(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("kathrynherod");
  });

  it("renders the subtitle with correct text and styling", () => {
    customRender(<Home />);

    const subtitle = screen.getByRole("heading", { level: 2 });
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent("Full-Stack Software Engineer");
  });

  it("renders section with id 'home'", () => {
    const { container } = customRender(<Home />);

    const section = container.querySelector('section[id="home"]');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("id", "home");
  });

  it("renders main heading as h1 variant", () => {
    customRender(<Home />);

    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it("renders subtitle as h2 variant", () => {
    customRender(<Home />);

    const subtitle = screen.getByRole("heading", { level: 2 });
    expect(subtitle).toBeInTheDocument();
  });

  it("displays name with line break between first and last name", () => {
    customRender(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.textContent).toContain("kathryn");
    expect(heading.textContent).toContain("herod");

    const brElement = heading.querySelector("br");
    expect(brElement).toBeInTheDocument();
  });

  it("renders section containing content wrapper div", () => {
    const { container } = customRender(<Home />);

    const homeSection = container.querySelector('section[id="home"]');
    expect(homeSection).toBeInTheDocument();

    const contentWrapper = homeSection?.querySelector("div");
    expect(contentWrapper).toBeInTheDocument();
  });

  it("uses Material-UI Typography for main heading", () => {
    customRender(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.className).toContain("MuiTypography");
  });

  it("renders container with flex display for full height layout", () => {
    const { container } = customRender(<Home />);

    const section = container.querySelector('section[id="home"]');
    expect(section).toBeInTheDocument();

    const computedStyle = window.getComputedStyle(section!);
    expect(computedStyle.display).toBe("flex");
  });

  it("uses flex layout for content centering", () => {
    const { container } = customRender(<Home />);

    const section = container.querySelector('section[id="home"]');
    expect(section).toBeInTheDocument();

    const computedStyle = window.getComputedStyle(section!);
    expect(computedStyle.display).toBe("flex");
  });

  it("maintains proper heading hierarchy (h1 before h2)", () => {
    customRender(<Home />);

    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();

    const headings = screen.getAllByRole("heading");
    expect(headings[0]).toBe(h1);
    expect(headings[1]).toBe(h2);
  });

  it("applies secondary color to subtitle for proper contrast", () => {
    customRender(<Home />);

    const subtitle = screen.getByRole("heading", { level: 2 });

    expect(subtitle.className).toContain("MuiTypography");
  });

  it("maintains layout structure", () => {
    const { container } = customRender(<Home />);

    const section = container.querySelector('section[id="home"]');
    const contentDiv = section?.querySelector("div");
    const heading = contentDiv?.querySelector("h1");
    const subtitle = contentDiv?.querySelector("h2");

    expect(section).toBeInTheDocument();
    expect(contentDiv).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it("uses proper Material-UI components", () => {
    customRender(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    const subtitle = screen.getByRole("heading", { level: 2 });

    expect(heading.className).toMatch(/MuiTypography/);
    expect(subtitle.className).toMatch(/MuiTypography/);
  });
});
