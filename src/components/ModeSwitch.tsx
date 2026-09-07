import type { JSX } from "react";
import { NavLink } from "react-router";

export function ModeSwitch(): JSX.Element {
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `flex-1 rounded-full px-4 py-2 text-center text-sm font-semibold transition ${
      isActive ? "bg-orbit-ink text-orbit-bg" : "text-orbit-muted"
    }`;

  return (
    <div className="orbit-card flex rounded-full p-1">
      <NavLink to="/explore" className={linkClass}>
        Explore
      </NavLink>
      <NavLink to="/discover" className={linkClass}>
        Discover
      </NavLink>
    </div>
  );
}
