"use client";

import type * as React from "react";
import {
  Header as KrdsHeader,
  HeaderActionItem as KrdsHeaderActionItem,
  HeaderActions as KrdsHeaderActions,
  HeaderBrand as KrdsHeaderBrand,
  HeaderNav as KrdsHeaderNav,
  HeaderNavItem as KrdsHeaderNavItem,
  HeaderUtility as KrdsHeaderUtility,
  HeaderUtilityDivider as KrdsHeaderUtilityDivider,
  HeaderUtilityItem as KrdsHeaderUtilityItem
} from "@/components/ui/krds/(identity)/header";

// shadcn has no Header primitive — render KRDS regardless of active UI system.
// (Composition primitive — Korean government site header chrome.)
export function Header(props: React.ComponentProps<typeof KrdsHeader>) {
  return <KrdsHeader {...props} />;
}

export function HeaderBrand(props: React.ComponentProps<typeof KrdsHeaderBrand>) {
  return <KrdsHeaderBrand {...props} />;
}

export function HeaderUtility(props: React.ComponentProps<typeof KrdsHeaderUtility>) {
  return <KrdsHeaderUtility {...props} />;
}

export function HeaderUtilityItem(props: React.ComponentProps<typeof KrdsHeaderUtilityItem>) {
  return <KrdsHeaderUtilityItem {...props} />;
}

export function HeaderUtilityDivider() {
  return <KrdsHeaderUtilityDivider />;
}

export function HeaderActions(props: React.ComponentProps<typeof KrdsHeaderActions>) {
  return <KrdsHeaderActions {...props} />;
}

export function HeaderActionItem(props: React.ComponentProps<typeof KrdsHeaderActionItem>) {
  return <KrdsHeaderActionItem {...props} />;
}

export function HeaderNav(props: React.ComponentProps<typeof KrdsHeaderNav>) {
  return <KrdsHeaderNav {...props} />;
}

export function HeaderNavItem(props: React.ComponentProps<typeof KrdsHeaderNavItem>) {
  return <KrdsHeaderNavItem {...props} />;
}
