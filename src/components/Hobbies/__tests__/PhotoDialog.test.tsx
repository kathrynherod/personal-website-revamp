import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Photo } from "@types";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PhotoDialog from "../PhotoDialog";

const mockPhoto: Photo = {
  src: "/test-image.jpg",
  caption: "Test photo caption",
};

const mockOnClose = vi.fn();

describe("PhotoDialog", () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("renders dialog when open is true", () => {
    customRender(
      <PhotoDialog photo={mockPhoto} open={true} onClose={mockOnClose} />
    );

    expect(screen.getByTestId("photo-dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();
  });

  it("does not render dialog content when open is false", () => {
    customRender(
      <PhotoDialog photo={mockPhoto} open={false} onClose={mockOnClose} />
    );

    // Dialog should not be visible when open is false
    expect(screen.queryByTestId("dialog-image")).not.toBeInTheDocument();
    expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
  });

  it("renders photo image when photo is provided", () => {
    customRender(
      <PhotoDialog photo={mockPhoto} open={true} onClose={mockOnClose} />
    );

    const image = screen.getByTestId("dialog-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockPhoto.src);
    expect(image).toHaveAttribute("alt", mockPhoto.caption);
  });

  it("does not render image when photo is null", () => {
    customRender(
      <PhotoDialog photo={null} open={true} onClose={mockOnClose} />
    );

    expect(screen.queryByTestId("dialog-image")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    customRender(
      <PhotoDialog photo={mockPhoto} open={true} onClose={mockOnClose} />
    );

    const closeButton = screen.getByTestId("close-button");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when escape key is pressed", async () => {
    const user = userEvent.setup();
    customRender(
      <PhotoDialog photo={mockPhoto} open={true} onClose={mockOnClose} />
    );

    // Press escape key to close dialog
    await user.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("has correct accessibility attributes", () => {
    customRender(
      <PhotoDialog photo={mockPhoto} open={true} onClose={mockOnClose} />
    );

    const dialog = screen.getByTestId("photo-dialog");
    const closeButton = screen.getByTestId("close-button");

    // Material-UI Dialog uses role="presentation" by default
    expect(dialog).toHaveAttribute("role", "presentation");
    expect(closeButton).toHaveAttribute("type", "button");
  });
});