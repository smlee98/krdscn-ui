// rsc:client
"use client"

/**
 * KRDS HelpPanel — 우측 슬라이드 드로어(도움말). 통합 `radix-ui` 패키지의 Dialog
 * 프리미티브를 직접 합성한다(Sheet 패턴): 개폐 상태·포커스 트랩·포털·오버레이·ESC·
 * 슬라이드 애니메이션을 Dialog 가 담당하며, 손으로 만든 상태머신은 없다.
 * (main-menu-mobile.tsx 와 동일한 접근 — shadcn Sheet 베이스를 감싸지 않는다.)
 *
 * 원본 셀렉터: `.help-panel-wrap` (help_panel.html)
 *   _help_panel.scss — shadow(:29,61) / `.help-conts-area` padding-top(:66) / `.btn-help-panel`(:195)
 * Figma: node 360-44743
 *
 * 구조 (KRDS DOM 영역과 1:1):
 *   <HelpPanel>
 *     <HelpPanelTrigger>도움말</HelpPanelTrigger>        (Dialog.Trigger — 포털 밖)
 *     <HelpPanelContent>                                 (Dialog.Portal + Overlay + Content)
 *       <HelpPanelClose />                               (접어두기 — 패널에 고정)
 *       <HelpPanelBody srOnlyTitle="도움">
 *         <HelpSection title="..." description="...">
 *           <HelpLinkList>
 *             <HelpLinkListItem href="...">...</HelpLinkListItem>
 *           </HelpLinkList>
 *         </HelpSection>
 *         <HelpRelatedService>
 *           <HelpServiceGroup title="관련서비스/민원">...</HelpServiceGroup>
 *         </HelpRelatedService>
 *         <HelpContentArea>
 *           <HelpTutorialTitle title="..." href="..." />
 *           <HelpCoachProcess>
 *             <HelpCoachTask title="..." expandText="...">
 *               <HelpCoachStep>...</HelpCoachStep>
 *             </HelpCoachTask>
 *           </HelpCoachProcess>
 *         </HelpContentArea>
 *       </HelpPanelBody>
 *       <HelpPanelAction>
 *         <Button variant="secondary">그만 따라하기</Button>
 *       </HelpPanelAction>
 *     </HelpPanelContent>
 *   </HelpPanel>
 *
 * Trigger 와 Content 는 별도 파트로 소비자가 명시 합성한다 — 루트가 children 을
 * `child.type` 으로 분류하지 않는다(Radix Dialog.Root 컨텍스트가 Trigger↔Content 를
 * 자동 연결). 커스텀 context 는 두지 않는다.
 *
 * [의도적 이탈] KRDS 원본(help_panel.html)은 "도움/따라하기" 탭 패널로 구성되며
 * tutorial_panel.html 과 마크업이 동일(기본 활성 탭만 다름)하다. 본 HelpPanel 은 탭
 * 없는 단순 도움말 변형을 제공하고, 탭 구조는 tutorial-panel.tsx 가 충실 구현한다.
 * 코치 진행(HelpCoachProcess/HelpCoachTask)·튜토리얼 제목(HelpTutorialTitle) 마크업은
 * tutorial-panel 과 겹치는 부분이 있어, 두 파일이 실제로 공유하게 되면 lib/ 승격 후보다.
 */

import * as React from "react"
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react"

import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/krds/ui/button"
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/registry/krds/ui/disclosure"

// ─── HelpLink (raw <a> 복붙 방지용 파일 내 단일 타입 헬퍼) ─────────────────────────
//
// 링크 목록·튜토리얼 제목의 앵커를 한 곳으로 모은다. className 은 호출부가 KRDS 클래스를
// 그대로 전달하고(캐스트 없음), target="_blank" 일 때 rel 을 자동 보강한다.
type HelpLinkProps = React.ComponentProps<"a"> & { href: string }

function HelpLink({ href, target, rel, ...props }: HelpLinkProps) {
  return (
    <a
      data-slot="krds-help-link"
      href={href}
      target={target}
      rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
      {...props}
    />
  )
}

// ─── HelpPanel (Root) ─────────────────────────────────────────────────────────
// Dialog.Root 그대로 — open/defaultOpen/onOpenChange 를 프리미티브에 전파한다.

type HelpPanelProps = React.ComponentProps<typeof DialogPrimitive.Root>

function HelpPanel(props: HelpPanelProps) {
  return <DialogPrimitive.Root {...props} />
}

// ─── HelpPanelTrigger ─────────────────────────────────────────────────────────
// Dialog.Trigger asChild 로 Button 을 감싼다 — open 동작, aria-expanded, aria-controls
// 는 Radix Dialog.Trigger 가 자동 배선한다.

type HelpPanelTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
  label?: string
}

function HelpPanelTrigger({ className, children, label = "도움말", ...props }: HelpPanelTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild>
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        className={cn("gap-1", className)}
        {...props}
        // data-slot 은 {...props} 뒤에 둔다: Button 내부가 data-slot="krds-button" 을 먼저
        // 쓰고 전달받은 props 로 덮으므로, 여기서 명시해야 krds-help-panel-trigger 로 확정된다.
        data-slot="krds-help-panel-trigger"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span>{children ?? label}</span>
      </Button>
    </DialogPrimitive.Trigger>
  )
}

// ─── HelpPanelContent ─────────────────────────────────────────────────────────
// 드로어 표면 — Dialog.Portal + Overlay + Content. children 은 콘텐츠 영역에 렌더된다.

type HelpPanelContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  title?: string
  description?: string
  overlayClassName?: string
}

function HelpPanelContent({
  title = "도움말",
  description = "도움말 패널 콘텐츠",
  overlayClassName,
  className,
  children,
  ...props
}: HelpPanelContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
          overlayClassName
        )}
      />
      <DialogPrimitive.Content
        data-slot="krds-help-panel-content"
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
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">{description}</DialogPrimitive.Description>
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
          <div className="help-conts-area flex h-full flex-col overflow-y-auto px-10 pt-20 pb-10">{children}</div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

// ─── HelpPanelClose ───────────────────────────────────────────────────────────
// "접어두기" 버튼 — Dialog.Close 로 패널을 닫는다.

type HelpPanelCloseProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
  label?: string
}

function HelpPanelClose({ className, children, label = "접어두기", ...props }: HelpPanelCloseProps) {
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
        <span>{children ?? label}</span>
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </DialogPrimitive.Close>
  )
}

// ─── HelpPanelBody ────────────────────────────────────────────────────────────
// 콘텐츠 그룹 래퍼 (KRDS .help-conts-area-inner) — 도움말 섹션들을 gap-8 로 묶는다.
// close/action 은 이 래퍼 밖(콘텐츠 영역 직계)에 두어 KRDS 간격을 유지한다.

type HelpPanelBodyProps = React.ComponentProps<"div"> & {
  srOnlyTitle?: string
}

function HelpPanelBody({ srOnlyTitle = "도움", className, children, ...props }: HelpPanelBodyProps) {
  return (
    <div data-slot="krds-help-panel-body" className={cn("flex flex-col gap-8", className)} {...props}>
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
  helpLabel?: string
}

function HelpSection({ title, description, helpLabel = "도움말", className, children, ...props }: HelpSectionProps) {
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
            aria-label={helpLabel}
          >
            <span className="sr-only">{helpLabel}</span>
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

// ─── HelpLinkList / HelpLinkListItem ──────────────────────────────────────────

type HelpLinkListProps = React.ComponentProps<"ul">

function HelpLinkList({ className, children, ...props }: HelpLinkListProps) {
  return (
    <ul data-slot="krds-help-link-list" className={cn("link-list flex flex-col gap-2", className)} {...props}>
      {children}
    </ul>
  )
}

type HelpLinkListItemProps = Omit<React.ComponentProps<"li">, "children"> & {
  href: string
  target?: React.HTMLAttributeAnchorTarget
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  children: React.ReactNode
}

function HelpLinkListItem({
  href,
  target,
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}: HelpLinkListItemProps) {
  const resolvedIcon = icon ?? <ChevronRight className="size-4" aria-hidden="true" />
  return (
    <li data-slot="krds-help-link-list-item" className={className} {...props}>
      <HelpLink
        href={href}
        target={target}
        className={cn(
          // KRDS .link-list 링크는 검정(text-basic) 17px 무밑줄 + 아이콘 (help_panel.html — 파랑/밑줄 아님)
          "text-krds-body-md text-krds-foreground inline-flex items-center gap-1",
          "hover:underline",
          "focus-visible:krds-focus-ring"
        )}
      >
        {iconPosition === "left" && resolvedIcon}
        <span>{children}</span>
        {iconPosition === "right" && resolvedIcon}
      </HelpLink>
    </li>
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

type HelpTutorialTitleProps = Omit<React.ComponentProps<"h4">, "title"> & {
  title: React.ReactNode
  href?: string
}

function HelpTutorialTitle({ title, href, className, ...props }: HelpTutorialTitleProps) {
  return (
    <h4
      data-slot="krds-help-tutorial-title"
      className={cn("help-title text-krds-heading-sm text-krds-foreground font-bold", className)}
      {...props}
    >
      {href ? (
        <HelpLink
          href={href}
          className={cn(
            "hover:text-krds-foreground-primary inline-flex items-center gap-1",
            "focus-visible:krds-focus-ring"
          )}
        >
          <span>{title}</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </HelpLink>
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

type HelpCoachTaskProps = Omit<React.ComponentProps<"li">, "title"> & {
  title: React.ReactNode
  isCurrent?: boolean
  expandText: React.ReactNode
}

function HelpCoachTask({ title, isCurrent = false, expandText, className, children, ...props }: HelpCoachTaskProps) {
  return (
    <li data-slot="krds-help-coach-task" className={cn("flex flex-col gap-2", className)} {...props}>
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
          <ol className="text-krds-body-sm text-krds-foreground list-decimal pl-5">{children}</ol>
        </DisclosureContent>
      </Disclosure>
    </li>
  )
}

type HelpCoachStepProps = React.ComponentProps<"li">

function HelpCoachStep({ className, children, ...props }: HelpCoachStepProps) {
  return (
    <li data-slot="krds-help-coach-step" className={cn("mb-1 last:mb-0", className)} {...props}>
      {children}
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
// 일반 컨테이너 (튜토리얼 제목 + 코치 진행을 감싸는 데 사용)

function HelpContentArea({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-help-content-area" className={cn("conts-area flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  )
}

export {
  HelpPanel,
  HelpPanelTrigger,
  HelpPanelContent,
  HelpPanelClose,
  HelpPanelBody,
  HelpSection,
  HelpLinkList,
  HelpLinkListItem,
  HelpRelatedService,
  HelpServiceGroup,
  HelpTutorialTitle,
  HelpCoachProcess,
  HelpCoachTask,
  HelpCoachStep,
  HelpPanelAction,
  HelpContentArea,
}
export type {
  HelpPanelProps,
  HelpPanelTriggerProps,
  HelpPanelContentProps,
  HelpPanelCloseProps,
  HelpPanelBodyProps,
  HelpSectionProps,
  HelpLinkListProps,
  HelpLinkListItemProps,
  HelpServiceGroupProps,
  HelpTutorialTitleProps,
  HelpCoachTaskProps,
  HelpCoachStepProps,
}
