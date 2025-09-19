import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { Hobby, Photo } from "../../pages/Hobbies";
import PhotoDialog from "./PhotoDialog";

const AnimatedElement = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(20px)"};
  transition: all 0.5s ease;
`;

const HobbyCard = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const HobbyHeader = styled(AnimatedElement)`
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

const HobbyDescription = styled(AnimatedElement.withComponent(Typography))`
  line-height: 1.7;
  text-align: left;
`;

const PhotoGallery = styled(AnimatedElement)`
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

const ExpandButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  text-transform: none;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main}08;
  }
`;

export default function HobbyItem({
  hobby,
  index,
}: {
  hobby: Hobby;
  index: number;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const [paragraphVisibility, setParagraphVisibility] = useState<boolean[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const headerVisible = useIntersectionObserver(headerRef, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  const photosVisible = useIntersectionObserver(photosRef, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  // Set up intersection observers for paragraphs
  useEffect(() => {
    if (!Array.isArray(hobby.description)) return;

    const observers: IntersectionObserver[] = [];
    const elements = document.querySelectorAll(
      `[data-hobby-paragraph="${hobby.title}"]`
    );

    elements.forEach((element, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setParagraphVisibility((prev) => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [hobby.title, hobby.description]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseDialog = () => {
    setSelectedPhoto(null);
  };

  return (
    <HobbyCard>
      <HobbyHeader
        ref={headerRef}
        isVisible={headerVisible}
        style={{
          transitionDelay: `${index * 0.1}s`,
        }}
      >
        {hobby.icon}
        <HobbyTitle variant="h5" component="h3">
          {hobby.title}
        </HobbyTitle>
      </HobbyHeader>

      <Box
        id={`hobby-content-${hobby.title.replace(/\s+/g, "-").toLowerCase()}`}
        role="region"
        aria-labelledby={`hobby-title-${hobby.title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        {Array.isArray(hobby.description) ? (
          <>
            {hobby.description
              .slice(0, isExpanded ? hobby.description.length : 1)
              .map((paragraph, paragraphIndex) => (
                <HobbyDescription
                  key={paragraphIndex}
                  data-hobby-paragraph={hobby.title}
                  isVisible={
                    paragraphIndex === 0
                      ? paragraphVisibility[paragraphIndex] || false
                      : isExpanded
                  }
                  variant="body1"
                  sx={{ mb: 2 }}
                  style={{
                    transitionDelay: `${index * 0.1 + (paragraphIndex + 1) * 0.2}s`,
                  }}
                >
                  {paragraph}
                </HobbyDescription>
              ))}

            {!isExpanded && hobby.description.length > 1 && (
              <ExpandButton
                onClick={() => setIsExpanded(true)}
                aria-expanded="false"
                aria-controls={`hobby-content-${hobby.title.replace(/\s+/g, "-").toLowerCase()}`}
                startIcon={<ExpandMoreIcon />}
                variant="text"
                color="primary"
              >
                Continue reading about {hobby.title.toLowerCase()}
              </ExpandButton>
            )}

            {isExpanded && hobby.description.length > 1 && (
              <ExpandButton
                onClick={() => setIsExpanded(false)}
                aria-expanded="true"
                aria-controls={`hobby-content-${hobby.title.replace(/\s+/g, "-").toLowerCase()}`}
                startIcon={<ExpandLessIcon />}
                variant="text"
                color="primary"
              >
                Show less
              </ExpandButton>
            )}
          </>
        ) : (
          <HobbyDescription variant="body1">
            {hobby.description}
          </HobbyDescription>
        )}
      </Box>

      {hobby.photos && (
        <PhotoGallery
          ref={photosRef}
          isVisible={photosVisible}
          style={{
            transitionDelay: `${index * 0.1 + (hobby.description.length + 1) * 0.2}s`,
          }}
        >
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
