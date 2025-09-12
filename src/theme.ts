import { createTheme } from "@mui/material/styles";

// Define the typography for both themes
const typography = {
  fontFamily: "Poppins, Arial, sans-serif",
  fontWeightRegular: 400,
  fontWeightBold: 800,
  h1: {
    fontSize: "64px",
    fontWeight: 800,
  },
  h2: {
    fontSize: "32px",
    fontWeight: 800,
  },
  h3: {
    fontSize: "28px",
    fontWeight: 800,
  },
  h4: {
    fontSize: "24px",
    fontWeight: 800,
  },
  h5: {
    fontSize: "20px",
    fontWeight: 800,
  },
  h6: {
    fontSize: "18px",
    fontWeight: 800,
  },
  body1: {
    fontSize: "16px",
    fontWeight: 400,
  },
};

// Create the light theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#01344D",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#9CCE4D",
      paper: "#9CCE4D",
    },
    text: {
      primary: "#01344D",
      secondary: "#01344D",
    },
  },
  typography,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#9CCE4D",
          color: "#01344D",
          boxShadow: "none",
          backgroundImage: "none",
          transition: "background-color 0.5s ease, color 0.5s ease",
          "& *": {
            color: "#01344D",
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
      default: "#01344D",
      paper: "#01344D",
    },
  },
  typography,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#01344D",
          color: "#FFFFFF",
          boxShadow: "none",
          backgroundImage: "none",
          transition: "background-color 0.5s ease, color 0.5s ease",
        },
      },
    },
  },
});
