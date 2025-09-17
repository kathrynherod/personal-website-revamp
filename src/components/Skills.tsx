import { Box, Chip, styled, Typography } from "@mui/material";
import { useRef } from "react";

import resumeData from "../assets/resume.json";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import type { SkillCategory, Skills } from "../types/ResumeDataType";
import Layout from "./Layout";

const skillsData: Skills = resumeData.skills;

const SkillCategoriesGrid = styled(Box)`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;

  ${({ theme }) => theme.breakpoints.up("md")} {
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    gap: 2rem;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

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

const SkillChip = styled(Chip)`
  background-color: ${({ theme }) => theme.palette.primary.light}20;
  border: 1px solid ${({ theme }) => theme.palette.primary.main}40;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.8rem;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;

  &::before {
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.palette.primary.main}15,
      transparent
    );
    content: "";
    height: 100%;
    left: -100%;
    position: absolute;
    top: 0;
    width: 100%;

    transition: left 0.4s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main}12;
    border-color: ${({ theme }) => theme.palette.primary.main}70;
    box-shadow: 0 2px 6px ${({ theme }) => theme.palette.primary.main}12;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }

  /* Add a subtle pulse animation on first load */
  @keyframes chipPulse {
    0% {
      box-shadow: 0 0 0 0 ${({ theme }) => theme.palette.primary.main}30;
    }
    70% {
      box-shadow: 0 0 0 4px transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  &.animate-in {
    animation: chipPulse 1.2s ease-out;
  }
`;

const InteractiveSkillChip = ({
  skill,
  index,
  isVisible,
}: {
  skill: string;
  index: number;
  isVisible: boolean;
}) => {
  return (
    <SkillChip
      label={skill}
      variant="outlined"
      className={isVisible ? "animate-in" : ""}
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    />
  );
};

const SkillCategory = ({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <SkillCategoryCard ref={ref} isVisible={isVisible}>
      <CategoryTitle variant="h6">{title}</CategoryTitle>
      <SkillChipsContainer>
        {skills.map((skill, index) => (
          <InteractiveSkillChip
            key={skill}
            skill={skill}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </SkillChipsContainer>
    </SkillCategoryCard>
  );
};

export default function Skills() {
  return (
    <Layout id="skills">
      <Typography variant="h3" gutterBottom>
        Technical Skills
      </Typography>

      <SkillCategoriesGrid>
        {skillsData.technical.map((category: SkillCategory) => (
          <SkillCategory
            key={category.title}
            title={category.title}
            skills={category.skills}
          />
        ))}
      </SkillCategoriesGrid>

      <Typography variant="h3" gutterBottom sx={{ mt: 6 }}>
        Soft Skills
      </Typography>

      <SkillCategoriesGrid>
        {skillsData.soft.map((category) => (
          <SkillCategory
            key={category.title}
            title={category.title}
            skills={category.skills}
          />
        ))}
      </SkillCategoriesGrid>
    </Layout>
  );
}
