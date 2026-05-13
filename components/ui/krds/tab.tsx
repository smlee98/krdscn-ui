/**
 * KRDS Tab compound wrapper — composes @/components/ui/tabs
 * Sub-parts (locked): Tab (Root), TabList, TabTrigger, TabContent, TabPanel
 * IMPORTANT: TabContent (no value) and TabPanel (value: string) are DISTINCT types.
 * Intentionally omitted: asChild, Slot, polymorphic as generic, no dark variants
 */
"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabVariant = "line" | "fill";
type TabSize = "normal" | "full";

interface TabProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabVariant;
  size?: TabSize;
  children: React.ReactNode;
  className?: string;
}

interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

interface TabTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
  className?: string;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface TabContextValue {
  variant: TabVariant;
  size: TabSize;
}

const TabContext = React.createContext<TabContextValue>({ variant: "line", size: "normal" });

// ─── Tab (Root) ───────────────────────────────────────────────────────────────

function Tab({
  value,
  defaultValue,
  onValueChange,
  variant = "line",
  size = "normal",
  children,
  className,
  ...rest
}: TabProps) {
  return (
    <TabContext.Provider value={{ variant, size }}>
      <Tabs
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        data-variant={variant}
        data-size={size}
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
  const { size } = React.useContext(TabContext);
  const isFull = size === "full";

  return (
    <TabsList
      className={cn(
        "flex h-auto items-end justify-start rounded-none bg-transparent p-0",
        "border-krds-gray-20 border-b",
        isFull && "w-full",
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
  const { variant, size } = React.useContext(TabContext);
  const isFill = variant === "fill";
  const isFull = size === "full";

  return (
    <TabsTrigger
      value={value}
      className={cn(
        "relative h-10 min-w-[3.75rem] border-0 px-4 py-0 shadow-none select-none",
        "text-krds-gray-50 text-sm font-medium transition-colors outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:border-0 data-[state=active]:shadow-none",
        "focus-visible:ring-0 focus-visible:outline-none",
        !isFill && [
          "rounded-none bg-transparent",
          "data-[state=active]:text-krds-gray-90 data-[state=active]:bg-transparent data-[state=active]:font-semibold",
          "data-[state=active]:after:bg-krds-primary-50 data-[state=active]:after:absolute data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:left-0 data-[state=active]:after:h-0.5",
          "focus-visible:text-krds-gray-90"
        ],
        isFill && [
          "bg-krds-gray-5 text-krds-gray-50 rounded-t-sm",
          "data-[state=active]:bg-krds-primary-50 data-[state=active]:font-semibold data-[state=active]:text-white"
        ],
        isFull && "flex-1",
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
    <div className={cn("pt-4", className)} {...rest}>
      {children}
    </div>
  );
}

// ─── TabPanel ─────────────────────────────────────────────────────────────────
// Has value prop — maps to shadcn TabsContent

function TabPanel({ value, children, className, ...rest }: TabPanelProps) {
  return (
    <TabsContent value={value} className={cn("outline-none", className)} {...rest}>
      {children}
    </TabsContent>
  );
}

export { Tab, TabList, TabTrigger, TabContent, TabPanel };
export type { TabProps, TabListProps, TabTriggerProps, TabContentProps, TabPanelProps };
