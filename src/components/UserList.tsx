"use client";

import { useAppStore } from "@/store/useAppStore";
import UserCard from "./UserCard";

export default function UserList() {
  const { users, currentPage, itemsPerPage } = useAppStore();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No users found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {paginatedUsers.map((user) => (
        <UserCard key={user.email} user={user} />
      ))}
    </div>
  );
}
