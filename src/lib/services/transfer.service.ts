import { getDB } from "@/lib/db/indexed-db";
import { Program } from "@/lib/entities/program";
import { Workout } from "@/lib/entities/workout";
import { Exercise } from "@/lib/entities/exercise";

export class TransferService {
    static async exportAll() {
        const db = await getDB();

        const programs = await db.getAll("programs");
        const workouts = await db.getAll("workouts");
        const exercises = await db.getAll("exercises");

        return {
            programs,
            workouts,
            exercises,
        };
    }

    static async importAll(data: {
        programs: Program[];
        workouts: Workout[];
        exercises: Exercise[];
    }) {
        const db = await getDB();

        await db.clear("programs");
        await db.clear("workouts");
        await db.clear("exercises");

        for (const p of data.programs) await db.put("programs", p);
        for (const w of data.workouts) await db.put("workouts", w);
        for (const e of data.exercises) await db.put("exercises", e);
    }
}