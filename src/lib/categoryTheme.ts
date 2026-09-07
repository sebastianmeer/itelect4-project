import { ExploreCategory } from "../types/index.js";

export interface CategoryTheme {
  label: string;
  textClass: string;
  bgClass: string;
}

const categoryThemes: Record<ExploreCategory, CategoryTheme> = {
  [ExploreCategory.Gaming]: {
    label: "Gaming",
    textClass: "text-orbit-coral",
    bgClass: "bg-orbit-coral/12",
  },
  [ExploreCategory.Music]: {
    label: "Music",
    textClass: "text-orbit-violet",
    bgClass: "bg-orbit-violet/12",
  },
  [ExploreCategory.Movies]: {
    label: "Movies",
    textClass: "text-orbit-blue",
    bgClass: "bg-orbit-blue/12",
  },
  [ExploreCategory.Food]: {
    label: "Food",
    textClass: "text-orbit-amber",
    bgClass: "bg-orbit-amber/12",
  },
  [ExploreCategory.Tech]: {
    label: "Tech",
    textClass: "text-orbit-teal",
    bgClass: "bg-orbit-teal/12",
  },
  [ExploreCategory.DeepTalks]: {
    label: "Deep Talks",
    textClass: "text-orbit-ink-soft",
    bgClass: "bg-orbit-ink-soft/10",
  },
};

export function getCategoryTheme(category: ExploreCategory): CategoryTheme {
  return categoryThemes[category];
}
