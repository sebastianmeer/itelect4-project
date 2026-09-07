import type { JSX } from "react";
import { UserCard } from "../components/UserCard.js";
import { ModeSwitch } from "../components/ModeSwitch.js";
import { mockProfiles } from "../lib/mockData.js";
import type { UserProfile } from "../types/index.js";

export function DiscoverPage(): JSX.Element {
  const handleSignal = (profileId: string): void => {
    console.log(`Signal sent to ${profileId}`);
  };

  const handlePass = (profileId: string): void => {
    console.log(`Passed on ${profileId}`);
  };

  return (
    <div className="flex flex-col gap-6 pt-1">
      <ModeSwitch />

      {/* A phone's screen is never wide enough for a multi-column browse
          grid, so Discover always stacks one full-width profile at a time --
          matching the reference's single-card browse pattern. */}
      <div className="flex flex-col gap-6">
        {mockProfiles.map((profile: UserProfile): JSX.Element => (
          <UserCard
            key={profile.id}
            profile={profile}
            onSignal={handleSignal}
            onPass={handlePass}
          />
        ))}
      </div>
    </div>
  );
}
