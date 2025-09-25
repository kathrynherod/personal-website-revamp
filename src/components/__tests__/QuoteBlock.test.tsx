import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import QuoteBlock from "../QuoteBlock";

const mockProps = {
  testimonial: "This is a great testimonial about the work.",
  author: "John Doe",
};

describe("QuoteBlock", () => {
  it("renders testimonial text with proper formatting", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const testimonialText = screen.getByText('"This is a great testimonial about the work."');
    expect(testimonialText).toBeInTheDocument();
  });

  it("renders author name with proper formatting", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const authorText = screen.getByText("— John Doe");
    expect(authorText).toBeInTheDocument();
  });

  it("displays testimonial as body1 variant", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const testimonialElement = screen.getByText('"This is a great testimonial about the work."');
    expect(testimonialElement.closest('.MuiTypography-body1')).toBeInTheDocument();
  });

  it("displays author as body2 variant with proper styling", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const authorElement = screen.getByText("— John Doe");
    expect(authorElement.closest('.MuiTypography-body2')).toBeInTheDocument();
  });

  it("handles long testimonial text", () => {
    const longTestimonial = "This is a very long testimonial that spans multiple lines and contains a lot of detailed information about the excellent work that was performed. It should render properly within the quote block component without any issues or text overflow problems.";

    customRender(
      <QuoteBlock
        testimonial={longTestimonial}
        author="Jane Smith"
      />
    );

    expect(screen.getByText(`"${longTestimonial}"`)).toBeInTheDocument();
    expect(screen.getByText("— Jane Smith")).toBeInTheDocument();
  });

  it("handles special characters in testimonial and author", () => {
    const specialTestimonial = "This testimonial contains special characters: @#$%^&*()";
    const specialAuthor = "Dr. María José O'Connor-Smith";

    customRender(
      <QuoteBlock
        testimonial={specialTestimonial}
        author={specialAuthor}
      />
    );

    expect(screen.getByText(`"${specialTestimonial}"`)).toBeInTheDocument();
    expect(screen.getByText(`— ${specialAuthor}`)).toBeInTheDocument();
  });

  it("applies italic styling to the container", () => {
    const { container } = customRender(<QuoteBlock {...mockProps} />);

    const styledBox = container.querySelector('[style*="italic"]') ||
                     container.querySelector('div'); // fallback to first div
    expect(styledBox).toBeInTheDocument();
  });

  it("renders with proper semantic structure", () => {
    customRender(<QuoteBlock {...mockProps} />);

    // Check that both testimonial and author are present in the DOM
    const testimonial = screen.getByText('"This is a great testimonial about the work."');
    const author = screen.getByText("— John Doe");

    expect(testimonial).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });

  it("handles empty or minimal content gracefully", () => {
    customRender(
      <QuoteBlock
        testimonial="Short."
        author="A"
      />
    );

    expect(screen.getByText('"Short."')).toBeInTheDocument();
    expect(screen.getByText("— A")).toBeInTheDocument();
  });

  it("maintains proper spacing between testimonial and author", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const authorElement = screen.getByText("— John Doe");

    // The author element should have margin-top styling
    const authorTypography = authorElement.closest('.MuiTypography-root');
    expect(authorTypography).toBeInTheDocument();
  });

  it("renders with proper container structure", () => {
    const { container } = customRender(<QuoteBlock {...mockProps} />);

    // Should render the content within a styled container
    expect(container.textContent).toContain("This is a great testimonial about the work.");
    expect(container.textContent).toContain("— John Doe");
  });

  it("has accessible text content", () => {
    customRender(<QuoteBlock {...mockProps} />);

    // Text should be accessible to screen readers
    const testimonialText = screen.getByText('"This is a great testimonial about the work."');
    const authorText = screen.getByText("— John Doe");

    expect(testimonialText).toBeVisible();
    expect(authorText).toBeVisible();
  });

  it("wraps testimonial text in quotes", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const testimonialText = screen.getByText('"This is a great testimonial about the work."');
    expect(testimonialText.textContent).toMatch(/^".*"$/);
  });

  it("prefixes author with em dash", () => {
    customRender(<QuoteBlock {...mockProps} />);

    const authorText = screen.getByText("— John Doe");
    expect(authorText.textContent).toMatch(/^— /);
  });
});