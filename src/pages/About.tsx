import { Box, Paper, styled, Typography, useMediaQuery } from "@mui/material";

import KathrynAndOlive from "../assets/images/kathryn-and-olive.png";
import Layout from "../components/Layout";
import QuoteBlock from "../components/QuoteBlock";

const ContentGrid = styled(Box)`
  align-items: start;
  display: grid;
  gap: 2rem;
  grid-template-areas:
    "text"
    "full"
    "image";
  grid-template-columns: 1fr;
  row-gap: 1rem;

  ${({ theme }) => theme.breakpoints.up("md")} {
    gap: 3rem;
    grid-template-areas:
      "text image"
      "full full";
    grid-template-columns: 2fr 1fr;
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
  const isWideScreen = useMediaQuery("(min-width:1000px)");

  return (
    <Layout id="about" sectionTitle="About Me">
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
          {isWideScreen && (
            <QuoteBlock
              testimonial="With tests, we can change the behavior of our code quickly and verifiably. Without them, we really don’t know if our code is getting better or worse."
              author="Michael Feathers"
            />
          )}
        </FullWidthSection>
      </ContentGrid>
    </Layout>
  );
}
