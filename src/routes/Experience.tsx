import { Stack, styled, Typography } from "@mui/material";

const ExperienceContainer = styled(Stack)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  min-height: calc(100vh - ${({ theme }) => theme.mixins.toolbar.minHeight}px);
  overflow: hidden;
`;

export default function Experience() {
  return (
    <ExperienceContainer id="experience">
      <Typography variant="h1" gutterBottom>
        Experience
      </Typography>
      <Typography variant="body1">This is the experience page.</Typography>
    </ExperienceContainer>
  );
}
