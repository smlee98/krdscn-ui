"use client";

import * as React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/krds/calendar";
import { cn } from "@/lib/cn";

export type DateInputSize = "small" | "medium" | "large";

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "size" | "type"> {
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  information?: string;
  size?: DateInputSize;
  value?: string;
  defaultValue?: string;
  isCalendarOpen?: boolean;
  defaultIsCalendarOpen?: boolean;
  onCalendarOpenChange?: (isOpen: boolean) => void;
  calendarPosition?: "top" | "bottom";
  disabledDates?: string[];
  eventDates?: string[];
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
  onTodayClick?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  openButtonLabel?: string;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
  yearSelectLabel?: string;
  monthSelectLabel?: string;
  todayButtonText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const sizeClasses: Record<DateInputSize, string> = {
  small: "h-8 rounded text-sm",
  medium: "h-10 rounded-md text-sm",
  large: "h-12 rounded-lg text-base"
};

function DateInput({
  label,
  hint,
  error,
  success,
  information,
  size = "medium",
  value,
  defaultValue,
  onChange,
  isCalendarOpen,
  defaultIsCalendarOpen = false,
  onCalendarOpenChange,
  calendarPosition = "bottom",
  openButtonLabel = "달력 열기",
  prevButtonLabel = "이전 달",
  nextButtonLabel = "다음 달",
  yearSelectLabel = "년도 선택",
  monthSelectLabel = "월 선택",
  todayButtonText = "오늘",
  cancelButtonText = "취소",
  confirmButtonText = "확인",
  disabledDates,
  eventDates,
  onYearChange,
  onMonthChange,
  onTodayClick,
  onConfirm,
  onCancel,
  placeholder = "YYYY.MM.DD",
  className,
  disabled,
  ...rest
}: DateInputProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultIsCalendarOpen);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");

  const isControlled = isCalendarOpen !== undefined;
  const open = isControlled ? isCalendarOpen : internalOpen;
  const displayValue = value !== undefined ? value : internalValue;

  const hasError = Boolean(error);

  const messageText = error ?? success ?? information ?? hint;
  const messageClass = error
    ? "text-krds-danger-50"
    : success
      ? "text-krds-success-50"
      : information
        ? "text-krds-info-50"
        : "text-krds-gray-50";

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onCalendarOpenChange?.(next);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-krds-gray-90 text-sm font-medium">{label}</label>}

      <div className="relative flex items-center">
        <input
          {...rest}
          type="text"
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          aria-invalid={hasError || undefined}
          className={cn(
            "w-full border px-3 pr-10 transition-colors",
            "border-krds-gray-30 text-krds-gray-90 bg-white",
            "placeholder:text-krds-gray-50",
            "focus:border-krds-primary-50 focus:outline-none",
            "disabled:bg-krds-gray-5 disabled:border-krds-gray-30 disabled:text-krds-gray-50",
            sizeClasses[size],
            hasError && "border-krds-danger-50 focus:border-krds-danger-50",
            className
          )}
        />

        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={openButtonLabel}
              disabled={disabled}
              className="text-krds-gray-70 absolute right-2 flex size-5 items-center justify-center disabled:opacity-40"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 6h12" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            side={calendarPosition}
            className="w-auto border-0 bg-transparent p-0 shadow-none"
          >
            <Calendar
              mode="single"
              position={calendarPosition}
              disabledDates={disabledDates}
              eventDates={eventDates}
              onYearChange={onYearChange}
              onMonthChange={onMonthChange}
              onTodayClick={onTodayClick}
              onConfirm={onConfirm}
              onCancel={onCancel}
              prevButtonLabel={prevButtonLabel}
              nextButtonLabel={nextButtonLabel}
              yearSelectLabel={yearSelectLabel}
              monthSelectLabel={monthSelectLabel}
              todayButtonText={todayButtonText}
              cancelButtonText={cancelButtonText}
              confirmButtonText={confirmButtonText}
              value={displayValue || undefined}
              onChange={(v) => {
                if (value === undefined) setInternalValue(v);
                onChange?.(v);
                handleOpenChange(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {messageText && <span className={cn("text-xs", messageClass)}>{messageText}</span>}
    </div>
  );
}

export { DateInput };
