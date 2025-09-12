import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

import darkLogo from "../assets/images/logo-dark.svg";
import lightLogo from "../assets/images/logo-light.svg";

const StyledLink = styled(Link)`
  :hover {
    border-bottom: none;
  }
`;

const StyledLogo = styled("img")`
  height: auto;
  transition: transform 0.2s ease;
  width: 50px;
`;

function AppLogo() {
  const theme = useTheme();
  const logoSrc = theme.palette.mode === "dark" ? darkLogo : lightLogo;

  return (
    <StyledLink to="/" aria-label="Kathryn Herod - Home">
      <StyledLogo src={logoSrc} alt="Kathryn Herod Logo" />
    </StyledLink>
  );
}

export default AppLogo;
