import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProgram } from "../../services/programService";
import { updateExercise } from "../../services/exerciseService";

export default function ExercisesEdit() {
  const { id, workoutIndex, exerciseIndex } = useParams();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    async function load() {
      const program = await getProgram(Number(id));
      if (!program) return;

      const workout = program.workouts[Number(workoutIndex)];
      if (!workout) return;

      const ex = workout.exercises[Number(exerciseIndex)];
      setExercise(ex);
    }
    load();
  }, [id, workoutIndex, exerciseIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExercise(
      Number(id),
      Number(workoutIndex),
      Number(exerciseIndex),
      exercise
    );

    navigate(`/programs/${id}/workouts/${workoutIndex}`);
  };

  return (
    <>
      <h1 className="text-xl font-bold">Modifier l'exercice</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-4"
      >
        <input
          type="text"
          value={exercise?.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Nom de l'exercice"
        />

        <select
          value={exercise?.type}
          onChange={(e) => setExercise({ ...exercise, type: e.target.value })}
          className="w-3/4 border rounded-lg p-2"
        >
          <option value="standard">standard</option>
          <option value="super set">super set</option>
        </select>

        <input
          type="number"
          value={exercise?.sets}
          onChange={(e) =>
            setExercise({ ...exercise, sets: Number(e.target.value) })
          }
          placeholder="Séries"
          className="w-3/4 border rounded-lg p-2"
        />

        <input
          type="text"
          value={exercise?.reps}
          onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
          placeholder="Répétitions"
          className="w-3/4 border rounded-lg p-2"
        />

        <input
          type="number"
          value={exercise?.weight}
          onChange={(e) =>
            setExercise({ ...exercise, weight: Number(e.target.value) })
          }
          placeholder="Poids (kg)"
          className="w-3/4 border rounded-lg p-2"
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
