import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { importPrograms } from "../services/programService";

export default function Import() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      await importPrograms(data);
      navigate("/");
    } catch (err) {
      return;
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="w-3/4 border rounded-lg p-2"
      />

      <button
        onClick={handleImport}
        className="w-1/2 text-white text-center uppercase rounded-lg bg-emerald-500 p-2"
      >
        Importer
      </button>
    </>
  );
}
