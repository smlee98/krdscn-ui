// rsc:client
"use client";

import * as React from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/cn";

type LinkVariant = "default" | "basic" | "unstyled";
type LinkUnderline = "always" | "hover" | "none";
type LinkSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

const linkVariants = cva(
  "inline-flex items-center gap-1",
  {
    variants: {
      variant: {
        default: "text-krds-primary-50 hover:text-krds-primary-90",
        basic: "text-krds-gray-90",
        unstyled: "",
      },
      underline: {
        always: "underline",
        hover: "no-underline hover:underline",
        none: "no-underline",
      },
      size: {
        xsmall: "text-xs",
        small: "text-sm",
        medium: "text-base",
        large: "text-lg",
        xlarge: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: "always",
      size: "medium",
    },
  }
);

function Link({
  variant = "default",
  underline = "always",
  size = "medium",
  preserveColorOnHover = false,
  icon,
  external = false,
  disabled = false,
  asChild = false,
  children,
  className,
  href,
  ...props
}: Omit<React.ComponentProps<"a">, "size"> &
  VariantProps<typeof linkVariants> & {
    asChild?: boolean;
    preserveColorOnHover?: boolean;
    icon?: React.ReactNode;
    external?: boolean;
    disabled?: boolean;
  }) {
  const classes = cn(
    linkVariants({ variant, underline, size, className }),
    disabled && "pointer-events-none opacity-50 text-krds-gray-30",
    preserveColorOnHover && variant === "default" && "hover:text-krds-primary-50"
  );

  const externalProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const content = (
    <>
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </>
  );

  if (asChild) {
    return (
      <Slot.Root data-slot="krds-link" className={classes} {...externalProps} {...props}>
        {children}
      </Slot.Root>
    );
  }

  if (!href || disabled) {
    return (
      <span data-slot="krds-link" role="link" aria-disabled={disabled} className={classes}>
        {content}
      </span>
    );
  }

  return (
    <NextLink
      data-slot="krds-link"
      href={href}
      className={classes}
      {...externalProps}
      {...props}
    >
      {content}
    </NextLink>
  );
}

export { Link, linkVariants };
export type { LinkVariant, LinkUnderline, LinkSize };
