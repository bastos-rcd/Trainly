import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style.css";
import App from "./App.jsx";
import ProtectedRoute from "./components /protected-route.jsx";

import Home from "./components /home.jsx";

import ProgramsList from "./components /programs/programs-list.jsx";
import ProgramsNew from "./components /programs/programs-new.jsx";
import ProgramsDetails from "./components /programs/programs-details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/programs",
        element: (
          <ProtectedRoute>
            <ProgramsList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/new-program",
        element: (
          <ProtectedRoute>
            <ProgramsNew />
          </ProtectedRoute>
        ),
      },
      {
        path: "/programs/:id",
        element: (
          <ProtectedRoute>
            <ProgramsDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
