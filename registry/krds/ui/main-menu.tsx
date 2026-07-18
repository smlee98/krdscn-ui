// rsc:safe
import * as React from "react"
import { ArrowRight, ChevronDown, ChevronRight, ExternalLink } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * KRDS MainMenu (desktop GNB mega-menu) — 원본 셀렉터 `.gnb-main`, `.gnb-toggle-wrap`
 * (reference: _main_menu.scss). 데스크톱 주요 메뉴 바 + 전개형 패널의 표현 파트 집합.
 *
 * 개폐 상태(어느 패널이 열렸는가)는 이 파일이 손으로 관리하지 않고 — React 상태 훅이나
 * 외부클릭/ESC 상태머신이 전혀 없다 — 소비자가 `expanded`/패널 렌더 여부로 주입한다.
 * 즉 프리미티브가 대체할 팝업 동작이 없으므로 radix `NavigationMenu`/`Popover`로
 * 승격하지 않고 순수 표현 컴포넌트(rsc:safe)로 유지한다. 모바일 드로어(전체메뉴)는
 * 별도 파일 `main-menu-mobile.tsx`가 Dialog 프리미티브 위에서 담당한다.
 */

// ─── MainMenuAnchor (a/button 다형성 단일 헬퍼 — raw <a> 복붙 방지) ──────────────
//
// href가 있으면 <a>, 없으면 <button type="button">. 캐스트 없이 href 유무로 분기한다.
// 프롭은 엘리먼트 중립인 HTMLAttributes<HTMLElement>로 받아 <a>·<button> 어느 쪽에도 그대로 호환된다.
// (header.tsx의 HeaderLink와 동일 패턴)
type MainMenuAnchorProps = React.HTMLAttributes<HTMLElement> & { dataSlot: string; href?: string }

function MainMenuAnchor({ dataSlot, href, ...props }: MainMenuAnchorProps) {
  if (href !== undefined) {
    return <a data-slot={dataSlot} href={href} {...props} />
  }
  return <button data-slot={dataSlot} type="button" {...props} />
}

// ─── MainMenu (root) ──────────────────────────────────────────────────────────

type MainMenuProps = React.ComponentProps<"div">

function MainMenu({ className, ...props }: MainMenuProps) {
  return (
    <div
      data-slot="krds-main-menu"
      className={cn("bg-krds-surface relative flex w-full flex-col items-center", className)}
      {...props}
    />
  )
}

// ─── MainMenuBar ──────────────────────────────────────────────────────────────

type MainMenuBarProps = React.ComponentProps<"nav">

function MainMenuBar({ className, children, ...props }: MainMenuBarProps) {
  return (
    <nav
      data-slot="krds-main-menu-bar"
      className={cn("border-krds-border-light bg-krds-surface w-full border-y", className)}
      {...props}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-4">{children}</div>
    </nav>
  )
}

type MainMenuBarItemProps = React.HTMLAttributes<HTMLElement> & {
  /** href가 있으면 `<a>`, 없으면 패널 트리거 `<button>`으로 렌더 (MainMenuAnchor). */
  href?: string
  hasSubmenu?: boolean
  /** Active 1Depth item — renders the KRDS active bottom-border indicator. */
  active?: boolean
  /** Panel expanded state. Sets `aria-expanded` when `hasSubmenu` is set. */
  expanded?: boolean
}

// KRDS `gnb-main-trigger` active indicator (_main_menu.scss): a `::before` bottom
// border that animates width 0→100%. Static rendering: a full-width 4px bottom bar
// in the action-secondary-active (secondary-70) color, shown only when `active`.
function MainMenuBarItem({ className, children, href, hasSubmenu, active, expanded, ...props }: MainMenuBarItemProps) {
  return (
    <MainMenuAnchor
      dataSlot="krds-main-menu-bar-item"
      href={href}
      aria-expanded={hasSubmenu ? expanded : undefined}
      className={cn(
        "relative inline-flex h-14 items-center gap-2 px-4",
        "text-krds-foreground-subtle text-krds-body-lg font-bold",
        "hover:text-krds-foreground hover:bg-krds-surface-secondary-subtle",
        "active:text-krds-foreground active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring-inset rounded-none",
        active && "text-krds-foreground",
        // KRDS `gnb-main-trigger.active::before` border color is action-secondary-active
        // (secondary-70), not primary-50 (_main_menu.scss:46,100-104,123-137).
        active &&
          "before:bg-krds-secondary-bold before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:content-['']",
        className
      )}
      {...props}
    >
      {children}
      {hasSubmenu && (
        <ChevronDown
          size={20}
          aria-hidden="true"
          // KRDS `gnb-main-trigger.active::after { transform: rotate(-180deg) }` (:128-130).
          className={cn("transition-transform", expanded && "rotate-180")}
        />
      )}
    </MainMenuAnchor>
  )
}

// ─── MainMenuPanel (open content area below bar; KRDS gnb-toggle-wrap) ────────
// KRDS renders this as an absolute, full-width dropdown anchored below the menu
// bar — not a static in-flow box — scrollable past 70vh, with `MainMenu` (the
// root) as its positioning context (_main_menu.scss:151-158).

type MainMenuPanelProps = React.ComponentProps<"div">

function MainMenuPanel({ className, children, ...props }: MainMenuPanelProps) {
  return (
    <div
      data-slot="krds-main-menu-panel"
      className="border-krds-border-light bg-krds-surface absolute inset-x-0 top-full z-20 max-h-[calc(70vh-17rem)] w-full overflow-y-auto border-t"
    >
      <div className={cn("mx-auto flex w-full max-w-[1200px]", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

// ─── MainMenuBackdrop (dim overlay behind an open panel; KRDS gnb-backdrop) ───

type MainMenuBackdropProps = React.ComponentProps<"div"> & { active?: boolean }

function MainMenuBackdrop({ className, active, ...props }: MainMenuBackdropProps) {
  if (!active) return null
  return (
    <div
      data-slot="krds-main-menu-backdrop"
      aria-hidden="true"
      className={cn("fixed inset-0 z-10 bg-black/75", className)}
      {...props}
    />
  )
}

// ─── MainMenuPanelHeader (title row container) ────────────────────────────────

type MainMenuPanelHeaderProps = React.ComponentProps<"div">

function MainMenuPanelHeader({ className, children, ...props }: MainMenuPanelHeaderProps) {
  return (
    <div data-slot="krds-main-menu-panel-header" className={cn("flex h-14 items-center px-1", className)} {...props}>
      <span className="text-krds-foreground text-krds-heading-md font-bold">{children}</span>
    </div>
  )
}

// ─── MainMenuPanelShortcut (바로가기 link) ────────────────────────────────────

type MainMenuPanelShortcutProps = React.HTMLAttributes<HTMLElement> & {
  href?: string
  /** 링크 라벨 — 기본값 "바로가기". */
  label?: React.ReactNode
}

function MainMenuPanelShortcut({ className, children, label = "바로가기", ...props }: MainMenuPanelShortcutProps) {
  return (
    <MainMenuAnchor
      dataSlot="krds-main-menu-panel-shortcut"
      className={cn(
        "inline-flex items-center gap-0.5 px-0.5",
        "text-krds-foreground text-krds-body-sm",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
      {...props}
    >
      <span className="underline">{children ?? label}</span>
      <ChevronRight size={16} aria-hidden="true" />
    </MainMenuAnchor>
  )
}

// ─── MainMenuPanelSidebar (optional sidebar column) ──────────────────────────

type MainMenuPanelSidebarProps = React.ComponentProps<"aside">

function MainMenuPanelSidebar({ className, children, ...props }: MainMenuPanelSidebarProps) {
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

type MainMenuColumnProps = React.ComponentProps<"div">

function MainMenuColumn({ className, children, ...props }: MainMenuColumnProps) {
  return (
    <div data-slot="krds-main-menu-column" className={cn("flex min-w-0 flex-1 flex-col gap-2", className)} {...props}>
      {children}
    </div>
  )
}

// ─── MainMenuLink (last-depth bulleted link) ──────────────────────────────────

type MainMenuLinkProps = React.HTMLAttributes<HTMLElement> & { href?: string; external?: boolean }

function MainMenuLink({ className, children, external, ...props }: MainMenuLinkProps) {
  return (
    <MainMenuAnchor
      dataSlot="krds-main-menu-link"
      className={cn(
        "flex items-center gap-1 rounded-md px-2 py-2.5",
        "text-krds-foreground text-krds-body-md",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring",
        className
      )}
      {...props}
    >
      <span className="flex items-center pr-2">
        <span aria-hidden="true" className="bg-krds-foreground inline-block size-1 rounded-full" />
      </span>
      <span className="flex-1">{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
    </MainMenuAnchor>
  )
}

// ─── MainMenuSidebarItem (2-depth sidebar row) ────────────────────────────────

type MainMenuSidebarItemProps = React.HTMLAttributes<HTMLElement> & {
  href?: string
  active?: boolean
  hasMore?: boolean
  external?: boolean
}

function MainMenuSidebarItem({ className, children, active, hasMore, external, ...props }: MainMenuSidebarItemProps) {
  const showArrow = hasMore || active
  return (
    <MainMenuAnchor
      dataSlot="krds-main-menu-sidebar-item"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center px-6 py-4",
        "text-krds-body-md",
        "focus-visible:krds-focus-ring",
        showArrow ? "gap-6" : "gap-2",
        active ? "bg-krds-surface text-krds-foreground-secondary font-bold" : "text-krds-foreground",
        className
      )}
      {...props}
    >
      <span className={cn(showArrow ? "min-w-0 flex-1" : "")}>{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
      {showArrow && !external && <ArrowRight size={20} aria-hidden="true" />}
      {!showArrow && !external && <ChevronRight size={20} aria-hidden="true" />}
    </MainMenuAnchor>
  )
}

export {
  MainMenu,
  MainMenuBar,
  MainMenuBarItem,
  MainMenuPanel,
  MainMenuBackdrop,
  MainMenuPanelHeader,
  MainMenuPanelShortcut,
  MainMenuPanelSidebar,
  MainMenuColumn,
  MainMenuLink,
  MainMenuSidebarItem,
}
export type {
  MainMenuProps,
  MainMenuBarProps,
  MainMenuBarItemProps,
  MainMenuPanelProps,
  MainMenuBackdropProps,
  MainMenuPanelHeaderProps,
  MainMenuPanelShortcutProps,
  MainMenuPanelSidebarProps,
  MainMenuColumnProps,
  MainMenuLinkProps,
  MainMenuSidebarItemProps,
}
