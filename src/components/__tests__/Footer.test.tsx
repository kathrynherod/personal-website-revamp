import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Footer from "../Footer";

const mockDate = new Date(2024, 0, 1); // January 1, 2024
vi.setSystemTime(mockDate);

describe("Footer", () => {
  it("renders footer container", () => {
    customRender(<Footer />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
    expect(footer.tagName.toLowerCase()).toBe("footer");
  });

  it("displays current year in copyright text", () => {
    customRender(<Footer />);

    const footerText = screen.getByTestId("footer-text");
    expect(footerText).toHaveTextContent(
      "© 2024 Kathryn Herod. Built with React & TypeScript."
    );
  });

  it("renders all social media links", () => {
    customRender(<Footer />);

    const linkedinLink = screen.getByTestId("linkedin-link");
    const githubLink = screen.getByTestId("github-link");
    const emailLink = screen.getByTestId("email-link");

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
  });

  it("has correct LinkedIn link attributes", () => {
    customRender(<Footer />);

    const linkedinLink = screen.getByTestId("linkedin-link");
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/kathrynherod"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedinLink).toHaveAttribute("aria-label", "LinkedIn Profile");
  });

  it("has correct GitHub link attributes", () => {
    customRender(<Footer />);

    const githubLink = screen.getByTestId("github-link");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/kathrynherod"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(githubLink).toHaveAttribute("aria-label", "GitHub Profile");
  });

  it("has correct email link attributes", () => {
    customRender(<Footer />);

    const emailLink = screen.getByTestId("email-link");
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:kathryn.herod@gmail.com?subject=Your website caught my eye"
    );
    expect(emailLink).toHaveAttribute("target", "_blank");
    expect(emailLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(emailLink).toHaveAttribute("aria-label", "Send Email");
  });

  it("renders social links container", () => {
    customRender(<Footer />);

    const socialLinks = screen.getByTestId("social-links");
    expect(socialLinks).toBeInTheDocument();
  });

  it("renders footer content container", () => {
    customRender(<Footer />);

    const footerContent = screen.getByTestId("footer-content");
    expect(footerContent).toBeInTheDocument();
  });

  it("displays correct copyright text structure", () => {
    customRender(<Footer />);

    const footerText = screen.getByTestId("footer-text");
    expect(footerText).toHaveTextContent(
      /^© \d{4} Kathryn Herod\. Built with React & TypeScript\.$/
    );
  });

  it("updates year dynamically", () => {
    const futureDate = new Date(2025, 5, 15); // June 15, 2025
    vi.setSystemTime(futureDate);

    customRender(<Footer />);

    const footerText = screen.getByTestId("footer-text");
    expect(footerText).toHaveTextContent(
      "© 2025 Kathryn Herod. Built with React & TypeScript."
    );

    // Reset to original mock date
    vi.setSystemTime(mockDate);
  });

  it("has accessible social media icons", () => {
    customRender(<Footer />);

    // Check that all social links have proper ARIA labels
    expect(screen.getByLabelText("LinkedIn Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub Profile")).toBeInTheDocument();
    expect(screen.getByLabelText("Send Email")).toBeInTheDocument();
  });

  it("renders correct icon components", () => {
    customRender(<Footer />);

    const linkedinIcon = screen
      .getByTestId("linkedin-link")
      .querySelector("svg");
    const githubIcon = screen.getByTestId("github-link").querySelector("svg");
    const emailIcon = screen.getByTestId("email-link").querySelector("svg");

    expect(linkedinIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
    expect(emailIcon).toBeInTheDocument();
  });

  it("has correct email subject in mailto link", () => {
    customRender(<Footer />);

    const emailLink = screen.getByTestId("email-link");
    const href = emailLink.getAttribute("href");

    expect(href).toContain("subject=Your website caught my eye");
    expect(href).toContain("kathryn.herod@gmail.com");
  });

  it("maintains proper semantic structure", () => {
    customRender(<Footer />);

    const footer = screen.getByTestId("footer");
    expect(footer).toHaveRole("contentinfo");
  });

  it("renders with proper spacing and layout structure", () => {
    const { container } = customRender(<Footer />);

    const footerContent = screen.getByTestId("footer-content");
    const socialLinks = screen.getByTestId("social-links");

    expect(footerContent).toBeInTheDocument();
    expect(socialLinks).toBeInTheDocument();

    const footerElement = container.querySelector("footer");
    expect(footerElement).toBeInTheDocument();
  });
});
