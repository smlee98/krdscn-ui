"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"
import { spinnerVariants } from "@/components/ui/krds/(feedback)/spinner"

type SpinnerSize = "small" | "medium" | "large"

export type SpinnerProps = {
  size?: SpinnerSize
  className?: string
  label?: string
  // Renders `label`/aria-label visibly next to the ring instead of sr-only text —
  // mirrors the KRDS Spinner's showLabel (components/ui/krds/(feedback)/spinner.tsx).
  showLabel?: boolean
  // "form" = in-field variant: absolute, right-aligned, horizontal padding. Parent
  // must be position:relative for the ring to anchor against the field it overlays.
  variant?: "default" | "form"
  "aria-label"?: string
}

const SHADCN_SIZE: Record<SpinnerSize, string> = {
  small: "size-5",
  medium: "size-8",
  large: "size-12",
}

function Spinner({
  size = "large",
  className,
  label,
  showLabel = false,
  variant = "default",
  "aria-label": ariaLabel,
}: SpinnerProps) {
  const system = useUISystem()
  const text = label ?? ariaLabel ?? "로딩 중"

  if (system === "shadcn") {
    return (
      <span
        role="status"
        className={cn(
          "inline-flex items-center gap-2",
          variant === "form" && "absolute inset-y-0 right-0 justify-end px-4"
        )}
      >
        <Loader2
          aria-hidden="true"
          // No color override: inherit currentColor like the vanilla shadcn Spinner
          // primitive (`@/components/ui/spinner` sets no text color), so it renders
          // foreground (near-black) instead of the muted gray it had before.
          className={cn("animate-spin", SHADCN_SIZE[size], className)}
        />
        {showLabel ? (
          <span className="text-muted-foreground text-sm">{text}</span>
        ) : (
          <span className="sr-only">{text}</span>
        )}
      </span>
    )
  }

  return (
    <span
      data-slot="krds-spinner-wrapper"
      role="status"
      data-variant={variant}
      className={cn(
        "inline-flex items-center gap-2",
        variant === "form" && "absolute inset-y-0 right-0 justify-end px-4"
      )}
    >
      <span data-slot="krds-spinner" aria-hidden="true" className={cn(spinnerVariants({ size }), className)} />
      {showLabel ? (
        <span className="text-krds-body-sm text-krds-foreground-subtle">{text}</span>
      ) : (
        <span className="sr-only">{text}</span>
      )}
    </span>
  )
}

export { Spinner }
