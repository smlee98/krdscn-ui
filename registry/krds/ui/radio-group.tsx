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

import { CheckIcon } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
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

function RadioGroup({ value, defaultValue, onChange, name, children, className, column = true }: RadioGroupProps) {
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

  // KRDS .krds-check-area { gap: var(--krds-gap-6) } = 20px, flat on both axes and
  // both sizes — .chk-column only flips direction, it does not change the gap
  // (_form_check.scss:9-15). `size` does not affect the group gap.
  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <RadioGroupPrimitive.Root
        data-slot="krds-radio-group"
        value={currentValue}
        onValueChange={handleChange}
        name={name}
        className={cn("flex gap-5", column ? "flex-col" : "flex-row flex-wrap", className)}
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
  //  - disabled (any):    1px disabled-dark #8a949e (gray-60 #58616a in KRDS
  //                       high-contrast) — border-krds-border is the wrong semantic
  //                       here, it resolves to gray-30.
  const borderClass = disabled
    ? "border border-krds-gray-40 dark:border-krds-gray-60"
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
          "focus-visible:krds-focus-ring hover:bg-krds-surface-subtler flex w-fit cursor-pointer items-center gap-2 rounded-[4px]",
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

  // KRDS form-chip (ref _form_chip.scss): heights 40/48/56px, radius 6/6/8px(둥근 사각형),
  // 폰트 label-small/medium/large = 15/17/19px — CheckboxChip과 동일 스케일.
  const sizeClass = {
    small: "h-10 px-2.5 rounded-md text-krds-body-sm",
    medium: "h-12 px-3 rounded-md text-krds-body-md",
    large: "h-14 px-4 rounded-lg text-krds-body-lg",
  }[size]

  // Check icon glyph size (_form_chip.scss check-size: small 1.2rem=12px, medium/large
  // icon--size-small=16px).
  const iconSize = size === "small" ? "size-3" : "size-4"

  return (
    <RadioGroupPrimitive.Item
      data-slot="krds-radio-chip"
      value={value}
      disabled={disabled}
      className={cn(
        "focus-visible:krds-focus-ring inline-flex cursor-pointer items-center gap-1 border transition-colors",
        // KRDS chip default 보더 = color-border-gray = gray-30 (_form_chip.scss:69)
        "bg-krds-surface border-krds-border text-krds-foreground",
        isChecked && "bg-krds-surface-primary-subtle border-krds-border-primary text-krds-foreground-primary",
        // KRDS chip disabled: 채움 action-disabled=gray-20(고대비 gray-80), 텍스트 text-disabled-on=gray-50 (_form_chip.scss:65,68)
        disabled &&
          "bg-krds-gray-20 dark:bg-krds-gray-80 border-krds-border-light text-krds-gray-50 cursor-not-allowed",
        sizeClass,
        className
      )}
    >
      {/* KRDS radio-chip hides the check glyph unchecked and shows it only when
          checked (_form_chip.scss:145-158), unlike CheckboxChip which always renders it. */}
      {isChecked && (
        <CheckIcon
          className={cn(
            iconSize,
            "shrink-0",
            disabled ? "text-krds-foreground-disabled" : "text-krds-foreground-primary"
          )}
          strokeWidth={2.2}
          aria-hidden="true"
        />
      )}
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
        "text-krds-foreground text-krds-body-md focus-visible:krds-focus-ring hover:bg-krds-surface-subtler inline-flex cursor-pointer items-center rounded border border-transparent px-1 transition-colors",
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
