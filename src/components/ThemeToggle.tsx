import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, styled } from "@mui/material";

import { useThemeMode } from "../hooks/useThemeMode";

const StyledIconButton = styled(IconButton)`
  svg {
    fill: ${(props) => props.theme.palette.tertiary.main};
  }
`;

export default function ThemeToggle() {
  const [mode, toggleMode] = useThemeMode();
  const isDarkMode = mode === "dark";

  return (
    <StyledIconButton
      onClick={() => toggleMode()}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </StyledIconButton>
  );
}
