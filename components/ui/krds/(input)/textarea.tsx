"use client";

import * as React from "react";
import { Info, CheckCircle2, CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type TextareaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "value" | "defaultValue"
> & {
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  information?: string;
  showCount?: boolean;
  countTotal?: number;
  value?: string;
  defaultValue?: string;
};

function Textarea({
  label,
  hint,
  error,
  success,
  information,
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
  ...rest
}: TextareaProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = value !== undefined ? value : internal;
  const currentLength = current.length;
  const isOverLimit = countTotal !== undefined && currentLength > countTotal;

  const hasError = Boolean(error) || isOverLimit;

  const messageContent = error?.trim()
    ? { text: error, icon: <CircleAlert className="size-4 shrink-0" />, cls: "text-[#bd2c0f]" }
    : success?.trim()
      ? { text: success, icon: <CheckCircle2 className="size-4 shrink-0" />, cls: "text-[#267337]" }
      : information?.trim()
        ? { text: information, icon: <Info className="size-4 shrink-0" />, cls: "text-[#096ab3]" }
        : null;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <div data-slot="krds-textarea" className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label className="block text-[15px] leading-[1.5] text-[#464c53]">{label}</label>
      )}
      {hint && !messageContent && (
        <p className="text-[13px] leading-[1.5] text-[#464c53]">{hint}</p>
      )}
      <div
        className={cn(
          "h-36 rounded-[6px] border border-[#58616a] bg-white px-4 py-2 transition-colors",
          "focus-within:border-2 focus-within:border-[#256ef4]",
          hasError && "border-2 border-[#de3412] focus-within:border-[#de3412]",
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
          aria-invalid={hasError || undefined}
          onChange={handleChange}
          className={cn(
            "h-full w-full resize-none bg-transparent text-[17px] leading-[1.5] text-[#1e2124] outline-none",
            "placeholder:text-[#8a949e]",
            disabled && "cursor-not-allowed text-[#8a949e]",
            readOnly && !disabled && "text-[#464c53]"
          )}
        />
      </div>
      {(messageContent || showCount) && (
        <div className="flex w-full items-start justify-between gap-4">
          {messageContent ? (
            <div
              className={cn(
                "flex min-w-0 flex-1 items-start gap-1 text-[13px] leading-[1.5]",
                messageContent.cls
              )}
            >
              <span className="mt-[2px] shrink-0">{messageContent.icon}</span>
              <span className="min-w-0 flex-1 translate-y-px">{messageContent.text}</span>
            </div>
          ) : (
            <span aria-hidden className="flex-1" />
          )}
          {showCount && (
            <div className="flex shrink-0 items-baseline gap-[2px] whitespace-nowrap text-[15px] leading-[1.5]">
              <span className={cn(isOverLimit ? "text-[#bd2c0f]" : "text-[#0b50d0]")}>
                {currentLength}
              </span>
              <span className="text-[#464c53]">/{countTotal}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { Textarea };
export type { TextareaProps };
