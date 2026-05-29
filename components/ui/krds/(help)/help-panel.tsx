"use client";

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
 */

import * as React from "react";
import { ChevronRight, ChevronLeft, HelpCircle, MessageCircleQuestion, Phone } from "lucide-react";

import { Button } from "@/components/ui/dynamic/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/krds/(layout)/disclosure";
import { cn } from "@/lib/cn";

// ─── HelpPanel (Root) ─────────────────────────────────────────────────────────

type HelpPanelProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
};

function HelpPanel({ isOpen, defaultOpen = false, onOpenChange, className, children }: HelpPanelProps) {
  // Split children: HelpPanelTrigger mounts as SheetTrigger asChild;
  // everything else renders inside SheetContent.
  const childArray = React.Children.toArray(children);
  const triggers: React.ReactNode[] = [];
  const inner: React.ReactNode[] = [];
  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === HelpPanelTrigger) {
      triggers.push(child);
    } else {
      inner.push(child);
    }
  });

  return (
    <Sheet open={isOpen} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {triggers.length > 0 ? <SheetTrigger asChild>{triggers[0]}</SheetTrigger> : null}
      <SheetContent
        data-slot="krds-help-panel"
        side="right"
        showCloseButton={false}
        className={cn(
          "krds-help-panel",
          "w-[390px] gap-0 p-0 sm:max-w-[390px]",
          "border-l border-[#b1b8be] bg-[#f4f5f6]",
          className
        )}
      >
        <SheetTitle className="sr-only">도움말</SheetTitle>
        <SheetDescription className="sr-only">도움말 패널 콘텐츠</SheetDescription>
        <div className="help-panel-wrap flex h-full flex-col">
          <div className="help-conts-area flex h-full flex-col overflow-y-auto p-10">{inner}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── HelpPanelTrigger ─────────────────────────────────────────────────────────
// Mounted as SheetTrigger asChild by HelpPanel root — open behavior, aria-expanded,
// and aria-controls are wired automatically by Sheet (Radix Dialog.Trigger).

type HelpPanelTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode;
};

function HelpPanelTrigger({ className, children, ...props }: HelpPanelTriggerProps) {
  return (
    <Button
      type="button"
      variant="tertiary"
      size="sm"
      data-slot="krds-help-panel-trigger"
      className={cn("gap-1", className)}
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      <span>{children ?? "도움말"}</span>
    </Button>
  );
}

// ─── HelpPanelClose ───────────────────────────────────────────────────────────
// "접어두기" button — closes the panel via SheetClose.

type HelpPanelCloseProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode;
};

function HelpPanelClose({ className, children, ...props }: HelpPanelCloseProps) {
  return (
    <SheetClose asChild>
      <button
        type="button"
        data-slot="krds-help-panel-close"
        className={cn(
          "btn-help-panel fold",
          "inline-flex items-center gap-1 self-end text-[15px] leading-[1.5] text-[#1e2124]",
          "transition-colors hover:text-[#0b50d0]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#256ef4]",
          className
        )}
        {...props}
      >
        <span>{children ?? "접어두기"}</span>
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </SheetClose>
  );
}

// ─── HelpPanelContent ─────────────────────────────────────────────────────────

type HelpPanelContentProps = React.ComponentProps<"div"> & {
  srOnlyTitle?: string;
};

function HelpPanelContent({ srOnlyTitle = "도움", className, children, ...props }: HelpPanelContentProps) {
  return (
    <div data-slot="krds-help-panel-content" className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="help-conts-area-inner flex flex-col gap-8">
        <h3 className="sr-only">{srOnlyTitle}</h3>
        {children}
      </div>
    </div>
  );
}

// ─── HelpSection ──────────────────────────────────────────────────────────────

type HelpSectionProps = React.ComponentProps<"div"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
};

function HelpSection({ title, description, className, children, ...props }: HelpSectionProps) {
  return (
    <div
      data-slot="krds-help-section"
      className={cn("conts-area help-conts flex flex-col gap-4", className)}
      {...props}
    >
      <div className="conts-wrap flex flex-col gap-3">
        <h4 className="help-title flex items-center justify-between text-[19px] leading-[1.4] font-bold text-[#1e2124]">
          <span>{title}</span>
          <button
            type="button"
            className={cn(
              "krds-btn medium icon",
              "inline-flex size-8 items-center justify-center rounded text-[#33363d]",
              "hover:bg-[#e6e8ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#256ef4]"
            )}
            aria-label="도움말"
          >
            <span className="sr-only">도움말</span>
            <HelpCircle className="size-5" aria-hidden="true" />
          </button>
        </h4>
        {description != null && (
          <div className="conts-desc">
            <p className="text-[17px] leading-[1.5] text-[#33363d]">{description}</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ─── HelpLinkList ─────────────────────────────────────────────────────────────

type HelpLinkItem = {
  text: React.ReactNode;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  icon?: React.ReactNode;
};

type HelpLinkListProps = React.ComponentProps<"ul"> & {
  links: HelpLinkItem[];
  iconPosition?: "left" | "right";
};

function HelpLinkList({ links, iconPosition = "right", className, ...props }: HelpLinkListProps) {
  return (
    <ul data-slot="krds-help-link-list" className={cn("link-list flex flex-col gap-2", className)} {...props}>
      {links.map((link, i) => {
        const icon = link.icon ?? <ChevronRight className="size-4" aria-hidden="true" />;
        return (
          <li key={i}>
            <a
              href={link.href}
              target={link.target}
              rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              className={cn(
                "inline-flex items-center gap-1 text-[15px] leading-[1.5] font-bold text-[#0b50d0]",
                "underline underline-offset-2 hover:text-[#083891]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#256ef4]"
              )}
            >
              {iconPosition === "left" && icon}
              <span>{link.text}</span>
              {iconPosition === "right" && icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// ─── HelpRelatedService ───────────────────────────────────────────────────────

function HelpRelatedService({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-help-related-service"
      className={cn("conts-area related-service flex flex-col gap-6", "border-t border-[#cdd1d5] pt-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── HelpServiceGroup ─────────────────────────────────────────────────────────

type HelpServiceGroupProps = React.ComponentProps<"div"> & {
  title: React.ReactNode;
};

function HelpServiceGroup({ title, className, children, ...props }: HelpServiceGroupProps) {
  return (
    <div data-slot="krds-help-service-group" className={cn("conts-wrap flex flex-col gap-3", className)} {...props}>
      <h4 className="help-title text-[15px] leading-[1.5] font-bold text-[#1e2124]">{title}</h4>
      {children}
    </div>
  );
}

// ─── HelpTutorialTitle ────────────────────────────────────────────────────────

type HelpTutorialTitleProps = {
  title: React.ReactNode;
  href?: string;
  className?: string;
};

function HelpTutorialTitle({ title, href, className }: HelpTutorialTitleProps) {
  return (
    <h4
      data-slot="krds-help-tutorial-title"
      className={cn("help-title text-[19px] leading-[1.4] font-bold text-[#1e2124]", className)}
    >
      {href ? (
        <a
          href={href}
          className={cn(
            "inline-flex items-center gap-1 hover:text-[#0b50d0]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#256ef4]"
          )}
        >
          <span>{title}</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </a>
      ) : (
        title
      )}
    </h4>
  );
}

// ─── HelpCoachProcess ─────────────────────────────────────────────────────────

function HelpCoachProcess({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="krds-help-coach-process"
      className={cn("coach-help-process flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

// ─── HelpCoachTask ────────────────────────────────────────────────────────────

type HelpCoachTaskProps = {
  title: React.ReactNode;
  isCurrent?: boolean;
  expandText: React.ReactNode;
  steps: React.ReactNode[];
  className?: string;
};

function HelpCoachTask({ title, isCurrent = false, expandText, steps, className }: HelpCoachTaskProps) {
  return (
    <li data-slot="krds-help-coach-task" className={cn("flex flex-col gap-2", className)}>
      <h4
        className={cn(
          "tit text-[17px] leading-[1.5] font-bold",
          isCurrent ? "current text-[#0b50d0]" : "text-[#1e2124]"
        )}
      >
        {title}
      </h4>
      <Disclosure className="conts-expand-area">
        <DisclosureTrigger>{expandText}</DisclosureTrigger>
        <DisclosureContent>
          <ol className="list-decimal pl-5 text-[15px] leading-[1.5] text-[#1e2124]">
            {steps.map((step, i) => (
              <li key={i} className="mb-1 last:mb-0">
                {step}
              </li>
            ))}
          </ol>
        </DisclosureContent>
      </Disclosure>
    </li>
  );
}

// ─── HelpPanelAction ──────────────────────────────────────────────────────────

function HelpPanelAction({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-help-panel-action"
      className={cn("help-panel-action mt-4 flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── HelpContentArea ──────────────────────────────────────────────────────────
// Generic container (used to wrap tutorial title + coach process)

function HelpContentArea({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-help-content-area" className={cn("conts-area flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

// ─── Re-exported helper icons (for example consumers) ─────────────────────────

export { Phone as HelpPhoneIcon, MessageCircleQuestion as HelpFaqIcon };

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
  HelpPanelClose
};
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
  HelpCoachTaskProps
};
