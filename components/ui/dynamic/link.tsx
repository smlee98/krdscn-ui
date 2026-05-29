"use client";

import { Link as KrdsLink } from "@/components/ui/krds/(action)/link";
import type * as React from "react";

// shadcn has no Link primitive — always render the KRDS Link regardless of active UI system.
export type LinkProps = React.ComponentProps<typeof KrdsLink>;

export function Link(props: LinkProps) {
  return <KrdsLink {...props} />;
}

export type { LinkType, LinkSize } from "@/components/ui/krds/(action)/link";
