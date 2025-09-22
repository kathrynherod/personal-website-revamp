import { Box, styled, Typography } from "@mui/material";
import { useRef } from "react";

import { INTERSECTION_OBSERVER_CONFIG } from "../../constants/intersectionObserver";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { SkillCategory } from "../../types/ResumeDataType";
import { AnimatedBox } from "../shared/AnimatedBox";
import SkillChip from "./SkillChip";

const SkillCategoryCard = AnimatedBox;

const CategoryTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SkillChipsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export default function SkillCategoryItem({ title, skills }: SkillCategory) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, INTERSECTION_OBSERVER_CONFIG);

  return (
    <SkillCategoryCard ref={ref} isVisible={isVisible}>
      <CategoryTitle variant="h4">{title}</CategoryTitle>
      <SkillChipsContainer>
        {skills.map((skill, index) => (
          <SkillChip
            key={skill}
            skill={skill}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </SkillChipsContainer>
    </SkillCategoryCard>
  );
}
