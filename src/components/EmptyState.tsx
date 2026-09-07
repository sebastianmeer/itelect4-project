import type { JSX } from "react";

export interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-orbit-border bg-orbit-surface/60 px-5 py-10 text-center">
      <span aria-hidden="true" className="text-2xl">
        ✨
      </span>
      <p className="font-semibold text-orbit-ink">{title}</p>
      <p className="text-sm text-orbit-muted">{message}</p>
    </div>
  );
}
