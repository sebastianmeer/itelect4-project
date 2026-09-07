import type { JSX } from "react";
import type { ExplorePrompt } from "../types/index.js";
import { getCategoryTheme } from "../lib/categoryTheme.js";

export type ExplorePromptCardVariant = "default" | "compact";

export interface ExplorePromptCardProps {
  prompt: ExplorePrompt;
  variant?: ExplorePromptCardVariant;
  onSelect?: (promptId: string) => void;
}

export function ExplorePromptCard({
  prompt,
  variant = "default",
  onSelect,
}: ExplorePromptCardProps): JSX.Element {
  const theme = getCategoryTheme(prompt.category);
  const isCompact: boolean = variant === "compact";

  const handleClick = (): void => {
    onSelect?.(prompt.id);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group flex w-full flex-col gap-3 rounded-3xl border border-orbit-border bg-orbit-surface text-left shadow-sm transition hover:border-orbit-ink-soft/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft ${
        isCompact ? "min-w-[220px] p-4" : "p-5"
      }`}
    >
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${theme.bgClass} ${theme.textClass}`}
      >
        {theme.label}
      </span>

      <p
        className={`font-semibold text-orbit-ink ${
          isCompact ? "text-sm leading-snug" : "text-base leading-snug"
        }`}
      >
        {prompt.question}
      </p>

      {!isCompact && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-orbit-muted">
            {prompt.responseCount} joined
          </span>
          <span
            aria-hidden="true"
            className="text-orbit-muted transition group-hover:translate-x-0.5 group-hover:text-orbit-ink"
          >
            &rarr;
          </span>
        </div>
      )}
    </button>
  );
}
