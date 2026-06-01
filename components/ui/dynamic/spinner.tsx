"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import { spinnerVariants } from "@/components/ui/krds/(feedback)/spinner";

type SpinnerSize = "small" | "medium" | "large";

export type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
  "aria-label"?: string;
};

const SHADCN_SIZE: Record<SpinnerSize, string> = {
  small: "size-5",
  medium: "size-8",
  large: "size-12"
};

function Spinner({ size = "large", className, "aria-label": ariaLabel }: SpinnerProps) {
  const system = useUISystem();

  if (system === "shadcn") {
    return (
      <Loader2
        role={ariaLabel ? "status" : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        // No color override: inherit currentColor like the vanilla shadcn Spinner
        // primitive (`@/components/ui/spinner` sets no text color), so it renders
        // foreground (near-black) instead of the muted gray it had before.
        className={cn("animate-spin", SHADCN_SIZE[size], className)}
      />
    );
  }

  return (
    <span
      role={ariaLabel ? "status" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={cn(spinnerVariants({ size }), className)}
    />
  );
}

export { Spinner };
