import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./Router";
import { ThemeModeProvider } from "./providers/ThemeModeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <RouterProvider router={browserRouter} />
    </ThemeModeProvider>
  </StrictMode>
);
