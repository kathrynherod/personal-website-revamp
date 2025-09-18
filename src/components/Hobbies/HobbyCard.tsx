import { Box, styled, Typography } from "@mui/material";
import { useRef, useState } from "react";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { Hobby, Photo } from "../../pages/Hobbies";
import PhotoDialog from "./PhotoDialog";

const HobbyCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible: boolean }>`
  margin-top: ${({ theme }) => theme.spacing(3)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.3s ease;
`;

const HobbyHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  & svg {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 2rem;
  }
`;

const HobbyTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 700;
` as typeof Typography;

const HobbyDescription = styled(Typography)`
  line-height: 1.7;
  text-align: left;
`;

const PhotoGallery = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const PhotoContainer = styled(Box)`
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
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
  font-style: italic;
`;

export default function HobbyItem({
  hobby,
  index,
}: {
  hobby: Hobby;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseDialog = () => {
    setSelectedPhoto(null);
  };

  return (
    <HobbyCard
      ref={ref}
      isVisible={isVisible}
      style={{
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <HobbyHeader>
        {hobby.icon}
        <HobbyTitle variant="h5" component="h3">
          {hobby.title}
        </HobbyTitle>
      </HobbyHeader>

      {Array.isArray(hobby.description) ? (
        hobby.description.map((paragraph, paragraphIndex) => (
          <HobbyDescription key={paragraphIndex} variant="body1" sx={{ mb: 2 }}>
            {paragraph}
          </HobbyDescription>
        ))
      ) : (
        <HobbyDescription variant="body1">{hobby.description}</HobbyDescription>
      )}

      {hobby.photos && (
        <PhotoGallery>
          {hobby.photos.map((photo, photoIndex) => (
            <PhotoContainer key={photoIndex}>
              <PhotoImage
                src={photo.src}
                alt={photo.caption}
                onClick={() => handlePhotoClick(photo)}
              />
              <PhotoCaption variant="caption">{photo.caption}</PhotoCaption>
            </PhotoContainer>
          ))}
        </PhotoGallery>
      )}

      <PhotoDialog
        photo={selectedPhoto}
        open={!!selectedPhoto}
        onClose={handleCloseDialog}
      />
    </HobbyCard>
  );
}
