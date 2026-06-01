// rsc:safe
import * as React from "react";
import { ChevronRight, Info, Siren, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/dynamic/button";
import { cn } from "@/lib/cn";

// ─── Type config ──────────────────────────────────────────────────────────────

export type CriticalAlertType = "emergency" | "safety" | "info";

const TYPE_CONFIG: Record<
  CriticalAlertType,
  {
    bgClass: string;
    icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
    label: string;
  }
> = {
  emergency: { bgClass: "bg-krds-danger-50", icon: Siren, label: "긴급" },
  safety: { bgClass: "bg-krds-success-50", icon: TriangleAlert, label: "안전" },
  info: { bgClass: "bg-krds-info-50", icon: Info, label: "안내" }
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export type CriticalAlertProps = {
  type?: CriticalAlertType;
  className?: string;
  children?: React.ReactNode;
};

function CriticalAlert({ type = "emergency", className, children }: CriticalAlertProps) {
  const { bgClass, icon: Icon, label } = TYPE_CONFIG[type];
  return (
    <div
      role="alert"
      data-slot="krds-critical-alert"
      data-type={type}
      className={cn("border-krds-gray-20 flex w-full items-center gap-4 rounded-[10px] border bg-white p-4", className)}
    >
      <div
        data-slot="krds-critical-alert-badge"
        className={cn(
          "inline-flex h-12 shrink-0 items-center gap-1 rounded-[6px] py-2 pr-2.5 pl-2",
          "text-krds-body-md font-bold whitespace-nowrap text-white",
          bgClass
        )}
      >
        <Icon size={24} aria-hidden={true} />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

// ─── Message ──────────────────────────────────────────────────────────────────

export type CriticalAlertMessageProps = {
  className?: string;
  children?: React.ReactNode;
};

function CriticalAlertMessage({ className, children }: CriticalAlertMessageProps) {
  return (
    <p
      data-slot="krds-critical-alert-message"
      className={cn("flex-1 text-krds-body-md font-bold text-krds-fg-bolder", className)}
    >
      {children}
    </p>
  );
}

// ─── Action (trailing link/button with chevron) ───────────────────────────────

export type CriticalAlertActionProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
};

function CriticalAlertAction({
  className,
  children,
  href,
  onClick,
  "aria-label": ariaLabel
}: CriticalAlertActionProps) {
  const sharedClassName = cn(
    "text-krds-gray-90 inline-flex h-8 shrink-0 items-center gap-1 rounded-[4px] px-0.5",
    "text-krds-body-md",
    "hover:underline",
    "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      <ChevronRight size={20} aria-hidden={true} className="shrink-0 text-krds-fg" />
    </>
  );

  if (href) {
    return (
      <a
        data-slot="krds-critical-alert-action"
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        className={sharedClassName}
      >
        {inner}
      </a>
    );
  }

  return (
    <Button
      type="button"
      variant="text"
      size="sm"
      data-slot="krds-critical-alert-action"
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
      className={cn("shrink-0 gap-1 hover:underline", className)}
    >
      {inner}
    </Button>
  );
}

export { CriticalAlert, CriticalAlertMessage, CriticalAlertAction };
