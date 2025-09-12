import { Stack, styled, Typography } from "@mui/material";

const HobbiesContainer = styled(Stack)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  min-height: calc(100vh - ${({ theme }) => theme.mixins.toolbar.minHeight}px);
  overflow: hidden;
`;

export default function Hobbies() {
  return (
    <HobbiesContainer id="hobbies">
      <Typography variant="h1" gutterBottom>
        Hobbies
      </Typography>
      <Typography variant="body1">This is the hobbies page.</Typography>
    </HobbiesContainer>
  );
}
