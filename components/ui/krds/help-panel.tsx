// rsc:client
"use client";

/**
 * KRDS HelpPanel — slide-in help drawer from the right.
 * Base: @/components/ui/sheet (shadcn Sheet → Radix Dialog).
 *
 * Distinguishing feature vs TutorialPanel (per T5 DOM probe):
 * HelpPanel is a simple static content panel (title + body + optional links).
 * TutorialPanel has a tabbed interface with step progress dots and Prev/Next controls.
 * Both use Sheet as the base but render entirely different content structures.
 */

import * as React from "react";
import { XIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HelpPanelLink {
  label: string;
  href: string;
}

export interface HelpPanelProps {
  /** Panel heading (default: "도움말"). */
  title?: string;
  /** Main body content of the help panel. */
  children: React.ReactNode;
  /** Optional footer links rendered below the body. */
  links?: HelpPanelLink[];
  /** Trigger element that opens the panel. Renders a default button if omitted. */
  trigger?: React.ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called when open state changes. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// ─── HelpPanel ────────────────────────────────────────────────────────────────

function HelpPanel({
  title = "도움말",
  children,
  links,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  className
}: HelpPanelProps) {
  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium",
              "border-krds-gray-20 bg-krds-gray-0 text-krds-gray-90",
              "hover:bg-krds-gray-5",
              "focus-visible:ring-2 focus-visible:outline-none",
              "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2"
            )}
          >
            도움말
          </button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn("flex w-80 flex-col gap-0 p-0", "bg-krds-gray-0 border-krds-gray-20 border-l", className)}
      >
        {/* Header */}
        <SheetHeader className="border-krds-gray-20 flex-row items-center justify-between border-b px-5 py-4">
          <SheetTitle className="text-krds-gray-90 text-base font-semibold">{title}</SheetTitle>
          <SheetClose asChild>
            <button
              type="button"
              aria-label="닫기"
              className={cn(
                "inline-flex size-7 items-center justify-center rounded",
                "text-krds-gray-50 hover:text-krds-gray-90",
                "focus-visible:ring-2 focus-visible:outline-none",
                "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-1"
              )}
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </SheetClose>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="text-krds-gray-90 text-sm leading-relaxed">{children}</div>

          {/* Optional footer links */}
          {links && links.length > 0 && (
            <ul className="mt-4 flex flex-col gap-1">
              {links.map((link, i) => (
                <li key={`${i}-${link.href}`}>
                  <a
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1 text-sm",
                      "text-krds-primary-50 hover:text-krds-primary-90 underline"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { HelpPanel };
