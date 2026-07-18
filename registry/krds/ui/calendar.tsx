// rsc:client
"use client"
/**
 * KRDS Calendar — react-day-picker(shadcn Calendar 베이스) 위에 KRDS 날짜 셀·헤더·
 * 푸터 스펙을 입힌 달력.
 *
 * 근거(_calendar.scss): 날짜 셀 44×44 rounded-full, 이동 버튼 아이콘 20px(size-height-3),
 *   드롭다운 caret icon--size-small, 기간 밴드 action-secondary-on-selected(= bg-krds-surface).
 * 단일 렌더 경로: react-day-picker `DayButton` 슬롯(KrdsDayButton) 하나만 날짜 셀을 그린다.
 * 베이스(§3 legacy 허용): `@/components/ui/calendar`(shadcn/react-day-picker) 잠정 유지.
 * context(1): CalendarNavContext — viewMonth와 goToMonth를 월/연도 드롭다운 파트에 전달해,
 *   합성 이벤트 캐스트 없이 뷰를 이동한다(스타일 전달용이 아닌 실제 내비 상태).
 */
import { format, setMonth, setYear, startOfMonth } from "date-fns"
import { ko } from "date-fns/locale"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { type DateRange, type DayButton, type Dropdown as RdpDropdown } from "react-day-picker"

import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"
import { Button } from "@/registry/krds/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/krds/ui/select"
import { cn } from "@/lib/utils"

// ─── Types (public API) ───────────────────────────────────────────────────────

export type CalendarMode = "single" | "range"
export type CalendarPosition = "top" | "bottom"

export type CalendarProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  mode?: CalendarMode
  position?: CalendarPosition
  value?: string
  defaultValue?: string
  startDate?: string
  endDate?: string
  defaultStartDate?: string
  defaultEndDate?: string
  disabledDates?: string[]
  eventDates?: string[]
  /** Explicit holiday dates rendered in the KRDS "day-off" red color (weekends are auto-colored). */
  holidays?: string[]
  onChange?: (value: string) => void
  onRangeChange?: (startDate: string, endDate: string) => void
  onYearChange?: (year: number) => void
  onMonthChange?: (month: number) => void
  onTodayClick?: () => void
  onConfirm?: () => void
  onCancel?: () => void
  label?: string
  inputId?: string
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  startTitle?: string
  endTitle?: string
  openButtonLabel?: string
  prevButtonLabel?: string
  nextButtonLabel?: string
  yearSelectLabel?: string
  monthSelectLabel?: string
  todayButtonText?: string
  cancelButtonText?: string
  confirmButtonText?: string
  disabled?: boolean
  readOnly?: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatKrdsDate(date: Date): string {
  return format(date, "yyyy.MM.dd")
}

function parseKrdsDate(str: string): Date | undefined {
  const m = str.match(/^(\d{4})[.\-/](\d{2})[.\-/](\d{2})$/)
  if (!m) return undefined
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

// ─── Day-cell state classes (single source: KrdsDayButton) ───────────────────
// Hover/selected map to KRDS `_calendar.scss`: `action-secondary-on-selected`
// (gray-0/white → `bg-krds-surface`) and `action-secondary-active`
// (secondary-70 → `bg-krds-secondary-bold`); both match the semantic tokens in
// light and dark (high-contrast).
const KRDS_DAY_TEXT_DEFAULT = "text-krds-foreground/80"
const KRDS_DAY_TEXT_DAY_OFF = "text-krds-foreground-danger"
const KRDS_DAY_TEXT_EVENT = "text-krds-foreground-information underline underline-offset-2"
const KRDS_DAY_TEXT_DISABLED = "text-krds-foreground-disabled"
const KRDS_DAY_HOVER = "hover:bg-krds-surface"
const KRDS_DAY_SELECTED = "bg-krds-secondary-bold text-white"

// ─── KrdsDayButton: 44×44 rounded-full with KRDS visuals ─────────────────────

function KrdsDayButton({ className, day, modifiers, children, ...rest }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isRangeStartOnly = Boolean((modifiers as Record<string, boolean>).rangeStartOnly)
  const isSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle && !isRangeStartOnly
  const isRangeStart = Boolean(modifiers.range_start) || isRangeStartOnly
  const isRangeEnd = Boolean(modifiers.range_end)
  const isRangeMiddle = Boolean(modifiers.range_middle)
  const isToday = Boolean(modifiers.today)
  const isOutside = Boolean(modifiers.outside)
  const hasEvent = Boolean((modifiers as Record<string, boolean>).hasEvent)
  // day-off: weekend (Sun/Sat) or explicitly provided holiday → KRDS danger (red) text
  const weekday = day.date.getDay()
  const isDayOff = Boolean((modifiers as Record<string, boolean>).dayOff) || weekday === 0 || weekday === 6
  const isHighlighted = isSelectedSingle || isRangeStart || isRangeEnd

  return (
    <button
      ref={ref}
      type="button"
      data-slot="krds-calendar-day"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={isRangeStart || undefined}
      data-range-end={isRangeEnd || undefined}
      data-range-middle={isRangeMiddle || undefined}
      data-today={isToday || undefined}
      data-outside={isOutside || undefined}
      data-day-off={isDayOff || undefined}
      className={cn(
        "text-krds-body-md relative z-10 mx-auto flex size-11 flex-col items-center justify-center rounded-full font-normal transition-colors",
        "focus-visible:krds-focus-ring",
        "disabled:pointer-events-none disabled:opacity-40",
        isOutside && !isHighlighted && KRDS_DAY_TEXT_DISABLED,
        !isOutside && !isHighlighted && !isDayOff && !hasEvent && KRDS_DAY_TEXT_DEFAULT,
        !isOutside && !isHighlighted && isDayOff && KRDS_DAY_TEXT_DAY_OFF,
        !isOutside && !isHighlighted && !isDayOff && hasEvent && KRDS_DAY_TEXT_EVENT,
        !isHighlighted && !isRangeMiddle && KRDS_DAY_HOVER,
        isHighlighted && KRDS_DAY_SELECTED,
        isRangeStart && "rounded-r-none",
        isRangeEnd && !isRangeStart && "rounded-l-none",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {isToday && !isHighlighted && (
        <span
          aria-hidden
          className="bg-krds-point-50 absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full"
        />
      )}
    </button>
  )
}

// ─── Calendar navigation context (viewMonth ↔ month/year dropdowns) ──────────

type CalendarNavContextValue = {
  viewMonth: Date
  goToMonth: (date: Date) => void
  monthSelectLabel: string
  yearSelectLabel: string
}

const CalendarNavContext = React.createContext<CalendarNavContextValue | null>(null)

function useCalendarNav(): CalendarNavContextValue {
  const ctx = React.useContext(CalendarNavContext)
  if (!ctx) throw new Error("Calendar 드롭다운은 <Calendar> 안에서만 사용할 수 있습니다.")
  return ctx
}

// KRDS-styled year/month dropdown: KRDS Select(sorting) overriding the compact
// borderless calendar-caret look. Drives viewMonth directly via context — no
// react-day-picker onChange event is fabricated.
const CALENDAR_DROPDOWN_TRIGGER =
  "h-10 gap-1 rounded-[6px] px-2 font-bold text-krds-body-md text-krds-foreground " +
  "data-[state=open]:bg-krds-surface-secondary-subtle hover:bg-black/5 dark:hover:bg-white/10 [&_svg]:size-4"

function CalendarNavDropdown({
  axis,
  options,
  value,
  disabled,
}: {
  axis: "month" | "year"
} & Pick<React.ComponentProps<typeof RdpDropdown>, "options" | "value" | "disabled">) {
  const { viewMonth, goToMonth, monthSelectLabel, yearSelectLabel } = useCalendarNav()
  const ariaLabel = axis === "month" ? monthSelectLabel : yearSelectLabel

  return (
    <Select
      variant="sorting"
      value={value !== undefined ? String(value) : undefined}
      onValueChange={(next) => {
        const n = Number(next)
        const base = startOfMonth(viewMonth)
        goToMonth(axis === "month" ? setMonth(base, n) : setYear(base, n))
      }}
      disabled={disabled}
    >
      <SelectTrigger data-slot="krds-calendar-dropdown" aria-label={ariaLabel} className={CALENDAR_DROPDOWN_TRIGGER}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {options?.map((o) => (
          <SelectItem key={o.value} value={String(o.value)} disabled={o.disabled}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function KrdsMonthsDropdown(props: React.ComponentProps<typeof RdpDropdown>) {
  return <CalendarNavDropdown axis="month" options={props.options} value={props.value} disabled={props.disabled} />
}

function KrdsYearsDropdown(props: React.ComponentProps<typeof RdpDropdown>) {
  return <CalendarNavDropdown axis="year" options={props.options} value={props.value} disabled={props.disabled} />
}

// ─── KrdsMonth: restructure RDP <Month> children into .calendar-head + .calendar-body ─

function KrdsMonth({
  className,
  children,
  calendarMonth: _cm,
  displayIndex: _di,
  ...rest
}: React.ComponentProps<"div"> & {
  calendarMonth?: unknown
  displayIndex?: number
}) {
  // With navLayout="around" + numberOfMonths=1, RDP passes [prev, caption, next, grid]
  const [prev, caption, next, grid] = React.Children.toArray(children)
  return (
    <div className={cn("flex w-full flex-col", className)} {...rest}>
      <div data-slot="krds-calendar-head" className="flex h-14 w-full items-center justify-between px-6 py-2">
        {prev}
        {caption}
        {next}
      </div>
      <div data-slot="krds-calendar-body" className="w-full px-4 py-4">
        {grid}
      </div>
    </div>
  )
}

// ─── shadcn Calendar className overrides ──────────────────────────────────────

const SHADCN_CLASSNAMES = {
  root: "w-full bg-transparent",
  months: "flex flex-col w-full",
  month: "",
  button_previous:
    "size-8 shrink-0 rounded-full border-[0.8px] border-krds-border-light bg-transparent p-0 inline-flex items-center justify-center text-krds-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40",
  button_next:
    "size-8 shrink-0 rounded-full border-[0.8px] border-krds-border-light bg-transparent p-0 inline-flex items-center justify-center text-krds-foreground hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40",
  month_caption: "flex flex-1 items-center justify-center",
  month_grid: "w-full border-collapse",
  dropdowns: "flex items-center justify-center gap-4",
  dropdown_root: "inline-flex items-center",
  caption_label: "sr-only",
  weekdays: "grid grid-cols-7 h-6 items-center",
  weekday: "h-6 text-center text-krds-body-sm font-normal text-krds-foreground select-none !bg-transparent",
  week: "grid grid-cols-7 w-full mt-0.5 first:mt-2",
  day: "relative h-11 p-0 text-center select-none",
  // KRDS period-band fill (`action-secondary-on-selected`) resolves to gray-0/white in light
  // mode and gray-95 in high-contrast — i.e. exactly `bg-krds-surface` (see krds_tokens.css).
  // It reads as a tint only because it sits inside the tinted `surface-secondary-subtle`
  // calendar container, not because the token itself is colored.
  range_start:
    "relative before:absolute before:inset-y-0 before:left-1/2 before:right-0 before:bg-krds-surface before:content-['']",
  range_middle: "bg-krds-surface",
  range_end:
    "relative before:absolute before:inset-y-0 before:left-0 before:right-1/2 before:bg-krds-surface before:content-['']",
  today: "",
  outside: "",
  disabled: "opacity-40",
  hidden: "invisible",
} as const

// ─── Main Calendar (wraps shadcn Calendar with KRDS visual spec) ─────────────

function Calendar({
  mode = "single",
  value,
  defaultValue,
  startDate,
  endDate,
  defaultStartDate,
  defaultEndDate,
  disabledDates = [],
  eventDates = [],
  holidays = [],
  onChange,
  onRangeChange,
  onYearChange,
  onMonthChange,
  onTodayClick,
  onConfirm,
  onCancel,
  prevButtonLabel = "이전 달",
  nextButtonLabel = "다음 달",
  yearSelectLabel = "연도 선택",
  monthSelectLabel = "월 선택",
  todayButtonText = "오늘",
  cancelButtonText = "취소",
  confirmButtonText = "선택",
  disabled = false,
  readOnly = false,
  className,
  // Consumed by the DateInput wrapper, not the standalone Calendar surface.
  position: _position,
  label: _label,
  inputId: _inputId,
  placeholder: _placeholder,
  startPlaceholder: _sp,
  endPlaceholder: _ep,
  startTitle: _st,
  endTitle: _et,
  openButtonLabel: _obl,
  ...rest
}: CalendarProps) {
  const today = new Date()

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const selectedStr = value !== undefined ? value : internalValue
  const selectedDate = selectedStr ? parseKrdsDate(selectedStr) : undefined

  const [internalStart, setInternalStart] = React.useState(defaultStartDate ?? "")
  const [internalEnd, setInternalEnd] = React.useState(defaultEndDate ?? "")
  const rangeStartStr = startDate !== undefined ? startDate : internalStart
  const rangeEndStr = endDate !== undefined ? endDate : internalEnd
  const rangeStartDate = rangeStartStr ? parseKrdsDate(rangeStartStr) : undefined
  const rangeEndDate = rangeEndStr ? parseKrdsDate(rangeEndStr) : undefined

  const disabledMatcher = disabledDates.map(parseKrdsDate).filter((d): d is Date => d !== undefined)
  const eventDateObjects = eventDates.map(parseKrdsDate).filter((d): d is Date => d !== undefined)
  const holidayDateObjects = holidays.map(parseKrdsDate).filter((d): d is Date => d !== undefined)

  const initialMonth = selectedDate ?? rangeStartDate ?? today
  const [viewMonth, setViewMonth] = React.useState<Date>(initialMonth)

  function goToMonth(next: Date) {
    setViewMonth(next)
    onMonthChange?.(next.getMonth() + 1)
    onYearChange?.(next.getFullYear())
  }

  function handleTodayClick() {
    const todayStr = formatKrdsDate(today)
    setViewMonth(today)
    if (mode === "single") {
      if (value === undefined) setInternalValue(todayStr)
      onChange?.(todayStr)
    }
    onTodayClick?.()
  }

  const rangeStartOnlyDate = mode === "range" && rangeStartDate && !rangeEndDate ? rangeStartDate : undefined

  const extraModifiers: Record<string, Date[]> = {}
  if (eventDateObjects.length > 0) extraModifiers.hasEvent = eventDateObjects
  if (holidayDateObjects.length > 0) extraModifiers.dayOff = holidayDateObjects
  if (rangeStartOnlyDate) extraModifiers.rangeStartOnly = [rangeStartOnlyDate]

  const sharedProps = {
    captionLayout: "dropdown" as const,
    navLayout: "around" as const,
    month: viewMonth,
    startMonth: new Date(2000, 0, 1),
    endMonth: new Date(today.getFullYear() + 10, 11, 31),
    locale: ko,
    labels: {
      labelPrevious: () => prevButtonLabel,
      labelNext: () => nextButtonLabel,
    },
    disabled: disabledMatcher.length > 0 ? disabledMatcher : undefined,
    modifiers: Object.keys(extraModifiers).length > 0 ? extraModifiers : undefined,
    classNames: SHADCN_CLASSNAMES,
    className: "[--cell-size:--spacing(11)] bg-transparent p-0 pt-4 pb-0",
    formatters: {
      formatYearDropdown: (date: Date) => `${date.getFullYear()}년`,
      formatMonthDropdown: (date: Date) => format(date, "M월", { locale: ko }),
      formatCaption: (date: Date) => format(date, "yyyy년 M월", { locale: ko }),
    },
    components: {
      DayButton: KrdsDayButton,
      MonthsDropdown: KrdsMonthsDropdown,
      YearsDropdown: KrdsYearsDropdown,
      Month: KrdsMonth,
      Chevron: ({
        orientation,
        className: chevronClassName,
      }: {
        orientation?: "left" | "right" | "up" | "down"
        className?: string
      }) => {
        // Move (prev/next) buttons: KRDS icon size-height-3 = 20px (_calendar.scss:81).
        if (orientation === "left")
          return <ChevronLeft className={cn("text-krds-foreground size-5", chevronClassName)} />
        if (orientation === "right")
          return <ChevronRight className={cn("text-krds-foreground size-5", chevronClassName)} />
        return <ChevronDown className={cn("text-krds-foreground size-4", chevronClassName)} />
      },
    },
    onMonthChange: (m: Date) => goToMonth(m),
  }

  const calendarNode =
    mode === "range" ? (
      <ShadcnCalendar
        mode="range"
        selected={rangeStartDate ? { from: rangeStartDate, to: rangeEndDate } : undefined}
        onSelect={(range: DateRange | undefined) => {
          const fromStr = range?.from ? formatKrdsDate(range.from) : ""
          const toStr = range?.to ? formatKrdsDate(range.to) : ""
          if (startDate === undefined) setInternalStart(fromStr)
          if (endDate === undefined) setInternalEnd(toStr)
          onRangeChange?.(fromStr, toStr)
        }}
        {...sharedProps}
      />
    ) : (
      <ShadcnCalendar
        mode="single"
        selected={selectedDate}
        onSelect={(date: Date | undefined) => {
          if (!date || readOnly) return
          const str = formatKrdsDate(date)
          if (value === undefined) setInternalValue(str)
          onChange?.(str)
        }}
        {...sharedProps}
      />
    )

  return (
    <div
      data-slot="krds-calendar"
      data-mode={mode}
      // `bg-krds-surface-secondary-subtle` already resolves to KRDS `surface-secondary-subtler`
      // (secondary-5 / secondary-95) in both light and dark — verified against krds_tokens.css.
      // `border-krds-secondary-10` is a raw primitive matching KRDS `border-secondary-light` only
      // in light mode; no mode-aware "secondary-tinted border" semantic token exists in this
      // project's palette (only the gray-toned `border-light`), so it's kept as-is.
      className={cn(
        "border-krds-secondary-10 bg-krds-surface-secondary-subtle inline-flex w-[384px] flex-col items-stretch overflow-hidden rounded-[12px] border",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...rest}
    >
      <CalendarNavContext.Provider value={{ viewMonth, goToMonth, monthSelectLabel, yearSelectLabel }}>
        {calendarNode}
      </CalendarNavContext.Provider>
      <div className="border-krds-border-light bg-krds-surface flex w-full items-center gap-4 border-t px-6 py-4">
        <Button type="button" variant="text" size="sm" onClick={handleTodayClick} disabled={disabled}>
          {todayButtonText}
        </Button>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button type="button" variant="tertiary" size="sm" onClick={onCancel} disabled={disabled}>
            {cancelButtonText}
          </Button>
          <Button type="button" variant="default" size="sm" onClick={onConfirm} disabled={disabled}>
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Calendar }
