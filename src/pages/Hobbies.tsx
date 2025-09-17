import BuildIcon from "@mui/icons-material/Build";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, Grid, Paper, styled, Typography } from "@mui/material";

const HobbiesContainer = styled("div")`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(8, 2)};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const SectionTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  text-align: center;
`;

const HobbyCard = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(4)};
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) =>
      theme.palette.mode === "light"
        ? "0px 20px 40px rgba(1, 52, 77, 0.15)"
        : "0px 20px 40px rgba(0, 0, 0, 0.3)"};
  }
`;

const HobbyIcon = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  & svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.palette.brand.limeGreen};
  }
`;

const HobbyTitle = styled(Typography)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-weight: 800;
`;

const QuoteSection = styled(Box)`
  text-align: center;
  margin: ${({ theme }) => theme.spacing(8, 0)};
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.palette.brand.darkBlue};
  color: ${({ theme }) => theme.palette.brand.limeGreen};
  border-radius: 12px;
`;

// const QuoteText = styled(Typography)`
//   font-size: 2.5rem;
//   font-style: italic;
//   font-weight: 600;
//   line-height: 1.3;

//   &::before {
//     content: ""
//       ";
//     font-size: 3rem;
//     line-height: 0;
//   }

//   &::after {
//     content: " "";
//     font-size: 3rem;
//     line-height: 0;
//   }

//   ${({ theme }) => theme.breakpoints.down("md")} {
//     font-size: 1.75rem;

//     &::before,
//     &::after {
//       font-size: 2rem;
//     }
//   }
// `;

const hobbies = [
  {
    title: "German Shepherd Rescue",
    icon: <PetsIcon />,
    description: `I'm passionate about German Shepherd rescue work and currently have two rescue dogs of my own.
    These intelligent, loyal companions have taught me so much about patience, training, and unconditional love.
    I volunteer with local rescue organizations to help find forever homes for these amazing dogs.
    The work is incredibly rewarding, knowing that we're giving these dogs a second chance at happiness
    while educating families about responsible pet ownership.`,
  },
  {
    title: "French Horn",
    icon: <MusicNoteIcon />,
    description: `Music has been a constant in my life, and the French Horn holds a special place in my heart.
    There's something magical about the warm, rich tones this instrument produces. I've been playing for years
    and continue to challenge myself with complex pieces. The discipline required to master the French Horn
    has translated well into my approach to software development - both require patience, practice,
    and attention to detail to achieve beautiful results.`,
  },
  {
    title: "Wood Working",
    icon: <BuildIcon />,
    description: `Woodworking allows me to create something tangible with my hands, which provides a perfect
    balance to the digital world of software development. I love the process of taking raw lumber and
    transforming it into beautiful, functional pieces of furniture. Currently, I'm working on custom
    built-ins for my home and learning trim carpentry. The precision required in woodworking mirrors
    the attention to detail needed in coding - both require careful planning, precise execution,
    and the patience to get things right.`,
  },
];

export default function Hobbies() {
  return (
    <HobbiesContainer id="hobbies">
      <Box maxWidth="lg" sx={{ margin: "0 auto" }}>
        <SectionTitle variant="h1">Hobbies</SectionTitle>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {hobbies.map((hobby) => (
            <Grid key={hobby.title}>
              <HobbyCard elevation={2}>
                <HobbyIcon>{hobby.icon}</HobbyIcon>
                <HobbyTitle variant="h4">{hobby.title}</HobbyTitle>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {hobby.description}
                </Typography>
              </HobbyCard>
            </Grid>
          ))}
        </Grid>

        <QuoteSection>
          {/* <QuoteText variant="h2" component="div">
            The bad news is time flies. The good news is you're the pilot.
          </QuoteText> */}
        </QuoteSection>
      </Box>
    </HobbiesContainer>
  );
}
