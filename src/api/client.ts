import type {
  ExplorePrompt,
  ExploreResponse,
  ExplorePromptApi,
  ExploreResponseApi,
  NewExploreResponseApi,
} from "../types/index.js";

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "https://orbit-api-weld-tau.vercel.app/api").replace(/\/$/, "");

export async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 10_000);
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    signal: init.signal ?? controller.signal,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers },
  });
  globalThis.clearTimeout(timeout);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(errorBody?.message ?? `Request failed with status ${response.status}`);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export interface AuthResponse { token: string; user: { id: string; name: string; email: string } }
export interface AiReview { summary: string; strengths: string[]; improvements: string[]; readiness: "ready" | "almost" | "not-yet" }
export const login = (email: string, password: string): Promise<AuthResponse> => request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
export const register = (name: string, email: string, password: string): Promise<AuthResponse> => request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
export const askAi = (prompt: string, token: string): Promise<AiReview> => request<AiReview>("/ai", { method: "POST", body: JSON.stringify({ prompt }) }, token);

function toExplorePrompt(prompt: ExplorePromptApi): ExplorePrompt {
  return { ...prompt, id: prompt.id ?? prompt._id ?? "", createdAt: new Date(prompt.createdAt) };
}

function toExploreResponse(response: ExploreResponseApi): ExploreResponse {
  return { ...response, id: response.id ?? response._id ?? "", createdAt: new Date(response.createdAt) };
}

export async function getPrompts(): Promise<ExplorePrompt[]> {
  const data = await request<ExplorePromptApi[]>("/prompts");
  return data.map(toExplorePrompt);
}

export async function getPromptById(promptId: string): Promise<ExplorePrompt> {
  const data = await request<ExplorePromptApi>(`/prompts/${promptId}`);
  return toExplorePrompt(data);
}

export async function getResponsesByPromptId(
  promptId: string,
  token: string,
): Promise<ExploreResponse[]> {
  const data = await request<ExploreResponseApi[]>(`/responses?promptId=${encodeURIComponent(promptId)}`, {}, token);
  return data.map(toExploreResponse);
}

export async function createExploreResponse(
  payload: NewExploreResponseApi,
  token: string,
): Promise<ExploreResponse> {
  const data = await request<ExploreResponseApi>("/responses", {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
  return toExploreResponse(data);
}
