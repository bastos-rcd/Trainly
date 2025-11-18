export type ProgramType = "bodybuilding" | "powerlifting";

export type ExerciseType = "top set" | "drop set" | "super set" | "standard";

export interface Exercise {
    name: string;
    type: ExerciseType;
    sets: number;
    reps: string;
    weight: number;
}

export interface Workout {
    name: string;
    exercises: Exercise[];
}

export interface Program {
    id?: number;
    name: string;
    type: ProgramType;
    workouts: Workout[];
}

export interface User {
    name: string;
}