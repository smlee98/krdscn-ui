// rsc:client
"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CriticalAlertProps = React.ComponentProps<"div"> & {
  defaultVisible?: boolean;
  onClose?: () => void;
};

type CriticalAlertTitleProps = React.ComponentProps<"span">;

type CriticalAlertDescriptionProps = React.ComponentProps<"span">;

// ─── CriticalAlert (Root) ─────────────────────────────────────────────────────

function CriticalAlert({
  children,
  defaultVisible = true,
  onClose,
  className,
  ...props
}: CriticalAlertProps) {
  const [visible, setVisible] = React.useState(defaultVisible);

  function handleClose() {
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div
      data-slot="krds-critical-alert"
      role="alert"
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-3",
        "bg-krds-danger-50 text-sm font-medium text-white",
        className
      )}
      {...props}
    >
      <span className="flex flex-1 flex-col gap-0.5">{children}</span>
      <button
        type="button"
        aria-label="알림 닫기"
        onClick={handleClose}
        className={cn(
          "shrink-0 rounded-sm p-0.5",
          "opacity-80 hover:opacity-100",
          "focus:ring-2 focus:ring-white focus:outline-none"
        )}
      >
        <XIcon className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// ─── CriticalAlertTitle ───────────────────────────────────────────────────────

function CriticalAlertTitle({ className, ...props }: CriticalAlertTitleProps) {
  return (
    <span
      data-slot="krds-critical-alert-title"
      className={cn("font-semibold", className)}
      {...props}
    />
  );
}

// ─── CriticalAlertDescription ─────────────────────────────────────────────────

function CriticalAlertDescription({ className, ...props }: CriticalAlertDescriptionProps) {
  return (
    <span
      data-slot="krds-critical-alert-description"
      className={cn("font-normal opacity-90", className)}
      {...props}
    />
  );
}

export { CriticalAlert, CriticalAlertTitle, CriticalAlertDescription };
