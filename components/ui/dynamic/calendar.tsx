"use client";

import type * as React from "react";
import {
  Calendar as KrdsCalendar,
  CalendarButton as KrdsCalendarButton,
  CalendarDropdown as KrdsCalendarDropdown,
  CalendarInput as KrdsCalendarInput,
  CalendarTable as KrdsCalendarTable
} from "@/components/ui/krds/(layout)/calendar";

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

// KRDS Calendar already composes shadcn's Calendar primitive (via day-picker)
// and adds the today / cancel / confirm action row plus KRDS chrome.
// There is no separate "plain shadcn" calendar in the design system, so
// render KRDS regardless of active UI system.
export function Calendar(props: React.ComponentProps<typeof KrdsCalendar>) {
  return <KrdsCalendar {...props} />;
}

export function CalendarInput(props: React.ComponentProps<typeof KrdsCalendarInput>) {
  return <KrdsCalendarInput {...props} />;
}

export function CalendarButton(props: React.ComponentProps<typeof KrdsCalendarButton>) {
  return <KrdsCalendarButton {...props} />;
}

export function CalendarDropdown(props: React.ComponentProps<typeof KrdsCalendarDropdown>) {
  return <KrdsCalendarDropdown {...props} />;
}

export function CalendarTable(props: React.ComponentProps<typeof KrdsCalendarTable>) {
  return <KrdsCalendarTable {...props} />;
}
