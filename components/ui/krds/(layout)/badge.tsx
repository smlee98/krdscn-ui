/**
 * KRDS Badge — text badge, dot badge, and number badge primitives.
 *
 * Figma source: KRDS_v1.0.0
 *  - Badge text label (361:44254): type × variant × size matrix
 *  - Badge dot (361:44242): 6×6 indicator
 *  - Badge number (361:44245): 20px-tall pill counter
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Root as Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/cn";

// ─── Badge (text label) ───────────────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-[4px] px-2 whitespace-nowrap font-normal leading-[1.5]",
  {
    variants: {
      size: {
        lg: "h-8 text-[17px]",
        default: "h-6 text-[15px]"
      },
      type: {
        outline: "border",
        solid: "border-transparent",
        pastel: "border-transparent"
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
        point: ""
      },
      disabled: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      // ── outline type: 1px border + saturated text, transparent fill ───────────
      { type: "outline", variant: "default", className: "border-[#256ef4] text-[#0b50d0]" },
      { type: "outline", variant: "secondary", className: "border-[#063a74] text-[#052b57]" },
      { type: "outline", variant: "tertiary", className: "border-[#58616a] text-[#464c53]" },
      { type: "outline", variant: "point", className: "border-[#d63d4a] text-[#ab2b36]" },
      { type: "outline", variant: "destructive", className: "border-krds-danger-50 text-[#bd2c0f]" },
      { type: "outline", variant: "warning", className: "border-krds-warning-50 text-[#8a5c00]" },
      { type: "outline", variant: "success", className: "border-krds-success-50 text-[#267337]" },
      { type: "outline", variant: "info", className: "border-krds-info-50 text-[#096ab3]" },

      // ── solid type: filled background, white/dark text ────────────────────────
      { type: "solid", variant: "default", className: "bg-krds-primary-50 text-white" },
      { type: "solid", variant: "secondary", className: "bg-[#063a74] text-white" },
      { type: "solid", variant: "tertiary", className: "bg-krds-gray-50 text-white" },
      { type: "solid", variant: "point", className: "bg-[#d63d4a] text-white" },
      { type: "solid", variant: "destructive", className: "bg-krds-danger-50 text-white" },
      { type: "solid", variant: "warning", className: "bg-[#ffb114] text-krds-gray-90" },
      { type: "solid", variant: "success", className: "bg-krds-success-50 text-white" },
      { type: "solid", variant: "info", className: "bg-krds-info-50 text-white" },

      // ── pastel type: tinted background, saturated text ────────────────────────
      { type: "pastel", variant: "default", className: "bg-krds-primary-5 text-[#0b50d0]" },
      { type: "pastel", variant: "secondary", className: "bg-krds-secondary-5 text-[#052b57]" },
      { type: "pastel", size: "lg", variant: "tertiary", className: "bg-krds-gray-10 text-[#464c53]" },
      { type: "pastel", size: "default", variant: "tertiary", className: "bg-krds-gray-5 text-[#464c53]" },
      { type: "pastel", variant: "point", className: "bg-[#fbeff0] text-[#ab2b36]" },
      { type: "pastel", variant: "destructive", className: "bg-krds-danger-5 text-[#bd2c0f]" },
      { type: "pastel", variant: "warning", className: "bg-krds-warning-5 text-[#8a5c00]" },
      { type: "pastel", variant: "success", className: "bg-krds-success-5 text-[#267337]" },
      { type: "pastel", variant: "info", className: "bg-krds-info-5 text-[#096ab3]" },

      // ── disabled: overrides color/border/text per type ────────────────────────
      { type: "outline", disabled: true, className: "border-[#8a949e] text-[#8a949e]" },
      { type: "solid", disabled: true, className: "bg-krds-gray-20 text-krds-gray-50" },
      { type: "pastel", disabled: true, className: "bg-krds-gray-20 text-krds-gray-50" },

      // ── shadcn-compat outline variant (neutral gray tone) ─────────────────────
      { variant: "outline", type: "solid", className: "border border-krds-gray-30 text-krds-gray-90" },
      { variant: "outline", type: "outline", className: "border-krds-gray-30 text-krds-gray-90" },
      { variant: "outline", type: "pastel", className: "border border-krds-gray-30 bg-krds-gray-5 text-krds-gray-90" }
    ],
    defaultVariants: {
      size: "default",
      type: "solid",
      variant: "default",
      disabled: false
    }
  }
);

type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>;
type BadgeType = NonNullable<VariantProps<typeof badgeVariants>["type"]>;
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  };

function Badge({ className, size, type, variant, disabled, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="krds-badge"
      data-disabled={disabled || undefined}
      className={cn(badgeVariants({ size, type, variant, disabled, className }))}
      {...props}
    />
  );
}

// ─── BadgeDot ─────────────────────────────────────────────────────────────────

type BadgeDotTone = "primary" | "new";

type BadgeDotProps = React.ComponentProps<"span"> & {
  tone?: BadgeDotTone;
};

function BadgeDot({ tone = "primary", className, ...props }: BadgeDotProps) {
  return (
    <span
      data-slot="krds-badge-dot"
      aria-hidden={props["aria-label"] ? undefined : true}
      className={cn(
        "inline-block size-[6px] shrink-0 rounded-full",
        tone === "primary" ? "bg-krds-primary-50" : "bg-[#d63d4a]",
        className
      )}
      {...props}
    />
  );
}

// ─── BadgeNumber ──────────────────────────────────────────────────────────────

type BadgeNumberTone = "primary" | "new";

type BadgeNumberProps = React.ComponentProps<"span"> & {
  tone?: BadgeNumberTone;
  /** Cap displayed value (e.g. 99 → "+99"). Applied only when children is a number. */
  max?: number;
  children: React.ReactNode;
};

function BadgeNumber({ tone = "primary", max, className, children, ...props }: BadgeNumberProps) {
  const display = typeof children === "number" && typeof max === "number" && children > max ? `+${max}` : children;
  return (
    <span
      data-slot="krds-badge-number"
      className={cn(
        "inline-flex h-5 min-w-[26px] shrink-0 items-center justify-center rounded-full px-2",
        "text-[15px] leading-[1.5] font-normal whitespace-nowrap text-white",
        tone === "primary" ? "bg-krds-primary-50" : "bg-[#d63d4a]",
        className
      )}
      {...props}
    >
      {display}
    </span>
  );
}

export { Badge, BadgeDot, BadgeNumber, badgeVariants };
export type {
  BadgeProps,
  BadgeDotProps,
  BadgeNumberProps,
  BadgeSize,
  BadgeType,
  BadgeVariant,
  BadgeDotTone,
  BadgeNumberTone
};
