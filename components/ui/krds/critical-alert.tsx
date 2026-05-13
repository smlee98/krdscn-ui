// rsc:client
"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/cn";

interface CriticalAlertProps {
  children: React.ReactNode;
  defaultVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

function CriticalAlert({ children, defaultVisible = true, onClose, className }: CriticalAlertProps) {
  const [visible, setVisible] = useState(defaultVisible);

  if (!visible) return null;

  function handleClose() {
    setVisible(false);
    onClose?.();
  }

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-3",
        "bg-krds-danger-50 text-sm font-medium text-white",
        className
      )}
    >
      <span className="flex-1">{children}</span>
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

export type { CriticalAlertProps };
export { CriticalAlert };
