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
      {label && <label className="block text-krds-body-sm text-[#464c53]">{label}</label>}
      <div
        className={cn(
          "h-36 rounded-[6px] border border-[#58616a] bg-white px-4 py-2 transition-colors",
          "focus-within:border-2 focus-within:border-[#256ef4]",
          "has-[textarea[aria-invalid=true]]:border-2 has-[textarea[aria-invalid=true]]:border-[#de3412] has-[textarea[aria-invalid=true]]:focus-within:border-[#de3412]",
          disabled && "border border-[#b1b8be] bg-[#cdd1d5]",
          readOnly && !disabled && "border border-[#b1b8be] bg-[#cdd1d5]"
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
            "h-full w-full resize-none bg-transparent text-krds-body-md text-[#1e2124] outline-none",
            "placeholder:text-[#8a949e]",
            disabled && "cursor-not-allowed text-[#8a949e]",
            readOnly && !disabled && "text-[#464c53]"
          )}
        />
      </div>
      {showCount && (
        <div className="flex w-full justify-end">
          <div className="flex shrink-0 items-baseline gap-[2px] text-krds-body-sm whitespace-nowrap">
            <span className={cn(isOverLimit ? "text-[#bd2c0f]" : "text-[#0b50d0]")}>{currentLength}</span>
            <span className="text-[#464c53]">/{countTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
