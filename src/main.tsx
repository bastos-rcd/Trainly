import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style.css";
import App from "./App.jsx";
import ProtectedRoute from "./components /ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Programs from "./pages/Programs.jsx";

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
            <Programs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
