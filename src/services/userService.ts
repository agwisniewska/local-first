import { db } from "@/db";
import { ApiResponse, User } from "@/types/user";

const API_BASE = "https://randomuser.me/api/";

export const UserService = {
  async fetchUsers(results: number = 30): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE}?results=${results}`, {
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      console.log("Fetched users from API:", data.results.length);

      await db.clearUsers();
      await db.saveUsers(data.results);

      return data.results;
    } catch (error) {
      console.error("Failed to fetch from API:", error);

      const cachedUsers = await db.getUsers();

      if (cachedUsers.length > 0) {
        console.log("Using cached data:", cachedUsers.length, "users");
        return cachedUsers;
      }

      throw new Error("Unable to fetch data and no cache available");
    }
  },

  async initializeApp(): Promise<User[]> {
    try {
      if (!navigator.onLine) {
        console.log("Offline: Loading from cache only");
        const cachedUsers = await db.getUsers();

        if (cachedUsers.length === 0) {
          throw new Error("No cached data available and you are offline");
        }

        return cachedUsers;
      }

      console.log("Online: Fetching fresh data...");
      const users = await this.fetchUsers(30);
      return users;
    } catch (error) {
      console.error("Initialize failed:", error);

      const cachedUsers = await db.getUsers();

      if (cachedUsers.length === 0) {
        throw new Error("Unable to load any data");
      }

      console.log("Falling back to cache");
      return cachedUsers;
    }
  },

  async refreshUsers(): Promise<User[]> {
    console.log("Refreshing users...");
    return await this.fetchUsers(30);
  },
};
