import { createTheme } from "@mui/material/styles";

const darkBlue = "#01344D";
const lightGreen = "#9CCE4D";

const typography = {
  fontFamily: "Poppins, Arial, sans-serif",
  fontWeightRegular: 400,
  fontWeightBold: 800,
  h1: {
    fontSize: "4rem",
    fontWeight: 800,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 800,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 800,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 800,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 800,
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 800,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
  },
};

// Create the light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: darkBlue,
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: lightGreen,
      paper: lightGreen,
    },
    text: {
      primary: darkBlue,
      secondary: darkBlue,
    },
  },
  typography,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: lightGreen,
          color: darkBlue,
          boxShadow: "none",
          backgroundImage: "none",
          transition: "background-color 0.5s ease, color 0.5s ease",
          "& *": {
            color: darkBlue,
          },
        },
      },
    },
  },
});

// Create the dark theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#9CCE4D",
    },
    background: {
      default: darkBlue,
      paper: darkBlue,
    },
  },
  typography,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkBlue,
          color: "#FFFFFF",
          boxShadow: "none",
          backgroundImage: "none",
          transition: "background-color 0.5s ease, color 0.5s ease",
        },
      },
    },
  },
});
