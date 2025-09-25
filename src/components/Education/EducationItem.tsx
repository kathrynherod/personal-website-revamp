import { styled, Typography } from "@mui/material";
import { useRef } from "react";

import { INTERSECTION_OBSERVER_CONFIG } from "../../constants/intersectionObserver";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { Education } from "../../types/ResumeDataType";
import { AnimatedBox } from "../shared/AnimatedBox";

const EducationCard = AnimatedBox;

const DegreeTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 0.5rem;
`;

const InstitutionName = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const EducationYear = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.9rem;
`;

export default function EducationItem({ edu }: { edu: Education }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, INTERSECTION_OBSERVER_CONFIG);

  return (
    <EducationCard
      ref={ref}
      isVisible={isVisible}
      data-testid={`education-item-${edu.id}`}
    >
      <InstitutionName
        variant="h4"
        data-testid={`education-institution-${edu.id}`}
      >
        {edu.institution}
      </InstitutionName>
      <DegreeTitle data-testid={`education-degree-${edu.id}`}>
        {edu.degree}
      </DegreeTitle>
      <EducationYear data-testid={`education-year-${edu.id}`}>
        {edu.year}
      </EducationYear>
    </EducationCard>
  );
}
