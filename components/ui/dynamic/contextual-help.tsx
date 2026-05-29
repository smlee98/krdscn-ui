"use client";

import * as React from "react";
import { HelpCircle } from "lucide-react";
import {
  ContextualHelp as KrdsContextualHelp,
  ContextualHelpLabel as KrdsContextualHelpLabel,
  ContextualHelpTitle as KrdsContextualHelpTitle
} from "@/components/ui/krds/(help)/contextual-help";
import type { ContextualHelpProps } from "@/components/ui/krds/(help)/contextual-help";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

export type { ContextualHelpProps } from "@/components/ui/krds/(help)/contextual-help";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS ContextualHelp single-component API; it renders either
// the KRDS-chromed wrapper or vanilla shadcn Popover anatomy based on <UISystemProvider>.
//
// shadcn-mode mapping: KRDS API → Popover (open/defaultOpen/onOpenChange) +
// PopoverTrigger asChild (question-mark button) + PopoverContent. position → side,
// alignment → align (left→start, right→end, center→center). The KRDS-only chrome
// (custom arrow SVG, alignOffset geometry, manual close button, KRDS color tokens)
// is intentionally dropped — shadcn Popover has no such axes. Open/close behavior and
// the tooltip role are preserved; only the visual chrome switches.

// ─── shadcn-mode root ───────────────────────────────────────────────────────────

function ShadcnContextualHelp({
  children,
  position = "top",
  alignment = "left",
  open,
  defaultOpen,
  onOpenChange,
  className
}: ContextualHelpProps) {
  const align = alignment === "left" ? "start" : alignment === "right" ? "end" : "center";

  return (
    <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <span className={cn("inline-flex items-center gap-2", className)}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="도움말"
            className={cn(
              "ring-offset-background focus-visible:ring-ring inline-flex size-6 items-center justify-center rounded-md",
              "opacity-70 transition-opacity hover:opacity-100",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
            )}
          >
            <span className="sr-only">도움말</span>
            <HelpCircle className="size-5" aria-hidden="true" />
          </button>
        </PopoverTrigger>
      </span>
      <PopoverContent side={position} align={align} role="tooltip" className="flex flex-col gap-2">
        {children}
      </PopoverContent>
    </Popover>
  );
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function ContextualHelp(props: React.ComponentProps<typeof KrdsContextualHelp>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsContextualHelp {...props} />;
  return <ShadcnContextualHelp {...props} />;
}

export function ContextualHelpTitle(props: React.ComponentProps<typeof KrdsContextualHelpTitle>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsContextualHelpTitle {...props} />;
  const { className, children, ...rest } = props;
  return (
    <h4 className={cn("text-foreground text-base leading-normal font-semibold", className)} {...rest}>
      {children}
    </h4>
  );
}

export function ContextualHelpLabel(props: React.ComponentProps<typeof KrdsContextualHelpLabel>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsContextualHelpLabel {...props} />;
  const { className, children, ...rest } = props;
  return (
    <p className={cn("text-muted-foreground text-sm leading-normal", className)} {...rest}>
      {children}
    </p>
  );
}
