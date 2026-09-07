import {
  ExploreCategory,
  ConnectionStatus,
  type UserProfile,
  type ExplorePrompt,
  type ExploreResponse,
  type Connection,
} from "../types/index.js";

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

export const mockPrompts: ExplorePrompt[] = [
  {
    id: "prompt-1",
    question: "What could you talk about for three hours without getting bored?",
    category: ExploreCategory.DeepTalks,
    responseCount: 3,
    createdAt: new Date("2026-09-05T08:00:00.000Z"),
  },
  {
    id: "prompt-2",
    question: "What's an opinion you have that would get you cancelled in your friend group?",
    category: ExploreCategory.DeepTalks,
    responseCount: 12,
    createdAt: new Date("2026-09-06T08:00:00.000Z"),
  },
  {
    id: "prompt-3",
    question: "Drop one song you think everyone should hear.",
    category: ExploreCategory.Music,
    responseCount: 8,
    createdAt: new Date("2026-09-06T12:00:00.000Z"),
  },
  {
    id: "prompt-4",
    question: "What's the most overrated food?",
    category: ExploreCategory.Food,
    responseCount: 5,
    createdAt: new Date("2026-09-06T18:00:00.000Z"),
  },
  {
    id: "prompt-5",
    question: "Valorant or CS2, and why is your answer correct?",
    category: ExploreCategory.Gaming,
    responseCount: 12,
    createdAt: new Date("2026-09-07T02:00:00.000Z"),
  },
  {
    id: "prompt-6",
    question: "What could you talk about for hours, but only if someone else brings it up first?",
    category: ExploreCategory.Tech,
    responseCount: 4,
    createdAt: new Date("2026-09-07T06:00:00.000Z"),
  },
];

export const mockResponses: ExploreResponse[] = [
  {
    id: "response-1",
    promptId: "prompt-1",
    userId: "user-2",
    body: "Game design, especially why tiny mechanics can completely change how a player feels.",
    createdAt: new Date("2026-09-05T09:10:00.000Z"),
    signalCount: 2,
  },
  {
    id: "response-2",
    promptId: "prompt-1",
    userId: "user-4",
    body: "Why some restaurants get the small stuff right and somehow still close within a year.",
    createdAt: new Date("2026-09-05T10:30:00.000Z"),
    signalCount: 1,
  },
  {
    id: "response-3",
    promptId: "prompt-3",
    userId: "user-5",
    body: "Anything by boy pablo. Non-negotiable.",
    createdAt: new Date("2026-09-06T13:00:00.000Z"),
    signalCount: 4,
  },
];

export function loadExplorePrompts(): Promise<ExplorePrompt[]> {
  return new Promise<ExplorePrompt[]>((resolve: (prompts: ExplorePrompt[]) => void): void => {
    setTimeout((): void => resolve(mockPrompts), 550);
  });
}

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
