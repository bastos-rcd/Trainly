import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProgram } from "../../services/programService";
import { updateWorkout } from "../../services/workoutService";

export default function WorkoutsEdit() {
  const { id, workoutIndex } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    async function load() {
      const program = await getProgram(Number(id));
      if (program) {
        setName(program.workouts[Number(workoutIndex)].name);
      }
    }
    load();
  }, [id, workoutIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await updateWorkout(Number(id), Number(workoutIndex), { name });

    navigate(`/programs/${id}/workouts/${workoutIndex}`);
  };

  return (
    <>
      <h1 className="text-xl font-bold">Modifier la séance</h1>

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
            Modifier
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
