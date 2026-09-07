import type { JSX } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore.js";
import { CURRENT_USER_ID, mockProfiles, mockConnections } from "../lib/mockData.js";
import { getById } from "../types/index.js";
import { LogOutIcon } from "../components/icons.js";

export function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const profile = getById(mockProfiles, CURRENT_USER_ID);

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  if (profile === undefined) {
    return <p className="pt-4 text-sm text-orbit-muted">Profile unavailable.</p>;
  }

  return (
    <div className="flex flex-col gap-6 pt-1">
      <div className="flex flex-col items-center gap-3 pt-4 text-center">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="h-24 w-24 rounded-full object-cover shadow-[0_12px_28px_-12px_rgba(20,23,15,0.4)] ring-4 ring-orbit-surface"
        />
        <div>
          <p className="text-lg font-bold text-orbit-ink">
            {profile.name}, {profile.age}
          </p>
          <p className="text-sm text-orbit-muted">{profile.location}</p>
        </div>
        <p className="max-w-xs text-sm text-orbit-ink-soft">{profile.bio}</p>
      </div>

      <div className="orbit-card flex items-center justify-around rounded-2xl py-4">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-bold text-orbit-ink">{mockConnections.length}</span>
          <span className="text-xs text-orbit-muted">Connections</span>
        </div>
        <div className="h-8 w-px bg-orbit-border" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-lg font-bold text-orbit-ink">{profile.interests.length}</span>
          <span className="text-xs text-orbit-muted">Interests</span>
        </div>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-orbit-ink">Interests</h2>
        <ul className="flex flex-wrap gap-2">
          {profile.interests.map((interest: string): JSX.Element => (
            <li
              key={interest}
              className="rounded-full bg-orbit-surface px-3 py-1 text-xs font-medium text-orbit-ink-soft shadow-sm"
            >
              {interest}
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="orbit-card mt-2 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-orbit-ink transition hover:bg-orbit-bg"
      >
        <LogOutIcon className="h-4 w-4" />
        Log out
      </button>
    </div>
  );
}
