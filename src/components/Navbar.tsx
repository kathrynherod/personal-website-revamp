import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { NavLink } from "react-router-dom";

import type { NavbarPage } from "../types/NavbarPage";
import AppLogo from "./AppLogo";
import ThemeToggle from "./ThemeToggle";

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
            aria-label="navigation menu"
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
            <MenuItem>
              <ThemeToggle />
            </MenuItem>
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
