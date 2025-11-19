import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProgram, deleteProgram } from "../../services/programService";

export default function ProgramsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    async function load() {
      const p = await getProgram(Number(id));
      setProgram(p);
      console.log(p.workouts);
    }
    load();
  }, [id]);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-x-4">
        <h1 className="text-xl font-bold">{program?.name}</h1>

        <Link to="/programs">
          <img src="/back.webp" className="w-8 bg-blue-400 rounded-lg p-2" />
        </Link>
      </div>

      <div className="flex flex-row justify-center items-center gap-x-4">
        <Link to={`/programs/${program?.id}/new-workout`}>
          <img src="/new.webp" className="w-8 bg-emerald-400 rounded-lg p-2" />
        </Link>

        <Link to={`/programs/${program?.id}/edit`}>
          <img src="/edit.webp" className="w-8 bg-yellow-400 rounded-lg p-2" />
        </Link>

        <button
          onClick={async () => {
            await deleteProgram(program.id);
            navigate("/programs");
          }}
        >
          <img src="/trash.webp" className="w-8 bg-red-400 rounded-lg p-2" />
        </button>
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        {program?.workouts.map((workout, index) => (
          <div
            className="w-full bg-slate-300 rounded-lg flex flex-col justify-center items-center p-4 gap-y-2"
            onClick={() =>
              navigate(`/programs/${program.id}/workouts/${index}`)
            }
          >
            <h2 className="text-lg font-semibold">{workout.name}</h2>

            <span>{workout.exercises?.length ?? 0} exercices</span>
          </div>
        ))}
      </div>
    </>
  );
}
