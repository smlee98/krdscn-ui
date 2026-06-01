"use client";

import * as React from "react";
import * as Krds from "@/components/ui/krds/(navigation)/in-page-navigation";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/main-menu.tsx).
// The public surface is the KRDS InPageNavigation compound API; each exported part
// renders either the KRDS-chromed wrapper or the vanilla shadcn rendering based on
// <UISystemProvider>. All parts are stateless → pure styling swap (no context).
// The KRDS source is rsc:safe, but this file must be "use client" because the
// dispatchers call the useUISystem() hook.

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnInPageNavigation({
  className,
  children,
  "aria-label": ariaLabel = "이 페이지의 구성"
}: React.ComponentProps<typeof Krds.InPageNavigation>) {
  return (
    <nav aria-label={ariaLabel} className={cn("flex w-[160px] flex-col gap-4", className)}>
      {children}
    </nav>
  );
}

function ShadcnInPageNavigationHeader({
  className,
  children
}: React.ComponentProps<typeof Krds.InPageNavigationHeader>) {
  return <div className={cn("flex w-full flex-col gap-1", className)}>{children}</div>;
}

function ShadcnInPageNavigationEyebrow({
  className,
  children
}: React.ComponentProps<typeof Krds.InPageNavigationEyebrow>) {
  return <span className={cn("text-xs text-muted-foreground", className)}>{children}</span>;
}

function ShadcnInPageNavigationTitle({
  className,
  children
}: React.ComponentProps<typeof Krds.InPageNavigationTitle>) {
  return <strong className={cn("text-base font-bold text-foreground", className)}>{children}</strong>;
}

function ShadcnInPageNavigationList({
  className,
  children
}: React.ComponentProps<typeof Krds.InPageNavigationList>) {
  return <ul className={cn("flex w-full flex-col gap-1", className)}>{children}</ul>;
}

function ShadcnInPageNavigationItem({
  className,
  children,
  href,
  active,
  onClick
}: React.ComponentProps<typeof Krds.InPageNavigationItem>) {
  return (
    <li className="w-full">
      <a
        href={href}
        onClick={onClick}
        aria-current={active ? "true" : undefined}
        data-active={active || undefined}
        className={cn(
          "flex w-full items-center rounded-[4px] px-2 py-1 text-sm hover:bg-accent focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
          active ? "bg-accent font-bold text-accent-foreground" : "text-muted-foreground",
          className
        )}
      >
        {children}
      </a>
    </li>
  );
}

function ShadcnInPageNavigationFooter({
  className,
  children
}: React.ComponentProps<typeof Krds.InPageNavigationFooter>) {
  return <div className={cn("flex w-full flex-col items-center gap-2", className)}>{children}</div>;
}

function ShadcnInPageNavigationDescription({
  className,
  children
}: React.ComponentProps<typeof Krds.InPageNavigationDescription>) {
  return <p className={cn("w-full text-center text-sm text-muted-foreground", className)}>{children}</p>;
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function InPageNavigation(props: React.ComponentProps<typeof Krds.InPageNavigation>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigation {...props} />;
  return <ShadcnInPageNavigation {...props} />;
}

export function InPageNavigationHeader(props: React.ComponentProps<typeof Krds.InPageNavigationHeader>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationHeader {...props} />;
  return <ShadcnInPageNavigationHeader {...props} />;
}

export function InPageNavigationEyebrow(props: React.ComponentProps<typeof Krds.InPageNavigationEyebrow>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationEyebrow {...props} />;
  return <ShadcnInPageNavigationEyebrow {...props} />;
}

export function InPageNavigationTitle(props: React.ComponentProps<typeof Krds.InPageNavigationTitle>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationTitle {...props} />;
  return <ShadcnInPageNavigationTitle {...props} />;
}

export function InPageNavigationList(props: React.ComponentProps<typeof Krds.InPageNavigationList>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationList {...props} />;
  return <ShadcnInPageNavigationList {...props} />;
}

export function InPageNavigationItem(props: React.ComponentProps<typeof Krds.InPageNavigationItem>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationItem {...props} />;
  return <ShadcnInPageNavigationItem {...props} />;
}

export function InPageNavigationFooter(props: React.ComponentProps<typeof Krds.InPageNavigationFooter>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationFooter {...props} />;
  return <ShadcnInPageNavigationFooter {...props} />;
}

export function InPageNavigationDescription(props: React.ComponentProps<typeof Krds.InPageNavigationDescription>) {
  const system = useUISystem();
  if (system === "krds") return <Krds.InPageNavigationDescription {...props} />;
  return <ShadcnInPageNavigationDescription {...props} />;
}
