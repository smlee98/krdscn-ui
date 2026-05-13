/**
 * KRDS Textarea wrapper — composes @/components/ui/textarea
 * label / showCount / countTotal slots preserved.
 * onChange adapter: (e) => onChange?.(e.target.value)
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue"> {
  onChange?: (value: string) => void;
  label?: string;
  showCount?: boolean;
  countTotal?: number;
  value?: string;
  defaultValue?: string;
}

function Textarea({
  label,
  showCount,
  countTotal,
  onChange,
  value,
  defaultValue,
  className,
  maxLength,
  ...rest
}: TextareaProps) {
  const currentLength = typeof value === "string" ? value.length : undefined;
  const isOverLimit = countTotal !== undefined && currentLength !== undefined && currentLength > countTotal;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-krds-gray-90 text-sm font-medium">{label}</label>}
      <ShadcnTextarea
        {...rest}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn("min-h-20 resize-y px-3 py-2", className)}
      />
      {showCount && (
        <span className={cn("text-right text-xs", isOverLimit ? "text-krds-danger-50" : "text-krds-gray-50")}>
          {currentLength ?? 0}
          {countTotal !== undefined && ` / ${countTotal}`}
        </span>
      )}
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
