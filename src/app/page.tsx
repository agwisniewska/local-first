"use client";
import { useCallback, useEffect } from "react";
import { db } from "@/db";
import UserList from "@/components/UserList";
import OfflineIndicator from "@/components/OfflineIndicator";
import Pagination from "@/components/Pagination";
import { useAppStore } from "@/store/useAppStore";
import { UserService } from "@/services/userService";

export default function Home() {
  const { setUsers, setLoading, isOffline, setError, isLoading, error } =
    useAppStore();

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cachedUsers = await db.getUsers();
      if (cachedUsers.length > 0) {
        console.log("Loaded from cache:", cachedUsers.length, "users");
        setUsers(cachedUsers);
      }

      if (!isOffline) {
        console.log("Fetching fresh data from API...");
        const freshUsers = await UserService.fetchUsers(30);
        setUsers(freshUsers);
      } else {
        if (cachedUsers.length === 0) {
          setError("No cached data available and you are offline");
        }
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [isOffline, setUsers, setError, setLoading]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [isOffline, loadData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 ">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Local-First User Directory
          </h1>
          <p className="text-gray-60">
            Offline-capable user management with IndexedDB
          </p>
        </div>

        <OfflineIndicator />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-70 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error: {error}</p>
            <button
              onClick={loadData}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        <UserList />
        <Pagination />
      </div>
    </main>
  );
}
