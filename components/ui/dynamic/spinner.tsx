"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import {
  Spinner as KrdsSpinner,
  spinnerVariants,
  type KrdsSpinnerProps
} from "@/components/ui/krds/(feedback)/spinner";

export type SpinnerProps = KrdsSpinnerProps;

const SHADCN_SIZE: Record<NonNullable<KrdsSpinnerProps["size"]>, string> = {
  small: "size-5",
  medium: "size-8",
  large: "size-12"
};

function Spinner({ size = "large", label, children, className, ...props }: SpinnerProps) {
  const system = useUISystem();

  // Form-spinner composition mode (children present): preserve KRDS layout,
  // swap ONLY the inner spinning element between systems.
  if (children) {
    const inner =
      system === "shadcn" ? (
        <Loader2
          role="status"
          aria-label={label ?? "로딩 중"}
          className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 animate-spin"
        />
      ) : (
        <span
          role="status"
          aria-label={label ?? "로딩 중"}
          className={cn(
            spinnerVariants({ size: "small" }),
            "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
          )}
        />
      );

    return (
      <div data-slot="krds-form-spinner" className="relative inline-flex w-fit items-center">
        {children}
        {inner}
      </div>
    );
  }

  // Standalone mode: pure dispatch
  if (system === "shadcn") {
    if (process.env.NODE_ENV !== "production" && label) {
      console.warn('[krds-dispatcher:spinner] prop="label" has no shadcn equivalent — silently dropped');
    }
    return (
      <Loader2
        role="status"
        aria-label="로딩 중"
        className={cn("text-muted-foreground animate-spin", SHADCN_SIZE[size ?? "large"], className)}
      />
    );
  }

  return <KrdsSpinner size={size} label={label} className={className} {...props} />;
}

export { Spinner };
