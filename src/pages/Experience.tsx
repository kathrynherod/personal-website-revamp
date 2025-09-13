import {
  Box,
  Chip,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";

import resumeData from "../assets/resume.json";

const ExperienceContainer = styled("div")`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(8, 2)};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const SectionTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const VerticalTab = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.brand.limeGreen};
  color: ${({ theme }) => theme.palette.brand.darkBlue};
  padding: ${({ theme }) => theme.spacing(2.5)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  border-radius: 0;
  box-shadow: none;

  &:hover {
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "light"
        ? "0px 4px 20px rgba(1, 52, 77, 0.1)"
        : "0px 4px 20px rgba(156, 206, 77, 0.1)"};
  }
`;

const JobTitle = styled(Typography)`
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const CompanyName = styled(Typography)`
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const JobPeriod = styled(Typography)`
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SkillsSection = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(6)};
  text-align: center;
`;

const SkillCategory = styled(Box)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const SkillChip = styled(Chip)`
  margin: ${({ theme }) => theme.spacing(0.5)};
  background-color: ${({ theme }) => theme.palette.brand.darkBlue};
  color: ${({ theme }) => theme.palette.brand.limeGreen};
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.palette.brand.limeGreen};
    color: ${({ theme }) => theme.palette.brand.darkBlue};
  }
`;

export default function Experience() {
  const theme = useTheme();

  return (
    <ExperienceContainer id="experience">
      <Box maxWidth="lg" sx={{ margin: "0 auto" }}>
        <SectionTitle variant="h3">Work Experience</SectionTitle>

        <Stack spacing={2}>
          {resumeData.experience.map((job, index) => (
            <VerticalTab key={index} elevation={0}>
              <JobTitle variant="h4">{job.title}</JobTitle>
              <CompanyName variant="h6">{job.company}</CompanyName>
              <JobPeriod variant="body2">
                {job.period} • {job.location}
              </JobPeriod>

              <Stack spacing={1}>
                {job.achievements.map((achievement, achievementIndex) => (
                  <Typography
                    key={achievementIndex}
                    variant="body1"
                    sx={{
                      "&::before": {
                        content: '"• "',
                        fontWeight: "bold",
                        color: theme.palette.brand.darkBlue,
                      },
                    }}
                  >
                    {achievement}
                  </Typography>
                ))}
              </Stack>
            </VerticalTab>
          ))}
        </Stack>

        <SkillsSection>
          <Typography variant="h2" gutterBottom>
            Technical Skills
          </Typography>

          <SkillCategory>
            <Typography variant="h5" gutterBottom>
              Backend
            </Typography>
            {resumeData.skills.backend.map((skill) => (
              <SkillChip key={skill} label={skill} size="medium" />
            ))}
          </SkillCategory>

          <SkillCategory>
            <Typography variant="h5" gutterBottom>
              Frontend
            </Typography>
            {resumeData.skills.frontend.map((skill) => (
              <SkillChip key={skill} label={skill} size="medium" />
            ))}
          </SkillCategory>

          <SkillCategory>
            <Typography variant="h5" gutterBottom>
              Tools & Methodologies
            </Typography>
            {[
              ...resumeData.skills.tools,
              ...resumeData.skills.methodologies,
            ].map((skill) => (
              <SkillChip key={skill} label={skill} size="medium" />
            ))}
          </SkillCategory>
        </SkillsSection>
      </Box>
    </ExperienceContainer>
  );
}
