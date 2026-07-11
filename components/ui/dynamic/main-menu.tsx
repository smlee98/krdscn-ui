"use client"

import * as React from "react"
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react"
import {
  MainMenu as KrdsMainMenu,
  MainMenuBar as KrdsMainMenuBar,
  MainMenuBarItem as KrdsMainMenuBarItem,
  MainMenuColumn as KrdsMainMenuColumn,
  MainMenuLink as KrdsMainMenuLink,
  MainMenuPanel as KrdsMainMenuPanel,
  MainMenuPanelHeader as KrdsMainMenuPanelHeader,
  MainMenuPanelShortcut as KrdsMainMenuPanelShortcut,
  MainMenuPanelSidebar as KrdsMainMenuPanelSidebar,
  MainMenuSidebarItem as KrdsMainMenuSidebarItem,
} from "@/components/ui/krds/(navigation)/main-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS MainMenu compound API; each part renders either the
// KRDS-chromed wrapper or the vanilla shadcn rendering based on <UISystemProvider>.
//
// Structural note: the KRDS compound lays the panel out as a SIBLING of the bar
// (always-visible mega-menu). The shadcn path mirrors that exact sibling layout —
// it renders an ALWAYS-VISIBLE mega panel with shadcn tokens and does NOT use the
// Radix NavigationMenu Content/Trigger open-state mechanism (NavigationMenuContent
// crashes outside a NavigationMenuItem, which is precisely the sibling-panel case).
// Only navigationMenuTriggerStyle() is borrowed for the bar-item look. KRDS-only
// layout props with no shadcn axis (active / hasMore on the sidebar item) are
// mapped to aria-current/trailing-arrow parity or dropped.

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnMainMenu({ className, children }: React.ComponentProps<typeof KrdsMainMenu>) {
  // Always-visible sibling layout: a plain styled wrapper, no Radix open-state.
  return <nav className={cn("w-full max-w-full", className)}>{children}</nav>
}

function ShadcnMainMenuBar({ className, children, ...rest }: React.ComponentProps<typeof KrdsMainMenuBar>) {
  const { "aria-label": ariaLabel } = rest
  return (
    <ul role="list" aria-label={ariaLabel} className={cn("flex items-center", className)}>
      {children}
    </ul>
  )
}

function ShadcnMainMenuBarItem({
  className,
  children,
  href,
  active,
  asButton,
  expanded,
  onClick,
}: React.ComponentProps<typeof KrdsMainMenuBarItem>) {
  // Panel is always visible, so both submenu and plain items render as styled links
  // (no Radix Trigger↔Content toggle). navigationMenuTriggerStyle() supplies the look.
  // active → data-active (NavigationMenu styles data-[active=true]); asButton → <button>.
  const itemClassName = cn(navigationMenuTriggerStyle(), className)
  return (
    <li>
      {asButton ? (
        <button
          type="button"
          data-active={active || undefined}
          aria-expanded={expanded}
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
          className={itemClassName}
        >
          {children}
        </button>
      ) : (
        <a
          href={href}
          data-active={active || undefined}
          aria-current={active ? "page" : undefined}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={itemClassName}
        >
          {children}
        </a>
      )}
    </li>
  )
}

function ShadcnMainMenuPanel({ className, children }: React.ComponentProps<typeof KrdsMainMenuPanel>) {
  // THE FIX: always-visible styled container instead of NavigationMenuContent,
  // which Radix requires to live inside a NavigationMenuItem and crashes as a sibling.
  return <section className={cn("flex w-full", className)}>{children}</section>
}

function ShadcnMainMenuPanelHeader({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof KrdsMainMenuPanelHeader>) {
  return (
    <div className={cn("flex h-14 items-center px-1", className)} {...rest}>
      <span className="text-lg font-bold">{children}</span>
    </div>
  )
}

function ShadcnMainMenuPanelShortcut({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof KrdsMainMenuPanelShortcut>) {
  return (
    <a className={cn("inline-flex items-center gap-0.5 px-0.5 text-sm", className)} {...rest}>
      <span className="underline">{children ?? "바로가기"}</span>
      <ChevronRight size={16} aria-hidden="true" />
    </a>
  )
}

function ShadcnMainMenuPanelSidebar({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof KrdsMainMenuPanelSidebar>) {
  return (
    <aside className={cn("bg-muted flex w-[266px] flex-col py-4", className)} {...rest}>
      {children}
    </aside>
  )
}

function ShadcnMainMenuColumn({ className, children }: React.ComponentProps<typeof KrdsMainMenuColumn>) {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>{children}</div>
}

function ShadcnMainMenuLink({ className, children, href, external }: React.ComponentProps<typeof KrdsMainMenuLink>) {
  return (
    <a href={href} className={cn("flex items-center gap-1 px-2 py-2.5 text-sm", className)}>
      <span className="flex-1">{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
    </a>
  )
}

function ShadcnMainMenuSidebarItem({
  className,
  children,
  href,
  active,
  hasMore,
  external,
}: React.ComponentProps<typeof KrdsMainMenuSidebarItem>) {
  // active → data-active (NavigationMenuLink styles data-[active=true]); hasMore →
  // trailing arrow parity. The KRDS chevron-vs-arrow split collapses here.
  const showArrow = hasMore || active
  return (
    <a
      href={href}
      data-active={active || undefined}
      aria-current={active ? "page" : undefined}
      className={cn("flex w-full items-center gap-2 px-6 py-4 text-sm", showArrow && "gap-6", className)}
    >
      <span className={cn(showArrow && "min-w-0 flex-1")}>{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
      {showArrow && !external && <ArrowRight size={20} aria-hidden="true" />}
      {!showArrow && !external && <ChevronRight size={20} aria-hidden="true" />}
    </a>
  )
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function MainMenu(props: React.ComponentProps<typeof KrdsMainMenu>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenu {...props} />
  return <ShadcnMainMenu {...props} />
}

export function MainMenuBar(props: React.ComponentProps<typeof KrdsMainMenuBar>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuBar {...props} />
  return <ShadcnMainMenuBar {...props} />
}

export function MainMenuBarItem(props: React.ComponentProps<typeof KrdsMainMenuBarItem>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuBarItem {...props} />
  return <ShadcnMainMenuBarItem {...props} />
}

export function MainMenuPanel(props: React.ComponentProps<typeof KrdsMainMenuPanel>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuPanel {...props} />
  return <ShadcnMainMenuPanel {...props} />
}

export function MainMenuPanelHeader(props: React.ComponentProps<typeof KrdsMainMenuPanelHeader>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuPanelHeader {...props} />
  return <ShadcnMainMenuPanelHeader {...props} />
}

export function MainMenuPanelShortcut(props: React.ComponentProps<typeof KrdsMainMenuPanelShortcut>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuPanelShortcut {...props} />
  return <ShadcnMainMenuPanelShortcut {...props} />
}

export function MainMenuPanelSidebar(props: React.ComponentProps<typeof KrdsMainMenuPanelSidebar>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuPanelSidebar {...props} />
  return <ShadcnMainMenuPanelSidebar {...props} />
}

export function MainMenuColumn(props: React.ComponentProps<typeof KrdsMainMenuColumn>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuColumn {...props} />
  return <ShadcnMainMenuColumn {...props} />
}

export function MainMenuLink(props: React.ComponentProps<typeof KrdsMainMenuLink>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuLink {...props} />
  return <ShadcnMainMenuLink {...props} />
}

export function MainMenuSidebarItem(props: React.ComponentProps<typeof KrdsMainMenuSidebarItem>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsMainMenuSidebarItem {...props} />
  return <ShadcnMainMenuSidebarItem {...props} />
}
