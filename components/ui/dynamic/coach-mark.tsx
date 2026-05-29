"use client";

import { CoachMark as KrdsCoachMark } from "@/components/ui/krds/(help)/coach-mark";
import type { CoachMarkProps } from "@/components/ui/krds/(help)/coach-mark";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUISystem } from "@/lib/ui-system";

export type { CoachMarkProps } from "@/components/ui/krds/(help)/coach-mark";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS CoachMark API; it renders either the KRDS-chromed
// wrapper or the vanilla shadcn Popover primitive based on <UISystemProvider>.
//
// shadcn has no CoachMark primitive, so the shadcn branch maps the KRDS API onto
// Popover anatomy:
//   - isVisible          → Popover `open` (KRDS uses isVisible as a render gate)
//   - children           → PopoverTrigger asChild (the element the mark anchors to)
//   - title/description  → PopoverContent heading + body
//   - currentStep/totalSteps + onSkip/onPrevious/onNext → step-nav chrome preserved
//     inside PopoverContent using the vanilla shadcn Button.
//
// KRDS-only chrome that has no Popover equivalent (the outline-ring highlight box,
// the rotated arrow span — Popover renders its own arrow-less floating card) is
// dropped on the shadcn path. The step navigation behavior is fully preserved.
// Because the KRDS API exposes no onOpenChange/onClose, the popover is purely
// controlled by isVisible; dismissal flows through the nav callbacks.

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
  return (
    <Popover open={isVisible}>
      <PopoverTrigger asChild>
        {children ? (
          <span data-slot="coach-mark-anchor">{children}</span>
        ) : (
          <span data-slot="coach-mark-anchor" aria-hidden="true" />
        )}
      </PopoverTrigger>
      <PopoverContent className={className}>
        <div className="flex flex-col gap-3">
          <h6 className="text-sm leading-normal font-bold">{title}</h6>
          <p className="text-sm leading-normal font-normal">{description}</p>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="sr-only">현재 단계</span>
            <strong>{currentStep}</strong>
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
      </PopoverContent>
    </Popover>
  );
}

export function CoachMark(props: CoachMarkProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCoachMark {...props} />;
  return <ShadcnCoachMark {...props} />;
}
