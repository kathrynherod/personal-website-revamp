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

import AppLogo from "./AppLogo";
import ThemeToggle from "./ThemeToggle";

type NavbarPage = {
  display: string;
  id: string;
};

const pages: NavbarPage[] = [
  { display: "About", id: "about" },
  { display: "Experience", id: "experience" },
  { display: "Hobbies", id: "hobbies" },
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

const NavButton = styled("button")<{ $isActive: boolean }>`
  background: none;
  border: none;
  border-bottom: ${({ $isActive }) =>
    $isActive ? "2px solid currentColor" : "2px solid transparent"};
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  padding: 0.5rem 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    border-bottom: 2px solid currentColor;
  }
`;

type NavbarProps = {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
};

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Box
          component="button"
          onClick={() => onNavigate("home")}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <AppLogo />
        </Box>

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
            {pages.map(({ display, id }: NavbarPage) => (
              <MenuItem
                key={id}
                onClick={() => handleNavClick(id)}
                sx={{
                  backgroundColor:
                    activeSection === id ? "rgba(0,0,0,0.1)" : "transparent",
                }}
              >
                <Typography sx={{ textAlign: "center" }}>{display}</Typography>
              </MenuItem>
            ))}
            <MenuItem>
              <ThemeToggle />
            </MenuItem>
          </Menu>
        </MobileMenuItems>

        <DesktopMenuItems>
          {pages.map((page: NavbarPage, index: number) => (
            <React.Fragment key={page.display}>
              <NavButton
                onClick={() => handleNavClick(page.id)}
                $isActive={activeSection === page.id}
              >
                {page.display}
              </NavButton>
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
