import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/cn"

const spinnerVariants = cva(
  "block animate-spin rounded-full border-solid border-krds-border-light border-t-krds-border-primary shrink-0",
  {
    variants: {
      size: {
        small: "size-5 border-2",
        medium: "size-8 border-[3px]",
        large: "size-12 border-4",
      },
    },
    defaultVariants: { size: "large" },
  }
)

type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string
  }
type KrdsSpinnerProps = SpinnerProps

function Spinner({ size, className, label = "로딩 중", ...props }: SpinnerProps) {
  return (
    <span role="status" data-slot="krds-spinner-wrapper">
      <span
        data-slot="krds-spinner"
        aria-hidden="true"
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export { Spinner, spinnerVariants }
export type { SpinnerProps, KrdsSpinnerProps }
