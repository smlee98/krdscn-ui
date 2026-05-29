"use client";

import type * as React from "react";
import {
  Accordion as ShadcnAccordion,
  AccordionContent as ShadcnAccordionContent,
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger
} from "@/components/ui/accordion";
import {
  Accordion as KrdsAccordion,
  AccordionHeader as KrdsAccordionHeader,
  AccordionItem as KrdsAccordionItem,
  AccordionPanel as KrdsAccordionPanel
} from "@/components/ui/krds/(layout)/accordion";
import type {
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps
} from "@/components/ui/krds/(layout)/accordion";
import { useUISystem } from "@/lib/ui-system";

export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps
} from "@/components/ui/krds/(layout)/accordion";

// Reference dual-render dispatcher (template for the other pass-through wrappers):
// the public surface is the KRDS compound API, but each part renders either the
// KRDS-chromed wrapper or the vanilla shadcn primitive based on <UISystemProvider>.
// In shadcn mode the KRDS-only props (variant/size) are intentionally dropped —
// shadcn's Accordion has no line/default or large/medium axis (cf. button.tsx fallbacks).

// ─── shadcn-mode root: map KRDS API (allowMultiple / value[] / onChange) → Radix ──

function ShadcnAccordionRoot({
  variant: _variant,
  size: _size,
  allowMultiple = true,
  value,
  onChange,
  defaultValue,
  children,
  className,
  dir,
  ...rest
}: AccordionProps) {
  const radixDir = dir as "ltr" | "rtl" | undefined;

  if (allowMultiple) {
    return (
      <ShadcnAccordion
        type="multiple"
        value={value}
        defaultValue={defaultValue}
        onValueChange={(vals) => onChange?.(vals)}
        className={className}
        dir={radixDir}
        {...rest}
      >
        {children}
      </ShadcnAccordion>
    );
  }

  return (
    <ShadcnAccordion
      type="single"
      collapsible
      value={value?.[0]}
      defaultValue={defaultValue?.[0]}
      onValueChange={(val) => onChange?.(val ? [val] : [])}
      className={className}
      dir={radixDir}
      {...rest}
    >
      {children}
    </ShadcnAccordion>
  );
}

// ─── Dispatched parts ─────────────────────────────────────────────────────────

export function Accordion(props: AccordionProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsAccordion {...props} />;
  return <ShadcnAccordionRoot {...props} />;
}

export function AccordionItem(props: AccordionItemProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsAccordionItem {...props} />;
  const { value, children, className, ...rest } = props;
  return (
    <ShadcnAccordionItem value={value} className={className} {...rest}>
      {children}
    </ShadcnAccordionItem>
  );
}

export function AccordionHeader(props: AccordionHeaderProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsAccordionHeader {...props} />;
  const { children, onClick, className, ...rest } = props;
  return (
    <ShadcnAccordionTrigger
      onClick={onClick}
      className={className}
      {...(rest as React.ComponentProps<typeof ShadcnAccordionTrigger>)}
    >
      {children}
    </ShadcnAccordionTrigger>
  );
}

export function AccordionPanel(props: AccordionPanelProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsAccordionPanel {...props} />;
  const { children, className, ...rest } = props;
  return (
    <ShadcnAccordionContent className={className} {...rest}>
      {children}
    </ShadcnAccordionContent>
  );
}
