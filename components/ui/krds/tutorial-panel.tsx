// rsc:client
"use client";

/**
 * KRDS TutorialPanel — step-by-step tutorial drawer from the right.
 * Base: @/components/ui/sheet (shadcn Sheet → Radix Dialog).
 *
 * Composition API:
 *   <TutorialPanel totalSteps={3} trigger={...}>
 *     <TutorialPanelTitle>설정 가이드</TutorialPanelTitle>
 *     <TutorialPanelStep step={0}>
 *       <TutorialPanelStepTitle>1단계: 시작</TutorialPanelStepTitle>
 *       <TutorialPanelStepBody>...</TutorialPanelStepBody>
 *     </TutorialPanelStep>
 *     <TutorialPanelStep step={1}>...</TutorialPanelStep>
 *     <TutorialPanelControls>
 *       <TutorialPanelPrev />
 *       <TutorialPanelNext />
 *     </TutorialPanelControls>
 *   </TutorialPanel>
 */

import * as React from "react";
import { XIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

type TutorialPanelContextValue = {
  currentStep: number;
  totalSteps: number;
  setTitle: (node: React.ReactNode) => void;
  goNext: () => void;
  goPrev: () => void;
  goToStep: (n: number) => void;
};

const TutorialPanelContext = React.createContext<TutorialPanelContextValue | null>(null);

// ─── TutorialPanel ────────────────────────────────────────────────────────────

function TutorialPanel({
  totalSteps = 1,
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
}: {
  totalSteps?: number;
  trigger?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [titleNode, setTitleNode] = React.useState<React.ReactNode>(null);

  function handleOpenChange(next: boolean) {
    if (!next) setCurrentStep(0);
    onOpenChange?.(next);
  }

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, totalSteps - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const goToStep = (n: number) => setCurrentStep(Math.max(0, Math.min(n, totalSteps - 1)));

  return (
    <TutorialPanelContext.Provider value={{ currentStep, totalSteps, setTitle: setTitleNode, goNext, goPrev, goToStep }}>
      <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          {trigger ?? (
            <button
              type="button"
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium",
                "border-krds-gray-20 bg-krds-gray-0 text-krds-gray-90",
                "hover:bg-krds-gray-5",
                "focus-visible:ring-2 focus-visible:outline-none",
                "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2"
              )}
            >
              도움말
            </button>
          )}
        </SheetTrigger>
        <SheetContent
          data-slot="krds-tutorial-panel"
          side="right"
          showCloseButton={false}
          className={cn("flex w-80 flex-col gap-0 p-0", "border-krds-gray-20 bg-krds-gray-0 border-l", className)}
        >
          {/* Header — title hoisted from TutorialPanelTitle via context */}
          <SheetHeader className="border-krds-gray-20 flex-row items-center justify-between border-b px-5 py-4">
            <SheetTitle className="text-krds-gray-90 text-base font-semibold">{titleNode ?? "튜토리얼"}</SheetTitle>
            <SheetClose asChild>
              <button
                type="button"
                aria-label="닫기"
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded",
                  "text-krds-gray-50 hover:text-krds-gray-90",
                  "focus-visible:ring-2 focus-visible:outline-none",
                  "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-1"
                )}
              >
                <XIcon className="size-4" aria-hidden="true" />
              </button>
            </SheetClose>
          </SheetHeader>

          {/* Step progress dots */}
          {totalSteps > 1 && (
            <div
              role="tablist"
              aria-label="튜토리얼 단계"
              className="border-krds-gray-10 flex items-center justify-center gap-1.5 border-b px-5 py-3"
            >
              {Array.from({ length: totalSteps }, (_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentStep}
                  onClick={() => goToStep(idx)}
                  aria-label={`${idx + 1}단계`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    idx === currentStep
                      ? "bg-krds-primary-50 w-4"
                      : "bg-krds-gray-20 hover:bg-krds-gray-40 w-1.5"
                  )}
                />
              ))}
            </div>
          )}

          {/* Children: TutorialPanelStep(s) + TutorialPanelControls */}
          {children}
        </SheetContent>
      </Sheet>
    </TutorialPanelContext.Provider>
  );
}

// ─── TutorialPanelTitle ───────────────────────────────────────────────────────
// Renders null — hoists its content into SheetTitle via context.

function TutorialPanelTitle({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(TutorialPanelContext);
  React.useEffect(() => {
    ctx?.setTitle(children);
    return () => ctx?.setTitle(null);
  }, [children, ctx]);
  return null;
}

// ─── TutorialPanelStep ────────────────────────────────────────────────────────
// Only renders its children when step === context.currentStep.

function TutorialPanelStep({
  step,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { step: number }) {
  const ctx = React.useContext(TutorialPanelContext);
  if (!ctx || ctx.currentStep !== step) return null;
  return (
    <div
      data-slot="krds-tutorial-panel-step"
      role="tabpanel"
      aria-label={`${step + 1}단계`}
      className={cn("flex-1 overflow-y-auto px-5 py-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── TutorialPanelStepTitle ───────────────────────────────────────────────────

function TutorialPanelStepTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="krds-tutorial-panel-step-title"
      className={cn("text-krds-gray-90 mb-2 text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </p>
  );
}

// ─── TutorialPanelStepBody ────────────────────────────────────────────────────

function TutorialPanelStepBody({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-tutorial-panel-step-body"
      className={cn("text-krds-gray-90 text-sm leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── TutorialPanelControls ────────────────────────────────────────────────────
// Footer row — renders step counter + children (Prev/Next buttons).

function TutorialPanelControls({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ctx = React.useContext(TutorialPanelContext);
  return (
    <div
      data-slot="krds-tutorial-panel-controls"
      className={cn(
        "border-krds-gray-20 flex items-center justify-between border-t px-5 py-3",
        className
      )}
      {...props}
    >
      <span className="text-krds-gray-50 text-xs">
        {(ctx?.currentStep ?? 0) + 1} / {ctx?.totalSteps ?? 1}
      </span>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

// ─── TutorialPanelPrev ────────────────────────────────────────────────────────

function TutorialPanelPrev({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const ctx = React.useContext(TutorialPanelContext);
  const isFirst = (ctx?.currentStep ?? 0) === 0;
  return (
    <button
      data-slot="krds-tutorial-panel-prev"
      type="button"
      onClick={ctx?.goPrev}
      disabled={isFirst}
      className={cn(
        "border-krds-gray-20 inline-flex h-7 items-center rounded border px-3",
        "text-krds-gray-70 text-xs font-medium",
        "hover:bg-krds-gray-10",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children ?? "이전"}
    </button>
  );
}

// ─── TutorialPanelNext ────────────────────────────────────────────────────────

function TutorialPanelNext({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const ctx = React.useContext(TutorialPanelContext);
  const isLast = (ctx?.currentStep ?? 0) === (ctx?.totalSteps ?? 1) - 1;
  return (
    <button
      data-slot="krds-tutorial-panel-next"
      type="button"
      onClick={ctx?.goNext}
      disabled={isLast}
      className={cn(
        "bg-krds-primary-50 inline-flex h-7 items-center rounded px-3",
        "text-xs font-medium text-white",
        "hover:bg-krds-primary-70",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children ?? "다음"}
    </button>
  );
}

export {
  TutorialPanel,
  TutorialPanelTitle,
  TutorialPanelStep,
  TutorialPanelStepTitle,
  TutorialPanelStepBody,
  TutorialPanelControls,
  TutorialPanelPrev,
  TutorialPanelNext,
};
