import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router";
import { MobileShell } from "../components/MobileShell.js";
import { OrbitMark } from "../components/OrbitMark.js";
import { CompassIcon, HeartIcon } from "../components/icons.js";
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
      <div className="orbit-scroll relative flex flex-1 flex-col overflow-y-auto bg-gradient-to-b from-[#1c2116] via-[#12150d] to-[#0b0d07]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orbit-amber/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-40 -right-16 h-56 w-56 rounded-full bg-orbit-blue/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-10 pt-16 text-center">
          <OrbitMark className="h-16 w-16 text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.25)]" />
          <h1 className="text-3xl font-bold tracking-tight text-white">Orbit</h1>
          <p className="text-sm tracking-wide text-white/60">More than a swipe.</p>
        </div>

        <div className="relative z-10 flex flex-col gap-5 rounded-t-[2rem] bg-orbit-bg px-6 pb-10 pt-7 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-orbit-ink">Real connections live here.</h2>
            <p className="text-sm text-orbit-muted">
              Explore. Talk. Discover. And when the timing feels right, go beyond.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="orbit-card flex items-center gap-3 rounded-2xl p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orbit-bg text-orbit-ink">
                <CompassIcon className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-orbit-ink">Explore</p>
                <p className="text-xs text-orbit-muted">Join conversations, rooms, and communities.</p>
              </div>
            </div>
            <div className="orbit-card flex items-center gap-3 rounded-2xl p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orbit-bg text-orbit-ink">
                <HeartIcon className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-orbit-ink">Discover</p>
                <p className="text-xs text-orbit-muted">Traditional dating, when you're ready.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-1">
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

            <Button type="submit" className="mt-1 h-12">
              Get Started
            </Button>
          </form>
        </div>
      </div>
    </MobileShell>
  );
}
