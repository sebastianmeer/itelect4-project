import type {
  UserProfile,
  ExplorePrompt,
  ExploreResponse,
  Connection,
  ApiResponse,
  UserPreview,
  UserProfileUpdate,
  NewExploreResponse,
  PromptGroups,
} from "./types/index.js";
import { ExploreCategory, ConnectionStatus, getById } from "./types/index.js";

// ===== PRIMITIVE TYPE ANNOTATIONS =====
const appName: string = "Orbit";
const launchYear: number = 2026;
const isMobileFirst: boolean = true;
const nothing: null = null;
const notSet: undefined = undefined;

function greet(name: string, year: number): string {
  return `Welcome to ${name} -- more than a swipe since ${year}!`;
}

function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(appName, launchYear));

// ===== SPECIAL TYPES =====
// any -- disables TypeScript type checking. Avoided everywhere in Orbit.
let legacyPayload: any = "unstructured";
legacyPayload = 42; // No error, which is exactly why `any` is avoided.

// unknown -- the safer version of any. Must be narrowed before use.
let rawSignalPayload: unknown = "signal-sent";
if (typeof rawSignalPayload === "string") {
  console.log(rawSignalPayload.toUpperCase());
}

// never -- a function that never returns normally.
function throwOrbitError(message: string): never {
  throw new Error(message);
}

// ===== USING ORBIT INTERFACES =====
const mia: UserProfile = {
  id: "user-2",
  name: "Mia",
  age: 22,
  bio: "Probably overthinking a movie ending somewhere.",
  avatarUrl: "/images/mia.jpg",
  interests: ["Movies", "Gaming", "Coffee"],
  location: "Batangas",
};

const kai: UserProfile = {
  id: "user-3",
  name: "Kai",
  age: 24,
  bio: "Still trying to beat Hollow Knight.",
  avatarUrl: "/images/kai.jpg",
  interests: ["Gaming", "Tech"],
  location: "Manila",
};

const profiles: UserProfile[] = [mia, kai];

const featuredPrompt: ExplorePrompt = {
  id: "prompt-1",
  question: "What could you talk about for three hours without getting bored?",
  category: ExploreCategory.DeepTalks,
  responseCount: 1,
  createdAt: new Date("2026-09-07T08:00:00.000Z"),
};

const prompts: ExplorePrompt[] = [featuredPrompt];

const miaResponse: ExploreResponse = {
  id: "response-1",
  promptId: "prompt-1",
  userId: mia.id,
  body: "Game design, especially why tiny mechanics can completely change how a player feels.",
  createdAt: new Date("2026-09-07T08:10:00.000Z"),
  signalCount: 2,
};

const responses: ExploreResponse[] = [miaResponse];

const miaAndKai: Connection = {
  id: "connection-1",
  userId: kai.id,
  connectedUserId: mia.id,
  status: ConnectionStatus.Connected,
  createdAt: new Date("2026-09-07T09:00:00.000Z"),
};

console.log(profiles);
console.log(prompts);
console.log(responses);
console.log(miaAndKai);

// ===== GENERIC FUNCTION IN USE =====
const foundProfile: UserProfile | undefined = getById<UserProfile>(
  profiles,
  "user-2",
);
const foundPrompt: ExplorePrompt | undefined = getById<ExplorePrompt>(
  prompts,
  "prompt-1",
);

if (foundProfile === undefined) {
  throwOrbitError("Expected to find Mia's profile.");
}

console.log(`Found profile: ${foundProfile.name}`);
console.log(`Found prompt: ${foundPrompt?.question ?? "not found"}`);

// ===== UTILITY TYPES IN USE =====
const miaPreview: UserPreview = {
  id: mia.id,
  name: mia.name,
  age: mia.age,
  avatarUrl: mia.avatarUrl,
};

const profileEdit: UserProfileUpdate = {
  bio: "Overthinking movie endings, professionally now.",
};

const draftResponse: NewExploreResponse = {
  promptId: "prompt-1",
  userId: kai.id,
  body: "Honestly, speedrun routing. There's always a smarter path.",
};

const groupedPrompts: PromptGroups = {
  [ExploreCategory.Gaming]: [],
  [ExploreCategory.Music]: [],
  [ExploreCategory.Movies]: [],
  [ExploreCategory.Food]: [],
  [ExploreCategory.Tech]: [],
  [ExploreCategory.DeepTalks]: [featuredPrompt],
};

console.log(miaPreview);
console.log(profileEdit);
console.log(draftResponse);
console.log(groupedPrompts);

// ===== GENERIC WRAPPER TYPE IN USE =====
const promptsResponse: ApiResponse<ExplorePrompt[]> = {
  data: prompts,
  message: "Explore prompts loaded.",
  success: true,
};

console.log(promptsResponse);

// ===== TYPE NARROWING =====
type StringOrNumber = string | number;

function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input.toFixed(2);
}

function formatSignalDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return value;
}

console.log(processInput("crossed paths"));
console.log(processInput(3.14159));
console.log(formatSignalDate(new Date()));
console.log(isMobileFirst, nothing, notSet);
