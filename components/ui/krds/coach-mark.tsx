// rsc:client
"use client";

import { useState } from "react";

import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

interface CoachMarkStep {
  title: string;
  description: string;
}

interface CoachMarkProps {
  steps: CoachMarkStep[];
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
  /** The element the coach mark popover anchors to. */
  children: React.ReactNode;
  className?: string;
}

function CoachMark({ steps, open: controlledOpen, defaultOpen = false, onClose, children, className }: CoachMarkProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [step, setStep] = useState(0);

  const open = isControlled ? controlledOpen : internalOpen;

  function handleClose() {
    if (!isControlled) setInternalOpen(false);
    setStep(0);
    onClose?.();
  }

  function handleOpenChange(next: boolean) {
    if (!next) handleClose();
    else if (!isControlled) setInternalOpen(true);
  }

  function handleNext() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      handleClose();
    }
  }

  function handlePrev() {
    if (step > 0) setStep((s) => s - 1);
  }

  const currentStep = steps[step];
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverAnchor asChild>{children}</PopoverAnchor>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        className={cn("border-krds-gray-20 w-72 rounded-md border bg-white p-4 shadow-md", className)}
      >
        {/* Header row: step count + close button */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-krds-gray-50 text-xs">
            {step + 1} / {steps.length}
          </span>
          <button
            type="button"
            aria-label="코치마크 닫기"
            onClick={handleClose}
            className={cn(
              "text-krds-gray-50 rounded-sm p-0.5",
              "hover:text-krds-gray-90",
              "focus:ring-krds-primary-50 focus:ring-2 focus:outline-none"
            )}
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Step dots */}
        <div className="mb-3 flex items-center gap-1">
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                idx === step ? "bg-krds-primary-50 w-4" : "bg-krds-gray-20 w-1.5"
              )}
            />
          ))}
        </div>

        {/* Content */}
        {currentStep && (
          <>
            <p className="text-krds-gray-90 mb-1 text-sm font-semibold">{currentStep.title}</p>
            <p className="text-krds-gray-70 mb-4 text-sm leading-relaxed">{currentStep.description}</p>
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-end gap-2">
          {!isFirst && (
            <button
              type="button"
              onClick={handlePrev}
              className={cn(
                "border-krds-gray-20 rounded-sm border px-3 py-1.5",
                "text-krds-gray-70 text-xs font-medium",
                "hover:bg-krds-gray-10",
                "focus:ring-krds-primary-50 focus:ring-2 focus:outline-none"
              )}
            >
              이전
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className={cn(
              "bg-krds-primary-50 rounded-sm px-3 py-1.5",
              "text-xs font-medium text-white",
              "hover:bg-krds-primary-70",
              "focus:ring-krds-primary-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            )}
          >
            {isLast ? "완료" : "다음"}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export type { CoachMarkStep, CoachMarkProps };
export { CoachMark };
