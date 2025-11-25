import { Program } from "@/lib/entities/program";
import {
    addProgram,
    getProgram,
    getPrograms,
    updateProgram,
    deleteProgram,
} from "@/lib/db/program.store";

export const ProgramService = {
    async get(id: number): Promise<Program | undefined> {
        return await getProgram(id);
    },

    async list(): Promise<Program[]> {
        return await getPrograms();
    },

    async create(program: Program): Promise<number> {
        if (!program.name.trim())
            throw new Error("Program must have a name.");

        return await addProgram(program);
    },

    async update(program: Program): Promise<void> {
        if (!program.id)
            throw new Error("Program must have an ID to update.");

        return await updateProgram(program);
    },

    async delete(id: number): Promise<void> {
        return await deleteProgram(id);
    },
};