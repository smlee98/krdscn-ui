"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import * as Krds from "@/components/ui/krds/(selection)/checkbox";
import * as Shadcn from "@/components/ui/checkbox";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxChipProps,
  CheckboxSize,
  CheckboxChipSize
} from "@/components/ui/krds/(selection)/checkbox";

export function Checkbox({
  label,
  description,
  size,
  defaultValue,
  value,
  onChange,
  checked,
  indeterminate,
  disabled,
  id,
  name,
  className,
  children,
  ...rest
}: Krds.CheckboxProps) {
  const system = useUISystem();
  const autoId = React.useId();

  if (system === "krds") {
    return (
      <Krds.Checkbox
        label={label}
        description={description}
        size={size}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        id={id}
        name={name}
        className={className}
        {...rest}
      >
        {children}
      </Krds.Checkbox>
    );
  }

  // shadcn path — bridge KRDS semantics to Radix/shadcn props.
  // `value`/`onChange(bool)` → `checked`/`onCheckedChange(CheckedState)`.
  // `defaultValue` → `defaultChecked`.
  // `size` has no shadcn equivalent — omitted (visual sizing not applied).
  // `indeterminate` is forwarded via Radix's `checked="indeterminate"`.
  // `...rest` is intentionally NOT spread: it carries HTMLInputElement event
  // handlers which are incompatible with Radix's button-based Checkbox root.
  void rest;
  const inputId = id ?? autoId;

  const checkedValue: boolean | "indeterminate" | undefined = indeterminate
    ? "indeterminate"
    : checked !== undefined
      ? checked
      : undefined;

  const handleCheckedChange = (state: boolean | "indeterminate") => {
    onChange?.(state === true);
  };

  const labelNode = label ?? children;

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Shadcn.Checkbox
          id={inputId}
          name={name}
          checked={checkedValue}
          defaultChecked={defaultValue}
          disabled={disabled}
          onCheckedChange={handleCheckedChange}
        />
        {labelNode && (
          <label
            htmlFor={inputId}
            className="cursor-pointer text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {labelNode}
          </label>
        )}
      </div>
      {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
    </div>
  );
}

// CheckboxGroup is layout-only (flex + gap, no KRDS visual chrome), so the KRDS
// implementation is reused in both modes.
export function CheckboxGroup(props: Krds.CheckboxGroupProps) {
  return <Krds.CheckboxGroup {...props} />;
}

// shadcn has no chip primitive. In shadcn mode we render a toggle-styled chip
// using shadcn tokens (mirrors the Toggle `outline` aesthetic) so the checked
// state reads as shadcn — not the KRDS primary-5/primary-50 fill.
const SHADCN_CHIP_SIZE: Record<Krds.CheckboxChipSize, string> = {
  small: "h-7 gap-1.5 px-3 text-xs",
  medium: "h-8 gap-1.5 px-3 text-sm",
  large: "h-10 gap-2 px-4 text-base"
};

const SHADCN_CHIP_ICON: Record<Krds.CheckboxChipSize, string> = {
  small: "size-3",
  medium: "size-3.5",
  large: "size-4"
};

function ShadcnCheckboxChip({
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
}: Krds.CheckboxChipProps) {
  void rest;
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const [internalChecked, setInternalChecked] = React.useState<boolean>(defaultValue ?? false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  return (
    <label
      htmlFor={inputId}
      data-slot="shadcn-checkbox-chip"
      className={cn("inline-flex", disabled ? "cursor-not-allowed" : "cursor-pointer")}
    >
      <input
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
          "inline-flex items-center justify-center rounded-md border border-input bg-transparent font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          currentChecked && "border-primary bg-accent text-accent-foreground",
          disabled && "pointer-events-none opacity-50",
          SHADCN_CHIP_SIZE[size],
          className
        )}
      >
        {currentChecked && <CheckIcon className={cn(SHADCN_CHIP_ICON[size], "shrink-0")} aria-hidden="true" />}
        {children}
      </span>
    </label>
  );
}

export function CheckboxChip(props: Krds.CheckboxChipProps) {
  const system = useUISystem();
  if (system === "krds") return <Krds.CheckboxChip {...props} />;
  return <ShadcnCheckboxChip {...props} />;
}
