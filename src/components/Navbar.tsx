import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppLogo from "./AppLogo";
import ThemeToggle from "./ThemeToggle";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import type { NavbarPage } from "../types/NavbarPage";

const pages: NavbarPage[] = [
  { display: "About", route: "/about" },
  { display: "Experience", route: "/experience" },
  { display: "Hobbies", route: "/hobbies" },
];

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;
const MobileMenuItems = styled(Box)`
  display: flex;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
    /* align-items: center;
    justify-content: center; */
  }
`;
const DesktopMenuItems = styled(Box)`
  display: none;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CustomMenuItemDivider = styled(Divider)`
  background-color: ${(props) => props.theme.palette.secondary.main};
  height: 1rem;
  rotate: 15deg;
  width: 2px;
`;

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <AppLogo />

        <MobileMenuItems>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map(({ display, route }: NavbarPage) => (
              <MenuItem key={route} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center" }}>{display}</Typography>
              </MenuItem>
            ))}
            <ThemeToggle />
          </Menu>
        </MobileMenuItems>

        {/** Desktop Navigation */}
        <DesktopMenuItems>
          {pages.map((page: NavbarPage, index: number) => (
            <React.Fragment key={page.display}>
              <NavLink to={page.route} onClick={handleCloseNavMenu}>
                {page.display}
              </NavLink>
              {index < pages.length - 1 && (
                <Stack direction="row" spacing={1}>
                  <CustomMenuItemDivider flexItem orientation="vertical" />
                  <CustomMenuItemDivider flexItem orientation="vertical" />
                </Stack>
              )}
            </React.Fragment>
          ))}
          <ThemeToggle />
        </DesktopMenuItems>
      </StyledToolbar>
    </AppBar>
  );
}
