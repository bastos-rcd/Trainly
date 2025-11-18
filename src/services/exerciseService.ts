import { getProgram, updateProgram } from "./programService";
import type { Exercise } from "../models/models";

export async function addExercise(programId: number, workoutIndex: number, exercise: Exercise): Promise<void> {
    const program = await getProgram(programId);
    if (!program) return;

    program.workouts[workoutIndex].exercises.push(exercise);
    await updateProgram(programId, { workouts: program.workouts });
}

export async function updateExercise(programId: number, workoutIndex: number, exerciseIndex: number, updated: Exercise): Promise<void> {
    const program = await getProgram(programId);
    if (!program) return;

    program.workouts[workoutIndex].exercises[exerciseIndex] = updated;
    await updateProgram(programId, { workouts: program.workouts });
}

export async function deleteExercise(programId: number, workoutIndex: number, exerciseIndex: number): Promise<void> {
    const program = await getProgram(programId);
    if (!program) return;

    program.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
    await updateProgram(programId, { workouts: program.workouts });
}