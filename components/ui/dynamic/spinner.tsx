"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import { Spinner as KrdsSpinner, type KrdsSpinnerProps } from "@/components/ui/krds/(feedback)/spinner";

export type SpinnerProps = KrdsSpinnerProps;

const SHADCN_SIZE: Record<NonNullable<KrdsSpinnerProps["size"]>, string> = {
  small: "size-5",
  medium: "size-8",
  large: "size-12"
};

function Spinner({ size = "large", label, children, className, ...props }: SpinnerProps) {
  const system = useUISystem();

  if (system === "shadcn") {
    if (process.env.NODE_ENV !== "production") {
      if (label) console.warn('[krds-dispatcher:spinner] prop="label" has no shadcn equivalent — silently dropped');
      if (children)
        console.warn(
          '[krds-dispatcher:spinner] prop="children" (form-spinner) has no shadcn equivalent — silently dropped'
        );
    }
    return (
      <Loader2
        role="status"
        aria-label="로딩 중"
        className={cn("text-muted-foreground animate-spin", SHADCN_SIZE[size ?? "large"], className)}
      />
    );
  }

  return (
    <KrdsSpinner size={size} label={label} className={className} {...props}>
      {children}
    </KrdsSpinner>
  );
}

export { Spinner };
