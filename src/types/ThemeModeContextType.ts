import type { PaletteMode } from "@mui/material";

export type ThemeModeContextType = {
  themeMode: PaletteMode;
  toggleThemeMode: () => void;
};
