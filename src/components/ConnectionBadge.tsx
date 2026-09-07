import type { JSX } from "react";
import { ConnectionStatus } from "../types/index.js";

export interface ConnectionBadgeProps {
  status: ConnectionStatus;
}

const statusCopy: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Pending]: "Signal sent",
  [ConnectionStatus.Connected]: "Connected",
};

const statusDotClass: Record<ConnectionStatus, string> = {
  [ConnectionStatus.Pending]: "bg-orbit-amber",
  [ConnectionStatus.Connected]: "bg-orbit-teal",
};

export function ConnectionBadge({ status }: ConnectionBadgeProps): JSX.Element {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-orbit-border bg-orbit-surface px-2.5 py-1 text-xs font-medium text-orbit-ink-soft">
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${statusDotClass[status]}`}
      />
      {statusCopy[status]}
    </span>
  );
}
