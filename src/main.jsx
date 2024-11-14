import { createRoot } from "react-dom/client";
import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Root from "./routes/Root.jsx";
import Home from "./routes/Home.jsx";
import Search from "./routes/Search.jsx";
import Random from "./routes/Random.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/random",
        element: <Random />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
