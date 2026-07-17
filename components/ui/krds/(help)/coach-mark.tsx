"use client"

import * as React from "react"
import { Button } from "@/components/ui/dynamic/button"
import { cn } from "@/lib/cn"

export type CoachMarkProps = {
  title?: string
  description?: string
  currentStep?: number
  totalSteps?: number
  onSkip?: () => void
  onPrevious?: () => void
  onNext?: () => void
  isVisible?: boolean
  className?: string
  children?: React.ReactNode
}

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
  if (!isVisible) return null

  return (
    <div data-slot="krds-coach-mark-root" className="relative w-full">
      <div
        data-slot="krds-coach-mark"
        className={cn(
          // KRDS .txt-box padding = pc-padding-card-large 40px / mobile 24px (_coach_mark.scss:12-13,36,139)
          "border-krds-border-primary bg-krds-surface relative rounded-[12px] border p-10 max-md:p-6",
          // KRDS --krds-coach-mark--color-outline: color-border-primary-light = primary-10 in light mode
          // (_coach_mark.scss:20,44). No mode-aware semantic token exists for this in krds.css, so the
          // numeric primitive is the closest available match.
          "outline-krds-primary-10 outline outline-[10px]",
          className
        )}
      >
        <div
          data-slot="krds-coach-balloon"
          className={cn(
            "absolute top-0 right-0 z-[5] flex w-[360px] flex-col",
            "border-krds-border-primary bg-krds-surface rounded-[12px] border-2 p-6",
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
              "border-krds-border-primary border-2 border-t-transparent border-l-transparent",
              "bg-krds-surface"
            )}
          />

          <h5 className="sr-only">따라하기 가이드</h5>

          <div className="flex flex-col gap-2">
            <h6 className="text-krds-body-xs text-krds-foreground-subtle font-normal">{title}</h6>
            <p className="text-krds-body-md text-krds-foreground font-normal">{description}</p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="text-krds-body-md text-krds-foreground flex items-center gap-1">
              <span className="sr-only">현재 단계</span>
              <strong className="font-normal">{currentStep}</strong>
              <span aria-hidden="true">/</span>
              <span className="sr-only">총 단계</span>
              <span>{totalSteps}</span>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <Button variant="text" size="sm" onClick={() => onSkip?.()}>
                그만보기
              </Button>
              {/* '이전으로': KRDS coach_mark.html 원본은 그만보기+다음으로만 제공한다.
                  다단계 흐름에서 뒤로 이동을 지원하는 이 프로젝트의 확장이다. */}
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
  )
}

export { CoachMark }
