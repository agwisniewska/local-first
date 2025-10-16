"use client";

import { db } from "@/db";
import { useAppStore } from "@/store/useAppStore";
import { User } from "@/types/user";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const { toggleFavorite } = useAppStore();

  const handleToggleFavorite = async () => {
    toggleFavorite(user.email);
    await db.toggleFavorite(user.email);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <Image
          width="20"
          height="20"
          src={user.picture.thumbnail}
          alt={`${user.name.first} ${user.name.last}`}
          className="w-20 h-20 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.name.title} {user.name.first} {user.name.last}
              </h3>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleToggleFavorite}
              className="text-2xl transition-transform hover:scale-110 flex-shrink-0"
              aria-label={
                user.isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {user.isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p className="truncate">
              📍 {user.location.city}, {user.location.country}
            </p>
            <p className="truncate">📞 {user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
