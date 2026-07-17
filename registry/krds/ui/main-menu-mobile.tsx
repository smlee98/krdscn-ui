// rsc:client
"use client"

/**
 * KRDS MainMenuMobile — mobile GNB drawer (전체메뉴), composed on Radix Dialog
 * directly (Sheet pattern), following the same approach as (help)/help-panel.tsx.
 *
 * Reference: Z:\krds-uiux\html\code\main_menu_mobile.html
 *            Z:\krds-uiux\resources\scss\component\_main_menu.scss
 *            (`.krds-main-menu-mobile`, lines ~467-1110)
 * KRDS root font-size is 62.5%, so 1rem = 10px in the source SCSS.
 *
 * Structure (mirrors KRDS DOM regions 1:1):
 *   <MainMenuMobile defaultOpen={false}>
 *     <MainMenuMobileTrigger />                       (rendered OUTSIDE — Dialog.Trigger)
 *     <MainMenuMobileContent defaultActiveTab="policy">
 *       <MainMenuMobileClose />
 *       <MainMenuMobileHeader>                        (gnb-header)
 *         <MainMenuMobileUtilList>                    (gnb-utils)
 *           <MainMenuMobileUtilItem href="#">메뉴명</MainMenuMobileUtilItem>
 *         </MainMenuMobileUtilList>
 *         <MainMenuMobileLogin href="#">로그인을 해주세요</MainMenuMobileLogin>
 *         <MainMenuMobileServiceMenu>                 (gnb-service-menu)
 *           <MainMenuMobileServiceMenuItem href="#" icon={<Icon />}>메뉴명</MainMenuMobileServiceMenuItem>
 *         </MainMenuMobileServiceMenu>
 *         <MainMenuMobileSearch onSearch={...} />
 *       </MainMenuMobileHeader>
 *       <MainMenuMobileBody>                          (gnb-body)
 *         <MainMenuMobileMenu>                         (gnb-menu)
 *           <MainMenuMobileTabList>                    (menu-wrap)
 *             <MainMenuMobileTab value="policy">정책정보</MainMenuMobileTab>
 *           </MainMenuMobileTabList>
 *           <MainMenuMobileSubmenuList>                (submenu-wrap)
 *             <MainMenuMobileSubmenu value="policy" title="정책정보">
 *               <MainMenuMobileSubItem href="#">2Depth</MainMenuMobileSubItem>
 *               <MainMenuMobileDepth3 trigger="2Depth (하위 있음)">
 *                 <MainMenuMobileDepth3Item href="#">3Depth</MainMenuMobileDepth3Item>
 *                 <MainMenuMobileDepth3Item depth4="d4-1">3Depth (전체보기)</MainMenuMobileDepth3Item>
 *               </MainMenuMobileDepth3>
 *             </MainMenuMobileSubmenu>
 *           </MainMenuMobileSubmenuList>
 *         </MainMenuMobileMenu>
 *         <MainMenuMobileBottom>
 *           <MainMenuMobileBottomLink href="#">메뉴명</MainMenuMobileBottomLink>
 *         </MainMenuMobileBottom>
 *       </MainMenuMobileBody>
 *       <MainMenuMobileDepth4Panel value="d4-1" title="4Depth title">
 *         <MainMenuMobileDepth4Item href="#">depth title</MainMenuMobileDepth4Item>
 *       </MainMenuMobileDepth4Panel>
 *     </MainMenuMobileContent>
 *   </MainMenuMobile>
 *
 * Trigger is auto-extracted from children via React element identity and mounted
 * as Dialog.Trigger (asChild is an internal implementation detail here, not a
 * prop exposed on any of these components — same technique as HelpPanel).
 * Depth4Panel is a fixed, full-viewport slide-over (KRDS `depth4-wrap`: right
 * -100% → 0) independent of DOM nesting depth, toggled by `activeDepth4` state
 * held on Content and opened via a `depth4` value on MainMenuMobileDepth3Item.
 */

import * as React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Menu, Search, X } from "lucide-react"

import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/registry/krds/ui/button"
import { TextInput } from "@/registry/krds/ui/text-input"
import { cn } from "@/lib/utils"

// ─── Context ──────────────────────────────────────────────────────────────────

type MainMenuMobileCtx = {
  activeTab: string | undefined
  setActiveTab: (value: string) => void
  activeDepth4: string | null
  openDepth4: (value: string) => void
  closeDepth4: () => void
}

const MainMenuMobileContext = React.createContext<MainMenuMobileCtx | null>(null)

function useMainMenuMobileContext(component: string): MainMenuMobileCtx {
  const ctx = React.useContext(MainMenuMobileContext)
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <MainMenuMobileContent>`)
  }
  return ctx
}

// ─── MainMenuMobile (Root) ─────────────────────────────────────────────────────

type MainMenuMobileProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function MainMenuMobile({ open, defaultOpen = false, onOpenChange, children }: MainMenuMobileProps) {
  // Split children: MainMenuMobileTrigger mounts as Dialog.Trigger asChild;
  // everything else (MainMenuMobileContent) renders as a sibling of the trigger.
  const childArray = React.Children.toArray(children)
  const triggers: React.ReactNode[] = []
  const inner: React.ReactNode[] = []
  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === MainMenuMobileTrigger) {
      triggers.push(child)
    } else {
      inner.push(child)
    }
  })

  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {triggers.length > 0 ? <DialogPrimitive.Trigger asChild>{triggers[0]}</DialogPrimitive.Trigger> : null}
      {inner}
    </DialogPrimitive.Root>
  )
}

// ─── MainMenuMobileTrigger ──────────────────────────────────────────────────────
// Mounted as Dialog.Trigger asChild by MainMenuMobile root — aria-expanded and
// aria-controls are wired automatically by Radix Dialog.Trigger.

type MainMenuMobileTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
  label?: React.ReactNode
}

function MainMenuMobileTrigger({ className, children, label = "전체메뉴", ...props }: MainMenuMobileTriggerProps) {
  return (
    <Button
      type="button"
      variant="text"
      size="icon"
      className={className}
      {...props}
      data-slot="krds-main-menu-mobile-trigger"
      aria-label={typeof label === "string" ? label : undefined}
    >
      {children ?? <Menu className="size-6" aria-hidden="true" />}
      {typeof label !== "string" ? <span className="sr-only">{label}</span> : null}
    </Button>
  )
}

// ─── MainMenuMobileContent (gnb-wrap) ──────────────────────────────────────────

type MainMenuMobileContentProps = {
  className?: string
  children?: React.ReactNode
  defaultActiveTab?: string
  title?: string
}

function MainMenuMobileContent({
  className,
  children,
  defaultActiveTab,
  title = "전체메뉴",
}: MainMenuMobileContentProps) {
  const [activeTab, setActiveTab] = React.useState<string | undefined>(defaultActiveTab)
  const [activeDepth4, setActiveDepth4] = React.useState<string | null>(null)

  const ctx = React.useMemo<MainMenuMobileCtx>(
    () => ({
      activeTab,
      setActiveTab,
      activeDepth4,
      openDepth4: (value: string) => setActiveDepth4(value),
      closeDepth4: () => setActiveDepth4(null),
    }),
    [activeTab, activeDepth4]
  )

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="krds-main-menu-mobile-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-black/75",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0"
        )}
      />
      <DialogPrimitive.Content
        data-slot="krds-main-menu-mobile"
        className={cn(
          "bg-krds-surface fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col",
          "transition ease-in-out",
          "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-300",
          "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-500",
          "md:w-2/5",
          className
        )}
      >
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">모바일 전체메뉴 패널</DialogPrimitive.Description>
        <MainMenuMobileContext.Provider value={ctx}>{children}</MainMenuMobileContext.Provider>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

// ─── MainMenuMobileClose (#close-nav) ───────────────────────────────────────────

type MainMenuMobileCloseProps = Omit<React.ComponentProps<"button">, "children"> & {
  label?: string
}

function MainMenuMobileClose({ className, label = "전체메뉴 닫기", ...props }: MainMenuMobileCloseProps) {
  return (
    <DialogPrimitive.Close asChild>
      <Button
        type="button"
        variant="text"
        size="icon"
        data-slot="krds-main-menu-mobile-close"
        aria-label={label}
        // KRDS #close-nav 는 header padding(16px) 지점의 컴팩트 아이콘 버튼 — 글리프가 유틸 행과
        // 수직 정렬된다. 우리 버튼은 48px 히트영역(shadcn-compat)이라 글리프 중심(24px)이 유틸 행
        // 중심(패딩16+행높이22.5/2≈27px)과 일치하도록 top/right 를 보정한다.
        className={cn("absolute top-[3px] right-1 z-10", className)}
        {...props}
      >
        <X className="size-6" aria-hidden="true" />
      </Button>
    </DialogPrimitive.Close>
  )
}

// ─── MainMenuMobileHeader (gnb-header) ─────────────────────────────────────────

function MainMenuMobileHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-main-menu-mobile-header"
      className={cn("border-krds-border-light relative flex flex-col gap-4 border-b px-4 pt-4 pb-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── MainMenuMobileUtilList / Item (gnb-utils) ─────────────────────────────────

function MainMenuMobileUtilList({ className, children }: React.ComponentProps<"ul">) {
  return (
    <ul data-slot="krds-main-menu-mobile-util-list" className={cn("flex items-center", className)}>
      {children}
    </ul>
  )
}

type MainMenuMobileUtilItemProps = {
  href?: string
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileUtilItem({ href, className, children }: MainMenuMobileUtilItemProps) {
  return (
    <li
      className={cn(
        "flex items-center",
        // KRDS utility-list 구분선: 1×16px(border-gray-light) 바를 항목 사이에 두고
        // 양쪽에 utils-gap(gap-5=16px)을 동일하게 준다 (_main_menu.scss:624-638).
        "[&:not(:first-child)]:before:bg-krds-border-light [&:not(:first-child)]:before:mx-4",
        "[&:not(:first-child)]:before:block [&:not(:first-child)]:before:h-4",
        "[&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:content-['']"
      )}
    >
      <a
        href={href}
        className={cn(
          "text-krds-foreground text-krds-body-sm",
          "hover:text-krds-foreground-primary",
          "focus-visible:krds-focus-ring",
          className
        )}
      >
        {children}
      </a>
    </li>
  )
}

// ─── MainMenuMobileLogin (gnb-login) ────────────────────────────────────────────

type MainMenuMobileLoginProps = {
  href?: string
  onClick?: React.MouseEventHandler
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileLogin({ href, onClick, className, children }: MainMenuMobileLoginProps) {
  const sharedClassName = cn(
    "text-krds-foreground text-krds-body-md inline-flex items-center gap-2 font-bold",
    "focus-visible:krds-focus-ring",
    className
  )
  if (href) {
    return (
      <a data-slot="krds-main-menu-mobile-login" href={href} className={sharedClassName}>
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      data-slot="krds-main-menu-mobile-login"
      onClick={onClick}
      className={cn(sharedClassName, "w-fit")}
    >
      {children}
    </button>
  )
}

// ─── MainMenuMobileServiceMenu / Item (gnb-service-menu) ───────────────────────

function MainMenuMobileServiceMenu({ className, children }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-main-menu-mobile-service-menu" className={cn("flex justify-between gap-2", className)}>
      {children}
    </div>
  )
}

type MainMenuMobileServiceMenuItemProps = {
  href?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileServiceMenuItem({ href, icon, className, children }: MainMenuMobileServiceMenuItemProps) {
  return (
    <a
      href={href}
      data-slot="krds-main-menu-mobile-service-menu-item"
      className={cn(
        "text-krds-foreground flex h-14 w-20 flex-col items-center justify-center gap-0.5 rounded-md",
        "text-krds-body-md font-bold",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring",
        className
      )}
    >
      {icon && (
        <span aria-hidden="true" className="text-krds-foreground-subtle flex size-5 items-center justify-center">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </a>
  )
}

// ─── MainMenuMobileSearch (sch-input) ───────────────────────────────────────────

type MainMenuMobileSearchProps = {
  className?: string
  placeholder?: string
  value?: string
  onSearch?: (value: string) => void
}

function MainMenuMobileSearch({
  className,
  placeholder = "찾고자 하는 메뉴명을 입력해 주세요",
  value,
  onSearch,
}: MainMenuMobileSearchProps) {
  const [internal, setInternal] = React.useState(value ?? "")
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  return (
    <form
      data-slot="krds-main-menu-mobile-search"
      className={cn("flex items-center gap-2", className)}
      onSubmit={(event) => {
        event.preventDefault()
        onSearch?.(current)
      }}
    >
      <TextInput
        size="medium"
        value={current}
        onChange={(next) => {
          if (!isControlled) setInternal(next)
        }}
        placeholder={placeholder}
        title="찾고자 하는 메뉴명 입력"
        className="flex-1"
      />
      <Button type="submit" variant="text" size="icon" aria-label="검색">
        <Search className="size-5" aria-hidden="true" />
      </Button>
    </form>
  )
}

// ─── MainMenuMobileBody (gnb-body) ──────────────────────────────────────────────

function MainMenuMobileBody({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-main-menu-mobile-body"
      className={cn("flex flex-1 flex-col overflow-y-auto scroll-smooth", className)}
    >
      {children}
    </div>
  )
}

// ─── MainMenuMobileMenu (gnb-menu) ──────────────────────────────────────────────

function MainMenuMobileMenu({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-main-menu-mobile-menu"
      // flex-1: gnb-body(flex:1 스크롤 영역)의 남은 높이를 메뉴가 채워, 좌측 1Depth 회색
      // 컬럼과 우측 서브메뉴가 드로어 바닥까지 이어진다(원본 렌더와 동일). 콘텐츠가
      // 뷰포트보다 길면 자연 높이로 스크롤되므로 부작용 없음.
      className={cn("bg-krds-surface-secondary-subtle relative flex flex-1", className)}
    >
      {children}
    </div>
  )
}

// ─── MainMenuMobileTabList / Tab (menu-wrap, gnb-main-trigger) ─────────────────

function MainMenuMobileTabList({
  className,
  children,
  "aria-label": ariaLabel = "1뎁스 메뉴",
}: React.ComponentProps<"div"> & { "aria-label"?: string }) {
  return (
    <div data-slot="krds-main-menu-mobile-tab-list" className={cn("w-[124px] shrink-0", className)}>
      <ul role="tablist" aria-label={ariaLabel} className="sticky top-0 flex flex-col">
        {children}
      </ul>
    </div>
  )
}

type MainMenuMobileTabProps = {
  value: string
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileTab({ value, className, children }: MainMenuMobileTabProps) {
  const { activeTab, setActiveTab } = useMainMenuMobileContext("MainMenuMobileTab")
  const active = activeTab === value

  return (
    <li role="presentation">
      <button
        type="button"
        role="tab"
        aria-selected={active}
        data-slot="krds-main-menu-mobile-tab"
        onClick={() => setActiveTab(value)}
        className={cn(
          "flex h-16 w-full items-center px-6 text-left",
          "text-krds-body-md font-bold",
          "focus-visible:krds-focus-ring focus-visible:bg-krds-surface-secondary-pressed",
          active ? "bg-krds-surface text-krds-foreground-secondary" : "text-krds-foreground",
          className
        )}
      >
        {children}
      </button>
    </li>
  )
}

// ─── MainMenuMobileSubmenuList / Submenu (submenu-wrap, gnb-sub-list) ──────────

function MainMenuMobileSubmenuList({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-main-menu-mobile-submenu-list"
      className={cn("bg-krds-surface flex flex-1 flex-col", className)}
    >
      {children}
    </div>
  )
}

type MainMenuMobileSubmenuProps = {
  value: string
  title: React.ReactNode
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileSubmenu({ value, title, className, children }: MainMenuMobileSubmenuProps) {
  const { activeTab } = useMainMenuMobileContext("MainMenuMobileSubmenu")
  const active = activeTab === value

  return (
    <div
      id={value}
      role="tabpanel"
      hidden={!active}
      data-slot="krds-main-menu-mobile-submenu"
      className={cn("p-4", className)}
    >
      <h2 className="border-krds-border text-krds-heading-sm flex items-center border-b px-2 pt-2 pb-4 font-bold">
        {title}
      </h2>
      <ul className="flex flex-col gap-2 py-2">{children}</ul>
    </div>
  )
}

// ─── MainMenuMobileSubItem (gnb-sub-trigger, 2Depth) ───────────────────────────

type MainMenuMobileSubItemProps = {
  href?: string
  selected?: boolean
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileSubItem({ href, selected, className, children }: MainMenuMobileSubItemProps) {
  return (
    <li>
      <a
        href={href}
        aria-current={selected ? "page" : undefined}
        data-slot="krds-main-menu-mobile-sub-item"
        className={cn(
          "text-krds-body-md flex items-center rounded-lg px-2 py-3 transition-colors",
          "hover:bg-krds-surface-secondary-subtle",
          "focus-visible:krds-focus-ring",
          selected
            ? "text-krds-foreground-secondary bg-krds-surface-secondary-subtle font-bold"
            : "text-krds-foreground",
          className
        )}
      >
        {children}
      </a>
    </li>
  )
}

// ─── MainMenuMobileDepth3 (has-depth3 accordion, depth3-wrap) ──────────────────

type MainMenuMobileDepth3Props = {
  trigger: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileDepth3({
  trigger,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  children,
}: MainMenuMobileDepth3Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  function toggle() {
    const next = !isOpen
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }

  return (
    <li>
      <button
        type="button"
        aria-expanded={isOpen}
        data-slot="krds-main-menu-mobile-depth3-trigger"
        onClick={toggle}
        className={cn(
          "text-krds-body-md flex w-full items-center rounded-lg px-2 py-3 text-left transition-colors",
          "hover:bg-krds-surface-secondary-subtle",
          "focus-visible:krds-focus-ring",
          isOpen ? "text-krds-foreground-secondary bg-krds-surface-secondary-subtle font-bold" : "text-krds-foreground",
          className
        )}
      >
        <span className="flex-1">{trigger}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn("size-5 shrink-0 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      <div
        data-slot="krds-main-menu-mobile-depth3-content"
        className={cn("grid transition-all", isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
      >
        <ul className="flex flex-col gap-2 overflow-hidden">{children}</ul>
      </div>
    </li>
  )
}

// ─── MainMenuMobileDepth3Item (depth3-trigger, 3Depth) ─────────────────────────

type MainMenuMobileDepth3ItemProps = {
  href?: string
  selected?: boolean
  /** Opens the MainMenuMobileDepth4Panel with the matching `value` (has-depth4). */
  depth4?: string
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileDepth3Item({ href, selected, depth4, className, children }: MainMenuMobileDepth3ItemProps) {
  const ctx = React.useContext(MainMenuMobileContext)
  const sharedClassName = cn(
    "text-krds-body-md flex items-center gap-2 rounded-md px-4 py-2.5 transition-colors",
    "before:content-['•']",
    "hover:bg-krds-surface-secondary-subtle",
    "focus-visible:krds-focus-ring",
    selected ? "text-krds-foreground-secondary bg-krds-surface-secondary-subtle font-bold" : "text-krds-foreground",
    className
  )

  if (depth4) {
    return (
      <li>
        <button
          type="button"
          aria-haspopup="true"
          data-slot="krds-main-menu-mobile-depth3-item"
          onClick={() => ctx?.openDepth4(depth4)}
          className={cn(sharedClassName, "w-full text-left")}
        >
          <span className="flex-1">{children}</span>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0" />
        </button>
      </li>
    )
  }

  return (
    <li>
      <a
        href={href}
        aria-current={selected ? "page" : undefined}
        data-slot="krds-main-menu-mobile-depth3-item"
        className={sharedClassName}
      >
        {children}
      </a>
    </li>
  )
}

// ─── MainMenuMobileDepth4Panel (depth4-wrap, full slide-over) ──────────────────

type MainMenuMobileDepth4PanelProps = {
  value: string
  title: React.ReactNode
  backLabel?: string
  closeLabel?: string
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileDepth4Panel({
  value,
  title,
  backLabel = "이전화면",
  closeLabel = "전체메뉴 닫기",
  className,
  children,
}: MainMenuMobileDepth4PanelProps) {
  const ctx = useMainMenuMobileContext("MainMenuMobileDepth4Panel")
  const isOpen = ctx.activeDepth4 === value

  return (
    <div
      data-slot="krds-main-menu-mobile-depth4-panel"
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
      className={cn(
        "bg-krds-surface fixed inset-y-0 right-0 z-10 flex h-full w-full flex-col",
        "transition-transform duration-300 ease-in-out md:w-2/5",
        isOpen ? "translate-x-0" : "translate-x-full",
        className
      )}
    >
      <div className="flex w-full items-center justify-between p-4">
        <Button type="button" variant="text" size="icon" aria-label={backLabel} onClick={ctx.closeDepth4}>
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <DialogPrimitive.Close asChild>
          <Button type="button" variant="text" size="icon" aria-label={closeLabel}>
            <X className="size-6" aria-hidden="true" />
          </Button>
        </DialogPrimitive.Close>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4">
        <h4 className="text-krds-heading-sm px-2 pt-2 pb-4 font-bold">{title}</h4>
        <ul className="flex flex-col gap-2">{children}</ul>
      </div>
    </div>
  )
}

// ─── MainMenuMobileDepth4Item (depth4-ul li a) ─────────────────────────────────

type MainMenuMobileDepth4ItemProps = {
  href?: string
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileDepth4Item({ href, className, children }: MainMenuMobileDepth4ItemProps) {
  return (
    <li>
      <a
        href={href}
        data-slot="krds-main-menu-mobile-depth4-item"
        className={cn(
          "text-krds-foreground text-krds-body-md flex items-center gap-1 rounded-md px-4 py-2.5 transition-colors",
          "before:content-['•']",
          "hover:text-krds-foreground-secondary hover:bg-krds-surface-secondary-subtle hover:font-bold",
          "active:bg-krds-surface-secondary-subtle",
          "focus-visible:krds-focus-ring",
          className
        )}
      >
        {children}
      </a>
    </li>
  )
}

// ─── MainMenuMobileBottom / BottomLink (gnb-bottom) ────────────────────────────

function MainMenuMobileBottom({ className, children }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-main-menu-mobile-bottom" className={cn("flex flex-col items-start gap-4 p-4", className)}>
      {children}
    </div>
  )
}

type MainMenuMobileBottomLinkProps = {
  href?: string
  external?: boolean
  className?: string
  children?: React.ReactNode
}

function MainMenuMobileBottomLink({ href, external, className, children }: MainMenuMobileBottomLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      title={external ? "새 창 열기" : undefined}
      data-slot="krds-main-menu-mobile-bottom-link"
      className={cn(
        "text-krds-foreground text-krds-body-sm inline-flex items-center gap-1",
        "focus-visible:krds-focus-ring",
        className
      )}
    >
      <span>{children}</span>
      {external ? (
        <ExternalLink className="size-4" aria-hidden="true" />
      ) : (
        <ChevronRight className="size-4" aria-hidden="true" />
      )}
    </a>
  )
}

export {
  MainMenuMobile,
  MainMenuMobileTrigger,
  MainMenuMobileContent,
  MainMenuMobileClose,
  MainMenuMobileHeader,
  MainMenuMobileUtilList,
  MainMenuMobileUtilItem,
  MainMenuMobileLogin,
  MainMenuMobileServiceMenu,
  MainMenuMobileServiceMenuItem,
  MainMenuMobileSearch,
  MainMenuMobileBody,
  MainMenuMobileMenu,
  MainMenuMobileTabList,
  MainMenuMobileTab,
  MainMenuMobileSubmenuList,
  MainMenuMobileSubmenu,
  MainMenuMobileSubItem,
  MainMenuMobileDepth3,
  MainMenuMobileDepth3Item,
  MainMenuMobileDepth4Panel,
  MainMenuMobileDepth4Item,
  MainMenuMobileBottom,
  MainMenuMobileBottomLink,
}
export type {
  MainMenuMobileProps,
  MainMenuMobileTriggerProps,
  MainMenuMobileContentProps,
  MainMenuMobileCloseProps,
  MainMenuMobileUtilItemProps,
  MainMenuMobileLoginProps,
  MainMenuMobileServiceMenuItemProps,
  MainMenuMobileSearchProps,
  MainMenuMobileTabProps,
  MainMenuMobileSubmenuProps,
  MainMenuMobileSubItemProps,
  MainMenuMobileDepth3Props,
  MainMenuMobileDepth3ItemProps,
  MainMenuMobileDepth4PanelProps,
  MainMenuMobileDepth4ItemProps,
  MainMenuMobileBottomLinkProps,
}
