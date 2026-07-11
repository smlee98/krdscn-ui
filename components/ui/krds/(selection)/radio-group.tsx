/**
 * KRDS Radio, RadioGroup, RadioChip, RadioSort — radix RadioGroup 직접 합성
 * RadioGroup: RadioGroupPrimitive.Root (value/onValueChange/name 위임)
 * Radio: RadioGroupPrimitive.Item + RadioGroupPrimitive.Indicator (checked dot)
 * RadioChip / RadioSort: RadioGroupPrimitive.Item (chip/sort 시각)
 *
 * Figma references:
 *  - Radio atom: node 313:27198
 *  - RadioGroup list: node 315:27045
 *  - RadioSort: node 1055:38179
 */
"use client"

import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/cn"
import * as React from "react"

// ─── Context ────────────────────────────────────────────────────────────────

type RadioGroupContextType = {
  value: string | undefined
  onChange: (value: string) => void
  name: string
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null)

function useRadioGroupContext() {
  const ctx = React.useContext(RadioGroupContext)
  if (!ctx) throw new Error("Radio/RadioChip/RadioSort must be used inside <RadioGroup>")
  return ctx
}

// ─── Types ───────────────────────────────────────────────────────────────────

type RadioSize = "medium" | "large"
type RadioChipSize = "small" | "medium" | "large"

type RadioGroupProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  name: string
  size?: RadioSize
  children: React.ReactNode
  className?: string
  column?: boolean
}

type RadioProps = Omit<React.ComponentProps<"input">, "size" | "defaultChecked"> & {
  size?: RadioSize
  description?: string
  defaultChecked?: boolean
  value: string
  children?: React.ReactNode
}

type RadioChipProps = Omit<React.ComponentProps<"input">, "size" | "defaultValue" | "defaultChecked"> & {
  size?: RadioChipSize
  defaultChecked?: boolean
  value: string
  children?: React.ReactNode
}

type RadioSortProps = Omit<React.ComponentProps<"input">, "size" | "defaultChecked"> & {
  value: string
  defaultChecked?: boolean
  children?: React.ReactNode
}

// ─── RadioGroup ───────────────────────────────────────────────────────────────

function RadioGroup({
  value,
  defaultValue,
  onChange,
  name,
  size = "large",
  children,
  className,
  column = true,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = React.useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v)
      onChange?.(v)
    },
    [isControlled, onChange]
  )

  // Figma list arrangement (node 315:27045): column gap depends on size.
  //   large → 24px (gap-6), medium → 20px (gap-5).
  // Row layout keeps gap-2 (Figma does not define a row gap).
  const columnGap = size === "large" ? "gap-6" : "gap-5"

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <RadioGroupPrimitive.Root
        data-slot="krds-radio-group"
        value={currentValue}
        onValueChange={handleChange}
        name={name}
        className={cn("flex", column ? cn("flex-col", columnGap) : "flex-row flex-wrap gap-2", className)}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </RadioGroupContext.Provider>
  )
}

// ─── Radio ────────────────────────────────────────────────────────────────────

function Radio({ size = "medium", description, value, children, disabled, className }: RadioProps) {
  const ctx = useRadioGroupContext()
  const isChecked = ctx.value === value

  // Figma node 313:27198
  const outerSize = size === "large" ? "size-6" : "size-5"
  const innerSize = size === "large" ? "size-3" : "size-2.5"
  // Description indent: control size (size-6=24px / size-5=20px) + gap-2 (8px).
  const descIndent = size === "large" ? "pl-8" : "pl-7"
  const labelSize = size === "large" ? "text-krds-body-lg" : "text-krds-body-md"
  const helpSize = size === "large" ? "text-krds-body-md" : "text-krds-body-sm"
  // Checked border thickness differs by size (large 1.6px, medium 1.4px)
  const checkedBorder = size === "large" ? "border-[1.6px]" : "border-[1.4px]"

  // Border classes per state.
  //  - default unchecked: 1px gray-dark #58616a
  //  - default checked:   1.4–1.6px primary-50
  //  - disabled (any):    1px disabled-dark #8a949e
  const borderClass = disabled
    ? "border border-krds-border"
    : isChecked
      ? cn(checkedBorder, "border-krds-border-primary")
      : "border border-krds-border-dark"

  // Background:
  //  - disabled (any check): bg-krds-surface-disabled
  //  - otherwise: white — kept on purpose. In high-contrast/dark the unchecked
  //    circle must stay a visible white affordance, not blend into the dark surface.
  const bgClass = disabled ? "bg-krds-surface-disabled" : "bg-white"

  // Inner dot color:
  //  - disabled+checked: disabled-dark → bg-krds-gray-40
  //  - default+checked:  primary-50
  const dotClass = isChecked ? (disabled ? "bg-krds-gray-40" : "bg-krds-primary-50") : "bg-transparent"

  // Text colors:
  //  - any disabled: text/disabled
  //  - label default: text/bolder
  //  - help default:  text/subtle
  const labelColor = disabled ? "text-krds-foreground-disabled" : "text-krds-foreground-bolder"
  const helpColor = disabled ? "text-krds-foreground-disabled" : "text-krds-foreground-subtle"

  return (
    <div
      data-slot="krds-radio"
      className={cn("flex cursor-pointer flex-col gap-1", disabled && "cursor-not-allowed", className)}
    >
      <RadioGroupPrimitive.Item
        value={value}
        disabled={disabled}
        className={cn(
          // w-fit keeps the focus ring (and hover bg) content-width — wrapping only
          // the radio + label, matching KRDS where the ring sits on the inline-flex
          // <label>. Without it, the Item stretches to the full column width.
          "focus:krds-focus-ring hover:bg-krds-surface-subtler flex w-fit cursor-pointer items-center gap-2 rounded-[4px]",
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-full transition-colors",
            outerSize,
            borderClass,
            bgClass
          )}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <span className={cn("rounded-full", innerSize, dotClass)} />
          </RadioGroupPrimitive.Indicator>
        </span>
        {children && <span className={cn(labelSize, labelColor)}>{children}</span>}
      </RadioGroupPrimitive.Item>
      {description && <span className={cn(descIndent, helpSize, helpColor)}>{description}</span>}
    </div>
  )
}

// ─── RadioChip ────────────────────────────────────────────────────────────────

function RadioChip({ size = "medium", value, children, disabled, className }: RadioChipProps) {
  const ctx = useRadioGroupContext()
  const isChecked = ctx.value === value

  // KRDS form-chip heights (ref _form_chip.scss): small 40px / medium 48px / large 56px.
  const sizeClass = {
    small: "h-10 px-2.5 rounded-full text-sm",
    medium: "h-12 px-3 rounded-full text-base",
    large: "h-14 px-4 rounded-full text-base",
  }[size]

  return (
    <RadioGroupPrimitive.Item
      data-slot="krds-radio-chip"
      value={value}
      disabled={disabled}
      className={cn(
        "focus:krds-focus-ring inline-flex cursor-pointer items-center border transition-colors",
        "bg-krds-surface border-krds-border-light text-krds-foreground",
        isChecked && "bg-krds-surface-primary-subtle border-krds-border-primary text-krds-foreground-primary",
        disabled && "bg-krds-surface-subtler border-krds-border-light text-krds-foreground-disabled cursor-not-allowed",
        sizeClass,
        className
      )}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}

// ─── RadioSort ────────────────────────────────────────────────────────────────

function RadioSort({ value, children, disabled, className }: RadioSortProps) {
  const ctx = useRadioGroupContext()
  const isChecked = ctx.value === value

  return (
    <RadioGroupPrimitive.Item
      data-slot="krds-radio-sort"
      value={value}
      disabled={disabled}
      className={cn(
        "text-krds-foreground text-krds-body-md focus:krds-focus-ring hover:bg-krds-surface-subtler inline-flex cursor-pointer items-center rounded border border-transparent px-1 transition-colors",
        isChecked && "bg-krds-surface-secondary-subtle underline underline-offset-2",
        disabled && "text-krds-foreground-disabled cursor-not-allowed",
        className
      )}
    >
      {children}
    </RadioGroupPrimitive.Item>
  )
}

export { Radio, RadioChip, RadioGroup, RadioGroupContext, RadioSort, useRadioGroupContext }
export type {
  RadioChipProps,
  RadioChipSize,
  RadioGroupContextType,
  RadioGroupProps,
  RadioProps,
  RadioSize,
  RadioSortProps,
}
