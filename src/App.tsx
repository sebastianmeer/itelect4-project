import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type JSX,
} from "react";
import { ExplorePromptCard } from "./components/ExplorePromptCard.js";
import { UserCard } from "./components/UserCard.js";
import { ConnectionBadge } from "./components/ConnectionBadge.js";
import { LoadingSkeleton } from "./components/LoadingSkeleton.js";
import { EmptyState } from "./components/EmptyState.js";
import { ErrorState } from "./components/ErrorState.js";
import { useToggle } from "./hooks/useToggle.js";
import { usePrevious } from "./hooks/usePrevious.js";
import {
  mockProfiles,
  mockConnections,
  loadExplorePrompts,
} from "./lib/mockData.js";
import { getCategoryTheme } from "./lib/categoryTheme.js";
import { ExploreCategory, type ExplorePrompt } from "./types/index.js";

type AppMode = "explore" | "discover";
type CategoryFilter = ExploreCategory | "all";

const circleOptions: CategoryFilter[] = ["all", ...Object.values(ExploreCategory)];

function circleLabel(category: CategoryFilter): string {
  return category === "all" ? "All" : getCategoryTheme(category).label;
}

function App(): JSX.Element {
  const [activeMode, setActiveMode] = useState<AppMode>("explore");
  const [prompts, setPrompts] = useState<ExplorePrompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previousCategory = usePrevious<CategoryFilter>(selectedCategory);

  useEffect((): void => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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
    console.log(`Opening prompt: ${promptId}`);
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
    <div className="min-h-dvh bg-orbit-ink px-0 py-0 sm:py-8">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-orbit-bg sm:min-h-0 sm:rounded-[2.5rem] sm:shadow-2xl">
        <header className="flex flex-col gap-4 px-5 pb-3 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-orbit-ink text-orbit-ink"
              >
                ✦
              </span>
              <span className="text-lg font-bold text-orbit-ink">Orbit</span>
            </div>
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-orbit-border text-orbit-ink transition hover:bg-orbit-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
            >
              {isDarkMode ? "☀" : "☾"}
            </button>
          </div>

          <div className="flex rounded-full bg-orbit-surface p-1">
            <button
              type="button"
              onClick={(): void => setActiveMode("explore")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeMode === "explore"
                  ? "bg-orbit-ink text-orbit-bg"
                  : "text-orbit-muted"
              }`}
            >
              Explore
            </button>
            <button
              type="button"
              onClick={(): void => setActiveMode("discover")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeMode === "discover"
                  ? "bg-orbit-ink text-orbit-bg"
                  : "text-orbit-muted"
              }`}
            >
              Discover
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-28">
          {activeMode === "explore" ? (
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-orbit-ink">
                    Your Circles
                  </h2>
                </div>
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

              <section className="flex flex-col gap-3">
                <h2 className="text-base font-semibold text-orbit-ink">
                  Your Connections
                </h2>
                <div className="flex flex-col gap-2">
                  {mockConnections.map((connection): JSX.Element => {
                    const connectedProfile = mockProfiles.find(
                      (profile) => profile.id === connection.connectedUserId,
                    );
                    return (
                      <div
                        key={connection.id}
                        className="flex items-center justify-between rounded-2xl border border-orbit-border bg-orbit-surface px-4 py-3"
                      >
                        <span className="text-sm font-medium text-orbit-ink">
                          {connectedProfile?.name ?? "Someone"}
                        </span>
                        <ConnectionBadge status={connection.status} />
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {mockProfiles.map((profile) => (
                <UserCard
                  key={profile.id}
                  profile={profile}
                  onSignal={(id): void => console.log(`Signal sent to ${id}`)}
                  onPass={(id): void => console.log(`Passed on ${id}`)}
                />
              ))}
            </div>
          )}
        </main>

        <nav className="sticky bottom-0 flex items-center justify-around border-t border-orbit-border bg-orbit-surface/95 px-4 py-3 backdrop-blur">
          <span className="text-xl text-orbit-ink" aria-label="Home" role="img">
            ⌂
          </span>
          <span className="text-xl text-orbit-muted" aria-label="Circles" role="img">
            ◎
          </span>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-orbit-ink text-lg text-orbit-bg"
          >
            +
          </span>
          <span className="text-xl text-orbit-muted" aria-label="Chats" role="img">
            ◐
          </span>
          <span className="text-xl text-orbit-muted" aria-label="Profile" role="img">
            ◇
          </span>
        </nav>
      </div>
    </div>
  );
}

export default App;
