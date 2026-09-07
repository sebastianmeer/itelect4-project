import type { JSX } from "react";

export interface OrbitMarkProps {
  className?: string;
}

/** The Orbit logo mark: a planet ring crossed by a tilted orbit, with a sparkle at its center. */
export function OrbitMark({ className }: OrbitMarkProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2.5" />
      <ellipse
        cx="32"
        cy="32"
        rx="30"
        ry="13"
        transform="rotate(-24 32 32)"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M32 20c0 6.6-5.4 12-12 12 6.6 0 12 5.4 12 12 0-6.6 5.4-12 12-12-6.6 0-12-5.4-12-12Z"
        fill="currentColor"
      />
    </svg>
  );
}
