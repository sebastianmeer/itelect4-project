import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell.js";
import { useAuthStore } from "../stores/authStore.js";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    login(`mock-token-${Date.now()}`);
    navigate("/explore");
  };

  return (
    <MobileShell>
      <div className="flex flex-1 flex-col justify-center gap-8 px-6 py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <span
            aria-hidden="true"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orbit-ink text-2xl text-orbit-ink"
          >
            ✦
          </span>
          <h1 className="text-2xl font-bold text-orbit-ink">Orbit</h1>
          <p className="text-sm text-orbit-muted">More than a swipe.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-medium text-orbit-ink-soft">
            Email
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="you@example.com"
              className="h-11 rounded-full border border-orbit-border bg-orbit-surface px-4 text-sm text-orbit-ink placeholder:text-orbit-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
            />
          </label>

          <button
            type="submit"
            className="h-11 rounded-full bg-orbit-ink text-sm font-semibold text-orbit-bg transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-ink-soft"
          >
            Get Started
          </button>
        </form>
      </div>
    </MobileShell>
  );
}
