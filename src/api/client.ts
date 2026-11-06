import type {
  ExplorePrompt,
  ExploreResponse,
  ExplorePromptApi,
  ExploreResponseApi,
  NewExploreResponseApi,
} from "../types/index.js";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...init.headers },
  });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return (await response.json()) as T;
}

export interface AuthResponse { token: string; user: { id: string; name: string; email: string } }
export const login = (email: string, password: string): Promise<AuthResponse> => request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

function toExplorePrompt(prompt: ExplorePromptApi): ExplorePrompt {
  return { ...prompt, createdAt: new Date(prompt.createdAt) };
}

function toExploreResponse(response: ExploreResponseApi): ExploreResponse {
  return { ...response, createdAt: new Date(response.createdAt) };
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
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
): Promise<ExploreResponse[]> {
  const data = await request<ExploreResponseApi[]>(`/responses?promptId=${encodeURIComponent(promptId)}`);
  return data.map(toExploreResponse);
}

export async function createExploreResponse(
  payload: NewExploreResponseApi,
  token: string,
): Promise<ExploreResponse> {
  const response = await fetch(`${API_BASE_URL}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
  const data = await parseJson<ExploreResponseApi>(response);
  return toExploreResponse(data);
}
