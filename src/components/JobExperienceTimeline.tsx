import { Box, styled, Typography } from "@mui/material";
import React, { useRef, useState } from "react";

import resumeData from "../assets/resume.json";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import type { Experience } from "../types/ResumeDataType";
import Layout from "./Layout";

const experienceData: Experience[] = resumeData.experience;

const ExperienceGrid = styled(Box)`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;

  ${({ theme }) => theme.breakpoints.up("md")} {
    gap: 1rem;
    grid-template-columns: 300px 1fr;
  }
`;

const TimelineContentSection = styled(Box)`
  text-align: left;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding-right: 1rem;
    text-align: right;
  }
`;

const TimelineItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  cursor: pointer;
  display: none;
  height: 80px;
  margin-bottom: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease;

  ${({ theme }) => theme.breakpoints.up("md")} {
    border-left: 4px solid
      ${({ active, theme }) =>
        active ? theme.palette.primary.main : "transparent"};
    display: flex;
    margin: 0.5rem 0;

    &:hover {
      background-color: ${({ theme }) => theme.palette.action.hover};
    }
  }
`;

const MobileTimelineMarker = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.grey[400]};
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: ${({ active, theme }) =>
    `0 0 0 2px ${active ? theme.palette.primary.main : theme.palette.grey[400]}`};
  flex-shrink: 0;
  height: 12px;
  margin-right: 1rem;
  transition: all 0.3s ease;
  width: 12px;

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: none;
  }
`;

const TimelineContent = styled(Box)`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const MobileExperienceDetails = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible: boolean }>`
  margin-bottom: 3rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(30px)"};
  transition: all 0.6s ease;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: none;
  }
`;

const MobileExperienceItem = ({ exp }: { exp: Experience }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <MobileExperienceDetails ref={ref} isVisible={isVisible}>
      <Box>
        <JobTitle variant="h5">{exp.title}</JobTitle>
        <DetailCompanyName variant="h6">{exp.company}</DetailCompanyName>
        <DetailDuration>
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
};

const DesktopExperienceDetails = styled("div")`
  display: none;
  opacity: 0;
  padding: 0.5rem;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: block;
    opacity: 1;
    transform: translateY(0);
  }
`;

const CompanyName = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.875rem;
  font-weight: 600;
`;

const Duration = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.8125rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
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

export default function JobExperienceTimeline() {
  const [activeExperience, setActiveExperience] = useState(experienceData[0]);

  return (
    <Layout id="experience">
      <Typography variant="h3" gutterBottom>
        Experience
      </Typography>

      <ExperienceGrid>
        <TimelineContentSection>
          {experienceData.map((exp) => (
            <React.Fragment key={exp.id}>
              <TimelineItem
                active={activeExperience.id === exp.id}
                onClick={() => setActiveExperience(exp)}
              >
                <MobileTimelineMarker active={activeExperience.id === exp.id} />

                <TimelineContent>
                  <Duration>{exp.duration}</Duration>
                  <CompanyName>{exp.company}</CompanyName>
                </TimelineContent>
              </TimelineItem>

              <MobileExperienceItem exp={exp} />
            </React.Fragment>
          ))}
        </TimelineContentSection>

        <DesktopExperienceDetails>
          <Box>
            <JobTitle variant="h5">{activeExperience.title}</JobTitle>
            <DetailCompanyName variant="h6">
              {activeExperience.company}
            </DetailCompanyName>
            <DetailDuration>
              {activeExperience.duration} • {activeExperience.location}
            </DetailDuration>
          </Box>

          <Box>
            {activeExperience.responsibilities.map((responsibility, index) => (
              <ResponsibilityItem key={index} variant="body1">
                {responsibility}
              </ResponsibilityItem>
            ))}
          </Box>
        </DesktopExperienceDetails>
      </ExperienceGrid>
    </Layout>
  );
}
