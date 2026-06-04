"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  TextInput as KrdsTextInput,
  type TextInputProps,
  type TextInputSize
} from "@/components/ui/krds/(input)/text-input";
import { renderFieldMessage } from "@/components/ui/krds/(input)/field-message";
import { useUISystem } from "@/lib/ui-system";

// shadcn fallback: label rendered above the Input using shadcn tokens.
// showClearButton/showPasswordToggle have no shadcn-side implementation (v1).
// `size` is dropped on the shadcn branch — the vanilla Input has a single native
// height (h-9); we do not scale it up to the KRDS height ladder (see
// feedback-shadcn-uses-native-size).

function TextInput(props: TextInputProps) {
  const system = useUISystem();
  const generatedId = React.useId();

  if (system === "krds") return <KrdsTextInput {...props} />;

  const {
    label,
    size: _size,
    value,
    defaultValue,
    onChange,
    showClearButton: _showClearButton,
    showPasswordToggle: _showPasswordToggle,
    className,
    id: propId,
    hint,
    error,
    success,
    information,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props;
  void _size;

  const id = propId ?? generatedId;

  const message = renderFieldMessage(id, { error, success, information, hint });
  const describedBy = message ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ") : ariaDescribedby;
  const resolvedInvalid = ariaInvalid ?? (error != null && error !== false ? true : undefined);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-foreground text-sm leading-none font-medium">
          {label}
        </label>
      )}
      <Input
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={className}
        aria-invalid={resolvedInvalid}
        aria-describedby={describedBy}
        {...rest}
      />
      {message}
    </div>
  );
}

export { TextInput };
export type { TextInputProps, TextInputSize };
