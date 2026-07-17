// rsc:client
"use client"

import * as React from "react"
import { useId } from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ToggleSwitchSize = "medium" | "large"

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="4" y1="4" x2="12" y2="12" />
      <line x1="12" y1="4" x2="4" y2="12" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="3,8 7,12 13,4" />
    </svg>
  )
}

const sizeConfig: Record<
  ToggleSwitchSize,
  { track: string; thumb: string; iconSize: string; label: string; translate: string }
> = {
  medium: {
    // KRDS thumb = full track height, no track padding (_switch.scss:9,18,100-106).
    // translate = track width(32px) − thumb width(20px) = 12px = translate-x-3.
    track: "w-8 h-5",
    thumb: "size-5",
    iconSize: "size-2",
    label: "text-krds-body-md",
    translate: "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-3",
  },
  large: {
    // translate = track width(40px) − thumb width(24px) = 16px = translate-x-4.
    track: "w-10 h-6",
    thumb: "size-6",
    iconSize: "size-2.5",
    label: "text-krds-body-lg",
    translate: "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-4",
  },
}

function ToggleSwitch({
  size = "medium",
  label,
  disabled,
  id: idProp,
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: Omit<React.ComponentProps<"span">, "id"> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: ToggleSwitchSize
  label?: string
  disabled?: boolean
  id?: string
}) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const sz = sizeConfig[size]

  return (
    <span data-slot="krds-toggle-switch" className={cn("inline-flex items-center gap-2", className)} {...props}>
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={cn(
          // KRDS 트랙에는 패딩이 없다 — thumb이 트랙과 동일한 높이로 꽉 찬다 (_switch.scss:100-106).
          "group inline-flex shrink-0 cursor-pointer rounded-full transition-colors",
          "bg-krds-gray-50 data-[state=checked]:bg-krds-primary-50",
          // KRDS :disabled 는 checked 여부와 무관하게 트랙=element-disabled-light(gray-20)
          // (_switch.scss:175-183) — 복합 변형으로 checked 배경보다 항상 우선시킨다.
          "data-[disabled]:bg-krds-surface-disabled data-[disabled]:data-[state=checked]:bg-krds-surface-disabled data-[disabled]:cursor-not-allowed",
          "focus-visible:krds-focus-ring",
          sz.track
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            // thumb border는 트랙과 동일한 상태색을 따름: off=gray-50, on=primary-50, disabled=surface-disabled
            // (_switch.scss:18,147,166 — check-color-border = button-color-background 체인).
            "flex items-center justify-center rounded-full border-2 bg-white shadow-sm transition-transform",
            "border-krds-gray-50 group-data-[state=checked]:border-krds-primary-50",
            "group-data-[disabled]:border-krds-surface-disabled group-data-[disabled]:group-data-[state=checked]:border-krds-surface-disabled group-data-[disabled]:bg-krds-gray-40",
            sz.thumb,
            sz.translate
          )}
        >
          {/* X icon — visible when unchecked */}
          <span
            className={cn(
              "group-data-[state=checked]:hidden group-data-[state=unchecked]:block",
              "text-krds-foreground-disabled group-data-[disabled]:text-white"
            )}
          >
            <XIcon className={sz.iconSize} />
          </span>
          {/* Check icon — visible when checked */}
          <span
            className={cn(
              "group-data-[state=checked]:block group-data-[state=unchecked]:hidden",
              "text-krds-foreground-primary group-data-[disabled]:text-white"
            )}
          >
            <CheckIcon className={sz.iconSize} />
          </span>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-krds-foreground cursor-pointer leading-[1.5] select-none",
            sz.label,
            disabled && "text-krds-foreground-disabled cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
    </span>
  )
}

export { ToggleSwitch }
export type { ToggleSwitchSize }
