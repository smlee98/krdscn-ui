"use client"

import * as React from "react"
import { useId } from "react"

import { Switch } from "@/components/ui/switch"
import { ToggleSwitch as KrdsToggleSwitch, type ToggleSwitchSize } from "@/components/ui/krds/(selection)/toggle-switch"
import { useUISystem } from "@/lib/ui-system"
import { cn } from "@/lib/cn"

export type { ToggleSwitchSize }

type ToggleSwitchProps = Omit<React.ComponentProps<"span">, "id"> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: ToggleSwitchSize
  label?: string
  disabled?: boolean
  id?: string
}

const SIZE_WRAPPER: Record<ToggleSwitchSize, string> = {
  medium: "h-6",
  large: "h-7",
}

export function ToggleSwitch({
  size = "medium",
  label,
  disabled,
  id: idProp,
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: ToggleSwitchProps) {
  const system = useUISystem()
  const generatedId = useId()
  const id = idProp ?? generatedId

  if (system === "krds") {
    return (
      <KrdsToggleSwitch
        size={size}
        label={label}
        disabled={disabled}
        id={idProp}
        className={className}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        {...props}
      />
    )
  }

  return (
    <span
      data-slot="toggle-switch"
      className={cn("inline-flex items-center gap-2", SIZE_WRAPPER[size], className)}
      {...props}
    >
      <Switch
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn("cursor-pointer text-sm leading-none select-none", disabled && "cursor-not-allowed opacity-50")}
        >
          {label}
        </label>
      )}
    </span>
  )
}
