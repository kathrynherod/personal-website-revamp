import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import type { PaletteMode } from "@mui/material";

// Create the provider component
export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

  // Effect to set initial theme and listen for system changes
  useEffect(() => {
    const storedMode = localStorage.getItem("themeMode");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial mode based on storage or system preference
    if (storedMode) {
      setThemeMode(storedMode as PaletteMode);
    } else if (prefersDarkMode.matches) {
      setThemeMode("dark");
    }

    // Listen for changes in system preference
    const mediaQueryListener = (event: MediaQueryListEvent) => {
      const newMode = event.matches ? "dark" : "light";
      setThemeMode(newMode);
      // When system theme changes, update localStorage as well
      localStorage.setItem("themeMode", newMode);
    };

    prefersDarkMode.addEventListener("change", mediaQueryListener);

    // Cleanup listener on component unmount
    return () => {
      prefersDarkMode.removeEventListener("change", mediaQueryListener);
    };
  }, []);

  // Function to toggle the theme manually
  const toggleThemeMode = useCallback((): void => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newMode);
    localStorage.setItem("themeMode", newMode);
  }, [themeMode]);

  const themeContextValue = {
    themeMode,
    toggleThemeMode,
  };

  return (
    <ThemeModeContext.Provider value={themeContextValue}>
      {children}
    </ThemeModeContext.Provider>
  );
};
