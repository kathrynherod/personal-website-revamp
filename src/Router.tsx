import { createBrowserRouter } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Hobbies from "./routes/Hobbies";
import Education from "./routes/Education";
import App from "./App";
import ErrorPage from "./components/ErrorPage";

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
      { path: "education", element: <Education /> },
      { path: "hobbies", element: <Hobbies /> },
      { path: "education", element: <Education /> },
      { path: "hobbies", element: <Hobbies /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
