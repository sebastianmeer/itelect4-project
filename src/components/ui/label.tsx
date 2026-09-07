import type { ComponentProps, JSX } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils.js";

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export function Label({ className, ...props }: LabelProps): JSX.Element {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium text-secondary-foreground select-none",
        className,
      )}
      {...props}
    />
  );
}
