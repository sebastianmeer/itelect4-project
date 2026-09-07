import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { NotFoundPage } from "./NotFoundPage.js";
import { EmptyState } from "../components/EmptyState.js";
import { LoadingSkeleton } from "../components/LoadingSkeleton.js";
import { getCategoryTheme } from "../lib/categoryTheme.js";
import { mockProfiles, CURRENT_USER_ID } from "../lib/mockData.js";
import {
  createExploreResponse,
  getPromptById,
  getResponsesByPromptId,
} from "../api/client.js";
import {
  getById,
  type ExplorePrompt,
  type ExploreResponse,
  type NewExploreResponseApi,
} from "../types/index.js";

export function PromptDetailPage(): JSX.Element {
  const { promptId } = useParams<{ promptId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [draftAnswer, setDraftAnswer] = useState<string>("");

  const promptQuery = useQuery({
    queryKey: ["prompt", promptId],
    queryFn: (): Promise<ExplorePrompt> => getPromptById(promptId as string),
    enabled: promptId !== undefined,
    retry: false,
  });

  const responsesQuery = useQuery({
    queryKey: ["responses", promptId],
    queryFn: (): Promise<ExploreResponse[]> => getResponsesByPromptId(promptId as string),
    enabled: promptId !== undefined,
  });

  const submitResponse = useMutation({
    mutationFn: (payload: NewExploreResponseApi) => createExploreResponse(payload),
    onSuccess: (): void => {
      setDraftAnswer("");
      void queryClient.invalidateQueries({ queryKey: ["responses", promptId] });
    },
  });

  if (promptId === undefined || promptQuery.isError) {
    return <NotFoundPage />;
  }

  const handleAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setDraftAnswer(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (draftAnswer.trim().length === 0) {
      return;
    }
    submitResponse.mutate({
      promptId,
      userId: CURRENT_USER_ID,
      body: draftAnswer.trim(),
      createdAt: new Date().toISOString(),
      signalCount: 0,
    });
  };

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

      {promptQuery.isLoading || promptQuery.data === undefined ? (
        <LoadingSkeleton rows={1} />
      ) : (
        <div className="flex flex-col gap-3 rounded-3xl border border-orbit-border bg-orbit-surface p-5">
          <span
            className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${getCategoryTheme(promptQuery.data.category).bgClass} ${getCategoryTheme(promptQuery.data.category).textClass}`}
          >
            {getCategoryTheme(promptQuery.data.category).label}
          </span>
          <p className="text-lg font-semibold leading-snug text-orbit-ink">
            {promptQuery.data.question}
          </p>
          <span className="text-sm text-orbit-muted">
            {promptQuery.data.responseCount} joined
          </span>
        </div>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-orbit-ink">Add your answer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            value={draftAnswer}
            onChange={handleAnswerChange}
            required
            minLength={10}
            maxLength={280}
            rows={3}
            placeholder="What's your take?"
            aria-label="Your answer"
            className="rounded-2xl border border-orbit-border bg-orbit-surface px-4 py-3 text-sm text-orbit-ink placeholder:text-orbit-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          />
          <button
            type="submit"
            disabled={submitResponse.isPending}
            className="self-end rounded-full bg-orbit-ink px-4 py-2 text-sm font-semibold text-orbit-bg transition hover:opacity-90 disabled:opacity-60"
          >
            {submitResponse.isPending ? "Posting..." : "Post answer"}
          </button>
          {submitResponse.isError && (
            <p className="text-xs text-orbit-coral">
              That didn't post. Check your connection and try again.
            </p>
          )}
        </form>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-orbit-ink">Responses</h2>

        {responsesQuery.isLoading && <LoadingSkeleton rows={2} />}

        {!responsesQuery.isLoading && (responsesQuery.data?.length ?? 0) === 0 && (
          <EmptyState
            title="No responses yet"
            message="Be the first to start the conversation."
          />
        )}

        {!responsesQuery.isLoading && (responsesQuery.data?.length ?? 0) > 0 && (
          <ul className="flex flex-col gap-3">
            {(responsesQuery.data ?? []).map((response: ExploreResponse): JSX.Element => {
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
