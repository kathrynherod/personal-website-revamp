import { Box, styled, Typography } from "@mui/material";
import React from "react";

import resumeData from "../../assets/resume.json";
import type { Skill, SkillCategory } from "../../types/ResumeDataType";
import SkillCategoryItem from "./SkillCategoryItem";

const skillsData: Skill[] = resumeData.skills;

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

export default function Skills() {
  return (
    <>
      {skillsData.map((skill: Skill) => {
        return (
          <React.Fragment key={skill.id}>
            <Typography variant="h3" gutterBottom sx={{ mt: 6 }}>
              {skill.title}
            </Typography>

            <SkillCategoriesGrid>
              {skill.categories.map((category: SkillCategory) => (
                <SkillCategoryItem
                  key={category.title}
                  title={category.title}
                  skills={category.skills}
                />
              ))}
            </SkillCategoriesGrid>
          </React.Fragment>
        );
      })}
    </>
  );
}
