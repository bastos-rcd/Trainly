"use client";

import ButtonImage from "@/components/button";
import { TransferService } from "@/lib/services/transfer.service";

export default function Export() {
  const handleExport = async () => {
    const data = await TransferService.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "trainly.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <h1 className="w-full text-xl text-center font-bold">Exporter</h1>

      <ButtonImage onClick={handleExport} color="blue" img="export" />
    </>
  );
}
