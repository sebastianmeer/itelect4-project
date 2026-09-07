import { create } from "zustand";

export interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  login: (token: string): void => {
    set({ token });
  },
  logout: (): void => {
    set({ token: null });
  },
}));
