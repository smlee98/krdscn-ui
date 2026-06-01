"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/cn";
import { CircleChevronDown } from "lucide-react";
import * as React from "react";

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
        <div data-slot="krds-disclosure" className={cn("flex flex-col gap-1", className)} {...props}>
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
          "inline-flex cursor-pointer items-center gap-1 text-krds-body-md font-normal text-krds-fg-bolder select-none",
          className
        )}
        {...props}
      >
        <CircleChevronDown
          size={20}
          aria-hidden={true}
          className={cn("shrink-0 text-krds-fg transition-transform duration-200", open && "rotate-180")}
        />
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
      <div data-slot="krds-disclosure-content" className={cn("rounded-[12px] bg-krds-surface-subtle p-6", className)} {...props}>
        {children}
      </div>
    </CollapsibleContent>
  );
}

export { Disclosure, DisclosureContent, DisclosureTrigger };
export type { DisclosureContentProps, DisclosureProps, DisclosureTriggerProps };
