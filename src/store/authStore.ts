import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/auth.types";

export const useAuthStore = create(
  persist<{
    user: User | null;
    setUser: (user: User | null) => void;
  }>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // 로컬 스토리지에 저장될 키 이름
    }
  )
);
