"use client";

import * as React from "react";
import { ChevronRight, MessageCircleQuestion, Phone } from "lucide-react";

import {
  HelpPanelTrigger as KrdsHelpPanelTrigger,
  HelpPanelClose as KrdsHelpPanelClose,
  HelpPanelContent as KrdsHelpPanelContent,
  HelpSection as KrdsHelpSection,
  HelpLinkList as KrdsHelpLinkList,
  HelpRelatedService as KrdsHelpRelatedService,
  HelpServiceGroup as KrdsHelpServiceGroup,
  HelpTutorialTitle as KrdsHelpTutorialTitle,
  HelpCoachProcess as KrdsHelpCoachProcess,
  HelpCoachTask as KrdsHelpCoachTask,
  HelpPanelAction as KrdsHelpPanelAction,
  HelpContentArea as KrdsHelpContentArea
} from "@/components/ui/krds/(help)/help-panel";
import type {
  HelpPanelProps,
  HelpPanelTriggerProps,
  HelpPanelCloseProps,
  HelpPanelContentProps,
  HelpSectionProps,
  HelpLinkListProps,
  HelpServiceGroupProps,
  HelpTutorialTitleProps,
  HelpCoachTaskProps
} from "@/components/ui/krds/(help)/help-panel";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/dynamic/disclosure";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

// Re-export helper icons (consumers import these by value from this module).
export { Phone as HelpPhoneIcon, MessageCircleQuestion as HelpFaqIcon };

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
} from "@/components/ui/krds/(help)/help-panel";

// Dual-render dispatcher (template: dynamic/tutorial-panel.tsx, the Sheet-based
// sister component). The public surface is the KRDS HelpPanel named-export API;
// each part renders either the KRDS-chromed wrapper or vanilla shadcn primitives
// (Sheet) based on <UISystemProvider>.
//
// Why the Root cannot delegate wholesale to KRDS HelpPanel:
// KRDS HelpPanel splits children via `child.type === <KRDS>HelpPanelTrigger`.
// Consumers pass *this module's* dispatcher HelpPanelTrigger as the child, so a
// wholesale delegate would fail KRDS's identity check and route the trigger inside
// the off-screen drawer (invisible trigger). Instead the dispatcher Root owns the
// Sheet in BOTH branches, splits children against the *dispatcher* symbols, and
// only swaps SheetContent chrome (krds vs shadcn). The two systems never cross-bind.
//
// shadcn-mode mapping of the KRDS anatomy:
//   HelpPanel        → <Sheet> + <SheetContent side="right"> (drawer mechanics
//                      identical; trigger split out as SheetTrigger, mirroring KRDS)
//   HelpPanelTrigger → <Button variant="outline"> (KRDS ChevronLeft chrome dropped)
//   HelpPanelClose   → <SheetClose><Button> with trailing ChevronRight
//   HelpPanelContent → <div> + sr-only <h3> (KRDS .help-conts-area-inner chrome dropped)
//   HelpSection      → <section> w/ shadcn typography (KRDS #hex tokens + decorative
//                      HelpCircle icon button dropped)
//   HelpLinkList     → <ul>/<a> shadcn tokens (KRDS #0b50d0 link color dropped)
//   HelpRelatedService → <div> with top border (KRDS #cdd1d5 hex border → shadcn token)
//   HelpServiceGroup → <section> heading + children (KRDS hex tokens dropped)
//   HelpTutorialTitle→ <h4>/<a> (KRDS hex tokens dropped)
//   HelpCoachProcess → <ul> (KRDS .coach-help-process class dropped)
//   HelpCoachTask    → <li> + <Disclosure> step list (KRDS current/#0b50d0 → shadcn
//                      text-primary; hex tokens dropped)
//   HelpPanelAction  → <div> footer column (KRDS .help-panel-action class dropped)
//   HelpContentArea  → <div> wrapper (KRDS .conts-area class dropped)
//
// KRDS-only chrome dropped on the shadcn path: #hex color tokens, .krds-*/.help-*
// class hooks, the decorative HelpCircle icon button in HelpSection, and the KRDS
// panel background/border. Behavior + accessibility (sr-only headings, link rel,
// disclosure expand/collapse, focus trap via Sheet) are preserved.

// ─── Root (unified Sheet owner for BOTH branches) ───────────────────────────────
// The Root cannot delegate to KRDS HelpPanel because KRDS splits children against
// its own HelpPanelTrigger symbol, which the consumer never passes (they pass *this*
// module's dispatcher HelpPanelTrigger). So the dispatcher Root owns the Sheet +
// child-split itself, keying off the dispatcher HelpPanelTrigger symbol, and swaps
// only the SheetContent chrome by system. Both leaf trees still dispatch per-part.

function HelpPanelRoot({ isOpen, defaultOpen = false, onOpenChange, className, children }: HelpPanelProps) {
  const system = useUISystem();
  const isKrds = system === "krds";

  // Mirror KRDS Root: HelpPanelTrigger renders OUTSIDE SheetContent (as SheetTrigger),
  // everything else inside. Split against this module's dispatcher symbol.
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
      {isKrds ? (
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
      ) : (
        <SheetContent
          side="right"
          showCloseButton={false}
          className={cn("w-[390px] gap-0 overflow-y-auto p-8 sm:max-w-none", className)}
        >
          <SheetTitle className="sr-only">도움말</SheetTitle>
          <SheetDescription className="sr-only">도움말 패널 콘텐츠</SheetDescription>
          <div className="flex h-full flex-col gap-8">{inner}</div>
        </SheetContent>
      )}
    </Sheet>
  );
}

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnHelpPanelTrigger({ className, children, ...props }: HelpPanelTriggerProps) {
  return (
    <Button type="button" variant="outline" size="sm" className={className} {...props}>
      <span>{children ?? "도움말"}</span>
    </Button>
  );
}

function ShadcnHelpPanelClose({ className, children, ...props }: HelpPanelCloseProps) {
  return (
    <SheetClose asChild>
      <button
        type="button"
        className={cn(
          "text-foreground hover:text-primary inline-flex items-center gap-1 self-end text-sm",
          "focus-visible:ring-ring focus-visible:rounded-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
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

function ShadcnHelpPanelContent({ srOnlyTitle = "도움", className, children, ...props }: HelpPanelContentProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <h3 className="sr-only">{srOnlyTitle}</h3>
      {children}
    </div>
  );
}

function ShadcnHelpSection({ title, description, className, children, ...props }: HelpSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)} {...props}>
      <h4 className="text-foreground text-lg font-bold">{title}</h4>
      {description != null ? <p className="text-foreground text-sm leading-relaxed">{description}</p> : null}
      {children}
    </section>
  );
}

function ShadcnHelpLinkList({ links, iconPosition = "right", className, ...props }: HelpLinkListProps) {
  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {links.map((link, i) => {
        const icon = link.icon ?? <ChevronRight className="size-4" aria-hidden="true" />;
        return (
          <li key={i}>
            <a
              href={link.href}
              target={link.target}
              rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
              className="text-foreground hover:text-primary inline-flex items-center gap-1 text-sm underline underline-offset-2"
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

function ShadcnHelpRelatedService({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("border-border flex flex-col gap-6 border-t pt-8", className)} {...props}>
      {children}
    </div>
  );
}

function ShadcnHelpServiceGroup({ title, className, children, ...props }: HelpServiceGroupProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)} {...props}>
      <h4 className="text-foreground text-sm font-bold">{title}</h4>
      {children}
    </section>
  );
}

function ShadcnHelpTutorialTitle({ title, href, className }: HelpTutorialTitleProps) {
  return (
    <h4 className={cn("text-foreground text-lg font-bold", className)}>
      {href ? (
        <a href={href} className="hover:text-primary inline-flex items-center gap-1">
          <span>{title}</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </a>
      ) : (
        title
      )}
    </h4>
  );
}

function ShadcnHelpCoachProcess({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </ul>
  );
}

function ShadcnHelpCoachTask({ title, isCurrent = false, expandText, steps, className }: HelpCoachTaskProps) {
  return (
    <li className={cn("flex flex-col gap-2", className)}>
      <h4 className={cn("text-base font-bold", isCurrent ? "text-primary" : "text-foreground")}>{title}</h4>
      <Disclosure>
        <DisclosureTrigger>{expandText}</DisclosureTrigger>
        <DisclosureContent>
          <ol className="text-foreground list-decimal pl-5 text-sm leading-relaxed">
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

function ShadcnHelpPanelAction({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

function ShadcnHelpContentArea({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {children}
    </div>
  );
}

// ─── Dispatched parts (public surface preserved: named exports) ─────────────────

export function HelpPanel(props: HelpPanelProps) {
  return <HelpPanelRoot {...props} />;
}

export function HelpPanelTrigger(props: HelpPanelTriggerProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpPanelTrigger {...props} />;
  return <ShadcnHelpPanelTrigger {...props} />;
}

export function HelpPanelClose(props: HelpPanelCloseProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpPanelClose {...props} />;
  return <ShadcnHelpPanelClose {...props} />;
}

export function HelpPanelContent(props: HelpPanelContentProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpPanelContent {...props} />;
  return <ShadcnHelpPanelContent {...props} />;
}

export function HelpSection(props: HelpSectionProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpSection {...props} />;
  return <ShadcnHelpSection {...props} />;
}

export function HelpLinkList(props: HelpLinkListProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpLinkList {...props} />;
  return <ShadcnHelpLinkList {...props} />;
}

export function HelpRelatedService(props: React.ComponentProps<"div">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpRelatedService {...props} />;
  return <ShadcnHelpRelatedService {...props} />;
}

export function HelpServiceGroup(props: HelpServiceGroupProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpServiceGroup {...props} />;
  return <ShadcnHelpServiceGroup {...props} />;
}

export function HelpTutorialTitle(props: HelpTutorialTitleProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpTutorialTitle {...props} />;
  return <ShadcnHelpTutorialTitle {...props} />;
}

export function HelpCoachProcess(props: React.ComponentProps<"ul">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpCoachProcess {...props} />;
  return <ShadcnHelpCoachProcess {...props} />;
}

export function HelpCoachTask(props: HelpCoachTaskProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpCoachTask {...props} />;
  return <ShadcnHelpCoachTask {...props} />;
}

export function HelpPanelAction(props: React.ComponentProps<"div">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpPanelAction {...props} />;
  return <ShadcnHelpPanelAction {...props} />;
}

export function HelpContentArea(props: React.ComponentProps<"div">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsHelpContentArea {...props} />;
  return <ShadcnHelpContentArea {...props} />;
}
