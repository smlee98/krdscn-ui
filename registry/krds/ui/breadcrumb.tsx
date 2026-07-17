// rsc:safe
import * as React from "react"
import { ChevronRight, Home, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Breadcrumb (root nav) ────────────────────────────────────────────────────

type BreadcrumbProps = {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

function Breadcrumb({ className, children, "aria-label": ariaLabel = "현재 경로" }: BreadcrumbProps) {
  return (
    <nav data-slot="krds-breadcrumb" aria-label={ariaLabel} className={cn("inline-flex items-center", className)}>
      {children}
    </nav>
  )
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

type BreadcrumbListProps = {
  className?: string
  children?: React.ReactNode
}

function BreadcrumbList({ className, children }: BreadcrumbListProps) {
  return (
    <ol data-slot="krds-breadcrumb-list" className={cn("flex flex-wrap items-center gap-1", className)}>
      {children}
    </ol>
  )
}

// ─── BreadcrumbItem ───────────────────────────────────────────────────────────

type BreadcrumbItemProps = {
  className?: string
  children?: React.ReactNode
}

function BreadcrumbItem({ className, children }: BreadcrumbItemProps) {
  return (
    <li
      data-slot="krds-breadcrumb-item"
      className={cn(
        "inline-flex items-center gap-1",
        // KRDS attaches the separator chevron to each crumb's own `::after` rather than
        // a sibling DOM node (_breadcrumb.scss:67-77), so the mobile ellipsis gate below
        // sees only real crumbs when counting nth-child — no separator to throw it off.
        "[&:not(:last-child)>[data-slot=krds-breadcrumb-item-separator]]:inline-flex",
        // Mobile: collapse intermediate crumbs, keep home + current, and prefix the
        // (still-visible) current item with an ellipsis + its own separator chevron
        // ahead of the label (KRDS `li:last-child::before/::after` + `.txt{order:3}`,
        // _breadcrumb.scss:106-124).
        "max-md:[&:not(:first-child):not(:last-child)]:sr-only",
        "max-md:[&:last-child:not(:first-child):not(:nth-child(2))]:before:content-['…']",
        "max-md:[&:last-child:not(:first-child):not(:nth-child(2))]:before:text-krds-foreground",
        "max-md:[&:last-child:not(:first-child):not(:nth-child(2))>[data-slot=krds-breadcrumb-item-separator]]:inline-flex",
        "max-md:[&:last-child:not(:first-child):not(:nth-child(2))>[data-slot=krds-breadcrumb-item-label]]:order-last",
        className
      )}
    >
      <span data-slot="krds-breadcrumb-item-label" className="inline-flex items-center gap-1">
        {children}
      </span>
      <ChevronRight
        aria-hidden="true"
        size={16}
        data-slot="krds-breadcrumb-item-separator"
        className="text-krds-foreground hidden shrink-0"
      />
    </li>
  )
}

// ─── BreadcrumbLink ───────────────────────────────────────────────────────────

const linkBaseClass = cn(
  "inline-flex h-6 items-center gap-1 rounded-[6px] px-1",
  "text-krds-foreground text-krds-body-sm underline",
  "hover:bg-krds-surface-secondary-subtle",
  "active:bg-krds-surface-secondary-pressed",
  "focus-visible:krds-focus-ring-inset"
)

type BreadcrumbLinkProps = {
  className?: string
  children?: React.ReactNode
  href?: string
}

function BreadcrumbLink({ className, children, href }: BreadcrumbLinkProps) {
  return (
    <a data-slot="krds-breadcrumb-link" href={href} className={cn(linkBaseClass, className)}>
      {children}
    </a>
  )
}

// ─── BreadcrumbHome ───────────────────────────────────────────────────────────

type BreadcrumbHomeProps = {
  className?: string
  children?: React.ReactNode
  href?: string
}

function BreadcrumbHome({ className, children = "홈", href = "/" }: BreadcrumbHomeProps) {
  return (
    <a data-slot="krds-breadcrumb-home" href={href} className={cn(linkBaseClass, className)}>
      <Home size={16} aria-hidden="true" />
      {children}
    </a>
  )
}

// ─── BreadcrumbPage (current page) ────────────────────────────────────────────

type BreadcrumbPageProps = {
  className?: string
  children?: React.ReactNode
}

function BreadcrumbPage({ className, children }: BreadcrumbPageProps) {
  return (
    <span
      data-slot="krds-breadcrumb-page"
      aria-current="page"
      className={cn(
        "inline-flex h-6 items-center rounded-[6px] px-1",
        "text-krds-foreground text-krds-body-sm underline",
        className
      )}
    >
      {children}
    </span>
  )
}

// ─── BreadcrumbEllipsis (overflow placeholder) ────────────────────────────────

type BreadcrumbEllipsisProps = {
  className?: string
}

function BreadcrumbEllipsis({ className }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="krds-breadcrumb-ellipsis"
      role="presentation"
      className={cn("text-krds-foreground inline-flex h-6 items-center rounded-[6px] px-1", className)}
    >
      <MoreHorizontal size={16} aria-hidden="true" />
      <span className="sr-only">생략된 경로</span>
    </span>
  )
}

// ─── BreadcrumbSeparator (deprecated no-op) ───────────────────────────────────

// KRDS renders no separator DOM node — the chevron is each crumb's own trailing
// `::after` (see BreadcrumbItem above). This is kept only so existing call sites
// that still render <BreadcrumbSeparator /> between items don't break; a sibling
// <li> here would re-introduce the nth-child miscount BreadcrumbItem now avoids,
// so it intentionally renders nothing.
type BreadcrumbSeparatorProps = {
  className?: string
  children?: React.ReactNode
}

function BreadcrumbSeparator(_props: BreadcrumbSeparatorProps) {
  return null
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbHome,
  BreadcrumbPage,
  BreadcrumbEllipsis,
  BreadcrumbSeparator,
}
