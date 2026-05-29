"use client";

import type * as React from "react";
import { Tooltip as KrdsTooltip } from "@/components/ui/krds/(help)/tooltip";

export type { TooltipProps } from "@/components/ui/krds/(help)/tooltip";

// KRDS Tooltip uses Radix Tooltip directly with self-provisioned Provider per
// instance. shadcn has no separate KRDS-styled tooltip variant, so render KRDS
// regardless of active UI system.
export function Tooltip(props: React.ComponentProps<typeof KrdsTooltip>) {
  return <KrdsTooltip {...props} />;
}
