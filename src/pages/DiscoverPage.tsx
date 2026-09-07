import type { JSX } from "react";
import { SwipeDeck } from "../components/SwipeDeck.js";
import { ModeSwitch } from "../components/ModeSwitch.js";
import { mockProfiles } from "../lib/mockData.js";

export function DiscoverPage(): JSX.Element {
  const handleSignal = (profileId: string): void => {
    console.log(`Signal sent to ${profileId}`);
  };

  const handlePass = (profileId: string): void => {
    console.log(`Passed on ${profileId}`);
  };

  return (
    <div className="flex flex-col gap-4 pt-1">
      <ModeSwitch />

      <SwipeDeck profiles={mockProfiles} onSignal={handleSignal} onPass={handlePass} />

      <p className="pb-2 text-center text-xs text-orbit-muted">
        Drag a card, or use the buttons, to pass or send a Signal.
      </p>
    </div>
  );
}
