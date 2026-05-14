"use client";

import * as React from "react";
import { type DayButton, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { cn } from "@/lib/cn";

// ─── Types (public API preserved) ────────────────────────────────────────────

export type CalendarMode = "single" | "range";
export type CalendarPosition = "top" | "bottom";

export type CalendarDate = {
  year: number;
  month: number;
  day: number;
  isToday?: boolean;
  isDisabled?: boolean;
  isOld?: boolean;
  isNew?: boolean;
  isDayOff?: boolean;
  hasEvent?: boolean;
  isSelected?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  isPeriod?: boolean;
};

export type CalendarYearMonth = {
  value: number;
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
};

export type CalendarProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  mode?: CalendarMode;
  position?: CalendarPosition;
  value?: string;
  defaultValue?: string;
  startDate?: string;
  endDate?: string;
  defaultStartDate?: string;
  defaultEndDate?: string;
  disabledDates?: string[];
  eventDates?: string[];
  onChange?: (value: string) => void;
  onRangeChange?: (startDate: string, endDate: string) => void;
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
  onTodayClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  label?: string;
  inputId?: string;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  startTitle?: string;
  endTitle?: string;
  openButtonLabel?: string;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
  yearSelectLabel?: string;
  monthSelectLabel?: string;
  todayButtonText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type CalendarInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  mode?: CalendarMode;
  onChange?: (value: string) => void;
};

export type CalendarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "icon" | "move" | "switch" | "date" | "action";
  isActive?: boolean;
  isSelected?: boolean;
};

export type CalendarDropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  items?: CalendarYearMonth[];
  onItemSelect?: (item: CalendarYearMonth) => void;
  onToggle?: () => void;
};

export type CalendarTableProps = React.HTMLAttributes<HTMLTableElement> & {
  dates?: CalendarDate[];
  mode?: CalendarMode;
  currentYear?: number;
  currentMonth?: number;
  onDateClick?: (date: CalendarDate) => void;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatKrdsDate(date: Date): string {
  return format(date, "yyyy.MM.dd");
}

function parseKrdsDate(str: string): Date | undefined {
  const m = str.match(/^(\d{4})[.\-/](\d{2})[.\-/](\d{2})$/);
  if (!m) return undefined;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

// ─── KrdsDayButton: DayButton slot with KRDS colors + event-dot support ───────

function KrdsDayButton({ className, day, modifiers, children, ...rest }: React.ComponentProps<typeof DayButton>) {
  const hasEvent = Boolean((modifiers as Record<string, boolean>).hasEvent);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative flex aspect-square w-full min-w-[var(--cell-size)] flex-col items-center justify-center rounded-md p-0 text-sm font-normal transition-colors",
        "hover:bg-krds-primary-5 focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-40",
        "data-[selected-single=true]:bg-krds-primary-50 data-[selected-single=true]:text-white",
        "data-[range-start=true]:bg-krds-primary-50 data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-krds-primary-50 data-[range-end=true]:text-white",
        "data-[range-middle=true]:bg-krds-primary-5 data-[range-middle=true]:rounded-none",
        className
      )}
      {...rest}
    >
      {children}
      {hasEvent && (
        <span
          className={cn(
            "absolute bottom-0.5 left-1/2 size-[0.1875rem] -translate-x-1/2 rounded-full",
            modifiers.selected ? "bg-white" : "bg-krds-primary-50"
          )}
        />
      )}
    </button>
  );
}

// ─── Sub-components (exported for compound usage) ─────────────────────────────

function CalendarInput({ mode: _mode, onChange, className, ...rest }: CalendarInputProps) {
  return (
    <input
      data-slot="krds-calendar-input"
      type="text"
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm",
        "border-krds-gray-30 text-krds-gray-90 bg-white",
        "placeholder:text-krds-gray-50 focus:border-krds-primary-50 focus:outline-none",
        className
      )}
      {...rest}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

function CalendarButton({
  variant = "date",
  isActive,
  isSelected,
  className,
  children,
  ...rest
}: CalendarButtonProps) {
  return (
    <button
      type="button"
      data-slot="krds-calendar-button"
      data-active={isActive || undefined}
      data-selected={isSelected || undefined}
      className={cn(
        "inline-flex items-center justify-center transition-colors outline-none",
        variant === "move" &&
          "border-krds-gray-30 hover:bg-krds-primary-5 hover:border-krds-primary-50 size-8 rounded border",
        variant === "switch" && "hover:bg-krds-primary-5 rounded px-2 py-1 text-sm",
        variant === "icon" && "hover:bg-krds-primary-5 size-8 rounded",
        variant === "date" && [
          "aspect-square w-full rounded text-sm",
          !isSelected && !isActive && "hover:bg-krds-primary-5",
          (isSelected || isActive) && "bg-krds-primary-50 text-white"
        ],
        variant === "action" && "border-krds-gray-30 hover:bg-krds-primary-5 rounded border bg-white px-4 py-2 text-sm",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function CalendarDropdown({
  isOpen,
  items = [],
  onItemSelect,
  onToggle,
  className,
  ...rest
}: CalendarDropdownProps) {
  return (
    <div data-slot="krds-calendar-dropdown" className={cn("relative", className)} {...rest}>
      <button
        type="button"
        onClick={onToggle}
        className="hover:bg-krds-primary-5 inline-flex items-center gap-1 rounded px-2 py-1 text-sm"
      >
        {items.find((i) => i.isActive)?.label ?? ""}
        <svg
          aria-hidden="true"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={cn("transition-transform duration-150", isOpen && "rotate-180")}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {isOpen && (
        <div className="border-krds-gray-30 absolute left-0 z-10 mt-1 max-h-48 min-w-[3.125rem] overflow-y-auto rounded border bg-white shadow-md">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              disabled={item.isDisabled}
              onClick={() => onItemSelect?.(item)}
              className={cn(
                "hover:bg-krds-primary-5 w-full px-3 py-1 text-left text-sm",
                item.isActive && "text-krds-primary-50 font-semibold",
                item.isDisabled && "cursor-not-allowed opacity-40"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function CalendarTable({
  dates = [],
  mode: _mode = "single",
  currentYear,
  currentMonth,
  onDateClick,
  className,
  ...rest
}: CalendarTableProps) {
  const weeks: CalendarDate[][] = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }
  return (
    <table data-slot="krds-calendar-table" className={cn("w-full border-collapse", className)} {...rest}>
      <caption className="sr-only">
        {currentYear}년 {currentMonth}월 달력
      </caption>
      <thead>
        <tr>
          {WEEKDAYS.map((day) => (
            <th
              key={day}
              scope="col"
              className={cn("pb-1 text-center text-xs", day === "일" ? "text-krds-danger-50" : "text-krds-gray-50")}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, wi) => (
          <tr key={wi}>
            {week.map((date, di) => {
              const isDimmed = date.isOld || date.isNew;
              const isHighlighted = date.isSelected || date.isStart || date.isEnd;
              const isPeriodCell = date.isPeriod;
              return (
                <td key={di} className="p-0.5 text-center">
                  <button
                    type="button"
                    disabled={date.isDisabled}
                    onClick={() => onDateClick?.(date)}
                    className={cn(
                      "relative aspect-square w-full rounded text-sm transition-colors outline-none",
                      isDimmed && "opacity-30",
                      date.isDisabled && "cursor-not-allowed opacity-40",
                      date.isDayOff && !isHighlighted && "text-krds-danger-50",
                      date.hasEvent && !isHighlighted && "text-krds-primary-50",
                      isPeriodCell && "bg-krds-primary-5 rounded-none",
                      isHighlighted && "bg-krds-primary-50 text-white",
                      !isHighlighted && !isPeriodCell && !date.isDisabled && "hover:bg-krds-primary-5"
                    )}
                    aria-pressed={isHighlighted}
                    aria-label={`${date.year}년 ${date.month}월 ${date.day}일`}
                  >
                    {date.day}
                    {date.isToday && (
                      <span
                        className={cn(
                          "absolute bottom-0.5 left-1/2 block size-[0.1875rem] -translate-x-1/2 rounded-full",
                          isHighlighted ? "bg-white" : "bg-krds-primary-50"
                        )}
                      />
                    )}
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Main Calendar (wraps shadcn Calendar with KRDS API) ──────────────────────

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
  onChange,
  onRangeChange,
  onYearChange,
  onMonthChange,
  onTodayClick,
  onConfirm,
  onCancel,
  todayButtonText = "오늘",
  cancelButtonText = "취소",
  confirmButtonText = "확인",
  disabled = false,
  readOnly = false,
  className,
  // Unused in standalone Calendar (used by DateInput wrapper)
  position: _position,
  label: _label,
  inputId: _inputId,
  placeholder: _placeholder,
  startPlaceholder: _sp,
  endPlaceholder: _ep,
  startTitle: _st,
  endTitle: _et,
  openButtonLabel: _obl,
  prevButtonLabel: _pbl,
  nextButtonLabel: _nbl,
  yearSelectLabel: _ysl,
  monthSelectLabel: _msl,
  ...rest
}: CalendarProps) {
  const today = new Date();

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const selectedStr = value !== undefined ? value : internalValue;
  const selectedDate = selectedStr ? parseKrdsDate(selectedStr) : undefined;

  const [internalStart, setInternalStart] = React.useState(defaultStartDate ?? "");
  const [internalEnd, setInternalEnd] = React.useState(defaultEndDate ?? "");
  const rangeStartStr = startDate !== undefined ? startDate : internalStart;
  const rangeEndStr = endDate !== undefined ? endDate : internalEnd;
  const rangeStartDate = rangeStartStr ? parseKrdsDate(rangeStartStr) : undefined;
  const rangeEndDate = rangeEndStr ? parseKrdsDate(rangeEndStr) : undefined;

  const disabledMatcher = disabledDates.map(parseKrdsDate).filter((d): d is Date => d !== undefined);

  const eventDateObjects = eventDates.map(parseKrdsDate).filter((d): d is Date => d !== undefined);

  const defaultMonth = selectedDate ?? rangeStartDate ?? today;

  function handleTodayClick() {
    const todayStr = formatKrdsDate(today);
    if (mode === "single") {
      if (value === undefined) setInternalValue(todayStr);
      onChange?.(todayStr);
    }
    onTodayClick?.();
  }

  const sharedProps = {
    captionLayout: "dropdown" as const,
    defaultMonth,
    locale: ko,
    disabled: disabledMatcher.length > 0 ? disabledMatcher : undefined,
    modifiers: eventDateObjects.length > 0 ? { hasEvent: eventDateObjects } : undefined,
    components: { DayButton: KrdsDayButton },
    onMonthChange: (month: Date) => {
      onMonthChange?.(month.getMonth() + 1);
      onYearChange?.(month.getFullYear());
    }
  };

  const calendarNode =
    mode === "range" ? (
      <ShadcnCalendar
        mode="range"
        selected={rangeStartDate ? { from: rangeStartDate, to: rangeEndDate } : undefined}
        onSelect={(range: DateRange | undefined) => {
          const fromStr = range?.from ? formatKrdsDate(range.from) : "";
          const toStr = range?.to ? formatKrdsDate(range.to) : "";
          if (startDate === undefined) setInternalStart(fromStr);
          if (endDate === undefined) setInternalEnd(toStr);
          onRangeChange?.(fromStr, toStr);
        }}
        {...sharedProps}
      />
    ) : (
      <ShadcnCalendar
        mode="single"
        selected={selectedDate}
        onSelect={(date: Date | undefined) => {
          if (!date || readOnly) return;
          const str = formatKrdsDate(date);
          if (value === undefined) setInternalValue(str);
          onChange?.(str);
        }}
        {...sharedProps}
      />
    );

  return (
    <div
      data-slot="krds-calendar"
      className={cn(
        "border-krds-gray-30 inline-flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...rest}
    >
      {calendarNode}
      <div className="border-krds-gray-30 flex items-center justify-between gap-2 border-t px-3 py-2">
        <CalendarButton variant="action" onClick={handleTodayClick} disabled={disabled}>
          {todayButtonText}
        </CalendarButton>
        <div className="flex gap-2">
          {onCancel && (
            <CalendarButton variant="action" onClick={onCancel} disabled={disabled}>
              {cancelButtonText}
            </CalendarButton>
          )}
          {onConfirm && (
            <CalendarButton variant="action" onClick={onConfirm} disabled={disabled}>
              {confirmButtonText}
            </CalendarButton>
          )}
        </div>
      </div>
    </div>
  );
}

export { Calendar, CalendarInput, CalendarButton, CalendarDropdown, CalendarTable };
