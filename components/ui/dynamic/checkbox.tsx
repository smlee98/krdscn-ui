"use client";

import * as React from "react";
import * as Krds from "@/components/ui/krds/(selection)/checkbox";
import * as Shadcn from "@/components/ui/checkbox";
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

// KRDS-only subparts — shadcn has no equivalent; rendered via KRDS in all modes.
export function CheckboxGroup(props: Krds.CheckboxGroupProps) {
  return <Krds.CheckboxGroup {...props} />;
}

export function CheckboxChip(props: Krds.CheckboxChipProps) {
  return <Krds.CheckboxChip {...props} />;
}
