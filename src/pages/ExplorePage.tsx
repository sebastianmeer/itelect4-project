import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type JSX,
} from "react";
import { useNavigate } from "react-router";
import { ExplorePromptCard } from "../components/ExplorePromptCard.js";
import { LoadingSkeleton } from "../components/LoadingSkeleton.js";
import { EmptyState } from "../components/EmptyState.js";
import { ErrorState } from "../components/ErrorState.js";
import { ModeSwitch } from "../components/ModeSwitch.js";
import { usePrevious } from "../hooks/usePrevious.js";
import { loadExplorePrompts } from "../lib/mockData.js";
import { getCategoryTheme } from "../lib/categoryTheme.js";
import { ExploreCategory, type ExplorePrompt } from "../types/index.js";

type CategoryFilter = ExploreCategory | "all";

const circleOptions: CategoryFilter[] = ["all", ...Object.values(ExploreCategory)];

function circleLabel(category: CategoryFilter): string {
  return category === "all" ? "All" : getCategoryTheme(category).label;
}

export function ExplorePage(): JSX.Element {
  const navigate = useNavigate();

  const [prompts, setPrompts] = useState<ExplorePrompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previousCategory = usePrevious<CategoryFilter>(selectedCategory);

  const fetchPrompts = (): void => {
    setIsLoading(true);
    setLoadError(null);

    loadExplorePrompts()
      .then((loaded: ExplorePrompt[]): void => {
        setPrompts(loaded);
      })
      .catch((): void => {
        setLoadError("The Explore feed didn't come through. Check your connection.");
      })
      .finally((): void => {
        setIsLoading(false);
      });
  };

  useEffect((): void => {
    fetchPrompts();
  }, []);

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

  const showCrossedPaths: boolean =
    previousCategory !== undefined &&
    previousCategory !== selectedCategory &&
    selectedCategory !== "all";

  return (
    <div className="flex flex-col gap-6 pt-1">
      <ModeSwitch />

      <div className="flex items-center gap-2">
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Find something worth talking about"
          aria-label="Search Explore prompts"
          className="h-11 flex-1 rounded-full border border-orbit-border bg-orbit-surface px-4 text-sm text-orbit-ink placeholder:text-orbit-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
        />
        <button
          type="button"
          onClick={handleFocusSearch}
          aria-label="Focus the Explore search field"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-orbit-border bg-orbit-surface text-orbit-ink transition hover:bg-orbit-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
        >
          ⌕
        </button>
      </div>

      {!isLoading && !loadError && trendingPrompts.length > 0 && (
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
        <div className="flex flex-wrap gap-2">
          {circleOptions.map((category: CategoryFilter): JSX.Element => (
            <button
              key={category}
              type="button"
              onClick={(): void => setSelectedCategory(category)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                selectedCategory === category
                  ? "border-orbit-ink bg-orbit-ink text-orbit-bg"
                  : "border-orbit-border bg-orbit-surface text-orbit-ink-soft"
              }`}
            >
              {circleLabel(category)}
            </button>
          ))}
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

        {!isLoading && loadError !== null && (
          <ErrorState message={loadError} onRetry={fetchPrompts} />
        )}

        {!isLoading && loadError === null && filteredPrompts.length === 0 && (
          <EmptyState
            title="No conversations here yet"
            message="Be the first to start the conversation."
          />
        )}

        {!isLoading &&
          loadError === null &&
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
