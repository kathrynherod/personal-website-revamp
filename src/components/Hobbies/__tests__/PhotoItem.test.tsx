import { customRender } from "@test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Photo } from "@types";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PhotoItem from "../PhotoItem";

const mockPhoto: Photo = {
  src: "/test-image.jpg",
  caption: "Test photo caption",
};

const mockOnPhotoClick = vi.fn();

describe("PhotoItem", () => {
  beforeEach(() => {
    mockOnPhotoClick.mockClear();
  });

  it("renders photo with correct content", () => {
    customRender(
      <PhotoItem
        photo={mockPhoto}
        index={0}
        baseDelay={0.2}
        onPhotoClick={mockOnPhotoClick}
      />
    );

    const photoItem = screen.getByTestId("photo-item-0");
    const photoImage = screen.getByTestId("photo-image-0");
    const photoCaption = screen.getByTestId("photo-caption-0");

    expect(photoItem).toBeInTheDocument();
    expect(photoImage).toBeInTheDocument();
    expect(photoImage).toHaveAttribute("src", mockPhoto.src);
    expect(photoImage).toHaveAttribute("alt", mockPhoto.caption);
    expect(photoCaption).toBeInTheDocument();
    expect(photoCaption).toHaveTextContent(mockPhoto.caption);
  });

  it("applies correct transition delay based on base delay and index", () => {
    customRender(
      <PhotoItem
        photo={mockPhoto}
        index={3}
        baseDelay={0.5}
        onPhotoClick={mockOnPhotoClick}
      />
    );

    const photoItem = screen.getByTestId("photo-item-3");
    const style = getComputedStyle(photoItem);

    // baseDelay (0.5) + index (3) * 0.1 = 0.8s
    expect(style.transitionDelay).toMatch(/0\.8/);
  });

  it("calls onPhotoClick when image is clicked", async () => {
    const user = userEvent.setup();
    customRender(
      <PhotoItem
        photo={mockPhoto}
        index={0}
        baseDelay={0}
        onPhotoClick={mockOnPhotoClick}
      />
    );

    const photoImage = screen.getByTestId("photo-image-0");
    await user.click(photoImage);

    expect(mockOnPhotoClick).toHaveBeenCalledTimes(1);
    expect(mockOnPhotoClick).toHaveBeenCalledWith(mockPhoto);
  });

  it("uses intersection observer for animation", () => {
    customRender(
      <PhotoItem
        photo={mockPhoto}
        index={0}
        baseDelay={0}
        onPhotoClick={mockOnPhotoClick}
      />
    );

    const photoItem = screen.getByTestId("photo-item-0");
    expect(photoItem).toBeInTheDocument();

    // Component should render without errors when using intersection observer
    expect(photoItem).toBeInTheDocument();
  });

  it("renders with different index values correctly", () => {
    const indices = [0, 1, 5, 10];

    indices.forEach((index) => {
      customRender(
        <PhotoItem
          photo={mockPhoto}
          index={index}
          baseDelay={0.1}
          onPhotoClick={mockOnPhotoClick}
        />
      );

      expect(screen.getByTestId(`photo-item-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`photo-image-${index}`)).toBeInTheDocument();
      expect(screen.getByTestId(`photo-caption-${index}`)).toBeInTheDocument();
    });
  });
});