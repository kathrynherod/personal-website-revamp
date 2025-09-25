import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { Box, styled, Typography } from "@mui/material";
import { AnimatedBox } from "@shared/AnimatedBox";
import type { Experience } from "@types";
import { useRef } from "react";

const MobileExperienceDetails = styled(AnimatedBox)`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: none;
  }
`;

const JobTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const DetailCompanyName = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const DetailDuration = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-weight: 400;
  margin-bottom: 2rem;
`;

const ResponsibilityItem = styled(Typography)`
  line-height: 1.6;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
  position: relative;

  &::before {
    color: ${({ theme }) => theme.palette.primary.main};
    content: "•";
    font-weight: bold;
    left: 0;
    position: absolute;
  }
`;

type MobileExperienceItemProps = {
  exp: Experience;
};

export default function MobileExperienceItem({ exp }: MobileExperienceItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <MobileExperienceDetails
      ref={ref}
      isVisible={isVisible}
      data-testid={`mobile-experience-${exp.id}`}
    >
      <Box>
        <JobTitle variant="h3" data-testid={`mobile-job-title-${exp.id}`}>
          {exp.title}
        </JobTitle>
        <DetailCompanyName variant="h4" data-testid={`mobile-company-${exp.id}`}>
          {exp.company}
        </DetailCompanyName>
        <DetailDuration data-testid={`mobile-duration-${exp.id}`}>
          {exp.duration} • {exp.location}
        </DetailDuration>
      </Box>

      <Box>
        {exp.responsibilities.map((responsibility: string, index: number) => (
          <ResponsibilityItem key={index} variant="body1">
            {responsibility}
          </ResponsibilityItem>
        ))}
      </Box>
    </MobileExperienceDetails>
  );
}