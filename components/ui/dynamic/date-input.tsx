"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, isValid, parse } from "date-fns"
import { ko } from "date-fns/locale"

import {
  DateInput as KrdsDateInput,
  DateInputUnit as KrdsDateInputUnit,
  DateInputPeriodUnit as KrdsDateInputPeriodUnit,
} from "@/components/ui/krds/(input)/date-input"
import type {
  DateInputProps,
  DateInputUnitProps,
  DateInputPeriodUnitProps,
  DateInputSize,
} from "@/components/ui/krds/(input)/date-input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { renderFieldMessage } from "@/components/ui/krds/(input)/field-message"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

export type {
  DateInputProps,
  DateInputUnitProps,
  DateInputPeriodUnitProps,
  DateInputSize,
} from "@/components/ui/krds/(input)/date-input"

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx).
//
// shadcn has no segmented yyyy/mm/dd DateInput. Per the "map to vanilla shadcn,
// trim KRDS surplus" rule, the shadcn branch renders the canonical shadcn
// date-picker pattern: Popover + trigger Button (showing the selected date /
// placeholder + CalendarIcon) + the vanilla shadcn Calendar.
//
// The public surface stays the KRDS string-based API (value/onChange are
// "yyyy.MM.dd" strings — see formatKrdsDate in krds/(layout)/calendar.tsx). An
// adapter bridges that to the Date the DayPicker Calendar consumes.
//
// KRDS-only props dropped on the shadcn branch (no equivalent in the vanilla
// date-picker): readOnly, calendarPosition, disabledDates, eventDates,
// onYearChange, onMonthChange, onTodayClick, onConfirm, onCancel and the various
// *ButtonLabel / *SelectLabel / *ButtonText strings. The segmented-input parts
// (DateInputUnit / DateInputPeriodUnit) are surplus too — see their notes below.

const KRDS_DATE_FORMAT = "yyyy.MM.dd"

function parseKrdsDate(str: string | undefined): Date | undefined {
  if (!str) return undefined
  const parsed = parse(str, KRDS_DATE_FORMAT, new Date())
  return isValid(parsed) ? parsed : undefined
}

function formatKrdsDate(date: Date): string {
  return format(date, KRDS_DATE_FORMAT)
}

// shadcn date-picker has no small/medium/large axis; approximate via Button size.
const SIZE_TO_BUTTON: Record<DateInputSize, React.ComponentProps<typeof Button>["size"]> = {
  small: "sm",
  medium: "default",
  large: "lg",
}

// ─── shadcn-mode DateInput: vanilla Popover + Calendar date-picker ──────────────

function ShadcnDateInput({
  label,
  size = "large",
  value,
  defaultValue,
  onChange,
  isCalendarOpen,
  defaultIsCalendarOpen = false,
  onCalendarOpenChange,
  placeholder = "YYYY.MM.DD",
  className,
  disabled,
  id: propId,
  hint,
  error,
  success,
  information,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  // KRDS-only props — intentionally dropped on the shadcn branch.
  readOnly: _readOnly,
  calendarPosition: _calendarPosition,
  disabledDates: _disabledDates,
  eventDates: _eventDates,
  onYearChange: _onYearChange,
  onMonthChange: _onMonthChange,
  onTodayClick: _onTodayClick,
  onConfirm: _onConfirm,
  onCancel: _onCancel,
  openButtonLabel: _openButtonLabel,
  prevButtonLabel: _prevButtonLabel,
  nextButtonLabel: _nextButtonLabel,
  yearSelectLabel: _yearSelectLabel,
  monthSelectLabel: _monthSelectLabel,
  todayButtonText: _todayButtonText,
  cancelButtonText: _cancelButtonText,
  confirmButtonText: _confirmButtonText,
}: DateInputProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultIsCalendarOpen)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")

  const generatedId = React.useId()
  const id = propId ?? generatedId
  const labelId = `${id}-label`

  const isOpenControlled = isCalendarOpen !== undefined
  const open = isOpenControlled ? isCalendarOpen : internalOpen
  const displayValue = value !== undefined ? value : internalValue
  const selectedDate = parseKrdsDate(displayValue)

  const message = renderFieldMessage(id, { error, success, information, hint })
  const describedBy = message ? [ariaDescribedby, `${id}-message`].filter(Boolean).join(" ") : ariaDescribedby
  const resolvedInvalid = ariaInvalid ?? (error != null && error !== false ? true : undefined)

  function handleOpenChange(next: boolean) {
    if (!isOpenControlled) setInternalOpen(next)
    onCalendarOpenChange?.(next)
  }

  function handleSelect(date: Date | undefined) {
    const next = date ? formatKrdsDate(date) : ""
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
    handleOpenChange(false)
  }

  return (
    <div data-slot="date-input" className={cn("flex flex-col", className)}>
      {label && (
        <label id={labelId} className="text-foreground mb-2 block text-sm">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            id={id}
            variant="outline"
            size={SIZE_TO_BUTTON[size]}
            disabled={disabled}
            aria-labelledby={label ? labelId : undefined}
            aria-invalid={resolvedInvalid}
            aria-describedby={describedBy}
            className={cn("w-full justify-start text-left font-normal", !displayValue && "text-muted-foreground")}
          >
            <CalendarIcon />
            {selectedDate ? format(selectedDate, KRDS_DATE_FORMAT, { locale: ko }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} autoFocus locale={ko} />
        </PopoverContent>
      </Popover>
      {message && <div className="mt-2">{message}</div>}
    </div>
  )
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function DateInput(props: DateInputProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsDateInput {...props} />
  return <ShadcnDateInput {...props} />
}

// Segmented year/month/day entry is a KRDS-only affordance with no vanilla
// shadcn counterpart, so on the shadcn branch it collapses to its minimal
// vanilla shape: just the label + the segment values rendered read-only as
// plain text (no per-segment inputs). KRDS branch keeps the full segmented part.
export function DateInputUnit(props: DateInputUnitProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsDateInputUnit {...props} />
  const { label, yearValue = "", monthValue = "", dayValue = "", className } = props
  const text = [yearValue, monthValue, dayValue].filter(Boolean).join(".")
  return (
    <div data-slot="date-input-unit" className={cn("flex flex-col", className)}>
      {label && <label className="text-foreground mb-2 block text-sm">{label}</label>}
      <span className="text-foreground text-sm">{text || "—"}</span>
    </div>
  )
}

// Period (start/end range) entry is likewise KRDS-only. On the shadcn branch it
// reduces to two vanilla shadcn date-pickers side by side with a separator.
export function DateInputPeriodUnit(props: DateInputPeriodUnitProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsDateInputPeriodUnit {...props} />
  const {
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
    className,
    startPlaceholder = "YYYY.MM.DD",
    endPlaceholder = "YYYY.MM.DD",
  } = props
  return (
    <div data-slot="date-input-period-unit" className={cn("flex flex-col", className)}>
      {label && <label className="text-foreground mb-2 block text-sm">{label}</label>}
      <div className="flex w-full flex-row items-center gap-4">
        <div className="flex-1">
          <ShadcnDateInput
            size={size}
            value={startValue}
            onChange={onStartChange}
            label={startLabel}
            disabled={disabled}
            placeholder={startPlaceholder}
          />
        </div>
        <span className="text-foreground shrink-0">{separator}</span>
        <div className="flex-1">
          <ShadcnDateInput
            size={size}
            value={endValue}
            onChange={onEndChange}
            label={endLabel}
            disabled={disabled}
            placeholder={endPlaceholder}
          />
        </div>
      </div>
    </div>
  )
}
