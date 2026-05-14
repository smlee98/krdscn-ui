// rsc:client
"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Group context ─────────────────────────────────────────────────────────────

type SideNavigationGroupCtx = { open: boolean; setOpen: (v: boolean) => void };
const SideNavigationGroupContext = React.createContext<SideNavigationGroupCtx | null>(null);

// ─── Root ──────────────────────────────────────────────────────────────────────

function SideNavigation({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="krds-side-navigation"
      role="navigation"
      aria-label="사이드 내비게이션"
      className={cn("flex w-56 flex-col gap-0.5", className)}
      {...props}
    />
  );
}

// ─── Group ─────────────────────────────────────────────────────────────────────

function SideNavigationGroup({
  className,
  defaultOpen = true,
  children,
  ...props
}: React.ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SideNavigationGroupContext.Provider value={{ open, setOpen }}>
      <div
        data-slot="krds-side-navigation-group"
        className={cn("flex flex-col gap-0.5", className)}
        {...props}
      >
        {children}
      </div>
    </SideNavigationGroupContext.Provider>
  );
}

// ─── GroupLabel ────────────────────────────────────────────────────────────────

function SideNavigationGroupLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const ctx = React.useContext(SideNavigationGroupContext);

  if (ctx) {
    return (
      <button
        type="button"
        data-slot="krds-side-navigation-group-label"
        aria-expanded={ctx.open}
        onClick={() => ctx.setOpen(!ctx.open)}
        className={cn(
          "flex w-full items-center justify-between rounded-sm px-3 py-2",
          "text-sm font-medium transition-colors select-none",
          "text-krds-gray-90 hover:bg-krds-gray-10",
          "focus:ring-krds-primary-50 focus:ring-2 focus:outline-none",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronRightIcon
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            ctx.open && "rotate-90"
          )}
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <p
      data-slot="krds-side-navigation-group-label"
      className={cn(
        "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-krds-gray-50",
        className
      )}
    >
      {children}
    </p>
  );
}

// ─── Item ──────────────────────────────────────────────────────────────────────

function SideNavigationItem({
  className,
  active,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean }) {
  const ctx = React.useContext(SideNavigationGroupContext);

  // Inside a collapsed group → hide
  if (ctx && !ctx.open) return null;

  // Inside an open group → indent
  const isNested = ctx !== null;

  return (
    <a
      data-slot="krds-side-navigation-item"
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={cn(
        "block rounded-sm px-3 py-2 text-sm transition-colors select-none",
        "text-krds-gray-70 hover:bg-krds-gray-10 hover:text-krds-gray-90",
        active && "bg-krds-primary-10 text-krds-primary-50 font-medium",
        isNested && "ml-3 border-l border-krds-gray-20 pl-2 rounded-l-none",
        className
      )}
      {...props}
    />
  );
}

export {
  SideNavigation,
  SideNavigationGroup,
  SideNavigationGroupLabel,
  SideNavigationItem,
};
