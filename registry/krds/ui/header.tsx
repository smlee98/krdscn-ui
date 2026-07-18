// rsc:client
"use client"

/**
 * KRDS Header (#krds-header) — 원본 셀렉터 `#krds-header` (reference: header.html).
 *
 * 3-band 크롬: (1) `krds-header-top` 표면 밴드 = 유틸리티 행 + 메인 행(브랜드·액션),
 * (2) `krds-header-navbar` 상·하 보더 밴드 = 주요 메뉴 네비게이션.
 * 밴드는 컴포넌트가 자식을 `child.type`으로 분류하지 않고, 소비자가 파트로 명시 합성한다.
 *
 * 드롭다운(유틸리티 목록 / 나의GOV)은 손으로 만든 외부클릭·ESC 상태머신 대신
 * radix-ui `Popover` 프리미티브로 개폐·포커스·외부클릭·ESC·포털을 위임한다.
 */

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { SkipLink } from "@/registry/krds/ui/skip-link"

// ─── HeaderLink (a/button 다형성 단일 헬퍼 — raw <a> 복붙 방지) ──────────────────
//
// href가 있으면 <a>, 없으면 <button type="button">. 캐스트 없이 href 유무로 분기한다.
// 프롭은 엘리먼트 중립인 HTMLAttributes<HTMLElement>로 받아 <a>·<button> 어느 쪽에도 그대로 호환된다.
type HeaderLinkProps = React.HTMLAttributes<HTMLElement> & { dataSlot: string; href?: string }

function HeaderLink({ dataSlot, href, ...props }: HeaderLinkProps) {
  if (href !== undefined) {
    return <a data-slot={dataSlot} href={href} {...props} />
  }
  return <button data-slot={dataSlot} type="button" {...props} />
}

// ─── useHeaderScroll (KRDS .header-in scroll-down 은폐 / scroll-up 노출) ─────────
//
// 스크롤 방향 기반 은폐는 프리미티브가 제공하지 않는 KRDS 고유 동작(_header.scss:148-180)
// 이므로 여기에만 존재한다. 외부클릭·ESC 같은 프리미티브 대체 가능 로직이 아니다.
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

// ─── Header (root) ──────────────────────────────────────────────────────────────

type HeaderProps = React.ComponentProps<"header"> & {
  /** KRDS #krds-header is sticky + hides on scroll-down / reveals on scroll-up (_header.scss:32-33,148-180). */
  sticky?: boolean
  skipLinkHref?: string
  skipLinkLabel?: React.ReactNode
}

function Header({
  className,
  children,
  sticky = true,
  skipLinkHref = "#main-content",
  skipLinkLabel = "본문 바로가기",
  ...props
}: HeaderProps) {
  const hidden = useHeaderScroll(sticky)

  return (
    <header
      data-slot="krds-header"
      className={cn(
        "w-full",
        sticky && "sticky top-0 z-50 transition-transform duration-300 ease-in-out",
        sticky && hidden && "-translate-y-full",
        className
      )}
      {...props}
    >
      {/* WAI: SkipLink는 <header>의 첫 자식으로 유지한다. */}
      <SkipLink href={skipLinkHref}>{skipLinkLabel}</SkipLink>
      {children}
    </header>
  )
}

// ─── HeaderTop (표면 밴드 — 유틸리티 행 + 메인 행을 감싸는 흰 배경) ──────────────

type HeaderTopProps = React.ComponentProps<"div">

function HeaderTop({ className, ...props }: HeaderTopProps) {
  return <div data-slot="krds-header-top" className={cn("bg-krds-surface w-full", className)} {...props} />
}

// ─── HeaderUtility (상단 유틸리티 행) ───────────────────────────────────────────

type HeaderUtilityProps = React.ComponentProps<"div">

function HeaderUtility({ className, ...props }: HeaderUtilityProps) {
  return (
    <div
      data-slot="krds-header-utility"
      className={cn("mx-auto flex h-8 max-w-[1248px] items-center justify-end gap-3 px-6 pt-3", className)}
      {...props}
    />
  )
}

type HeaderUtilityItemProps = React.HTMLAttributes<HTMLElement> & { href?: string; asSelect?: boolean }

function HeaderUtilityItem({ className, children, asSelect, ...props }: HeaderUtilityItemProps) {
  return (
    <HeaderLink
      dataSlot="krds-header-utility-item"
      className={cn(
        "inline-flex items-center gap-1",
        "text-krds-foreground text-krds-body-sm",
        "hover:underline",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
      {...props}
    >
      {children}
      {asSelect && <ChevronDown size={16} aria-hidden="true" />}
    </HeaderLink>
  )
}

// Divider between utility items
type HeaderUtilityDividerProps = React.ComponentProps<"span">

function HeaderUtilityDivider({ className, ...props }: HeaderUtilityDividerProps) {
  return (
    <span
      data-slot="krds-header-utility-divider"
      aria-hidden="true"
      className={cn("bg-krds-surface-disabled inline-block h-4 w-px", className)}
      {...props}
    />
  )
}

// ─── HeaderUtilityDropdown (유틸리티 목록 드롭다운 — Popover) ────────────────────

type HeaderUtilityDropdownProps = React.ComponentProps<"div"> & {
  label: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function HeaderUtilityDropdown({
  className,
  children,
  label,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: HeaderUtilityDropdownProps) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <div data-slot="krds-header-utility-dropdown" className={cn("relative", className)} {...props}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn(
              "group inline-flex items-center gap-1",
              "text-krds-foreground text-krds-body-sm",
              "hover:underline",
              "focus-visible:krds-focus-ring rounded-sm"
            )}
          >
            {label}
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="transition-transform group-data-[state=open]:rotate-180"
            />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content asChild align="center" sideOffset={6}>
            <ul
              data-slot="krds-header-utility-dropdown-menu"
              className={cn(
                "border-krds-border bg-krds-surface relative z-50 min-w-[160px] rounded-md border py-1 shadow-md"
              )}
            >
              {/* 원본 .krds-drop-wrap .drop-menu::before — 중앙 꼬리 (common.css:873) */}
              <span
                aria-hidden
                className="border-krds-border bg-krds-surface pointer-events-none absolute -top-[6px] left-1/2 block h-3 w-3 -translate-x-1/2 rotate-45 border border-r-transparent border-b-transparent"
              />
              {children}
            </ul>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
    </PopoverPrimitive.Root>
  )
}

type HeaderUtilityDropdownItemProps = React.HTMLAttributes<HTMLElement> & { href?: string }

function HeaderUtilityDropdownItem({ className, children, ...props }: HeaderUtilityDropdownItemProps) {
  return (
    <li>
      <HeaderLink
        dataSlot="krds-header-utility-dropdown-item"
        className={cn(
          "flex w-full items-center px-4 py-2 text-left",
          "text-krds-foreground text-krds-body-sm",
          "hover:bg-krds-surface-secondary-subtle",
          "focus-visible:krds-focus-ring-inset",
          className
        )}
        {...props}
      >
        {children}
      </HeaderLink>
    </li>
  )
}

// ─── HeaderInner (메인 행 — 브랜드 + 액션) ──────────────────────────────────────

type HeaderInnerProps = React.ComponentProps<"div">

function HeaderInner({ className, ...props }: HeaderInnerProps) {
  return (
    <div
      data-slot="krds-header-inner"
      className={cn("mx-auto flex max-w-[1248px] items-center gap-10 px-6 pb-4", className)}
      {...props}
    />
  )
}

// ─── HeaderBrand ──────────────────────────────────────────────────────────────

type HeaderBrandProps = React.HTMLAttributes<HTMLElement> & { href?: string }

function HeaderBrand({ className, ...props }: HeaderBrandProps) {
  return (
    <HeaderLink
      dataSlot="krds-header-brand"
      className={cn(
        "inline-flex h-12 items-center gap-2",
        "text-krds-foreground text-lg font-bold",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
      {...props}
    />
  )
}

// ─── HeaderActions ────────────────────────────────────────────────────────────

type HeaderActionsProps = React.ComponentProps<"div">

function HeaderActions({ className, ...props }: HeaderActionsProps) {
  return (
    <div
      data-slot="krds-header-actions"
      className={cn("flex flex-1 items-start justify-end gap-2", className)}
      {...props}
    />
  )
}

type HeaderActionItemProps = React.HTMLAttributes<HTMLElement> & { href?: string; icon?: React.ReactNode }

function HeaderActionItem({ className, children, icon, ...props }: HeaderActionItemProps) {
  return (
    <HeaderLink
      dataSlot="krds-header-action-item"
      className={cn(
        // KRDS .btn-navi(_header.scss:94-99): flex-col + justify-between, gap 4px(row)/8px(col),
        // min-height size-height-6=40px, padding padding-2 padding-5 0 = 4px 12px 0, radius medium1=6px.
        "inline-flex min-h-10 flex-col items-center justify-between gap-1 rounded-[6px] px-3 pt-1 whitespace-nowrap",
        "text-krds-body-md text-krds-foreground font-bold",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="size-5 shrink-0 [&>svg]:size-5" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </HeaderLink>
  )
}

// ─── HeaderActionDropdown (나의GOV action shell — Popover) ───────────────────────

type HeaderActionDropdownProps = React.ComponentProps<"div"> & {
  label?: React.ReactNode
  icon?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function HeaderActionDropdown({
  className,
  children,
  label = "나의GOV",
  icon,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: HeaderActionDropdownProps) {
  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <div data-slot="krds-header-action-dropdown" className={cn("relative", className)} {...props}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            className={cn(
              // HeaderActionItem(.btn-navi)과 동일한 세로(아이콘 위+라벨 아래) 배치 — 우측 액션 열 통일
              "group inline-flex min-h-10 flex-col items-center justify-between gap-1 rounded-[6px] px-3 pt-1 whitespace-nowrap",
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
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="transition-transform group-data-[state=open]:rotate-180"
              />
            </span>
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="center"
            sideOffset={6}
            data-slot="krds-header-action-dropdown-panel"
            className={cn(
              "border-krds-border bg-krds-surface relative z-50 min-w-[260px] rounded-md border p-4 shadow-md"
            )}
          >
            {/* 원본 .krds-drop-wrap .drop-menu::before — 중앙 꼬리 (common.css:873) */}
            <span
              aria-hidden
              className="border-krds-border bg-krds-surface pointer-events-none absolute -top-[6px] left-1/2 block h-3 w-3 -translate-x-1/2 rotate-45 border border-r-transparent border-b-transparent"
            />
            {children}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
    </PopoverPrimitive.Root>
  )
}

// ─── HeaderNav (하단 주요 메뉴 밴드) ────────────────────────────────────────────

type HeaderNavProps = React.ComponentProps<"nav">

function HeaderNav({ className, ...props }: HeaderNavProps) {
  return (
    <div data-slot="krds-header-navbar" className="border-krds-border-light bg-krds-surface w-full border-y">
      <nav
        data-slot="krds-header-nav"
        className={cn("mx-auto flex h-14 max-w-[1248px] items-center gap-4 px-6", className)}
        {...props}
      />
    </div>
  )
}

type HeaderNavItemProps = React.HTMLAttributes<HTMLElement> & { href?: string; hasSubmenu?: boolean }

function HeaderNavItem({ className, children, hasSubmenu, ...props }: HeaderNavItemProps) {
  return (
    <HeaderLink
      dataSlot="krds-header-nav-item"
      className={cn(
        "inline-flex h-14 items-center gap-2 px-4",
        "text-krds-foreground-subtle text-krds-body-lg font-bold",
        "hover:text-krds-foreground",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
      {...props}
    >
      {children}
      {hasSubmenu && <ChevronDown size={20} aria-hidden="true" />}
    </HeaderLink>
  )
}

export {
  Header,
  HeaderTop,
  HeaderUtility,
  HeaderUtilityItem,
  HeaderUtilityDivider,
  HeaderUtilityDropdown,
  HeaderUtilityDropdownItem,
  HeaderInner,
  HeaderBrand,
  HeaderActions,
  HeaderActionItem,
  HeaderActionDropdown,
  HeaderNav,
  HeaderNavItem,
}
export type {
  HeaderProps,
  HeaderTopProps,
  HeaderUtilityProps,
  HeaderUtilityItemProps,
  HeaderUtilityDividerProps,
  HeaderUtilityDropdownProps,
  HeaderUtilityDropdownItemProps,
  HeaderInnerProps,
  HeaderBrandProps,
  HeaderActionsProps,
  HeaderActionItemProps,
  HeaderActionDropdownProps,
  HeaderNavProps,
  HeaderNavItemProps,
}
