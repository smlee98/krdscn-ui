// rsc:client
"use client"

/**
 * KRDS TutorialPanel — 우측 슬라이드 드로어(도움 + 따라하기 탭). 통합 `radix-ui`
 * 패키지의 Dialog 프리미티브를 직접 합성한다(Sheet 패턴): 개폐·포커스 트랩·포털·
 * 오버레이·ESC·슬라이드 애니메이션을 Dialog 가 담당한다. 탭 상태는 `@/registry/krds/ui/tab`
 * (radix Tabs)에, 단계 접기는 `@/registry/krds/ui/disclosure`(radix Collapsible)에 위임한다.
 * 손으로 만든 상태머신·외부클릭 핸들러·children 신원 분류는 없다.
 *
 * 원본 셀렉터: `.help-panel-wrap` / `.help-conts-area` / `.krds-tutorial-task-list`
 *   (tutorial_panel.html) — _help_panel.scss shadow(:29,61) / padding-top(:66) / `.btn-help-panel`(:195)
 * Figma: node 360:44771
 *
 * 구조 (KRDS DOM 영역과 1:1):
 *   <TutorialPanel>                                    (Dialog.Root — open/defaultOpen 전파)
 *     <TutorialPanelTrigger>도움말</TutorialPanelTrigger>   (Dialog.Trigger — 포털 밖)
 *     <TutorialPanelContent>                           (Dialog.Portal + Overlay + Content; .help-panel-wrap 그림자 래퍼 내장)
 *       <TutorialPanelClose />                          (접어두기 — 패널에 고정)
 *       <TutorialPanelTabs defaultValue="tutorial">
 *         <TutorialPanelTabPanel value="help">
 *           <TutorialPanelHelpContent>
 *             <TutorialPanelSection title="..." description="...">
 *               <TutorialPanelLinkList links={[...]} />
 *             </TutorialPanelSection>
 *             <TutorialPanelRelatedService>
 *               <TutorialPanelServiceGroup title="관련서비스/민원">
 *                 <TutorialPanelLinkList links={[...]} />
 *               </TutorialPanelServiceGroup>
 *             </TutorialPanelRelatedService>
 *           </TutorialPanelHelpContent>
 *         </TutorialPanelTabPanel>
 *         <TutorialPanelTabPanel value="tutorial">
 *           <TutorialPanelTutorialContent>
 *             <TutorialPanelTitle title="..." href="..." />
 *             <TutorialPanelTaskList>
 *               <TutorialPanelTask title="..." steps={[...]} isCurrent />
 *             </TutorialPanelTaskList>
 *             <TutorialPanelAction>
 *               <Button variant="secondary">그만 따라하기</Button>
 *             </TutorialPanelAction>
 *           </TutorialPanelTutorialContent>
 *         </TutorialPanelTabPanel>
 *       </TutorialPanelTabs>
 *     </TutorialPanelContent>
 *   </TutorialPanel>
 *
 * Trigger 와 Content 는 별도 파트로 소비자가 명시 합성한다 — 루트가 children 을
 * `child.type` 으로 분류하지 않는다(Radix Dialog.Root 컨텍스트가 Trigger↔Content 를
 * 자동 연결). 커스텀 context 는 두지 않는다(탭 상태는 Tab 프리미티브 소관).
 *
 * [help-panel 과의 관계 — 별도 구현] KRDS tutorial_panel.html 과 help_panel.html 은
 * 구조가 유사하나 실제 렌더 클래스가 다르다: 따라하기 목록은 `.krds-tutorial-task-list`
 * (help-panel 은 `.coach-help-process`), Task 제목은 `text-krds-body-lg mb-4`(help-panel 은
 * `text-krds-body-md`), 단계 목록은 `ul.krds-info-list.decimal`(help-panel 은 `ol`),
 * 도움 링크는 밑줄 `text-krds-body-sm krds-info-list`(help-panel 은 무밑줄 `link-list`
 * `text-krds-body-md`), 제목은 뒤로가기 앵커(`<a title="이전으로 돌아가기">` + ChevronLeft;
 * help-panel 은 `<h4>` + 정방향 링크)이고 도움 헤더에 물음표 아이콘 버튼이 없다. 렌더가
 * 달라 lib/ 공유 승격 대신 각 파일이 radix Dialog 를 독립 합성한다(단일 소유 유지).
 */

import * as React from "react"
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Phone } from "lucide-react"

import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/krds/ui/button"
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/registry/krds/ui/disclosure"
import { Tab, TabContent, TabList, TabPanel as KrdsTabPanel, TabTrigger } from "@/registry/krds/ui/tab"

// ─── Types ───────────────────────────────────────────────────────────────────

type TutorialPanelTab = "help" | "tutorial"

type TutorialLinkIcon = "phone" | "faq" | "go" | "angle-right"

type TutorialLink = {
  label: string
  href: string
  external?: boolean
  icon?: TutorialLinkIcon
  iconPosition?: "left" | "right"
}

// ─── TutorialLink (raw <a> 복붙 방지용 파일 내 단일 헬퍼) ──────────────────────────
//
// 도움/관련서비스 링크 앵커를 한 곳으로 모은다(§3 내비 앵커 규칙). icon 유니온을 아이콘
// 노드로 해석하고 iconPosition 으로 좌/우 배치, external 이면 rel 을 자동 보강한다.

function renderLinkIcon(icon: TutorialLinkIcon | undefined) {
  if (!icon) return null
  if (icon === "phone") return <Phone size={16} aria-hidden={true} className="shrink-0" />
  if (icon === "faq") return <MessageCircleQuestion size={16} aria-hidden={true} className="shrink-0" />
  return <ChevronRight size={16} aria-hidden={true} className="shrink-0" />
}

function TutorialLink({ link, className }: { link: TutorialLink; className?: string }) {
  const iconPosition = link.iconPosition ?? "right"
  const icon = renderLinkIcon(link.icon)
  return (
    <a
      data-slot="krds-tutorial-panel-link"
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={cn(
        "text-krds-body-sm text-krds-foreground inline-flex items-center gap-1 underline underline-offset-2",
        "hover:text-krds-foreground-primary",
        "focus-visible:krds-focus-ring rounded-[2px]",
        className
      )}
    >
      {iconPosition === "left" && icon}
      <span>{link.label}</span>
      {iconPosition === "right" &&
        (icon ?? (link.external ? <ChevronRight size={16} aria-hidden={true} className="shrink-0" /> : null))}
    </a>
  )
}

// ─── TutorialPanel (Root) ─────────────────────────────────────────────────────
// Dialog.Root 그대로 — open/defaultOpen/onOpenChange 를 프리미티브에 전파한다.

type TutorialPanelProps = React.ComponentProps<typeof DialogPrimitive.Root>

function TutorialPanel(props: TutorialPanelProps) {
  return <DialogPrimitive.Root {...props} />
}

// ─── TutorialPanelTrigger ─────────────────────────────────────────────────────
// Dialog.Trigger asChild 로 Button 을 감싼다 — open 동작, aria-expanded/controls 는
// Radix Dialog.Trigger 가 자동 배선한다.

type TutorialPanelTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
  label?: string
}

function TutorialPanelTrigger({ className, children, label = "도움말", ...props }: TutorialPanelTriggerProps) {
  return (
    <DialogPrimitive.Trigger asChild>
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        className={className}
        {...props}
        // data-slot 은 {...props} 뒤에 둔다: Button 내부가 data-slot="krds-button" 을 먼저
        // 쓰고 전달받은 props 로 덮으므로, 여기서 명시해야 확정된다.
        data-slot="krds-tutorial-panel-trigger"
      >
        <ChevronLeft size={16} aria-hidden={true} className="shrink-0" />
        <span>{children ?? label}</span>
      </Button>
    </DialogPrimitive.Trigger>
  )
}

// ─── TutorialPanelContent ─────────────────────────────────────────────────────
// 드로어 표면 — Dialog.Portal + Overlay + Content. children 은 콘텐츠 영역에 렌더된다.

type TutorialPanelContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  title?: string
  description?: string
  overlayClassName?: string
}

function TutorialPanelContent({
  title = "도움말 및 따라하기 패널",
  description = "도움말 및 따라하기 정보",
  overlayClassName,
  className,
  children,
  ...props
}: TutorialPanelContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
          overlayClassName
        )}
      />
      <DialogPrimitive.Content
        data-slot="krds-tutorial-panel"
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
        {/*
         * KRDS 원본 `.help-panel-wrap`은 패널을 꽉 채우는 풀블리드 래퍼(position:absolute inset:0)이며
         * 그림자는 왼쪽 경계에서만 드러난다. h-full 로 패널을 채워 원본과 동일하게 만든다.
         * (help-panel.tsx 와 동일 구조 — 별도 Container 로 감싸 안쪽에 떠있는 그림자 박스를 만들지 않는다.)
         */}
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
          <div className="help-conts-area flex h-full flex-col gap-8 overflow-y-auto px-10 pt-20 pb-10">{children}</div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

// ─── TutorialPanelClose ───────────────────────────────────────────────────────
// "접어두기" 버튼 — Dialog.Close 로 패널을 닫는다.

type TutorialPanelCloseProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode
  label?: string
}

function TutorialPanelClose({ className, children, label = "접어두기", ...props }: TutorialPanelCloseProps) {
  return (
    <DialogPrimitive.Close asChild>
      <Button
        type="button"
        variant="tertiary"
        size="sm"
        // 접어두기는 krds-btn small tertiary(보더 버튼, help_panel.html:173) — help-panel 접어두기와 동일 처리.
        className={cn("btn-help-panel fold absolute top-10 right-10", className)}
        {...props}
        data-slot="krds-tutorial-panel-close"
      >
        <span>{children ?? label}</span>
        <ChevronRight size={16} aria-hidden={true} className="shrink-0" />
      </Button>
    </DialogPrimitive.Close>
  )
}

// ─── TutorialPanelTabs ────────────────────────────────────────────────────────
// Tab 프리미티브(radix Tabs)에 탭 상태를 위임한다 — 기본 활성 탭은 따라하기.

type TutorialPanelTabsProps = {
  id?: string
  value?: TutorialPanelTab
  defaultValue?: TutorialPanelTab
  onValueChange?: (value: TutorialPanelTab) => void
  helpLabel?: string
  tutorialLabel?: string
  className?: string
  children?: React.ReactNode
}

function TutorialPanelTabs({
  id,
  value,
  defaultValue = "tutorial",
  onValueChange,
  helpLabel = "도움",
  tutorialLabel = "따라하기",
  className,
  children,
}: TutorialPanelTabsProps) {
  return (
    <Tab
      variant="line"
      type="secondary"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as TutorialPanelTab)}
      className={cn("layer", className)}
    >
      <TabList id={id} className="border-krds-border border-b">
        <TabTrigger value="help">{helpLabel}</TabTrigger>
        <TabTrigger value="tutorial">{tutorialLabel}</TabTrigger>
      </TabList>
      <TabContent>{children}</TabContent>
    </Tab>
  )
}

// ─── TutorialPanelTabPanel ────────────────────────────────────────────────────

type TutorialPanelTabPanelProps = React.ComponentProps<"div"> & {
  value: TutorialPanelTab
  heading?: string
}

function TutorialPanelTabPanel({ value, heading, children, className, ...props }: TutorialPanelTabPanelProps) {
  const srHeading = heading ?? (value === "help" ? "도움" : "따라하기")
  return (
    <KrdsTabPanel value={value} className={cn("flex flex-col gap-6", className)} {...props}>
      <h3 className="sr-only">{srHeading}</h3>
      {children}
    </KrdsTabPanel>
  )
}

// ─── TutorialPanelHelpContent ─────────────────────────────────────────────────
// 도움 탭 콘텐츠 래퍼 (섹션 + 관련서비스를 gap-8 로 묶는다).

function TutorialPanelHelpContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-tutorial-panel-help-content" className={cn("flex flex-col gap-8", className)} {...props}>
      {children}
    </div>
  )
}

// ─── TutorialPanelSection ─────────────────────────────────────────────────────
// 도움 탭의 주 섹션 — 제목(heading-sm) + 설명 + children(링크 목록).

type TutorialPanelSectionProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
}

function TutorialPanelSection({ title, description, className, children, ...props }: TutorialPanelSectionProps) {
  return (
    <section data-slot="krds-tutorial-panel-section" className={cn("flex flex-col gap-3", className)} {...props}>
      <h4 className="text-krds-heading-sm text-krds-foreground font-bold">{title}</h4>
      {description != null ? <div className="text-krds-body-sm text-krds-foreground">{description}</div> : null}
      {children}
    </section>
  )
}

// ─── TutorialPanelLinkList ────────────────────────────────────────────────────
// 링크 leaf 목록 (§50: 동종 leaf 배열은 허용, 구조 반복은 파트로).

type TutorialPanelLinkListProps = React.ComponentProps<"ul"> & {
  links: TutorialLink[]
}

function TutorialPanelLinkList({ links, className, ...props }: TutorialPanelLinkListProps) {
  return (
    <ul
      data-slot="krds-tutorial-panel-link-list"
      className={cn("krds-info-list flex flex-col gap-1", className)}
      {...props}
    >
      {links.map((link, index) => (
        <li key={`${link.href}-${index}`}>
          <TutorialLink link={link} />
        </li>
      ))}
    </ul>
  )
}

// ─── TutorialPanelRelatedService ──────────────────────────────────────────────

function TutorialPanelRelatedService({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-tutorial-panel-related-service"
      className={cn("related-service-area flex flex-col gap-6", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── TutorialPanelServiceGroup ────────────────────────────────────────────────
// 관련서비스 그룹 — 제목(heading-xs) + 설명 + children(링크 목록).

type TutorialPanelServiceGroupProps = Omit<React.ComponentProps<"section">, "title"> & {
  title: React.ReactNode
  description?: React.ReactNode
}

function TutorialPanelServiceGroup({
  title,
  description,
  className,
  children,
  ...props
}: TutorialPanelServiceGroupProps) {
  return (
    <section data-slot="krds-tutorial-panel-service-group" className={cn("flex flex-col gap-3", className)} {...props}>
      <h4 className="text-krds-heading-xs text-krds-foreground font-bold">{title}</h4>
      {description != null ? <div className="text-krds-body-sm text-krds-foreground">{description}</div> : null}
      {children}
    </section>
  )
}

// ─── TutorialPanelTutorialContent ─────────────────────────────────────────────
// 따라하기 탭 콘텐츠 래퍼.

function TutorialPanelTutorialContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-tutorial-panel-tutorial-content" className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </div>
  )
}

// ─── TutorialPanelTitle ───────────────────────────────────────────────────────
// 따라하기 제목 — 뒤로가기 앵커(ChevronLeft). help-panel 정방향 링크와 대비된다.

type TutorialPanelTitleProps = Omit<React.ComponentProps<"a">, "title"> & {
  title: React.ReactNode
  href?: string
  backLabel?: string
}

function TutorialPanelTitle({
  title,
  href = "#",
  backLabel = "이전으로 돌아가기",
  className,
  ...props
}: TutorialPanelTitleProps) {
  return (
    <a
      data-slot="krds-tutorial-panel-title"
      href={href}
      title={backLabel}
      className={cn(
        "text-krds-heading-sm text-krds-foreground hover:text-krds-foreground-primary focus-visible:krds-focus-ring inline-flex items-center gap-1 rounded-[2px] font-bold",
        className
      )}
      {...props}
    >
      <ChevronLeft size={20} aria-hidden={true} className="shrink-0" />
      <span>{title}</span>
    </a>
  )
}

// ─── TutorialPanelTaskList ────────────────────────────────────────────────────

function TutorialPanelTaskList({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="krds-tutorial-panel-task-list"
      className={cn(
        "krds-tutorial-task-list flex flex-col gap-10",
        "[&>li+li]:border-krds-border-light [&>li+li]:border-t [&>li+li]:pt-10",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  )
}

// ─── TutorialPanelTask ────────────────────────────────────────────────────────
// 단일 Task — 제목 + (단계 접기 Disclosure) + 부가 설명. 단계는 동종 leaf 배열.

type TutorialPanelTaskProps = Omit<React.ComponentProps<"li">, "title" | "content"> & {
  title: React.ReactNode
  isCurrent?: boolean
  steps?: string[]
  expandText?: React.ReactNode
  content?: React.ReactNode
}

function TutorialPanelTask({
  title,
  isCurrent = false,
  steps = [],
  expandText,
  content,
  className,
  ...props
}: TutorialPanelTaskProps) {
  const label = expandText ?? `전체 ${steps.length}단계`
  return (
    <li data-slot="krds-tutorial-panel-task" className={cn("flex flex-col gap-2", className)} {...props}>
      <h4
        className={cn(
          "tit text-krds-body-lg mb-4 font-bold",
          isCurrent ? "current text-krds-foreground-primary" : "text-krds-foreground"
        )}
      >
        {title}
      </h4>
      {steps.length > 0 ? (
        <Disclosure defaultOpen={isCurrent} className="conts-expand-area">
          <DisclosureTrigger>{label}</DisclosureTrigger>
          <DisclosureContent>
            <ul className="krds-info-list decimal flex list-decimal flex-col gap-1 pl-5">
              {steps.map((sub, subIdx) => (
                <li key={`${sub}-${subIdx}`} className="text-krds-body-sm text-krds-foreground">
                  {sub}
                </li>
              ))}
            </ul>
          </DisclosureContent>
        </Disclosure>
      ) : null}
      {content != null ? <div className="step-content text-krds-body-sm text-krds-foreground">{content}</div> : null}
    </li>
  )
}

// ─── TutorialPanelAction ──────────────────────────────────────────────────────
// 하단 액션 영역 (예: "그만 따라하기" 버튼을 children 으로 받는다).

function TutorialPanelAction({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-tutorial-panel-action"
      className={cn("help-panel-action border-krds-border-light flex w-full flex-col gap-2 border-t pt-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  TutorialPanel,
  TutorialPanelTrigger,
  TutorialPanelContent,
  TutorialPanelClose,
  TutorialPanelTabs,
  TutorialPanelTabPanel,
  TutorialPanelHelpContent,
  TutorialPanelSection,
  TutorialPanelLinkList,
  TutorialPanelRelatedService,
  TutorialPanelServiceGroup,
  TutorialPanelTutorialContent,
  TutorialPanelTitle,
  TutorialPanelTaskList,
  TutorialPanelTask,
  TutorialPanelAction,
}
export type {
  TutorialPanelTab,
  TutorialLink,
  TutorialLinkIcon,
  TutorialPanelProps,
  TutorialPanelTriggerProps,
  TutorialPanelContentProps,
  TutorialPanelCloseProps,
  TutorialPanelTabsProps,
  TutorialPanelTabPanelProps,
  TutorialPanelSectionProps,
  TutorialPanelLinkListProps,
  TutorialPanelServiceGroupProps,
  TutorialPanelTitleProps,
  TutorialPanelTaskProps,
}
