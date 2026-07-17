"use client"

import * as React from "react"
import { cn } from "@/lib/cn"
import { renderFieldMessage } from "@/components/ui/krds/(input)/field-message"

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "defaultValue"> & {
  onChange?: (value: string) => void
  label?: string
  showCount?: boolean
  countTotal?: number
  value?: string
  defaultValue?: string
  hint?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  information?: React.ReactNode
}

function Textarea({
  label,
  showCount = true,
  countTotal = 100,
  value,
  defaultValue,
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
}: TextareaProps) {
  const generatedId = React.useId()
  const id = propId ?? generatedId

  const [internal, setInternal] = React.useState(defaultValue ?? "")
  const current = value !== undefined ? value : internal
  const currentLength = current.length
  const isOverLimit = countTotal !== undefined && currentLength > countTotal
  const hasError = error != null && error !== false
  const invalid = ariaInvalid ?? (hasError || isOverLimit || undefined)

  const message = renderFieldMessage(id, { error, success, information, hint })
  const describedBy = message ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ") : ariaDescribedby
  const counter = showCount ? (
    <div className="text-krds-body-sm flex shrink-0 items-baseline gap-[2px] whitespace-nowrap">
      <span className={cn(isOverLimit ? "text-krds-foreground-danger" : "text-krds-foreground-primary")}>
        {currentLength}
      </span>
      <span className="text-krds-foreground-subtle">/{countTotal}</span>
    </div>
  ) : null

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value
    if (value === undefined) setInternal(v)
    onChange?.(v)
  }

  return (
    <div data-slot="krds-textarea" className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label htmlFor={id} className="text-krds-body-sm text-krds-foreground-subtle block">
          {label}
        </label>
      )}
      <div
        className={cn(
          "border-krds-border-dark bg-krds-surface h-36 rounded-[8px] border px-4 py-2 transition-colors",
          "focus-within:border-krds-border-primary focus-within:krds-focus-ring",
          // KRDS .is-error 는 2px 보더 (_input.scss:152-161) — 포커스 링 정책과 무관한 비포커스 상태 스펙
          "has-[textarea[aria-invalid=true]]:border-krds-danger-50 has-[textarea[aria-invalid=true]]:focus-within:border-krds-danger-50 has-[textarea[aria-invalid=true]]:border-2",
          disabled && "border-krds-border bg-krds-surface-disabled border",
          readOnly && !disabled && "border-krds-border bg-krds-surface-disabled border"
        )}
      >
        <textarea
          {...rest}
          id={id}
          value={current}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={handleChange}
          className={cn(
            // KRDS textarea는 large 라벨(body-lg 19px)을 상속하고, 텍스트 색은 text-subtle(gray-70) (_input.scss:42,75,98,142-151)
            "text-krds-body-lg text-krds-foreground-subtle h-full w-full resize-none rounded-[8px] bg-transparent outline-none",
            "placeholder:text-krds-foreground-disabled",
            // disabled 텍스트=text-disabled-on(gray-50, 라이트/고대비 동일값)
            disabled && "text-krds-gray-50 cursor-not-allowed",
            readOnly && !disabled && "text-krds-foreground-subtle"
          )}
        />
      </div>
      {message && counter ? (
        // textarea-bottom: message left, counter right on a single row.
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
  )
}

export { Textarea }
export type { TextareaProps }
