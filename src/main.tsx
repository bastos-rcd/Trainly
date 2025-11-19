import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./style.css";
import App from "./App.jsx";

import ProgramsList from "./components /programs/programs-list.jsx";
import ProgramsNew from "./components /programs/programs-new.jsx";
import ProgramsEdit from "./components /programs/programs-edit.jsx";
import ProgramsDetails from "./components /programs/programs-details.jsx";

import WorkoutsNew from "./components /workouts/workouts-new.jsx";
import WorkoutsEdit from "./components /workouts/workouts-edit.jsx";
import WorkoutsDetails from "./components /workouts/workouts-details.jsx";

import ExercisesNew from "./components /exercises/exercises-new.jsx";
import ExercisesEdit from "./components /exercises/exercises-edit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProgramsList /> },
      {
        path: "/programs/:id",
        element: <ProgramsDetails />,
      },
      {
        path: "/new-program",
        element: <ProgramsNew />,
      },
      {
        path: "/programs/:id/edit",
        element: <ProgramsEdit />,
      },
      {
        path: "/programs/:id/workouts/:workoutIndex",
        element: <WorkoutsDetails />,
      },
      {
        path: "/programs/:id/new-workout",
        element: <WorkoutsNew />,
      },
      {
        path: "/programs/:id/workouts/:workoutIndex/edit",
        element: <WorkoutsEdit />,
      },
      {
        path: "/programs/:id/workouts/:workoutIndex/new-exercise",
        element: <ExercisesNew />,
      },
      {
        path: "/programs/:id/workouts/:workoutIndex/exercises/:exerciseIndex/edit",
        element: <ExercisesEdit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
