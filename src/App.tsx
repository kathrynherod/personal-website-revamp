import { ThemeProvider, CssBaseline, Box, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import { useThemeMode } from "./hooks/useThemeMode";
import Navbar from "./components/Navbar";

const AppContainer = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  color: ${(props) => props.theme.palette.text.primary};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentContainer = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
`;

function App() {
  const [themeMode] = useThemeMode();
  console.log("Current theme mode:", themeMode);

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppContainer>
        <Navbar />
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
