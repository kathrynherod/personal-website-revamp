import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, styled, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { Hobby, Photo } from "../../types/HobbiesTypes";
import { AnimatedBox } from "../shared/AnimatedBox";
import PhotoDialog from "./PhotoDialog";
import PhotoItem from "./PhotoItem";

const HobbyCard = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const HobbyHeader = styled(AnimatedBox)`
  align-items: center;
  display: flex;
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

const HobbyDescription = styled(AnimatedBox.withComponent(Typography))`
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

const ExpandButton = styled(Button)`
  font-weight: 500;
  margin-top: ${({ theme }) => theme.spacing(2)};
  text-transform: none;

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
  const [paragraphVisibility, setParagraphVisibility] = useState<boolean[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const headerVisible = useIntersectionObserver(headerRef, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  useEffect(() => {
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
        data-testid={`hobby-header-${index}`}
      >
        {hobby.icon}
        <HobbyTitle variant="h5" component="h3" data-testid={`hobby-title-${index}`}>
          {hobby.title}
        </HobbyTitle>
      </HobbyHeader>

      <Box
        id={`hobby-content-${hobby.title.replace(/\s+/g, "-").toLowerCase()}`}
        aria-labelledby={`hobby-title-${hobby.title.replace(/\s+/g, "-").toLowerCase()}`}
      >
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
            data-testid={`expand-button-${index}`}
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
            data-testid={`collapse-button-${index}`}
          >
            Show less
          </ExpandButton>
        )}
      </Box>

      {hobby.photos && (
        <PhotoGallery data-testid={`photo-gallery-${index}`}>
          {hobby.photos.map((photo, photoIndex) => (
            <PhotoItem
              key={photoIndex}
              photo={photo}
              index={photoIndex}
              baseDelay={index * 0.1 + (hobby.description.length + 1) * 0.2}
              onPhotoClick={handlePhotoClick}
            />
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
