"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDownIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/cn"
import { renderFieldMessage } from "@/components/ui/krds/(input)/field-message"

type SelectSize = "small" | "medium" | "large"
type SelectVariant = "default" | "sorting"

type SelectOption = { value: string; label: string }

interface SelectProps {
  options: SelectOption[]
  label?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
  size?: SelectSize
  variant?: SelectVariant
  disabled?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  id?: string
  name?: string
  className?: string
  selectClassName?: string
  hint?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  information?: React.ReactNode
}

const triggerHeight: Record<SelectSize, string> = {
  small: "h-10",
  medium: "h-12",
  large: "h-14",
}

const triggerFont: Record<SelectSize, string> = {
  small: "text-krds-body-sm",
  medium: "text-krds-body-md",
  large: "text-krds-body-lg",
}

// KRDS .krds-form-select radius (small = medium3 = 8px, medium/large = medium2/1 = 6px).
const triggerRadius: Record<SelectSize, string> = {
  small: "rounded-[8px]",
  medium: "rounded-[6px]",
  large: "rounded-[6px]",
}

const triggerIconSize: Record<SelectSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6",
}

const triggerIconRight: Record<SelectSize, string> = {
  small: "right-3",
  medium: "right-4",
  large: "right-4",
}

const sortingFont: Record<SelectSize, string> = {
  small: "text-krds-body-sm",
  medium: "text-krds-body-md",
  large: "text-krds-heading-md font-bold",
}

const sortingIconSize: Record<SelectSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-6",
}

const sortingPadX: Record<SelectSize, string> = {
  small: "px-0.5",
  medium: "px-1",
  large: "px-1",
}

const sortingGap: Record<SelectSize, string> = {
  small: "gap-1",
  medium: "gap-1",
  large: "gap-1.5",
}

const itemFont: Record<SelectSize, string> = {
  small: "text-krds-body-sm",
  medium: "text-krds-body-md",
  large: "text-krds-body-lg",
}

const checkIconSize: Record<SelectSize, string> = {
  small: "size-4",
  medium: "size-5",
  large: "size-5",
}

// ── Internal styled primitives (self-contained, not exported) ──────────────

interface KrdsSelectContentProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  matchTriggerWidth?: boolean
  minWidth?: string
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
          "data-[state=open]:animate-in data-[state=closed]:animate-out z-50",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          // panel look
          "border-krds-border-light bg-krds-surface rounded-md border p-2 shadow-md",
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
  )
}

interface KrdsSelectItemProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  size: SelectSize
}

function KrdsSelectItem({ className, children, size, ...props }: KrdsSelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={cn(
        // base
        "cursor-pointer rounded-md px-2 py-2.5 outline-hidden select-none",
        "text-krds-foreground flex items-center justify-between gap-2",
        // hover / focus
        "focus:bg-krds-surface-secondary-subtle",
        // active / pressed
        "active:bg-krds-surface-secondary-subtle",
        // selected
        "data-[state=checked]:bg-krds-surface-secondary-subtle data-[state=checked]:text-krds-foreground-secondary",
        // disabled
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        itemFont[size],
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className={cn("text-krds-foreground-secondary shrink-0", checkIconSize[size])} aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

// ── Public component ───────────────────────────────────────────────────────

function Select({
  options,
  label,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
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
  selectClassName,
  hint,
  error,
  success,
  information,
}: SelectProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId

  const message = renderFieldMessage(inputId, { error, success, information, hint })
  const describedBy = message ? [ariaDescribedby, `${inputId}-message`].filter(Boolean).join(" ") : ariaDescribedby
  const resolvedInvalid = ariaInvalid ?? (error != null && error !== false ? true : undefined)

  const [internal, setInternal] = React.useState<string | undefined>(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internal

  const handleValueChange = (val: string) => {
    if (!isControlled) setInternal(val)
    onChange?.(val)
  }

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
              "text-krds-foreground inline-flex h-auto cursor-pointer appearance-none items-center rounded-sm border border-transparent bg-transparent leading-[1.5] transition-colors outline-none",
              "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-pressed",
              "focus:krds-focus-ring",
              "disabled:text-krds-foreground-disabled disabled:cursor-not-allowed disabled:bg-transparent",
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
                  disabled ? "text-krds-foreground-disabled" : "text-krds-foreground",
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
    )
  }

  // ── Default variant ──────────────────────────────────────────────────────
  return (
    <div data-slot="krds-select" className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label htmlFor={inputId} className="text-krds-foreground text-krds-body-sm">
          {label}
        </label>
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
          aria-invalid={resolvedInvalid}
          aria-describedby={describedBy}
          className={cn(
            // base
            "border-krds-border-dark bg-krds-surface text-krds-foreground relative flex w-full items-center border px-4 transition-colors outline-none",
            // placeholder colour (when no value selected)
            "data-[placeholder]:text-krds-foreground-disabled",
            // focus
            "focus:border-krds-border-primary focus:krds-focus-ring",
            // disabled
            "disabled:bg-krds-surface-disabled disabled:border-krds-border disabled:text-krds-foreground-disabled disabled:cursor-not-allowed",
            // error (via aria-invalid)
            "aria-invalid:border-krds-danger-50 aria-invalid:focus:border-krds-danger-50",
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
                "pointer-events-none absolute top-1/2 shrink-0 -translate-y-1/2",
                disabled ? "text-krds-foreground-disabled" : "text-krds-foreground",
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

      {message}
    </div>
  )
}

export { Select }
export type { SelectProps, SelectOption, SelectSize, SelectVariant }
