// ===== ORBIT DOMAIN INTERFACES =====
// Orbit is a dating and social discovery app. These interfaces describe
// its core entities: people (UserProfile), the Explore social-discovery
// layer (ExplorePrompt / ExploreResponse), and the outcome of a mutual
// interest (Connection).

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatarUrl: string;
  interests: string[];
  location: string;
}

export interface ExplorePrompt {
  id: string;
  question: string;
  category: ExploreCategory;
  responseCount: number;
  createdAt: Date;
}

export interface ExploreResponse {
  id: string;
  promptId: string;
  userId: string;
  body: string;
  createdAt: Date;
  signalCount: number;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: ConnectionStatus;
  createdAt: Date;
}

// ===== ENUMS =====

export enum ExploreCategory {
  Gaming = "gaming",
  Music = "music",
  Movies = "movies",
  Food = "food",
  Tech = "tech",
  DeepTalks = "deep-talks",
}

export enum ConnectionStatus {
  Pending = "pending",
  Connected = "connected",
}

// ===== GENERIC UTILITY TYPE =====
// Wraps every mock/API payload in the app with a consistent envelope.

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// ===== GENERIC FUNCTION =====
// Looks up any Orbit entity that has an `id` field, by id.

export function getById<T extends { id: string }>(
  items: T[],
  id: string,
): T | undefined {
  return items.find((item: T): boolean => item.id === id);
}

// ===== UTILITY TYPES (Pick / Omit / Partial / Record) =====

// A trimmed-down profile shown in feeds, cards, and lists.
export type UserPreview = Pick<
  UserProfile,
  "id" | "name" | "age" | "avatarUrl"
>;

// Editable profile fields for a settings/edit-profile form.
export type UserProfileUpdate = Partial<Omit<UserProfile, "id">>;

// Payload shape for submitting a new Explore response (server assigns id/createdAt).
export type NewExploreResponse = Omit<
  ExploreResponse,
  "id" | "createdAt" | "signalCount"
>;

// Explore prompts bucketed by their Circle/category.
export type PromptGroups = Record<ExploreCategory, ExplorePrompt[]>;

// ===== API TYPES =====
// json-server serializes dates as strings; these mirror the domain
// entities but with `createdAt` narrowed to the wire format.

export type ExplorePromptApi = Omit<ExplorePrompt, "createdAt"> & {
  createdAt: string;
};

export type ExploreResponseApi = Omit<ExploreResponse, "createdAt"> & {
  createdAt: string;
};

// Payload for POSTing a new Explore response; the client stamps createdAt,
// the server assigns the id.
export type NewExploreResponseApi = Omit<ExploreResponse, "id" | "createdAt"> & {
  createdAt: string;
};
