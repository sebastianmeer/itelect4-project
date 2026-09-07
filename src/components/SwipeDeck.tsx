import { useRef, useState, type JSX, type PointerEvent } from "react";
import type { UserProfile } from "../types/index.js";
import { UserCard } from "./UserCard.js";
import { EmptyState } from "./EmptyState.js";

export interface SwipeDeckProps {
  profiles: UserProfile[];
  onSignal: (profileId: string) => void;
  onPass: (profileId: string) => void;
}

type ExitDirection = "left" | "right" | null;

const SWIPE_THRESHOLD = 110;
const EXIT_DISTANCE = 640;

export function SwipeDeck({ profiles, onSignal, onPass }: SwipeDeckProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragX, setDragX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [exitDirection, setExitDirection] = useState<ExitDirection>(null);
  const pointerStartX = useRef<number>(0);

  const currentProfile = profiles[currentIndex];
  const nextProfile = profiles[currentIndex + 1];

  const commitSwipe = (direction: "left" | "right"): void => {
    if (currentProfile === undefined || exitDirection !== null) {
      return;
    }
    setIsDragging(false);
    setExitDirection(direction);
    if (direction === "right") {
      onSignal(currentProfile.id);
    } else {
      onPass(currentProfile.id);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (exitDirection !== null) {
      return;
    }
    setIsDragging(true);
    pointerStartX.current = event.clientX;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!isDragging) {
      return;
    }
    setDragX(event.clientX - pointerStartX.current);
  };

  const handlePointerUp = (): void => {
    if (!isDragging) {
      return;
    }
    setIsDragging(false);
    if (dragX > SWIPE_THRESHOLD) {
      commitSwipe("right");
    } else if (dragX < -SWIPE_THRESHOLD) {
      commitSwipe("left");
    } else {
      setDragX(0);
    }
  };

  const handleTransitionEnd = (): void => {
    if (exitDirection !== null) {
      setCurrentIndex((index: number): number => index + 1);
      setExitDirection(null);
      setDragX(0);
    }
  };

  if (currentProfile === undefined) {
    return (
      <div className="flex h-[540px] items-center">
        <EmptyState
          title="You're all caught up"
          message="Check back later for new people to discover."
        />
      </div>
    );
  }

  const translateX =
    exitDirection === "right" ? EXIT_DISTANCE : exitDirection === "left" ? -EXIT_DISTANCE : dragX;
  const rotate = translateX / 18;
  const passOpacity = Math.min(Math.max(-translateX / SWIPE_THRESHOLD, 0), 1);
  const signalOpacity = Math.min(Math.max(translateX / SWIPE_THRESHOLD, 0), 1);

  return (
    <div className="relative h-[540px] w-full">
      {nextProfile !== undefined && (
        <div className="absolute inset-0 scale-[0.96] opacity-70">
          <UserCard profile={nextProfile} interactive={false} />
        </div>
      )}

      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
          transition: isDragging ? "none" : "transform 0.35s ease",
        }}
        className="absolute inset-0 touch-none cursor-grab select-none active:cursor-grabbing"
      >
        <span
          aria-hidden="true"
          style={{ opacity: passOpacity }}
          className="absolute left-5 top-6 z-10 rounded-xl border-4 border-orbit-muted px-3 py-1 text-lg font-extrabold uppercase tracking-wide text-orbit-muted"
        >
          Pass
        </span>
        <span
          aria-hidden="true"
          style={{ opacity: signalOpacity }}
          className="absolute right-5 top-6 z-10 rounded-xl border-4 border-orbit-coral px-3 py-1 text-lg font-extrabold uppercase tracking-wide text-orbit-coral"
        >
          Signal
        </span>

        <UserCard
          profile={currentProfile}
          onSignal={(): void => commitSwipe("right")}
          onPass={(): void => commitSwipe("left")}
        />
      </div>
    </div>
  );
}
