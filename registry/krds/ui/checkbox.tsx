// rsc:client
"use client"
/**
 * KRDS Checkbox, CheckboxGroup, CheckboxChip — Figma-aligned wrappers.
 *
 * Figma references:
 *  - checkbox__item (icon box): node 306:26713
 *  - checkbox (composition):    node 309:25967
 *  - checkbox__list:            node 309:26481
 *
 * Structure: outer wrapper is flex-col gap-1. Inner row (control+label text) is
 * items-center gap-2. Description is a sibling block indented by pl-7/pl-8.
 *
 * Radix: CheckboxPrimitive.Root renders as <button>; form integration is handled
 * via Radix's internal hidden input (name/value props on Root).
 */

import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type CheckboxSize = "medium" | "large"
type CheckboxChipSize = "small" | "medium" | "large"

type CheckboxProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "defaultChecked" | "defaultValue" | "onChange" | "value" | "children"
> & {
  size?: CheckboxSize
  label?: string
  description?: string
  checked?: boolean
  indeterminate?: boolean
  defaultValue?: boolean
  onChange?: (checked: boolean) => void
  className?: string
  children?: React.ReactNode
  value?: string
}

type CheckboxGroupProps = Omit<React.ComponentProps<"div">, "children"> & {
  size?: CheckboxSize
  column?: boolean
  children?: React.ReactNode
}

type CheckboxChipProps = Omit<
  React.ComponentProps<"input">,
  "size" | "type" | "defaultChecked" | "defaultValue" | "onChange" | "value"
> & {
  size?: CheckboxChipSize
  checked?: boolean
  defaultValue?: boolean
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
  value?: string
}

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
}: CheckboxProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId

  const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultValue ?? false)
  const isControlled = checked !== undefined
  const currentChecked = isControlled ? checked : internalChecked
  const isOn = currentChecked || indeterminate === true

  // Figma node 306:26713 — 24px (large), 20px (medium); check glyph 16px / 12px.
  const outerSize = size === "large" ? "size-6" : "size-5"
  const iconGlyphSize = size === "large" ? "size-4" : "size-3"
  // Description indent: control size (size-6=24px / size-5=20px) + gap-2 (8px).
  const descIndent = size === "large" ? "pl-8" : "pl-7"
  // Label/help typography mirrors Radio (Figma node 313:27198).
  const labelSize = size === "large" ? "text-krds-body-lg" : "text-krds-body-md"
  const helpSize = size === "large" ? "text-krds-body-md" : "text-krds-body-sm"
  // Border + background per state (matches Radio's color decisions for consistency).
  //  - default off:        border #58616a (gray-dark), bg white
  //  - default on/indet:   bg primary-50, no visible border
  //  - disabled (any):     border #8a949e (gray-40; #8a949e in light, gray-60 #58616a
  //                        in KRDS high-contrast — border-krds-border is the wrong
  //                        semantic here, it resolves to gray-30), bg krds-gray-20 (#cdd1d5)
  let borderClass: string
  let bgClass: string
  if (disabled) {
    borderClass = isOn ? "border border-transparent" : "border border-krds-gray-40 dark:border-krds-gray-60"
    bgClass = "bg-krds-surface-disabled"
  } else if (isOn) {
    borderClass = "border border-transparent"
    bgClass = "bg-krds-primary-50"
  } else {
    borderClass = "border border-krds-border-dark"
    // Kept white (not surface) on purpose: in high-contrast/dark the unchecked
    // box must stay a visible white affordance, not blend into the dark surface.
    bgClass = "bg-white"
  }

  const glyphColor = disabled ? "text-krds-foreground-disabled" : "text-white"
  const labelColor = disabled ? "text-krds-foreground-disabled" : "text-krds-foreground-bolder"
  const helpColor = disabled ? "text-krds-foreground-disabled" : "text-krds-foreground-subtle"

  const labelNode = label ?? children

  return (
    <div data-slot="krds-checkbox" className={cn("flex flex-col gap-1", disabled && "cursor-not-allowed", className)}>
      {/* KRDS는 포커스 링이 박스+라벨을 함께 감쌈(_form_check.scss:240-243). CheckboxPrimitive.Root(button)가
          label을 자식으로 포함할 수 없으므로, has-[:focus-visible]로 래퍼에 링을 끌어올려 radio-group.tsx와
          시각적으로 동등하게 맞춘다. */}
      <div className="has-[:focus-visible]:krds-focus-ring flex w-fit items-center gap-2 rounded-[4px]">
        <CheckboxPrimitive.Root
          id={inputId}
          name={name}
          value={value}
          disabled={disabled}
          checked={indeterminate ? "indeterminate" : currentChecked}
          onCheckedChange={(checkedState) => {
            const val = checkedState === "indeterminate" ? false : (checkedState as boolean)
            if (!isControlled) setInternalChecked(val)
            onChange?.(val)
          }}
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-[4px] transition-colors",
            outerSize,
            borderClass,
            bgClass
          )}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center">
            {indeterminate ? (
              <MinusIcon className={cn(iconGlyphSize, glyphColor)} strokeWidth={3} aria-hidden="true" />
            ) : (
              <CheckIcon className={cn(iconGlyphSize, glyphColor)} strokeWidth={3} aria-hidden="true" />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {labelNode && (
          <label
            htmlFor={inputId}
            className={cn("cursor-pointer select-none", disabled && "cursor-not-allowed", labelSize, labelColor)}
          >
            {labelNode}
          </label>
        )}
      </div>
      {description && <span className={cn(descIndent, helpSize, helpColor)}>{description}</span>}
    </div>
  )
}

// ─── CheckboxGroup ────────────────────────────────────────────────────────────

function CheckboxGroup({ children, column = false, size: _size = "medium", className, ...props }: CheckboxGroupProps) {
  // KRDS .krds-check-area { gap: var(--krds-gap-6) } = 20px, flat on both axes and
  // both sizes — .chk-column only flips direction, it does not change the gap
  // (_form_check.scss:9-15). `size` is accepted for API symmetry with Radio but does
  // not affect the group gap.
  return (
    <div
      data-slot="krds-checkbox-group"
      className={cn("flex gap-5", column ? "flex-col" : "flex-row flex-wrap", className)}
      {...props}
    >
      {children}
    </div>
  )
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
}: CheckboxChipProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId

  const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultValue ?? false)
  const isControlled = checked !== undefined
  const currentChecked = isControlled ? checked : internalChecked

  // KRDS form-chip (ref _form_chip.scss): heights 40/48/56px, padding-x padding-4/5/6 = 10/12/16px,
  // gap 플랫 4px(--krds-form-chip--gap: gap-2), 폰트 label-small/medium/large = 15/17/19px.
  const sizeClass = {
    small: "h-10 gap-1 px-2.5 rounded-md text-krds-body-sm",
    medium: "h-12 gap-1 px-3 rounded-md text-krds-body-md",
    large: "h-14 gap-1 px-4 rounded-lg text-krds-body-lg",
  }[size]

  // KRDS check-size: small 12px, medium/large 16px(icon--size-small)
  const iconSize = size === "small" ? "size-3" : "size-4"

  return (
    <CheckboxPrimitive.Root
      id={inputId}
      name={name}
      value={value}
      disabled={disabled}
      checked={currentChecked}
      onCheckedChange={(checkedState) => {
        const val = checkedState === "indeterminate" ? false : (checkedState as boolean)
        if (!isControlled) setInternalChecked(val)
        onChange?.(val)
      }}
      data-slot="krds-checkbox-chip"
      className={cn(
        "focus-visible:krds-focus-ring inline-flex cursor-pointer items-center border transition-colors",
        // KRDS chip default 보더 = color-border-gray = gray-30 (_form_chip.scss:69)
        "bg-krds-surface border-krds-border text-krds-foreground",
        currentChecked && "bg-krds-surface-primary-subtle border-krds-border-primary text-krds-foreground-primary",
        // KRDS chip disabled: 채움 action-disabled=gray-20(고대비 gray-80), 텍스트 text-disabled-on=gray-50 (_form_chip.scss:65,68)
        disabled &&
          "bg-krds-gray-20 dark:bg-krds-gray-80 border-krds-border-light text-krds-gray-50 cursor-not-allowed",
        sizeClass,
        className
      )}
    >
      <CheckIcon
        className={cn(
          iconSize,
          "shrink-0",
          currentChecked ? "text-krds-foreground-primary" : "text-krds-foreground-disabled",
          disabled && "text-krds-gray-50"
        )}
        strokeWidth={currentChecked ? 2.2 : 1.8}
        aria-hidden="true"
      />
      {children}
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox, CheckboxGroup, CheckboxChip }
export type { CheckboxProps, CheckboxGroupProps, CheckboxChipProps, CheckboxSize, CheckboxChipSize }
