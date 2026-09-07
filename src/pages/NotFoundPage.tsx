import type { JSX } from "react";
import { Link } from "react-router";
import { MobileShell } from "../components/MobileShell.js";
import { OrbitMark } from "../components/OrbitMark.js";

export function NotFoundPage(): JSX.Element {
  return (
    <MobileShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-orbit-bg px-8 text-center">
        <OrbitMark className="h-12 w-12 text-orbit-muted" />
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl font-bold text-orbit-ink">Lost orbit</h1>
          <p className="text-sm text-orbit-muted">
            This page drifted off somewhere. Let's get you back on course.
          </p>
        </div>
        <Link
          to="/explore"
          className="inline-flex h-11 items-center justify-center rounded-full bg-orbit-ink px-5 text-sm font-semibold text-orbit-bg shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
        >
          Back to Explore
        </Link>
      </div>
    </MobileShell>
  );
}
