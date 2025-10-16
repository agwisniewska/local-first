import { User } from "@/types/user";
import { create } from "zustand";

interface AppState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;

  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;

  isOffline: boolean;
  onToggleOffline: () => void;

  error: string | null;
  setError: (error: string | null) => void;

  users: User[];
  setUsers: (users: User[]) => void;

  toggleFavorite: (email: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  users: [],
  setUsers: (users) => {
    const totalPages = Math.ceil(users.length / get().itemsPerPage) || 1;
    set({ users, totalPages });
  },

  itemsPerPage: 10,
  totalPages: 1,
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),

  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  isOffline: false,
  onToggleOffline: () => set({ isOffline: !get().isOffline }),

  error: null,
  setError: (error) => set({ error }),

  toggleFavorite: (email) => {
    const users = get().users.map((user) =>
      user.email === email ? { ...user, isFavorite: !user.isFavorite } : user
    );
    set({ users });
  },
}));
