"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { type DateRange, type DayButton, type Dropdown as RdpDropdown } from "react-day-picker";

import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/dynamic/button";
import {
  Select as PrimitiveSelect,
  SelectContent as PrimitiveSelectContent,
  SelectItem as PrimitiveSelectItem,
  SelectTrigger as PrimitiveSelectTrigger,
  SelectValue as PrimitiveSelectValue
} from "@/components/ui/select";
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

// ─── KrdsDayButton: 44×44 rounded-full with KRDS visuals ─────────────────────

function KrdsDayButton({ className, day, modifiers, children, ...rest }: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isRangeStartOnly = Boolean((modifiers as Record<string, boolean>).rangeStartOnly);
  const isSelectedSingle =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle &&
    !isRangeStartOnly;
  const isRangeStart = Boolean(modifiers.range_start) || isRangeStartOnly;
  const isRangeEnd = Boolean(modifiers.range_end);
  const isRangeMiddle = Boolean(modifiers.range_middle);
  const isToday = Boolean(modifiers.today);
  const isOutside = Boolean(modifiers.outside);
  const hasEvent = Boolean((modifiers as Record<string, boolean>).hasEvent);
  const isHighlighted = isSelectedSingle || isRangeStart || isRangeEnd;

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={isRangeStart || undefined}
      data-range-end={isRangeEnd || undefined}
      data-range-middle={isRangeMiddle || undefined}
      data-today={isToday || undefined}
      data-outside={isOutside || undefined}
      className={cn(
        "relative z-10 mx-auto flex size-11 flex-col items-center justify-center rounded-full text-krds-body-md font-normal transition-colors",
        "focus:krds-focus-ring",
        "disabled:pointer-events-none disabled:opacity-40",
        isOutside && !isHighlighted && "text-krds-foreground-disabled",
        !isOutside && !isHighlighted && "text-krds-foreground/80",
        !isHighlighted && !isRangeMiddle && "hover:bg-krds-surface",
        isHighlighted && "bg-krds-secondary-bold text-white",
        isRangeStart && "rounded-r-none",
        isRangeEnd && !isRangeStart && "rounded-l-none",
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      {isToday && !isHighlighted && (
        <span aria-hidden className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-krds-point-50" />
      )}
      {hasEvent && !isToday && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full",
            isHighlighted ? "bg-white" : "bg-krds-secondary-bold"
          )}
        />
      )}
    </button>
  );
}

// ─── KrdsCalendarDropdown: KRDS-styled year/month select (Radix-based) ───────

function KrdsCalendarDropdown({
  options,
  value,
  onChange,
  disabled,
  "aria-label": ariaLabel
}: React.ComponentProps<typeof RdpDropdown>) {
  const handleValueChange = (next: string) => {
    const synthetic = {
      target: { value: next },
      currentTarget: { value: next }
    } as unknown as React.ChangeEvent<HTMLSelectElement>;
    onChange?.(synthetic);
  };

  return (
    <PrimitiveSelect
      value={value !== undefined ? String(value) : undefined}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <PrimitiveSelectTrigger
        aria-label={ariaLabel}
        data-slot="krds-calendar-dropdown"
        className={cn(
          "h-10 gap-1 rounded-[6px] border-0 bg-transparent px-2 shadow-none",
          "text-krds-body-lg font-bold text-krds-foreground",
          "hover:bg-black/5 dark:hover:bg-white/10 data-[state=open]:bg-krds-surface-secondary-subtle",
          "focus:krds-focus-ring",
          "[&_svg]:opacity-100 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-krds-foreground"
        )}
      >
        <PrimitiveSelectValue />
      </PrimitiveSelectTrigger>
      <PrimitiveSelectContent className="max-h-72">
        {options?.map((o) => (
          <PrimitiveSelectItem key={o.value} value={String(o.value)} disabled={o.disabled}>
            {o.label}
          </PrimitiveSelectItem>
        ))}
      </PrimitiveSelectContent>
    </PrimitiveSelect>
  );
}

// ─── KrdsMonth: restructure RDP <Month> children into .calendar-head + .calendar-body ─

function KrdsMonth({
  className,
  children,
  calendarMonth: _cm,
  displayIndex: _di,
  ...rest
}: React.ComponentProps<"div"> & {
  calendarMonth?: unknown;
  displayIndex?: number;
}) {
  // With navLayout="around" + numberOfMonths=1, RDP passes [prev, caption, next, grid]
  const kids = React.Children.toArray(children);
  const [prev, caption, next, grid] = kids;
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
  );
}

// ─── Sub-components (exported for compound usage) ─────────────────────────────

function CalendarInput({ mode: _mode, onChange, className, ...rest }: CalendarInputProps) {
  return (
    <input
      data-slot="krds-calendar-input"
      type="text"
      className={cn(
        "rounded-[6px] border border-krds-border-dark bg-krds-surface px-4 py-2 text-krds-body-sm",
        "text-krds-foreground placeholder:text-krds-foreground-disabled",
        "focus:border-krds-border-primary focus:krds-focus-ring",
        className
      )}
      {...rest}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

function CalendarButton({ variant = "date", isActive, isSelected, className, children, ...rest }: CalendarButtonProps) {
  return (
    <button
      type="button"
      data-slot="krds-calendar-button"
      data-active={isActive || undefined}
      data-selected={isSelected || undefined}
      className={cn(
        "inline-flex items-center justify-center transition-colors outline-none focus:krds-focus-ring",
        variant === "move" && "size-8 rounded-full border-[0.8px] border-krds-border-light bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
        variant === "switch" &&
          "rounded-[6px] px-2 py-1 text-krds-body-lg font-bold text-krds-foreground hover:bg-black/5 dark:hover:bg-white/10",
        variant === "icon" && "size-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10",
        variant === "date" && [
          "size-11 rounded-full text-krds-body-md",
          !isSelected && !isActive && "text-krds-foreground/80 hover:bg-krds-secondary-bold/10",
          (isSelected || isActive) && "bg-krds-secondary-bold text-white"
        ],
        variant === "action" &&
          "h-10 min-w-16 rounded-[6px] border border-krds-border-dark bg-krds-surface px-3 text-krds-body-sm text-krds-foreground hover:bg-black/5 dark:hover:bg-white/10",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function CalendarDropdown({ isOpen, items = [], onItemSelect, onToggle, className, ...rest }: CalendarDropdownProps) {
  return (
    <div data-slot="krds-calendar-dropdown" className={cn("relative", className)} {...rest}>
      <button
        type="button"
        onClick={onToggle}
        className="inline-flex h-10 items-center gap-1 rounded-[6px] px-2 text-krds-body-lg font-bold text-krds-foreground hover:bg-black/5 dark:hover:bg-white/10 focus:krds-focus-ring"
      >
        {items.find((i) => i.isActive)?.label ?? ""}
        <ChevronDown size={16} aria-hidden className="shrink-0" />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-1 max-h-48 min-w-[3.125rem] overflow-y-auto rounded-[6px] border border-krds-border-light bg-krds-surface shadow-md">
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              disabled={item.isDisabled}
              onClick={() => onItemSelect?.(item)}
              className={cn(
                "w-full px-3 py-1 text-left text-krds-body-sm hover:bg-black/5 dark:hover:bg-white/10 focus:krds-focus-ring",
                item.isActive && "font-bold text-krds-foreground-secondary",
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
              className="h-6 w-11 text-center text-krds-body-sm font-normal text-krds-foreground"
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
                <td key={di} className="relative p-0 text-center">
                  {isPeriodCell && <span aria-hidden className="absolute inset-x-0 inset-y-0 bg-krds-surface" />}
                  {date.isStart && !date.isEnd && (
                    <span aria-hidden className="absolute inset-y-0 right-0 left-1/2 bg-krds-surface" />
                  )}
                  {date.isEnd && !date.isStart && (
                    <span aria-hidden className="absolute inset-y-0 right-1/2 left-0 bg-krds-surface" />
                  )}
                  <button
                    type="button"
                    disabled={date.isDisabled}
                    onClick={() => onDateClick?.(date)}
                    className={cn(
                      "relative z-10 inline-flex size-11 items-center justify-center rounded-full text-krds-body-md transition-colors outline-none",
                      isDimmed && "text-krds-foreground-disabled",
                      !isDimmed && !isHighlighted && "text-krds-foreground/80",
                      date.isDisabled && "cursor-not-allowed opacity-40",
                      date.isDayOff && !isHighlighted && !isDimmed && "text-krds-foreground-point",
                      isHighlighted && "bg-krds-secondary-bold text-white",
                      !isHighlighted && !date.isDisabled && "hover:bg-krds-secondary-bold/10"
                    )}
                    aria-pressed={isHighlighted}
                    aria-label={`${date.year}년 ${date.month}월 ${date.day}일`}
                  >
                    {date.day}
                    {date.isToday && !isHighlighted && (
                      <span
                        aria-hidden
                        className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-krds-point-50"
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
  range_start:
    "relative before:absolute before:inset-y-0 before:left-1/2 before:right-0 before:bg-krds-surface before:content-['']",
  range_middle: "bg-krds-surface",
  range_end:
    "relative before:absolute before:inset-y-0 before:left-0 before:right-1/2 before:bg-krds-surface before:content-['']",
  today: "",
  outside: "",
  disabled: "opacity-40",
  hidden: "invisible"
} as const;

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
  onChange,
  onRangeChange,
  onYearChange,
  onMonthChange,
  onTodayClick,
  onConfirm,
  onCancel,
  todayButtonText = "오늘",
  cancelButtonText = "취소",
  confirmButtonText = "선택",
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

  const initialMonth = selectedDate ?? rangeStartDate ?? today;
  const [viewMonth, setViewMonth] = React.useState<Date>(initialMonth);

  function handleTodayClick() {
    const todayStr = formatKrdsDate(today);
    setViewMonth(today);
    if (mode === "single") {
      if (value === undefined) setInternalValue(todayStr);
      onChange?.(todayStr);
    }
    onTodayClick?.();
  }

  const rangeStartOnlyDate = mode === "range" && rangeStartDate && !rangeEndDate ? rangeStartDate : undefined;

  const extraModifiers: Record<string, Date[]> = {};
  if (eventDateObjects.length > 0) extraModifiers.hasEvent = eventDateObjects;
  if (rangeStartOnlyDate) extraModifiers.rangeStartOnly = [rangeStartOnlyDate];

  const sharedProps = {
    captionLayout: "dropdown" as const,
    navLayout: "around" as const,
    month: viewMonth,
    startMonth: new Date(2000, 0, 1),
    endMonth: new Date(today.getFullYear() + 10, 11, 31),
    locale: ko,
    disabled: disabledMatcher.length > 0 ? disabledMatcher : undefined,
    modifiers: Object.keys(extraModifiers).length > 0 ? extraModifiers : undefined,
    classNames: SHADCN_CLASSNAMES,
    className: "[--cell-size:--spacing(11)] bg-transparent p-0 pt-4 pb-0",
    formatters: {
      formatYearDropdown: (date: Date) => `${date.getFullYear()}년`,
      formatMonthDropdown: (date: Date) => format(date, "M월", { locale: ko }),
      formatCaption: (date: Date) => format(date, "yyyy년 M월", { locale: ko })
    },
    components: {
      DayButton: KrdsDayButton,
      Dropdown: KrdsCalendarDropdown,
      Month: KrdsMonth,
      Chevron: ({
        orientation,
        className: chevronClassName
      }: {
        orientation?: "left" | "right" | "up" | "down";
        className?: string;
      }) => {
        if (orientation === "left") return <ChevronLeft className={cn("size-4 text-krds-foreground", chevronClassName)} />;
        if (orientation === "right") return <ChevronRight className={cn("size-4 text-krds-foreground", chevronClassName)} />;
        return <ChevronDown className={cn("size-4 text-krds-foreground", chevronClassName)} />;
      }
    },
    onMonthChange: (m: Date) => {
      setViewMonth(m);
      onMonthChange?.(m.getMonth() + 1);
      onYearChange?.(m.getFullYear());
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
      data-mode={mode}
      className={cn(
        "inline-flex w-[384px] flex-col items-stretch overflow-hidden rounded-[12px] border border-krds-secondary-10 bg-krds-surface-secondary-subtle",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      {...rest}
    >
      {calendarNode}
      <div className="flex w-full items-center gap-4 border-t border-krds-border-light bg-krds-surface px-6 py-4">
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
  );
}

export { Calendar, CalendarButton, CalendarDropdown, CalendarInput, CalendarTable };
