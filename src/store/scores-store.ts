import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/lib/types';

type StoredUser = Omit<User, 'password'>;

type ScoresState = {
  currentUser: StoredUser | null;
  setCurrentUser: (user: StoredUser | null) => void;
};

export const useScoresStore = create<ScoresState>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: 'baycanja-user-storage', // only storing user now
      storage: createJSONStorage(() => localStorage),
    }
  )
);
