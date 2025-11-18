import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPrograms } from "../../services/programService";

export default function ProgramsList() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getPrograms();
      setPrograms(data);
    }
    load();
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-x-4">
        <h1 className="text-xl font-bold">Liste des programmes</h1>

        <Link to="/new-program">
          <img src="/new.webp" className="w-8 bg-emerald-400 rounded-lg p-2" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        {programs.map((program) => (
          <div
            key={program.id}
            className="w-full bg-slate-300 rounded-lg flex flex-col justify-center items-center p-4 gap-y-2"
            onClick={() => navigate(`/programs/${program.id}`)}
          >
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold">{program.name}</h2>
              {program.type === "powerlifting" && (
                <span className="bg-blue-400 rounded-lg px-1 py-0.5 text-white text-sm">
                  {program.type}
                </span>
              )}
              {program.type === "bodybuilding" && (
                <span className="bg-violet-400 rounded-lg px-1 py-0.5 text-white text-sm">
                  {program.type}
                </span>
              )}
            </div>

            <span>{program.workouts?.length ?? 0} séances</span>
          </div>
        ))}
      </div>
    </>
  );
}
