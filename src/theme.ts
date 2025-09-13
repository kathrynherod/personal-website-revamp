import { createTheme } from "@mui/material/styles";

const darkBlue = "#01344D";
const limeGreen = "#9CCE4D";

declare module "@mui/material/styles" {
  interface Palette {
    brand: {
      darkBlue: string;
      limeGreen: string;
    };
  }

  interface PaletteOptions {
    brand?: {
      darkBlue?: string;
      limeGreen?: string;
    };
  }
}

const typography = {
  fontFamily: "Poppins, Arial, sans-serif",
  fontWeightRegular: 400,
  fontWeightBold: 800,
  h1: {
    fontSize: "4rem",
    fontWeight: 800,
    lineHeight: 1.2,
    "@media (min-width:600px)": {
      fontSize: "6rem",
    },
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 800,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 800,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 800,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 800,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "1.125rem",
    fontWeight: 800,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.875,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.75,
  },
};

const baseTheme = {
  typography,
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light" as const,
    primary: {
      main: darkBlue,
    },
    secondary: {
      main: "#002A3D",
    },
    background: {
      default: limeGreen,
      paper: "#ffffff",
    },
    text: {
      primary: darkBlue,
      secondary: "#002A3D",
    },
    brand: {
      darkBlue,
      limeGreen,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: limeGreen,
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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark" as const,
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: limeGreen,
    },
    background: {
      default: darkBlue,
      paper: darkBlue,
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
    brand: {
      darkBlue,
      limeGreen,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkBlue,
          color: "#ffffff",
          boxShadow: "none",
          backgroundImage: "none",
          transition: "background-color 0.5s ease, color 0.5s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
