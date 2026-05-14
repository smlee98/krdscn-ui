// rsc:client
"use client";

/**
 * KRDS HelpPanel — slide-in help drawer from the right.
 * Base: @/components/ui/sheet (shadcn Sheet → Radix Dialog).
 *
 * Composition API:
 *   <HelpPanel trigger={...} open={open} onOpenChange={setOpen}>
 *     <HelpPanelTitle>도움말</HelpPanelTitle>
 *     <HelpPanelDescription>본문 내용</HelpPanelDescription>
 *     <HelpPanelLinks>
 *       <HelpPanelLink href="#">자주 묻는 질문</HelpPanelLink>
 *     </HelpPanelLinks>
 *   </HelpPanel>
 */

import * as React from "react";
import { XIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

type HelpPanelContextValue = {
  setTitle: (node: React.ReactNode) => void;
};
const HelpPanelContext = React.createContext<HelpPanelContextValue | null>(null);

// ─── HelpPanel ────────────────────────────────────────────────────────────────

function HelpPanel({
  trigger,
  open,
  defaultOpen,
  onOpenChange,
  className,
  children,
}: {
  trigger?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const [titleNode, setTitleNode] = React.useState<React.ReactNode>(null);

  return (
    <HelpPanelContext.Provider value={{ setTitle: setTitleNode }}>
      <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
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
          data-slot="krds-help-panel"
          side="right"
          showCloseButton={false}
          className={cn("flex w-80 flex-col gap-0 p-0", "bg-krds-gray-0 border-krds-gray-20 border-l", className)}
        >
          {/* Header — title hoisted from HelpPanelTitle via context */}
          <SheetHeader className="border-krds-gray-20 flex-row items-center justify-between border-b px-5 py-4">
            <SheetTitle className="text-krds-gray-90 text-base font-semibold">{titleNode}</SheetTitle>
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

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        </SheetContent>
      </Sheet>
    </HelpPanelContext.Provider>
  );
}

// ─── HelpPanelTitle ───────────────────────────────────────────────────────────
// Renders null — hoists its content into SheetTitle via context.

function HelpPanelTitle({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(HelpPanelContext);
  React.useEffect(() => {
    ctx?.setTitle(children);
    return () => ctx?.setTitle(null);
  }, [children, ctx]);
  return null;
}

// ─── HelpPanelDescription ─────────────────────────────────────────────────────

function HelpPanelDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-help-panel-description"
      className={cn("text-krds-gray-90 text-sm leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── HelpPanelLinks ───────────────────────────────────────────────────────────

function HelpPanelLinks({
  className,
  children,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="krds-help-panel-links"
      className={cn("mt-4 flex flex-col gap-1", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

// ─── HelpPanelLink ────────────────────────────────────────────────────────────

function HelpPanelLink({
  className,
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <li>
      <a
        data-slot="krds-help-panel-link"
        className={cn(
          "inline-flex items-center gap-1 text-sm",
          "text-krds-primary-50 hover:text-krds-primary-90 underline",
          className
        )}
        {...props}
      >
        {children}
      </a>
    </li>
  );
}

export {
  HelpPanel,
  HelpPanelTitle,
  HelpPanelDescription,
  HelpPanelLinks,
  HelpPanelLink,
};
