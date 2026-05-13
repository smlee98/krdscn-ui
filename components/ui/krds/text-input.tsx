/**
 * KRDS TextInput wrapper — composes @/components/ui/input
 * label / error / success / information / hint slots preserved.
 * onChange adapter: (e) => onChange?.(e.target.value)
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";

type TextInputSize = "small" | "medium" | "large";

interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "size"> {
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  information?: string;
  size?: TextInputSize;
  value?: string;
  defaultValue?: string;
  showPasswordToggle?: boolean;
  showClearButton?: boolean;
}

const sizeClasses: Record<TextInputSize, string> = {
  small: "h-8 rounded text-xs",
  medium: "h-10 rounded-md text-sm",
  large: "h-12 rounded-md text-base"
};

function TextInput({
  label,
  hint,
  error,
  success,
  information,
  size = "medium",
  onChange,
  showPasswordToggle: _showPasswordToggle,
  showClearButton: _showClearButton,
  className,
  type,
  ...rest
}: TextInputProps) {
  const hasError = Boolean(error);

  const messageText = error ?? success ?? information ?? hint;

  const messageColorClass = error
    ? "text-krds-danger-50"
    : success
      ? "text-krds-success-50"
      : information
        ? "text-krds-info-50"
        : "text-krds-gray-50";

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-krds-gray-90 mb-1 text-sm font-medium">{label}</label>}
      <Input
        {...rest}
        type={type}
        aria-invalid={hasError || undefined}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "px-3",
          sizeClasses[size],
          hasError && "border-krds-danger-50 focus-visible:border-krds-danger-50",
          className
        )}
      />
      {messageText && (
        <span className={cn("mt-1 inline-flex items-center gap-1 text-[0.8125rem]", messageColorClass)}>
          {!error && !success && (
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5 shrink-0">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 7v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.6" fill="currentColor" />
            </svg>
          )}
          {messageText}
        </span>
      )}
    </div>
  );
}

export { TextInput };
export type { TextInputProps };
