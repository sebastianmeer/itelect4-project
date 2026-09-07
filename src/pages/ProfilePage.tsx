import type { JSX } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore.js";
import { mockProfiles } from "../lib/mockData.js";

export function ProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const profile = mockProfiles[0];

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
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <p className="text-lg font-bold text-orbit-ink">
            {profile.name}, {profile.age}
          </p>
          <p className="text-sm text-orbit-muted">{profile.location}</p>
        </div>
        <p className="max-w-xs text-sm text-orbit-ink-soft">{profile.bio}</p>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-orbit-ink">Interests</h2>
        <ul className="flex flex-wrap gap-2">
          {profile.interests.map((interest: string): JSX.Element => (
            <li
              key={interest}
              className="rounded-full bg-orbit-surface px-3 py-1 text-xs font-medium text-orbit-ink-soft"
            >
              {interest}
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 rounded-full border border-orbit-border bg-orbit-surface px-4 py-3 text-sm font-semibold text-orbit-ink transition hover:bg-orbit-bg"
      >
        Log out
      </button>
    </div>
  );
}
