import { db } from "../db/db";
import type { User } from "../models/models";

export async function getUser(): Promise<User> {
    return await db.user.toArray().then((users) => users[0]);
}

export async function setUser(name: string): Promise<void> {
    db.user.clear();
    await db.user.add({ name });
}