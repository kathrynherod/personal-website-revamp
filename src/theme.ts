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
      main: "#01344D", // Dark Blue
    },
    secondary: {
      main: "#9CCE4D", // Lime Green
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
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
          backgroundColor: "#FFFFFF",
          color: "#01344D",
          boxShadow: "none",
          borderBottom: "1px solid #E0E0E0",
          backgroundImage: "none", // Override the Paper overlay
          "& *": {
            // Target all children of the AppBar
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
      main: "#FFFFFF", // White
    },
    secondary: {
      main: "#9CCE4D", // Lime Green
    },
    background: {
      default: "#01344D", // Dark Blue
      paper: "#01344D", // Dark Blue for Cards, etc.
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
          borderBottom: "1px solid #3A4A5A",
          backgroundImage: "none", // Override the Paper overlay
        },
      },
    },
  },
});
