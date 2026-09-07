import type { JSX, ReactNode } from "react";

export interface MobileShellProps {
  children: ReactNode;
}

export function MobileShell({ children }: MobileShellProps): JSX.Element {
  return (
    <div className="min-h-dvh bg-orbit-ink px-0 py-0 sm:py-8">
      <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-orbit-bg sm:min-h-0 sm:rounded-[2.5rem] sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
