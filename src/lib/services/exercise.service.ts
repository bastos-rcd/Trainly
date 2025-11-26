import { getDB } from "@/lib/db/indexed-db";
import { Exercise } from "@/lib/entities/exercise";

export class ExerciseService {
    static async get(id: number): Promise<Exercise | undefined> {
        const db = await getDB();
        return db.get("exercises", id);
    }

    static async list(idWorkout: number): Promise<Exercise[]> {
        const db = await getDB();
        return db.getAllFromIndex("exercises", "by_workout", idWorkout);
    }

    static async save(exercise: Exercise): Promise<number> {
        const db = await getDB();
        return db.put("exercises", exercise);
    }

    static async delete(id: number): Promise<void> {
        const db = await getDB();
        return db.delete("exercises", id);
    }
}