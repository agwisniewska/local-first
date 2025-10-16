"use client";

import { useAppStore } from "@/store/useAppStore";

export default function OfflineIndicator({}) {
  const { isOffline, onToggleOffline } = useAppStore();

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-whit rounded-lg shadow p-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${
            isOffline ? "bg-red-500" : "bg-green-500"
          }`}
        />
        <span className="text-sm font-medium text-gray-70">
          {isOffline ? "Offline" : "Online"}
        </span>
        {isOffline && (
          <span className="text-xs text-gray-50">(Showing cached data)</span>
        )}
      </div>

      <button
        onClick={onToggleOffline}
        className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                   bg-gray-100 hover:bg-gray-20
                   text-gray-70"
      >
        {isOffline ? "Go Online" : "Go Offline"}
      </button>
    </div>
  );
}
