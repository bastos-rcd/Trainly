"use client";

import { useRouter } from "next/navigation";

import { TransferService } from "@/lib/services/transfer.service";

export default function ImportPage() {
  const router = useRouter();

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      await TransferService.importAll(json);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="w-full text-xl text-center font-bold">Importer</h1>

      <input
        className="w-full bg-slate-50 rounded-lg border border-slate-500 p-2"
        type="file"
        accept="application/json"
        onChange={handleImport}
      />
    </>
  );
}
