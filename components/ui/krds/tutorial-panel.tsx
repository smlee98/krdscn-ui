// rsc:client
"use client";

/**
 * KRDS TutorialPanel — step-by-step tutorial drawer from the right.
 * Base: @/components/ui/sheet (shadcn Sheet → Radix Dialog).
 *
 * Distinguishing feature vs HelpPanel (per T5 DOM probe, 2026-05-13):
 * TutorialPanel has a stepped interface with role="tablist" step-dot tabs
 * and Prev/Next navigation controls for multi-step tutorials.
 * HelpPanel is a simple static content panel (title + body + optional links).
 * Both use Sheet as the base but render entirely different content structures.
 */

import { useState } from "react";
import { XIcon } from "lucide-react";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";

interface TutorialPanelStep {
  title: string;
  content: React.ReactNode;
}

interface TutorialPanelProps {
  steps: TutorialPanelStep[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger element that opens the panel. Renders a default button if omitted. */
  trigger?: React.ReactNode;
  className?: string;
}

function TutorialPanel({ steps, open, defaultOpen, onOpenChange, trigger, className }: TutorialPanelProps) {
  const [step, setStep] = useState(0);

  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const current = steps[step];

  function handleOpenChange(next: boolean) {
    if (!next) setStep(0); // reset step on close
    onOpenChange?.(next);
  }

  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
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
        className={cn("flex w-80 flex-col gap-0 p-0", "border-krds-gray-20 bg-krds-gray-0 border-l", className)}
      >
        {/* Header — mirrors HelpPanel layout */}
        <SheetHeader className="border-krds-gray-20 flex-row items-center justify-between border-b px-5 py-4">
          <SheetTitle className="text-krds-gray-90 text-base font-semibold">{current?.title ?? "튜토리얼"}</SheetTitle>
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

        {/* Step progress dots — distinguishing element (role="tablist" per T5 probe) */}
        {steps.length > 1 && (
          <div
            role="tablist"
            aria-label="튜토리얼 단계"
            className="border-krds-gray-10 flex items-center justify-center gap-1.5 border-b px-5 py-3"
          >
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === step}
                aria-controls={`tutorial-step-${idx}`}
                onClick={() => setStep(idx)}
                aria-label={`${idx + 1}단계`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  idx === step ? "bg-krds-primary-50 w-4" : "bg-krds-gray-20 hover:bg-krds-gray-40 w-1.5"
                )}
              />
            ))}
          </div>
        )}

        {/* Step body */}
        <div id={`tutorial-step-${step}`} role="tabpanel" className="flex-1 overflow-y-auto px-5 py-4">
          <div className="text-krds-gray-90 text-sm leading-relaxed">{current?.content}</div>
        </div>

        {/* Footer Prev / Next navigation */}
        <div className="border-krds-gray-20 flex items-center justify-between border-t px-5 py-3">
          <span className="text-krds-gray-50 text-xs">
            {step + 1} / {steps.length}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={isFirst}
              className={cn(
                "border-krds-gray-20 inline-flex h-7 items-center rounded border px-3",
                "text-krds-gray-70 text-xs font-medium",
                "hover:bg-krds-gray-10",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none"
              )}
            >
              이전
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              disabled={isLast}
              className={cn(
                "bg-krds-primary-50 inline-flex h-7 items-center rounded px-3",
                "text-xs font-medium text-white",
                "hover:bg-krds-primary-70",
                "disabled:cursor-not-allowed disabled:opacity-40",
                "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none"
              )}
            >
              다음
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export type { TutorialPanelProps, TutorialPanelStep };
export { TutorialPanel };
