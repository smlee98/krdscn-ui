// rsc:client
"use client"

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/dynamic/button"
import { cn } from "@/lib/cn"

// ─── Group context ────────────────────────────────────────────────────────────

type SideNavigationGroupCtx = { open: boolean; toggle: () => void; listId: string }
const SideNavigationGroupContext = React.createContext<SideNavigationGroupCtx | null>(null)

// ─── Popup context (3Depth popup trigger + sliding 4Depth panel) ──────────────

type SideNavigationPopupCtx = { open: boolean; toggle: () => void; panelId: string }
const SideNavigationPopupContext = React.createContext<SideNavigationPopupCtx | null>(null)

// ─── SideNavigation (root) ────────────────────────────────────────────────────

type SideNavigationProps = {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

function SideNavigation({ className, children, "aria-label": ariaLabel = "사이드 내비게이션" }: SideNavigationProps) {
  return (
    <nav
      data-slot="krds-side-navigation"
      aria-label={ariaLabel}
      className={cn("relative flex w-[248px] flex-col overflow-hidden", className)}
    >
      {children}
    </nav>
  )
}

// ─── SideNavigationTitle (1Depth header for 2-depth layout) ───────────────────

type SideNavigationTitleProps = {
  className?: string
  children?: React.ReactNode
}

function SideNavigationTitle({ className, children }: SideNavigationTitleProps) {
  return (
    <div
      data-slot="krds-side-navigation-title"
      className={cn("border-krds-border flex w-full items-center border-b px-2 pt-6 pb-4", className)}
    >
      <span className="text-krds-foreground text-krds-heading-md flex-1 font-bold">{children}</span>
    </div>
  )
}

// ─── SideNavigationBackTitle (3Depth header) ──────────────────────────────────

type SideNavigationBackTitleProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  onBack?: () => void
  backLabel?: string
}

function SideNavigationBackTitle({
  className,
  children,
  href,
  onBack,
  backLabel = "뒤로 가기",
}: SideNavigationBackTitleProps) {
  const baseClass = cn(
    "flex w-full flex-col items-start gap-1 rounded-lg p-2",
    "text-left text-krds-foreground",
    "hover:bg-krds-surface-secondary-subtle",
    "active:bg-krds-surface-secondary-pressed",
    "focus-visible:krds-focus-ring",
    className
  )
  const content = (
    <>
      <ChevronLeft size={24} aria-hidden="true" />
      <span className="text-krds-heading-md font-bold">{children}</span>
    </>
  )
  if (href) {
    return (
      <a data-slot="krds-side-navigation-back-title" href={href} aria-label={backLabel} className={baseClass}>
        {content}
      </a>
    )
  }
  return (
    <Button
      data-slot="krds-side-navigation-back-title"
      variant="text"
      size="sm"
      type="button"
      onClick={onBack}
      aria-label={backLabel}
      className={cn("flex h-auto w-full flex-col items-start gap-1 rounded-lg p-2 text-left", className)}
    >
      {content}
    </Button>
  )
}

// ─── SideNavigationGroup (collapsible 2-depth group) ──────────────────────────

type SideNavigationGroupProps = {
  className?: string
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SideNavigationGroup({
  className,
  children,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
}: SideNavigationGroupProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const listId = React.useId()
  const toggle = React.useCallback(() => {
    const next = !open
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }, [open, isControlled, onOpenChange])

  return (
    <SideNavigationGroupContext.Provider value={{ open, toggle, listId }}>
      <div
        data-slot="krds-side-navigation-group"
        data-state={open ? "open" : "closed"}
        className={cn("border-krds-border-light flex w-full flex-col border-b", className)}
      >
        {children}
      </div>
    </SideNavigationGroupContext.Provider>
  )
}

// ─── SideNavigationTrigger (2Depth row header) ────────────────────────────────

type SideNavigationTriggerProps = {
  className?: string
  children?: React.ReactNode
  /** KRDS `.lnb-btn.selected` — this 2Depth row's own branch is active (bg secondary-5 + text-secondary). */
  selected?: boolean
  /** KRDS top-level `.lnb-btn.active` — animated secondary-active bottom bar (_side_navigation.scss:79-82,186-211). */
  active?: boolean
}

function SideNavigationTrigger({ className, children, selected, active }: SideNavigationTriggerProps) {
  const ctx = React.useContext(SideNavigationGroupContext)
  const Icon = ctx?.open ? ChevronUp : ChevronDown
  return (
    <button
      type="button"
      role="menuitem"
      data-slot="krds-side-navigation-trigger"
      aria-expanded={ctx?.open ?? false}
      aria-controls={ctx?.listId}
      onClick={ctx?.toggle}
      className={cn(
        "relative flex w-full items-center gap-2 px-2 py-4",
        "text-krds-foreground text-krds-body-md text-left font-bold",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring",
        selected && "bg-krds-surface-secondary-subtle text-krds-foreground-secondary",
        active &&
          "before:bg-krds-secondary-bold before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:content-['']",
        className
      )}
    >
      <span className="flex-1">{children}</span>
      <Icon size={20} aria-hidden="true" />
    </button>
  )
}

// ─── SideNavigationList (open list of last-depth items) ───────────────────────

type SideNavigationListProps = {
  className?: string
  children?: React.ReactNode
  bordered?: boolean
}

function SideNavigationList({ className, children, bordered }: SideNavigationListProps) {
  const ctx = React.useContext(SideNavigationGroupContext)
  if (ctx && !ctx.open) return null
  // Inside a group: this is a submenu. At the root level (no ctx): this is the menubar.
  const isSubmenu = ctx !== null
  return (
    <ul
      data-slot="krds-side-navigation-list"
      id={isSubmenu ? ctx.listId : undefined}
      role={isSubmenu ? "menu" : "menubar"}
      aria-orientation={isSubmenu ? undefined : "vertical"}
      className={cn("flex w-full flex-col", ctx && "py-2", bordered && "border-krds-border border-y py-4", className)}
    >
      {children}
    </ul>
  )
}

// ─── SideNavigationItem (Last depth bulleted link) ────────────────────────────

type SideNavigationItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  external?: boolean
  active?: boolean
}

function SideNavigationItem({ className, children, href, external, active }: SideNavigationItemProps) {
  return (
    <li role="none" className="w-full">
      <a
        data-slot="krds-side-navigation-item"
        role="menuitem"
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-1 rounded-md px-4 py-2",
          "text-krds-foreground text-krds-body-md",
          "hover:bg-krds-surface-secondary-subtle",
          "active:bg-krds-surface-secondary-pressed",
          "focus-visible:krds-focus-ring",
          active && "text-krds-foreground-secondary font-bold",
          className
        )}
      >
        <span className="flex items-center pr-2">
          <span aria-hidden="true" className="bg-krds-foreground inline-block size-1 rounded-full" />
        </span>
        <span className="flex-1">{children}</span>
        {external && <ExternalLink size={20} aria-hidden="true" />}
      </a>
    </li>
  )
}

// ─── SideNavigationPopupGroup (3Depth li wrapping a 4Depth popup) ─────────────

type SideNavigationPopupGroupProps = {
  className?: string
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SideNavigationPopupGroup({
  className,
  children,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
}: SideNavigationPopupGroupProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const panelId = React.useId()
  const toggle = React.useCallback(() => {
    const next = !open
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }, [open, isControlled, onOpenChange])

  return (
    <SideNavigationPopupContext.Provider value={{ open, toggle, panelId }}>
      <li data-slot="krds-side-navigation-popup-group" role="none" className={cn("w-full", className)}>
        {children}
      </li>
    </SideNavigationPopupContext.Provider>
  )
}

// ─── SideNavigationPopupTrigger (3Depth row that opens the 4Depth panel) ──────

type SideNavigationPopupTriggerProps = {
  className?: string
  children?: React.ReactNode
}

function SideNavigationPopupTrigger({ className, children }: SideNavigationPopupTriggerProps) {
  const ctx = React.useContext(SideNavigationPopupContext)
  const Icon = ctx?.open ? ChevronUp : ChevronDown
  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="true"
      data-slot="krds-side-navigation-popup-trigger"
      aria-expanded={ctx?.open ?? false}
      aria-controls={ctx?.panelId}
      onClick={ctx?.toggle}
      className={cn(
        "flex w-full items-center gap-1 rounded-md px-4 py-2 text-left",
        "text-krds-foreground text-krds-body-md",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring",
        className
      )}
    >
      <span className="flex items-center pr-2">
        <span aria-hidden="true" className="bg-krds-foreground inline-block size-1 rounded-full" />
      </span>
      <span className="flex-1">{children}</span>
      <Icon size={20} aria-hidden="true" />
    </button>
  )
}

// ─── SideNavigationPopup (sliding 4Depth panel, lnb-submenu-lv2) ──────────────

type SideNavigationPopupProps = {
  className?: string
  children?: React.ReactNode
}

function SideNavigationPopup({ className, children }: SideNavigationPopupProps) {
  const ctx = React.useContext(SideNavigationPopupContext)
  const open = ctx?.open ?? false
  return (
    <div
      data-slot="krds-side-navigation-popup"
      id={ctx?.panelId}
      role="menu"
      aria-hidden={!open}
      className={cn(
        "bg-krds-surface invisible absolute top-0 left-[-100%] z-10 h-full w-full opacity-0",
        "transition-[left,opacity,visibility] duration-300 ease-in-out",
        open && "visible left-0 opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}

// ─── SideNavigationPopupList (4Depth link list, lnb-submenu-lv2 > ul) ─────────

type SideNavigationPopupListProps = {
  className?: string
  children?: React.ReactNode
}

function SideNavigationPopupList({ className, children }: SideNavigationPopupListProps) {
  return (
    <ul
      data-slot="krds-side-navigation-popup-list"
      role="menu"
      className={cn("border-krds-border flex w-full flex-col border-y py-4", className)}
    >
      {children}
    </ul>
  )
}

// ─── SideNavigationPopupItem (4Depth bulleted link) ───────────────────────────

type SideNavigationPopupItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  external?: boolean
  active?: boolean
}

function SideNavigationPopupItem({ className, children, href, external, active }: SideNavigationPopupItemProps) {
  return (
    <li role="none" className="w-full">
      <a
        data-slot="krds-side-navigation-popup-item"
        role="menuitem"
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex w-full items-center gap-1 rounded-md px-4 py-2",
          "text-krds-foreground text-krds-body-md",
          "hover:bg-krds-surface-secondary-subtle",
          "active:bg-krds-surface-secondary-pressed",
          "focus-visible:krds-focus-ring",
          active && "bg-krds-surface-secondary-subtle text-krds-foreground-secondary font-bold",
          className
        )}
      >
        <span className="flex items-center pr-2">
          <span aria-hidden="true" className="bg-krds-foreground inline-block size-1 rounded-full" />
        </span>
        <span className="flex-1">{children}</span>
        {external && <ExternalLink size={20} aria-hidden="true" />}
      </a>
    </li>
  )
}

export {
  SideNavigation,
  SideNavigationTitle,
  SideNavigationBackTitle,
  SideNavigationGroup,
  SideNavigationTrigger,
  SideNavigationList,
  SideNavigationItem,
  SideNavigationPopupGroup,
  SideNavigationPopupTrigger,
  SideNavigationPopup,
  SideNavigationPopupList,
  SideNavigationPopupItem,
}
