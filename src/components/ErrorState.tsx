import type { JSX } from "react";

export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-orbit-coral/30 bg-orbit-coral/10 px-5 py-8 text-center">
      <p className="font-semibold text-orbit-ink">Couldn't load Explore</p>
      <p className="text-sm text-orbit-muted">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-orbit-ink px-4 py-2 text-sm font-semibold text-orbit-bg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
      >
        Try again
      </button>
    </div>
  );
}
