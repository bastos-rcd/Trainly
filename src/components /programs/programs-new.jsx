import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addProgram } from "../../services/programService";

export default function ProgramsNew() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("bodybuilding");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addProgram({
      name,
      type,
      workouts: [],
    });

    navigate("/");
  };

  return (
    <>
      <h1 className="text-xl font-bold">Nouveau programme</h1>

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
            to="/"
            className="w-1/2 text-white text-center uppercase rounded-lg bg-red-500 p-2"
          >
            Annuler
          </Link>
        </div>
      </form>
    </>
  );
}
