import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimatedBox } from "../AnimatedBox";

describe("AnimatedBox", () => {
  it("renders children correctly", () => {
    render(
      <AnimatedBox data-testid="animated-box">
        <div>Test content</div>
      </AnimatedBox>
    );

    const animatedBox = screen.getByTestId("animated-box");
    expect(animatedBox).toBeInTheDocument();
    expect(animatedBox).toHaveTextContent("Test content");
  });

  it("applies visible styles when isVisible is true", () => {
    render(
      <AnimatedBox isVisible={true} data-testid="animated-box-visible">
        Content
      </AnimatedBox>
    );

    const animatedBox = screen.getByTestId("animated-box-visible");
    const styles = getComputedStyle(animatedBox);

    expect(styles.opacity).toBe("1");
    expect(styles.transform).toBe("translateY(0)");
  });

  it("applies hidden styles when isVisible is false", () => {
    render(
      <AnimatedBox isVisible={false} data-testid="animated-box-hidden">
        Content
      </AnimatedBox>
    );

    const animatedBox = screen.getByTestId("animated-box-hidden");
    const styles = getComputedStyle(animatedBox);

    expect(styles.opacity).toBe("0");
    expect(styles.transform).toBe("translateY(30px)");
  });

  it("applies default hidden styles when isVisible is undefined", () => {
    render(
      <AnimatedBox data-testid="animated-box-default">
        Content
      </AnimatedBox>
    );

    const animatedBox = screen.getByTestId("animated-box-default");
    const styles = getComputedStyle(animatedBox);

    // When isVisible is undefined, it should default to falsy behavior
    expect(styles.opacity).toBe("0");
    expect(styles.transform).toBe("translateY(30px)");
  });

  it("has correct transition property", () => {
    render(
      <AnimatedBox data-testid="animated-box-transition">
        Content
      </AnimatedBox>
    );

    const animatedBox = screen.getByTestId("animated-box-transition");
    const styles = getComputedStyle(animatedBox);

    expect(styles.transition).toContain("0.6s");
    expect(styles.transition).toContain("ease");
  });

  it("does not forward isVisible prop to DOM", () => {
    render(
      <AnimatedBox isVisible={true} data-testid="animated-box-prop-test">
        Content
      </AnimatedBox>
    );

    const animatedBox = screen.getByTestId("animated-box-prop-test");

    // The isVisible prop should not appear as an HTML attribute
    expect(animatedBox).not.toHaveAttribute("isVisible");
    expect(animatedBox).not.toHaveAttribute("isvisible");
  });
});