"use client";

import * as React from "react";
import NextLink from "next/link";

import { cn } from "@/lib/cn";

export type LinkVariant = "default" | "basic" | "unstyled";
export type LinkUnderline = "always" | "hover" | "none";
export type LinkSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "size"> {
  variant?: LinkVariant;
  underline?: LinkUnderline;
  preserveColorOnHover?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  size?: LinkSize;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<LinkSize, string> = {
  xsmall: "text-xs",
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
  xlarge: "text-xl"
};

const underlineClasses: Record<LinkUnderline, string> = {
  always: "underline",
  hover: "no-underline hover:underline",
  none: "no-underline"
};

const variantColorClasses: Record<Exclude<LinkVariant, "unstyled">, string> = {
  default: "text-krds-primary-50 hover:text-krds-primary-90",
  basic: "text-krds-gray-90"
};

function Link({
  variant = "default",
  underline = "always",
  preserveColorOnHover = false,
  icon,
  external = false,
  size = "medium",
  disabled = false,
  children,
  className,
  href,
  ...rest
}: LinkProps) {
  const colorClass =
    variant === "unstyled"
      ? ""
      : variant === "basic"
        ? "text-krds-gray-90"
        : disabled
          ? "text-krds-gray-30"
          : preserveColorOnHover
            ? "text-krds-primary-50"
            : variantColorClasses.default;

  const classes = cn(
    "inline-flex items-center gap-1",
    sizeClasses[size],
    underlineClasses[underline],
    colorClass,
    disabled && "pointer-events-none opacity-50",
    className
  );

  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  const content = (
    <>
      {children}
      {icon && <span aria-hidden="true">{icon}</span>}
    </>
  );

  if (!href || disabled) {
    return (
      <span role="link" aria-disabled={disabled} className={classes}>
        {content}
      </span>
    );
  }

  return (
    <NextLink href={href} className={classes} {...externalProps} {...rest}>
      {content}
    </NextLink>
  );
}

export { Link };
