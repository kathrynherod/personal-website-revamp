import { createContext } from "react";
import type { ThemeModeContextType } from "../types/ThemeModeContextType";

export const ThemeModeContext = createContext<ThemeModeContextType>({
  themeMode: "light",
  toggleThemeMode: () => {},
});
