import { ConnectionStatus, type UserProfile, type Connection } from "../types/index.js";

export const CURRENT_USER_ID = "user-1";

export const mockProfiles: UserProfile[] = [
  {
    id: "user-1",
    name: "Sebastian",
    age: 21,
    bio: "Building Orbit between classes.",
    avatarUrl: "https://i.pravatar.cc/160?img=13",
    interests: ["Tech", "Music", "Deep Talks"],
    location: "Batangas",
  },
  {
    id: "user-2",
    name: "Mia",
    age: 22,
    bio: "Probably overthinking a movie ending somewhere.",
    avatarUrl: "https://i.pravatar.cc/160?img=47",
    interests: ["Movies", "Gaming", "Coffee"],
    location: "Batangas",
  },
  {
    id: "user-3",
    name: "Kai",
    age: 24,
    bio: "Still trying to beat Hollow Knight.",
    avatarUrl: "https://i.pravatar.cc/160?img=12",
    interests: ["Gaming", "Tech"],
    location: "Manila",
  },
  {
    id: "user-4",
    name: "Rae",
    age: 23,
    bio: "Will talk about food for three hours, no notice needed.",
    avatarUrl: "https://i.pravatar.cc/160?img=32",
    interests: ["Food", "Deep Talks"],
    location: "Lipa",
  },
  {
    id: "user-5",
    name: "Jamie",
    age: 25,
    bio: "Front-row at every gig within driving distance.",
    avatarUrl: "https://i.pravatar.cc/160?img=25",
    interests: ["Music", "Movies"],
    location: "Manila",
  },
];

export const mockConnections: Connection[] = [
  {
    id: "connection-1",
    userId: "user-1",
    connectedUserId: "user-2",
    status: ConnectionStatus.Connected,
    createdAt: new Date("2026-09-06T09:00:00.000Z"),
  },
  {
    id: "connection-2",
    userId: "user-1",
    connectedUserId: "user-5",
    status: ConnectionStatus.Pending,
    createdAt: new Date("2026-09-07T07:00:00.000Z"),
  },
];
