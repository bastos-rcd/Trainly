import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProgram } from "../../services/programService";
import { deleteWorkout } from "../../services/workoutService";
import { deleteExercise } from "../../services/exerciseService";

export default function WorkoutsDetails() {
  const { id, workoutIndex } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);
  const [program, setProgram] = useState(null);

  useEffect(() => {
    async function load() {
      const p = await getProgram(Number(id));
      setProgram(p);
      setWorkout(p.workouts[Number(workoutIndex)]);
    }
    load();
  }, [id, workoutIndex]);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-x-4">
        <h1 className="text-xl font-bold">{workout?.name}</h1>

        <Link to={`/programs/${program?.id}`}>
          <img src="/back.webp" className="w-8 bg-blue-400 rounded-lg p-2" />
        </Link>
      </div>

      <div className="flex flex-row justify-center items-center gap-x-4">
        <Link
          to={`/programs/${program?.id}/workouts/${workoutIndex}/new-exercise`}
        >
          <img src="/new.webp" className="w-8 bg-emerald-400 rounded-lg p-2" />
        </Link>

        <Link to={`/programs/${program?.id}/workouts/${workoutIndex}/edit`}>
          <img src="/edit.webp" className="w-8 bg-yellow-400 rounded-lg p-2" />
        </Link>

        <button
          onClick={async () => {
            if (confirm("Supprimer cet entraînement ?")) {
              await deleteWorkout(program.id, Number(workoutIndex));
              navigate(`/programs/${program.id}`);
            }
          }}
        >
          <img src="/trash.webp" className="w-8 bg-red-400 rounded-lg p-2" />
        </button>
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        {(workout?.exercises ?? []).map((exercise, index) => (
          <div className="w-full bg-slate-300 rounded-lg flex flex-col justify-center items-center p-4 gap-y-2">
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold">{exercise.name}</h2>

              <div className="flex flex-row justify-center items-center gap-x-2">
                <Link
                  to={`/programs/${program?.id}/workouts/${workoutIndex}/exercises/${index}/edit`}
                >
                  <img
                    src="/edit.webp"
                    className="w-8 bg-yellow-400 rounded-lg p-2"
                  />
                </Link>

                <button
                  onClick={async () => {
                    if (confirm("Supprimer cet exercice ?")) {
                      await deleteExercise(
                        program.id,
                        Number(workoutIndex),
                        index
                      );
                      navigate(`/programs/${program.id}`);
                    }
                  }}
                >
                  <img
                    src="/trash.webp"
                    className="w-8 bg-red-400 rounded-lg p-2"
                  />
                </button>
              </div>
            </div>

            <div className="w-full flex flex-row justify-start items-center gap-x-2">
              <span className="bg-slate-400 rounded-lg px-1 py-0.5 text-white text-sm">
                {exercise.sets} séries
              </span>

              {exercise.type === "standard" && (
                <span className="bg-blue-400 rounded-lg px-1 py-0.5 text-white text-sm">
                  {exercise.type}
                </span>
              )}
              {exercise.type === "super set" && (
                <span className="bg-red-400 rounded-lg px-1 py-0.5 text-white text-sm">
                  {exercise.type}
                </span>
              )}
            </div>

            <div className="w-full flex flex-row justify-center items-center gap-x-2">
              <span className="bg-violet-400 rounded-lg px-1 py-0.5 text-white text-sm">
                {exercise.reps} séries
              </span>

              <span className="bg-slate-400 rounded-lg px-1 py-0.5 text-white text-sm">
                {exercise.weight} kg
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
