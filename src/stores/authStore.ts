import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

interface PersistedAuthState {
  token: string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      login: (token: string): void => {
        set({ token });
      },
      logout: (): void => {
        set({ token: null });
      },
    }),
    {
      name: "orbit-auth",
      partialize: (state: AuthState): PersistedAuthState => ({
        token: state.token,
      }),
    },
  ),
);
