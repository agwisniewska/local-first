// db/index.ts

import { User } from "@/types/user";
import Dexie, { Table } from "dexie";

class AppDatabase extends Dexie {
  users!: Table<User, string>;

  constructor() {
    super("LocalFirstDB");
    this.version(1).stores({
      users: "email, isFavorite, cachedAt",
    });
  }
}

let database: AppDatabase | null = null;

const getDatabase = (): AppDatabase => {
  if (typeof window === "undefined") {
    throw new Error("Database can only be accessed in browser");
  }

  if (!database) {
    database = new AppDatabase();
  }

  return database;
};

export const db = {
  async saveUsers(users: User[]): Promise<void> {
    const db = getDatabase();
    const usersWithTimestamp = users.map((user) => ({
      ...user,
      cachedAt: Date.now(),
    }));
    await db.users.bulkPut(usersWithTimestamp);
  },

  async getUsers(): Promise<User[]> {
    if (typeof window === "undefined") {
      return [];
    }
    const db = getDatabase();
    return await db.users.toArray();
  },

  async toggleFavorite(email: string): Promise<void> {
    const db = getDatabase();
    const user = await db.users.get(email);
    if (user) {
      await db.users.update(email, {
        isFavorite: !user.isFavorite,
      });
    }
  },

  async getFavorites(): Promise<User[]> {
    if (typeof window === "undefined") {
      return [];
    }
    const db = getDatabase();
    return await db.users.where("isFavorite").equals(1).toArray();
  },

  async clearUsers(): Promise<void> {
    const db = getDatabase();
    await db.users.clear();
  },

  async getUser(email: string): Promise<User | undefined> {
    if (typeof window === "undefined") {
      return undefined;
    }
    const db = getDatabase();
    return await db.users.get(email);
  },
};
