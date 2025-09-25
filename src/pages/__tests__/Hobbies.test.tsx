import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Hobbies from "../Hobbies";

vi.mock("@hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: vi.fn(() => true),
}));

describe("Hobbies", () => {
  it("renders", () => {
    customRender(<Hobbies />);

    expect(screen.getByText("Hobbies & Interests")).toBeInTheDocument();
  });

  it("renders all hobby items", () => {
    customRender(<Hobbies />);

    expect(screen.getByText("German Shepherd Rescue")).toBeInTheDocument();
    expect(screen.getByText("Wood Working")).toBeInTheDocument();
    expect(screen.getByText("French Horn")).toBeInTheDocument();
  });

  it("renders hobby descriptions", () => {
    customRender(<Hobbies />);

    expect(
      screen.getByText(/My journey with dog rescue started/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I got really into woodworking/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I've been playing French Horn/i)
    ).toBeInTheDocument();
  });

  it("renders hobby images and captions", () => {
    customRender(<Hobbies />);

    expect(
      screen.getByText("Portia - Our first rescue (2016)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Olive - Our second rescue (2019)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Some of our foster dogs over the years")
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Montessori shelf I built for my son")
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Murphy bed, shelves, and wainscotting in my office")
    ).toBeInTheDocument();
  });

  it("displays Material-UI icons for each hobby", () => {
    const { container } = customRender(<Hobbies />);

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("renders section with id 'hobbies'", () => {
    const { container } = customRender(<Hobbies />);

    const section = container.querySelector('section[id="hobbies"]');
    expect(section).toBeInTheDocument();
  });

  it("uses Stack component for layout", () => {
    const { container } = customRender(<Hobbies />);

    const stackContainer =
      container.querySelector('[class*="MuiStack"]') ||
      container.querySelector("div");
    expect(stackContainer).toBeInTheDocument();
  });

  it("displays 'Hobbies & Interests' heading", () => {
    customRender(<Hobbies />);

    const heading = screen.getByRole("heading", {
      name: "Hobbies & Interests",
    });
    expect(heading).toBeInTheDocument();
  });

  it("displays all three hobby titles", () => {
    customRender(<Hobbies />);

    const hobbyTitles = [
      "German Shepherd Rescue",
      "Wood Working",
      "French Horn",
    ];

    hobbyTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("displays all image captions", () => {
    customRender(<Hobbies />);

    const captions = [
      "Portia - Our first rescue (2016)",
      "Olive - Our second rescue (2019)",
      "Some of our foster dogs over the years",
      "The Montessori shelf I built for my son",
      "The Murphy bed, shelves, and wainscotting in my office",
    ];

    captions.forEach((caption) => {
      expect(screen.getByText(caption)).toBeInTheDocument();
    });
  });
});
