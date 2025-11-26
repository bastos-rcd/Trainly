"use client";

import Link from "next/link";

import { Program } from "@/lib/entities/program";

export default function ProgramItem({ program }: { program: Program }) {
  return (
    <>
      <li className="p-4 bg-slate-200 rounded-lg">
        <Link
          href={`/programs/${program.id}`}
          className="w-full flex flex-row justify-between items-center"
        >
          <h2 className="font-semibold text-lg">{program.name}</h2>
          <span className="bg-teal-300 p-1 rounded-lg">{program.tag}</span>
        </Link>
      </li>
    </>
  );
}
