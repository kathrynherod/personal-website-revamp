import {
  Box,
  CssBaseline,
  styled,
  ThemeProvider,
  // Typography,
  useTheme,
} from "@mui/material";
import { type ReactNode, useEffect, useRef } from "react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  /* display: flex;
  flex-direction: column; */
  min-height: 100vh;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
  /* overflow: auto; */
`;

const ContentContainer = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: calc(100vh - ${({ theme }) => theme.mixins.toolbar.minHeight}px);
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
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isScrollingRef = useRef(false);
  const appContainerRef = useRef<HTMLDivElement | null>(null);
  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const isHomeVisible = useIntersectionObserver(homeRef, {
    rootMargin: "-45% 0px -45% 0px",
  });
  const isAboutVisible = useIntersectionObserver(aboutRef, {
    rootMargin: "-45% 0px -45% 0px",
  });

  useEffect(() => {
    const homeSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");

    if (homeSection instanceof HTMLDivElement) {
      homeRef.current = homeSection;
    }
    if (aboutSection instanceof HTMLDivElement) {
      aboutRef.current = aboutSection;
    }
  });

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (isHomeVisible && currentPath !== "/") {
      isScrollingRef.current = true;
      navigate("/", { replace: true });
    } else if (isAboutVisible && currentPath !== "/about") {
      isScrollingRef.current = true;
      navigate("/about", { replace: true });
    }
    // Add more conditions for other sections here
  }, [isHomeVisible, isAboutVisible, navigate]); // Keep the dependencies for visibility states

  useEffect(() => {
    if (isScrollingRef.current) {
      isScrollingRef.current = false; // Reset the flag
      return;
    }

    // const scrollToSection = (path: string) => {
    //   const sectionId = path.substring(1) || "home";
    //   const sectionElement = document.getElementById(sectionId);

    //   // Get the dynamic navbar height with a fallback
    //   const navbarHeight =
    //     parseFloat(theme.mixins.toolbar.minHeight as string) || 64;

    //   if (sectionElement && appContainerRef.current) {
    //     // 💡 Calculate the correct top position by subtracting the navbar's height
    //     const topPosition = sectionElement.offsetTop - navbarHeight;

    //     // 💡 Scroll the container ref, not the window
    //     appContainerRef.current.scrollTo({
    //       top: topPosition,
    //       behavior: "smooth",
    //     });
    //   }
    // };

    // // Only call the function when the path changes
    // scrollToSection(location.pathname);
  }, [location, theme]); // Dependencies ensure the effect runs on route changes

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppContainer ref={appContainerRef}>
        <Navbar />
        {/* <ContentContainer> */}
        {sections.map((section) => (
          <React.Fragment key={section.id}>{section.element}</React.Fragment>
        ))}
        {/* </ContentContainer> */}
      </AppContainer>
    </ThemeProvider>
  );
}
