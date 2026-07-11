"use client"

import * as React from "react"
import { CircleAlert, CheckCircle2, Info } from "lucide-react"

import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"
import {
  FieldHint as KrdsFieldHint,
  FieldError as KrdsFieldError,
  FieldSuccess as KrdsFieldSuccess,
  FieldInformation as KrdsFieldInformation,
  type FieldMessageProps,
} from "@/components/ui/krds/(input)/field-message"

export type { FieldMessageProps } from "@/components/ui/krds/(input)/field-message"

// Dual-render dispatcher. field-message had no dispatcher, so form examples
// (text-input / select / textarea / date-input) imported the KRDS parts directly
// and rendered KRDS chrome — hardcoded hex (#464c53 hint / #bd2c0f error /
// #267337 success / #096ab3 info) — in BOTH systems. shadcn has no field-message
// primitive; its form pattern uses muted-foreground for descriptions and
// destructive for errors. The shadcn branch retokenizes each part: error →
// `destructive`, hint → `muted-foreground`. success/info have no shadcn semantic
// token, so they use tailwind palette colors with a dark-mode pair (the canonical
// shadcn-ecosystem fallback for non-semantic states). Icons are preserved.
// Public surface is unchanged.

const SHADCN_BASE = "flex items-center gap-1.5 text-sm leading-none"

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnFieldHint({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p data-slot="shadcn-field-hint" className={cn("text-muted-foreground text-sm leading-snug", className)} {...props}>
      {children}
    </p>
  )
}

function ShadcnFieldError({ children, className, ...props }: FieldMessageProps) {
  return (
    <div
      data-slot="shadcn-field-error"
      role="alert"
      className={cn(SHADCN_BASE, "text-destructive", className)}
      {...props}
    >
      <CircleAlert className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

function ShadcnFieldSuccess({ children, className, ...props }: FieldMessageProps) {
  return (
    <div
      data-slot="shadcn-field-success"
      className={cn(SHADCN_BASE, "text-emerald-600 dark:text-emerald-400", className)}
      {...props}
    >
      <CheckCircle2 className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

function ShadcnFieldInformation({ children, className, ...props }: FieldMessageProps) {
  return (
    <div
      data-slot="shadcn-field-information"
      className={cn(SHADCN_BASE, "text-blue-600 dark:text-blue-400", className)}
      {...props}
    >
      <Info className="size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

function FieldHint(props: React.HTMLAttributes<HTMLParagraphElement>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsFieldHint {...props} />
  return <ShadcnFieldHint {...props} />
}

function FieldError(props: FieldMessageProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsFieldError {...props} />
  return <ShadcnFieldError {...props} />
}

function FieldSuccess(props: FieldMessageProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsFieldSuccess {...props} />
  return <ShadcnFieldSuccess {...props} />
}

function FieldInformation(props: FieldMessageProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsFieldInformation {...props} />
  return <ShadcnFieldInformation {...props} />
}

export { FieldHint, FieldError, FieldSuccess, FieldInformation }
