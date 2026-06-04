"use client";

import * as React from "react";
import { Textarea as ShadcnTextarea } from "@/components/ui/textarea";
import {
  Textarea as KrdsTextarea,
  type TextareaProps as KrdsTextareaProps
} from "@/components/ui/krds/(input)/textarea";
import { renderFieldMessage } from "@/components/ui/krds/(input)/field-message";
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
    id: propId,
    hint,
    error,
    success,
    information,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props;
  void _defaultValue;

  const generatedId = React.useId();
  const id = propId ?? generatedId;

  const current = value !== undefined ? value : internal;
  const currentLength = current.length;
  const isOverLimit = showCount && countTotal !== undefined && currentLength > countTotal;
  const hasError = error != null && error !== false;

  const message = renderFieldMessage(id, { error, success, information, hint });
  const describedBy = message ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ") : ariaDescribedby;
  const counter = showCount ? (
    <div className="flex shrink-0 items-baseline gap-[2px] text-krds-body-sm whitespace-nowrap">
      <span className={isOverLimit ? "text-destructive" : "text-primary"}>{currentLength}</span>
      <span className="text-muted-foreground">/{countTotal}</span>
    </div>
  ) : null;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  }

  return (
    <div data-slot="dynamic-textarea" className={["flex w-full flex-col gap-2", className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={id} className="block text-sm leading-none font-medium">
          {label}
        </label>
      )}
      <ShadcnTextarea
        {...rest}
        id={id}
        value={current}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-invalid={ariaInvalid ?? (hasError || isOverLimit ? true : undefined)}
        aria-describedby={describedBy}
        onChange={handleChange}
      />
      {message && counter ? (
        <div className="flex w-full items-start justify-between gap-2">
          {message}
          {counter}
        </div>
      ) : (
        <>
          {message}
          {counter && <div className="flex w-full justify-end">{counter}</div>}
        </>
      )}
    </div>
  );
}
