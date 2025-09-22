import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PetsIcon from "@mui/icons-material/Pets";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import { Stack } from "@mui/material";

import FosterDogs from "../assets/images/foster-dogs.png";
import MontessoriShelf from "../assets/images/montessori-shelf.png";
import MurphyBed from "../assets/images/murphy-bed.png";
import OliveByPool from "../assets/images/olive-by-pool.png";
import PortiaByPool from "../assets/images/portia-by-pool.png";
import HobbyItem from "../components/Hobbies/HobbyCard";
import Layout from "../components/Layout";
import type { Hobby } from "../types/HobbiesTypes";

const hobbies: Hobby[] = [
  {
    title: "German Shepherd Rescue",
    icon: <PetsIcon />,
    description: [
      "My journey with dog rescue started over ten years ago when we were running our cooking school. We donated to the Greater Houston German Shepherd Dog Rescue for years before taking the leap to adopt our first German Shepherd in 2016, followed by another in 2019. These two amazing dogs opened our hearts to the incredible impact rescue work can have, and in 2020, we decided to try fostering for the first time. Watching that first foster dog find his perfect forever home was such a rewarding experience and we were hooked.",
      "When I started volunteering to review applications and talk to potential adopters during COVID, I quickly realized how much the organization was struggling with outdated processes. Everything was still being done with paper forms, spreadsheets, and snail mail. I joined the board specifically to help streamline how we matched dogs with families and connected adopters with foster families. Using my tech background, I found software that could digitize all these processes and make everything more efficient. Getting everyone on board was not the easiest task, but the real work was in the transition. I ended up creating training videos and step-by-step guides to help all the volunteers learn the new system.",
      "From there, I built custom scripts to automatically send weekly status emails about all the dogs currently in our care, and developed a standalone web app that gave everyone real-time access to this information. I also helped migrate the organization from an outdated, clunky website to WordPress, which allows everyone to update content themselves instead of relying on one tech-savvy person. What started as occasional fostering had evolved into completely revolutionizing how the rescue operates. Now everyone is empowered to do their work with so much less effort and we can just focus on saving more dogs.",
    ],
    photos: [
      {
        src: PortiaByPool,
        caption: "Portia - Our first rescue (2016)",
      },
      {
        src: OliveByPool,
        caption: "Olive - Our second rescue (2019)",
      },
      {
        src: FosterDogs,
        caption: "Some of our foster dogs over the years",
      },
    ],
  },

  {
    title: "Wood Working",
    icon: <SquareFootIcon />,
    description: [
      "I got really into woodworking a few years ago when we bought our home. I had tackled small projects in the past, but I decided I needed a real challenge and needed a Murphy bed for my office. It turned out to be such a fantastic learning experience, and I get the satisfaction of seeing my masterpiece every single day when I'm working. ",
      "More recently, I built Montessori shelves for my son's room. I love watching him use them to practice walking and play with his toys while standing. Seeing him interact with something I created (instead of purchasing) makes it so much more rewarding. ",
      "My next project is likely going to be remodeling our pantry and building some beautiful floating shelves to go over the some new base cabinets.",
    ],
    photos: [
      {
        src: MontessoriShelf,
        caption: "The Montessori shelf I built for my son",
      },
      {
        src: MurphyBed,
        caption: "The Murphy bed, shelves, and wainscotting in my office",
      },
    ],
  },
  {
    title: "French Horn",
    icon: <MusicNoteIcon />,
    description: [
      "I've been playing French Horn for over 25 years, and it remains one of my greatest passions. When my schedule allows, I love joining local orchestras and community ensembles.",
    ],
  },
];

export default function Hobbies() {
  return (
    <Layout id="hobbies" sectionTitle="Hobbies & Interests">
      <Stack>
        {hobbies.map((hobby, index) => (
          <HobbyItem key={hobby.title} hobby={hobby} index={index} />
        ))}
      </Stack>
    </Layout>
  );
}
