"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import {
  StepIndicator as KrdsStepIndicator,
  StepIndicatorItem as KrdsStepIndicatorItem
} from "@/components/ui/krds/(feedback)/step-indicator";

// Dual-render dispatcher. The public surface is the KRDS StepIndicator compound
// (StepIndicator + StepIndicatorItem driven by `currentStep` / `step`). KRDS has
// no shadcn counterpart, so the shadcn branch reproduces the same layout/markup
// with shadcn tokens (primary / border / muted-foreground) instead of the KRDS
// gray/primary-50 palette. The KRDS context is private to the KRDS module, so the
// shadcn branch threads its own context.

type StepIndicatorType = "full" | "fixed";

type StepIndicatorProps = React.ComponentProps<"div"> & {
  currentStep?: number;
  "aria-label"?: string;
  type?: StepIndicatorType;
};

type StepIndicatorItemProps = React.ComponentProps<"li"> & { step: number };

// ─── shadcn-mode context ────────────────────────────────────────────────────────

type ShadcnStepCtx = { currentStep: number; totalSteps: number; type: StepIndicatorType };
const ShadcnStepContext = React.createContext<ShadcnStepCtx>({ currentStep: 1, totalSteps: 0, type: "full" });

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnStepIndicator({
  className,
  currentStep = 1,
  "aria-label": ariaLabel = "단계 표시",
  type = "full",
  children,
  ...props
}: StepIndicatorProps) {
  const totalSteps = React.Children.count(children);
  return (
    <ShadcnStepContext.Provider value={{ currentStep, totalSteps, type }}>
      <div data-slot="shadcn-step-indicator" className={cn("", className)} {...props}>
        <ol className={cn("flex items-start", type === "full" ? "w-full" : "")} aria-label={ariaLabel}>
          {children}
        </ol>
      </div>
    </ShadcnStepContext.Provider>
  );
}

function ShadcnStepIndicatorItem({ className, step, children, ...props }: StepIndicatorItemProps) {
  const { currentStep, totalSteps, type } = React.useContext(ShadcnStepContext);
  const isDone = step < currentStep;
  const isActive = step === currentStep;
  const isLast = step === totalSteps;
  const lineActive = isDone;

  return (
    <li
      data-slot="shadcn-step-indicator-item"
      className={cn(
        "flex flex-col items-start gap-2",
        type === "full" ? "min-w-0 flex-1" : "w-[120px] shrink-0",
        className
      )}
      aria-current={isActive ? "step" : undefined}
      {...props}
    >
      {/* circle + connector row */}
      <div className="flex w-full items-center">
        {isDone ? (
          <div className="bg-primary flex size-5 shrink-0 items-center justify-center rounded-full">
            <CheckIcon className="text-primary-foreground size-3" strokeWidth={2.5} aria-hidden="true" />
          </div>
        ) : isActive ? (
          <div className="bg-primary flex size-5 shrink-0 items-center justify-center rounded-full">
            <div className="bg-primary border-background size-[14px] rounded-full border-[1.6px]" />
          </div>
        ) : (
          <div className="bg-background border-input size-5 shrink-0 rounded-full border" />
        )}
        {/* connector (skip on last item) */}
        {!isLast && <div className={cn("h-px flex-1", lineActive ? "bg-primary" : "bg-border")} />}
      </div>
      {/* title block */}
      <div className="flex w-full flex-col gap-0.5 pr-6 leading-[1.5]">
        <span className="text-muted-foreground text-[0.8125rem]">{`${step}단계`}</span>
        <span className="text-foreground text-[0.9375rem] font-bold">{children}</span>
      </div>
    </li>
  );
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function StepIndicator(props: StepIndicatorProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsStepIndicator {...props} />;
  return <ShadcnStepIndicator {...props} />;
}

export function StepIndicatorItem(props: StepIndicatorItemProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsStepIndicatorItem {...props} />;
  return <ShadcnStepIndicatorItem {...props} />;
}
