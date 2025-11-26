"use client";

import { useEffect, useState } from "react";

import { Workout } from "@/lib/entities/workout";
import { WorkoutService } from "@/lib/services/workout.service";

import WorkoutItem from "@/components/workout/workout-item";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  useEffect(() => {
    WorkoutService.list().then((data) => {
      setWorkouts(data);
    });
  }, []);

  return (
    <>
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
