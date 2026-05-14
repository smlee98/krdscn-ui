import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center border leading-none font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        basic: "bg-krds-gray-0 text-krds-gray-90 border-krds-gray-20",
        primary: "bg-krds-primary-50 text-white border-transparent",
        secondary: "bg-krds-secondary-50 text-white border-transparent",
        success: "bg-krds-success-50 text-white border-transparent",
        warning: "bg-[#ffb114] text-krds-gray-90 border-transparent",
        danger: "bg-krds-danger-50 text-white border-transparent",
        information: "bg-krds-info-50 text-white border-transparent",
        point: "bg-krds-warning-50 text-white border-transparent",
        gray: "bg-krds-gray-50 text-white border-transparent",
        disabled: "bg-krds-gray-20 text-krds-gray-50 border-transparent cursor-not-allowed",
      },
      size: {
        small: "h-5 px-1.5 text-xs",
        medium: "h-6 px-2 text-xs",
        large: "h-7 px-2 text-sm",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "basic",
      size: "medium",
      rounded: false,
    },
  }
);

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;
type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>;

function Badge({
  className,
  variant = "basic",
  size = "medium",
  rounded = false,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      data-slot="krds-badge"
      className={cn(badgeVariants({ variant, size, rounded, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeVariant, BadgeSize };
