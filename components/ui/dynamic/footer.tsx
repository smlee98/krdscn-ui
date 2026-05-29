"use client";

import type * as React from "react";
import {
  Footer as KrdsFooter,
  FooterColumn as KrdsFooterColumn,
  FooterColumnLinks as KrdsFooterColumnLinks,
  FooterColumnTitle as KrdsFooterColumnTitle,
  FooterColumns as KrdsFooterColumns,
  FooterCopyright as KrdsFooterCopyright,
  FooterLink as KrdsFooterLink,
  FooterOrg as KrdsFooterOrg
} from "@/components/ui/krds/(identity)/footer";

// shadcn has no Footer primitive — render KRDS regardless of active UI system.
// (Composition primitive — Korean government site footer chrome.)
export function Footer(props: React.ComponentProps<typeof KrdsFooter>) {
  return <KrdsFooter {...props} />;
}

export function FooterOrg(props: React.ComponentProps<typeof KrdsFooterOrg>) {
  return <KrdsFooterOrg {...props} />;
}

export function FooterColumns(props: React.ComponentProps<typeof KrdsFooterColumns>) {
  return <KrdsFooterColumns {...props} />;
}

export function FooterColumn(props: React.ComponentProps<typeof KrdsFooterColumn>) {
  return <KrdsFooterColumn {...props} />;
}

export function FooterColumnTitle(props: React.ComponentProps<typeof KrdsFooterColumnTitle>) {
  return <KrdsFooterColumnTitle {...props} />;
}

export function FooterColumnLinks(props: React.ComponentProps<typeof KrdsFooterColumnLinks>) {
  return <KrdsFooterColumnLinks {...props} />;
}

export function FooterLink(props: React.ComponentProps<typeof KrdsFooterLink>) {
  return <KrdsFooterLink {...props} />;
}

export function FooterCopyright(props: React.ComponentProps<typeof KrdsFooterCopyright>) {
  return <KrdsFooterCopyright {...props} />;
}
