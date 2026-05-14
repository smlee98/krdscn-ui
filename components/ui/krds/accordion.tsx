/**
 * KRDS Accordion compound wrapper — composes @/components/ui/accordion
 * Sub-parts (locked): Accordion (Root), AccordionItem, AccordionHeader, AccordionPanel
 * IMPORTANT: Root value is string[] (ARRAY), onChange: (values: string[]) => void
 * Intentionally omitted: polymorphic as generic, no dark variants
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

type AccordionContextValue = { variant: AccordionVariant };

type AccordionProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  variant?: AccordionVariant;
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
  variant: "default"
});

// ─── Accordion (Root) ─────────────────────────────────────────────────────────

function Accordion({
  variant = "default",
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
    className: cn("flex flex-col", isLine ? "gap-0" : "gap-1", className),
    dir: radixDir,
    ...rest
  };

  return (
    <AccordionContext.Provider value={{ variant }}>
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
  const { variant } = React.useContext(AccordionContext);
  const isLine = variant === "line";

  return (
    <ShadcnAccordionItem
      data-slot="krds-accordion-item"
      value={value}
      className={cn(
        "overflow-hidden",
        isLine ? "border-krds-gray-20 border-b last:border-b-0" : "bg-krds-gray-5 rounded-lg border-0",
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
  const { variant } = React.useContext(AccordionContext);
  const isLine = variant === "line";

  return (
    <ShadcnAccordionTrigger
      data-slot="krds-accordion-header"
      onClick={onClick}
      className={cn(
        "text-krds-gray-90 flex w-full items-center justify-between py-4 font-semibold transition-colors outline-none",
        "hover:no-underline disabled:pointer-events-none disabled:opacity-50",
        "px-4",
        isLine
          ? "data-[state=open]:text-krds-primary-50"
          : "data-[state=open]:bg-krds-primary-5 data-[state=open]:text-krds-primary-50",
        "[&>svg]:text-krds-gray-50 [&>svg]:size-5 [&>svg]:shrink-0",
        "[&[data-state=open]>svg]:text-krds-primary-50",
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
  return (
    <ShadcnAccordionContent
      data-slot="krds-accordion-panel"
      className={cn("text-krds-gray-50 px-4 pt-0 pb-4", className)}
      {...rest}
    >
      {children}
    </ShadcnAccordionContent>
  );
}

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel };
export type { AccordionProps, AccordionItemProps, AccordionHeaderProps, AccordionPanelProps };
