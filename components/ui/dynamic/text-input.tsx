"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  TextInput as KrdsTextInput,
  type TextInputProps,
  type TextInputSize
} from "@/components/ui/krds/(input)/text-input";
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
    ...rest
  } = props;
  void _size;

  const id = propId ?? generatedId;

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
        {...rest}
      />
    </div>
  );
}

export { TextInput };
export type { TextInputProps, TextInputSize };
