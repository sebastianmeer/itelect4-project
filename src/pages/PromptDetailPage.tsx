import type { JSX } from "react";
import { useNavigate, useParams } from "react-router";
import { NotFoundPage } from "./NotFoundPage.js";
import { EmptyState } from "../components/EmptyState.js";
import { getCategoryTheme } from "../lib/categoryTheme.js";
import { mockPrompts, mockProfiles, mockResponses } from "../lib/mockData.js";
import { getById, type ExploreResponse } from "../types/index.js";

export function PromptDetailPage(): JSX.Element {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();

  const prompt = promptId !== undefined ? getById(mockPrompts, promptId) : undefined;

  if (prompt === undefined) {
    return <NotFoundPage />;
  }

  const theme = getCategoryTheme(prompt.category);
  const responses: ExploreResponse[] = mockResponses.filter(
    (response: ExploreResponse): boolean => response.promptId === prompt.id,
  );

  const handleBack = (): void => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-6 pt-1">
      <button
        type="button"
        onClick={handleBack}
        className="flex w-fit items-center gap-1 text-sm font-medium text-orbit-muted transition hover:text-orbit-ink"
      >
        <span aria-hidden="true">&larr;</span> Back to Explore
      </button>

      <div className="flex flex-col gap-3 rounded-3xl border border-orbit-border bg-orbit-surface p-5">
        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${theme.bgClass} ${theme.textClass}`}
        >
          {theme.label}
        </span>
        <p className="text-lg font-semibold leading-snug text-orbit-ink">
          {prompt.question}
        </p>
        <span className="text-sm text-orbit-muted">{prompt.responseCount} joined</span>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-orbit-ink">Responses</h2>

        {responses.length === 0 ? (
          <EmptyState
            title="No responses yet"
            message="Be the first to start the conversation."
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {responses.map((response: ExploreResponse): JSX.Element => {
              const author = getById(mockProfiles, response.userId);
              return (
                <li
                  key={response.id}
                  className="flex flex-col gap-1 rounded-2xl border border-orbit-border bg-orbit-surface p-4"
                >
                  <span className="text-sm font-semibold text-orbit-ink">
                    {author?.name ?? "Someone"}
                  </span>
                  <p className="text-sm text-orbit-ink-soft">{response.body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
