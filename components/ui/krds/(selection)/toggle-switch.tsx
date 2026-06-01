"use client";

import * as React from "react";
import { useId } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/cn";

type ToggleSwitchSize = "medium" | "large";

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
  );
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
  );
}

const sizeConfig: Record<
  ToggleSwitchSize,
  { track: string; thumb: string; iconSize: string; label: string; translate: string }
> = {
  medium: {
    track: "w-8 h-5",
    thumb: "size-4",
    iconSize: "size-2",
    label: "text-krds-body-md",
    translate: "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-3"
  },
  large: {
    track: "w-10 h-6",
    thumb: "size-5",
    iconSize: "size-2.5",
    label: "text-krds-body-lg",
    translate: "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-4"
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
  const sz = sizeConfig[size];

  return (
    <span
      data-slot="krds-toggle-switch"
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className={cn(
          "group inline-flex shrink-0 cursor-pointer rounded-full p-0.5 transition-colors",
          "bg-krds-gray-50 data-[state=checked]:bg-krds-primary-50",
          "data-[disabled]:cursor-not-allowed data-[disabled]:bg-krds-gray-20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2",
          sz.track
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "flex items-center justify-center rounded-full bg-white shadow-sm transition-transform",
            "group-data-[disabled]:bg-krds-gray-40",
            sz.thumb,
            sz.translate
          )}
        >
          {/* X icon — visible when unchecked */}
          <span
            className={cn(
              "group-data-[state=unchecked]:block group-data-[state=checked]:hidden",
              "text-krds-gray-50 group-data-[disabled]:text-white"
            )}
          >
            <XIcon className={sz.iconSize} />
          </span>
          {/* Check icon — visible when checked */}
          <span
            className={cn(
              "group-data-[state=unchecked]:hidden group-data-[state=checked]:block",
              "text-krds-primary-50 group-data-[disabled]:text-white"
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
            "cursor-pointer select-none leading-[1.5] text-krds-gray-90",
            sz.label,
            disabled && "cursor-not-allowed text-krds-fg-disabled"
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
