"use client";

import {
  Collapsible as ShadcnCollapsible,
  CollapsibleContent as ShadcnCollapsibleContent,
  CollapsibleTrigger as ShadcnCollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Disclosure as KrdsDisclosure,
  DisclosureContent as KrdsDisclosureContent,
  DisclosureTrigger as KrdsDisclosureTrigger
} from "@/components/ui/krds/(layout)/disclosure";
import type {
  DisclosureContentProps,
  DisclosureProps,
  DisclosureTriggerProps
} from "@/components/ui/krds/(layout)/disclosure";
import { useUISystem } from "@/lib/ui-system";

export type {
  DisclosureProps,
  DisclosureContentProps,
  DisclosureTriggerProps
} from "@/components/ui/krds/(layout)/disclosure";

// Dual-render dispatcher (cf. accordion.tsx): the public surface is the KRDS
// Disclosure compound API, but each part renders either the KRDS-chromed wrapper
// or the vanilla shadcn Collapsible primitive based on <UISystemProvider>.
// KRDS open/defaultOpen/onOpenChange map 1:1 onto Radix Collapsible's state props.
// In shadcn mode KRDS-only chrome is dropped: the trigger's chevron icon + KRDS
// typography, and the content's rounded/background/padding wrapper div.

// ─── Dispatched parts ─────────────────────────────────────────────────────────

export function Disclosure(props: DisclosureProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsDisclosure {...props} />;
  const { defaultOpen, open, onOpenChange, className, children, ...rest } = props;
  return (
    <ShadcnCollapsible
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      className={className}
      {...rest}
    >
      {children}
    </ShadcnCollapsible>
  );
}

export function DisclosureTrigger(props: DisclosureTriggerProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsDisclosureTrigger {...props} />;
  const { className, children, ...rest } = props;
  return (
    <ShadcnCollapsibleTrigger className={className} {...rest}>
      {children}
    </ShadcnCollapsibleTrigger>
  );
}

export function DisclosureContent(props: DisclosureContentProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsDisclosureContent {...props} />;
  const { className, children, ...rest } = props;
  return (
    <ShadcnCollapsibleContent className={className} {...rest}>
      {children}
    </ShadcnCollapsibleContent>
  );
}
