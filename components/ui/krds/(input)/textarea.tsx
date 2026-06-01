"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue"> & {
  onChange?: (value: string) => void;
  label?: string;
  showCount?: boolean;
  countTotal?: number;
  value?: string;
  defaultValue?: string;
};

function Textarea({
  label,
  showCount = true,
  countTotal = 100,
  value,
  defaultValue,
  onChange,
  className,
  maxLength,
  disabled,
  readOnly,
  placeholder,
  "aria-invalid": ariaInvalid,
  ...rest
}: TextareaProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value !== undefined ? value : internal;
  const currentLength = current.length;
  const isOverLimit = countTotal !== undefined && currentLength > countTotal;
  const invalid = ariaInvalid ?? (isOverLimit || undefined);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <div data-slot="krds-textarea" className={cn("flex w-full flex-col gap-2", className)}>
      {label && <label className="block text-krds-body-sm text-krds-foreground-subtle">{label}</label>}
      <div
        className={cn(
          "h-36 rounded-[6px] border border-krds-border-dark bg-krds-surface px-4 py-2 transition-colors",
          "focus-within:border-2 focus-within:border-krds-border-primary",
          "has-[textarea[aria-invalid=true]]:border-2 has-[textarea[aria-invalid=true]]:border-krds-danger-50 has-[textarea[aria-invalid=true]]:focus-within:border-krds-danger-50",
          disabled && "border border-krds-border bg-krds-surface-disabled",
          readOnly && !disabled && "border border-krds-border bg-krds-surface-disabled"
        )}
      >
        <textarea
          {...rest}
          value={current}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={invalid}
          onChange={handleChange}
          className={cn(
            "h-full w-full resize-none bg-transparent text-krds-body-md text-krds-foreground outline-none",
            "placeholder:text-krds-foreground-disabled",
            disabled && "cursor-not-allowed text-krds-foreground-disabled",
            readOnly && !disabled && "text-krds-foreground-subtle"
          )}
        />
      </div>
      {showCount && (
        <div className="flex w-full justify-end">
          <div className="flex shrink-0 items-baseline gap-[2px] text-krds-body-sm whitespace-nowrap">
            <span className={cn(isOverLimit ? "text-krds-foreground-danger" : "text-krds-foreground-primary")}>{currentLength}</span>
            <span className="text-krds-foreground-subtle">/{countTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
