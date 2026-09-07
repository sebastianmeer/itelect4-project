import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell.js";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Label } from "@/components/ui/label.js";
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <Button type="submit">Get Started</Button>
        </form>
      </div>
    </MobileShell>
  );
}
