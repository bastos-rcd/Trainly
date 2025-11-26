"use client";

import Link from "next/link";

import { Exercise } from "@/lib/entities/exercise";

export default function ExerciseItem({ exercise }: { exercise: Exercise }) {
  return (
    <>
      <li className="p-4 bg-slate-200 rounded-lg">
        <Link
          href={`/exercises/${exercise.id}`}
          className="w-full flex flex-row justify-between items-center"
        >
          <h2 className="font-semibold text-lg">{exercise.name}</h2>
          <span className="bg-teal-300 p-1 rounded-lg">{exercise.type}</span>
        </Link>
      </li>
    </>
  );
}
