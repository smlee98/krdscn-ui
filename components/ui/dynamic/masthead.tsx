"use client";

import type * as React from "react";
import { Masthead as KrdsMasthead } from "@/components/ui/krds/(identity)/masthead";

// shadcn has no Masthead primitive — render KRDS regardless of active UI system.
// (Composition primitive — Korean government identity bar.)
export function Masthead(props: React.ComponentProps<typeof KrdsMasthead>) {
  return <KrdsMasthead {...props} />;
}
