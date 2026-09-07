import type { JSX, ReactNode } from "react";
import { BatteryIcon, SignalBarsIcon, WifiIcon } from "./icons.js";

export interface MobileShellProps {
  children: ReactNode;
}

export function MobileShell({ children }: MobileShellProps): JSX.Element {
  return (
    <div className="orbit-backdrop">
      <div className="device-bezel">
        <div className="device-screen">
          <div className="status-bar" aria-hidden="true">
            <span className="text-[13px] font-semibold tracking-tight">9:41</span>
            <span className="dynamic-island" />
            <span className="flex items-center justify-self-end gap-1.5">
              <SignalBarsIcon className="h-[10px] w-[15px]" />
              <WifiIcon className="h-[11px] w-[15px]" />
              <BatteryIcon className="h-[11px] w-[21px]" />
            </span>
          </div>

          {children}

          <span className="home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
