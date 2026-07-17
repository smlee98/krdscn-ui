"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { renderFieldMessage } from "@/registry/krds/ui/field-message"

function IconDelete({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <rect width="20" height="20" rx="10" fill="#CDD1D5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.06491 4.93451C5.75249 4.62209 5.24595 4.62209 4.93353 4.93451C4.62112 5.24693 4.62112 5.75346 4.93353 6.06588L8.86863 10.001L4.9351 13.9345C4.62268 14.2469 4.62268 14.7535 4.9351 15.0659C5.24752 15.3783 5.75405 15.3783 6.06647 15.0659L10 11.1323L13.9335 15.0659C14.246 15.3783 14.7525 15.3783 15.0649 15.0659C15.3773 14.7535 15.3773 14.2469 15.0649 13.9345L11.1314 10.001L15.0665 6.06588C15.3789 5.75346 15.3789 5.24693 15.0665 4.93451C14.754 4.62209 14.2475 4.62209 13.9351 4.93451L10 8.86961L6.06491 4.93451Z"
        fill="#33363D"
      />
    </svg>
  )
}

type TextInputSize = "small" | "medium" | "large"

type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "size"
> & {
  onChange?: (value: string) => void
  label?: string
  size?: TextInputSize
  value?: string
  defaultValue?: string
  showPasswordToggle?: boolean
  showClearButton?: boolean
  hint?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  information?: React.ReactNode
}

const sizeBox: Record<TextInputSize, string> = {
  small: "h-10 rounded-[6px] px-4",
  medium: "h-12 rounded-[6px] px-4",
  large: "h-14 rounded-[8px] px-4",
}

const sizeText: Record<TextInputSize, string> = {
  small: "text-krds-body-sm",
  medium: "text-krds-body-md",
  large: "text-krds-body-lg",
}

const sizeIcon: Record<TextInputSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6",
}

// KRDS .krds-input radius (small/medium = radius medium1/2 = 6px, large = medium3 = 8px).
// Mirrors the wrapper radius onto the focusable control so the focus ring corner matches KRDS.
const sizeInputRadius: Record<TextInputSize, string> = {
  small: "rounded-[6px]",
  medium: "rounded-[6px]",
  large: "rounded-[8px]",
}

function TextInput({
  label,
  size = "large",
  value,
  defaultValue,
  onChange,
  showPasswordToggle = false,
  showClearButton = false,
  className,
  type,
  disabled,
  readOnly,
  id: propId,
  hint,
  error,
  success,
  information,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  ...rest
}: TextInputProps) {
  const generatedId = React.useId()
  const id = propId ?? generatedId

  const message = renderFieldMessage(id, { error, success, information, hint })
  const describedBy = message ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ") : ariaDescribedby
  const resolvedInvalid = ariaInvalid ?? (error != null && error !== false ? true : undefined)

  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const [visible, setVisible] = React.useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internal

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    if (!isControlled) setInternal(v)
    onChange?.(v)
  }

  function handleClear() {
    if (!isControlled) setInternal("")
    onChange?.("")
  }

  const showClear = showClearButton && Boolean(currentValue) && !disabled && !readOnly
  const showToggle = showPasswordToggle && type === "password"

  const resolvedType = showToggle && visible ? "text" : type

  return (
    <div data-slot="krds-text-input" className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-krds-body-sm text-krds-foreground-subtle block">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center gap-2 transition-colors",
          sizeBox[size],
          "border-krds-border-dark bg-krds-surface border",
          "focus-within:border-krds-border-primary focus-within:krds-focus-ring",
          // KRDS .is-error 는 2px 보더 (_input.scss:152-161) — 포커스 링 정책과 무관한 비포커스 상태 스펙
          "has-[input[aria-invalid=true]]:border-krds-danger-50 has-[input[aria-invalid=true]]:focus-within:border-krds-danger-50 has-[input[aria-invalid=true]]:border-2",
          disabled && "border-krds-border bg-krds-surface-disabled border",
          readOnly && !disabled && "border-krds-border bg-krds-surface-disabled border"
        )}
      >
        <input
          {...rest}
          id={id}
          type={resolvedType}
          value={currentValue}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={resolvedInvalid}
          aria-describedby={describedBy}
          onChange={handleChange}
          className={cn(
            "h-full flex-1 bg-transparent leading-[1.5] outline-none",
            "placeholder:text-krds-foreground-disabled",
            // KRDS 입력 텍스트 색 = text-subtle(gray-70), gray-90(foreground) 아님 (_input.scss:75,98)
            "text-krds-foreground-subtle",
            sizeInputRadius[size],
            sizeText[size],
            // disabled 텍스트=text-disabled-on(gray-50, 라이트/고대비 동일값)
            disabled && "text-krds-gray-50 cursor-not-allowed",
            readOnly && !disabled && "text-krds-foreground-subtle"
          )}
        />

        {showClear && (
          <button
            type="button"
            aria-label="내용 삭제"
            onClick={handleClear}
            className="text-krds-foreground focus-visible:krds-focus-ring inline-flex shrink-0 items-center justify-center rounded-full"
          >
            <IconDelete className={sizeIcon[size]} />
          </button>
        )}

        {showToggle && (
          <button
            type="button"
            aria-label={visible ? "비밀번호 가리기" : "비밀번호 보기"}
            onClick={() => setVisible((v) => !v)}
            className="text-krds-foreground focus-visible:krds-focus-ring inline-flex shrink-0 items-center justify-center rounded-md"
          >
            {visible ? <EyeOff className={sizeIcon[size]} /> : <Eye className={sizeIcon[size]} />}
          </button>
        )}
      </div>

      {message}
    </div>
  )
}

export { TextInput }
export type { TextInputProps, TextInputSize }
