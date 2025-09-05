import { createBrowserRouter } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Hobbies from "./routes/Hobbies";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Experience from "./routes/Experience";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "about", element: <About /> },
      { path: "experience", element: <Experience /> },
      { path: "hobbies", element: <Hobbies /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
