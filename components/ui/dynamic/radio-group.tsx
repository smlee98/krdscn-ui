"use client";

import * as React from "react";
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Radio as KrdsRadio,
  RadioChip as KrdsRadioChip,
  RadioGroup as KrdsRadioGroup,
  RadioGroupContext,
  RadioSort as KrdsRadioSort,
  type RadioChipProps,
  type RadioChipSize,
  type RadioGroupProps,
  type RadioProps,
  type RadioSize,
  type RadioSortProps
} from "@/components/ui/krds/(selection)/radio-group";
import { useUISystem } from "@/lib/ui-system";

// KRDS subparts (Radio/RadioChip/RadioSort) consume KRDS's RadioGroupContext.
// On the shadcn branch we still provide that context so KRDS-only siblings keep
// working, but the visual shell of <Radio> swaps to shadcn's RadioGroupItem.

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  name,
  size = "large",
  children,
  className,
  column = true
}: RadioGroupProps) {
  const system = useUISystem();
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);

  if (system === "krds") {
    return (
      <KrdsRadioGroup
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
        size={size}
        className={className}
        column={column}
      >
        {children}
      </KrdsRadioGroup>
    );
  }

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (v: string) => {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  };

  const layout = column ? "flex flex-col gap-3" : "flex flex-row flex-wrap gap-2";

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onChange: handleChange, name }}>
      <ShadcnRadioGroup
        value={currentValue}
        onValueChange={handleChange}
        className={[layout, className].filter(Boolean).join(" ")}
      >
        {children}
      </ShadcnRadioGroup>
    </RadioGroupContext.Provider>
  );
}

export function Radio({ size = "medium", description, value, children, disabled, className, ...rest }: RadioProps) {
  const system = useUISystem();
  const autoId = React.useId();
  const ctx = React.useContext(RadioGroupContext);

  if (system === "krds") {
    return (
      <KrdsRadio
        size={size}
        description={description}
        value={value}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </KrdsRadio>
    );
  }

  void rest;
  void size;

  if (!ctx) throw new Error("Radio must be used inside <RadioGroup>");
  const id = `${ctx.name}-${autoId}`;
  const hasDescription = Boolean(description);

  // Alignment: a single-line label centers against the size-4 control
  // (items-center, no top-margin hack). With a description the block is
  // multi-line, so top-align the control to the first label line (items-start).
  // The previous `mt-1` pushed the control ~4px below the text center.
  return (
    <div
      className={[
        "flex gap-2",
        hasDescription ? "items-start" : "items-center",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <RadioGroupItem id={id} value={value} disabled={disabled} />
      <label
        htmlFor={id}
        className={["flex flex-col gap-1", disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"].join(" ")}
      >
        {children && <span className="text-sm leading-none font-medium">{children}</span>}
        {description && <span className="text-muted-foreground text-sm">{description}</span>}
      </label>
    </div>
  );
}

// KRDS-only subparts — shadcn has no equivalent; render via KRDS in both modes.
// They rely on the RadioGroupContext that our dispatcher RadioGroup provides.
export function RadioChip(props: RadioChipProps) {
  return <KrdsRadioChip {...props} />;
}

export function RadioSort(props: RadioSortProps) {
  return <KrdsRadioSort {...props} />;
}

export type { RadioChipProps, RadioChipSize, RadioGroupProps, RadioProps, RadioSize, RadioSortProps };
