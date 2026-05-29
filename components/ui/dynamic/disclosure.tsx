"use client";

import type * as React from "react";
import {
  Disclosure as KrdsDisclosure,
  DisclosureContent as KrdsDisclosureContent,
  DisclosureTrigger as KrdsDisclosureTrigger
} from "@/components/ui/krds/(layout)/disclosure";

export type {
  DisclosureProps,
  DisclosureContentProps,
  DisclosureTriggerProps
} from "@/components/ui/krds/(layout)/disclosure";

// KRDS Disclosure already composes shadcn Collapsible with KRDS chrome.
// Render KRDS regardless of active UI system.
export function Disclosure(props: React.ComponentProps<typeof KrdsDisclosure>) {
  return <KrdsDisclosure {...props} />;
}

export function DisclosureTrigger(props: React.ComponentProps<typeof KrdsDisclosureTrigger>) {
  return <KrdsDisclosureTrigger {...props} />;
}

export function DisclosureContent(props: React.ComponentProps<typeof KrdsDisclosureContent>) {
  return <KrdsDisclosureContent {...props} />;
}
