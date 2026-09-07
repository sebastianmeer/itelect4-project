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
          className="orbit-card flex flex-col gap-3 rounded-3xl p-5"
        >
          <div className="flex items-center justify-between">
            <div className="orbit-shimmer h-5 w-20 rounded-full" />
            <div className="orbit-shimmer h-6 w-6 rounded-full" />
          </div>
          <div className="orbit-shimmer h-4 w-4/5 rounded-full" />
          <div className="orbit-shimmer h-4 w-3/5 rounded-full" />
          <div className="flex items-center gap-2 pt-1">
            <div className="flex -space-x-1.5">
              <div className="orbit-shimmer h-6 w-6 rounded-full ring-2 ring-orbit-surface" />
              <div className="orbit-shimmer h-6 w-6 rounded-full ring-2 ring-orbit-surface" />
              <div className="orbit-shimmer h-6 w-6 rounded-full ring-2 ring-orbit-surface" />
            </div>
            <div className="orbit-shimmer h-3 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
