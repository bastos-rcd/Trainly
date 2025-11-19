import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addWorkout } from "../../services/workoutService";

export default function WorkoutsNew() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWorkout = {
      name,
      exercises: [],
    };

    await addWorkout(Number(id), newWorkout);

    navigate(`/programs/${id}`);
  };

  return (
    <>
      <h1 className="text-xl font-bold">Nouvelle séance</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Nom de la séance"
        />

        <div className="w-3/4 flex flex-row justify-between items-center gap-x-4">
          <button
            type="submit"
            className="w-1/2 text-white text-center uppercase rounded-lg bg-emerald-500 p-2"
          >
            Créer
          </button>

          <Link
            to={`/programs/${id}`}
            className="w-1/2 text-white text-center uppercase rounded-lg bg-red-500 p-2"
          >
            Annuler
          </Link>
        </div>
      </form>
    </>
  );
}
