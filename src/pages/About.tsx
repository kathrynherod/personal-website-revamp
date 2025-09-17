import { Box, Paper, styled, Typography } from "@mui/material";

import KathrynAndOlive from "../assets/images/kathryn-and-olive.png";
import Layout from "../components/Layout";

const ContentGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "text"
    "full"
    "image";
  gap: 2rem;
  row-gap: 1rem;
  align-items: start;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "text image"
      "full full";
    gap: 3rem;
    row-gap: 1rem;
  }
`;

const TextSection = styled(Box)`
  grid-area: text;

  p + p {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`;

const ImageSection = styled(Box)`
  grid-area: image;
  justify-self: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    justify-self: start;
  }
`;

const FullWidthSection = styled(Box)`
  grid-area: full;
`;

const ImageWrapper = styled(Paper)`
  background-color: #ffffff;
  border-radius: 16px;
  display: inline-block;
  padding: 0.75rem;
  width: fit-content;
`;

const StyledImage = styled("img")`
  border-radius: 8px;
  display: block;
  height: auto;
  max-width: 300px;
  object-fit: cover;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 300px;
  }
`;

export default function About() {
  return (
    <Layout id="about">
      <Typography variant="h3" gutterBottom></Typography>
      <Typography variant="h2" gutterBottom>
        About Me
      </Typography>

      <ContentGrid>
        <TextSection>
          <Typography variant="body1">
            I'm a full-stack software engineer with over seven years of
            experience crafting scalable applications. I spent nearly a decade
            as an entrepreneur, building a cooking education business from
            nothing to over $600k in annual revenue before its acquisition.
          </Typography>

          <Typography variant="body1">
            This entrepreneurial background gives me a unique perspective in
            software development. I understand how technology decisions impact
            business outcomes, user experience, and long-term growth. Whether
            developing backend services in C# and ASP.NET or building responsive
            frontend applications with React and Angular, I always keep the
            bigger picture and the end user in mind.
          </Typography>
        </TextSection>

        <ImageSection>
          <ImageWrapper elevation={3}>
            <StyledImage
              src={KathrynAndOlive}
              alt="Kathryn Herod with her German Shepherd Olive"
            />
          </ImageWrapper>
        </ImageSection>

        <FullWidthSection>
          <Typography variant="body1">
            When I'm not at the computer, I'm busy chasing around my son and
            wrangling my two German Shepherd rescues. I also love woodworking.
            Right now it's building furniture and doing trim carpentry around
            the house. I'm still enjoying my pastry chef roots by baking fresh
            bread for my family every week. There's something deeply satisfying
            about creating something tangible with your hands, whether it's a
            piece of custom furniture, a perfect loaf of sourdough, or clean,
            efficient code.
          </Typography>
        </FullWidthSection>
      </ContentGrid>
    </Layout>
  );
}
