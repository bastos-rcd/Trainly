import Dexie from "dexie";

export const db: Dexie = new Dexie("trainlydb");

db.version(1).stores({
    user: 'name'
});