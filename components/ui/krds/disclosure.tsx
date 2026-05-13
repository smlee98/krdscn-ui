"use client";

import { type ComponentPropsWithRef, type ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type DisclosureProps = {
  buttonText: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  className?: string;
} & Omit<ComponentPropsWithRef<"div">, "children" | "className" | "onToggle">;

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

function Disclosure({
  buttonText,
  children,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onToggle,
  className,
  ...rest
}: DisclosureProps) {
  const isControlled = controlledExpanded !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultExpanded);
  const open = isControlled ? controlledExpanded : internalOpen;

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  }

  return (
    <Collapsible open={open} onOpenChange={handleOpenChange} asChild>
      <div className={cn("flex flex-col gap-4", className)} {...rest}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="text-krds-gray-90 inline-flex cursor-pointer items-center gap-2 text-base leading-none font-medium select-none"
          >
            <CircledArrowIcon open={open} />
            <span>{buttonText}</span>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(
            "overflow-hidden",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
        >
          <div className="bg-krds-gray-5 mt-1 rounded-md p-4">{children}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export type { DisclosureProps };
export { Disclosure };
