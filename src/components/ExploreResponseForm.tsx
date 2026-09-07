import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button.js";
import { Input } from "./ui/input.js";
import { Label } from "./ui/label.js";
import { createExploreResponse } from "../api/client.js";
import { CURRENT_USER_ID } from "../lib/mockData.js";
import {
  exploreResponseSchema,
  type ExploreResponseFormValues,
} from "../schemas/exploreResponseSchema.js";
import type { NewExploreResponseApi } from "../types/index.js";

export interface ExploreResponseFormProps {
  promptId: string;
}

export function ExploreResponseForm({ promptId }: ExploreResponseFormProps): JSX.Element {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ExploreResponseFormValues>({
    resolver: zodResolver(exploreResponseSchema),
    defaultValues: { displayName: "", answer: "", anonymous: false },
  });

  const isAnonymous = watch("anonymous");

  const submitResponse = useMutation({
    mutationFn: (payload: NewExploreResponseApi) => createExploreResponse(payload),
    onSuccess: (): void => {
      reset();
      void queryClient.invalidateQueries({ queryKey: ["responses", promptId] });
    },
  });

  const onSubmit = (values: ExploreResponseFormValues): void => {
    submitResponse.mutate({
      promptId,
      userId: CURRENT_USER_ID,
      body: values.answer,
      createdAt: new Date().toISOString(),
      signalCount: 0,
      ...(values.anonymous ? {} : { authorName: values.displayName.trim() }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {!isAnonymous && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="response-display-name">Display name</Label>
          <Input
            id="response-display-name"
            placeholder="How should we credit you?"
            {...register("displayName")}
          />
          <p className="min-h-[1rem] text-xs text-destructive">
            {errors.displayName?.message ?? ""}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="response-answer">Your answer</Label>
        <textarea
          id="response-answer"
          rows={3}
          placeholder="What's your take?"
          aria-invalid={errors.answer !== undefined}
          className="rounded-2xl border border-orbit-border bg-orbit-surface px-4 py-3 text-sm text-orbit-ink placeholder:text-orbit-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          {...register("answer")}
        />
        <p className="min-h-[1rem] text-xs text-destructive">
          {errors.answer?.message ?? ""}
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm text-orbit-muted">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-orbit-border"
          {...register("anonymous")}
        />
        Post anonymously
      </label>

      <Button type="submit" disabled={submitResponse.isPending} className="self-end">
        {submitResponse.isPending ? "Posting..." : "Post answer"}
      </Button>

      {submitResponse.isError && (
        <p className="text-xs text-destructive">
          That didn't post. Check your connection and try again.
        </p>
      )}
    </form>
  );
}
