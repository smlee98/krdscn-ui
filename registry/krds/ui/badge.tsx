/**
 * KRDS Badge — text badge, dot badge, and number badge primitives.
 *
 * Figma source: KRDS_v1.0.0
 *  - Badge text label (361:44254): type × variant × size matrix
 *  - Badge dot (361:44242): 6×6 indicator
 *  - Badge number (361:44245): 20px-tall pill counter
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Root as Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

// ─── Badge (text label) ───────────────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[4px] px-2 whitespace-nowrap font-normal leading-[1.5]",
  {
    variants: {
      size: {
        // KRDS compiled CSS (_badge.scss:3-17) only defines base(size-height-4=24px, `default`
        // below) and large(size-height-5=32px, `lg` below) for the text badge, plus the
        // separately-classed number(size-height-3=20px) and dot(6px) variants exported as
        // BadgeNumber/BadgeDot. `small` has no counterpart in the compiled CSS — it is a
        // project extension kept for a denser 20px/13px label use case. Do not remove.
        lg: "h-8 text-krds-body-md",
        default: "h-6 text-krds-body-sm",
        small: "h-5 px-1.5 text-krds-body-xs",
      },
      type: {
        outline: "border",
        solid: "border-transparent",
        pastel: "border-transparent",
      },
      variant: {
        // shadcn-standard 4
        default: "",
        secondary: "",
        outline: "",
        destructive: "",
        // KRDS extensions 5
        success: "",
        warning: "",
        info: "",
        tertiary: "",
        point: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // ── outline type: 1px border + saturated text, transparent fill ───────────
      { type: "outline", variant: "default", className: "border-krds-border-primary text-krds-foreground-primary" },
      { type: "outline", variant: "secondary", className: "border-krds-secondary-bold text-krds-foreground-secondary" },
      { type: "outline", variant: "tertiary", className: "border-krds-border-dark text-krds-foreground-subtle" },
      { type: "outline", variant: "point", className: "border-krds-point-50 text-krds-foreground-point" },
      { type: "outline", variant: "destructive", className: "border-krds-danger-50 text-krds-foreground-danger" },
      { type: "outline", variant: "warning", className: "border-krds-warning-50 text-krds-foreground-warning" },
      { type: "outline", variant: "success", className: "border-krds-success-50 text-krds-foreground-success" },
      { type: "outline", variant: "info", className: "border-krds-info-50 text-krds-foreground-information" },

      // ── solid type: filled background, white/dark text ────────────────────────
      { type: "solid", variant: "default", className: "bg-krds-primary-50 text-white" },
      { type: "solid", variant: "secondary", className: "bg-krds-secondary-bold text-white" },
      { type: "solid", variant: "tertiary", className: "bg-krds-gray-50 text-white" },
      { type: "solid", variant: "point", className: "bg-krds-point-50 text-white" },
      { type: "solid", variant: "destructive", className: "bg-krds-danger-50 text-white" },
      { type: "solid", variant: "warning", className: "bg-krds-warning-30 text-krds-gray-90" },
      { type: "solid", variant: "success", className: "bg-krds-success-50 text-white" },
      { type: "solid", variant: "info", className: "bg-krds-info-50 text-white" },

      // ── pastel type: tinted background, saturated text ────────────────────────
      { type: "pastel", variant: "default", className: "bg-krds-surface-primary-subtle text-krds-foreground-primary" },
      {
        type: "pastel",
        variant: "secondary",
        className: "bg-krds-surface-secondary-subtle text-krds-foreground-secondary",
      },
      {
        type: "pastel",
        size: "lg",
        variant: "tertiary",
        className: "bg-krds-surface-subtle text-krds-foreground-subtle",
      },
      {
        type: "pastel",
        size: "default",
        variant: "tertiary",
        className: "bg-krds-surface-subtler text-krds-foreground-subtle",
      },
      {
        type: "pastel",
        size: "small",
        variant: "tertiary",
        className: "bg-krds-surface-subtler text-krds-foreground-subtle",
      },
      { type: "pastel", variant: "point", className: "bg-krds-surface-point-subtle text-krds-foreground-point" },
      {
        type: "pastel",
        variant: "destructive",
        className: "bg-krds-surface-danger-subtle text-krds-foreground-danger",
      },
      { type: "pastel", variant: "warning", className: "bg-krds-surface-warning-subtle text-krds-foreground-warning" },
      { type: "pastel", variant: "success", className: "bg-krds-surface-success-subtle text-krds-foreground-success" },
      {
        type: "pastel",
        variant: "info",
        className: "bg-krds-surface-information-subtle text-krds-foreground-information",
      },

      // ── disabled: overrides color/border/text per type ────────────────────────
      { type: "outline", disabled: true, className: "border-krds-border text-krds-foreground-disabled" },
      { type: "solid", disabled: true, className: "bg-krds-surface-disabled text-krds-foreground-disabled" },
      { type: "pastel", disabled: true, className: "bg-krds-surface-disabled text-krds-foreground-disabled" },

      // ── shadcn-compat outline variant (neutral gray tone) ─────────────────────
      { variant: "outline", type: "solid", className: "border border-krds-border text-krds-foreground" },
      { variant: "outline", type: "outline", className: "border-krds-border text-krds-foreground" },
      {
        variant: "outline",
        type: "pastel",
        className: "border border-krds-border bg-krds-surface-subtler text-krds-foreground",
      },
    ],
    defaultVariants: {
      size: "default",
      type: "solid",
      variant: "default",
      disabled: false,
    },
  }
)

type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>
type BadgeType = NonNullable<VariantProps<typeof badgeVariants>["type"]>
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }

function Badge({ className, size, type, variant, disabled, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"
  return (
    <Comp
      data-slot="krds-badge"
      data-disabled={disabled || undefined}
      className={cn(badgeVariants({ size, type, variant, disabled, className }))}
      {...props}
    />
  )
}

// ─── BadgeDot ─────────────────────────────────────────────────────────────────

type BadgeDotTone = "primary" | "new"

type BadgeDotProps = React.ComponentProps<"span"> & {
  tone?: BadgeDotTone
}

function BadgeDot({ tone = "primary", className, ...props }: BadgeDotProps) {
  return (
    <span
      data-slot="krds-badge-dot"
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn(
        "inline-block size-[6px] shrink-0 rounded-full",
        tone === "primary" ? "bg-krds-primary-50" : "bg-krds-point-50",
        className
      )}
      {...props}
    />
  )
}

// ─── BadgeNumber ──────────────────────────────────────────────────────────────

type BadgeNumberTone = "primary" | "new"

type BadgeNumberProps = React.ComponentProps<"span"> & {
  tone?: BadgeNumberTone
  /** Cap displayed value (e.g. 999 → "999+"). Applied only when children is a number. */
  max?: number
  children: React.ReactNode
}

function BadgeNumber({ tone = "primary", max, className, children, ...props }: BadgeNumberProps) {
  const display = typeof children === "number" && typeof max === "number" && children > max ? `${max}+` : children
  return (
    <span
      data-slot="krds-badge-number"
      className={cn(
        "inline-flex h-5 min-w-[26px] shrink-0 items-center justify-center rounded-full px-2",
        "text-krds-body-sm font-normal whitespace-nowrap text-white",
        tone === "primary" ? "bg-krds-primary-50" : "bg-krds-point-50",
        className
      )}
      {...props}
    >
      {display}
    </span>
  )
}

export { Badge, BadgeDot, BadgeNumber, badgeVariants }
export type {
  BadgeProps,
  BadgeDotProps,
  BadgeNumberProps,
  BadgeSize,
  BadgeType,
  BadgeVariant,
  BadgeDotTone,
  BadgeNumberTone,
}
