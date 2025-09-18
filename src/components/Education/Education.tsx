import { Box, styled, Typography } from "@mui/material";

import resumeData from "../../assets/resume.json";
import type { Education } from "../../types/ResumeDataType";
import EducationItem from "./EducationItem";

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

export default function Education() {
  return (
    <>
      <Typography variant="h3" gutterBottom sx={{ mt: 6 }}>
        Education & Certifications
      </Typography>

      <EducationList>
        {educationData.map((edu, index) => (
          <EducationItem key={index} edu={edu} />
        ))}
      </EducationList>
    </>
  );
}
