/**
 * KRDS Radio, RadioGroup, RadioChip wrappers — composes @/components/ui/radio-group
 * Intentionally omitted: asChild, Slot, polymorphic as generic
 * RadioGroup provides name/value context for coordination.
 * onChange adapter: (value: string) => void (no synthetic event)
 */
"use client";

import * as React from "react";
import { RadioGroup as ShadcnRadioGroup } from "@/components/ui/radio-group";
import { cn } from "@/lib/cn";

// ─── Context ────────────────────────────────────────────────────────────────

interface RadioGroupContextType {
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null);

function useRadioGroupContext() {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) throw new Error("Radio/RadioChip must be used inside <RadioGroup>");
  return ctx;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type RadioSize = "medium" | "large";
type RadioChipSize = "small" | "medium" | "large";

interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name: string;
  children: React.ReactNode;
  className?: string;
  column?: boolean;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "defaultChecked"> {
  size?: RadioSize;
  description?: string;
  defaultChecked?: boolean;
  value: string;
  children?: React.ReactNode;
}

interface RadioChipProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "defaultValue" | "defaultChecked"> {
  size?: RadioChipSize;
  defaultChecked?: boolean;
  value: string;
  children?: React.ReactNode;
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

function RadioGroup({ value, defaultValue, onChange, name, children, className, column = true }: RadioGroupProps) {
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

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <ShadcnRadioGroup
        value={currentValue}
        onValueChange={handleChange}
        className={cn("flex gap-2", column ? "flex-col" : "flex-row flex-wrap", className)}
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

  const outerSize = size === "large" ? "size-5" : "size-4";
  const innerSize = size === "large" ? "size-2" : "size-1.5";
  const fontSize = size === "large" ? "text-base" : "text-sm";

  return (
    <label
      className={cn("flex cursor-pointer items-start gap-2", disabled && "cursor-not-allowed opacity-60", className)}
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
      {/* custom radio visual */}
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 inline-flex shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors",
          outerSize,
          isChecked ? "border-krds-primary-50" : disabled ? "border-krds-gray-20" : "border-krds-gray-30"
        )}
      >
        <span
          className={cn(
            "rounded-full transition-colors",
            innerSize,
            isChecked ? (disabled ? "bg-krds-gray-30" : "bg-krds-primary-50") : "bg-transparent"
          )}
        />
      </span>
      <span className="flex flex-col">
        {children && (
          <span className={cn(fontSize, disabled ? "text-krds-gray-30" : "text-krds-gray-90")}>{children}</span>
        )}
        {description && (
          <span className={cn("text-xs", disabled ? "text-krds-gray-30" : "text-krds-gray-50")}>{description}</span>
        )}
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
    <label className={cn("inline-flex cursor-pointer items-center", disabled && "cursor-not-allowed")}>
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

export { Radio, RadioGroup, RadioChip };
export type { RadioProps, RadioGroupProps, RadioChipProps };
