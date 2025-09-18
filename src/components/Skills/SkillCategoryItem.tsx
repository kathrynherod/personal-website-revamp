import { Box, styled, Typography } from "@mui/material";
import { useRef } from "react";

import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import type { SkillCategory } from "../../types/ResumeDataType";
import SkillChip from "./SkillChip";

const SkillCategoryCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease;
`;

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
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

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
