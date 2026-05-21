"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { AlertCircle, CheckCircle2, ChevronDownIcon, Info, CheckIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type SelectSize = "small" | "medium" | "large";
type SelectVariant = "default" | "sorting";

type SelectOption = { value: string; label: string };

interface SelectProps {
  options: SelectOption[];
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  information?: string;
  size?: SelectSize;
  variant?: SelectVariant;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  selectClassName?: string;
}

const triggerHeight: Record<SelectSize, string> = {
  small: "h-10",
  medium: "h-12",
  large: "h-14"
};

const triggerFont: Record<SelectSize, string> = {
  small: "text-[15px]",
  medium: "text-[17px]",
  large: "text-[19px]"
};

const triggerRadius: Record<SelectSize, string> = {
  small: "rounded-md",
  medium: "rounded-md",
  large: "rounded-lg"
};

const triggerIconSize: Record<SelectSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6"
};

const triggerIconRight: Record<SelectSize, string> = {
  small: "right-3",
  medium: "right-4",
  large: "right-4"
};

const sortingFont: Record<SelectSize, string> = {
  small: "text-[15px]",
  medium: "text-[17px]",
  large: "text-[24px] font-bold"
};

const sortingIconSize: Record<SelectSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6"
};

const sortingPadX: Record<SelectSize, string> = {
  small: "px-0.5",
  medium: "px-1",
  large: "px-1"
};

const sortingGap: Record<SelectSize, string> = {
  small: "gap-1",
  medium: "gap-1",
  large: "gap-1.5"
};

const itemFont: Record<SelectSize, string> = {
  small: "text-[15px]",
  medium: "text-[17px]",
  large: "text-[19px]"
};

const checkIconSize: Record<SelectSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-5"
};

// ── Internal styled primitives (self-contained, not exported) ──────────────

interface KrdsSelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  matchTriggerWidth?: boolean;
  minWidth?: string;
}

function KrdsSelectContent({
  className,
  children,
  matchTriggerWidth = true,
  minWidth,
  ...props
}: KrdsSelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={4}
        className={cn(
          // animation / z
          "z-50 data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          // panel look
          "bg-white border border-krds-gray-20 rounded-md p-2 shadow-md",
          "overflow-hidden",
          // exact-match to trigger width (default) or custom min-width override
          matchTriggerWidth && "w-[var(--radix-select-trigger-width)]",
          !matchTriggerWidth && minWidth,
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="w-full">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

interface KrdsSelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  size: SelectSize;
}

function KrdsSelectItem({ className, children, size, ...props }: KrdsSelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        // base
        "rounded-md py-2.5 px-2 cursor-pointer outline-hidden select-none",
        "flex items-center justify-between gap-2 text-krds-gray-90",
        // hover / focus
        "focus:bg-krds-secondary-5",
        // active / pressed
        "active:bg-[#d6e0eb]",
        // selected
        "data-[state=checked]:bg-krds-secondary-5 data-[state=checked]:text-krds-secondary-90",
        // disabled
        "data-[disabled]:opacity-50 data-[disabled]:pointer-events-none",
        itemFont[size],
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon
          className={cn("text-krds-secondary-50 shrink-0", checkIconSize[size])}
          aria-hidden="true"
        />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

// ── Public component ───────────────────────────────────────────────────────

function Select({
  options,
  label,
  hint,
  error,
  success,
  information,
  size = "large",
  variant = "default",
  disabled,
  placeholder,
  value,
  defaultValue,
  onChange,
  id,
  name,
  className,
  selectClassName
}: SelectProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const hasError = Boolean(error);

  const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const handleValueChange = (val: string) => {
    if (!isControlled) setInternal(val);
    onChange?.(val);
  };

  // ── Sorting variant ──────────────────────────────────────────────────────
  if (variant === "sorting") {
    return (
      <div
        data-slot="krds-select"
        data-variant="sorting"
        className={cn("relative inline-flex items-center", className)}
      >
        <SelectPrimitive.Root
          value={isControlled ? currentValue : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onValueChange={handleValueChange}
          disabled={disabled}
          name={name}
        >
          <SelectPrimitive.Trigger
            id={inputId}
            aria-label={label ?? "정렬"}
            className={cn(
              "text-krds-gray-90 inline-flex h-auto cursor-pointer items-center appearance-none rounded-sm border border-transparent bg-transparent leading-[1.5] outline-none transition-colors",
              "hover:bg-krds-gray-5 active:bg-krds-gray-10",
              "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:ring-offset-1",
              "disabled:text-krds-gray-50 disabled:cursor-not-allowed disabled:bg-transparent",
              sortingFont[size],
              sortingPadX[size],
              sortingGap[size],
              selectClassName
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon
                className={cn(
                  "pointer-events-none shrink-0",
                  disabled ? "text-krds-gray-50" : "text-krds-gray-90",
                  sortingIconSize[size]
                )}
                aria-hidden="true"
              />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <KrdsSelectContent matchTriggerWidth={false} minWidth="min-w-[140px]">
            {options.map((o) => (
              <KrdsSelectItem key={o.value} value={o.value} size={size}>
                {o.label}
              </KrdsSelectItem>
            ))}
          </KrdsSelectContent>
        </SelectPrimitive.Root>
      </div>
    );
  }

  // ── Default variant ──────────────────────────────────────────────────────
  const messageText = error ?? success ?? information ?? hint;
  const messageColor = error
    ? "text-krds-danger-50"
    : success
      ? "text-krds-success-50"
      : information
        ? "text-krds-info-50"
        : "text-krds-gray-70";
  const MessageIcon = error ? AlertCircle : success ? CheckCircle2 : information ? Info : null;

  return (
    <div data-slot="krds-select" className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label htmlFor={inputId} className="text-krds-gray-90 text-[15px] leading-[1.5]">
          {label}
        </label>
      )}
      {hint && !error && !success && !information && (
        <p className="text-krds-gray-70 text-[13px] leading-[1.5]">{hint}</p>
      )}
      <SelectPrimitive.Root
        value={isControlled ? currentValue : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onValueChange={handleValueChange}
        disabled={disabled}
        name={name}
      >
        <SelectPrimitive.Trigger
          id={inputId}
          aria-invalid={hasError || undefined}
          className={cn(
            // base
            "border-krds-gray-50 bg-krds-gray-0 text-krds-gray-90 relative w-full flex items-center border px-4 outline-none transition-colors",
            // placeholder colour (when no value selected)
            "data-[placeholder]:text-krds-gray-50",
            // focus
            "focus:border-krds-primary-50 focus:border-2 focus:px-[15px]",
            // disabled
            "disabled:bg-krds-gray-20 disabled:border-krds-gray-30 disabled:text-krds-gray-50 disabled:cursor-not-allowed",
            // error
            hasError && "border-krds-danger-50 focus:border-krds-danger-50 border-2 px-[15px]",
            triggerHeight[size],
            triggerFont[size],
            triggerRadius[size],
            // right padding to leave room for chevron
            size === "small" ? "pr-9" : size === "medium" ? "pr-11" : "pr-12",
            selectClassName
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon
              className={cn(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 shrink-0",
                disabled ? "text-krds-gray-50" : "text-krds-gray-90",
                triggerIconSize[size],
                triggerIconRight[size]
              )}
              aria-hidden="true"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <KrdsSelectContent>
          {options.map((o) => (
            <KrdsSelectItem key={o.value} value={o.value} size={size}>
              {o.label}
            </KrdsSelectItem>
          ))}
        </KrdsSelectContent>
      </SelectPrimitive.Root>
      {messageText && (
        <span className={cn("inline-flex items-start gap-1 text-[13px] leading-[1.5]", messageColor)}>
          {MessageIcon && <MessageIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
          {messageText}
        </span>
      )}
    </div>
  );
}

export { Select };
export type { SelectProps, SelectOption, SelectSize, SelectVariant };
