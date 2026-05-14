/**
 * KRDS Button — native + cva implementation (no shadcn import).
 * Colors driven exclusively by bg-krds-* / text-krds-* / border-krds-* utilities
 * (tokens declared in app/globals.css @theme inline block).
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text" | "link" | "icon";
type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-medium transition-colors outline-none",
    "disabled:pointer-events-none",
    "focus-visible:outline-2 focus-visible:outline-krds-primary-50 focus-visible:outline-offset-2"
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-krds-primary-50 text-white border border-krds-primary-50",
          "hover:bg-krds-primary-90 hover:border-krds-primary-90",
          "active:bg-krds-primary-90 active:border-krds-primary-90",
          "disabled:bg-krds-gray-20 disabled:border-krds-gray-20 disabled:text-krds-gray-50"
        ].join(" "),
        secondary: [
          "bg-transparent text-krds-primary-50 border border-krds-primary-50",
          "hover:bg-krds-primary-5",
          "active:bg-krds-primary-5",
          "disabled:text-krds-gray-30 disabled:border-krds-gray-30 disabled:bg-transparent"
        ].join(" "),
        tertiary: [
          "bg-krds-gray-5 text-krds-gray-90 border border-krds-gray-20",
          "hover:bg-krds-gray-10",
          "active:bg-krds-gray-20",
          "disabled:text-krds-gray-30 disabled:border-krds-gray-20 disabled:bg-krds-gray-5"
        ].join(" "),
        text: [
          "bg-transparent text-krds-primary-50 border border-transparent",
          "hover:bg-krds-primary-5",
          "active:bg-krds-primary-5",
          "disabled:text-krds-gray-30 disabled:bg-transparent"
        ].join(" "),
        link: [
          "bg-transparent text-krds-primary-50 border border-transparent",
          "underline underline-offset-2",
          "hover:text-krds-primary-90 hover:bg-transparent",
          "active:text-krds-primary-90",
          "disabled:text-krds-gray-30 disabled:bg-transparent"
        ].join(" "),
        icon: [
          "bg-krds-gray-5 text-krds-gray-90 border border-krds-gray-20",
          "hover:bg-krds-gray-10",
          "active:bg-krds-gray-20",
          "disabled:text-krds-gray-30 disabled:border-krds-gray-20 disabled:bg-krds-gray-5",
          "aspect-square p-0 rounded-lg"
        ].join(" ")
      },
      size: {
        xsmall: "h-7 px-3 gap-1 rounded text-xs",
        small: "h-8 px-3 gap-1.5 rounded text-xs",
        medium: "h-10 px-4 py-2 gap-2 rounded-md text-sm",
        large: "h-11 px-5 py-2.5 gap-2 rounded-md text-base",
        xlarge: "h-12 px-6 py-3 gap-2.5 rounded-lg text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "medium"
    }
  }
);

function Button({
  className,
  variant = "primary",
  size = "medium",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="krds-button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonVariant, ButtonSize };
