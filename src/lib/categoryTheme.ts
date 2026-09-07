import type { JSX } from "react";
import { ExploreCategory } from "../types/index.js";
import {
  CoffeeIcon,
  CodeIcon,
  FilmIcon,
  GamepadIcon,
  MusicNoteIcon,
  SparkleIcon,
  type IconProps,
} from "../components/icons.js";

export interface CategoryTheme {
  label: string;
  textClass: string;
  bgClass: string;
  Icon: (props: IconProps) => JSX.Element;
}

const categoryThemes: Record<ExploreCategory, CategoryTheme> = {
  [ExploreCategory.Gaming]: {
    label: "Gaming",
    textClass: "text-orbit-coral",
    bgClass: "bg-orbit-coral/12",
    Icon: GamepadIcon,
  },
  [ExploreCategory.Music]: {
    label: "Music",
    textClass: "text-orbit-violet",
    bgClass: "bg-orbit-violet/12",
    Icon: MusicNoteIcon,
  },
  [ExploreCategory.Movies]: {
    label: "Movies",
    textClass: "text-orbit-blue",
    bgClass: "bg-orbit-blue/12",
    Icon: FilmIcon,
  },
  [ExploreCategory.Food]: {
    label: "Food",
    textClass: "text-orbit-amber",
    bgClass: "bg-orbit-amber/12",
    Icon: CoffeeIcon,
  },
  [ExploreCategory.Tech]: {
    label: "Tech",
    textClass: "text-orbit-teal",
    bgClass: "bg-orbit-teal/12",
    Icon: CodeIcon,
  },
  [ExploreCategory.DeepTalks]: {
    label: "Deep Talks",
    textClass: "text-orbit-ink-soft",
    bgClass: "bg-orbit-ink-soft/10",
    Icon: SparkleIcon,
  },
};

export function getCategoryTheme(category: ExploreCategory): CategoryTheme {
  return categoryThemes[category];
}
