import { useState, type JSX } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button.js";
import { useAuthStore } from "../stores/authStore.js";
import { askAi, type AiReview } from "../api/client.js";

export function CoachPage(): JSX.Element {
  const token = useAuthStore((state) => state.token);
  const [prompt, setPrompt] = useState("");
  const review = useMutation({ mutationFn: (value: string) => token ? askAi(value, token) : Promise.reject(new Error("Authentication required")) });
  const result: AiReview | undefined = review.data;

  return <div className="flex flex-col gap-5 pt-1">
    <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit-muted">Orbit AI</p><h1 className="text-2xl font-bold text-orbit-ink">Conversation Coach</h1><p className="mt-1 text-sm text-orbit-muted">Shape a thoughtful prompt before you send it into the world.</p></div>
    <form className="flex flex-col gap-3" onSubmit={(event) => { event.preventDefault(); review.mutate(prompt.trim()); }}>
      <label htmlFor="coach-prompt" className="text-sm font-semibold text-orbit-ink">What would you like to say?</label>
      <textarea id="coach-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} minLength={20} maxLength={2000} required rows={7} className="orbit-card rounded-2xl px-4 py-3 text-sm text-orbit-ink" placeholder="Describe a conversation opener or response..." />
      <p className="text-xs text-orbit-muted">{prompt.length}/2000 characters</p>
      <Button type="submit" disabled={review.isPending || prompt.trim().length < 20}>{review.isPending ? "Thinking..." : "Coach me"}</Button>
    </form>
    {review.isError && <p role="alert" className="text-sm text-destructive">{review.error.message}</p>}
    {result && <section className="orbit-card flex flex-col gap-4 rounded-2xl p-5"><div><p className="text-xs font-semibold uppercase tracking-widest text-orbit-muted">Readiness</p><p className="text-lg font-bold text-orbit-ink">{result.readiness}</p></div><p className="text-sm text-orbit-ink">{result.summary}</p><div><h2 className="font-semibold text-orbit-ink">What works</h2><ul className="list-disc pl-5 text-sm text-orbit-muted">{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h2 className="font-semibold text-orbit-ink">Try next</h2><ul className="list-disc pl-5 text-sm text-orbit-muted">{result.improvements.map((item) => <li key={item}>{item}</li>)}</ul></div></section>}
  </div>;
}
