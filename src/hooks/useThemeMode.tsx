import { useContext } from "react";
import { ThemeModeContext } from "../contexts/ThemeModeContext";
import type { ThemeModeContextType } from "../types/ThemeModeContextType";

// Custom hook to consume the theme context
/**
 * Custom hook to access the theme mode and a function to toggle it.
 * This hook must be used within a `ThemeModeProvider`.
 * @returns A tuple containing the current theme mode (`'light' | 'dark'`) and the `toggleThemeMode` function.
 */
export const useThemeMode = (): readonly [
  ThemeModeContextType["themeMode"],
  ThemeModeContextType["toggleThemeMode"]
] => {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return [context.themeMode, context.toggleThemeMode] as const;
};
