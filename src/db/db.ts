import Dexie, { type Table } from "dexie";
import type { Program } from "../models/models";

export class TrainlyDB extends Dexie {
    programs!: Table<Program>;

    constructor() {
        super("trainlydb");
        this.version(1).stores({
            programs: '++id,name,type'
        });
    }
}

export const db = new TrainlyDB();