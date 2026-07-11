"use client"

import * as React from "react"
import { TextList as KrdsTextList, TextListItem as KrdsTextListItem } from "@/components/ui/krds/(layout)/text-list"
import type { TextListProps, TextListItemProps, TextListType } from "@/components/ui/krds/(layout)/text-list"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

export type { TextListProps, TextListItemProps, TextListType } from "@/components/ui/krds/(layout)/text-list"

// Dual-render dispatcher: the public surface is the KRDS TextList API, but each
// part renders either the KRDS-chromed list or a vanilla shadcn list based on
// <UISystemProvider>. shadcn has no TextList primitive, so the shadcn branch
// degrades to a plain ul/ol with native markers — KRDS-only chrome (custom
// bullets, circled numbers, the per-item `number` marker, hex colors, index
// context) is intentionally dropped (cf. accordion.tsx variant/size drops).

const ORDERED_TYPES = new Set<TextListType>(["decimal", "ordered", "alpha", "circle-num"])

// Map KRDS ordered types onto the closest native list-style; unordered types
// share list-disc. shadcn carries no L2/L3 marker axis, so dash/hollow flatten
// to disc and alpha/circle-num flatten to decimal.
function shadcnListStyle(type: TextListType): string {
  switch (type) {
    case "alpha":
      return "list-[lower-alpha]"
    case "decimal":
    case "ordered":
    case "circle-num":
      return "list-decimal"
    default:
      return "list-disc"
  }
}

function ShadcnTextList({ type = "disc", className, children, ...rest }: TextListProps) {
  const ordered = ORDERED_TYPES.has(type)
  const Tag = ordered ? "ol" : "ul"
  return (
    <Tag
      className={cn("text-foreground flex flex-col gap-2 pl-5", shadcnListStyle(type), className)}
      {...(rest as React.HTMLAttributes<HTMLOListElement>)}
    >
      {children}
    </Tag>
  )
}

function ShadcnTextListItem({ className, number: _number, children, ...props }: TextListItemProps) {
  return (
    <li className={cn("leading-relaxed break-words", className)} {...props}>
      {children}
    </li>
  )
}

export function TextList(props: TextListProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTextList {...props} />
  return <ShadcnTextList {...props} />
}

export function TextListItem(props: TextListItemProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTextListItem {...props} />
  return <ShadcnTextListItem {...props} />
}
