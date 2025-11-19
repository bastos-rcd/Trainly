export type ProgramType = "bodybuilding" | "powerlifting";

export type ExerciseType = "super set" | "standard";

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