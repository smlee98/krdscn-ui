"use client";

import type * as React from "react";
import {
  Tab as KrdsTab,
  TabContent as KrdsTabContent,
  TabList as KrdsTabList,
  TabPanel as KrdsTabPanel,
  TabTrigger as KrdsTabTrigger
} from "@/components/ui/krds/(layout)/tab";

export type {
  TabVariant,
  TabType,
  TabProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
  TabPanelProps
} from "@/components/ui/krds/(layout)/tab";

// KRDS Tab already composes shadcn Tabs and layers KRDS variant/type chrome
// on top. Render KRDS regardless of active UI system.
export function Tab(props: React.ComponentProps<typeof KrdsTab>) {
  return <KrdsTab {...props} />;
}

export function TabList(props: React.ComponentProps<typeof KrdsTabList>) {
  return <KrdsTabList {...props} />;
}

export function TabTrigger(props: React.ComponentProps<typeof KrdsTabTrigger>) {
  return <KrdsTabTrigger {...props} />;
}

export function TabContent(props: React.ComponentProps<typeof KrdsTabContent>) {
  return <KrdsTabContent {...props} />;
}

export function TabPanel(props: React.ComponentProps<typeof KrdsTabPanel>) {
  return <KrdsTabPanel {...props} />;
}
