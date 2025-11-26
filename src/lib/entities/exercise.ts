export type ExerciseType = 'normal' | 'super-set' | 'top-set' | 'drop-set';

export interface Exercise {
    id?: number;
    name: string;
    type: ExerciseType;
    sets: number;
    reps: string;
    weight: number;
    id_workout: number;
}