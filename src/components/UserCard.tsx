import type { JSX, MouseEvent } from "react";
import type { UserProfile } from "../types/index.js";
import { HeartIcon, XIcon } from "./icons.js";

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
    <article className="orbit-card flex w-full flex-col overflow-hidden rounded-3xl">
      <div className="relative aspect-[4/5] w-full bg-orbit-border">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 pb-8">
            <p className="text-lg font-semibold text-white">
              {profile.name}, {profile.age}
            </p>
            <p className="text-sm text-white/80">{profile.location}</p>
          </div>
        </div>

        <div className="absolute inset-x-0 -bottom-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={handlePass}
            aria-label={`Pass on ${profile.name}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-orbit-surface text-orbit-muted shadow-[0_12px_24px_-8px_rgba(20,23,15,0.45)] transition hover:scale-105 hover:text-orbit-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          >
            <XIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleSignal}
            aria-label={`Send a Signal to ${profile.name}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-orbit-ink text-orbit-bg shadow-[0_12px_24px_-8px_rgba(20,23,15,0.55)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          >
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 pt-9">
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
      </div>
    </article>
  );
}
