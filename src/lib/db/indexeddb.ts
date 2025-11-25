const DB_NAME = "trainlydb";
const VERSION = 1;

export async function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, VERSION);

        request.onerror = () => reject(request.error);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains("programs")) {
                db.createObjectStore("programs", {
                    keyPath: "id",
                    autoIncrement: true,
                });
            }
        };

        request.onsuccess = () => resolve(request.result);
    });
}