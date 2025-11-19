import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addExercise } from "../../services/exerciseService";

export default function ExercisesNew() {
  const { id, workoutIndex } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("standard");
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState("8-12");
  const [weight, setWeight] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !reps.trim() || sets <= 0) return;

    const newExercise = {
      name,
      type,
      sets,
      reps,
      weight,
    };

    await addExercise(Number(id), Number(workoutIndex), newExercise);

    navigate(`/programs/${id}/workouts/${workoutIndex}`);
  };

  return (
    <>
      <h1 className="text-xl font-bold">Nouvel exercice</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Nom de l'exercice"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-3/4 border rounded-lg p-2"
        >
          <option value="standard">standard</option>
          <option value="super set">super set</option>
        </select>

        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(Number(e.target.value))}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Nombre de séries"
        />

        <input
          type="text"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Répétitions (ex: 8-12)"
        />

        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Poids (kg)"
        />

        <div className="w-3/4 flex flex-row justify-between items-center gap-x-4">
          <button
            type="submit"
            className="w-1/2 text-white text-center uppercase rounded-lg bg-emerald-500 p-2"
          >
            Créer
          </button>

          <Link
            to={`/programs/${id}/workouts/${workoutIndex}`}
            className="w-1/2 text-white text-center uppercase rounded-lg bg-red-500 p-2"
          >
            Annuler
          </Link>
        </div>
      </form>
    </>
  );
}
