import type { JSX } from "react";

export interface LoadingSkeletonProps {
  rows?: number;
}

export function LoadingSkeleton({ rows = 3 }: LoadingSkeletonProps): JSX.Element {
  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading Explore prompts">
      {Array.from({ length: rows }).map((_, index: number): JSX.Element => (
        <div
          key={index}
          className="flex animate-pulse flex-col gap-3 rounded-3xl border border-orbit-border bg-orbit-surface p-5"
        >
          <div className="h-5 w-20 rounded-full bg-orbit-bg" />
          <div className="h-4 w-4/5 rounded bg-orbit-bg" />
          <div className="h-4 w-2/5 rounded bg-orbit-bg" />
        </div>
      ))}
    </div>
  );
}
