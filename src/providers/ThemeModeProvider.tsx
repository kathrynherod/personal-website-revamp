import type { PaletteMode } from "@mui/material";
import { type ReactNode,useCallback, useEffect, useState } from "react";

import { ThemeModeContext } from "../contexts/ThemeModeContext";

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<PaletteMode>(() => {
    const storedMode = localStorage.getItem("themeMode");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    if (storedMode) {
      return storedMode as PaletteMode;
    } else if (prefersDarkMode.matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    const mediaQueryListener = (event: MediaQueryListEvent) => {
      const newMode = event.matches ? "dark" : "light";
      setThemeMode(newMode);
      localStorage.setItem("themeMode", newMode);
    };

    prefersDarkMode.addEventListener("change", mediaQueryListener);

    return () => {
      prefersDarkMode.removeEventListener("change", mediaQueryListener);
    };
  }, []);

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
