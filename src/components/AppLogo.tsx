import { styled, useTheme } from "@mui/material/styles";

import darkLogo from "../assets/images/logo-dark.svg";
import lightLogo from "../assets/images/logo-light.svg";

const StyledLogo = styled("img")`
  height: auto;
  transition: transform 0.2s ease;
  width: 50px;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function AppLogo() {
  const theme = useTheme();
  const logoSrc = theme.palette.mode === "dark" ? darkLogo : lightLogo;

  return <StyledLogo src={logoSrc} alt="Kathryn Herod Logo" />;
}
