/**
 * KRDS Accordion — composes radix-ui Accordion primitives directly.
 *
 * Figma source: KRDS_v1.0.0 — node 360:44958
 *  - variant: "line" | "default"
 *  - size: "large" | "medium"
 *  - Open/closed state driven by Radix data-state on each item.
 */
"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";
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
        <AccordionPrimitive.Root
          type="multiple"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(vals) => onChange?.(vals)}
          {...commonProps}
        >
          {children}
        </AccordionPrimitive.Root>
      ) : (
        <AccordionPrimitive.Root
          type="single"
          collapsible
          value={value?.[0]}
          defaultValue={defaultValue?.[0]}
          onValueChange={(val) => onChange?.(val ? [val] : [])}
          {...commonProps}
        >
          {children}
        </AccordionPrimitive.Root>
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
    <AccordionPrimitive.Item
      data-slot="krds-accordion-item"
      value={value}
      className={cn(
        "overflow-hidden",
        isLine
          ? [
              // top divider only — bottom comes from next item's top
              "border-krds-border-light border-t border-b-0",
              "data-[state=open]:border-krds-border-dark",
              // wrapper spacing: pt:4 always, pb:4 closed → pb:24/20 open
              "pt-1 pb-1",
              isLarge ? "data-[state=open]:pb-6" : "data-[state=open]:pb-5"
            ]
          : [
              "rounded-[10px] border-0 bg-transparent",
              "data-[state=open]:bg-krds-surface-secondary-subtle",
              isLarge ? "p-6" : "px-4 py-5"
            ],
        className
      )}
      {...rest}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

// ─── AccordionHeader ──────────────────────────────────────────────────────────

function AccordionHeader({ children, onClick, className, ...rest }: AccordionHeaderProps) {
  const { variant, size } = React.useContext(AccordionContext);
  const isLine = variant === "line";
  const isLarge = size === "large";

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="krds-accordion-header"
        onClick={onClick}
        className={cn(
          // base layout
          "flex w-full items-center justify-between gap-4 transition-colors outline-none focus:krds-focus-ring",
          "hover:no-underline disabled:pointer-events-none disabled:opacity-50",
          // typography
          "text-krds-foreground text-left leading-[1.5] font-bold",
          isLarge ? "text-krds-body-lg" : "text-krds-body-md",
          // open-state title color → secondary darker
          "data-[state=open]:text-krds-foreground-secondary",
          // padding — line variant supplies its own header padding; default variant has none (wrapper provides it)
          isLine ? (isLarge ? "py-5" : "py-3") : "p-0",
          // chevron rotation on open
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...(rest as React.HTMLAttributes<HTMLButtonElement>)}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="size-6 shrink-0 translate-y-0 text-krds-foreground transition-transform duration-200"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

// ─── AccordionPanel ───────────────────────────────────────────────────────────

function AccordionPanel({ children, className, ...rest }: AccordionPanelProps) {
  const { variant, size } = React.useContext(AccordionContext);
  const isLine = variant === "line";
  const isLarge = size === "large";

  return (
    <AccordionPrimitive.Content
      data-slot="krds-accordion-panel"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...rest}
    >
      <div
        className={cn(
          // Bottom inset owned by item wrapper (line: pb-on-open) or by `pb` of wrapper (default).
          // Top gap: line variant flush (0); default uses gap/7 (24) or gap/6 (20).
          "px-0 pb-0",
          isLine ? "pt-0" : isLarge ? "pt-6" : "pt-5",
          "text-krds-foreground text-krds-body-md",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
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
