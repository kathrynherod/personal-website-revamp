import { CssBaseline, styled, ThemeProvider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useThemeMode } from "./hooks/useThemeMode";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Hobbies from "./pages/Hobbies";
import Home from "./pages/Home";
import { darkTheme, lightTheme } from "./theme";
import type { AppSection } from "./types/AppTypes";

const AppContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.background.default};
  color: ${(props) => props.theme.palette.text.primary};
  min-height: 100vh;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
`;

const sections: AppSection[] = [
  {
    name: "Home",
    id: "home",
    element: <Home />,
  },
  {
    name: "About",
    id: "about",
    element: <About />,
  },
  {
    name: "Experience",
    id: "experience",
    element: <Experience />,
  },
  {
    name: "Hobbies",
    id: "hobbies",
    element: <Hobbies />,
  },
];

export default function App() {
  const [themeMode] = useThemeMode();
  const [activeSection, setActiveSection] = useState("home");

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const hobbiesRef = useRef<HTMLDivElement | null>(null);

  const isHomeVisible = useIntersectionObserver(homeRef, {
    rootMargin: "-40% 0px -40% 0px",
  });
  const isAboutVisible = useIntersectionObserver(aboutRef, {
    rootMargin: "-40% 0px -40% 0px",
  });
  const isExperienceVisible = useIntersectionObserver(experienceRef, {
    rootMargin: "-40% 0px -40% 0px",
  });
  const isHobbiesVisible = useIntersectionObserver(hobbiesRef, {
    rootMargin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    const homeSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");
    const experienceSection = document.getElementById("experience");
    const hobbiesSection = document.getElementById("hobbies");

    if (homeSection instanceof HTMLDivElement) {
      homeRef.current = homeSection;
    }
    if (aboutSection instanceof HTMLDivElement) {
      aboutRef.current = aboutSection;
    }
    if (experienceSection instanceof HTMLDivElement) {
      experienceRef.current = experienceSection;
    }
    if (hobbiesSection instanceof HTMLDivElement) {
      hobbiesRef.current = hobbiesSection;
    }
  });

  // Update active section based on visibility
  useEffect(() => {
    if (isHomeVisible) {
      setActiveSection("home");
    } else if (isAboutVisible) {
      setActiveSection("about");
    } else if (isExperienceVisible) {
      setActiveSection("experience");
    } else if (isHobbiesVisible) {
      setActiveSection("hobbies");
    }
  }, [isHomeVisible, isAboutVisible, isExperienceVisible, isHobbiesVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppContainer>
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
        <main>
          {sections.map((section) => (
            <React.Fragment key={section.id}>{section.element}</React.Fragment>
          ))}
        </main>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}
