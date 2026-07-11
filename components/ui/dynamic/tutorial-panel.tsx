"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Phone } from "lucide-react"

import { TutorialPanel as KrdsTutorialPanel } from "@/components/ui/krds/(help)/tutorial-panel"
import type {
  TutorialLink,
  TutorialLinkIcon,
  TutorialPanelCloseProps,
  TutorialPanelContainerProps,
  TutorialPanelHelpContentProps,
  TutorialPanelRootProps,
  TutorialPanelTab,
  TutorialPanelTabPanelProps,
  TutorialPanelTabsProps,
  TutorialPanelTriggerProps,
  TutorialPanelTutorialContentProps,
} from "@/components/ui/krds/(help)/tutorial-panel"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

export type {
  TutorialPanelTab,
  TutorialLink,
  TutorialLinkIcon,
  TutorialHelpContent,
  TutorialRelatedService,
  TutorialStep,
  TutorialPanelRootProps,
  TutorialPanelTriggerProps,
  TutorialPanelContainerProps,
  TutorialPanelTabsProps,
  TutorialPanelTabPanelProps,
  TutorialPanelHelpContentProps,
  TutorialPanelTutorialContentProps,
  TutorialPanelCloseProps,
} from "@/components/ui/krds/(help)/tutorial-panel"

// Dual-render dispatcher (template: dynamic/modal.tsx). The public surface is the
// KRDS TutorialPanel compound (single Object.assign symbol with dot-notation parts);
// each part renders either the KRDS-chromed wrapper or vanilla shadcn primitives
// (Sheet + Tabs + Collapsible) based on <UISystemProvider>.
//
// shadcn-mode mapping of the KRDS anatomy:
//   Root        → <Sheet> + <SheetContent side="right"> (drawer mechanics identical;
//                 KRDS routes Trigger outside content, we mirror that split)
//   Trigger     → <SheetTrigger asChild><Button> (KRDS ChevronLeft chrome dropped)
//   Container   → plain <div> wrapper (KRDS .krds-help-panel / .expand chrome dropped)
//   Tabs        → <Tabs> + <TabsList>/<TabsTrigger> (KRDS line/secondary variants dropped)
//   TabPanel    → <TabsContent> (KRDS sr-only heading dropped)
//   HelpContent → semantic sections w/ shadcn typography (KRDS #hex color tokens dropped)
//   TutorialContent → step list; per-step expansion → <Collapsible> (KRDS color tokens
//                 dropped, "전체 N단계" disclosure label simplified to step count)
//   Close       → <Button> wired to dispatcher context setOpen(false)
//
// KRDS-only props intentionally dropped on the shadcn path: none structurally — the
// full prop surface is accepted; only KRDS *visual* chrome (hex colors, sr-only
// headings, decorative chevrons, .krds-* class hooks) is not reproduced.

// ─── Dispatcher-internal context: thread Root open/tab state to shadcn parts ────
// (Cannot reuse the KRDS module's TutorialPanelContext — its parts are bound to the
// KRDS Root only. The shadcn parts get their own provider, same shape.)

type ShadcnTutorialPanelContextValue = {
  isOpen: boolean
  setOpen: (open: boolean) => void
  activeTab: TutorialPanelTab
  setActiveTab: (tab: TutorialPanelTab) => void
}

const ShadcnTutorialPanelContext = React.createContext<ShadcnTutorialPanelContextValue | null>(null)

function useShadcnTutorialPanel(): ShadcnTutorialPanelContextValue {
  const ctx = React.useContext(ShadcnTutorialPanelContext)
  if (!ctx) throw new Error("TutorialPanel parts must be rendered inside <TutorialPanel.Root>.")
  return ctx
}

// ─── shadcn-mode helpers ────────────────────────────────────────────────────────

function renderLinkIcon(icon: TutorialLinkIcon | undefined) {
  if (!icon) return null
  if (icon === "phone") return <Phone size={16} aria-hidden={true} className="shrink-0" />
  if (icon === "faq") return <MessageCircleQuestion size={16} aria-hidden={true} className="shrink-0" />
  return <ChevronRight size={16} aria-hidden={true} className="shrink-0" />
}

function ShadcnTutorialLinkAnchor({ link }: { link: TutorialLink }) {
  const iconPosition = link.iconPosition ?? "right"
  const icon = renderLinkIcon(link.icon)
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="text-foreground hover:text-primary inline-flex items-center gap-1 text-sm underline underline-offset-2"
    >
      {iconPosition === "left" && icon}
      <span>{link.label}</span>
      {iconPosition === "right" &&
        (icon ?? (link.external ? <ChevronRight size={16} aria-hidden={true} className="shrink-0" /> : null))}
    </a>
  )
}

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnTutorialPanelRoot({
  isOpen,
  onOpenChange,
  activeTab,
  defaultActiveTab = "help",
  onTabChange,
  className,
  children,
}: TutorialPanelRootProps) {
  const isOpenControlled = isOpen !== undefined
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = isOpenControlled ? isOpen : internalOpen

  const isTabControlled = activeTab !== undefined
  const [internalTab, setInternalTab] = React.useState<TutorialPanelTab>(defaultActiveTab)
  const tab = isTabControlled ? activeTab : internalTab

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isOpenControlled, onOpenChange]
  )

  const setActiveTab = React.useCallback(
    (next: TutorialPanelTab) => {
      if (!isTabControlled) setInternalTab(next)
      onTabChange?.(next)
    },
    [isTabControlled, onTabChange]
  )

  const ctx = React.useMemo<ShadcnTutorialPanelContextValue>(
    () => ({ isOpen: open, setOpen, activeTab: tab, setActiveTab }),
    [open, setOpen, tab, setActiveTab]
  )

  // Mirror KRDS Root: Trigger renders OUTSIDE SheetContent, the rest inside.
  const childArray = React.Children.toArray(children)
  const triggers: React.ReactNode[] = []
  const inner: React.ReactNode[] = []
  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === TutorialPanelTrigger) {
      triggers.push(child)
    } else {
      inner.push(child)
    }
  })

  return (
    <ShadcnTutorialPanelContext.Provider value={ctx}>
      <Sheet open={open} onOpenChange={setOpen}>
        {triggers.length > 0 ? <SheetTrigger asChild>{triggers[0]}</SheetTrigger> : null}
        <SheetContent
          side="right"
          showCloseButton={true}
          className={cn("w-[390px] gap-8 overflow-y-auto p-8 sm:max-w-none", className)}
        >
          <SheetTitle className="sr-only">Help and tutorial panel</SheetTitle>
          <SheetDescription className="sr-only">Help and tutorial information</SheetDescription>
          {inner}
        </SheetContent>
      </Sheet>
    </ShadcnTutorialPanelContext.Provider>
  )
}

function ShadcnTutorialPanelTrigger({ children = "Help", className, onClick, ...props }: TutorialPanelTriggerProps) {
  const ctx = React.useContext(ShadcnTutorialPanelContext)
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) ctx?.setOpen(!ctx.isOpen)
      }}
      className={className}
      {...props}
    >
      <span>{children}</span>
    </Button>
  )
}

function ShadcnTutorialPanelContainer({ children, className, ...props }: TutorialPanelContainerProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      {children}
    </div>
  )
}

function ShadcnTutorialPanelTabs({ children, className, id }: TutorialPanelTabsProps) {
  const ctx = useShadcnTutorialPanel()
  return (
    <Tabs
      value={ctx.activeTab}
      onValueChange={(value) => ctx.setActiveTab(value as TutorialPanelTab)}
      className={className}
    >
      <TabsList id={id} className="w-full">
        <TabsTrigger value="help">도움</TabsTrigger>
        <TabsTrigger value="tutorial">따라하기</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

function ShadcnTutorialPanelTabPanel({ value, children, className, ...props }: TutorialPanelTabPanelProps) {
  return (
    <TabsContent value={value} className={cn("flex flex-col gap-6", className)} {...props}>
      {children}
    </TabsContent>
  )
}

function ShadcnTutorialPanelHelpContent({
  helpContent,
  relatedServices = [],
  className,
  ...props
}: TutorialPanelHelpContentProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <section className="flex flex-col gap-3">
        <h4 className="text-foreground text-lg font-bold">{helpContent.title}</h4>
        <div className="text-foreground text-sm leading-relaxed">{helpContent.description}</div>
        {helpContent.links.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {helpContent.links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <ShadcnTutorialLinkAnchor link={link} />
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      {relatedServices.length > 0 ? (
        <div className="flex flex-col gap-6">
          {relatedServices.map((service, idx) => (
            <section key={`${service.title}-${idx}`} className="flex flex-col gap-3">
              <h4 className="text-foreground text-base font-bold">{service.title}</h4>
              {service.description ? (
                <div className="text-foreground text-sm leading-relaxed">{service.description}</div>
              ) : null}
              {service.links.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {service.links.map((link, linkIdx) => (
                    <li key={`${link.href}-${linkIdx}`}>
                      <ShadcnTutorialLinkAnchor link={link} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ShadcnTutorialPanelTutorialContent({
  title,
  steps = [],
  onTutorialStop,
  stopButtonText = "그만 따라하기",
  className,
  ...props
}: TutorialPanelTutorialContentProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h3 className="text-foreground inline-flex items-center gap-1 text-lg font-bold">
        <ChevronLeft size={20} aria-hidden={true} className="shrink-0" />
        <span>{title}</span>
      </h3>
      <ul className="flex flex-col gap-3">
        {steps.map((step, index) => {
          const stepCount = step.steps?.length ?? 0
          const buttonText = `전체 ${stepCount}단계`
          return (
            <li key={`${step.title}-${index}`} className="flex flex-col gap-2">
              <h4 className={cn("text-base font-bold", step.current ? "text-primary" : "text-foreground")}>
                {step.title}
              </h4>
              {stepCount > 0 ? (
                <Collapsible defaultOpen={step.current}>
                  <CollapsibleTrigger className="text-muted-foreground text-sm underline underline-offset-2">
                    {buttonText}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul className="flex list-decimal flex-col gap-1 pl-5">
                      {step.steps?.map((sub, subIdx) => (
                        <li key={`${sub}-${subIdx}`} className="text-foreground text-sm leading-relaxed">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              ) : null}
              {step.content ? <div className="text-foreground text-sm leading-relaxed">{step.content}</div> : null}
            </li>
          )
        })}
      </ul>
      <Button type="button" variant="secondary" className="w-full" onClick={onTutorialStop}>
        {stopButtonText}
      </Button>
    </div>
  )
}

function ShadcnTutorialPanelClose({ children = "접어두기", className, onClick, ...props }: TutorialPanelCloseProps) {
  const ctx = useShadcnTutorialPanel()
  return (
    <Button
      type="button"
      variant="ghost"
      size="lg"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) ctx.setOpen(false)
      }}
      className={cn("self-end", className)}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight size={16} aria-hidden={true} className="shrink-0" />
    </Button>
  )
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────
// Because the compound is a single Object.assign symbol, dispatch happens per part.
// The shadcn Root child-split keys off the *dispatcher* TutorialPanelTrigger symbol
// below; the KRDS path delegates wholesale to KrdsTutorialPanel.* (which does its
// own split against the KRDS Trigger symbol), so the two systems never cross-bind.

function TutorialPanelRoot(props: TutorialPanelRootProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.Root {...props} />
  return <ShadcnTutorialPanelRoot {...props} />
}

function TutorialPanelTrigger(props: TutorialPanelTriggerProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.Trigger {...props} />
  return <ShadcnTutorialPanelTrigger {...props} />
}
// 트리거 식별 마커: dispatcher 경유 시 KRDS Root(및 shadcn Root)에 이 함수가 child.type 으로
// 넘어가므로, displayName 으로 트리거를 분류해 포털 밖(가시 영역)에 렌더되게 한다.
TutorialPanelTrigger.displayName = "TutorialPanelTrigger"

function TutorialPanelContainer(props: TutorialPanelContainerProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.Container {...props} />
  return <ShadcnTutorialPanelContainer {...props} />
}

function TutorialPanelTabs(props: TutorialPanelTabsProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.Tabs {...props} />
  return <ShadcnTutorialPanelTabs {...props} />
}

function TutorialPanelTabPanel(props: TutorialPanelTabPanelProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.TabPanel {...props} />
  return <ShadcnTutorialPanelTabPanel {...props} />
}

function TutorialPanelHelpContent(props: TutorialPanelHelpContentProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.HelpContent {...props} />
  return <ShadcnTutorialPanelHelpContent {...props} />
}

function TutorialPanelTutorialContent(props: TutorialPanelTutorialContentProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.TutorialContent {...props} />
  return <ShadcnTutorialPanelTutorialContent {...props} />
}

function TutorialPanelClose(props: TutorialPanelCloseProps) {
  const system = useUISystem()
  if (system === "krds") return <KrdsTutorialPanel.Close {...props} />
  return <ShadcnTutorialPanelClose {...props} />
}

// ─── Compound export (shape preserved: single Object.assign symbol) ─────────────

const TutorialPanel = Object.assign(TutorialPanelRoot, {
  Root: TutorialPanelRoot,
  Trigger: TutorialPanelTrigger,
  Container: TutorialPanelContainer,
  Tabs: TutorialPanelTabs,
  TabPanel: TutorialPanelTabPanel,
  HelpContent: TutorialPanelHelpContent,
  TutorialContent: TutorialPanelTutorialContent,
  Close: TutorialPanelClose,
})

export { TutorialPanel }
