"use client";

/**
 * KRDS HelpPanel — inline-expanding right drawer matching KRDS Storybook API.
 *
 * Reference: https://www.krds.go.kr/storybook/react/?path=/docs/components-helppanel--docs
 * Figma: node 360-44743
 *
 * Structure:
 *   <HelpPanel defaultOpen={false}>
 *     <HelpPanelTrigger>도움말</HelpPanelTrigger>   (rendered OUTSIDE the panel)
 *     <HelpPanelContent srOnlyTitle="도움">         (rendered INSIDE the panel)
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
 * Trigger is auto-extracted from children (via type comparison) and rendered
 * outside the panel container; everything else renders inside.
 */

import * as React from "react";
import { ChevronLeft, ChevronRight, HelpCircle, MessageCircleQuestion, Phone } from "lucide-react";

import { Button } from "@/components/ui/krds/(action)/button";
import { Disclosure, DisclosureContent, DisclosureTrigger } from "@/components/ui/krds/(layout)/disclosure";
import { cn } from "@/lib/cn";

// ─── Context ──────────────────────────────────────────────────────────────────

type HelpPanelContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  panelId: string;
};

const HelpPanelContext = React.createContext<HelpPanelContextValue | null>(null);

function useHelpPanel() {
  const ctx = React.useContext(HelpPanelContext);
  if (!ctx) throw new Error("HelpPanel sub-components must be used within <HelpPanel>");
  return ctx;
}

// ─── HelpPanel (Root) ─────────────────────────────────────────────────────────

type HelpPanelProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
};

function HelpPanel({ isOpen: controlledOpen, defaultOpen = false, onOpenChange, className, children }: HelpPanelProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;
  const panelId = React.useId();

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen]);

  // Split children: triggers render outside the panel, rest renders inside.
  const childArray = React.Children.toArray(children);
  const triggers = childArray.filter(
    (child) => React.isValidElement(child) && child.type === HelpPanelTrigger
  );
  const panelChildren = childArray.filter(
    (child) => !React.isValidElement(child) || child.type !== HelpPanelTrigger
  );

  // ESC closes the panel
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <HelpPanelContext.Provider value={{ isOpen: open, setOpen, toggle, panelId }}>
      <div data-slot="krds-help-panel-root" className={cn("relative", className)}>
        {triggers}
        <div
          id={panelId}
          role="region"
          aria-label="도움말"
          data-slot="krds-help-panel"
          data-state={open ? "open" : "closed"}
          className={cn(
            "krds-help-panel",
            // Fixed slide-in drawer from the right
            "fixed top-0 right-0 bottom-0 z-40 w-[390px] max-w-full",
            "border-l border-[#b1b8be] bg-[#f4f5f6]",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full pointer-events-none"
          )}
        >
          <div className="help-panel-wrap flex h-full flex-col">
            <div className="help-conts-area flex h-full flex-col overflow-y-auto p-10">{panelChildren}</div>
          </div>
        </div>
      </div>
    </HelpPanelContext.Provider>
  );
}

// ─── HelpPanelTrigger ─────────────────────────────────────────────────────────
// Rendered OUTSIDE the panel container; opens the panel.

type HelpPanelTriggerProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode;
};

function HelpPanelTrigger({ className, children, onClick, ...props }: HelpPanelTriggerProps) {
  const { isOpen, setOpen, panelId } = useHelpPanel();
  return (
    <Button
      type="button"
      variant="tertiary"
      size="small"
      data-slot="krds-help-panel-trigger"
      aria-expanded={isOpen}
      aria-controls={panelId}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen(true);
      }}
      className={cn("gap-1", className)}
      {...props}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      <span>{children ?? "도움말"}</span>
    </Button>
  );
}

// ─── HelpPanelClose ───────────────────────────────────────────────────────────
// "접어두기" button — closes the panel.

type HelpPanelCloseProps = Omit<React.ComponentProps<"button">, "children"> & {
  children?: React.ReactNode;
};

function HelpPanelClose({ className, children, onClick, ...props }: HelpPanelCloseProps) {
  const { setOpen } = useHelpPanel();
  return (
    <button
      type="button"
      data-slot="krds-help-panel-close"
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) setOpen(false);
      }}
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
      className={cn(
        "conts-area related-service flex flex-col gap-6",
        "border-t border-[#cdd1d5] pt-8",
        className
      )}
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
