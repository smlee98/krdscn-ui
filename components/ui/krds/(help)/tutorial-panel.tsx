// rsc:client
"use client";

/**
 * KRDS TutorialPanel — slide-in help+tutorial drawer from the right.
 * Base: @/components/ui/sheet (shadcn Sheet → Radix Dialog).
 *
 * Dot-notation API (mirrors KRDS storybook contract):
 *   <TutorialPanel.Root defaultActiveTab="tutorial">
 *     <TutorialPanel.Trigger>도움말</TutorialPanel.Trigger>
 *     <TutorialPanel.Container>
 *       <TutorialPanel.Tabs>
 *         <TutorialPanel.TabPanel value="help">
 *           <TutorialPanel.HelpContent helpContent={...} relatedServices={...} />
 *         </TutorialPanel.TabPanel>
 *         <TutorialPanel.TabPanel value="tutorial">
 *           <TutorialPanel.TutorialContent title="..." steps={...} />
 *         </TutorialPanel.TabPanel>
 *       </TutorialPanel.Tabs>
 *       <TutorialPanel.Close />
 *     </TutorialPanel.Container>
 *   </TutorialPanel.Root>
 *
 * Figma source: KRDS_v1.0.0 — node 360:44771.
 */

import * as React from "react";
import { ChevronLeft, ChevronRight, MessageCircleQuestion, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/dynamic/button";
import { Tab, TabContent, TabList, TabPanel as KrdsTabPanel, TabTrigger } from "@/components/ui/dynamic/tab";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/dynamic/disclosure";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

type TutorialPanelTab = "help" | "tutorial";

type TutorialLinkIcon = "phone" | "faq" | "go" | "angle-right";

type TutorialLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: TutorialLinkIcon;
  iconPosition?: "left" | "right";
};

type TutorialHelpContent = {
  title: string;
  description: React.ReactNode;
  links: TutorialLink[];
};

type TutorialRelatedService = {
  title: string;
  description?: React.ReactNode;
  links: TutorialLink[];
};

type TutorialStep = {
  title: string;
  current?: boolean;
  steps?: string[];
  content?: React.ReactNode;
};

type TutorialPanelContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  activeTab: TutorialPanelTab;
  setActiveTab: (tab: TutorialPanelTab) => void;
};

type TutorialPanelRootProps = {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeTab?: TutorialPanelTab;
  defaultActiveTab?: TutorialPanelTab;
  onTabChange?: (tab: TutorialPanelTab) => void;
  className?: string;
  children?: React.ReactNode;
};

type TutorialPanelTriggerProps = React.ComponentProps<"button">;

type TutorialPanelContainerProps = React.ComponentProps<"div">;

type TutorialPanelTabsProps = {
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

type TutorialPanelTabPanelProps = React.ComponentProps<"div"> & {
  value: TutorialPanelTab;
};

type TutorialPanelHelpContentProps = Omit<React.ComponentProps<"div">, "content"> & {
  helpContent: TutorialHelpContent;
  relatedServices?: TutorialRelatedService[];
};

type TutorialPanelTutorialContentProps = React.ComponentProps<"div"> & {
  title: string;
  steps?: TutorialStep[];
  onTutorialStop?: () => void;
  stopButtonText?: string;
};

type TutorialPanelCloseProps = React.ComponentProps<"button">;

// ─── Context ─────────────────────────────────────────────────────────────────

const TutorialPanelContext = React.createContext<TutorialPanelContextValue | null>(null);

function useTutorialPanel(): TutorialPanelContextValue {
  const ctx = React.useContext(TutorialPanelContext);
  if (!ctx) throw new Error("TutorialPanel parts must be rendered inside <TutorialPanel.Root>.");
  return ctx;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderLinkIcon(icon: TutorialLinkIcon | undefined) {
  if (!icon) return null;
  if (icon === "phone") return <Phone size={16} aria-hidden={true} className="shrink-0" />;
  if (icon === "faq") return <MessageCircleQuestion size={16} aria-hidden={true} className="shrink-0" />;
  return <ChevronRight size={16} aria-hidden={true} className="shrink-0" />;
}

function TutorialLinkAnchor({ link, className }: { link: TutorialLink; className?: string }) {
  const iconPosition = link.iconPosition ?? "right";
  const icon = renderLinkIcon(link.icon);
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1 text-[15px] leading-[1.5] text-[#1e2124] underline underline-offset-2",
        "hover:text-[#0b50d0]",
        className
      )}
    >
      {iconPosition === "left" && icon}
      <span>{link.label}</span>
      {iconPosition === "right" &&
        (icon ?? (link.external ? <ChevronRight size={16} aria-hidden={true} className="shrink-0" /> : null))}
    </a>
  );
}

// ─── TutorialPanel.Root ──────────────────────────────────────────────────────

function TutorialPanelRoot({
  isOpen,
  onOpenChange,
  activeTab,
  defaultActiveTab = "help",
  onTabChange,
  className,
  children
}: TutorialPanelRootProps) {
  const isOpenControlled = isOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = isOpenControlled ? isOpen : internalOpen;

  const isTabControlled = activeTab !== undefined;
  const [internalTab, setInternalTab] = React.useState<TutorialPanelTab>(defaultActiveTab);
  const tab = isTabControlled ? activeTab : internalTab;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange]
  );

  const setActiveTab = React.useCallback(
    (next: TutorialPanelTab) => {
      if (!isTabControlled) setInternalTab(next);
      onTabChange?.(next);
    },
    [isTabControlled, onTabChange]
  );

  const ctx = React.useMemo<TutorialPanelContextValue>(
    () => ({ isOpen: open, setOpen, activeTab: tab, setActiveTab }),
    [open, setOpen, tab, setActiveTab]
  );

  // Split children: TutorialPanel.Trigger renders OUTSIDE the SheetContent
  // (alongside the trigger button area), the rest render INSIDE.
  const childArray = React.Children.toArray(children);
  const triggers: React.ReactNode[] = [];
  const inner: React.ReactNode[] = [];
  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === TutorialPanelTrigger) {
      triggers.push(child);
    } else {
      inner.push(child);
    }
  });

  return (
    <TutorialPanelContext.Provider value={ctx}>
      <Sheet open={open} onOpenChange={setOpen}>
        {triggers.length > 0 ? <SheetTrigger asChild>{triggers[0]}</SheetTrigger> : null}
        <SheetContent
          data-slot="krds-tutorial-panel"
          side="right"
          showCloseButton={false}
          className={cn(
            "flex w-[390px] flex-col gap-8 overflow-y-auto p-10",
            "border-l border-[#b1b8be] bg-[#f4f5f6]",
            className
          )}
        >
          <SheetTitle className="sr-only">도움말 및 따라하기 패널</SheetTitle>
          <SheetDescription className="sr-only">도움말 및 따라하기 정보</SheetDescription>
          {inner}
        </SheetContent>
      </Sheet>
    </TutorialPanelContext.Provider>
  );
}

// ─── TutorialPanel.Trigger ───────────────────────────────────────────────────

function TutorialPanelTrigger({ children = "도움말", className, onClick, ...props }: TutorialPanelTriggerProps) {
  const ctx = React.useContext(TutorialPanelContext);
  return (
    <Button
      type="button"
      variant="tertiary"
      size="sm"
      data-slot="krds-tutorial-panel-trigger"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx?.setOpen(!ctx.isOpen);
      }}
      className={className}
      {...props}
    >
      <ChevronLeft size={16} aria-hidden={true} className="shrink-0" />
      <span>{children}</span>
    </Button>
  );
}

// ─── TutorialPanel.Container ─────────────────────────────────────────────────

function TutorialPanelContainer({ children, className, ...props }: TutorialPanelContainerProps) {
  const ctx = useTutorialPanel();
  return (
    <div
      data-slot="krds-tutorial-panel-container"
      data-expand={ctx.isOpen ? "true" : undefined}
      className={cn("krds-help-panel flex flex-col gap-8", ctx.isOpen && "expand", className)}
      {...props}
    >
      <div className="help-panel-wrap flex flex-col gap-8">
        <div className="help-conts-area flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
}

// ─── TutorialPanel.Tabs ──────────────────────────────────────────────────────

function TutorialPanelTabs({ children, className, id }: TutorialPanelTabsProps) {
  const ctx = useTutorialPanel();
  return (
    <Tab
      variant="line"
      type="secondary"
      value={ctx.activeTab}
      onValueChange={(value) => ctx.setActiveTab(value as TutorialPanelTab)}
      className={cn("layer", className)}
    >
      <TabList id={id} className="border-b border-[#b1b8be]">
        <TabTrigger value="help">도움</TabTrigger>
        <TabTrigger value="tutorial">따라하기</TabTrigger>
      </TabList>
      <TabContent>{children}</TabContent>
    </Tab>
  );
}

// ─── TutorialPanel.TabPanel ──────────────────────────────────────────────────

function TutorialPanelTabPanel({ value, children, className, ...props }: TutorialPanelTabPanelProps) {
  const heading = value === "help" ? "도움" : "따라하기";
  return (
    <KrdsTabPanel value={value} className={cn("flex flex-col gap-6", className)} {...props}>
      <h3 className="sr-only">{heading}</h3>
      {children}
    </KrdsTabPanel>
  );
}

// ─── TutorialPanel.HelpContent ───────────────────────────────────────────────

function TutorialPanelHelpContent({
  helpContent,
  relatedServices = [],
  className,
  ...props
}: TutorialPanelHelpContentProps) {
  return (
    <div data-slot="krds-tutorial-panel-help-content" className={cn("flex flex-col gap-8", className)} {...props}>
      <section className="flex flex-col gap-3">
        <h4 className="text-[19px] leading-[1.4] font-bold text-[#1e2124]">{helpContent.title}</h4>
        <div className="text-[15px] leading-[1.6] text-[#1e2124]">{helpContent.description}</div>
        {helpContent.links.length > 0 ? (
          <ul className="krds-info-list flex flex-col gap-1">
            {helpContent.links.map((link, index) => (
              <li key={`${link.href}-${index}`}>
                <TutorialLinkAnchor link={link} />
              </li>
            ))}
          </ul>
        ) : null}
      </section>
      {relatedServices.length > 0 ? (
        <div className="related-service-area flex flex-col gap-6">
          {relatedServices.map((service, idx) => (
            <section key={`${service.title}-${idx}`} className="flex flex-col gap-3">
              <h4 className="text-[17px] leading-[1.4] font-bold text-[#1e2124]">{service.title}</h4>
              {service.description ? (
                <div className="text-[15px] leading-[1.6] text-[#1e2124]">{service.description}</div>
              ) : null}
              {service.links.length > 0 ? (
                <ul className="krds-info-list flex flex-col gap-1">
                  {service.links.map((link, linkIdx) => (
                    <li key={`${link.href}-${linkIdx}`}>
                      <TutorialLinkAnchor link={link} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ─── TutorialPanel.TutorialContent ───────────────────────────────────────────

function TutorialPanelTutorialContent({
  title,
  steps = [],
  onTutorialStop,
  stopButtonText = "그만 따라하기",
  className,
  ...props
}: TutorialPanelTutorialContentProps) {
  return (
    <div data-slot="krds-tutorial-panel-tutorial-content" className={cn("flex flex-col gap-6", className)} {...props}>
      <a
        href="#"
        title="이전으로 돌아가기"
        className="inline-flex items-center gap-1 text-[19px] leading-[1.4] font-bold text-[#1e2124] hover:text-[#0b50d0]"
      >
        <ChevronLeft size={20} aria-hidden={true} className="shrink-0" />
        <span>{title}</span>
      </a>
      <ul className="krds-tutorial-task-list flex flex-col gap-3">
        {steps.map((step, index) => {
          const stepCount = step.steps?.length ?? 0;
          const buttonText = `전체 ${stepCount}단계`;
          return (
            <li key={`${step.title}-${index}`} className="flex flex-col gap-2">
              <h4
                className={cn(
                  "tit text-[17px] leading-[1.5] font-bold",
                  step.current ? "current text-[#0b50d0]" : "text-[#1e2124]"
                )}
              >
                {step.title}
              </h4>
              {stepCount > 0 ? (
                <Disclosure defaultOpen={step.current} className="conts-expand-area">
                  <DisclosureTrigger>{buttonText}</DisclosureTrigger>
                  <DisclosureContent>
                    <ul className="krds-info-list decimal flex list-decimal flex-col gap-1 pl-5">
                      {step.steps?.map((sub, subIdx) => (
                        <li key={`${sub}-${subIdx}`} className="text-[15px] leading-[1.6] text-[#1e2124]">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </DisclosureContent>
                </Disclosure>
              ) : null}
              {step.content ? (
                <div className="step-content text-[15px] leading-[1.6] text-[#1e2124]">{step.content}</div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <Button
        type="button"
        variant="secondary"
        size="default"
        className="coach-btn-stop w-full"
        onClick={onTutorialStop}
      >
        {stopButtonText}
      </Button>
    </div>
  );
}

// ─── TutorialPanel.Close ─────────────────────────────────────────────────────

function TutorialPanelClose({ children = "접어두기", className, onClick, ...props }: TutorialPanelCloseProps) {
  const ctx = useTutorialPanel();
  return (
    <Button
      type="button"
      variant="text"
      size="lg"
      data-slot="krds-tutorial-panel-close"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.setOpen(false);
      }}
      className={cn("btn-help-panel fold self-end hover:text-[#0b50d0]", className)}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight size={16} aria-hidden={true} className="shrink-0" />
    </Button>
  );
}

// ─── Compound export ─────────────────────────────────────────────────────────

const TutorialPanel = Object.assign(TutorialPanelRoot, {
  Root: TutorialPanelRoot,
  Trigger: TutorialPanelTrigger,
  Container: TutorialPanelContainer,
  Tabs: TutorialPanelTabs,
  TabPanel: TutorialPanelTabPanel,
  HelpContent: TutorialPanelHelpContent,
  TutorialContent: TutorialPanelTutorialContent,
  Close: TutorialPanelClose
});

export { TutorialPanel };
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
  TutorialPanelCloseProps
};
