import type {
  ExplorePrompt,
  ExploreResponse,
  ExplorePromptApi,
  ExploreResponseApi,
  NewExploreResponseApi,
} from "../types/index.js";

const API_BASE_URL = "http://localhost:3001";

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
  const response = await fetch(`${API_BASE_URL}/prompts`);
  const data = await parseJson<ExplorePromptApi[]>(response);
  return data.map(toExplorePrompt);
}

export async function getPromptById(promptId: string): Promise<ExplorePrompt> {
  const response = await fetch(`${API_BASE_URL}/prompts/${promptId}`);
  const data = await parseJson<ExplorePromptApi>(response);
  return toExplorePrompt(data);
}

export async function getResponsesByPromptId(
  promptId: string,
): Promise<ExploreResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/responses?promptId=${encodeURIComponent(promptId)}`,
  );
  const data = await parseJson<ExploreResponseApi[]>(response);
  return data.map(toExploreResponse);
}

export async function createExploreResponse(
  payload: NewExploreResponseApi,
): Promise<ExploreResponse> {
  const response = await fetch(`${API_BASE_URL}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseJson<ExploreResponseApi>(response);
  return toExploreResponse(data);
}
