import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  login: (token: string, user: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

interface PersistedAuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user): void => {
        set({ token, user });
      },
      logout: (): void => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "orbit-auth",
      partialize: (state: AuthState): PersistedAuthState => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
