import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AppLogo from "./AppLogo";
import ThemeToggle from "./ThemeToggle";
import { Divider, Stack, styled } from "@mui/material";

const pages = ["About", "Resume", "Hobbies"];

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;
const DesktopMenuItems = styled(Box)`
  display: "none";

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

        {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

        {/** Desktop Navigation */}
        <DesktopMenuItems>
          {pages.map((page: string, index: number) => (
            <React.Fragment key={page}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
              {index < pages.length - 1 && (
                <Stack direction="row" spacing={1}>
                  <CustomMenuItemDivider flexItem orientation="vertical" />
                  <CustomMenuItemDivider flexItem orientation="vertical" />
                </Stack>
              )}
            </React.Fragment>
          ))}
        </DesktopMenuItems>
        <ThemeToggle />
      </StyledToolbar>
    </AppBar>
  );
}
