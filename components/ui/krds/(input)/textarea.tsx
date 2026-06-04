"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { renderFieldMessage } from "@/components/ui/krds/(input)/field-message";

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue"> & {
  onChange?: (value: string) => void;
  label?: string;
  showCount?: boolean;
  countTotal?: number;
  value?: string;
  defaultValue?: string;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  information?: React.ReactNode;
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
  id: propId,
  hint,
  error,
  success,
  information,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  ...rest
}: TextareaProps) {
  const generatedId = React.useId();
  const id = propId ?? generatedId;

  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value !== undefined ? value : internal;
  const currentLength = current.length;
  const isOverLimit = countTotal !== undefined && currentLength > countTotal;
  const hasError = error != null && error !== false;
  const invalid = ariaInvalid ?? (hasError || isOverLimit || undefined);

  const message = renderFieldMessage(id, { error, success, information, hint });
  const describedBy = message
    ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ")
    : ariaDescribedby;
  const counter = showCount ? (
    <div className="flex shrink-0 items-baseline gap-[2px] text-krds-body-sm whitespace-nowrap">
      <span className={cn(isOverLimit ? "text-krds-foreground-danger" : "text-krds-foreground-primary")}>{currentLength}</span>
      <span className="text-krds-foreground-subtle">/{countTotal}</span>
    </div>
  ) : null;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <div data-slot="krds-textarea" className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-krds-body-sm text-krds-foreground-subtle">
          {label}
        </label>
      )}
      <div
        className={cn(
          "h-36 rounded-[8px] border border-krds-border-dark bg-krds-surface px-4 py-2 transition-colors",
          "focus-within:border-krds-border-primary focus-within:krds-focus-ring",
          "has-[textarea[aria-invalid=true]]:border-krds-danger-50 has-[textarea[aria-invalid=true]]:focus-within:border-krds-danger-50",
          disabled && "border border-krds-border bg-krds-surface-disabled",
          readOnly && !disabled && "border border-krds-border bg-krds-surface-disabled"
        )}
      >
        <textarea
          {...rest}
          id={id}
          value={current}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={handleChange}
          className={cn(
            "h-full w-full resize-none rounded-[8px] bg-transparent text-krds-body-md text-krds-foreground outline-none",
            "placeholder:text-krds-foreground-disabled",
            disabled && "cursor-not-allowed text-krds-foreground-disabled",
            readOnly && !disabled && "text-krds-foreground-subtle"
          )}
        />
      </div>
      {message && counter ? (
        // textarea-bottom: message left, counter right on a single row.
        <div className="flex w-full items-start justify-between gap-2">
          {message}
          {counter}
        </div>
      ) : (
        <>
          {message}
          {counter && <div className="flex w-full justify-end">{counter}</div>}
        </>
      )}
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
