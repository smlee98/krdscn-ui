/**
 * KRDS Checkbox, CheckboxGroup, CheckboxChip — Figma-aligned wrappers.
 *
 * Figma references:
 *  - checkbox__item (icon box): node 306:26713
 *  - checkbox (composition):    node 309:25967
 *  - checkbox__list:            node 309:26481
 *
 * Structure mirrors Radio (same KRDS family): icon box mounted directly
 * with the +1px Pretendard GOV visual shift, label container is
 * `flex min-w-0 flex-1 flex-col items-start justify-center gap-1 leading-[1.5]`.
 */

"use client";

import * as React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type CheckboxSize = "medium" | "large";
type CheckboxChipSize = "small" | "medium" | "large";

type CheckboxProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "defaultChecked" | "defaultValue" | "onChange" | "value" | "children"
> & {
  size?: CheckboxSize;
  label?: string;
  description?: string;
  checked?: boolean;
  indeterminate?: boolean;
  defaultValue?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  children?: React.ReactNode;
  value?: string;
};

type CheckboxGroupProps = Omit<React.ComponentProps<"div">, "children"> & {
  size?: CheckboxSize;
  column?: boolean;
  children?: React.ReactNode;
};

type CheckboxChipProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "defaultChecked" | "defaultValue" | "onChange" | "value"
> & {
  size?: CheckboxChipSize;
  checked?: boolean;
  defaultValue?: boolean;
  onChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  value?: string;
};

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({
  size = "medium",
  label,
  description,
  checked,
  indeterminate,
  defaultValue,
  onChange,
  disabled,
  className,
  id,
  name,
  value,
  children,
  ...rest
}: CheckboxProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultValue ?? false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;
  const isOn = currentChecked || indeterminate === true;

  // Figma node 306:26713 — 24px (large), 20px (medium); check glyph 16px / 12px.
  const outerSize = size === "large" ? "size-6" : "size-5";
  const iconGlyphSize = size === "large" ? "size-4" : "size-3";
  // Label/help typography mirrors Radio (Figma node 313:27198).
  const labelSize = size === "large" ? "text-[19px] leading-[1.5]" : "text-[17px] leading-[1.5]";
  const helpSize = size === "large" ? "text-[17px] leading-[1.5]" : "text-[15px] leading-[1.5]";
  // Pretendard GOV ink-center shift — verified via Playwright/Canvas TextMetrics.
  const iconVisualShift = "top-[1px]";

  // Border + background per state (matches Radio's color decisions for consistency).
  //  - default off:        border #58616a (gray-dark), bg white
  //  - default on/indet:   bg primary-50, no visible border
  //  - disabled (any):     border #8a949e, bg krds-gray-20 (#cdd1d5)
  let borderClass: string;
  let bgClass: string;
  if (disabled) {
    borderClass = isOn ? "border border-transparent" : "border border-[#8a949e]";
    bgClass = "bg-krds-gray-20";
  } else if (isOn) {
    borderClass = "border border-transparent";
    bgClass = "bg-krds-primary-50";
  } else {
    borderClass = "border border-[#58616a]";
    bgClass = "bg-white";
  }

  const glyphColor = disabled ? "text-[#8a949e]" : "text-white";
  const labelColor = disabled ? "text-[#8a949e]" : "text-[#131416]";
  const helpColor = disabled ? "text-[#8a949e]" : "text-krds-gray-70";

  const labelNode = label ?? children;

  return (
    <label
      htmlFor={inputId}
      data-slot="krds-checkbox"
      className={cn("flex cursor-pointer items-start gap-2", disabled && "cursor-not-allowed", className)}
    >
      <input
        {...rest}
        id={inputId}
        name={name}
        value={value}
        type="checkbox"
        checked={currentChecked}
        disabled={disabled}
        className="sr-only"
        aria-checked={indeterminate ? "mixed" : currentChecked}
        onChange={(e) => {
          if (!isControlled) setInternalChecked(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-[4px] transition-colors",
          iconVisualShift,
          outerSize,
          borderClass,
          bgClass
        )}
      >
        {indeterminate ? (
          <MinusIcon className={cn(iconGlyphSize, glyphColor)} strokeWidth={3} aria-hidden="true" />
        ) : currentChecked ? (
          <CheckIcon className={cn(iconGlyphSize, glyphColor)} strokeWidth={3} aria-hidden="true" />
        ) : null}
      </span>
      {(labelNode || description) && (
        <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 leading-[1.5]">
          {labelNode && <span className={cn("w-full", labelSize, labelColor)}>{labelNode}</span>}
          {description && <span className={cn("w-full", helpSize, helpColor)}>{description}</span>}
        </span>
      )}
    </label>
  );
}

// ─── CheckboxGroup ────────────────────────────────────────────────────────────

function CheckboxGroup({ children, column = false, size = "medium", className, ...props }: CheckboxGroupProps) {
  // Figma checkbox__list (node 309:26481): column gap 24px (large) / 20px (medium).
  // Row layout uses gap-2 (Figma does not define a row gap).
  const columnGap = size === "large" ? "gap-6" : "gap-5";

  return (
    <div
      data-slot="krds-checkbox-group"
      className={cn("flex", column ? cn("flex-col", columnGap) : "flex-row flex-wrap gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── CheckboxChip ─────────────────────────────────────────────────────────────

function CheckboxChip({
  size = "medium",
  checked,
  defaultValue,
  onChange,
  disabled,
  children,
  className,
  id,
  name,
  value,
  ...rest
}: CheckboxChipProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultValue ?? false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const sizeClass = {
    small: "h-7 gap-1.5 px-3 rounded-md text-xs",
    medium: "h-8 gap-1.5 px-4 rounded-md text-sm",
    large: "h-10 gap-2 px-5 rounded-lg text-base"
  }[size];

  const iconSize = size === "large" ? "size-4" : size === "small" ? "size-3" : "size-3.5";

  return (
    <label
      htmlFor={inputId}
      data-slot="krds-checkbox-chip"
      className={cn("inline-flex cursor-pointer items-center", disabled && "cursor-not-allowed")}
    >
      <input
        {...rest}
        id={inputId}
        name={name}
        value={value}
        type="checkbox"
        checked={currentChecked}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          if (!isControlled) setInternalChecked(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <span
        className={cn(
          "inline-flex items-center border transition-colors",
          "bg-krds-gray-0 border-krds-gray-20 text-krds-gray-90",
          currentChecked && "bg-krds-primary-5 border-krds-primary-50 text-krds-primary-50",
          disabled && "bg-krds-gray-5 border-krds-gray-20 text-krds-gray-30",
          sizeClass,
          className
        )}
      >
        <CheckIcon
          className={cn(
            iconSize,
            "shrink-0",
            currentChecked ? "text-krds-primary-50" : "text-krds-gray-30",
            disabled && "text-krds-gray-30"
          )}
          strokeWidth={currentChecked ? 2.2 : 1.8}
          aria-hidden="true"
        />
        {children}
      </span>
    </label>
  );
}

export { Checkbox, CheckboxGroup, CheckboxChip };
export type { CheckboxProps, CheckboxGroupProps, CheckboxChipProps, CheckboxSize, CheckboxChipSize };
