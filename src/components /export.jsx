import { useEffect, useState } from "react";
import { getPrograms } from "../services/programService";

export default function Export() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function load() {
      const allPrograms = await getPrograms();
      setPrograms(allPrograms);
    }
    load();
  }, []);

  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(programs, null, 2));

    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "trainly.json";
    link.click();
  };

  return (
    <>
      <button
        onClick={handleDownload}
        className="w-1/2 text-white text-center uppercase rounded-lg bg-emerald-500 p-2"
      >
        Exporter
      </button>

      <pre className="border rounded-lg overflow-x-auto p-4">
        {JSON.stringify(programs, null, 2)}
      </pre>
    </>
  );
}
