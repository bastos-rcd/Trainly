import { db } from "../db/db";
import type { Program } from "../models/models";

export async function addProgram(program: Omit<Program, "id">): Promise<number> {
    return await db.programs.add(program);
}

export async function getProgram(id: number): Promise<Program | undefined> {
    return await db.programs.get(id);
}

export async function getPrograms(): Promise<Program[]> {
    return await db.programs.toArray();
}

export async function updateProgram(id: number, updated: Partial<Program>): Promise<void> {
    await db.programs.update(id, updated);
}

export async function deleteProgram(id: number): Promise<void> {
    await db.programs.delete(id);
}