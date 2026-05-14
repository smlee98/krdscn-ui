// rsc:client
"use client";

/**
 * KRDS CoachMark — multi-step guided overlay anchored to target elements.
 *
 * Composition API (controlled):
 *   <CoachMark
 *     step={coachStep}          // -1 = hidden; 0+ = active step index
 *     onClose={() => setCoachStep(-1)}
 *     onNext={() => setCoachStep((s) => s + 1)}
 *     onPrev={() => setCoachStep((s) => s - 1)}
 *   >
 *     <CoachMarkStep step={0} target="#el1" placement="bottom">
 *       <p className="font-semibold">제목</p>
 *       <p>설명 내용</p>
 *     </CoachMarkStep>
 *     <CoachMarkStep step={1} target="#el2">...</CoachMarkStep>
 *   </CoachMark>
 *
 * Each CoachMarkStep renders its own Radix Popover portaled to body,
 * positioned via virtualRef pointing to the target selector element.
 */

import * as React from "react";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

type CoachMarkContextValue = {
  step: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const CoachMarkContext = React.createContext<CoachMarkContextValue | null>(null);

// ─── CoachMark ────────────────────────────────────────────────────────────────

function CoachMark({
  step,
  onClose,
  onNext,
  onPrev,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Active step index. Use -1 (or any value < 0) to hide all steps. */
  step: number;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const total = React.Children.count(children);

  return (
    <CoachMarkContext.Provider
      value={{
        step,
        total,
        onClose: onClose ?? (() => undefined),
        onNext: onNext ?? (() => undefined),
        onPrev: onPrev ?? (() => undefined),
      }}
    >
      <div data-slot="krds-coach-mark" className={cn(className)} {...props}>
        {children}
      </div>
    </CoachMarkContext.Provider>
  );
}

// ─── CoachMarkStep ────────────────────────────────────────────────────────────

function CoachMarkStep({
  step: stepIndex,
  target,
  placement = "bottom",
  className,
  children,
}: {
  /** This step's index (matches CoachMark's `step` prop to show). */
  step: number;
  /** CSS selector for the DOM element to anchor the popover to. */
  target?: string;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  children?: React.ReactNode;
}) {
  const ctx = React.useContext(CoachMarkContext);

  // virtualRef for Radix Popover positioning relative to the target DOM element
  const virtualRef = React.useRef<{ getBoundingClientRect: () => DOMRect } | null>(null);

  React.useEffect(() => {
    if (target) {
      virtualRef.current = document.querySelector(target);
    }
  }, [target]);

  const isActive = ctx !== null && ctx.step === stepIndex;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === (ctx?.total ?? 1) - 1;

  return (
    <Popover
      open={isActive}
      onOpenChange={(open) => {
        if (!open) ctx?.onClose();
      }}
    >
      {/* Virtual anchor — no DOM element rendered; used only for positioning */}
      <PopoverAnchor virtualRef={virtualRef as React.RefObject<{ getBoundingClientRect: () => DOMRect }>} />

      <PopoverContent
        data-slot="krds-coach-mark-step"
        side={placement}
        align="start"
        sideOffset={8}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={ctx?.onClose}
        className={cn("border-krds-gray-20 w-72 rounded-md border bg-white p-4 shadow-md", className)}
      >
        {/* Header: step counter + close button */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-krds-gray-50 text-xs">
            {stepIndex + 1} / {ctx?.total ?? 1}
          </span>
          <button
            type="button"
            aria-label="코치마크 닫기"
            onClick={ctx?.onClose}
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
          {Array.from({ length: ctx?.total ?? 1 }, (_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                idx === stepIndex ? "bg-krds-primary-50 w-4" : "bg-krds-gray-20 w-1.5"
              )}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="mb-4 text-sm">{children}</div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-end gap-2">
          {!isFirst && (
            <button
              type="button"
              onClick={ctx?.onPrev}
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
            onClick={isLast ? ctx?.onClose : ctx?.onNext}
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

export { CoachMark, CoachMarkStep };
