import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "trainlydb";
const DB_VERSION = 1;

export async function getDB(): Promise<IDBPDatabase<any>> {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("programs")) {
                const store = db.createObjectStore("programs", { keyPath: "id", autoIncrement: true });
                store.createIndex("by_name", "name");
            }

            if (!db.objectStoreNames.contains("workouts")) {
                const store = db.createObjectStore("workouts", { keyPath: "id", autoIncrement: true });
                store.createIndex("by_program", "id_program");
            }

            if (!db.objectStoreNames.contains("exercises")) {
                const store = db.createObjectStore("exercises", { keyPath: "id", autoIncrement: true });
                store.createIndex("by_workout", "id_workout");
            }
        },
    });
}