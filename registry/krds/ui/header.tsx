// rsc:client
"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SkipLink } from "@/registry/krds/ui/skip-link"
import { Masthead } from "@/registry/krds/ui/masthead"

// ─── HeaderUtility ────────────────────────────────────────────────────────────

type HeaderUtilityProps = {
  className?: string
  children?: React.ReactNode
}

function HeaderUtility({ className, children }: HeaderUtilityProps) {
  return (
    <div
      data-slot="krds-header-utility"
      className={cn("mx-auto flex h-8 max-w-[1248px] items-center justify-end gap-3 px-6 pt-3", className)}
    >
      {children}
    </div>
  )
}

type HeaderUtilityItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  asSelect?: boolean
}

function HeaderUtilityItem({ className, children, href, asSelect }: HeaderUtilityItemProps) {
  const baseClass = cn(
    "inline-flex items-center gap-1",
    "text-krds-foreground text-krds-body-sm",
    "hover:underline",
    "focus-visible:krds-focus-ring rounded-sm",
    className
  )
  const content = (
    <>
      {children}
      {asSelect && <ChevronDown size={16} aria-hidden="true" />}
    </>
  )
  if (href) {
    return (
      <a data-slot="krds-header-utility-item" href={href} className={baseClass}>
        {content}
      </a>
    )
  }
  return (
    <button data-slot="krds-header-utility-item" type="button" className={baseClass}>
      {content}
    </button>
  )
}

// Divider between utility items
function HeaderUtilityDivider() {
  return <span aria-hidden="true" className="bg-krds-surface-disabled inline-block h-4 w-px" />
}

// ─── useDropdown (shared open/close + outside-click + ESC) ──────────────────────

function useDropdown() {
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return { open, setOpen, rootRef }
}

// ─── HeaderUtilityDropdown (utility-list dropdown) ──────────────────────────────

type HeaderUtilityDropdownProps = {
  className?: string
  children?: React.ReactNode
  label: React.ReactNode
}

function HeaderUtilityDropdown({ className, children, label }: HeaderUtilityDropdownProps) {
  const { open, setOpen, rootRef } = useDropdown()
  const menuId = React.useId()

  return (
    <div ref={rootRef} data-slot="krds-header-utility-dropdown" className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1",
          "text-krds-foreground text-krds-body-sm",
          "hover:underline",
          "focus-visible:krds-focus-ring rounded-sm"
        )}
      >
        {label}
        <ChevronDown size={16} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          id={menuId}
          data-slot="krds-header-utility-dropdown-menu"
          className={cn(
            "border-krds-border bg-krds-surface absolute top-full right-0 z-50 mt-1 min-w-[160px] rounded-md border py-1 shadow-md"
          )}
        >
          {children}
        </ul>
      )}
    </div>
  )
}

type HeaderUtilityDropdownItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
}

function HeaderUtilityDropdownItem({ className, children, href }: HeaderUtilityDropdownItemProps) {
  const baseClass = cn(
    "flex w-full items-center px-4 py-2 text-left",
    "text-krds-foreground text-krds-body-sm",
    "hover:bg-krds-surface-secondary-subtle",
    "focus-visible:krds-focus-ring-inset",
    className
  )
  return (
    <li>
      {href ? (
        <a data-slot="krds-header-utility-dropdown-item" href={href} className={baseClass}>
          {children}
        </a>
      ) : (
        <button data-slot="krds-header-utility-dropdown-item" type="button" className={baseClass}>
          {children}
        </button>
      )}
    </li>
  )
}

// ─── HeaderBrand ──────────────────────────────────────────────────────────────

type HeaderBrandProps = {
  className?: string
  children?: React.ReactNode
  href?: string
}

function HeaderBrand({ className, children, href }: HeaderBrandProps) {
  return (
    <a
      data-slot="krds-header-brand"
      href={href}
      className={cn(
        "inline-flex h-12 items-center gap-2",
        "text-krds-foreground text-lg font-bold",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
    >
      {children}
    </a>
  )
}

// ─── HeaderActions ────────────────────────────────────────────────────────────

type HeaderActionsProps = {
  className?: string
  children?: React.ReactNode
}

function HeaderActions({ className, children }: HeaderActionsProps) {
  return (
    <div data-slot="krds-header-actions" className={cn("flex flex-1 items-start justify-end gap-2", className)}>
      {children}
    </div>
  )
}

type HeaderActionItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  icon?: React.ReactNode
  "aria-controls"?: string
}

function HeaderActionItem({ className, children, href, icon, "aria-controls": ariaControls }: HeaderActionItemProps) {
  const baseClass = cn(
    // KRDS .btn-navi(_header.scss:94-99): flex-col + justify-between, gap 4px(row)/8px(col),
    // min-height size-height-6=40px, padding padding-2 padding-5 0 = 4px 12px 0, radius medium1=6px.
    "inline-flex min-h-10 flex-col items-center justify-between gap-1 rounded-[6px] px-3 pt-1 whitespace-nowrap",
    "text-krds-body-md font-bold text-krds-foreground",
    "hover:bg-krds-surface-secondary-subtle",
    "active:bg-krds-surface-secondary-pressed",
    "focus-visible:krds-focus-ring",
    className
  )
  const content = (
    <>
      {icon && (
        <span className="size-5 shrink-0 [&>svg]:size-5" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </>
  )
  if (href) {
    return (
      <a data-slot="krds-header-action-item" href={href} aria-controls={ariaControls} className={baseClass}>
        {content}
      </a>
    )
  }
  return (
    <button data-slot="krds-header-action-item" type="button" aria-controls={ariaControls} className={baseClass}>
      {content}
    </button>
  )
}

// ─── HeaderActionDropdown (나의GOV action shell) ────────────────────────────────

type HeaderActionDropdownProps = {
  className?: string
  children?: React.ReactNode
  label?: React.ReactNode
  icon?: React.ReactNode
}

function HeaderActionDropdown({ className, children, label = "나의GOV", icon }: HeaderActionDropdownProps) {
  const { open, setOpen, rootRef } = useDropdown()
  const panelId = React.useId()

  return (
    <div ref={rootRef} data-slot="krds-header-action-dropdown" className={cn("relative", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          // HeaderActionItem(.btn-navi)과 동일한 세로(아이콘 위+라벨 아래) 배치 — 우측 액션 열 통일
          "inline-flex min-h-10 flex-col items-center justify-between gap-1 rounded-[6px] px-3 pt-1 whitespace-nowrap",
          "text-krds-body-md text-krds-foreground font-bold",
          "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-pressed",
          "focus-visible:krds-focus-ring"
        )}
      >
        {icon && (
          <span className="size-5 shrink-0 [&>svg]:size-5" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="inline-flex items-center gap-0.5">
          {label}
          <ChevronDown size={14} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          data-slot="krds-header-action-dropdown-panel"
          className={cn(
            "border-krds-border bg-krds-surface absolute top-full right-0 z-50 mt-1 min-w-[260px] rounded-md border p-4 shadow-md"
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// ─── HeaderNav ────────────────────────────────────────────────────────────────

type HeaderNavProps = {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

function HeaderNav({ className, children, "aria-label": ariaLabel }: HeaderNavProps) {
  return (
    <nav
      data-slot="krds-header-nav"
      aria-label={ariaLabel}
      className={cn("mx-auto flex h-14 max-w-[1248px] items-center gap-4 px-6", className)}
    >
      {children}
    </nav>
  )
}

type HeaderNavItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  hasSubmenu?: boolean
}

function HeaderNavItem({ className, children, href, hasSubmenu }: HeaderNavItemProps) {
  return (
    <a
      data-slot="krds-header-nav-item"
      href={href}
      className={cn(
        "inline-flex h-14 items-center gap-2 px-4",
        "text-krds-foreground-subtle text-krds-body-lg font-bold",
        "hover:text-krds-foreground",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
    >
      {children}
      {hasSubmenu && <ChevronDown size={20} aria-hidden="true" />}
    </a>
  )
}

// ─── useHeaderScroll (KRDS .header-in scroll-down 은폐 / scroll-up 노출) ─────────

function useHeaderScroll(enabled: boolean) {
  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    if (!enabled) return
    let lastY = window.scrollY
    const threshold = 8
    const revealAboveY = 80

    function onScroll() {
      const currentY = window.scrollY
      const delta = currentY - lastY
      if (Math.abs(delta) < threshold) return
      setHidden(delta > 0 && currentY > revealAboveY)
      lastY = currentY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [enabled])

  return enabled && hidden
}

// ─── Header (root) ────────────────────────────────────────────────────────────

type HeaderProps = {
  className?: string
  children?: React.ReactNode
  /** KRDS #krds-header is sticky + hides on scroll-down / reveals on scroll-up (_header.scss:32-33,148-180). */
  sticky?: boolean
}

function Header({ className, children, sticky = true }: HeaderProps) {
  const hidden = useHeaderScroll(sticky)
  const childrenArray = React.Children.toArray(children)

  const utilityChild = childrenArray.find((c) => React.isValidElement(c) && c.type === HeaderUtility)
  const navChild = childrenArray.find((c) => React.isValidElement(c) && c.type === HeaderNav)
  const topChildren = childrenArray.filter(
    (c) => !(React.isValidElement(c) && c.type === HeaderUtility) && !(React.isValidElement(c) && c.type === HeaderNav)
  )

  return (
    <>
      {/* KRDS renders #krds-masthead as a sibling before #krds-header, not nested — masthead scrolls
          away normally while only the header row itself sticks/hides (_header.scss:32-33). */}
      <Masthead />
      <header
        data-slot="krds-header"
        className={cn(
          "w-full",
          sticky && "sticky top-0 z-50 transition-transform duration-300 ease-in-out",
          sticky && hidden && "-translate-y-full",
          className
        )}
      >
        <SkipLink href="#main-content">본문 바로가기</SkipLink>
        <div className="bg-krds-surface w-full">
          {utilityChild}
          <div className="mx-auto flex max-w-[1248px] items-center gap-10 px-6 pb-4">{topChildren}</div>
        </div>
        {navChild && <div className="border-krds-border-light bg-krds-surface w-full border-y">{navChild}</div>}
      </header>
    </>
  )
}

export {
  Header,
  HeaderBrand,
  HeaderUtility,
  HeaderUtilityItem,
  HeaderUtilityDivider,
  HeaderUtilityDropdown,
  HeaderUtilityDropdownItem,
  HeaderActions,
  HeaderActionItem,
  HeaderActionDropdown,
  HeaderNav,
  HeaderNavItem,
}
