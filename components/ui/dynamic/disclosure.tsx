"use client"

import {
  Collapsible as ShadcnCollapsible,
  CollapsibleContent as ShadcnCollapsibleContent,
  CollapsibleTrigger as ShadcnCollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Disclosure as KrdsDisclosure,
  DisclosureContent as KrdsDisclosureContent,
  DisclosureTrigger as KrdsDisclosureTrigger,
} from "@/components/ui/krds/(layout)/disclosure"
import type {
  DisclosureContentProps,
  DisclosureProps,
  DisclosureTriggerProps,
} from "@/components/ui/krds/(layout)/disclosure"
import { useUISystem } from "@/lib/ui-system"
import { cn } from "@/lib/cn"
import { ChevronDown } from "lucide-react"

export type {
  DisclosureProps,
  DisclosureContentProps,
  DisclosureTriggerProps,
} from "@/components/ui/krds/(layout)/disclosure"

// Dual-render dispatcher (cf. accordion.tsx): the public surface is the KRDS
// Disclosure compound API, but each part renders either the KRDS-chromed wrapper
// or the vanilla shadcn Collapsible primitive based on <UISystemProvider>.
// KRDS open/defaultOpen/onOpenChange map 1:1 onto Radix Collapsible's state props.
// In shadcn mode the trigger renders a rotating ChevronDown + medium-weight label,
// and the content renders a rounded, bordered, muted panel (p-6) — mirroring the
// KRDS chrome with shadcn tokens.

// ─── Dispatched parts ─────────────────────────────────────────────────────────

export function Disclosure(props: DisclosureProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsDisclosure {...props} />
  const { defaultOpen, open, onOpenChange, className, children, ...rest } = props
  return (
    <ShadcnCollapsible
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={className}
      {...rest}
    >
      {children}
    </ShadcnCollapsible>
  )
}

export function DisclosureTrigger(props: DisclosureTriggerProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsDisclosureTrigger {...props} />
  const { className, children, ...rest } = props
  return (
    <ShadcnCollapsibleTrigger
      className={cn(
        "group text-foreground hover:text-foreground/80 focus-visible:ring-ring inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-base font-medium select-none focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...rest}
    >
      <ChevronDown
        size={20}
        aria-hidden="true"
        className="text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
      <span>{children}</span>
    </ShadcnCollapsibleTrigger>
  )
}

export function DisclosureContent(props: DisclosureContentProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsDisclosureContent {...props} />
  const { className, children, ...rest } = props
  return (
    <ShadcnCollapsibleContent className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 overflow-hidden">
      <div className={cn("bg-muted/50 text-foreground rounded-lg border p-6", className)} {...rest}>
        {children}
      </div>
    </ShadcnCollapsibleContent>
  )
}
