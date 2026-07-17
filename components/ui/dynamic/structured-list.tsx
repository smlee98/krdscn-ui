"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import {
  StructuredList as KrdsStructuredList,
  StructuredListGroup as KrdsStructuredListGroup,
  StructuredListCheck as KrdsStructuredListCheck,
  StructuredListActions as KrdsStructuredListActions,
  StructuredListBadge as KrdsStructuredListBadge,
  StructuredListBody as KrdsStructuredListBody,
  StructuredListDescription as KrdsStructuredListDescription,
  StructuredListHeader as KrdsStructuredListHeader,
  StructuredListImage as KrdsStructuredListImage,
  StructuredListMetadata as KrdsStructuredListMetadata,
  StructuredListMetadataItem as KrdsStructuredListMetadataItem,
  StructuredListPeriod as KrdsStructuredListPeriod,
  StructuredListSubAction as KrdsStructuredListSubAction,
  StructuredListSubActions as KrdsStructuredListSubActions,
  StructuredListTag as KrdsStructuredListTag,
  StructuredListTagList as KrdsStructuredListTagList,
  StructuredListTitle as KrdsStructuredListTitle,
} from "@/components/ui/krds/(layout)/structured-list"
import type {
  StructuredListProps,
  StructuredListGroupProps,
  StructuredListCheckProps,
  StructuredListImageProps,
  StructuredListBodyProps,
  StructuredListHeaderProps,
  StructuredListBadgeProps,
  StructuredListTitleProps,
  StructuredListDescriptionProps,
  StructuredListPeriodProps,
  StructuredListMetadataProps,
  StructuredListMetadataItemProps,
  StructuredListActionsProps,
  StructuredListSubActionProps,
  StructuredListSubActionsProps,
  StructuredListTagListProps,
  StructuredListTagProps,
} from "@/components/ui/krds/(layout)/structured-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

export type {
  StructuredListProps,
  StructuredListGroupProps,
  StructuredListCheckProps,
  StructuredListImageProps,
  StructuredListBodyProps,
  StructuredListHeaderProps,
  StructuredListBadgeProps,
  StructuredListTitleProps,
  StructuredListDescriptionProps,
  StructuredListPeriodProps,
  StructuredListMetadataProps,
  StructuredListMetadataItemProps,
  StructuredListActionsProps,
  StructuredListSubActionProps,
  StructuredListSubActionsProps,
  StructuredListTagListProps,
  StructuredListTagProps,
} from "@/components/ui/krds/(layout)/structured-list"

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS StructuredList compound API; each part renders either
// the KRDS-chromed wrapper or a vanilla shadcn card-look reconstruction based on
// <UISystemProvider>.
//
// shadcn has no card primitive, so the shadcn path rebuilds the card look from
// shadcn tokens (rounded-xl border bg-card text-card-foreground shadow-sm) plus the
// badge/button primitives. KRDS-only chrome (hex borders, krds-* tokens, h-6 badge
// pill, h-8 tag pill) is intentionally shed — the shadcn variant takes its width
// from the parent. children / onClick / aria are preserved across both paths.

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnStructuredListGroup({ className, children }: StructuredListGroupProps) {
  return (
    <ul
      data-slot="structured-list-group"
      role="list"
      className={cn("flex w-full list-none flex-col gap-4 p-0", className)}
    >
      {children}
    </ul>
  )
}

function ShadcnStructuredList({
  variant = "vertical",
  size: _size = "md",
  selectable = false,
  checked = false,
  className,
  children,
}: StructuredListProps) {
  return (
    <li
      data-slot="structured-list"
      data-variant={variant}
      data-selectable={selectable || undefined}
      data-checked={checked || undefined}
      aria-checked={selectable ? checked : undefined}
      className={cn(
        "group/structured-list bg-card text-card-foreground flex list-none flex-col overflow-hidden rounded-xl border shadow-sm",
        variant === "horizontal" && "sm:flex-row",
        checked && "border-ring ring-ring ring-2",
        className
      )}
    >
      {children}
    </li>
  )
}

function ShadcnStructuredListCheck({ className, children }: StructuredListCheckProps) {
  return (
    <div data-slot="structured-list-check" className={cn("flex shrink-0 items-start p-6 pb-0", className)}>
      {children}
    </div>
  )
}

function ShadcnStructuredListImage({ src, alt, className }: StructuredListImageProps) {
  return (
    <img
      data-slot="structured-list-image"
      src={src}
      alt={alt}
      className={cn(
        "bg-muted h-48 w-full shrink-0 object-cover",
        "group-data-[variant=horizontal]/structured-list:h-auto group-data-[variant=horizontal]/structured-list:w-64 group-data-[variant=horizontal]/structured-list:self-stretch",
        className
      )}
    />
  )
}

function ShadcnStructuredListBody({ className, children }: StructuredListBodyProps) {
  return (
    <div data-slot="structured-list-body" className={cn("flex flex-1 flex-col gap-4 p-6", className)}>
      {children}
    </div>
  )
}

function ShadcnStructuredListHeader({ className, children }: StructuredListHeaderProps) {
  return (
    <div data-slot="structured-list-header" className={cn("flex flex-col gap-2", className)}>
      {children}
    </div>
  )
}

function ShadcnStructuredListBadge({ className, children }: StructuredListBadgeProps) {
  return (
    <Badge variant="secondary" data-slot="structured-list-badge" className={cn("self-start", className)}>
      {children}
    </Badge>
  )
}

function ShadcnStructuredListTitle({ className, children, withArrow = true }: StructuredListTitleProps) {
  return (
    <h3
      data-slot="structured-list-title"
      className={cn("flex items-center gap-2 text-lg leading-tight font-semibold", className)}
    >
      <span className="line-clamp-1 flex-1">{children}</span>
      {withArrow ? <ArrowRight className="size-5 shrink-0" aria-hidden="true" /> : null}
    </h3>
  )
}

function ShadcnStructuredListDescription({ className, children }: StructuredListDescriptionProps) {
  return (
    <p data-slot="structured-list-description" className={cn("text-muted-foreground line-clamp-3 text-sm", className)}>
      {children}
    </p>
  )
}

function ShadcnStructuredListPeriod({ className, label = "기간", children }: StructuredListPeriodProps) {
  return (
    <p data-slot="structured-list-period" className={cn("flex flex-wrap items-baseline gap-2 text-sm", className)}>
      <span className="font-medium">{label}</span>
      <span className="text-muted-foreground">{children}</span>
    </p>
  )
}

function ShadcnStructuredListMetadata({ className, children }: StructuredListMetadataProps) {
  const items = React.Children.toArray(children).filter(React.isValidElement)
  return (
    <ul data-slot="structured-list-metadata" className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 ? <span aria-hidden="true" className="bg-border inline-block h-3 w-px" /> : null}
          {item}
        </React.Fragment>
      ))}
    </ul>
  )
}

function ShadcnStructuredListMetadataItem({ className, children }: StructuredListMetadataItemProps) {
  return (
    <li data-slot="structured-list-metadata-item" className={cn("text-muted-foreground text-xs", className)}>
      {children}
    </li>
  )
}

function ShadcnStructuredListActions({ className, children }: StructuredListActionsProps) {
  return (
    <div
      data-slot="structured-list-actions"
      className={cn("flex flex-wrap items-center justify-between gap-4 border-t pt-4", className)}
    >
      {children}
    </div>
  )
}

function ShadcnStructuredListSubActions({ className, children }: StructuredListSubActionsProps) {
  return (
    <div data-slot="structured-list-sub-actions" className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  )
}

function ShadcnStructuredListSubAction({
  className,
  children,
  icon,
  onClick,
  type = "button",
  "aria-pressed": ariaPressed,
  "aria-label": ariaLabel,
}: StructuredListSubActionProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      type={type}
      data-slot="structured-list-sub-action"
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
    >
      {icon ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </Button>
  )
}

function ShadcnStructuredListTagList({ className, children }: StructuredListTagListProps) {
  return (
    <ul
      data-slot="structured-list-tag-list"
      className={cn("flex flex-wrap items-center gap-2 border-t pt-4", className)}
    >
      {children}
    </ul>
  )
}

function ShadcnStructuredListTag({ className, children }: StructuredListTagProps) {
  return (
    <li data-slot="structured-list-tag">
      <Badge variant="outline" className={className}>
        {children}
      </Badge>
    </li>
  )
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function StructuredListGroup(props: StructuredListGroupProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListGroup {...props} />
  return <ShadcnStructuredListGroup {...props} />
}

export function StructuredList(props: StructuredListProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredList {...props} />
  return <ShadcnStructuredList {...props} />
}

export function StructuredListCheck(props: StructuredListCheckProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListCheck {...props} />
  return <ShadcnStructuredListCheck {...props} />
}

export function StructuredListImage(props: StructuredListImageProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListImage {...props} />
  return <ShadcnStructuredListImage {...props} />
}

export function StructuredListBody(props: StructuredListBodyProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListBody {...props} />
  return <ShadcnStructuredListBody {...props} />
}

export function StructuredListHeader(props: StructuredListHeaderProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListHeader {...props} />
  return <ShadcnStructuredListHeader {...props} />
}

export function StructuredListBadge(props: StructuredListBadgeProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListBadge {...props} />
  return <ShadcnStructuredListBadge {...props} />
}

export function StructuredListTitle(props: StructuredListTitleProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListTitle {...props} />
  return <ShadcnStructuredListTitle {...props} />
}

export function StructuredListDescription(props: StructuredListDescriptionProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListDescription {...props} />
  return <ShadcnStructuredListDescription {...props} />
}

export function StructuredListPeriod(props: StructuredListPeriodProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListPeriod {...props} />
  return <ShadcnStructuredListPeriod {...props} />
}

export function StructuredListMetadata(props: StructuredListMetadataProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListMetadata {...props} />
  return <ShadcnStructuredListMetadata {...props} />
}

export function StructuredListMetadataItem(props: StructuredListMetadataItemProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListMetadataItem {...props} />
  return <ShadcnStructuredListMetadataItem {...props} />
}

export function StructuredListActions(props: StructuredListActionsProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListActions {...props} />
  return <ShadcnStructuredListActions {...props} />
}

export function StructuredListSubAction(props: StructuredListSubActionProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListSubAction {...props} />
  return <ShadcnStructuredListSubAction {...props} />
}

export function StructuredListSubActions(props: StructuredListSubActionsProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListSubActions {...props} />
  return <ShadcnStructuredListSubActions {...props} />
}

export function StructuredListTagList(props: StructuredListTagListProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListTagList {...props} />
  return <ShadcnStructuredListTagList {...props} />
}

export function StructuredListTag(props: StructuredListTagProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsStructuredListTag {...props} />
  return <ShadcnStructuredListTag {...props} />
}
