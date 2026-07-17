"use client"

/**
 * KRDS HelpPanel — right-side drawer composed on shadcn Sheet (Radix Dialog).
 *
 * Reference: https://www.krds.go.kr/storybook/react/?path=/docs/components-helppanel--docs
 * Figma: node 360-44743
 *
 * Structure:
 *   <HelpPanel defaultOpen={false}>
 *     <HelpPanelTrigger>도움말</HelpPanelTrigger>   (rendered OUTSIDE — SheetTrigger)
 *     <HelpPanelContent srOnlyTitle="도움">         (rendered INSIDE SheetContent)
 *       <HelpSection title="..." description="...">
 *         <HelpLinkList links={[{text, href, target?, icon?}]} />
 *       </HelpSection>
 *       <HelpRelatedService>
 *         <HelpServiceGroup title="관련서비스/민원">...</HelpServiceGroup>
 *       </HelpRelatedService>
 *     </HelpPanelContent>
 *     <HelpPanelAction>
 *       <Button variant="secondary">그만 따라하기</Button>
 *     </HelpPanelAction>
 *     <HelpPanelClose />
 *   </HelpPanel>
 *
 * Trigger is auto-extracted from children via React element identity and
 * mounted as SheetTrigger; everything else renders inside SheetContent.
 * Open/close state, focus trap, portal, overlay, ESC handling, and slide
 * animation come from Sheet — no manual state management here.
 *
 * [의도적 이탈] KRDS 원본(help_panel.html)은 "도움/따라하기" 탭 패널 하나로 구성되며
 * tutorial_panel.html 과 마크업이 동일(기본 활성 탭만 다름)하다. 이 프로젝트는 이를
 * 의도적으로 분해했다: 원본 탭 구조는 (help)/tutorial-panel.tsx 가 충실 구현하고,
 * 본 HelpPanel 은 탭 없는 단순 도움말 변형을 제공한다. 탭 구조가 필요하면
 * TutorialPanel 을 사용할 것.
 */

import * as React from "react"
import { ChevronRight, ChevronLeft, HelpCircle, MessageCircleQuestion, Phone } from "lucide-react"

import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@/registry/krds/ui/button"
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/registry/krds/ui/disclosure"
import { cn } from "@/lib/utils"

// ─── HelpPanel (Root) ─────────────────────────────────────────────────────────

type HelpPanelProps = {
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  children?: React.ReactNode
}

function HelpPanel({ isOpen, defaultOpen = false, onOpenChange, className, children }: HelpPanelProps) {
  // Split children: HelpPanelTrigger mounts as SheetTrigger asChild;
  // everything else renders inside SheetContent.
  const childArray = React.Children.toArray(children)
  const triggers: React.ReactNode[] = []
  const inner: React.ReactNode[] = []
  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === HelpPanelTrigger) {
      triggers.push(child)
    } else {
      inner.push(child)
    }
  })

  return (
    <DialogPrimitive.Root open={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {triggers.length > 0 ? <DialogPrimitive.Trigger asChild>{triggers[0]}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
        <DialogPrimitive.Content
          data-slot="krds-help-panel"
          className={cn(
            "fixed z-50 flex flex-col transition ease-in-out",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-300",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-500",
            "inset-y-0 right-0 h-full",
            "krds-help-panel",
            "w-[390px] gap-0 p-0 sm:max-w-[390px]",
            "border-krds-border bg-krds-surface-subtler border-l",
            className
          )}
        >
          <DialogPrimitive.Title className="sr-only">도움말</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">도움말 패널 콘텐츠</DialogPrimitive.Description>
          <div
            className={cn(
              "help-panel-wrap flex h-full flex-col",
              // KRDS --krds-help-panel--shadow: 0 0 0.2rem shadow2, 0 0.8rem 1.6rem shadow3 (_help_panel.scss:29,61)
              "shadow-[0_0_2px_0_rgba(0,0,0,0.08),0_8px_16px_0_rgba(0,0,0,0.12)]",
              "dark:shadow-[0_0_2px_0_rgba(0,0,0,0.2),0_8px_16px_0_rgba(0,0,0,0.4)]"
            )}
          >
            {/* KRDS .help-conts-area padding-top = padding-10 + size-height-6 = 80px, to clear the
                fixed '접어두기' close button (_help_panel.scss:66). */}
            <div className="help-conts-area flex h-full flex-col overflow-y-auto px-10 pt-20 pb-10">{inner}</div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

// ─── HelpPanelTrigger ─────────────────────────────────────────────────────────
// Mounted as SheetTrigger asChild by HelpPanel root — open behavior, aria-expanded,
// and aria-controls are wired automatically by Sheet (Radix Dialog.Trigger).

type HelpPanelTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
}

function HelpPanelTrigger({ className, children, ...props }: HelpPanelTriggerProps) {
  return (
    <Button
      type="button"
      variant="tertiary"
      size="sm"
      className={cn("gap-1", className)}
      {...props}
      // data-slot 은 {...props} 뒤에 둬야 한다: dispatcher(dynamic/help-panel)가
      // SheetTrigger asChild 로 감싸면 Radix Slot 이 data-slot="sheet-trigger" 를
      // props 로 주입한다. 앞에 두면 그 값에 덮여 krds-help-panel-trigger 가 사라진다.
      // (modal/tutorial-panel 등 다른 KRDS 트리거와의 슬롯 네이밍 일관성 유지)
      data-slot="krds-help-panel-trigger"
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      <span>{children ?? "도움말"}</span>
    </Button>
  )
}

// ─── HelpPanelClose ───────────────────────────────────────────────────────────
// "접어두기" button — closes the panel via SheetClose.

type HelpPanelCloseProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
}

function HelpPanelClose({ className, children, ...props }: HelpPanelCloseProps) {
  return (
    <DialogPrimitive.Close asChild>
      <button
        type="button"
        data-slot="krds-help-panel-close"
        className={cn(
          "btn-help-panel fold",
          // KRDS .btn-help-panel is position:fixed top/right 4rem (_help_panel.scss:195-197); the
          // panel itself is the fixed-positioned ancestor here, so absolute top-10/right-10 (40px)
          // reproduces the same fixed-to-viewport-edge placement without escaping the panel.
          // 접어두기는 krds-btn small tertiary(보더 버튼, help_panel.html:173) — 텍스트 링크가 아님.
          "border-krds-border-dark text-krds-body-sm text-krds-foreground absolute top-10 right-10",
          "inline-flex h-10 items-center gap-1 rounded-[6px] border bg-transparent px-3",
          "hover:bg-krds-surface-subtler active:bg-krds-surface-subtle transition-colors",
          "focus-visible:krds-focus-ring",
          className
        )}
        {...props}
      >
        <span>{children ?? "접어두기"}</span>
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </DialogPrimitive.Close>
  )
}

// ─── HelpPanelContent ─────────────────────────────────────────────────────────

type HelpPanelContentProps = React.ComponentProps<"div"> & {
  srOnlyTitle?: string
}

function HelpPanelContent({ srOnlyTitle = "도움", className, children, ...props }: HelpPanelContentProps) {
  return (
    <div data-slot="krds-help-panel-content" className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="help-conts-area-inner flex flex-col gap-8">
        <h3 className="sr-only">{srOnlyTitle}</h3>
        {children}
      </div>
    </div>
  )
}

// ─── HelpSection ──────────────────────────────────────────────────────────────

type HelpSectionProps = React.ComponentProps<"div"> & {
  title: React.ReactNode
  description?: React.ReactNode
}

function HelpSection({ title, description, className, children, ...props }: HelpSectionProps) {
  return (
    <div
      data-slot="krds-help-section"
      className={cn("conts-area help-conts flex flex-col gap-4", className)}
      {...props}
    >
      <div className="conts-wrap flex flex-col gap-3">
        <h4 className="help-title text-krds-heading-sm text-krds-foreground flex items-center justify-between font-bold">
          <span>{title}</span>
          <button
            type="button"
            className={cn(
              "krds-btn medium icon",
              "text-krds-foreground inline-flex size-8 items-center justify-center rounded",
              "hover:bg-krds-surface-subtle focus-visible:krds-focus-ring"
            )}
            aria-label="도움말"
          >
            <span className="sr-only">도움말</span>
            <HelpCircle className="size-5" aria-hidden="true" />
          </button>
        </h4>
        {description != null && (
          <div className="conts-desc">
            <p className="text-krds-body-md text-krds-foreground">{description}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

// ─── HelpLinkList ─────────────────────────────────────────────────────────────

type HelpLinkItem = {
  text: React.ReactNode
  href: string
  target?: React.HTMLAttributeAnchorTarget
  icon?: React.ReactNode
}

type HelpLinkListProps = React.ComponentProps<"ul"> & {
  links: HelpLinkItem[]
  iconPosition?: "left" | "right"
}

function HelpLinkList({ links, iconPosition = "right", className, ...props }: HelpLinkListProps) {
  return (
    <ul data-slot="krds-help-link-list" className={cn("link-list flex flex-col gap-2", className)} {...props}>
      {links.map((link, i) => {
        const icon = link.icon ?? <ChevronRight className="size-4" aria-hidden="true" />
        return (
          <li key={i}>
            <a
              href={link.href}
              target={link.target}
              rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              className={cn(
                // KRDS .link-list 링크는 검정(text-basic) 17px 무밑줄 + 아이콘 (help_panel.html — 파랑/밑줄 아님)
                "text-krds-body-md text-krds-foreground inline-flex items-center gap-1",
                "hover:underline",
                "focus-visible:krds-focus-ring"
              )}
            >
              {iconPosition === "left" && icon}
              <span>{link.text}</span>
              {iconPosition === "right" && icon}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

// ─── HelpRelatedService ───────────────────────────────────────────────────────

function HelpRelatedService({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-help-related-service"
      className={cn(
        "conts-area related-service flex flex-col gap-6",
        "border-krds-border-light border-t pt-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── HelpServiceGroup ─────────────────────────────────────────────────────────

type HelpServiceGroupProps = React.ComponentProps<"div"> & {
  title: React.ReactNode
}

function HelpServiceGroup({ title, className, children, ...props }: HelpServiceGroupProps) {
  return (
    <div data-slot="krds-help-service-group" className={cn("conts-wrap flex flex-col gap-3", className)} {...props}>
      <h4 className="help-title text-krds-heading-xs text-krds-foreground font-bold">{title}</h4>
      {children}
    </div>
  )
}

// ─── HelpTutorialTitle ────────────────────────────────────────────────────────

type HelpTutorialTitleProps = {
  title: React.ReactNode
  href?: string
  className?: string
}

function HelpTutorialTitle({ title, href, className }: HelpTutorialTitleProps) {
  return (
    <h4
      data-slot="krds-help-tutorial-title"
      className={cn("help-title text-krds-heading-sm text-krds-foreground font-bold", className)}
    >
      {href ? (
        <a
          href={href}
          className={cn(
            "hover:text-krds-foreground-primary inline-flex items-center gap-1",
            "focus-visible:krds-focus-ring"
          )}
        >
          <span>{title}</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </a>
      ) : (
        title
      )}
    </h4>
  )
}

// ─── HelpCoachProcess ─────────────────────────────────────────────────────────

function HelpCoachProcess({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="krds-help-coach-process"
      className={cn(
        "coach-help-process flex flex-col gap-10",
        "[&>li+li]:border-krds-border-light [&>li+li]:border-t [&>li+li]:pt-10",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  )
}

// ─── HelpCoachTask ────────────────────────────────────────────────────────────

type HelpCoachTaskProps = {
  title: React.ReactNode
  isCurrent?: boolean
  expandText: React.ReactNode
  steps: React.ReactNode[]
  className?: string
}

function HelpCoachTask({ title, isCurrent = false, expandText, steps, className }: HelpCoachTaskProps) {
  return (
    <li data-slot="krds-help-coach-task" className={cn("flex flex-col gap-2", className)}>
      <h4
        className={cn(
          "tit text-krds-body-md font-bold",
          isCurrent ? "current text-krds-foreground-primary" : "text-krds-foreground"
        )}
      >
        {title}
      </h4>
      <Disclosure className="conts-expand-area">
        <DisclosureTrigger>{expandText}</DisclosureTrigger>
        <DisclosureContent>
          <ol className="text-krds-body-sm text-krds-foreground list-decimal pl-5">
            {steps.map((step, i) => (
              <li key={i} className="mb-1 last:mb-0">
                {step}
              </li>
            ))}
          </ol>
        </DisclosureContent>
      </Disclosure>
    </li>
  )
}

// ─── HelpPanelAction ──────────────────────────────────────────────────────────

function HelpPanelAction({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-help-panel-action"
      className={cn("help-panel-action border-krds-border-light flex w-full flex-col gap-2 border-t pt-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── HelpContentArea ──────────────────────────────────────────────────────────
// Generic container (used to wrap tutorial title + coach process)

function HelpContentArea({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-help-content-area" className={cn("conts-area flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  )
}

// ─── Re-exported helper icons (for example consumers) ─────────────────────────

export { Phone as HelpPhoneIcon, MessageCircleQuestion as HelpFaqIcon }

export {
  HelpPanel,
  HelpPanelTrigger,
  HelpPanelContent,
  HelpSection,
  HelpLinkList,
  HelpRelatedService,
  HelpServiceGroup,
  HelpTutorialTitle,
  HelpCoachProcess,
  HelpCoachTask,
  HelpPanelAction,
  HelpContentArea,
  HelpPanelClose,
}
export type {
  HelpPanelProps,
  HelpPanelTriggerProps,
  HelpPanelCloseProps,
  HelpPanelContentProps,
  HelpSectionProps,
  HelpLinkListProps,
  HelpLinkItem,
  HelpServiceGroupProps,
  HelpTutorialTitleProps,
  HelpCoachTaskProps,
}
