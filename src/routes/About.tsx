import { Stack, styled, Typography, Paper, Box } from "@mui/material";
import KathrynAndOlive from "../assets/images/kathryn-herod-with-olive.jpg";

const AboutContainer = styled(Stack)`
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  min-height: 100vh;
`;

const ContentAndImageWrapper = styled(Box)`
  display: flex;
  flex-direction: column; /* Default to column for mobile */
  align-items: center;
  gap: 3rem;
  padding: 2rem;

  @media (min-width: 900px) {
    flex-direction: row; /* Switch to row for desktop */
    align-items: flex-start;
  }
`;

const TextContentWrapper = styled(Box)`
  max-width: 700px; /* Limit text width for better readability */
`;

const SelfImage = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Removed border-radius: 50% here for rectangular image */
  border-radius: 8px; /* Added slight border-radius for softer corners on the image itself */
`;

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        backgroundColor: "white",
        color: "black",
      }}
    >
      <AboutContainer>
        <ContentAndImageWrapper>
          <TextContentWrapper>
            {/* <Blockquote author="Michael Feathers">
              "Before you use a method in a legacy system, check to see if there
              are tests for it. If there aren’t, write them. When you do this
              consistently, you use tests as a medium of communication."
            </Blockquote> */}
            <Stack spacing={2}>
              <Typography>
                I'm a full-stack software engineer with over seven years of
                experience crafting scalable applications that solve real-world
                problems. My journey into tech began unconventionally, as I
                spent nearly a decade as an entrepreneur, building and scaling a
                cooking education business from nothing to over $600k in annual
                revenue before its acquisition.
              </Typography>
              <Typography>
                This entrepreneurial background gives me a unique perspective in
                software development. I understand how technology decisions
                impact business outcomes, user experience, and long-term growth.
                Whether architecting backend services in C# and ASP.NET or
                building responsive frontend applications with React and
                Angular, I always keep the bigger picture ADN the end user in
                mind.
              </Typography>
              <Typography>
                What really motivates me is building technology that makes a
                difference in people's lives. I love solving complex technical
                problems, but what I really enjoy is knowing that the
                application I'm building will help someone do their job better
                or make their day a little easier. Throughout my career, I've
                focused on mentoring other developers and keeping our users at
                the center of everything we build.
              </Typography>
              <Typography>
                When I'm not at the computer, I'm busy being a mom to my son and
                wrangling my two German Shepherd rescues. I also love
                woodworking. Right now it's building furniture and doing trim
                carpentry around the house. I still enjoy my pastry chef roots
                by baking fresh bread for my family every week. There's
                something deeply satisfying about creating something tangible
                with your hands, whether it's a piece of custom furniture, a
                perfect loaf of bread, or clean, efficient code.
              </Typography>
            </Stack>
          </TextContentWrapper>

          <Paper
            elevation={8}
            sx={{
              borderRadius:
                "12px" /* Adjust this for rounded corners on the frame */,
              width: 300, // Example width
              height: 400, // Example height for a portrait-like rectangle
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              p: 1.5,
              bgcolor: "background.paper",
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <SelfImage src={KathrynAndOlive} alt="Kathryn and Olive" />
          </Paper>
        </ContentAndImageWrapper>
      </AboutContainer>
    </Box>
  );
}
