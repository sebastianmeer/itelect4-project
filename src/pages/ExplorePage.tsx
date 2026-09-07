import { useMemo, useRef, useState, type ChangeEvent, type JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ExplorePromptCard } from "../components/ExplorePromptCard.js";
import { LoadingSkeleton } from "../components/LoadingSkeleton.js";
import { EmptyState } from "../components/EmptyState.js";
import { ErrorState } from "../components/ErrorState.js";
import { ModeSwitch } from "../components/ModeSwitch.js";
import { CompassIcon, SearchIcon } from "../components/icons.js";
import { usePrevious } from "../hooks/usePrevious.js";
import { getPrompts } from "../api/client.js";
import { getCategoryTheme, type CategoryTheme } from "../lib/categoryTheme.js";
import { useUiStore, type CategoryFilter } from "../stores/uiStore.js";
import { ExploreCategory, type ExplorePrompt } from "../types/index.js";

const circleOptions: CategoryFilter[] = ["all", ...Object.values(ExploreCategory)];

function circleLabel(category: CategoryFilter): string {
  return category === "all" ? "All" : getCategoryTheme(category).label;
}

export function ExplorePage(): JSX.Element {
  const navigate = useNavigate();

  const selectedCategory = useUiStore((state) => state.selectedCategory);
  const setSelectedCategory = useUiStore((state) => state.setSelectedCategory);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previousCategory = usePrevious<CategoryFilter>(selectedCategory);

  const {
    data: prompts = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["prompts"],
    queryFn: getPrompts,
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleFocusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSelectPrompt = (promptId: string): void => {
    navigate(`/explore/prompts/${promptId}`);
  };

  const filteredPrompts = useMemo((): ExplorePrompt[] => {
    return prompts.filter((prompt: ExplorePrompt): boolean => {
      const matchesCategory: boolean =
        selectedCategory === "all" || prompt.category === selectedCategory;
      const matchesSearch: boolean = prompt.question
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [prompts, selectedCategory, searchQuery]);

  const trendingPrompts = useMemo((): ExplorePrompt[] => {
    return [...prompts]
      .sort((a: ExplorePrompt, b: ExplorePrompt): number => b.responseCount - a.responseCount)
      .slice(0, 3);
  }, [prompts]);

  const promptCountByCategory = useMemo((): Record<string, number> => {
    const counts: Record<string, number> = {};
    for (const prompt of prompts) {
      counts[prompt.category] = (counts[prompt.category] ?? 0) + 1;
    }
    return counts;
  }, [prompts]);

  const showCrossedPaths: boolean =
    previousCategory !== undefined &&
    previousCategory !== selectedCategory &&
    selectedCategory !== "all";

  return (
    <div className="flex flex-col gap-6 pt-1">
      <ModeSwitch />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-orbit-muted" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Find something worth talking about"
            aria-label="Search Explore prompts"
            className="orbit-card h-11 w-full rounded-full pl-10 pr-4 text-sm text-orbit-ink placeholder:text-orbit-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          />
        </div>
        <button
          type="button"
          onClick={handleFocusSearch}
          aria-label="Focus the Explore search field"
          className="orbit-card flex h-11 w-11 items-center justify-center rounded-full text-orbit-ink transition hover:bg-orbit-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
      </div>

      {!isLoading && !isError && trendingPrompts.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-orbit-ink">
              Today's Conversations
            </h2>
            <span className="text-sm text-orbit-muted">See all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {trendingPrompts.map((prompt: ExplorePrompt): JSX.Element => (
              <ExplorePromptCard
                key={prompt.id}
                prompt={prompt}
                variant="compact"
                onSelect={handleSelectPrompt}
              />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-orbit-ink">Your Circles</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {circleOptions.map((category: CategoryFilter): JSX.Element => {
            const isActive = selectedCategory === category;
            const theme: CategoryTheme | null =
              category === "all" ? null : getCategoryTheme(category);
            const count = category === "all" ? prompts.length : (promptCountByCategory[category] ?? 0);

            return (
              <button
                key={category}
                type="button"
                onClick={(): void => setSelectedCategory(category)}
                className={`orbit-card flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-2xl px-2 py-2.5 text-center transition @xs:w-[4.5rem] @xs:py-3 @sm:w-20 ${
                  isActive ? "ring-2 ring-orbit-ink" : ""
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl @sm:h-9 @sm:w-9 ${
                    theme ? theme.bgClass : "bg-orbit-bg"
                  } ${theme ? theme.textClass : "text-orbit-ink"}`}
                >
                  {theme ? (
                    <theme.Icon className="h-3.5 w-3.5 @sm:h-4 @sm:w-4" />
                  ) : (
                    <CompassIcon className="h-3.5 w-3.5 @sm:h-4 @sm:w-4" />
                  )}
                </span>
                <span className="text-[11px] font-semibold text-orbit-ink @sm:text-xs">
                  {circleLabel(category)}
                </span>
                <span className="text-[10px] text-orbit-muted">{count}</span>
              </button>
            );
          })}
        </div>
        {showCrossedPaths && (
          <p className="text-xs text-orbit-muted">
            You crossed paths from {circleLabel(previousCategory as CategoryFilter)} into{" "}
            {circleLabel(selectedCategory)}.
          </p>
        )}
      </section>

      <section className="flex flex-col gap-3">
        {isLoading && <LoadingSkeleton rows={3} />}

        {!isLoading && isError && (
          <ErrorState
            message="The Explore feed didn't come through. Check your connection."
            onRetry={(): void => void refetch()}
          />
        )}

        {!isLoading && !isError && filteredPrompts.length === 0 && (
          <EmptyState
            title="No conversations here yet"
            message="Be the first to start the conversation."
          />
        )}

        {!isLoading &&
          !isError &&
          filteredPrompts.map((prompt: ExplorePrompt): JSX.Element => (
            <ExplorePromptCard
              key={prompt.id}
              prompt={prompt}
              onSelect={handleSelectPrompt}
            />
          ))}
      </section>
    </div>
  );
}
