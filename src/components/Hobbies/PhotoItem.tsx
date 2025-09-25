import { styled, Typography } from "@mui/material";
import { useRef } from "react";

import { INTERSECTION_OBSERVER_CONFIG } from "../../constants/intersectionObserver";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { Photo } from "../../types/HobbiesTypes";
import { AnimatedBox } from "../shared/AnimatedBox";

const PhotoContainer = styled(AnimatedBox)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PhotoImage = styled("img")`
  aspect-ratio: 1;
  border: 2px solid ${({ theme }) => theme.palette.primary.main}20;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    border-color: ${({ theme }) => theme.palette.primary.main}60;
  }
`;

const PhotoCaption = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
`;

type PhotoItemProps = {
  baseDelay: number;
  index: number;
  onPhotoClick: (photo: Photo) => void;
  photo: Photo;
};

export default function PhotoItem({
  photo,
  index,
  baseDelay,
  onPhotoClick,
}: PhotoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, INTERSECTION_OBSERVER_CONFIG);

  return (
    <PhotoContainer
      ref={ref}
      isVisible={isVisible}
      style={{
        transitionDelay: `${baseDelay + index * 0.1}s`,
      }}
      data-testid={`photo-item-${index}`}
    >
      <PhotoImage
        src={photo.src}
        alt={photo.caption}
        onClick={() => onPhotoClick(photo)}
        data-testid={`photo-image-${index}`}
      />
      <PhotoCaption variant="caption" data-testid={`photo-caption-${index}`}>
        {photo.caption}
      </PhotoCaption>
    </PhotoContainer>
  );
}
