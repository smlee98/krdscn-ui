/**
 * KRDS Radio, RadioGroup, RadioChip, RadioSort wrappers — composes @/components/ui/radio-group
 * RadioGroup provides name/value context for coordination.
 * onChange adapter: (value: string) => void (no synthetic event)
 *
 * Figma references:
 *  - Radio atom: node 313:27198
 *  - RadioGroup list: node 315:27045
 *  - RadioSort: node 1055:38179
 */
"use client";

import { RadioGroup as ShadcnRadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/cn";
import * as React from "react";

// ─── Context ────────────────────────────────────────────────────────────────

type RadioGroupContextType = {
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
};

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null);

function useRadioGroupContext() {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) throw new Error("Radio/RadioChip/RadioSort must be used inside <RadioGroup>");
  return ctx;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type RadioSize = "medium" | "large";
type RadioChipSize = "small" | "medium" | "large";

type RadioGroupProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name: string;
  size?: RadioSize;
  children: React.ReactNode;
  className?: string;
  column?: boolean;
};

type RadioProps = Omit<React.ComponentProps<"input">, "size" | "defaultChecked"> & {
  size?: RadioSize;
  description?: string;
  defaultChecked?: boolean;
  value: string;
  children?: React.ReactNode;
};

type RadioChipProps = Omit<React.ComponentProps<"input">, "size" | "defaultValue" | "defaultChecked"> & {
  size?: RadioChipSize;
  defaultChecked?: boolean;
  value: string;
  children?: React.ReactNode;
};

type RadioSortProps = Omit<React.ComponentProps<"input">, "size" | "defaultChecked"> & {
  value: string;
  defaultChecked?: boolean;
  children?: React.ReactNode;
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

function RadioGroup({
  value,
  defaultValue,
  onChange,
  name,
  size = "large",
  children,
  className,
  column = true
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );

  // Figma list arrangement (node 315:27045): column gap depends on size.
  //   large → 24px (gap-6), medium → 20px (gap-5).
  // Row layout keeps gap-2 (Figma does not define a row gap).
  const columnGap = size === "large" ? "gap-6" : "gap-5";

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <ShadcnRadioGroup
        data-slot="krds-radio-group"
        value={currentValue}
        onValueChange={handleChange}
        className={cn("flex", column ? cn("flex-col", columnGap) : "flex-row flex-wrap gap-2", className)}
      >
        {children}
      </ShadcnRadioGroup>
    </RadioGroupContext.Provider>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────

function Radio({ size = "medium", description, value, children, disabled, className, ...rest }: RadioProps) {
  const ctx = useRadioGroupContext();
  const isChecked = ctx.value === value;

  // Figma node 313:27198
  const outerSize = size === "large" ? "size-6" : "size-5";
  const innerSize = size === "large" ? "size-3" : "size-2.5";
  const labelSize = size === "large" ? "text-[19px] leading-[1.5]" : "text-[17px] leading-[1.5]";
  const helpSize = size === "large" ? "text-[17px] leading-[1.5]" : "text-[15px] leading-[1.5]";
  // Pretendard GOV glyph ink-center is offset from the icon's natural layout position.
  // Playwright/Canvas TextMetrics found that +1px shift aligns icon center to glyph
  // ink-center within ~0.2px for both sizes (large=+0.13, medium=+0.21).
  const iconVisualShift = "top-[1px]";
  // Checked border thickness differs by size (large 1.6px, medium 1.4px)
  const checkedBorder = size === "large" ? "border-[1.6px]" : "border-[1.4px]";

  // Border classes per state.
  //  - default unchecked: 1px gray-dark #58616a (no token alias — arbitrary)
  //  - default checked:   1.4–1.6px primary-50
  //  - disabled (any):    1px disabled-dark #8a949e (no token alias — arbitrary)
  const borderClass = disabled
    ? "border border-[#8a949e]"
    : isChecked
      ? cn(checkedBorder, "border-krds-primary-50")
      : "border border-[#58616a]";

  // Background:
  //  - disabled (any check): disabled-light #cdd1d5 → bg-krds-gray-20
  //  - otherwise: white
  const bgClass = disabled ? "bg-krds-gray-20" : "bg-white";

  // Inner dot color:
  //  - disabled+checked: disabled-dark #8a949e (arbitrary)
  //  - default+checked:  primary-50
  const dotClass = isChecked ? (disabled ? "bg-[#8a949e]" : "bg-krds-primary-50") : "bg-transparent";

  // Text colors:
  //  - label default: text/bolder #131416 (no token — arbitrary)
  //  - help default:  text/subtle #464c53 → text-krds-gray-70
  //  - any disabled:  text/disabled #8a949e (arbitrary)
  const labelColor = disabled ? "text-[#8a949e]" : "text-[#131416]";
  const helpColor = disabled ? "text-[#8a949e]" : "text-krds-gray-70";

  return (
    <label
      data-slot="krds-radio"
      className={cn("flex cursor-pointer items-start gap-2", disabled && "cursor-not-allowed", className)}
    >
      <input
        {...rest}
        type="radio"
        name={ctx.name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        className="sr-only"
        onChange={() => ctx.onChange(value)}
      />
      {/*
        Icon box mounted directly (no extra wrapper). `relative top-[-3px]` lifts it to
        match Pretendard GOV's glyph ink-center, measured via Playwright/Canvas TextMetrics.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
          iconVisualShift,
          outerSize,
          borderClass,
          bgClass
        )}
      >
        <span className={cn("rounded-full transition-colors", innerSize, dotClass)} />
      </span>
      {/* label container: Figma 313:27238 — flex-1 min-w-0 + leading-[1.5] at container level */}
      <span className="flex min-w-0 flex-1 flex-col items-start justify-center gap-1 leading-[1.5]">
        {children && <span className={cn("w-full", labelSize, labelColor)}>{children}</span>}
        {description && <span className={cn("w-full", helpSize, helpColor)}>{description}</span>}
      </span>
    </label>
  );
}

// ─── RadioChip ────────────────────────────────────────────────────────────────

function RadioChip({ size = "medium", value, children, disabled, className, ...rest }: RadioChipProps) {
  const ctx = useRadioGroupContext();
  const isChecked = ctx.value === value;

  const sizeClass = {
    small: "h-7 px-2.5 rounded-full text-xs",
    medium: "h-8 px-3 rounded-full text-sm",
    large: "h-10 px-4 rounded-full text-base"
  }[size];

  return (
    <label
      data-slot="krds-radio-chip"
      className={cn("inline-flex cursor-pointer items-center", disabled && "cursor-not-allowed")}
    >
      <input
        {...rest}
        type="radio"
        name={ctx.name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        className="sr-only"
        onChange={() => ctx.onChange(value)}
      />
      <span
        className={cn(
          "inline-flex items-center border transition-colors",
          "bg-krds-gray-0 border-krds-gray-20 text-krds-gray-90",
          isChecked && "bg-krds-primary-5 border-krds-primary-50 text-krds-primary-50",
          disabled && "bg-krds-gray-5 border-krds-gray-20 text-krds-gray-30",
          sizeClass,
          className
        )}
      >
        {children}
      </span>
    </label>
  );
}

// ─── RadioSort ────────────────────────────────────────────────────────────────

function RadioSort({ value, children, disabled, className, ...rest }: RadioSortProps) {
  const ctx = useRadioGroupContext();
  const isChecked = ctx.value === value;

  return (
    <label
      data-slot="krds-radio-sort"
      className={cn("inline-flex cursor-pointer items-center", disabled && "cursor-not-allowed")}
    >
      <input
        {...rest}
        type="radio"
        name={ctx.name}
        value={value}
        checked={isChecked}
        disabled={disabled}
        className="sr-only"
        onChange={() => ctx.onChange(value)}
      />
      <span
        className={cn(
          "text-krds-gray-90 inline-flex items-center rounded border border-transparent px-1 text-[17px] leading-[1.5] transition-colors",
          isChecked && "bg-krds-secondary-5 underline underline-offset-2",
          disabled && "text-[#8a949e]",
          className
        )}
      >
        {children}
      </span>
    </label>
  );
}

export { Radio, RadioChip, RadioGroup, RadioGroupContext, RadioSort, useRadioGroupContext };
export type {
  RadioChipProps,
  RadioChipSize,
  RadioGroupContextType,
  RadioGroupProps,
  RadioProps,
  RadioSize,
  RadioSortProps
};
