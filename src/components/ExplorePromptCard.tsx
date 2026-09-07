import type { JSX } from "react";
import type { ExplorePrompt } from "../types/index.js";
import { getCategoryTheme } from "../lib/categoryTheme.js";
import { ArrowRightIcon, MessageIcon } from "./icons.js";

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
      className={`orbit-card group flex w-full flex-col gap-3 rounded-3xl text-left transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft ${
        isCompact ? "min-w-[220px] p-4" : "p-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${theme.bgClass} ${theme.textClass}`}
        >
          {theme.label}
        </span>
        {!isCompact && (
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-orbit-bg text-orbit-muted transition group-hover:translate-x-0.5 group-hover:text-orbit-ink"
          >
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <p
        className={`font-semibold text-orbit-ink ${
          isCompact ? "text-sm leading-snug" : "text-base leading-snug"
        }`}
      >
        {prompt.question}
      </p>

      {!isCompact && (
        <div className="flex items-center gap-1.5 pt-1 text-sm text-orbit-muted">
          <MessageIcon className="h-3.5 w-3.5" />
          {prompt.responseCount} joined
        </div>
      )}
    </button>
  );
}
