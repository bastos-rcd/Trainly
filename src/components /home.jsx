import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../services/userService";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    async function checkUser() {
      const user = await getUser();
      if (user) {
        navigate("/programs", { replace: true });
      }
    }
    checkUser();
  }, [navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (name.trim().length === 0) return;

    await setUser(name);
    navigate("/programs", { replace: true });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Pseudo"
        className="w-3/4 border rounded-lg p-2"
      />

      <button
        onClick={handleClick}
        className="w-3/4 text-white uppercase rounded-lg bg-emerald-500 p-2"
      >
        Valider
      </button>
    </div>
  );
}
