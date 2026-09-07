import type { JSX } from "react";
import { Link } from "react-router";
import { MobileShell } from "../components/MobileShell.js";

export function NotFoundPage(): JSX.Element {
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <span aria-hidden="true" className="text-3xl">
          🛰️
        </span>
        <h1 className="text-xl font-bold text-orbit-ink">Lost orbit</h1>
        <p className="text-sm text-orbit-muted">
          This page drifted off somewhere. Let's get you back on course.
        </p>
        <Link
          to="/explore"
          className="mt-2 rounded-full bg-orbit-ink px-4 py-2 text-sm font-semibold text-orbit-bg transition hover:opacity-90"
        >
          Back to Explore
        </Link>
      </div>
    </MobileShell>
  );
}
