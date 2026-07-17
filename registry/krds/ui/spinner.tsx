// rsc:safe
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// KRDS defines a single spinner size: 20px box, 2px border (_spinner.scss:7,14,41-43
// — --krds-spinner--size: var(--krds-size-height-3) = 20px, border-width-variable-medium = 2px).
// `small` below is that spec size and is the default; `medium`/`large` are project
// extensions (Figma-derived) with no KRDS web reference.
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
    defaultVariants: { size: "small" },
  }
)

type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string
    // Renders `label` visibly next to the ring instead of sr-only text (KRDS default
    // is a flex row with visible label, gap 8px, text-subtle gray-70, body-small 15px —
    // spinner.html:24). Default false keeps existing sr-only-only call sites unchanged.
    showLabel?: boolean
    // "form" = KRDS .form-spinner in-field variant: absolute, right-aligned, horizontal
    // padding (_spinner.scss:52-62). The parent element must be position:relative for
    // the ring to anchor against the field it overlays.
    variant?: "default" | "form"
  }
type KrdsSpinnerProps = SpinnerProps

function Spinner({
  size,
  className,
  label = "로딩 중",
  showLabel = false,
  variant = "default",
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      data-slot="krds-spinner-wrapper"
      data-variant={variant}
      className={cn(
        "inline-flex items-center gap-2",
        variant === "form" && "absolute inset-y-0 right-0 justify-end px-4"
      )}
    >
      <span
        data-slot="krds-spinner"
        aria-hidden="true"
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      />
      {showLabel ? (
        <span className="text-krds-body-sm text-krds-foreground-subtle">{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  )
}

export { Spinner, spinnerVariants }
export type { SpinnerProps, KrdsSpinnerProps }
