import { Stack, styled, Typography } from "@mui/material";

const JumboH1Container = styled(Stack)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  min-height: 100vh;
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
      <JumboH1 variant="h1" gutterBottom>
        kathryn
        <br />
        herod
      </JumboH1>
    </JumboH1Container>
  );
}
