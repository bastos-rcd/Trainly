"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import LinkImage from "@/components/link";
import ButtonImage from "@/components/button";
import WorkoutItem from "@/components/workout/workout-item";

import { Program } from "@/lib/entities/program";
import { ProgramService } from "@/lib/services/program.service";
import { Workout } from "@/lib/entities/workout";
import { WorkoutService } from "@/lib/services/workout.service";

export default function ProgramDetail() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const [program, setProgram] = useState<Program | null>(null);
  useEffect(() => {
    async function load() {
      const p = await ProgramService.get(id);
      if (p) {
        setProgram(p);
      } else {
        router.replace("/");
      }
    }
    load();
  }, [id]);

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    async function load() {
      const ws = await WorkoutService.listByProgram(id);
      setWorkouts(ws);
    }
    load();
  }, [id]);

  async function onDelete() {
    if (
      confirm(`Voulez-vous vraiment supprimer le programme ${program?.name} ?`)
    ) {
      await ProgramService.delete(program?.id!);
      router.push("/");
    }
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center gap-x-2">
        <h1 className="w-full text-xl text-left font-bold">{program?.name}</h1>
        <LinkImage link={`/`} color="blue" img="back" />
      </div>

      <div className="w-full flex flex-row justify-evenly items-center gap-x-2">
        <LinkImage link={`/workouts/edit/0/${id}`} color="emerald" img="add" />
        <LinkImage link={`/programs/edit/${id}`} color="orange" img="edit" />

        <ButtonImage onClick={onDelete} color="red" img="trash" />
      </div>

      {workouts.length === 0 ? (
        <p className="text-gray-500">Aucune séance pour le moment.</p>
      ) : (
        <ul className="w-full space-y-2">
          {workouts.map((w) => (
            <WorkoutItem key={w.id} workout={w} />
          ))}
        </ul>
      )}
    </>
  );
}
