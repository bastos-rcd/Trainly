import { openDB } from "./indexeddb";
import { Program } from "@/lib/entities/program";

const STORE = "programs";

export async function addProgram(program: Program): Promise<number> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.add(program);

        req.onsuccess = () => resolve(req.result as number);
        req.onerror = () => reject(req.error);
    });
}

export async function getProgram(id: number): Promise<Program | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const req = store.get(id);

        req.onsuccess = () => resolve(req.result as Program | undefined);
        req.onerror = () => reject(req.error);
    });
}

export async function getPrograms(): Promise<Program[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readonly");
        const store = tx.objectStore(STORE);
        const req = store.getAll();

        req.onsuccess = () => resolve(req.result as Program[]);
        req.onerror = () => reject(req.error);
    });
}

export async function updateProgram(program: Program): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.put(program);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export async function deleteProgram(id: number): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, "readwrite");
        const store = tx.objectStore(STORE);
        const req = store.delete(id);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}