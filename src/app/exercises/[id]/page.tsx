"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import LinkImage from "@/components/link";
import ButtonImage from "@/components/button";

import { Exercise } from "@/lib/entities/exercise";
import { ExerciseService } from "@/lib/services/exercise.service";

export default function ExerciseDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [exercice, setExercice] = useState<Exercise | null>(null);
  useEffect(() => {
    async function load() {
      const e = await ExerciseService.get(id);
      if (e) {
        setExercice(e);
      } else {
        router.replace("/");
      }
    }
    load();
  }, [id]);

  async function onDelete() {
    if (
      confirm(`Voulez-vous vraiment supprimer la séance ${exercice?.name} ?`)
    ) {
      await ExerciseService.delete(exercice?.id!);
      router.push(
        `/workouts/${exercice?.id_workout ? exercice.id_workout : 0}`
      );
    }
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-x-2">
        <h1 className="w-full text-xl text-left font-bold">{exercice?.name}</h1>
        <LinkImage
          link={`/workouts/${exercice?.id_workout ? exercice.id_workout : 0}`}
          color="blue"
          img="back"
        />
      </div>

      <div className="w-full flex flex-row justify-evenly items-center gap-x-2">
        <LinkImage
          link={`/exercises/edit/${id}/${
            exercice?.id_workout ? exercice.id_workout : 0
          }`}
          color="orange"
          img="edit"
        />

        <ButtonImage onClick={onDelete} color="red" img="trash" />
      </div>

      <p className="text-lg font-semibold border p-1 rounded-lg">
        <span className="text-red-500">{exercice?.sets}</span> séries en{" "}
        <span className="text-emerald-500">{exercice?.type}</span>
      </p>

      <p className="text-lg font-semibold border p-1 rounded-lg">
        <span className="text-violet-500">{exercice?.reps}</span> répétitions à{" "}
        <span className="text-amber-700">{exercice?.weight}</span> kg
      </p>
    </>
  );
}
