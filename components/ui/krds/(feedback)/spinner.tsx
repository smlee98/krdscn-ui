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

type SpinnerProps = Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
    children?: React.ReactNode;
  };

type KrdsSpinnerProps = SpinnerProps;

function Spinner({ size, label, className, children, ...props }: SpinnerProps) {
  const spinner = (
    <div data-slot="krds-spinner" role="status" className={cn("inline-flex items-center gap-3", className)} {...props}>
      <span aria-hidden="true" className={spinnerVariants({ size })} />
      <span className="sr-only">로딩 중</span>
      {label ? <span className="text-krds-gray-90 text-[0.9375rem]">{label}</span> : null}
    </div>
  );

  if (children) {
    return (
      <div data-slot="krds-form-spinner" className="relative inline-flex w-fit items-center">
        {children}
        <span
          role="status"
          aria-label={label ?? "로딩 중"}
          className={cn(
            spinnerVariants({ size: "small" }),
            "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
          )}
        />
      </div>
    );
  }

  return spinner;
}

export { Spinner, spinnerVariants };
export type { SpinnerProps, KrdsSpinnerProps };
