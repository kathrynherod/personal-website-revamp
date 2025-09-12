import { Stack, styled, Typography } from "@mui/material";

const JumboH1Container = styled(Stack)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.mixins.toolbar.minHeight}px);
`;
const JumboH1 = styled(Typography)`
  font-size: 4rem;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    font-size: 6rem;
  }
`;

export default function Home() {
  return (
    <JumboH1Container id="home">
      <div>
        <JumboH1 variant="h1" gutterBottom>
          kathryn
          <br />
          herod
        </JumboH1>
        <Typography variant="h2" color="secondary">
          Software Engineer
        </Typography>
      </div>
    </JumboH1Container>
  );
}
