import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";

import { useThemeMode } from "../hooks/useThemeMode";

export default function ThemeToggle() {
  const [mode, toggleMode] = useThemeMode();
  const isDarkMode = mode === "dark";
  return (
    <IconButton
      onClick={() => toggleMode()}
      color="secondary"
      aria-label={isDarkMode ? "toggle light mode" : "toggle dark mode"}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
