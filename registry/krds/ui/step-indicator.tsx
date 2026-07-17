// rsc:client
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Context ───────────────────────────────────────────────────────────────────
// `type="fixed"` (rendering items at a fixed width instead of `flex-1`) is a project
// extension: KRDS compiled CSS (_step_indicator.scss:38, `.krds-step-wrap > li { flex: 1; }`)
// always lays out steps as equal-width flex children, on PC and mobile alike — there is no
// fixed-width variant in the spec. Kept for layouts that need a non-stretching step list.

type StepIndicatorCtx = { currentStep: number; totalSteps: number; type: "full" | "fixed" }
const Ctx = React.createContext<StepIndicatorCtx>({ currentStep: 1, totalSteps: 0, type: "full" })

// ─── Root ──────────────────────────────────────────────────────────────────────

function StepIndicator({
  className,
  currentStep = 1,
  "aria-label": ariaLabel = "단계 표시",
  type = "full",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  currentStep?: number
  "aria-label"?: string
  type?: "full" | "fixed"
}) {
  const totalSteps = React.Children.count(children)
  return (
    <Ctx.Provider value={{ currentStep, totalSteps, type }}>
      <div data-slot="krds-step-indicator" className={cn("", className)} {...props}>
        <ol className={cn("flex items-start", type === "full" ? "w-full" : "")} aria-label={ariaLabel}>
          {children}
        </ol>
      </div>
    </Ctx.Provider>
  )
}

// ─── Item ──────────────────────────────────────────────────────────────────────

function StepIndicatorItem({ className, step, children, ...props }: React.ComponentProps<"li"> & { step: number }) {
  const { currentStep, totalSteps, type } = React.useContext(Ctx)
  const isDone = step < currentStep
  const isActive = step === currentStep
  const isLast = step === totalSteps

  return (
    <li
      data-slot="krds-step-indicator-item"
      className={cn(
        "flex flex-col items-start gap-2",
        type === "full" ? "min-w-0 flex-1" : "w-[120px] shrink-0",
        isLast && "max-md:flex-[0_0_1.25rem]",
        className
      )}
      aria-current={isActive ? "step" : undefined}
      {...props}
    >
      {/* circle + connector row */}
      <div className="flex w-full items-center">
        {/* circle */}
        {isDone ? (
          // KRDS element-gray (#6d7882) is fixed across light/high-contrast — no semantic surface/border token matches both modes, so use the raw numeric utility (same pattern as badge.tsx tertiary variant).
          <div className="bg-krds-gray-50 flex size-5 shrink-0 items-center justify-center rounded-full">
            <svg
              aria-hidden="true"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : isActive ? (
          <div className="border-krds-primary-50 flex size-5 shrink-0 items-center justify-center rounded-full border-[3px] bg-white">
            <div className="bg-krds-primary-50 size-3 rounded-full" />
          </div>
        ) : (
          <div className="bg-krds-surface-subtle border-krds-border-light size-5 shrink-0 rounded-full border" />
        )}
        {/* connector (skip on last item): done -> gray-50, active -> border-light (gray-20), upcoming -> surface-subtle (gray-10) */}
        {!isLast && (
          <div
            className={cn(
              "h-[3px] flex-1",
              isDone ? "bg-krds-gray-50" : isActive ? "bg-krds-border-light" : "bg-krds-surface-subtle"
            )}
          />
        )}
      </div>
      {/* title block */}
      <div className="flex w-full flex-col gap-0.5 pr-8 leading-[1.5] max-md:pr-0">
        <span className="text-krds-foreground-subtle text-[0.8125rem] max-md:sr-only">{`${step}단계`}</span>
        <span className="text-krds-foreground text-[0.9375rem] font-bold max-md:sr-only">{children}</span>
      </div>
    </li>
  )
}

export { StepIndicator, StepIndicatorItem }
