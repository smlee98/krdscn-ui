"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

// ─── Context ───────────────────────────────────────────────────────────────────

type StepIndicatorCtx = { currentStep: number; totalSteps: number; type: "full" | "fixed" };
const Ctx = React.createContext<StepIndicatorCtx>({ currentStep: 1, totalSteps: 0, type: "full" });

// ─── Root ──────────────────────────────────────────────────────────────────────

function StepIndicator({
  className,
  currentStep = 1,
  pageTitle,
  type = "full",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  currentStep?: number;
  pageTitle?: string;
  type?: "full" | "fixed";
}) {
  const totalSteps = React.Children.count(children);
  return (
    <Ctx.Provider value={{ currentStep, totalSteps, type }}>
      <div data-slot="krds-step-indicator" className={cn("", className)} {...props}>
        {pageTitle && (
          <p className="text-krds-gray-90 mb-3 text-sm font-medium">{pageTitle}</p>
        )}
        <ol
          className={cn("flex items-start", type === "full" ? "w-full" : "")}
          aria-label={pageTitle ?? "단계 표시"}
        >
          {children}
        </ol>
      </div>
    </Ctx.Provider>
  );
}

// ─── Item ──────────────────────────────────────────────────────────────────────

function StepIndicatorItem({
  className,
  step,
  children,
  ...props
}: React.ComponentProps<"li"> & { step: number }) {
  const { currentStep, totalSteps, type } = React.useContext(Ctx);
  const isDone = step < currentStep;
  const isActive = step === currentStep;
  const isLast = step === totalSteps;
  const lineActive = isDone;

  return (
    <li
      data-slot="krds-step-indicator-item"
      className={cn(
        "flex flex-col items-start gap-2",
        type === "full" ? "flex-1 min-w-0" : "w-[120px] shrink-0",
        className
      )}
      aria-current={isActive ? "step" : undefined}
      {...props}
    >
      {/* circle + connector row */}
      <div className="flex w-full items-center">
        {/* circle */}
        {isDone ? (
          <div className="bg-krds-primary-50 flex size-5 shrink-0 items-center justify-center rounded-full">
            <svg
              aria-hidden="true"
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : isActive ? (
          <div className="bg-krds-primary-50 flex size-5 shrink-0 items-center justify-center rounded-full">
            <div className="bg-krds-primary-50 size-[14px] rounded-full border-[1.6px] border-white" />
          </div>
        ) : (
          <div className="bg-krds-gray-10 border-krds-gray-30 size-5 shrink-0 rounded-full border" />
        )}
        {/* connector (skip on last item) */}
        {!isLast && (
          <div className={cn("h-px flex-1", lineActive ? "bg-krds-primary-50" : "bg-krds-gray-20")} />
        )}
      </div>
      {/* title block */}
      <div className="flex flex-col gap-0.5 pr-6 leading-[1.5] w-full">
        <span className="text-krds-gray-70 text-[0.8125rem]">{`${step}단계`}</span>
        <span className="text-krds-gray-90 text-[0.9375rem] font-bold">{children}</span>
      </div>
    </li>
  );
}

export { StepIndicator, StepIndicatorItem };
