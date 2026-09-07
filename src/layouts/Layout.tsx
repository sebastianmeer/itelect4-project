import type { JSX } from "react";
import { NavLink, Outlet } from "react-router";
import { MobileShell } from "../components/MobileShell.js";

export interface LayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { to: "/explore", label: "Explore", icon: "⌂" },
  { to: "/discover", label: "Discover", icon: "◎" },
  { to: "/connections", label: "Chats", icon: "◐" },
  { to: "/profile", label: "Profile", icon: "◇" },
];

export function Layout({ isDarkMode, toggleDarkMode }: LayoutProps): JSX.Element {
  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pb-3 pt-6">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-orbit-ink text-orbit-ink"
          >
            ✦
          </span>
          <span className="text-lg font-bold text-orbit-ink">Orbit</span>
        </div>
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-orbit-border text-orbit-ink transition hover:bg-orbit-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
        >
          {isDarkMode ? "☀" : "☾"}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-28">
        <Outlet />
      </main>

      <nav className="sticky bottom-0 flex items-center justify-around border-t border-orbit-border bg-orbit-surface/95 px-4 py-3 backdrop-blur">
        {navItems.map((item: NavItem): JSX.Element => (
          <NavLink
            key={item.to}
            to={item.to}
            aria-label={item.label}
            className={({ isActive }): string =>
              `text-xl transition ${isActive ? "text-orbit-ink" : "text-orbit-muted"}`
            }
          >
            <span aria-hidden="true">{item.icon}</span>
          </NavLink>
        ))}
      </nav>
    </MobileShell>
  );
}
