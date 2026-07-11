// rsc:safe
import * as React from "react"
import { ArrowRight, ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/cn"

// ─── MainMenu (root) ──────────────────────────────────────────────────────────

type MainMenuProps = {
  className?: string
  children?: React.ReactNode
}

function MainMenu({ className, children }: MainMenuProps) {
  return (
    <div data-slot="krds-main-menu" className={cn("bg-krds-surface flex w-full flex-col items-center", className)}>
      {children}
    </div>
  )
}

// ─── MainMenuBar ──────────────────────────────────────────────────────────────

type MainMenuBarProps = {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

function MainMenuBar({ className, children, "aria-label": ariaLabel }: MainMenuBarProps) {
  return (
    <nav
      data-slot="krds-main-menu-bar"
      aria-label={ariaLabel}
      className={cn("border-krds-border-light bg-krds-surface w-full border-y", className)}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-4">{children}</div>
    </nav>
  )
}

type MainMenuBarItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  hasSubmenu?: boolean
  /** Active 1Depth item — renders the KRDS active bottom-border indicator. */
  active?: boolean
  /** Render a `<button>` instead of an `<a>` (for panel triggers). */
  asButton?: boolean
  /** Panel expanded state. Sets `aria-expanded` when defined (use with `hasSubmenu`/`asButton`). */
  expanded?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

// KRDS `gnb-main-trigger` active indicator (_main_menu.scss): a `::before` bottom
// border that animates width 0→100%. Static rendering: a full-width 4px bottom bar
// in the selected (primary) color, shown only when `active`.
function MainMenuBarItem({
  className,
  children,
  href,
  hasSubmenu,
  active,
  asButton,
  expanded,
  onClick,
}: MainMenuBarItemProps) {
  const sharedClassName = cn(
    "relative inline-flex h-14 items-center gap-2 px-4",
    "text-krds-foreground-subtle text-krds-body-lg font-bold",
    "hover:text-krds-foreground",
    "active:text-krds-foreground",
    "rounded-none focus:krds-focus-ring-inset",
    active && "text-krds-foreground",
    active &&
      "before:bg-krds-primary-50 before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:content-['']",
    className
  )
  const inner = (
    <>
      {children}
      {hasSubmenu && <ChevronDown size={20} aria-hidden="true" />}
    </>
  )

  if (asButton) {
    return (
      <button
        type="button"
        data-slot="krds-main-menu-bar-item"
        aria-expanded={expanded}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        className={sharedClassName}
      >
        {inner}
      </button>
    )
  }

  return (
    <a
      data-slot="krds-main-menu-bar-item"
      href={href}
      aria-expanded={hasSubmenu ? expanded : undefined}
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      className={sharedClassName}
    >
      {inner}
    </a>
  )
}

// ─── MainMenuPanel (open content area below bar) ──────────────────────────────

type MainMenuPanelProps = {
  className?: string
  children?: React.ReactNode
}

function MainMenuPanel({ className, children }: MainMenuPanelProps) {
  return (
    <div data-slot="krds-main-menu-panel" className={cn("mx-auto flex w-full max-w-[1200px]", className)}>
      {children}
    </div>
  )
}

// ─── MainMenuPanelHeader (title row container) ────────────────────────────────

function MainMenuPanelHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-main-menu-panel-header" className={cn("flex h-14 items-center px-1", className)} {...props}>
      <span className="text-krds-foreground text-krds-heading-md font-bold">{children}</span>
    </div>
  )
}

// ─── MainMenuPanelShortcut (바로가기 link) ────────────────────────────────────

function MainMenuPanelShortcut({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="krds-main-menu-panel-shortcut"
      className={cn(
        "inline-flex items-center gap-0.5 px-0.5",
        "text-krds-foreground text-krds-body-sm",
        "focus:krds-focus-ring rounded-sm",
        className
      )}
      {...props}
    >
      <span className="underline">{children ?? "바로가기"}</span>
      <ChevronRight size={16} aria-hidden="true" />
    </a>
  )
}

// ─── MainMenuPanelSidebar (optional sidebar column) ──────────────────────────

function MainMenuPanelSidebar({ className, children, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="krds-main-menu-panel-sidebar"
      className={cn("bg-krds-surface-secondary-subtle flex w-[266px] flex-col py-4", className)}
      {...props}
    >
      {children}
    </aside>
  )
}

// ─── MainMenuColumn (column of last-depth items) ──────────────────────────────

type MainMenuColumnProps = {
  className?: string
  children?: React.ReactNode
}

function MainMenuColumn({ className, children }: MainMenuColumnProps) {
  return (
    <div data-slot="krds-main-menu-column" className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>
      {children}
    </div>
  )
}

// ─── MainMenuLink (last-depth bulleted link) ──────────────────────────────────

type MainMenuLinkProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  external?: boolean
}

function MainMenuLink({ className, children, href, external }: MainMenuLinkProps) {
  return (
    <a
      data-slot="krds-main-menu-link"
      href={href}
      className={cn(
        "flex items-center gap-1 rounded-md px-2 py-2.5",
        "text-krds-foreground text-krds-body-md",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus:krds-focus-ring",
        className
      )}
    >
      <span className="flex items-center pr-2">
        <span aria-hidden="true" className="bg-krds-foreground inline-block size-1 rounded-full" />
      </span>
      <span className="flex-1">{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
    </a>
  )
}

// ─── MainMenuSidebarItem (2-depth sidebar row) ────────────────────────────────

type MainMenuSidebarItemProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  active?: boolean
  hasMore?: boolean
  external?: boolean
}

function MainMenuSidebarItem({ className, children, href, active, hasMore, external }: MainMenuSidebarItemProps) {
  const showArrow = hasMore || active
  return (
    <a
      data-slot="krds-main-menu-sidebar-item"
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center px-6 py-4",
        "text-krds-body-md",
        "focus:krds-focus-ring",
        showArrow ? "gap-6" : "gap-2",
        active ? "bg-krds-surface text-krds-foreground-secondary font-bold" : "text-krds-foreground",
        className
      )}
    >
      <span className={cn(showArrow ? "min-w-0 flex-1" : "")}>{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
      {showArrow && !external && <ArrowRight size={20} aria-hidden="true" />}
      {!showArrow && !external && <ChevronRight size={20} aria-hidden="true" />}
    </a>
  )
}

export {
  MainMenu,
  MainMenuBar,
  MainMenuBarItem,
  MainMenuPanel,
  MainMenuPanelHeader,
  MainMenuPanelShortcut,
  MainMenuPanelSidebar,
  MainMenuColumn,
  MainMenuLink,
  MainMenuSidebarItem,
}
