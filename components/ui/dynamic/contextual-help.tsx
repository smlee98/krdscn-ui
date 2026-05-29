"use client";

import type * as React from "react";
import {
  ContextualHelp as KrdsContextualHelp,
  ContextualHelpLabel as KrdsContextualHelpLabel,
  ContextualHelpTitle as KrdsContextualHelpTitle
} from "@/components/ui/krds/(help)/contextual-help";

export type { ContextualHelpProps } from "@/components/ui/krds/(help)/contextual-help";

// shadcn has no ContextualHelp primitive — render KRDS regardless of active UI system.
// (KRDS internally uses shadcn Popover, but the chrome is KRDS-specific.)
export function ContextualHelp(props: React.ComponentProps<typeof KrdsContextualHelp>) {
  return <KrdsContextualHelp {...props} />;
}

export function ContextualHelpTitle(props: React.ComponentProps<typeof KrdsContextualHelpTitle>) {
  return <KrdsContextualHelpTitle {...props} />;
}

export function ContextualHelpLabel(props: React.ComponentProps<typeof KrdsContextualHelpLabel>) {
  return <KrdsContextualHelpLabel {...props} />;
}
