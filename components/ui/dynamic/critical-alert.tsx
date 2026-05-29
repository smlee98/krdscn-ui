"use client";

import * as React from "react";
import { ChevronRight, Info, Siren, TriangleAlert } from "lucide-react";
import {
  CriticalAlert as KrdsCriticalAlert,
  CriticalAlertAction as KrdsCriticalAlertAction,
  CriticalAlertMessage as KrdsCriticalAlertMessage
} from "@/components/ui/krds/(layout)/critical-alert";
import type {
  CriticalAlertActionProps,
  CriticalAlertMessageProps,
  CriticalAlertProps,
  CriticalAlertType
} from "@/components/ui/krds/(layout)/critical-alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

export type {
  CriticalAlertProps,
  CriticalAlertMessageProps,
  CriticalAlertActionProps,
  CriticalAlertType
} from "@/components/ui/krds/(layout)/critical-alert";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS CriticalAlert compound API; each part renders either the
// KRDS-chromed wrapper or a vanilla-shadcn reconstruction based on <UISystemProvider>.
//
// shadcn has no Alert primitive, so the shadcn branch rebuilds the alert look from a
// div + shadcn tokens (role="alert", border, bg, foreground/muted-foreground typography,
// a lucide icon). KRDS-only chrome (hex colors, the colored siren badge, fixed pixel
// type ramp) is intentionally dropped; the type axis is approximated with shadcn tokens —
// emergency → destructive emphasis, safety/info → muted emphasis.

// ─── shadcn-mode type config (token-based, no krds-*/hex) ───────────────────────

const SHADCN_TYPE_CONFIG: Record<
  CriticalAlertType,
  {
    containerClass: string;
    iconClass: string;
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  }
> = {
  emergency: {
    containerClass: "border-destructive/30 bg-destructive/10 text-foreground",
    iconClass: "text-destructive",
    icon: Siren
  },
  safety: {
    containerClass: "border-border bg-muted text-foreground",
    iconClass: "text-muted-foreground",
    icon: TriangleAlert
  },
  info: {
    containerClass: "border-border bg-muted text-foreground",
    iconClass: "text-muted-foreground",
    icon: Info
  }
};

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnCriticalAlert({ type = "emergency", className, children }: CriticalAlertProps) {
  const { containerClass, iconClass, icon: Icon } = SHADCN_TYPE_CONFIG[type];
  return (
    <div
      role="alert"
      data-slot="critical-alert"
      data-type={type}
      className={cn("flex w-full items-center gap-3 rounded-lg border p-4", containerClass, className)}
    >
      <Icon className={cn("size-6 shrink-0", iconClass)} aria-hidden={true} />
      {children}
    </div>
  );
}

function ShadcnCriticalAlertMessage({ className, children }: CriticalAlertMessageProps) {
  return (
    <p data-slot="critical-alert-message" className={cn("flex-1 text-sm font-medium", className)}>
      {children}
    </p>
  );
}

function ShadcnCriticalAlertAction({
  className,
  children,
  href,
  onClick,
  "aria-label": ariaLabel
}: CriticalAlertActionProps) {
  const inner = (
    <>
      <span>{children}</span>
      <ChevronRight className="size-4 shrink-0" aria-hidden={true} />
    </>
  );

  if (href) {
    return (
      <a
        data-slot="critical-alert-action"
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        className={cn(
          "text-primary focus-visible:ring-ring/50 inline-flex shrink-0 items-center gap-1 text-sm underline-offset-4 hover:underline focus-visible:ring-[3px] focus-visible:outline-none",
          className
        )}
      >
        {inner}
      </a>
    );
  }

  return (
    <Button
      type="button"
      variant="link"
      size="sm"
      data-slot="critical-alert-action"
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
      className={cn("shrink-0 gap-1", className)}
    >
      {inner}
    </Button>
  );
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function CriticalAlert(props: CriticalAlertProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCriticalAlert {...props} />;
  return <ShadcnCriticalAlert {...props} />;
}

export function CriticalAlertMessage(props: CriticalAlertMessageProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCriticalAlertMessage {...props} />;
  return <ShadcnCriticalAlertMessage {...props} />;
}

export function CriticalAlertAction(props: CriticalAlertActionProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCriticalAlertAction {...props} />;
  return <ShadcnCriticalAlertAction {...props} />;
}
