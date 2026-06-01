// rsc:client
"use client";

import * as React from "react";
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/dynamic/button";
import { cn } from "@/lib/cn";

// ─── Group context ────────────────────────────────────────────────────────────

type SideNavigationGroupCtx = { open: boolean; toggle: () => void };
const SideNavigationGroupContext = React.createContext<SideNavigationGroupCtx | null>(null);

// ─── SideNavigation (root) ────────────────────────────────────────────────────

type SideNavigationProps = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function SideNavigation({ className, children, "aria-label": ariaLabel = "사이드 내비게이션" }: SideNavigationProps) {
  return (
    <nav data-slot="krds-side-navigation" aria-label={ariaLabel} className={cn("flex w-[248px] flex-col", className)}>
      {children}
    </nav>
  );
}

// ─── SideNavigationTitle (1Depth header for 2-depth layout) ───────────────────

type SideNavigationTitleProps = {
  className?: string;
  children?: React.ReactNode;
};

function SideNavigationTitle({ className, children }: SideNavigationTitleProps) {
  return (
    <div
      data-slot="krds-side-navigation-title"
      className={cn("flex w-full items-center border-b border-krds-border px-2 pt-6 pb-4", className)}
    >
      <span className="text-krds-gray-90 flex-1 text-krds-heading-md font-bold">{children}</span>
    </div>
  );
}

// ─── SideNavigationBackTitle (3Depth header) ──────────────────────────────────

type SideNavigationBackTitleProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  onBack?: () => void;
  backLabel?: string;
};

function SideNavigationBackTitle({
  className,
  children,
  href,
  onBack,
  backLabel = "뒤로 가기"
}: SideNavigationBackTitleProps) {
  const baseClass = cn(
    "flex w-full flex-col items-start gap-1 rounded-lg p-2",
    "text-left text-krds-gray-90",
    "hover:bg-krds-gray-5",
    "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
    className
  );
  const content = (
    <>
      <ArrowLeft size={24} aria-hidden="true" />
      <span className="text-krds-body-lg font-bold">{children}</span>
    </>
  );
  if (href) {
    return (
      <a data-slot="krds-side-navigation-back-title" href={href} aria-label={backLabel} className={baseClass}>
        {content}
      </a>
    );
  }
  return (
    <Button
      data-slot="krds-side-navigation-back-title"
      variant="text"
      size="sm"
      type="button"
      onClick={onBack}
      aria-label={backLabel}
      className={cn("flex h-auto w-full flex-col items-start gap-1 rounded-lg p-2 text-left", className)}
    >
      {content}
    </Button>
  );
}

// ─── SideNavigationGroup (collapsible 2-depth group) ──────────────────────────

type SideNavigationGroupProps = {
  className?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function SideNavigationGroup({
  className,
  children,
  defaultOpen,
  open: controlledOpen,
  onOpenChange
}: SideNavigationGroupProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const toggle = React.useCallback(() => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [open, isControlled, onOpenChange]);

  return (
    <SideNavigationGroupContext.Provider value={{ open, toggle }}>
      <div
        data-slot="krds-side-navigation-group"
        data-state={open ? "open" : "closed"}
        className={cn("border-krds-gray-20 flex w-full flex-col border-b", className)}
      >
        {children}
      </div>
    </SideNavigationGroupContext.Provider>
  );
}

// ─── SideNavigationTrigger (2Depth row header) ────────────────────────────────

type SideNavigationTriggerProps = {
  className?: string;
  children?: React.ReactNode;
};

function SideNavigationTrigger({ className, children }: SideNavigationTriggerProps) {
  const ctx = React.useContext(SideNavigationGroupContext);
  const Icon = ctx?.open ? ChevronUp : ChevronDown;
  return (
    <button
      type="button"
      data-slot="krds-side-navigation-trigger"
      aria-expanded={ctx?.open ?? false}
      onClick={ctx?.toggle}
      className={cn(
        "flex w-full items-center gap-2 px-2 py-4",
        "text-krds-gray-90 text-left text-krds-body-md font-bold",
        "hover:bg-krds-gray-5",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <span className="flex-1">{children}</span>
      <Icon size={20} aria-hidden="true" />
    </button>
  );
}

// ─── SideNavigationList (open list of last-depth items) ───────────────────────

type SideNavigationListProps = {
  className?: string;
  children?: React.ReactNode;
  bordered?: boolean;
};

function SideNavigationList({ className, children, bordered }: SideNavigationListProps) {
  const ctx = React.useContext(SideNavigationGroupContext);
  if (ctx && !ctx.open) return null;
  return (
    <ul
      data-slot="krds-side-navigation-list"
      className={cn("flex w-full flex-col", ctx && "py-2", bordered && "border-krds-gray-30 border-y py-4", className)}
    >
      {children}
    </ul>
  );
}

// ─── SideNavigationItem (Last depth bulleted link) ────────────────────────────

type SideNavigationItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  external?: boolean;
  active?: boolean;
};

function SideNavigationItem({ className, children, href, external, active }: SideNavigationItemProps) {
  return (
    <li className="w-full">
      <a
        data-slot="krds-side-navigation-item"
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-1 rounded-md px-4 py-2",
          "text-krds-gray-90 text-krds-body-md",
          "hover:bg-krds-gray-5",
          "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
          active && "font-bold",
          className
        )}
      >
        <span className="flex items-center pr-2">
          <span aria-hidden="true" className="bg-krds-gray-90 inline-block size-1 rounded-full" />
        </span>
        <span className="flex-1">{children}</span>
        {external && <ExternalLink size={20} aria-hidden="true" />}
      </a>
    </li>
  );
}

export {
  SideNavigation,
  SideNavigationTitle,
  SideNavigationBackTitle,
  SideNavigationGroup,
  SideNavigationTrigger,
  SideNavigationList,
  SideNavigationItem
};
