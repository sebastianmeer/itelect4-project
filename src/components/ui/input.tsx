import type { InputHTMLAttributes, JSX } from "react";
import { cn } from "../../lib/utils.js";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps): JSX.Element {
  return (
    <input
      type={type}
      className={cn(
        "h-11 w-full rounded-full border border-input bg-card px-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
