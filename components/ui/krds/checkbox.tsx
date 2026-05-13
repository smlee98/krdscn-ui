/**
 * KRDS Checkbox, CheckboxGroup, CheckboxChip — composes @/components/ui/checkbox
 * Mirrors KRDS surface: Checkbox, CheckboxGroup, CheckboxChip.
 * Intentionally omitted: asChild, Slot, as-generic polymorphism.
 */

"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckboxSize = "medium" | "large";
export type CheckboxChipSize = "small" | "medium" | "large";

export interface CheckboxProps {
  size?: CheckboxSize;
  description?: string;
  defaultValue?: boolean;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
}

export interface CheckboxGroupProps {
  children: React.ReactNode;
  column?: boolean;
  className?: string;
}

export interface CheckboxChipProps {
  size?: CheckboxChipSize;
  defaultValue?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({
  size = "medium",
  description,
  defaultValue,
  label,
  checked,
  disabled,
  onChange,
  className,
  id,
  name,
  value
}: CheckboxProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const controlSize = size === "large" ? "size-5" : "size-4";
  const fontSize = size === "large" ? "text-base" : "text-sm";
  const descFontSize = size === "large" ? "text-sm" : "text-xs";

  return (
    <div className={cn("inline-flex items-start gap-2", className)}>
      <ShadcnCheckbox
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultValue}
        disabled={disabled}
        onCheckedChange={(state) => onChange?.(state === true)}
        className={cn(
          controlSize,
          "border-krds-gray-30 mt-0.5 shrink-0 rounded-[0.1875rem]",
          "data-[state=checked]:bg-krds-primary-50 data-[state=checked]:border-krds-primary-50",
          "disabled:border-krds-gray-20 disabled:bg-krds-gray-5",
          "focus-visible:ring-krds-primary-50/30"
        )}
      />

      {(label ?? description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={inputId}
              className={cn(
                "text-krds-gray-90 cursor-pointer leading-tight select-none",
                fontSize,
                disabled && "text-krds-gray-30 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className={cn(descFontSize, "text-krds-gray-50", disabled && "text-krds-gray-30")}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CheckboxGroup ─────────────────────────────────────────────────────────────

function CheckboxGroup({ children, column = false, className }: CheckboxGroupProps) {
  return <div className={cn("inline-flex flex-wrap gap-2", column && "flex-col", className)}>{children}</div>;
}

// ─── CheckboxChip ──────────────────────────────────────────────────────────────

function CheckboxChip({
  size = "medium",
  defaultValue,
  checked,
  disabled,
  onChange,
  children,
  className,
  id,
  name,
  value
}: CheckboxChipProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const sizeClass = {
    small: "h-7 px-2.5 rounded-full text-xs",
    medium: "h-8 px-3 rounded-full text-sm",
    large: "h-10 px-4 rounded-full text-base"
  }[size];

  const checkSize = {
    small: "size-3",
    medium: "size-3.5",
    large: "size-4"
  }[size];

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 border transition-colors select-none",
        "bg-krds-gray-0 border-krds-gray-20 text-krds-gray-90",
        checked && "bg-krds-primary-5 border-krds-primary-50 text-krds-primary-50",
        disabled && "bg-krds-gray-5 border-krds-gray-20 text-krds-gray-30 cursor-not-allowed",
        sizeClass,
        className
      )}
    >
      <ShadcnCheckbox
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultValue}
        disabled={disabled}
        onCheckedChange={(state) => onChange?.(state === true)}
        className="sr-only"
      />
      {checked && <CheckIcon className={cn("text-krds-primary-50 shrink-0", checkSize)} />}
      {children}
    </label>
  );
}

export { Checkbox, CheckboxGroup, CheckboxChip };
