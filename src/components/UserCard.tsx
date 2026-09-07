import type { JSX, MouseEvent } from "react";
import type { UserProfile } from "../types/index.js";

export interface UserCardProps {
  profile: UserProfile;
  onSignal?: (profileId: string) => void;
  onPass?: (profileId: string) => void;
}

export function UserCard({
  profile,
  onSignal,
  onPass,
}: UserCardProps): JSX.Element {
  const handleSignal = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onSignal?.(profile.id);
  };

  const handlePass = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    onPass?.(profile.id);
  };

  return (
    <article className="flex w-full flex-col overflow-hidden rounded-3xl border border-orbit-border bg-orbit-surface shadow-sm">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-orbit-border">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-lg font-semibold text-white">
            {profile.name}, {profile.age}
          </p>
          <p className="text-sm text-white/80">{profile.location}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <p className="text-sm text-orbit-muted">{profile.bio}</p>

        <ul className="flex flex-wrap gap-2">
          {profile.interests.map((interest: string): JSX.Element => (
            <li
              key={interest}
              className="rounded-full bg-orbit-bg px-3 py-1 text-xs font-medium text-orbit-ink-soft"
            >
              {interest}
            </li>
          ))}
        </ul>

        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            onClick={handlePass}
            aria-label={`Pass on ${profile.name}`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-orbit-border text-orbit-muted transition hover:border-orbit-ink-soft hover:text-orbit-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={handleSignal}
            aria-label={`Send a Signal to ${profile.name}`}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-orbit-ink px-4 text-sm font-semibold text-orbit-bg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          >
            Send a Signal
          </button>
        </div>
      </div>
    </article>
  );
}
