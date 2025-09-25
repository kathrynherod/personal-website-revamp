import { ThemeProvider } from "@mui/material";
import React from "react";

import { ThemeModeProvider } from "../providers/ThemeModeProvider";
import { lightTheme } from "../theme";

export function TestProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeModeProvider>
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    </ThemeModeProvider>
  );
}