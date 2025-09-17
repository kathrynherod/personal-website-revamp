import { Box, styled, Typography } from "@mui/material";
import { useRef } from "react";

import resumeData from "../assets/resume.json";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import type { Education } from "../types/ResumeDataType";
import Layout from "./Layout";

const educationData: Education[] = resumeData.education;

const EducationList = styled(Box)`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;

  ${({ theme }) => theme.breakpoints.up("md")} {
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const EducationCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease;
`;

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

const EducationItem = ({ edu }: { edu: Education }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <EducationCard ref={ref} isVisible={isVisible}>
      <InstitutionName variant="h6">{edu.institution}</InstitutionName>
      <DegreeTitle>{edu.degree}</DegreeTitle>
      <EducationYear>{edu.year}</EducationYear>
    </EducationCard>
  );
};

export default function Education() {
  return (
    <Layout id="education">
      <Typography variant="h3" gutterBottom>
        Education & Certifications
      </Typography>

      <EducationList>
        {educationData.map((edu, index) => (
          <EducationItem key={index} edu={edu} />
        ))}
      </EducationList>
    </Layout>
  );
}
