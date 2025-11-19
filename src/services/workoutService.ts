import { getProgram, updateProgram } from "./programService";
import type { Workout } from "../models/models";

export async function addWorkout(programId: number, workout: Workout): Promise<void> {
    const program = await getProgram(programId);
    if (!program) return;

    program.workouts.push(workout);
    await updateProgram(programId, { workouts: program.workouts });
}

export async function updateWorkout(programId: number, index: number, updated: Workout): Promise<void> {
    const program = await getProgram(programId);
    if (!program) return;

    const oldWorkout = program.workouts[index];
    const newWorkout: Workout = {
        ...oldWorkout,
        ...updated,
        exercises: oldWorkout.exercises
    };

    const newWorkouts = [...program.workouts];
    newWorkouts[index] = newWorkout;

    await updateProgram(programId, { workouts: newWorkouts });
}

export async function deleteWorkout(programId: number, index: number): Promise<void> {
    const program = await getProgram(programId);
    if (!program) return;

    program.workouts.splice(index, 1);
    await updateProgram(programId, { workouts: program.workouts });
}