import { Workout } from "./workout";

export interface Program {
    id?: number;
    name: string;
    tag: string;
    workouts: Workout[];
}