import { create } from "zustand";
import { ExploreCategory } from "../types/index.js";

export type CategoryFilter = ExploreCategory | "all";

export interface UiState {
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedCategory: "all",
  setSelectedCategory: (category: CategoryFilter): void => {
    set({ selectedCategory: category });
  },
}));
