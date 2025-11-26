import { getDB } from "@/lib/db/indexed-db";
import { Workout } from "@/lib/entities/workout";
import { ExerciseService } from "./exercise.service";

export class WorkoutService {
    static async get(id: number): Promise<Workout | undefined> {
        const db = await getDB();
        return db.get("workouts", id);
    }

    static async list(): Promise<Workout[]> {
        const db = await getDB();
        const all = await db.getAll("workouts");
        return all.filter(w => w.id_program == null);
    }

    static async listByProgram(idProgram: number): Promise<Workout[]> {
        const db = await getDB();
        return db.getAllFromIndex("workouts", "by_program", idProgram);
    }

    static async save(workout: Workout): Promise<number> {
        const db = await getDB();
        return db.put("workouts", workout);
    }

    static async delete(id: number): Promise<void> {
        const db = await getDB();
        await ExerciseService.list(id).then(async (exercises) => {
            for (const exercise of exercises) {
                await ExerciseService.delete(exercise.id!);
            }
        });
        return db.delete("workouts", id);
    }
}