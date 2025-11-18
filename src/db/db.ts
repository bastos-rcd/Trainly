import Dexie, { type Table } from "dexie";
import type { User, Program } from "../models/models";

export class TrainlyDB extends Dexie {
    user!: Table<User>;
    programs!: Table<Program>;

    constructor() {
        super("trainlydb");
        this.version(1).stores({
            user: 'name',
            programs: '++id,name,type'
        });
    }
}

export const db = new TrainlyDB();