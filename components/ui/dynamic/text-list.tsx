"use client";

import type * as React from "react";
import { TextList as KrdsTextList, TextListItem as KrdsTextListItem } from "@/components/ui/krds/(layout)/text-list";

export type { TextListProps, TextListItemProps, TextListType } from "@/components/ui/krds/(layout)/text-list";

// shadcn has no TextList primitive — render KRDS regardless of active UI system.
export function TextList(props: React.ComponentProps<typeof KrdsTextList>) {
  return <KrdsTextList {...props} />;
}

export function TextListItem(props: React.ComponentProps<typeof KrdsTextListItem>) {
  return <KrdsTextListItem {...props} />;
}
