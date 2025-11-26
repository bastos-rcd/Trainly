"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Exercise, ExerciseType } from "@/lib/entities/exercise";
import { ExerciseService } from "@/lib/services/exercise.service";

export default function ExerciseEdit() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);
  const workout = Number(params.workout);
  const classInput =
    "w-full bg-slate-50 rounded-lg border border-slate-500 p-2";

  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    type: "normal" as ExerciseType,
    sets: 1,
    reps: "",
    weight: 0,
    id_workout: workout,
  });
  useEffect(() => {
    async function load() {
      if (id !== 0) {
        const w = await ExerciseService.get(id);
        if (w) setExercise(w);
      }
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const id = await ExerciseService.save(exercise);

    router.push(`/exercises/${id}`);
  }

  return (
    <>
      <h1 className="w-full text-xl text-center font-bold">
        {id === 0 ? "Création d'un exercice" : "Édition d'un exercice"}
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
        <input
          className={classInput}
          placeholder="Nom"
          value={exercise.name}
          onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
          required
        />

        <select
          className={classInput}
          value={exercise.type}
          onChange={(e) =>
            setExercise({ ...exercise, type: e.target.value as ExerciseType })
          }
        >
          <option value="normal">normal</option>
          <option value="super-set">super-set</option>
          <option value="top-set">top-set</option>
          <option value="drop-set">drop-set</option>
        </select>

        <input
          type="number"
          className={classInput}
          placeholder="Nombre de séries"
          value={exercise.sets}
          onChange={(e) =>
            setExercise({ ...exercise, sets: Number(e.target.value) })
          }
          required
        />

        <input
          className={classInput}
          placeholder="Répétitions"
          value={exercise.reps}
          onChange={(e) => setExercise({ ...exercise, reps: e.target.value })}
          required
        />

        <input
          type="number"
          className={classInput}
          placeholder="Poids"
          value={exercise.weight}
          onChange={(e) =>
            setExercise({ ...exercise, weight: Number(e.target.value) })
          }
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
            href={id === 0 ? `/workouts/${workout}` : `/exercises/${id}`}
            className="w-1/2 text-center bg-red-300 rounded-lg text-white font-semibold uppercase p-2"
          >
            Annuler
          </Link>
        </div>
      </form>
    </>
  );
}
