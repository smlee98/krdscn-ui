// rsc:client
"use client";

import * as React from "react";
import { InfoIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

// ─── ContextualHelp ───────────────────────────────────────────────────────────

function ContextualHelp({
  content,
  title,
  open,
  defaultOpen,
  onOpenChange,
  triggerIcon,
  triggerLabel = "도움말",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  /** Help body rendered inside the popover panel. */
  content: React.ReactNode;
  /** Optional heading rendered above the body. */
  title?: string;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Override trigger icon (defaults to InfoIcon). */
  triggerIcon?: React.ReactNode;
  /** Accessible label for the trigger button (default: "도움말"). */
  triggerLabel?: string;
}) {
  return (
    <Popover open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="krds-contextual-help"
          aria-label={triggerLabel}
          className={cn(
            "inline-flex size-5 items-center justify-center rounded-full",
            "text-krds-gray-50 transition-colors",
            "hover:text-krds-primary-50",
            "focus-visible:ring-2 focus-visible:outline-none",
            "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2",
            className
          )}
          {...props}
        >
          {triggerIcon ?? <InfoIcon className="size-4" aria-hidden="true" />}
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-64 rounded-lg border p-4", "bg-krds-gray-0 border-krds-gray-20 shadow-md")}>
        {title && <p className="text-krds-gray-90 mb-2 text-sm leading-snug font-semibold">{title}</p>}
        <div className="text-krds-gray-70 text-sm leading-relaxed">{content}</div>
      </PopoverContent>
    </Popover>
  );
}

export { ContextualHelp };
