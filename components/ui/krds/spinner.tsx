"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export interface SpinnerProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

function Spinner({ label, className, children }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label ?? "로딩 중"}
      className={cn("inline-flex flex-col items-center justify-center gap-2", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block size-6 animate-spin rounded-full",
          "border-2 border-solid",
          "border-krds-gray-20 border-t-krds-primary-50"
        )}
      />
      {label && <span className="sr-only">{label}</span>}
      {children}
    </div>
  );
}

export { Spinner };
