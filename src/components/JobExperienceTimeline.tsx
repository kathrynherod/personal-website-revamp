import resumeData from "@assets/resume.json";
import { Box, styled, Typography } from "@mui/material";
import type { Experience } from "@types";
import React, { useState } from "react";

import MobileExperienceItem from "./JobExperienceTimeline/MobileExperienceItem";

const experienceData: Experience[] = resumeData.experience;

const ExperienceGrid = styled(Box)`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  margin-top: 2rem;

  ${({ theme }) => theme.breakpoints.up("md")} {
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

const TimelineMarkerBase = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})`
  transition: all 0.3s ease;
`;

const TimelineItem = styled(TimelineMarkerBase)<{ active: boolean }>`
  cursor: pointer;
  display: none;
  height: 80px;
  margin-bottom: 0.5rem;
  padding: 1rem;

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

const MobileTimelineMarker = styled(TimelineMarkerBase)<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.palette.primary.main : theme.palette.grey[400]};
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: ${({ active, theme }) =>
    `0 0 0 2px ${active ? theme.palette.primary.main : theme.palette.grey[400]}`};
  flex-shrink: 0;
  height: 12px;
  margin-right: 1rem;
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

const DesktopExperienceDetails = styled("div")`
  display: none;
  opacity: 0;
  padding: 1rem;
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
    <ExperienceGrid>
      <TimelineContentSection>
        {experienceData.map((exp) => (
          <React.Fragment key={exp.id}>
            <TimelineItem
              active={activeExperience.id === exp.id}
              onClick={() => setActiveExperience(exp)}
              data-testid={`timeline-item-${exp.id}`}
            >
              <MobileTimelineMarker
                active={activeExperience.id === exp.id}
                data-testid={`timeline-marker-${exp.id}`}
              />

              <TimelineContent data-testid={`timeline-content-${exp.id}`}>
                <Duration data-testid={`duration-${exp.id}`}>
                  {exp.duration}
                </Duration>
                <CompanyName data-testid={`company-${exp.id}`}>
                  {exp.company}
                </CompanyName>
              </TimelineContent>
            </TimelineItem>

            <MobileExperienceItem exp={exp} />
          </React.Fragment>
        ))}
      </TimelineContentSection>

      <DesktopExperienceDetails data-testid="desktop-experience-details">
        <Box>
          <JobTitle variant="h4" data-testid="desktop-job-title">
            {activeExperience.title}
          </JobTitle>
          <DetailCompanyName variant="h5" data-testid="desktop-company">
            {activeExperience.company}
          </DetailCompanyName>
          <DetailDuration data-testid="desktop-duration">
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
  );
}
