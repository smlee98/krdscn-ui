"use client";

import type * as React from "react";
import { CoachMark as KrdsCoachMark } from "@/components/ui/krds/(help)/coach-mark";

export type { CoachMarkProps } from "@/components/ui/krds/(help)/coach-mark";

// shadcn has no CoachMark primitive — render KRDS regardless of active UI system.
export function CoachMark(props: React.ComponentProps<typeof KrdsCoachMark>) {
  return <KrdsCoachMark {...props} />;
}
