/**
 * KRDS Tab compound wrapper — composes @/components/ui/tabs
 *
 * Figma source: KRDS_v1.0.0 — node 340:31866
 *  - variant: "line" | "fill"   (style axis)
 *  - type:    "primary" | "secondary"  (size/typography axis)
 *
 * Visual rules per variant×type:
 *  - line+primary   : h-14, 19px bold, each trigger has its own 2px gray bottom border (#b1b8be);
 *                     active overlays a 4px navy bar (#063a74); triggers stretch flex-1.
 *  - line+secondary : h-10, 17px bold, no default border; active overlays a 3px navy bar; inline gap-2.
 *  - fill+primary   : h-14, 19px bold, segmented container (rounded-lg gray border + internal 1px right
 *                     dividers); active cell fills navy with white text; triggers stretch flex-1.
 *  - fill+secondary : h-10, 17px bold, independent rounded-md pills; active = navy bg + white text; gap-2.
 *
 * Sub-parts (locked): Tab (Root), TabList, TabTrigger, TabContent, TabPanel
 * IMPORTANT: TabContent (no value) and TabPanel (value: string) are DISTINCT types.
 */
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabVariant = "line" | "fill";
type TabType = "primary" | "secondary";

type TabContextValue = {
  variant: TabVariant;
  type: TabType;
};

type TabProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabVariant;
  type?: TabType;
  children: React.ReactNode;
  className?: string;
};

type TabListProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

type TabTriggerProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "type"> & {
  value: string;
  children: React.ReactNode;
};

type TabContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

type TabPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string;
  children: React.ReactNode;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const TabContext = React.createContext<TabContextValue>({ variant: "line", type: "primary" });

// ─── Tab (Root) ───────────────────────────────────────────────────────────────

function Tab({
  value,
  defaultValue,
  onValueChange,
  variant = "line",
  type = "primary",
  children,
  className,
  ...rest
}: TabProps) {
  return (
    <TabContext.Provider value={{ variant, type }}>
      <Tabs
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        data-slot="krds-tab"
        data-variant={variant}
        data-type={type}
        className={cn("flex flex-col", className)}
        {...rest}
      >
        {children}
      </Tabs>
    </TabContext.Provider>
  );
}

// ─── TabList ─────────────────────────────────────────────────────────────────

function TabList({ children, className, ...rest }: TabListProps) {
  const { variant, type } = React.useContext(TabContext);
  const isFill = variant === "fill";
  const isPrimary = type === "primary";

  return (
    <TabsList
      data-slot="krds-tab-list"
      className={cn(
        "flex h-auto rounded-none bg-transparent p-0",
        // Line variant
        !isFill && (isPrimary ? "w-full items-end" : "items-end gap-2"),
        // Fill variant
        isFill &&
          (isPrimary
            ? "w-full items-stretch overflow-hidden rounded-lg border border-krds-border"
            : "items-stretch gap-2"),
        className
      )}
      {...rest}
    >
      {children}
    </TabsList>
  );
}

// ─── TabTrigger ───────────────────────────────────────────────────────────────

function TabTrigger({ value, children, className, ...rest }: TabTriggerProps) {
  const { variant, type } = React.useContext(TabContext);
  const isLine = variant === "line";
  const isFill = variant === "fill";
  const isPrimary = type === "primary";

  return (
    <TabsTrigger
      data-slot="krds-tab-trigger"
      value={value}
      className={cn(
        // Base reset (override shadcn defaults)
        "relative shrink-0 border-0 shadow-none transition-colors outline-none select-none",
        "font-bold whitespace-nowrap",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:border-0 data-[state=active]:shadow-none",
        "focus-visible:ring-0 focus-visible:outline-none",

        // Size by type
        isPrimary ? "h-14 text-krds-body-lg" : "h-10 text-krds-body-md",

        // Line variant
        isLine && [
          "rounded-none bg-transparent text-krds-foreground-subtle",
          "data-[state=active]:bg-transparent data-[state=active]:text-krds-foreground-secondary",
          // active bottom bar (overlay; no layout shift)
          "data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:bottom-0",
          "data-[state=active]:after:bg-krds-secondary-bold data-[state=active]:after:content-['']",
          isPrimary
            ? [
                "min-w-[80px] flex-1 px-2",
                "border-b-2 border-krds-border",
                "data-[state=active]:after:h-1" // 4px
              ]
            : ["min-w-[56px] px-1", "data-[state=active]:after:h-[3px]"]
        ],

        // Fill variant
        isFill && [
          "bg-transparent text-krds-foreground-subtle",
          "data-[state=active]:bg-krds-secondary-bold data-[state=active]:text-white",
          isPrimary
            ? [
                "min-w-[80px] flex-1 rounded-none px-4",
                "[&:not(:last-child)]:border-r [&:not(:last-child)]:border-krds-border"
              ]
            : "min-w-[56px] rounded-md px-3"
        ],

        className
      )}
      {...rest}
    >
      {children}
    </TabsTrigger>
  );
}

// ─── TabContent ───────────────────────────────────────────────────────────────
// No value prop — wraps the panel area with top padding

function TabContent({ children, className, ...rest }: TabContentProps) {
  return (
    <div data-slot="krds-tab-content" className={cn("pt-4", className)} {...rest}>
      {children}
    </div>
  );
}

// ─── TabPanel ─────────────────────────────────────────────────────────────────
// Has value prop — maps to shadcn TabsContent

function TabPanel({ value, children, className, ...rest }: TabPanelProps) {
  return (
    <TabsContent data-slot="krds-tab-panel" value={value} className={cn("outline-none", className)} {...rest}>
      {children}
    </TabsContent>
  );
}

export { Tab, TabList, TabTrigger, TabContent, TabPanel };
export type { TabVariant, TabType, TabProps, TabListProps, TabTriggerProps, TabContentProps, TabPanelProps };
