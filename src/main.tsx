import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style.css";
import App from "./App.jsx";

import ProgramsList from "./components /programs/programs-list.jsx";
import ProgramsNew from "./components /programs/programs-new.jsx";
import ProgramsDetails from "./components /programs/programs-details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProgramsList /> },
      {
        path: "/new-program",
        element: <ProgramsNew />,
      },
      {
        path: "/programs/:id",
        element: <ProgramsDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
