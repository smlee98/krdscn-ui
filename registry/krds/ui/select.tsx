// rsc:client
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { ChevronDownIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { renderFieldMessage, type FieldMessages } from "@/registry/krds/ui/field-message"

type SelectSize = "small" | "medium" | "large"
type SelectVariant = "default" | "sorting"

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
  small: "right-4",
  medium: "right-4",
  large: "right-4",
}

const sortingFont: Record<SelectSize, string> = {
  small: "text-krds-body-sm",
  medium: "text-krds-body-md",
  // KRDS sorting-large = heading-small(19px) bold, not heading-medium(24px) (_select.scss:168)
  large: "text-krds-heading-sm font-bold",
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

// ── Compound context ─────────────────────────────────────────────────────────
// 단일 context: 사이즈·변형·필드 배선(라벨 htmlFor용 id, aria-describedby, 오류 상태)을
// 파트에 전달한다. 실제 열림/선택 상태는 radix-ui Select 프리미티브가 소유한다.
type SelectContextValue = {
  size: SelectSize
  variant: SelectVariant
  disabled?: boolean
  triggerId: string
  describedBy?: string
  invalid?: boolean
  label?: React.ReactNode
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

function useSelectContext(): SelectContextValue {
  const ctx = React.useContext(SelectContext)
  if (!ctx) throw new Error("Select 파트는 <Select> 안에서만 사용할 수 있습니다.")
  return ctx
}

// ── Root ──────────────────────────────────────────────────────────────────────
type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> &
  FieldMessages & {
    label?: React.ReactNode
    size?: SelectSize
    variant?: SelectVariant
    className?: string
    id?: string
    "aria-invalid"?: boolean
    "aria-describedby"?: string
  }

function Select({
  label,
  size = "large",
  variant = "default",
  className,
  id,
  hint,
  error,
  success,
  information,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  disabled,
  children,
  ...props
}: SelectProps) {
  const autoId = React.useId()
  const triggerId = id ?? autoId

  // 정렬(sorting) 변형은 라벨/필드 메시지를 노출하지 않는다 (_select.scss).
  const message = variant === "sorting" ? null : renderFieldMessage(triggerId, { error, success, information, hint })
  const describedBy = message ? [ariaDescribedby, `${triggerId}-message`].filter(Boolean).join(" ") : ariaDescribedby
  const invalid = ariaInvalid ?? (error != null && error !== false ? true : undefined)

  const ctx: SelectContextValue = { size, variant, disabled, triggerId, describedBy, invalid, label }

  const root = (
    <SelectPrimitive.Root disabled={disabled} {...props}>
      {children}
    </SelectPrimitive.Root>
  )

  if (variant === "sorting") {
    return (
      <SelectContext.Provider value={ctx}>
        <div
          data-slot="krds-select"
          data-variant="sorting"
          className={cn("relative inline-flex items-center", className)}
        >
          {root}
        </div>
      </SelectContext.Provider>
    )
  }

  return (
    <SelectContext.Provider value={ctx}>
      <div data-slot="krds-select" className={cn("flex w-full flex-col gap-2", className)}>
        {label && (
          <label htmlFor={triggerId} className="text-krds-foreground text-krds-body-sm">
            {label}
          </label>
        )}
        {root}
        {message}
      </div>
    </SelectContext.Provider>
  )
}

// ── Trigger ─────────────────────────────────────────────────────────────────
type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  // 정렬 변형의 접근성 라벨. 시각 라벨이 없을 때 사용. 기본값은 한국어 "정렬".
  sortingLabel?: string
}

function SelectTrigger({
  className,
  children,
  id,
  sortingLabel = "정렬",
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalidProp,
  "aria-describedby": ariaDescribedbyProp,
  ...props
}: SelectTriggerProps) {
  const { size, variant, disabled, triggerId, describedBy, invalid, label } = useSelectContext()

  const icon = (className: string) => (
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className={className} aria-hidden="true" />
    </SelectPrimitive.Icon>
  )

  if (variant === "sorting") {
    return (
      <SelectPrimitive.Trigger
        data-slot="krds-select-trigger"
        id={id ?? triggerId}
        aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined) ?? sortingLabel}
        className={cn(
          // KRDS sorting radius = radius-small2(4px), not Tailwind rounded-sm(2px) (_select.scss:194)
          "text-krds-foreground inline-flex h-auto cursor-pointer appearance-none items-center rounded-[4px] border border-transparent bg-transparent leading-[1.5] transition-colors outline-none",
          "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-pressed",
          "focus-visible:krds-focus-ring",
          "disabled:text-krds-foreground-disabled disabled:cursor-not-allowed disabled:bg-transparent",
          sortingFont[size],
          sortingPadX[size],
          sortingGap[size],
          className
        )}
        {...props}
      >
        {children}
        {icon(
          cn(
            "pointer-events-none shrink-0",
            disabled ? "text-krds-foreground-disabled" : "text-krds-foreground",
            sortingIconSize[size]
          )
        )}
      </SelectPrimitive.Trigger>
    )
  }

  return (
    <SelectPrimitive.Trigger
      data-slot="krds-select-trigger"
      id={id ?? triggerId}
      aria-label={ariaLabel}
      aria-invalid={ariaInvalidProp ?? invalid}
      aria-describedby={ariaDescribedbyProp ?? describedBy}
      className={cn(
        // base
        "border-krds-border-dark bg-krds-surface text-krds-foreground relative flex w-full items-center border px-4 transition-colors outline-none",
        // placeholder colour (when no value selected)
        "data-[placeholder]:text-krds-foreground-disabled",
        // focus
        "focus:border-krds-border-primary focus-visible:krds-focus-ring",
        // disabled
        "disabled:bg-krds-surface-disabled disabled:border-krds-border disabled:text-krds-foreground-disabled disabled:cursor-not-allowed",
        // error (via aria-invalid) — KRDS is-error = text-point(point-60) + 2px border, not danger-50 (_select.scss:113,124-128)
        "aria-invalid:border-krds-foreground-point aria-invalid:focus:border-krds-foreground-point aria-invalid:border-2",
        triggerHeight[size],
        triggerFont[size],
        triggerRadius[size],
        // right padding to leave room for chevron
        size === "small" ? "pr-10" : size === "medium" ? "pr-11" : "pr-12",
        className
      )}
      {...props}
    >
      {children}
      {icon(
        cn(
          "pointer-events-none absolute top-1/2 shrink-0 -translate-y-1/2",
          disabled ? "text-krds-foreground-disabled" : "text-krds-foreground",
          triggerIconSize[size],
          triggerIconRight[size]
        )
      )}
    </SelectPrimitive.Trigger>
  )
}

// ── Value ───────────────────────────────────────────────────────────────────
type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>

function SelectValue({ ...props }: SelectValueProps) {
  return <SelectPrimitive.Value data-slot="krds-select-value" {...props} />
}

// ── Content ─────────────────────────────────────────────────────────────────
type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Content> & {
  matchTriggerWidth?: boolean
  minWidth?: string
}

function SelectContent({ className, children, matchTriggerWidth, minWidth, ...props }: SelectContentProps) {
  const { variant } = useSelectContext()
  // default 변형은 트리거 폭에 맞추고, sorting 변형은 최소 폭만 준다.
  const resolvedMatch = matchTriggerWidth ?? variant !== "sorting"
  const resolvedMinWidth = minWidth ?? (variant === "sorting" ? "min-w-[140px]" : undefined)

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="krds-select-content"
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
          resolvedMatch && "w-[var(--radix-select-trigger-width)]",
          !resolvedMatch && resolvedMinWidth,
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="w-full">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

// ── Item ────────────────────────────────────────────────────────────────────
type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>

function SelectItem({ className, children, ...props }: SelectItemProps) {
  const { size } = useSelectContext()
  return (
    <SelectPrimitive.Item
      data-slot="krds-select-item"
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

// ── Group / Label / Separator ─────────────────────────────────────────────────
type SelectGroupProps = React.ComponentProps<typeof SelectPrimitive.Group>

function SelectGroup({ ...props }: SelectGroupProps) {
  return <SelectPrimitive.Group data-slot="krds-select-group" {...props} />
}

type SelectLabelProps = React.ComponentProps<typeof SelectPrimitive.Label>

function SelectLabel({ className, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="krds-select-label"
      className={cn("text-krds-foreground-subtle text-krds-body-xs px-2 py-1.5", className)}
      {...props}
    />
  )
}

type SelectSeparatorProps = React.ComponentProps<typeof SelectPrimitive.Separator>

function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="krds-select-separator"
      className={cn("bg-krds-border-light pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator }
export type {
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
  SelectSeparatorProps,
  SelectSize,
  SelectVariant,
}
