import { create } from "zustand";
import { User } from "../types/auth.types";

export const useAuthStore = create<{
  user: User | null;
  setUser: (user: User | null) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
