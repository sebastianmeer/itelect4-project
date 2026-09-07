import type { JSX } from "react";
import { SparkleIcon } from "./icons.js";

export interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-3xl border border-dashed border-orbit-border bg-orbit-surface/70 px-5 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orbit-bg text-orbit-muted">
        <SparkleIcon className="h-5 w-5" />
      </span>
      <p className="font-semibold text-orbit-ink">{title}</p>
      <p className="text-sm text-orbit-muted">{message}</p>
    </div>
  );
}
