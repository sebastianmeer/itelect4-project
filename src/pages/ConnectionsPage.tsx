import type { JSX } from "react";
import { ConnectionBadge } from "../components/ConnectionBadge.js";
import { EmptyState } from "../components/EmptyState.js";
import { mockConnections, mockProfiles } from "../lib/mockData.js";
import { getById, type Connection } from "../types/index.js";

export function ConnectionsPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 pt-1">
      <h1 className="text-lg font-bold text-orbit-ink">Connections</h1>

      {mockConnections.length === 0 ? (
        <EmptyState
          title="No connections yet"
          message="Send a Signal in Explore or Discover to start one."
        />
      ) : (
        <ul className="flex flex-col gap-2.5">
          {mockConnections.map((connection: Connection): JSX.Element => {
            const connectedProfile = getById(mockProfiles, connection.connectedUserId);
            return (
              <li
                key={connection.id}
                className="orbit-card flex items-center gap-3 rounded-2xl px-4 py-3"
              >
                <img
                  src={connectedProfile?.avatarUrl}
                  alt={connectedProfile?.name ?? "Orbit member"}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-orbit-bg"
                />
                <span className="flex-1 text-sm font-medium text-orbit-ink">
                  {connectedProfile?.name ?? "Someone"}
                </span>
                <ConnectionBadge status={connection.status} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
