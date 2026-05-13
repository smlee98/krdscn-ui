"use client";

import { useId } from "react";
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/cn";

type SelectSize = "small" | "medium" | "large";
type SelectVariant = "default" | "sorting";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  disabled?: boolean;
  id?: string;
  className?: string;
  placeholder?: string;
}

const sizeStyles: Record<SelectSize, string> = {
  small: "h-8 text-xs",
  medium: "h-10 text-sm",
  large: "h-12 text-base"
};

function Select({
  options,
  value,
  defaultValue,
  onChange,
  label,
  hint,
  error,
  size = "medium",
  variant: _variant = "default",
  disabled,
  id: idProp,
  className,
  placeholder
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <span className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="text-krds-gray-90 mb-1 text-sm leading-none font-medium">
          {label}
        </label>
      )}

      <ShadcnSelect value={value} defaultValue={defaultValue} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          aria-invalid={hasError || undefined}
          className={cn(
            sizeStyles[size],
            "w-full rounded border px-3",
            "bg-krds-gray-0 text-krds-gray-90",
            "border-krds-gray-30",
            "focus:border-krds-primary-50 focus-visible:ring-0",
            hasError && "border-krds-danger-50",
            "disabled:bg-krds-gray-5 disabled:border-krds-gray-10 disabled:text-krds-gray-50 disabled:cursor-not-allowed"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>

      {hint && !error && (
        <span id={hintId} className="text-krds-gray-50 mt-1 inline-flex items-center gap-1 text-sm">
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5 shrink-0">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8 7v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="5" r="0.6" fill="currentColor" />
          </svg>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className="text-krds-danger-50 mt-1 text-sm" role="alert">
          {error}
        </span>
      )}
    </span>
  );
}

export type { SelectProps, SelectSize, SelectVariant, SelectOption };
export { Select };
