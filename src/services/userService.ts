import { db } from "../db/db";

export async function getUser(): Promise<{ name: string }> {
    return await db.table("user").toArray().then((users) => users[0]);
}

export async function setUser(name: string): Promise<void> {
    db.table("user").clear();
    await db.table("user").add({ name });
}