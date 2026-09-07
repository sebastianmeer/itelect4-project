import type { JSX } from "react";
import { NavLink, Outlet } from "react-router";
import { MobileShell } from "../components/MobileShell.js";
import { OrbitMark } from "../components/OrbitMark.js";
import {
  CompassIcon,
  HomeIcon,
  MessageIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  type IconProps,
} from "../components/icons.js";

export interface LayoutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

interface NavItem {
  to: string;
  label: string;
  Icon: (props: IconProps) => JSX.Element;
}

const navItems: NavItem[] = [
  { to: "/explore", label: "Explore", Icon: HomeIcon },
  { to: "/discover", label: "Discover", Icon: CompassIcon },
  { to: "/connections", label: "Chats", Icon: MessageIcon },
  { to: "/profile", label: "Profile", Icon: UserIcon },
];

export function Layout({ isDarkMode, toggleDarkMode }: LayoutProps): JSX.Element {
  return (
    <MobileShell>
      <header className="relative z-10 flex items-center justify-between border-b border-orbit-border/70 bg-orbit-bg px-5 pb-3 pt-4 sm:pt-3">
        <div className="flex items-center gap-2">
          <OrbitMark className="h-7 w-7 text-orbit-ink" />
          <span className="text-lg font-bold tracking-tight text-orbit-ink">Orbit</span>
        </div>
        <button
          type="button"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-orbit-border bg-orbit-surface text-orbit-ink shadow-sm transition hover:bg-orbit-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
        >
          {isDarkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
      </header>

      <main className="orbit-scroll @container flex-1 overflow-y-auto px-5 pb-28">
        <Outlet />
      </main>

      <nav className="relative z-10 flex items-center justify-around border-t border-orbit-border/70 bg-orbit-surface px-4 pb-3 pt-2 shadow-[0_-8px_24px_-16px_rgba(20,23,15,0.35)] sm:rounded-b-[2.85rem] sm:pb-6">
        {navItems.map(({ to, label, Icon }: NavItem): JSX.Element => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            className={({ isActive }): string =>
              `flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 transition ${
                isActive ? "text-orbit-ink" : "text-orbit-muted hover:text-orbit-ink-soft"
              }`
            }
          >
            {({ isActive }): JSX.Element => (
              <>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                    isActive ? "bg-orbit-ink text-orbit-bg" : ""
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </MobileShell>
  );
}
