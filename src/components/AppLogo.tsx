import { styled, useTheme } from "@mui/material/styles";
import lightLogo from "../assets/images/logo-light.svg";
import darkLogo from "../assets/images/logo-dark.svg";
import { Link } from "react-router-dom";

const StyledLogo = styled("img")`
  width: 50px;
`;

function AppLogo() {
  const theme = useTheme();
  const logoSrc = theme.palette.mode === "dark" ? darkLogo : lightLogo;

  return (
    <Link to="/">
      <StyledLogo src={logoSrc} alt="Kathryn Herod Logo" />
    </Link>
  );
}

export default AppLogo;
