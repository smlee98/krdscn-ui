"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export interface StepItem {
  step: string;
  title: string;
  id?: string;
  aboveLabel?: string;
}

export interface StepIndicatorProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "children"> {
  steps: StepItem[];
  currentStep?: number;
  currentStepText?: string;
  pageTitle?: string;
}

function StepIndicator({ steps, currentStep = 0, currentStepText, pageTitle, className, ...rest }: StepIndicatorProps) {
  return (
    <div>
      {pageTitle && <p className="text-krds-gray-90 mb-2 text-sm">{pageTitle}</p>}
      {currentStepText && (
        <p className="sr-only" aria-live="polite">
          {currentStepText}
        </p>
      )}
      <ol {...rest} className={cn("flex items-start", className)} aria-label={pageTitle ?? "단계 표시"}>
        {steps.map((item, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          const key = item.id ?? `${item.step}-${index}`;

          return (
            <li key={key} className="flex flex-1 flex-col items-center" aria-current={isActive ? "step" : undefined}>
              {item.aboveLabel && <p className="text-krds-gray-50 mb-1 text-center text-xs">{item.aboveLabel}</p>}
              {/* connector + circle row */}
              <div className="flex w-full items-center">
                {/* left connector */}
                <div
                  className={cn(
                    "h-px flex-1",
                    index === 0 ? "bg-transparent" : isDone || isActive ? "bg-krds-primary-50" : "bg-krds-gray-20"
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
                    <span className={cn("text-[0.625rem] leading-none", isActive ? "text-white" : "text-krds-gray-50")}>
                      {item.step}
                    </span>
                  )}
                </div>
                {/* right connector */}
                <div
                  className={cn(
                    "h-px flex-1",
                    index === steps.length - 1 ? "bg-transparent" : isDone ? "bg-krds-primary-50" : "bg-krds-gray-20"
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
                {item.title}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export { StepIndicator };
