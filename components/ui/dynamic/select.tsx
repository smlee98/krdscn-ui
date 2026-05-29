"use client";

import * as React from "react";
import {
  Select as ShadcnSelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Select as KrdsSelect,
  type SelectProps,
  type SelectOption,
  type SelectSize,
  type SelectVariant
} from "@/components/ui/krds/(selection)/select";
import { useUISystem } from "@/lib/ui-system";

// KRDS is data-driven (options array). shadcn is a compound (Trigger/Content/Item).
// On the shadcn branch the dispatcher constructs the compound from `options`
// internally so the KRDS-shape examples continue to work.

const SHADCN_TRIGGER_SIZE: Record<SelectSize, "sm" | "default"> = {
  small: "sm",
  medium: "default",
  large: "default"
};

const SHADCN_HEIGHT: Record<SelectSize, string> = {
  small: "",
  medium: "h-12",
  large: "h-14 text-[19px]"
};

export function Select(props: SelectProps) {
  const system = useUISystem();
  const autoId = React.useId();

  if (system === "krds") return <KrdsSelect {...props} />;

  const {
    options,
    label,
    size = "large",
    variant: _variant,
    disabled,
    placeholder = "선택",
    value,
    defaultValue,
    onChange,
    id,
    name: _name,
    className,
    selectClassName,
    "aria-invalid": ariaInvalid
  } = props;
  void _variant;
  void _name;

  const triggerId = id ?? autoId;

  return (
    <div className={["flex w-full flex-col gap-2", className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={triggerId} className="text-sm leading-none font-medium">
          {label}
        </label>
      )}
      <ShadcnSelectRoot value={value} defaultValue={defaultValue} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={triggerId}
          size={SHADCN_TRIGGER_SIZE[size]}
          aria-invalid={ariaInvalid}
          className={[SHADCN_HEIGHT[size], selectClassName].filter(Boolean).join(" ")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: SelectOption) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelectRoot>
    </div>
  );
}

export type { SelectProps, SelectOption, SelectSize, SelectVariant };
