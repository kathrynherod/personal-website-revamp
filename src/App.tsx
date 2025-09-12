import {
  ThemeProvider,
  CssBaseline,
  Box,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import { useThemeMode } from "./hooks/useThemeMode";
import Navbar from "./components/Navbar";
import { useEffect, useRef, type ReactNode } from "react";
import Home from "./routes/Home";
import About from "./routes/About";
import Experience from "./routes/Experience";
import Hobbies from "./routes/Hobbies";
import React from "react";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";

const AppContainer = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  color: ${(props) => props.theme.palette.text.primary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  transition:
    background-color 0.5s ease,
    color 0.5s ease;
  overflow: auto;
`;

const ContentContainer = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: calc(100vh - ${({ theme }) => theme.mixins.toolbar.minHeight}px);
`;

const AboutTab = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.paper};
  border-radius: 0 0 2px 2px;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.palette.text.primary};
  cursor: pointer;
  left: 0;
  padding: 0.5rem 2rem;
  position: fixed;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: 0 0;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  &:hover {
    transform: translateY(-50%) rotate(-90deg) scale(1.05);
    z-index: 1001;
  }
`;

type AppSection = {
  path: string;
  name: string;
  id: string;
  element: ReactNode;
};

const sections: AppSection[] = [
  { path: "/", name: "Home", id: "home", element: <Home /> },
  { path: "/about", name: "About", id: "about", element: <About /> },
  {
    path: "/experience",
    name: "Experience",
    id: "experience",
    element: <Experience />,
  },
  { path: "/hobbies", name: "Hobbies", id: "hobbies", element: <Hobbies /> },
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

  // // New useEffect to update the URL based on visibility
  // useEffect(() => {
  //   // You can also use location.pathname to avoid infinite loops if it's already on the path
  //   const currentPath = window.location.pathname;
  //   if (isHomeVisible && currentPath !== "/") {
  //     navigate("/", { replace: true });
  //   } else if (isAboutVisible && currentPath !== "/about") {
  //     navigate("/about", { replace: true });
  //   }
  //   // Add more conditions for other sections
  // }, [isAboutVisible, isHomeVisible, navigate]);

  // old scroll to section effect
  // useEffect(() => {
  //   const scrollToSection = (path: string) => {
  //     const sectionId = path.substring(1) || "home";
  //     const sectionElement = document.getElementById(sectionId);

  //     if (sectionElement) {
  //       sectionElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   };

  //   scrollToSection(location.pathname);
  // }, [location]);

  // 💡 This is the correct useEffect for smooth URL updates
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

    const scrollToSection = (path: string) => {
      const sectionId = path.substring(1) || "home";
      const sectionElement = document.getElementById(sectionId);

      // Get the dynamic navbar height with a fallback
      const navbarHeight =
        parseFloat(theme.mixins.toolbar.minHeight as string) || 64;

      if (sectionElement && appContainerRef.current) {
        // 💡 Calculate the correct top position by subtracting the navbar's height
        const topPosition = sectionElement.offsetTop - navbarHeight;

        // 💡 Scroll the container ref, not the window
        appContainerRef.current.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    };

    // Only call the function when the path changes
    scrollToSection(location.pathname);
  }, [location, theme]); // Dependencies ensure the effect runs on route changes

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppContainer ref={appContainerRef}>
        <Navbar />
        <ContentContainer>
          {isAboutVisible && (
            <AboutTab>
              <Typography variant="h6">About</Typography>
            </AboutTab>
          )}
          {sections.map((section) => (
            <React.Fragment key={section.id}>{section.element}</React.Fragment>
          ))}
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}
