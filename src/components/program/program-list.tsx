"use client";

import { useEffect, useState } from "react";

import { Program } from "@/lib/entities/program";
import { ProgramService } from "@/lib/services/program.service";

import ProgramItem from "@/components/program/program-item";

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  useEffect(() => {
    ProgramService.list().then((data) => {
      setPrograms(data);
    });
  }, []);

  return (
    <>
      {programs.length === 0 ? (
        <p className="text-gray-500">Aucun plan pour le moment.</p>
      ) : (
        <ul className="w-full space-y-2">
          {programs.map((p) => (
            <ProgramItem key={p.id} program={p} />
          ))}
        </ul>
      )}
    </>
  );
}
