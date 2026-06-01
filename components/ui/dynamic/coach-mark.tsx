"use client";

import { CoachMark as KrdsCoachMark } from "@/components/ui/krds/(help)/coach-mark";
import type { CoachMarkProps } from "@/components/ui/krds/(help)/coach-mark";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

export type { CoachMarkProps } from "@/components/ui/krds/(help)/coach-mark";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS CoachMark API; it renders either the KRDS-chromed
// wrapper or a shadcn-token reconstruction based on <UISystemProvider>.
//
// shadcn has no CoachMark primitive. An earlier attempt mapped it onto Radix
// Popover, but Popover portals the balloon to <body> and floats it via floating-ui:
// that detached the balloon from its target and stacked every example's balloon in
// the viewport center (no spotlight, no tail) — the "부자연스러움" reported.
//
// Instead the shadcn branch mirrors the KRDS *inline* anatomy — a relative root
// that reserves space, a ring-highlighted target box wrapping `children`, and an
// absolutely-positioned balloon (with a downward arrow tail) floating above-right —
// using shadcn tokens (border / popover / primary / ring) instead of hardcoded hex.
// Keeping it inline (not portaled) is what restores the anchored, non-overlapping
// look. isVisible is the render gate; dismissal flows through the nav callbacks.

function ShadcnCoachMark({
  title = "1단계 : 코치 마크",
  description = "1단계 코치 마크 내용입니다.",
  currentStep = 1,
  totalSteps = 4,
  onSkip,
  onPrevious,
  onNext,
  isVisible = true,
  className,
  children
}: CoachMarkProps) {
  if (!isVisible) return null;

  return (
    <div data-slot="shadcn-coach-mark-root" className="relative pt-[300px]">
      <div
        data-slot="shadcn-coach-mark"
        className={cn(
          "relative rounded-xl border bg-background p-6",
          "outline outline-[6px] outline-ring/20",
          className
        )}
      >
        <div
          data-slot="shadcn-coach-balloon"
          className={cn(
            "absolute top-0 right-0 z-[5] flex w-[360px] flex-col",
            "rounded-xl border bg-popover p-6 text-popover-foreground shadow-md",
            "-translate-y-[calc(100%+26px)]"
          )}
        >
          {/* downward arrow tail: a rotated square showing only its bottom+right
              edges, tinted to the balloon border/background so it reads as a tail. */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-full right-6 -mt-2",
              "block h-4 w-4 rotate-45",
              "border border-t-transparent border-l-transparent",
              "bg-popover"
            )}
          />

          <h5 className="sr-only">따라하기 가이드</h5>

          <div className="flex flex-col gap-3">
            <h6 className="text-sm font-bold leading-normal">{title}</h6>
            <p className="text-sm font-normal leading-normal">{description}</p>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm font-bold leading-normal">
              <span className="sr-only">현재 단계</span>
              <strong className="text-primary">{currentStep}</strong>
              <span aria-hidden="true">/</span>
              <span className="sr-only">총 단계</span>
              <span>{totalSteps}</span>
            </div>

            <div className="flex flex-1 items-center justify-end gap-2">
              <ShadcnButton variant="ghost" size="sm" onClick={() => onSkip?.()}>
                그만보기
              </ShadcnButton>
              {currentStep > 1 && (
                <ShadcnButton variant="ghost" size="sm" onClick={() => onPrevious?.()}>
                  이전으로
                </ShadcnButton>
              )}
              <ShadcnButton variant="outline" size="sm" onClick={() => onNext?.()}>
                다음으로
              </ShadcnButton>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export function CoachMark(props: CoachMarkProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCoachMark {...props} />;
  return <ShadcnCoachMark {...props} />;
}
