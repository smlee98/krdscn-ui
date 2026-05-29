"use client";

import { format } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Calendar as ShadcnCalendarPrimitive } from "@/components/ui/calendar";
import { Input as ShadcnInput } from "@/components/ui/input";
import {
  Calendar as KrdsCalendar,
  CalendarButton as KrdsCalendarButton,
  CalendarDropdown as KrdsCalendarDropdown,
  CalendarInput as KrdsCalendarInput,
  CalendarTable as KrdsCalendarTable
} from "@/components/ui/krds/(layout)/calendar";
import type {
  CalendarButtonProps,
  CalendarDropdownProps,
  CalendarInputProps,
  CalendarProps,
  CalendarTableProps
} from "@/components/ui/krds/(layout)/calendar";
import { useUISystem } from "@/lib/ui-system";

export type {
  CalendarMode,
  CalendarPosition,
  CalendarDate,
  CalendarYearMonth,
  CalendarProps,
  CalendarInputProps,
  CalendarButtonProps,
  CalendarDropdownProps,
  CalendarTableProps
} from "@/components/ui/krds/(layout)/calendar";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS Calendar compound API; each part renders either the
// KRDS-chromed wrapper or the vanilla shadcn day-picker primitive based on
// <UISystemProvider>.
//
// Mapping principle: where shadcn has an equivalent, map to it; where KRDS is
// richer than vanilla shadcn, the excess is dropped so shadcn mode looks like a
// plain shadcn Calendar. Dropped KRDS-only excess in shadcn mode:
//   - the today / cancel / confirm action row (+ its *ButtonText props)
//   - KrdsDayButton / KrdsCalendarDropdown / KrdsMonth custom render
//   - the KRDS container chrome (rounded border, fixed 384px width)
//   - position / label / inputId / placeholder / *Title / *ButtonLabel / *SelectLabel
//   - readOnly (vanilla shadcn has no read-only Calendar mode)
// Mapped: value/onChange ↔ selected/onSelect (string ↔ Date via adapters),
//   mode single/range ↔ shadcn mode, view month ↔ month, disabledDates ↔ disabled.

// ─── string ↔ Date adapters (KRDS uses "yyyy.MM.dd" strings) ──────────────────

function formatKrdsDate(date: Date): string {
  return format(date, "yyyy.MM.dd");
}

function parseKrdsDate(str?: string): Date | undefined {
  if (!str) return undefined;
  const m = str.match(/^(\d{4})[.\-/](\d{2})[.\-/](\d{2})$/);
  if (!m) return undefined;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

// ─── shadcn-mode Calendar: vanilla day-picker with only the mapped KRDS props ──

function ShadcnCalendar({
  mode = "single",
  value,
  defaultValue,
  startDate,
  endDate,
  defaultStartDate,
  defaultEndDate,
  disabledDates = [],
  onChange,
  onRangeChange,
  className,
  // KRDS-only excess with no vanilla shadcn equivalent — dropped.
  disabled: _disabled,
  eventDates: _eventDates,
  onYearChange: _onYearChange,
  onMonthChange: _onMonthChange,
  onTodayClick: _onTodayClick,
  onConfirm: _onConfirm,
  onCancel: _onCancel,
  todayButtonText: _todayButtonText,
  cancelButtonText: _cancelButtonText,
  confirmButtonText: _confirmButtonText,
  readOnly: _readOnly,
  position: _position,
  label: _label,
  inputId: _inputId,
  placeholder: _placeholder,
  startPlaceholder: _startPlaceholder,
  endPlaceholder: _endPlaceholder,
  startTitle: _startTitle,
  endTitle: _endTitle,
  openButtonLabel: _openButtonLabel,
  prevButtonLabel: _prevButtonLabel,
  nextButtonLabel: _nextButtonLabel,
  yearSelectLabel: _yearSelectLabel,
  monthSelectLabel: _monthSelectLabel
  // Remaining HTMLDivElement attributes (incl. DOM onSelect / id / style) are KRDS
  // container props and don't map onto the day-picker primitive — not forwarded.
}: CalendarProps) {
  const disabledMatcher = disabledDates.map((d) => parseKrdsDate(d)).filter((d): d is Date => d !== undefined);
  const disabledProp = disabledMatcher.length > 0 ? disabledMatcher : undefined;

  if (mode === "range") {
    const from = parseKrdsDate(startDate ?? defaultStartDate);
    const to = parseKrdsDate(endDate ?? defaultEndDate);
    const selected: DateRange | undefined = from ? { from, to } : undefined;
    return (
      <ShadcnCalendarPrimitive
        mode="range"
        selected={selected}
        defaultMonth={from}
        disabled={disabledProp}
        onSelect={(range) =>
          onRangeChange?.(range?.from ? formatKrdsDate(range.from) : "", range?.to ? formatKrdsDate(range.to) : "")
        }
        className={className}
      />
    );
  }

  const selected = parseKrdsDate(value ?? defaultValue);
  return (
    <ShadcnCalendarPrimitive
      mode="single"
      selected={selected}
      defaultMonth={selected}
      disabled={disabledProp}
      onSelect={(date) => onChange?.(date ? formatKrdsDate(date) : "")}
      className={className}
    />
  );
}

// ─── Dispatched parts (public surface preserved) ─────────────────────────────

export function Calendar(props: CalendarProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCalendar {...props} />;
  return <ShadcnCalendar {...props} />;
}

export function CalendarInput(props: CalendarInputProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCalendarInput {...props} />;
  // No vanilla shadcn equivalent — simplify to a plain shadcn Input.
  const { mode: _mode, onChange, className, ...rest } = props;
  return <ShadcnInput className={className} onChange={(e) => onChange?.(e.target.value)} {...rest} />;
}

export function CalendarButton(props: CalendarButtonProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCalendarButton {...props} />;
  // No vanilla shadcn equivalent — render a plain button.
  const { variant: _variant, isActive: _isActive, isSelected: _isSelected, children, ...rest } = props;
  return (
    <button type="button" {...rest}>
      {children}
    </button>
  );
}

export function CalendarDropdown(props: CalendarDropdownProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCalendarDropdown {...props} />;
  // No vanilla shadcn equivalent — vanilla Calendar handles its own dropdowns. No-op.
  return null;
}

export function CalendarTable(props: CalendarTableProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsCalendarTable {...props} />;
  // No vanilla shadcn equivalent — the day-picker grid is internal to Calendar. No-op.
  return null;
}
