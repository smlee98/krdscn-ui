"use client";

import * as React from "react";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import {
  Textarea as KrdsTextarea,
  type TextareaProps as KrdsTextareaProps
} from "@/components/ui/krds/(input)/textarea";
import { useUISystem } from "@/lib/ui-system";

export type TextareaProps = KrdsTextareaProps;

export function Textarea(props: TextareaProps) {
  const system = useUISystem();
  const [internal, setInternal] = React.useState(props.defaultValue ?? "");
  if (system === "krds") return <KrdsTextarea {...props} />;

  // shadcn branch — bridge KRDS-only props
  const {
    label,
    showCount,
    countTotal = 100,
    value,
    defaultValue: _defaultValue,
    onChange,
    className,
    maxLength,
    disabled,
    readOnly,
    placeholder,
    "aria-invalid": ariaInvalid,
    ...rest
  } = props;
  void _defaultValue;

  const current = value !== undefined ? value : internal;
  const currentLength = current.length;
  const isOverLimit = showCount && countTotal !== undefined && currentLength > countTotal;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <div data-slot="dynamic-textarea" className={["flex w-full flex-col gap-2", className].filter(Boolean).join(" ")}>
      {label && <label className="block text-sm leading-none font-medium">{label}</label>}
      <ShadcnTextarea
        {...rest}
        value={current}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-invalid={ariaInvalid ?? (isOverLimit ? true : undefined)}
        onChange={handleChange}
      />
      {showCount && (
        <div className="flex w-full justify-end">
          <div className="flex shrink-0 items-baseline gap-[2px] text-[15px] leading-[1.5] whitespace-nowrap">
            <span className={isOverLimit ? "text-destructive" : "text-primary"}>{currentLength}</span>
            <span className="text-muted-foreground">/{countTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}
