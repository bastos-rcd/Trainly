export type ExerciseType = 'normal' | 'super-set' | "top-set" | 'drop-set';

export interface Exercise {
    name: string;
    type: ExerciseType;
    sets: number;
    reps: string;
    weight: number;
}