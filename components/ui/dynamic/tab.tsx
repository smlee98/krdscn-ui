"use client";

import * as React from "react";
import {
  Tabs as ShadcnTabs,
  TabsContent as ShadcnTabsContent,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger
} from "@/components/ui/tabs";
import {
  Tab as KrdsTab,
  TabContent as KrdsTabContent,
  TabList as KrdsTabList,
  TabPanel as KrdsTabPanel,
  TabTrigger as KrdsTabTrigger
} from "@/components/ui/krds/(layout)/tab";
import type {
  TabContentProps,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabTriggerProps
} from "@/components/ui/krds/(layout)/tab";
import { useUISystem } from "@/lib/ui-system";

export type {
  TabVariant,
  TabType,
  TabProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
  TabPanelProps
} from "@/components/ui/krds/(layout)/tab";

// Dual-render dispatcher (cf. accordion.tsx): the public surface is the KRDS Tab
// compound API, but each part renders either the KRDS-chromed wrapper or the
// vanilla shadcn Tabs primitive based on <UISystemProvider>.
//
// KRDS API → shadcn anatomy:
//   Tab (Root) → Tabs            (value / defaultValue / onValueChange preserved)
//   TabList    → TabsList
//   TabTrigger → TabsTrigger     (value preserved)
//   TabContent → <div>           (structural padding wrapper; no shadcn analog)
//   TabPanel   → TabsContent     (value preserved)
//
// In shadcn mode the KRDS `variant` maps to shadcn's TabsList variant: KRDS line
// (also the default) → shadcn "line" (underline tabs); KRDS fill → shadcn "default"
// (boxed tabs). The KRDS `type` (primary/secondary axis) has no shadcn analog and
// is still dropped.

const ShadcnTabContext = React.createContext<{ variant: "line" | "fill" }>({ variant: "line" });

// ─── Tab (Root) ────────────────────────────────────────────────────────────────

export function Tab(props: TabProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTab {...props} />;
  const { variant, type: _type, value, defaultValue, onValueChange, children, className, ...rest } = props;
  return (
    <ShadcnTabContext.Provider value={{ variant: variant ?? "line" }}>
      <ShadcnTabs value={value} defaultValue={defaultValue} onValueChange={onValueChange} className={className} {...rest}>
        {children}
      </ShadcnTabs>
    </ShadcnTabContext.Provider>
  );
}

// ─── TabList ─────────────────────────────────────────────────────────────────

export function TabList(props: TabListProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTabList {...props} />;
  const { children, className, ...rest } = props;
  const ctx = React.useContext(ShadcnTabContext);
  return (
    <ShadcnTabsList variant={ctx.variant === "fill" ? "default" : "line"} className={className} {...rest}>
      {children}
    </ShadcnTabsList>
  );
}

// ─── TabTrigger ────────────────────────────────────────────────────────────────

export function TabTrigger(props: TabTriggerProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTabTrigger {...props} />;
  const { value, children, className, ...rest } = props;
  return (
    <ShadcnTabsTrigger value={value} className={className} {...rest}>
      {children}
    </ShadcnTabsTrigger>
  );
}

// ─── TabContent ────────────────────────────────────────────────────────────────
// Structural padding wrapper with no value prop; shadcn has no analog, so render
// a plain div carrying through className/attrs.

export function TabContent(props: TabContentProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTabContent {...props} />;
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
}

// ─── TabPanel ──────────────────────────────────────────────────────────────────

export function TabPanel(props: TabPanelProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTabPanel {...props} />;
  const { value, children, className, ...rest } = props;
  return (
    <ShadcnTabsContent value={value} className={className} {...rest}>
      {children}
    </ShadcnTabsContent>
  );
}
