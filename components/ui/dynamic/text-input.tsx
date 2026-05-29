"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  TextInput as KrdsTextInput,
  type TextInputProps,
  type TextInputSize
} from "@/components/ui/krds/(input)/text-input";
import { useUISystem } from "@/lib/ui-system";

// shadcn fallback: label is rendered above the Input.
// showClearButton and showPasswordToggle are not implemented on the shadcn side (v1).
// size maps to a wrapper className: small=h-10, medium=h-12, large=h-14.

const SIZE_HEIGHT: Record<TextInputSize, string> = {
  small: "h-10",
  medium: "h-12",
  large: "h-14"
};

function TextInput(props: TextInputProps) {
  const system = useUISystem();
  const generatedId = React.useId();

  if (system === "krds") return <KrdsTextInput {...props} />;

  const {
    label,
    size = "large",
    value,
    defaultValue,
    onChange,
    showClearButton: _showClearButton,
    showPasswordToggle: _showPasswordToggle,
    className,
    id: propId,
    ...rest
  } = props;

  const id = propId ?? generatedId;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className="block text-[15px] leading-[1.5] text-[#464c53]">
          {label}
        </label>
      )}
      <Input
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className={`${SIZE_HEIGHT[size]} ${className ?? ""}`.trim()}
        {...rest}
      />
    </div>
  );
}

export { TextInput };
export type { TextInputProps, TextInputSize };
