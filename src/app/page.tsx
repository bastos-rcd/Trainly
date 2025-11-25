"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ProgramService } from "@/lib/services/program.service";
import { Program } from "@/lib/entities/program";

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  useEffect(() => {
    ProgramService.list().then(setPrograms);
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="w-full text-xl text-left font-bold">Mes programmes</h1>

        <Link href="/program/new" className="bg-emerald-300 rounded-lg p-2">
          <Image src="/icons/add.webp" alt="add" width={20} height={20} />
        </Link>
      </div>

      {programs.length === 0 ? (
        <p className="text-gray-500">Aucun programme pour le moment.</p>
      ) : (
        <ul className="w-full space-y-2">
          {programs.map((p, index) => (
            <li key={index} className="p-4 bg-slate-200 rounded-lg">
              <Link href={`/program/${p.id}`}>
                <div className="w-full flex flex-row justify-between items-center">
                  <h2 className="font-semibold text-lg">{p.name}</h2>
                  <span className="bg-blue-300 p-1 rounded-lg">{p.tag}</span>
                </div>
                <p className="w-full text-left font-thin">
                  {p.workouts.length} entraînement(s)
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
