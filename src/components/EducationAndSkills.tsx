import { Box, Chip, styled, Typography } from "@mui/material";
import { useRef } from "react";

import resumeData from "../assets/resume.json";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const skillsData = resumeData.skills;
const educationData = resumeData.education;

// Shared Container
const SectionContainer = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(4, 2)};
`;

const ContentWrapper = styled(Box)`
  max-width: 1200px;
  padding: 1rem 2rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: 2rem 4rem;
  }
`;

// Skills Components
const SkillCategoriesGrid = styled(Box)`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;

  ${({ theme }) => theme.breakpoints.up("md")} {
    gap: 3rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const SkillCategoryCard = styled(Box)<{ isVisible: boolean }>`
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

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light}40;
  }
`;

// Skills Category Component
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
          <SkillChip key={index} label={skill} variant="outlined" />
        ))}
      </SkillChipsContainer>
    </SkillCategoryCard>
  );
};

export function Skills() {
  const technicalSkills = [
    {
      title: "Backend & Database",
      skills: skillsData.technical.backendDatabase,
    },
    {
      title: "Frontend & Styling",
      skills: skillsData.technical.frontendStyling,
    },
    { title: "Tools & Platforms", skills: skillsData.technical.toolsPlatforms },
    { title: "Testing", skills: skillsData.technical.testing },
    { title: "E-commerce & SEO", skills: skillsData.technical.ecommerceSeo },
  ];

  const softSkills = [
    {
      title: "Leadership & Management",
      skills: skillsData.soft.leadershipManagement,
    },
    {
      title: "Process & Methodology",
      skills: skillsData.soft.processMethodology,
    },
    {
      title: "Communication & Collaboration",
      skills: skillsData.soft.communicationCollaboration,
    },
  ];

  return (
    <SectionContainer id="skills">
      <ContentWrapper>
        <Typography variant="h3" gutterBottom>
          Technical Skills
        </Typography>

        <SkillCategoriesGrid>
          {technicalSkills.map((category) => (
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
          {softSkills.map((category) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </SkillCategoriesGrid>
      </ContentWrapper>
    </SectionContainer>
  );
}

// Education Components
const EducationGrid = styled(Box)`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;
  max-width: 600px;
`;

const EducationCard = styled(Box)<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease;
`;

const DegreeTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: 600;
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

const EducationType = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.8rem;
  text-transform: capitalize;
  font-style: italic;
`;

// Education Item Component
const EducationItem = ({ edu }: { edu: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <EducationCard ref={ref} isVisible={isVisible}>
      <DegreeTitle variant="h6">{edu.degree}</DegreeTitle>
      <InstitutionName>{edu.institution}</InstitutionName>
      <EducationYear>{edu.year}</EducationYear>
      <EducationType>({edu.type})</EducationType>
    </EducationCard>
  );
};

export function Education() {
  return (
    <SectionContainer id="education">
      <ContentWrapper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Education & Certifications
        </Typography>

        <EducationGrid>
          {educationData.map((edu) => (
            <EducationItem key={edu.id} edu={edu} />
          ))}
        </EducationGrid>
      </ContentWrapper>
    </SectionContainer>
  );
}
