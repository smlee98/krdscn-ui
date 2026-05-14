"use client";

import * as React from "react";
import { useId } from "react";

import { cn } from "@/lib/cn";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";

type ToggleSwitchSize = "medium" | "large";

const sizeClasses: Record<ToggleSwitchSize, { track: string; thumb: string }> = {
  medium: {
    track: "w-8 h-4",
    thumb:
      "[&>span]:size-3 [&>span]:data-[state=checked]:translate-x-[1.125rem] [&>span]:data-[state=unchecked]:translate-x-0.5"
  },
  large: {
    track: "w-10 h-5",
    thumb:
      "[&>span]:size-4 [&>span]:data-[state=checked]:translate-x-[1.375rem] [&>span]:data-[state=unchecked]:translate-x-0.5"
  }
};

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
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: ToggleSwitchSize;
  label?: string;
  disabled?: boolean;
  id?: string;
}) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const sz = sizeClasses[size];

  return (
    <span
      data-slot="krds-toggle-switch"
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <ShadcnSwitch
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={cn(
          sz.track,
          "rounded-full border-0 shadow-none",
          "bg-krds-gray-50 data-[state=checked]:bg-krds-primary-50",
          "disabled:bg-krds-gray-20",
          "[&>span]:rounded-full [&>span]:bg-white",
          sz.thumb
        )}
      />
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-krds-gray-90 cursor-pointer text-sm leading-none select-none",
            disabled && "text-krds-gray-30 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
    </span>
  );
}

export { ToggleSwitch };
export type { ToggleSwitchSize };
