"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Program } from "@/lib/entities/program";
import { ProgramService } from "@/lib/services/program.service";

export default function ProgramEdit() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const classInput =
    "w-full bg-slate-50 rounded-lg border border-slate-500 p-2";

  const [program, setProgram] = useState<Program>({ name: "", tag: "" });
  useEffect(() => {
    async function load() {
      if (id !== 0) {
        const p = await ProgramService.get(id);
        if (p) setProgram(p);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = await ProgramService.save(program);
    router.push(`/programs/${id}`);
  }

  return (
    <>
      <h1 className="w-full text-xl text-center font-bold">
        {id === 0 ? "Création d'un plan" : "Édition de plan"}
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <input
          className={classInput}
          placeholder="Nom"
          value={program.name}
          onChange={(e) => setProgram({ ...program, name: e.target.value })}
          required
        />

        <input
          className={classInput}
          placeholder="Tag"
          value={program.tag}
          onChange={(e) => setProgram({ ...program, tag: e.target.value })}
          required
        />

        <div className="w-full flex flex-row gap-x-4">
          <button
            type="submit"
            className="w-1/2 text-center bg-emerald-300 rounded-lg text-white font-semibold uppercase p-2"
          >
            {id === 0 ? "Créer" : "Enregistrer"}
          </button>

          <Link
            href={id === 0 ? "/" : `/programs/${id}`}
            className="w-1/2 text-center bg-red-300 rounded-lg text-white font-semibold uppercase p-2"
          >
            Annuler
          </Link>
        </div>
      </form>
    </>
  );
}
