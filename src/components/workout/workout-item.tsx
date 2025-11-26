"use client";

import Link from "next/link";

import { Workout } from "@/lib/entities/workout";

export default function WorkoutItem({ workout }: { workout: Workout }) {
  return (
    <>
      <li className="p-4 bg-slate-200 rounded-lg">
        <Link
          href={`/workouts/${workout.id}`}
          className="w-full flex flex-row justify-between items-center"
        >
          <h2 className="font-semibold text-lg">{workout.name}</h2>
          <span className="bg-teal-300 p-1 rounded-lg">{workout.tag}</span>
        </Link>
      </li>
    </>
  );
}
