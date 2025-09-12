import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ThemeModeProvider } from "./providers/ThemeModeProvider";
import { browserRouter } from "./Router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <RouterProvider router={browserRouter} />
    </ThemeModeProvider>
  </StrictMode>,
);
