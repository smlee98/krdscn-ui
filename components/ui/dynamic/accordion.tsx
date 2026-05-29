"use client";

import type * as React from "react";
import {
  Accordion as KrdsAccordion,
  AccordionHeader as KrdsAccordionHeader,
  AccordionItem as KrdsAccordionItem,
  AccordionPanel as KrdsAccordionPanel
} from "@/components/ui/krds/(layout)/accordion";

export type {
  AccordionVariant,
  AccordionSize,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionPanelProps
} from "@/components/ui/krds/(layout)/accordion";

// KRDS Accordion already composes shadcn Accordion (Radix) and layers
// KRDS variant/size chrome on top. Render KRDS regardless of active UI system.
export function Accordion(props: React.ComponentProps<typeof KrdsAccordion>) {
  return <KrdsAccordion {...props} />;
}

export function AccordionItem(props: React.ComponentProps<typeof KrdsAccordionItem>) {
  return <KrdsAccordionItem {...props} />;
}

export function AccordionHeader(props: React.ComponentProps<typeof KrdsAccordionHeader>) {
  return <KrdsAccordionHeader {...props} />;
}

export function AccordionPanel(props: React.ComponentProps<typeof KrdsAccordionPanel>) {
  return <KrdsAccordionPanel {...props} />;
}
