import {
  ThemeProvider,
  CssBaseline,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link as MuiLink,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "../theme";
import { useThemeMode } from "../hooks/useThemeMode";

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Button color="inherit" component={Link} to={to}>
    {children}
  </Button>
);

export default function Layout() {
  const [mode, toggleMode] = useThemeMode();

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
            >
              Kathryn Herod
            </Typography>
            <nav>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>
            <Button color="inherit" onClick={toggleMode} sx={{ ml: 2 }}>
              Toggle Mode
            </Button>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
          <Outlet />
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              <MuiLink color="inherit" href="https://kathrynherod.com/">
                Kathryn Herod
              </MuiLink>{" "}
              {new Date().getFullYear()}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
