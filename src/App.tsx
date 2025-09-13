import { CssBaseline, styled, ThemeProvider } from "@mui/material";
import React, { type ReactNode, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useThemeMode } from "./hooks/useThemeMode";
import About from "./routes/About";
import Experience from "./routes/Experience";
import Hobbies from "./routes/Hobbies";
import Home from "./routes/Home";
import { darkTheme, lightTheme } from "./theme";

const AppContainer = styled("div")`
  background-color: ${(props) => props.theme.palette.background.default};
  color: ${(props) => props.theme.palette.text.primary};
  min-height: 100vh;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
`;

type AppSection = {
  element: ReactNode;
  id: string;
  name: string;
  path: string;
};

const sections: AppSection[] = [
  {
    path: "/",
    name: "Home",
    id: "home",
    element: <Home />,
  },
  {
    path: "/about",
    name: "About",
    id: "about",
    element: <About />,
  },
  {
    path: "/experience",
    name: "Experience",
    id: "experience",
    element: <Experience />,
  },
  {
    path: "/hobbies",
    name: "Hobbies",
    id: "hobbies",
    element: <Hobbies />,
  },
];

export default function App() {
  const [themeMode] = useThemeMode();
  const navigate = useNavigate();

  const isScrollingRef = useRef(false);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const hobbiesRef = useRef<HTMLDivElement | null>(null);

  const isHomeVisible = useIntersectionObserver(homeRef, {
    rootMargin: "-45% 0px -45% 0px",
  });
  const isAboutVisible = useIntersectionObserver(aboutRef, {
    rootMargin: "-45% 0px -45% 0px",
  });
  const isExperienceVisible = useIntersectionObserver(experienceRef, {
    rootMargin: "-45% 0px -45% 0px",
  });
  const isHobbiesVisible = useIntersectionObserver(hobbiesRef, {
    rootMargin: "-45% 0px -45% 0px",
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

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (isScrollingRef.current) {
      return;
    }

    if (isHomeVisible && currentPath !== "/") {
      isScrollingRef.current = true;
      navigate("/", { replace: true });
    } else if (isAboutVisible && currentPath !== "/about") {
      isScrollingRef.current = true;
      navigate("/about", { replace: true });
    } else if (isExperienceVisible && currentPath !== "/experience") {
      isScrollingRef.current = true;
      navigate("/experience", { replace: true });
    } else if (isHobbiesVisible && currentPath !== "/hobbies") {
      isScrollingRef.current = true;
      navigate("/hobbies", { replace: true });
    }

    // Reset the scrolling flag after a short delay
    if (isScrollingRef.current) {
      const timer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [
    isHomeVisible,
    isAboutVisible,
    isExperienceVisible,
    isHobbiesVisible,
    navigate,
  ]);

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppContainer>
        <Navbar />
        {sections.map((section) => (
          <React.Fragment key={section.id}>{section.element}</React.Fragment>
        ))}
      </AppContainer>
    </ThemeProvider>
  );
}
