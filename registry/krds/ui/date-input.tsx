// rsc:client
"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { Popover as PopoverPrimitive } from "radix-ui"
import { Calendar, type CalendarPosition, type CalendarProps } from "@/registry/krds/ui/calendar"
import { cn } from "@/lib/utils"
import { renderFieldMessage, type FieldMessages } from "@/registry/krds/ui/field-message"

export type DateInputSize = "small" | "medium" | "large"

// The trigger renders a <button>, so the base prop type extends button attributes
// (contract §6: prop type must match the rendered element). Calendar configuration
// is folded into a single typed `calendarProps` passthrough rather than drilling
// each Calendar axis as a top-level prop — no consumer configures the calendar, so
// the few first-class axes (value/open/size/position) stay top-level while the rest
// forward through `calendarProps`.
export type DateInputProps = Omit<React.ComponentProps<"button">, "value" | "type" | "children"> &
  FieldMessages & {
    label?: string
    size?: DateInputSize
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    readOnly?: boolean
    isCalendarOpen?: boolean
    defaultIsCalendarOpen?: boolean
    onCalendarOpenChange?: (isOpen: boolean) => void
    calendarPosition?: CalendarPosition
    openButtonLabel?: string
    placeholder?: string
    calendarProps?: Partial<CalendarProps>
  }

const sizeBox: Record<DateInputSize, string> = {
  small: "h-10 px-4 rounded-[6px] text-krds-body-sm",
  medium: "h-12 px-4 rounded-[6px] text-krds-body-md",
  large: "h-14 px-4 rounded-[8px] text-krds-body-lg",
}

const sizeIcon: Record<DateInputSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6",
}

function DateInput({
  label,
  size = "large",
  value,
  defaultValue,
  onValueChange,
  readOnly = false,
  isCalendarOpen,
  defaultIsCalendarOpen = false,
  onCalendarOpenChange,
  calendarPosition = "bottom",
  openButtonLabel = "달력 열기",
  placeholder = "YYYY.MM.DD",
  calendarProps,
  className,
  disabled,
  id: propId,
  hint,
  error,
  success,
  information,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  "aria-labelledby": ariaLabelledby,
  ...rest
}: DateInputProps) {
  const generatedId = React.useId()
  const id = propId ?? generatedId
  const labelId = `${id}-label`

  const isOpenControlled = isCalendarOpen !== undefined
  const isValueControlled = value !== undefined

  const [internalOpen, setInternalOpen] = React.useState(defaultIsCalendarOpen)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")

  const open = isOpenControlled ? isCalendarOpen : internalOpen
  const displayValue = isValueControlled ? value : internalValue

  const message = renderFieldMessage(id, { error, success, information, hint })
  const describedBy = message ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ") : ariaDescribedby
  const labelledBy = label ? [ariaLabelledby, labelId].filter(Boolean).join(" ") : ariaLabelledby
  const invalid = ariaInvalid ?? (error != null && error !== false ? true : undefined)

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setInternalOpen(next)
    onCalendarOpenChange?.(next)
  }

  function handleValueChange(next: string) {
    if (!isValueControlled) setInternalValue(next)
    onValueChange?.(next)
    handleOpenChange(false)
  }

  // The field is a read-only trigger button: clicking anywhere on it opens the
  // calendar (better UX than only the small icon being clickable). Direct typing
  // is intentionally removed — the value is set via the calendar. Validity is
  // conveyed by `data-invalid` (styling) plus the role="alert" field message linked
  // via aria-describedby; aria-invalid/aria-readonly are not valid on a button role.
  return (
    <div data-slot="krds-date-input" className={cn("flex flex-col", className)}>
      {label && (
        <label id={labelId} className="text-krds-body-sm text-krds-foreground-subtle mb-2 block">
          {label}
        </label>
      )}

      <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        <PopoverPrimitive.Trigger asChild>
          <button
            {...rest}
            type="button"
            id={id}
            data-slot="krds-date-input-trigger"
            data-invalid={invalid || undefined}
            aria-label={label ? undefined : openButtonLabel}
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            disabled={disabled || readOnly}
            className={cn(
              "border-krds-border-dark bg-krds-surface relative flex w-full items-center border text-left transition-colors outline-none",
              "focus:border-krds-border-primary focus-visible:krds-focus-ring",
              "data-[invalid=true]:border-krds-danger-50 data-[invalid=true]:focus:border-krds-danger-50",
              disabled && "border-krds-border bg-krds-surface-disabled cursor-not-allowed",
              readOnly && !disabled && "cursor-default",
              !disabled && !readOnly && "cursor-pointer",
              sizeBox[size],
              "pr-10"
            )}
          >
            <span
              className={cn(
                "flex-1 truncate",
                displayValue ? "text-krds-foreground" : "text-krds-foreground-disabled",
                // disabled 텍스트=text-disabled-on(gray-50, 라이트/고대비 동일값)
                disabled && "text-krds-gray-50"
              )}
            >
              {displayValue || placeholder}
            </span>
            <span className="text-krds-foreground-subtle absolute right-4 flex items-center justify-center">
              <CalendarIcon className={sizeIcon[size]} />
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            data-slot="krds-date-input-calendar"
            align="start"
            side={calendarPosition}
            className={cn(
              "w-auto border-0 bg-transparent p-0 shadow-none",
              "z-50 origin-(--radix-popover-content-transform-origin) outline-hidden",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
              "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <Calendar
              // KRDS date-input 팝오버의 확정 버튼 원문은 "확인" (단독 Calendar 기본 "선택"과 다름)
              confirmButtonText="확인"
              {...calendarProps}
              mode="single"
              position={calendarPosition}
              value={displayValue || undefined}
              onChange={handleValueChange}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {message && <div className="mt-2">{message}</div>}
    </div>
  )
}

export type DateInputUnitProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  label?: string
  size?: DateInputSize
  yearLabel?: string
  monthLabel?: string
  dayLabel?: string
  yearValue?: string
  monthValue?: string
  dayValue?: string
  yearPlaceholder?: string
  monthPlaceholder?: string
  dayPlaceholder?: string
  onYearChange?: (v: string) => void
  onMonthChange?: (v: string) => void
  onDayChange?: (v: string) => void
  disabled?: boolean
}

function DateInputUnit({
  label,
  size = "large",
  yearLabel = "년도",
  monthLabel = "월",
  dayLabel = "일",
  yearValue = "",
  monthValue = "",
  dayValue = "",
  yearPlaceholder = "YYYY",
  monthPlaceholder = "MM",
  dayPlaceholder = "DD",
  onYearChange,
  onMonthChange,
  onDayChange,
  disabled,
  "aria-invalid": ariaInvalid,
  className,
  ...rest
}: DateInputUnitProps) {
  const inputCls = cn(
    "border border-krds-border-dark bg-krds-surface transition-colors",
    "focus-within:border-krds-border-primary focus-within:krds-focus-ring",
    "has-[input[aria-invalid=true]]:border-krds-danger-50 has-[input[aria-invalid=true]]:focus-within:border-krds-danger-50",
    disabled && "border border-krds-border bg-krds-surface-disabled",
    sizeBox[size]
  )

  const fieldCls = cn(
    "text-krds-foreground placeholder:text-krds-foreground-disabled w-full bg-transparent outline-none",
    // disabled 텍스트=text-disabled-on(gray-50, 라이트/고대비 동일값)
    disabled && "text-krds-gray-50 cursor-not-allowed"
  )

  return (
    <div data-slot="krds-date-input-unit" className={cn("flex flex-col", className)} {...rest}>
      {label && <label className="text-krds-body-sm text-krds-foreground-subtle mb-2 block">{label}</label>}
      <div className={cn("flex flex-row", size === "small" ? "gap-1" : "gap-4")}>
        <div className="flex flex-1 items-center gap-1">
          <div className={cn(inputCls, "flex-1")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder={yearPlaceholder}
              disabled={disabled}
              value={yearValue}
              onChange={(e) => onYearChange?.(e.target.value)}
              aria-invalid={ariaInvalid || undefined}
              className={fieldCls}
            />
          </div>
          <span className="text-krds-foreground shrink-0">{yearLabel}</span>
        </div>

        <div className="flex flex-1 items-center gap-1">
          <div className={cn(inputCls, "flex-1")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder={monthPlaceholder}
              disabled={disabled}
              value={monthValue}
              onChange={(e) => onMonthChange?.(e.target.value)}
              aria-invalid={ariaInvalid || undefined}
              className={fieldCls}
            />
          </div>
          <span className="text-krds-foreground shrink-0">{monthLabel}</span>
        </div>

        <div className="flex flex-1 items-center gap-1">
          <div className={cn(inputCls, "flex-1")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder={dayPlaceholder}
              disabled={disabled}
              value={dayValue}
              onChange={(e) => onDayChange?.(e.target.value)}
              aria-invalid={ariaInvalid || undefined}
              className={fieldCls}
            />
          </div>
          <span className="text-krds-foreground shrink-0">{dayLabel}</span>
        </div>
      </div>
    </div>
  )
}

export type DateInputPeriodUnitProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  label?: string
  size?: DateInputSize
  separator?: React.ReactNode
  startValue?: string
  endValue?: string
  onStartChange?: (v: string) => void
  onEndChange?: (v: string) => void
  startLabel?: string
  endLabel?: string
  disabled?: boolean
  startPlaceholder?: string
  endPlaceholder?: string
}

const separatorSize: Record<DateInputSize, string> = {
  small: "text-krds-body-sm",
  medium: "text-krds-body-md",
  large: "text-krds-body-lg",
}

function DateInputPeriodUnit({
  label,
  size = "large",
  separator = "/",
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  startLabel,
  endLabel,
  disabled,
  "aria-invalid": ariaInvalid,
  className,
  startPlaceholder = "YYYY.MM.DD",
  endPlaceholder = "YYYY.MM.DD",
  ...rest
}: DateInputPeriodUnitProps) {
  return (
    <div data-slot="krds-date-input-period-unit" className={cn("flex flex-col", className)} {...rest}>
      {label && <label className="text-krds-body-sm text-krds-foreground-subtle mb-2 block">{label}</label>}
      <div className="flex w-full flex-row items-center gap-4">
        <div className="flex-1">
          <DateInput
            size={size}
            value={startValue}
            onValueChange={onStartChange}
            label={startLabel}
            disabled={disabled}
            aria-invalid={ariaInvalid || undefined}
            placeholder={startPlaceholder}
          />
        </div>
        <span className={cn("text-krds-foreground shrink-0", separatorSize[size])}>{separator}</span>
        <div className="flex-1">
          <DateInput
            size={size}
            value={endValue}
            onValueChange={onEndChange}
            label={endLabel}
            disabled={disabled}
            aria-invalid={ariaInvalid || undefined}
            placeholder={endPlaceholder}
          />
        </div>
      </div>
    </div>
  )
}

export { DateInput, DateInputUnit, DateInputPeriodUnit }
