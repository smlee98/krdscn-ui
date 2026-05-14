"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// ─── Types ───────────────────────────────────────────────────────────────────

type DisclosureProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DisclosureTriggerProps = React.ComponentProps<"button">;

type DisclosureContentProps = React.ComponentProps<"div">;

// ─── Context ─────────────────────────────────────────────────────────────────

type DisclosureContextValue = { open: boolean };

const DisclosureContext = React.createContext<DisclosureContextValue>({ open: false });

// ─── Icon ─────────────────────────────────────────────────────────────────────

function CircledArrowIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("size-5 shrink-0 transition-transform duration-200", open && "rotate-90")}
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Disclosure (Root) ────────────────────────────────────────────────────────

function Disclosure({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
  ...props
}: DisclosureProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = isControlled ? controlledOpen! : internalOpen;

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <DisclosureContext.Provider value={{ open }}>
      <Collapsible open={open} onOpenChange={handleOpenChange} asChild>
        <div
          data-slot="krds-disclosure"
          className={cn("flex flex-col gap-4", className)}
          {...props}
        >
          {children}
        </div>
      </Collapsible>
    </DisclosureContext.Provider>
  );
}

// ─── DisclosureTrigger ────────────────────────────────────────────────────────

function DisclosureTrigger({ className, children, ...props }: DisclosureTriggerProps) {
  const { open } = React.useContext(DisclosureContext);
  return (
    <CollapsibleTrigger asChild>
      <button
        type="button"
        data-slot="krds-disclosure-trigger"
        className={cn(
          "text-krds-gray-90 inline-flex cursor-pointer items-center gap-2 text-base leading-none font-medium select-none",
          className
        )}
        {...props}
      >
        <CircledArrowIcon open={open} />
        <span>{children}</span>
      </button>
    </CollapsibleTrigger>
  );
}

// ─── DisclosureContent ────────────────────────────────────────────────────────

function DisclosureContent({ className, children, ...props }: DisclosureContentProps) {
  return (
    <CollapsibleContent
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
      )}
    >
      <div
        data-slot="krds-disclosure-content"
        className={cn("bg-krds-gray-5 mt-1 rounded-md p-4", className)}
        {...props}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}

export { Disclosure, DisclosureTrigger, DisclosureContent };
export type { DisclosureProps, DisclosureTriggerProps, DisclosureContentProps };
