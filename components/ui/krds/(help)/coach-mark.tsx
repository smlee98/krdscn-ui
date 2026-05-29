"use client";

import * as React from "react";
import { Button } from "@/components/ui/dynamic/button";
import { cn } from "@/lib/cn";

export type CoachMarkProps = {
  title?: string;
  description?: string;
  currentStep?: number;
  totalSteps?: number;
  onSkip?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isVisible?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function CoachMark({
  title = "1단계 : 코치 마크",
  description = "1단계 코치 마크 내용입니다.",
  currentStep = 1,
  totalSteps = 4,
  onSkip,
  onPrevious,
  onNext,
  isVisible = true,
  className,
  children,
}: CoachMarkProps) {
  if (!isVisible) return null;

  return (
    <div data-slot="krds-coach-mark-root" className="relative pt-[300px]">
      <div
        data-slot="krds-coach-mark"
        className={cn(
          "relative rounded-[12px] border border-[#256ef4] bg-white p-6",
          "outline outline-[10px] outline-[rgba(37,110,244,0.2)]",
          className
        )}
      >
        <div
          data-slot="krds-coach-balloon"
          className={cn(
            "absolute top-0 right-0 z-[5] flex w-[360px] flex-col",
            "rounded-[12px] border-2 border-[#256ef4] bg-white p-6",
            "-translate-y-[calc(100%+26px)]"
          )}
        >
          {/* Arrow: 16x16 rotated 45° square; bottom+right borders visible,
              top+left transparent. After CSS rotate(45deg) with y-axis-down,
              the bottom-right corner becomes the bottom point of the diamond
              and the visible edges form an inverted-V pointing DOWN. */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-full right-6 -mt-2",
              "block h-4 w-4 rotate-45",
              "border-2 border-[#256ef4] border-t-transparent border-l-transparent",
              "bg-white"
            )}
          />

          <h5 className="sr-only">따라하기 가이드</h5>

          <div className="flex flex-col gap-3">
            <h6 className="text-[15px] font-bold leading-[1.5] text-[#1e2124]">{title}</h6>
            <p className="text-[17px] font-normal leading-[1.5] text-[#1e2124]">{description}</p>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <div className="flex items-center gap-1 text-[17px] leading-[1.5] font-bold">
              <span className="sr-only">현재 단계</span>
              <strong className="text-[#0b50d0]">{currentStep}</strong>
              <span aria-hidden="true" className="text-[#1e2124]">/</span>
              <span className="sr-only">총 단계</span>
              <span className="text-[#1e2124]">{totalSteps}</span>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4">
              <Button variant="text" size="sm" onClick={() => onSkip?.()}>
                그만보기
              </Button>
              {currentStep > 1 && (
                <Button variant="text" size="sm" onClick={() => onPrevious?.()}>
                  이전으로
                </Button>
              )}
              <Button variant="tertiary" size="sm" onClick={() => onNext?.()}>
                다음으로
              </Button>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export { CoachMark };
