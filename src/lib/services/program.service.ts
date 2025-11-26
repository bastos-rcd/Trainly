import { getDB } from "@/lib/db/indexed-db";
import { Program } from "@/lib/entities/program";

export class ProgramService {
    static async get(id: number): Promise<Program | undefined> {
        const db = await getDB();
        return db.get("programs", id);
    }

    static async list(): Promise<Program[]> {
        const db = await getDB();
        return db.getAll("programs");
    }

    static async save(program: Program): Promise<number> {
        const db = await getDB();
        return db.put("programs", program);
    }

    static async delete(id: number): Promise<void> {
        const db = await getDB();
        return db.delete("programs", id);
    }
}