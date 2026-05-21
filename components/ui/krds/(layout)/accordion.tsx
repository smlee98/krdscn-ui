/**
 * KRDS Accordion — wraps @/components/ui/accordion (shadcn/Radix).
 *
 * Figma source: KRDS_v1.0.0 — node 360:44958
 *  - variant: "line" | "default"
 *  - size: "large" | "medium"
 *  - Open/closed state driven by Radix data-state on each item.
 */
"use client";

import * as React from "react";
import {
  Accordion as ShadcnAccordion,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
  AccordionContent as ShadcnAccordionContent
} from "@/components/ui/accordion";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

type AccordionVariant = "default" | "line";
type AccordionSize = "large" | "medium";

type AccordionContextValue = { variant: AccordionVariant; size: AccordionSize };

type AccordionProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  variant?: AccordionVariant;
  size?: AccordionSize;
  allowMultiple?: boolean;
  value?: string[];
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
  children: React.ReactNode;
};

type AccordionItemProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  value: string;
  children: React.ReactNode;
};

type AccordionHeaderProps = Omit<React.HTMLAttributes<HTMLElement>, "onClick"> & {
  children: React.ReactNode;
  onClick?: () => void;
};

type AccordionPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: "default",
  size: "large"
});

// ─── Accordion (Root) ─────────────────────────────────────────────────────────

function Accordion({
  variant = "default",
  size = "large",
  allowMultiple = true,
  value,
  onChange,
  defaultValue,
  children,
  className,
  dir,
  ...rest
}: AccordionProps) {
  const isLine = variant === "line";
  const radixDir = dir as "ltr" | "rtl" | undefined;

  const commonProps = {
    "data-slot": "krds-accordion",
    "data-variant": variant,
    "data-size": size,
    className: cn("flex flex-col", isLine ? "gap-0" : "gap-2", className),
    dir: radixDir,
    ...rest
  };

  return (
    <AccordionContext.Provider value={{ variant, size }}>
      {allowMultiple ? (
        <ShadcnAccordion
          type="multiple"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(vals) => onChange?.(vals)}
          {...commonProps}
        >
          {children}
        </ShadcnAccordion>
      ) : (
        <ShadcnAccordion
          type="single"
          collapsible
          value={value?.[0]}
          defaultValue={defaultValue?.[0]}
          onValueChange={(val) => onChange?.(val ? [val] : [])}
          {...commonProps}
        >
          {children}
        </ShadcnAccordion>
      )}
    </AccordionContext.Provider>
  );
}

// ─── AccordionItem ────────────────────────────────────────────────────────────

function AccordionItem({ value, children, className, ...rest }: AccordionItemProps) {
  const { variant, size } = React.useContext(AccordionContext);
  const isLine = variant === "line";
  const isLarge = size === "large";

  return (
    <ShadcnAccordionItem
      data-slot="krds-accordion-item"
      value={value}
      className={cn(
        "overflow-hidden",
        isLine
          ? [
              // top divider only — bottom comes from next item's top
              "border-krds-gray-20 border-t border-b-0",
              "data-[state=open]:border-krds-gray-50",
              // wrapper spacing: pt:4 always, pb:4 closed → pb:24/20 open
              "pt-1 pb-1",
              isLarge ? "data-[state=open]:pb-6" : "data-[state=open]:pb-5"
            ]
          : [
              "rounded-[10px] border-0 bg-transparent",
              "data-[state=open]:bg-krds-secondary-5",
              isLarge ? "p-6" : "px-4 py-5"
            ],
        className
      )}
      {...rest}
    >
      {children}
    </ShadcnAccordionItem>
  );
}

// ─── AccordionHeader ──────────────────────────────────────────────────────────

function AccordionHeader({ children, onClick, className, ...rest }: AccordionHeaderProps) {
  const { variant, size } = React.useContext(AccordionContext);
  const isLine = variant === "line";
  const isLarge = size === "large";

  return (
    <ShadcnAccordionTrigger
      data-slot="krds-accordion-header"
      onClick={onClick}
      className={cn(
        // base layout
        "flex w-full items-center justify-between gap-4 transition-colors outline-none",
        "hover:no-underline disabled:pointer-events-none disabled:opacity-50",
        // typography
        "text-krds-gray-90 text-left leading-[1.5] font-bold",
        isLarge ? "text-[19px]" : "text-[17px]",
        // open-state title color → secondary darker
        "data-[state=open]:text-[#052b57]",
        // padding — line variant supplies its own header padding; default variant has none (wrapper provides it)
        isLine ? (isLarge ? "py-5" : "py-3") : "p-0",
        // chevron icon overrides (shadcn ships size-4 muted-foreground; we want 24px #33363d)
        "[&>svg]:size-6 [&>svg]:shrink-0 [&>svg]:translate-y-0 [&>svg]:text-[#33363d]",
        className
      )}
      {...(rest as React.HTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </ShadcnAccordionTrigger>
  );
}

// ─── AccordionPanel ───────────────────────────────────────────────────────────

function AccordionPanel({ children, className, ...rest }: AccordionPanelProps) {
  const { variant, size } = React.useContext(AccordionContext);
  const isLine = variant === "line";
  const isLarge = size === "large";

  return (
    <ShadcnAccordionContent
      data-slot="krds-accordion-panel"
      className={cn(
        // Bottom inset owned by item wrapper (line: pb-on-open) or by `pb` of wrapper (default).
        // Top gap: line variant flush (0); default uses gap/7 (24) or gap/6 (20).
        "px-0 pb-0",
        isLine ? "pt-0" : isLarge ? "pt-6" : "pt-5",
        "text-krds-gray-90 text-[17px] leading-[1.5]",
        className
      )}
      {...rest}
    >
      {children}
    </ShadcnAccordionContent>
  );
}

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel };
export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps
};
