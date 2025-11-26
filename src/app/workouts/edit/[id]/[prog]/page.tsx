"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Workout } from "@/lib/entities/workout";
import { WorkoutService } from "@/lib/services/workout.service";

export default function WorkoutEdit() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const prog = Number(params.prog);
  const classInput =
    "w-full bg-slate-50 rounded-lg border border-slate-500 p-2";

  const [workout, setWorkout] = useState<Workout>({
    name: "",
    tag: "",
  });
  useEffect(() => {
    async function load() {
      if (id === 0) {
        setWorkout({ name: "", tag: "" });
      } else {
        const w = await WorkoutService.get(id);
        if (w) setWorkout(w);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (prog !== 0) {
      const id = await WorkoutService.save({ ...workout, id_program: prog });
    } else {
      const id = await WorkoutService.save(workout);
    }
    router.push(`/workouts/${id}`);
  }

  return (
    <>
      <h1 className="w-full text-xl text-center font-bold">
        {id === 0 ? "Création d'une séance" : "Édition d'une séance"}
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <input
          className={classInput}
          placeholder="Nom"
          value={workout.name}
          onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
          required
        />

        <input
          className={classInput}
          placeholder="Tag"
          value={workout.tag}
          onChange={(e) => setWorkout({ ...workout, tag: e.target.value })}
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
            href={id === 0 ? "/" : `/workouts/${id}`}
            className="w-1/2 text-center bg-red-300 rounded-lg text-white font-semibold uppercase p-2"
          >
            Annuler
          </Link>
        </div>
      </form>
    </>
  );
}
