import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

const spinnerVariants = cva(
  "block animate-spin rounded-full border-solid border-krds-gray-20 border-t-krds-primary-50 shrink-0",
  {
    variants: {
      size: {
        small: "size-5 border-2",
        medium: "size-8 border-[3px]",
        large: "size-12 border-4"
      }
    },
    defaultVariants: { size: "large" }
  }
);

type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> & VariantProps<typeof spinnerVariants>;
type KrdsSpinnerProps = SpinnerProps;

function Spinner({ size, className, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="krds-spinner"
      role="status"
      aria-hidden="true"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
export type { SpinnerProps, KrdsSpinnerProps };
