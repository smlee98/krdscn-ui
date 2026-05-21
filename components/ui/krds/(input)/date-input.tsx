"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Info, CheckCircle2, CircleAlert } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/krds/(layout)/calendar";
import { cn } from "@/lib/cn";

export type DateInputSize = "small" | "medium" | "large";

export type DateInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "defaultValue" | "size" | "type" | "readOnly"
> & {
  onChange?: (value: string) => void;
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  information?: string;
  size?: DateInputSize;
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
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
};

const sizeBox: Record<DateInputSize, string> = {
  small:  "h-10 px-4 rounded-[6px] text-[15px]",
  medium: "h-12 px-4 rounded-[6px] text-[17px]",
  large:  "h-14 px-4 rounded-[8px] text-[19px]",
};

const sizeIcon: Record<DateInputSize, string> = {
  small:  "size-4",
  medium: "size-5",
  large:  "size-6",
};

function DateInput({
  label,
  hint,
  error,
  success,
  information,
  size = "large",
  value,
  defaultValue,
  onChange,
  readOnly = false,
  isCalendarOpen,
  defaultIsCalendarOpen = false,
  onCalendarOpenChange,
  calendarPosition = "bottom",
  openButtonLabel = "달력 열기",
  prevButtonLabel = "이전 달",
  nextButtonLabel = "다음 달",
  yearSelectLabel = "연도 선택",
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

  function handleOpenChange(next: boolean) {
    if (!isControlled) setInternalOpen(next);
    onCalendarOpenChange?.(next);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  }

  const messageContent = error?.trim()
    ? { text: error, icon: <CircleAlert className="size-4 shrink-0" />, cls: "text-[#bd2c0f]" }
    : success?.trim()
      ? { text: success, icon: <CheckCircle2 className="size-4 shrink-0" />, cls: "text-[#267337]" }
      : information?.trim()
        ? { text: information, icon: <Info className="size-4 shrink-0" />, cls: "text-[#096ab3]" }
        : hint?.trim()
          ? { text: hint, icon: <Info className="size-4 shrink-0" />, cls: "text-[#464c53]" }
          : null;

  return (
    <div data-slot="krds-date-input" className={cn("flex flex-col", className)}>
      {label && (
        <label className="mb-2 block text-[15px] text-[#464c53]">{label}</label>
      )}

      <div
        className={cn(
          "relative flex items-center border border-[#58616a] bg-white transition-colors",
          "focus-within:border-2 focus-within:border-[#256ef4]",
          hasError && "border-2 border-[#de3412] focus-within:border-[#de3412]",
          disabled && "border border-[#b1b8be] bg-[#cdd1d5]",
          sizeBox[size],
          "pr-10"
        )}
      >
        <input
          {...rest}
          type="text"
          disabled={disabled}
          readOnly={readOnly}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          aria-invalid={hasError || undefined}
          className={cn(
            "w-full bg-transparent text-[#1e2124] outline-none",
            "placeholder:text-[#8a949e]",
            disabled && "cursor-not-allowed text-[#8a949e]",
            readOnly && "caret-transparent"
          )}
        />

        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={openButtonLabel}
              disabled={disabled || readOnly}
              onClick={() => {
                if (!disabled && !readOnly) handleOpenChange(!open);
              }}
              className="absolute right-4 flex items-center justify-center text-[#58616a] disabled:opacity-40"
            >
              <CalendarIcon className={sizeIcon[size]} />
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

      {messageContent && (
        <div className={cn("mt-2 flex items-center gap-1 text-[13px]", messageContent.cls)}>
          {messageContent.icon}
          <span className="translate-y-px">{messageContent.text}</span>
        </div>
      )}
    </div>
  );
}

export type DateInputUnitProps = {
  label?: string;
  size?: DateInputSize;
  yearLabel?: string;
  monthLabel?: string;
  dayLabel?: string;
  yearValue?: string;
  monthValue?: string;
  dayValue?: string;
  onYearChange?: (v: string) => void;
  onMonthChange?: (v: string) => void;
  onDayChange?: (v: string) => void;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
};

function DateInputUnit({
  label,
  size = "large",
  yearLabel = "년도",
  monthLabel = "월",
  dayLabel = "일",
  yearValue = "",
  monthValue = "",
  dayValue = "",
  onYearChange,
  onMonthChange,
  onDayChange,
  disabled,
  error,
  hint,
  className,
}: DateInputUnitProps) {
  const hasError = Boolean(error);

  const inputCls = cn(
    "border border-[#58616a] bg-white transition-colors",
    "focus-within:border-2 focus-within:border-[#256ef4]",
    hasError && "border-2 border-[#de3412] focus-within:border-[#de3412]",
    disabled && "border border-[#b1b8be] bg-[#cdd1d5]",
    sizeBox[size]
  );

  const messageContent = error?.trim()
    ? { text: error, icon: <CircleAlert className="size-4 shrink-0" />, cls: "text-[#bd2c0f]" }
    : hint?.trim()
      ? { text: hint, icon: <Info className="size-4 shrink-0" />, cls: "text-[#464c53]" }
      : null;

  return (
    <div data-slot="krds-date-input-unit" className={cn("flex flex-col", className)}>
      {label && (
        <label className="mb-2 block text-[15px] text-[#464c53]">{label}</label>
      )}
      <div className={cn("flex flex-row", size === "small" ? "gap-1" : "gap-4")}>
        <div className="flex flex-1 items-center gap-1">
          <div className={cn(inputCls, "flex-1")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              disabled={disabled}
              value={yearValue}
              onChange={(e) => onYearChange?.(e.target.value)}
              aria-invalid={hasError || undefined}
              className={cn(
                "w-full bg-transparent text-[#1e2124] outline-none placeholder:text-[#8a949e]",
                disabled && "cursor-not-allowed text-[#8a949e]"
              )}
            />
          </div>
          <span className="shrink-0 text-[#1e2124]">{yearLabel}</span>
        </div>

        <div className="flex flex-1 items-center gap-1">
          <div className={cn(inputCls, "flex-1")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              disabled={disabled}
              value={monthValue}
              onChange={(e) => onMonthChange?.(e.target.value)}
              aria-invalid={hasError || undefined}
              className={cn(
                "w-full bg-transparent text-[#1e2124] outline-none placeholder:text-[#8a949e]",
                disabled && "cursor-not-allowed text-[#8a949e]"
              )}
            />
          </div>
          <span className="shrink-0 text-[#1e2124]">{monthLabel}</span>
        </div>

        <div className="flex flex-1 items-center gap-1">
          <div className={cn(inputCls, "flex-1")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD"
              disabled={disabled}
              value={dayValue}
              onChange={(e) => onDayChange?.(e.target.value)}
              aria-invalid={hasError || undefined}
              className={cn(
                "w-full bg-transparent text-[#1e2124] outline-none placeholder:text-[#8a949e]",
                disabled && "cursor-not-allowed text-[#8a949e]"
              )}
            />
          </div>
          <span className="shrink-0 text-[#1e2124]">{dayLabel}</span>
        </div>
      </div>

      {messageContent && (
        <div className={cn("mt-2 flex items-center gap-1 text-[13px]", messageContent.cls)}>
          {messageContent.icon}
          <span className="translate-y-px">{messageContent.text}</span>
        </div>
      )}
    </div>
  );
}

export type DateInputPeriodUnitProps = {
  label?: string;
  size?: DateInputSize;
  separator?: React.ReactNode;
  startValue?: string;
  endValue?: string;
  onStartChange?: (v: string) => void;
  onEndChange?: (v: string) => void;
  startLabel?: string;
  endLabel?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
};

const separatorSize: Record<DateInputSize, string> = {
  small:  "text-[15px]",
  medium: "text-[17px]",
  large:  "text-[19px]",
};

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
  error,
  hint,
  className,
  startPlaceholder = "YYYY.MM.DD",
  endPlaceholder = "YYYY.MM.DD",
}: DateInputPeriodUnitProps) {
  const hasError = Boolean(error);

  const messageContent = error?.trim()
    ? { text: error, icon: <CircleAlert className="size-4 shrink-0" />, cls: "text-[#bd2c0f]" }
    : hint?.trim()
      ? { text: hint, icon: <Info className="size-4 shrink-0" />, cls: "text-[#464c53]" }
      : null;

  return (
    <div data-slot="krds-date-input-period-unit" className={cn("flex flex-col", className)}>
      {label && (
        <label className="mb-2 block text-[15px] text-[#464c53]">{label}</label>
      )}
      <div className="flex w-full flex-row items-center gap-4">
        <div className="flex-1">
          <DateInput
            size={size}
            value={startValue}
            onChange={onStartChange}
            label={startLabel}
            disabled={disabled}
            error={hasError ? " " : undefined}
            placeholder={startPlaceholder}
          />
        </div>
        <span className={cn("shrink-0 text-[#1e2124]", separatorSize[size])}>
          {separator}
        </span>
        <div className="flex-1">
          <DateInput
            size={size}
            value={endValue}
            onChange={onEndChange}
            label={endLabel}
            disabled={disabled}
            error={hasError ? " " : undefined}
            placeholder={endPlaceholder}
          />
        </div>
      </div>

      {messageContent && (
        <div className={cn("mt-2 flex items-center gap-1 text-[13px]", messageContent.cls)}>
          {messageContent.icon}
          <span className="translate-y-px">{messageContent.text}</span>
        </div>
      )}
    </div>
  );
}

export { DateInput, DateInputUnit, DateInputPeriodUnit };
