import { Box, Stack, styled, Typography } from "@mui/material";

import KathrynAndOlive from "../assets/images/kathryn-herod-with-olive.jpg";

const AboutContainer = styled("div")`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(4, 2)};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const ContentAndImageWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const TextContentWrapper = styled(Box)`
  flex: 1;
  max-width: 700px;
`;

const SelfImage = styled("img")`
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.palette.mode === "light"
      ? "0px 10px 30px rgba(1, 52, 77, 0.15)"
      : "0px 10px 30px rgba(0, 0, 0, 0.3)"};

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 250px;
    height: 350px;
  }
`;

export default function About() {
  return (
    <AboutContainer id="about">
      <Typography variant="h3" gutterBottom>
        About Me
      </Typography>

      <ContentAndImageWrapper>
        <TextContentWrapper>
          {/* <Blockquote author="Michael Feathers">
              "Before you use a method in a legacy system, check to see if there
              are tests for it. If there aren’t, write them. When you do this
              consistently, you use tests as a medium of communication."
            </Blockquote> */}

          <Stack spacing={3}>
            <Typography variant="body1">
              I'm a full-stack software engineer with over seven years of
              experience crafting scalable applications that solve real-world
              problems. My journey into tech began unconventionally, as I spent
              nearly a decade as an entrepreneur, building and scaling a cooking
              education business from nothing to over $600k in annual revenue
              before its acquisition.
            </Typography>

            <Typography variant="body1">
              This entrepreneurial background gives me a unique perspective in
              software development. I understand how technology decisions impact
              business outcomes, user experience, and long-term growth. Whether
              developing backend services in C# and ASP.NET or building
              responsive frontend applications with React and Angular, I always
              try to keep the end user in mind.
            </Typography>

            <Typography variant="body1">
              What really motivates me is building technology that makes a
              difference in people's lives. While I love solving complex
              technical problems, what I really enjoy is knowing that my work
              helps make someone else's day easier.
            </Typography>

            <Typography variant="body1">
              When I'm not at the computer, I'm busy being a mom to my son and
              wrangling my two German Shepherd rescues. I also love woodworking!
              Right now it's building furniture and doing trim carpentry around
              the house. I still enjoy my pastry chef roots by baking fresh
              bread for my family every week. There's something deeply
              satisfying about creating something tangible with your hands,
              whether it's a piece of custom furniture, a perfect loaf of bread,
              or clean, efficient code.
            </Typography>
          </Stack>
        </TextContentWrapper>

        <SelfImage
          src={KathrynAndOlive}
          alt="Kathryn Herod with her German Shepherd Olive"
        />
      </ContentAndImageWrapper>
    </AboutContainer>
  );
}
