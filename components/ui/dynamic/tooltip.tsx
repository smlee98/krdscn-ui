"use client"

import { Tooltip as KrdsTooltip } from "@/components/ui/krds/(help)/tooltip"
import type { TooltipProps } from "@/components/ui/krds/(help)/tooltip"
import {
  Tooltip as ShadcnTooltipRoot,
  TooltipContent as ShadcnTooltipContent,
  TooltipProvider as ShadcnTooltipProvider,
  TooltipTrigger as ShadcnTooltipTrigger,
} from "@/components/ui/tooltip"
import { useUISystem } from "@/lib/ui-system"

export type { TooltipProps } from "@/components/ui/krds/(help)/tooltip"

// Dual-render dispatcher (cf. accordion.tsx): the public surface stays the KRDS
// single-component Tooltip API, but renders either the KRDS-chromed wrapper or a
// vanilla shadcn Tooltip assembled from Provider+Root+Trigger+Content based on
// <UISystemProvider>. The KRDS-only `variant` (vertical/horizontal/box) is dropped
// in shadcn mode — shadcn has no box/inline axis — but its default-side semantics
// are preserved so an unspecified `side` resolves the same way in both systems.

const DEFAULT_SIDE: Record<NonNullable<TooltipProps["variant"]>, NonNullable<TooltipProps["side"]>> = {
  vertical: "top",
  horizontal: "right",
  box: "top",
}

export function Tooltip(props: TooltipProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTooltip {...props} />

  const { text, variant = "vertical", side, align = "center", className, children, delayDuration = 0 } = props
  const resolvedSide = side ?? DEFAULT_SIDE[variant]

  return (
    <ShadcnTooltipProvider delayDuration={delayDuration}>
      <ShadcnTooltipRoot>
        <ShadcnTooltipTrigger asChild>{children}</ShadcnTooltipTrigger>
        <ShadcnTooltipContent side={resolvedSide} align={align} className={className}>
          {text}
        </ShadcnTooltipContent>
      </ShadcnTooltipRoot>
    </ShadcnTooltipProvider>
  )
}
