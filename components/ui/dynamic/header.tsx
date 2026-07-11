"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import {
  HeaderBrand as KrdsHeaderBrand,
  HeaderUtility as KrdsHeaderUtility,
  HeaderUtilityItem as KrdsHeaderUtilityItem,
  HeaderUtilityDivider as KrdsHeaderUtilityDivider,
  HeaderUtilityDropdown,
  HeaderUtilityDropdownItem,
  HeaderActions as KrdsHeaderActions,
  HeaderActionItem as KrdsHeaderActionItem,
  HeaderActionDropdown,
  HeaderNav as KrdsHeaderNav,
  HeaderNavItem as KrdsHeaderNavItem,
} from "@/components/ui/krds/(identity)/header"
import { Button } from "@/components/ui/button"
import { SkipLink } from "@/components/ui/dynamic/skip-link"
import { Masthead } from "@/components/ui/dynamic/masthead"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx).
// shadcn has no site-header primitive, so the shadcn branch reconstructs a minimal
// neutral header from shadcn tokens/atoms (<header> + border-b + bg-background,
// foreground links, ghost <Button>, plain <nav>). KRDS government-specific chrome
// (SkipLink, Masthead, krds-* tokens, three-band layout) is intentionally shed on
// the shadcn path. Link behavior (href / aria-label) is preserved on both paths.
//
// Note: unlike the other compounds, the KRDS Header *root* splits its children by
// element identity (c.type === HeaderUtility / HeaderNav). Because the public parts
// exported here are the dispatcher functions — not the raw KRDS parts — the KRDS
// root can no longer recognize them. So the root performs the utility/nav/top split
// itself against the dispatcher part identities, then renders each band with either
// the KRDS root's wrapper markup (krds mode) or neutral wrappers (shadcn mode).

// ─── Prop types (mirror the KRDS part APIs; public surface preserved) ────────────

type HeaderProps = {
  className?: string
  children?: React.ReactNode
}

type HeaderBrandProps = {
  className?: string
  children?: React.ReactNode
  href?: string
}

type HeaderUtilityProps = {
  className?: string
  children?: React.ReactNode
}

type HeaderUtilityItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  asSelect?: boolean
}

type HeaderActionsProps = {
  className?: string
  children?: React.ReactNode
}

type HeaderActionItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  icon?: React.ReactNode
  "aria-controls"?: string
}

type HeaderNavProps = {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

type HeaderNavItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  hasSubmenu?: boolean
}

// ─── shadcn-mode parts ───────────────────────────────────────────────────────────

function ShadcnHeaderUtility({ className, children }: HeaderUtilityProps) {
  return (
    <div
      data-slot="header-utility"
      className={cn("mx-auto flex h-8 w-full max-w-screen-xl items-center justify-end gap-3 px-4", className)}
    >
      {children}
    </div>
  )
}

function ShadcnHeaderUtilityItem({ className, children, href, asSelect }: HeaderUtilityItemProps) {
  const baseClass = cn(
    "text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-sm text-sm",
    "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
    className
  )
  const content = (
    <>
      {children}
      {asSelect && <ChevronDown className="size-4" aria-hidden="true" />}
    </>
  )
  if (href) {
    return (
      <a data-slot="header-utility-item" href={href} className={baseClass}>
        {content}
      </a>
    )
  }
  return (
    <button data-slot="header-utility-item" type="button" className={baseClass}>
      {content}
    </button>
  )
}

function ShadcnHeaderUtilityDivider() {
  return <span aria-hidden="true" className="bg-border inline-block h-4 w-px" />
}

function ShadcnHeaderBrand({ className, children, href }: HeaderBrandProps) {
  return (
    <a
      data-slot="header-brand"
      href={href}
      className={cn(
        "text-foreground inline-flex h-12 items-center rounded-sm text-lg font-bold",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      {children}
    </a>
  )
}

function ShadcnHeaderActions({ className, children }: HeaderActionsProps) {
  return (
    <div data-slot="header-actions" className={cn("flex flex-1 items-center justify-end gap-2", className)}>
      {children}
    </div>
  )
}

function ShadcnHeaderActionItem({
  className,
  children,
  href,
  icon,
  "aria-controls": ariaControls,
}: HeaderActionItemProps) {
  const content = (
    <>
      {icon}
      {children}
    </>
  )
  if (href) {
    return (
      <Button asChild variant="ghost" className={className}>
        <a data-slot="header-action-item" href={href} aria-controls={ariaControls}>
          {content}
        </a>
      </Button>
    )
  }
  return (
    <Button
      data-slot="header-action-item"
      type="button"
      variant="ghost"
      aria-controls={ariaControls}
      className={className}
    >
      {content}
    </Button>
  )
}

function ShadcnHeaderNav({ className, children, "aria-label": ariaLabel }: HeaderNavProps) {
  return (
    <nav
      data-slot="header-nav"
      aria-label={ariaLabel}
      className={cn("mx-auto flex h-12 w-full max-w-screen-xl items-center gap-1 px-4", className)}
    >
      {children}
    </nav>
  )
}

function ShadcnHeaderNavItem({ className, children, href, hasSubmenu }: HeaderNavItemProps) {
  return (
    <a
      data-slot="header-nav-item"
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground inline-flex h-12 items-center gap-1 rounded-sm px-3 text-sm font-medium",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      {children}
      {hasSubmenu && <ChevronDown className="size-4" aria-hidden="true" />}
    </a>
  )
}

// ─── Dispatched leaf parts (public surface preserved) ────────────────────────────

export function HeaderUtility(props: HeaderUtilityProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderUtility {...props} />
  return <ShadcnHeaderUtility {...props} />
}

export function HeaderUtilityItem(props: HeaderUtilityItemProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderUtilityItem {...props} />
  return <ShadcnHeaderUtilityItem {...props} />
}

export function HeaderUtilityDivider() {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderUtilityDivider />
  return <ShadcnHeaderUtilityDivider />
}

export function HeaderBrand(props: HeaderBrandProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderBrand {...props} />
  return <ShadcnHeaderBrand {...props} />
}

export function HeaderActions(props: HeaderActionsProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderActions {...props} />
  return <ShadcnHeaderActions {...props} />
}

export function HeaderActionItem(props: HeaderActionItemProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderActionItem {...props} />
  return <ShadcnHeaderActionItem {...props} />
}

// HeaderUtilityDropdown / HeaderUtilityDropdownItem / HeaderActionDropdown are KRDS
// identity pieces with light client interactivity and no shadcn primitive equivalent,
// so they are re-exported directly (KRDS-only, no dual-render branch).
export { HeaderUtilityDropdown, HeaderUtilityDropdownItem, HeaderActionDropdown }

export function HeaderNav(props: HeaderNavProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderNav {...props} />
  return <ShadcnHeaderNav {...props} />
}

export function HeaderNavItem(props: HeaderNavItemProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsHeaderNavItem {...props} />
  return <ShadcnHeaderNavItem {...props} />
}

// ─── Dispatched root ──────────────────────────────────────────────────────────────
//
// The root splits children by the dispatcher part identities (utility row / nav row /
// top row). The KRDS Header root cannot be delegated to here: it re-splits children by
// the *raw* KRDS part identities, which the dispatcher parts no longer match. So the
// krds branch reproduces the KRDS three-band wrapper markup verbatim (SkipLink + Masthead
// via the dynamic dispatchers, krds-* tokens, max-w-[1200px] bands) — the leaf chrome
// still comes from the real KRDS parts, and the KRDS original is left untouched.

export function Header({ className, children }: HeaderProps) {
  const system = useUISystem()
  const childrenArray = React.Children.toArray(children)

  const utilityChild = childrenArray.find((c) => React.isValidElement(c) && c.type === HeaderUtility)
  const navChild = childrenArray.find((c) => React.isValidElement(c) && c.type === HeaderNav)
  const topChildren = childrenArray.filter(
    (c) => !(React.isValidElement(c) && c.type === HeaderUtility) && !(React.isValidElement(c) && c.type === HeaderNav)
  )

  if (system === "krds") {
    return (
      <header data-slot="krds-header" className={cn("w-full", className)}>
        <SkipLink href="#main-content">본문 바로가기</SkipLink>
        <Masthead />
        <div className="bg-krds-gray-0 w-full">
          {utilityChild}
          <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-4 pb-4">{topChildren}</div>
        </div>
        {navChild && <div className="border-krds-gray-20 bg-krds-gray-0 w-full border-y">{navChild}</div>}
      </header>
    )
  }

  return (
    <header data-slot="header" className={cn("bg-background w-full border-b", className)}>
      {utilityChild && <div className="bg-muted/40 w-full">{utilityChild}</div>}
      <div className="mx-auto flex w-full max-w-screen-xl items-center gap-10 px-4 py-3">{topChildren}</div>
      {navChild && <div className="w-full border-t">{navChild}</div>}
    </header>
  )
}
