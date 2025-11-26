"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import LinkImage from "@/components/link";
import ButtonImage from "@/components/button";
import ExerciseItem from "@/components/exercise/exercise-item";

import { Workout } from "@/lib/entities/workout";
import { WorkoutService } from "@/lib/services/workout.service";
import { Exercise } from "@/lib/entities/exercise";
import { ExerciseService } from "@/lib/services/exercise.service";

export default function ProgramDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  useEffect(() => {
    async function load() {
      const w = await WorkoutService.get(id);
      if (w) {
        setWorkout(w);
      } else {
        router.replace("/");
      }
    }
    load();
  }, [id]);

  const [exercises, setExercises] = useState<Exercise[]>([]);
  useEffect(() => {
    async function load() {
      const es = await ExerciseService.list(id);
      setExercises(es);
    }
    load();
  }, [id]);

  async function onDelete() {
    if (
      confirm(`Voulez-vous vraiment supprimer la séance ${workout?.name} ?`)
    ) {
      await WorkoutService.delete(workout?.id!);
      router.push(`/programs/${workout?.id_program ? workout.id_program : 0}`);
    }
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-x-2">
        <h1 className="w-full text-xl text-left font-bold">{workout?.name}</h1>
        <LinkImage
          link={`/programs/${workout?.id_program ? workout.id_program : 0}`}
          color="blue"
          img="back"
        />
      </div>

      <div className="w-full flex flex-row justify-evenly items-center gap-x-2">
        <LinkImage link={`/exercises/edit/0/${id}`} color="emerald" img="add" />
        <LinkImage
          link={`/workouts/edit/${id}/${
            workout?.id_program ? workout.id_program : 0
          }`}
          color="orange"
          img="edit"
        />

        <ButtonImage onClick={onDelete} color="red" img="trash" />
      </div>

      {exercises.length === 0 ? (
        <p className="text-gray-500">Aucun exercice pour le moment.</p>
      ) : (
        <ul className="w-full space-y-2">
          {exercises.map((e) => (
            <ExerciseItem key={e.id} exercise={e} />
          ))}
        </ul>
      )}
    </>
  );
}
