import { Stack, styled, Typography } from "@mui/material";

const JumboH1Container = styled(Stack)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  height: calc(100vh - ${({ theme }) => theme.mixins.toolbar.minHeight}px);
  padding: ${({ theme }) => theme.spacing(2)};
`;

const JumboH1 = styled(Typography)`
  font-size: 4rem;
  line-height: 1;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    font-size: 6rem;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    font-size: 8rem;
  }
`;

const SubtitleText = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
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
        <SubtitleText variant="h2" color="secondary">
          Software Engineer
        </SubtitleText>
      </div>
    </JumboH1Container>
  );
}
