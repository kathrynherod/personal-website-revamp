import { useContext } from "react";

import { ThemeModeContext } from "../contexts/ThemeModeContext";
import type { ThemeModeContextType } from "../types/ThemeModeContextType";

export const useThemeMode = (): readonly [
  ThemeModeContextType["themeMode"],
  ThemeModeContextType["toggleThemeMode"],
] => {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return [context.themeMode, context.toggleThemeMode] as const;
};
