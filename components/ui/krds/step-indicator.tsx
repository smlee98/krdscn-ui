"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

// ─── Context ───────────────────────────────────────────────────────────────────

type StepIndicatorCtx = { currentStep: number; totalSteps: number };
const StepIndicatorContext = React.createContext<StepIndicatorCtx>({
  currentStep: 1,
  totalSteps: 0,
});

// ─── Root ──────────────────────────────────────────────────────────────────────

function StepIndicator({
  className,
  currentStep = 1,
  pageTitle,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  currentStep?: number;
  pageTitle?: string;
}) {
  const totalSteps = React.Children.count(children);

  return (
    <StepIndicatorContext.Provider value={{ currentStep, totalSteps }}>
      <div data-slot="krds-step-indicator" className={cn("", className)} {...props}>
        {pageTitle && <p className="text-krds-gray-90 mb-2 text-sm">{pageTitle}</p>}
        <ol className="flex items-start" aria-label={pageTitle ?? "단계 표시"}>
          {children}
        </ol>
      </div>
    </StepIndicatorContext.Provider>
  );
}

// ─── Item ──────────────────────────────────────────────────────────────────────

function StepIndicatorItem({
  className,
  step,
  children,
  ...props
}: React.ComponentProps<"li"> & { step: number }) {
  const { currentStep, totalSteps } = React.useContext(StepIndicatorContext);
  const isDone = step < currentStep;
  const isActive = step === currentStep;
  const isFirst = step === 1;
  const isLast = step === totalSteps;

  return (
    <li
      data-slot="krds-step-indicator-item"
      className={cn("flex flex-1 flex-col items-center", className)}
      aria-current={isActive ? "step" : undefined}
      {...props}
    >
      {/* connector + circle row */}
      <div className="flex w-full items-center">
        {/* left connector */}
        <div
          className={cn(
            "h-px flex-1",
            isFirst
              ? "bg-transparent"
              : isDone || isActive
                ? "bg-krds-primary-50"
                : "bg-krds-gray-20"
          )}
        />
        {/* circle */}
        <div
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border",
            isDone
              ? "bg-krds-primary-50 border-krds-primary-50"
              : isActive
                ? "bg-krds-primary-50 border-krds-primary-50 ring-krds-primary-5 ring-2 ring-offset-2 ring-offset-white"
                : "bg-krds-gray-0 border-krds-gray-20"
          )}
        >
          {isDone ? (
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
          ) : (
            <span
              className={cn(
                "text-[0.625rem] leading-none",
                isActive ? "text-white" : "text-krds-gray-50"
              )}
            >
              {step}
            </span>
          )}
        </div>
        {/* right connector */}
        <div
          className={cn(
            "h-px flex-1",
            isLast ? "bg-transparent" : isDone ? "bg-krds-primary-50" : "bg-krds-gray-20"
          )}
        />
      </div>
      {/* title */}
      <p
        className={cn(
          "mt-1 px-1 text-center text-xs",
          isActive ? "text-krds-gray-90 font-semibold" : "text-krds-gray-50 font-normal"
        )}
      >
        {children}
      </p>
    </li>
  );
}

export { StepIndicator, StepIndicatorItem };
