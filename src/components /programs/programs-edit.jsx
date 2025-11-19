import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProgram, updateProgram } from "../../services/programService";

export default function ProgramsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("bodybuilding");

  useEffect(() => {
    async function load() {
      const program = await getProgram(Number(id));
      if (program) {
        setName(program.name);
        setType(program.type);
      }
    }

    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await updateProgram(Number(id), { name, type });

    navigate(`/programs/${id}`);
  };

  return (
    <>
      <h1 className="text-xl font-bold">Modifier le programme</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-3/4 border rounded-lg p-2"
          placeholder="Nom du programme"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-3/4 border rounded-lg p-2"
        >
          <option value="bodybuilding">Bodybuilding</option>
          <option value="powerlifting">Powerlifting</option>
        </select>

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
