import type { JSX, MouseEvent } from "react";
import type { UserProfile } from "../types/index.js";
import { HeartIcon, XIcon } from "./icons.js";

export interface UserCardProps {
  profile: UserProfile;
  onSignal?: (profileId: string) => void;
  onPass?: (profileId: string) => void;
  interactive?: boolean;
}

export function UserCard({
  profile,
  onSignal,
  onPass,
  interactive = true,
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
    <article className="orbit-card relative h-full w-full overflow-hidden rounded-3xl bg-orbit-border">
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        draggable={false}
        className="h-full w-full select-none object-cover"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-20 pt-16">
        <div>
          <p className="text-2xl font-bold text-white">
            {profile.name}, {profile.age}
          </p>
          <p className="text-sm text-white/75">{profile.location}</p>
        </div>
        <p className="text-sm text-white/90">{profile.bio}</p>
        <ul className="flex flex-wrap gap-1.5 pt-1">
          {profile.interests.map((interest: string): JSX.Element => (
            <li
              key={interest}
              className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white"
            >
              {interest}
            </li>
          ))}
        </ul>
      </div>

      {interactive && (
        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-5">
          <button
            type="button"
            onClick={handlePass}
            aria-label={`Pass on ${profile.name}`}
            className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-orbit-muted shadow-[0_12px_24px_-6px_rgba(0,0,0,0.5)] transition hover:scale-105 hover:text-orbit-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={handleSignal}
            aria-label={`Send a Signal to ${profile.name}`}
            className="flex h-13 w-13 items-center justify-center rounded-full bg-orbit-coral text-white shadow-[0_12px_24px_-6px_rgba(0,0,0,0.5)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <HeartIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </article>
  );
}
