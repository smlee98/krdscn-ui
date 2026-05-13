// rsc:client
"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/cn";

interface SideNavItem {
  label: string;
  href?: string;
  active?: boolean;
  children?: SideNavItem[];
}

interface SideNavigationProps {
  items: SideNavItem[];
  className?: string;
  "aria-label"?: string;
}

function SideNavLeaf({ item }: { item: SideNavItem }) {
  return (
    <a
      href={item.href ?? "#"}
      aria-current={item.active ? "page" : undefined}
      className={cn(
        "block rounded-sm px-3 py-2 text-sm transition-colors select-none",
        "text-krds-gray-70 hover:bg-krds-gray-10 hover:text-krds-gray-90",
        item.active && "bg-krds-primary-10 text-krds-primary-50 font-medium"
      )}
    >
      {item.label}
    </a>
  );
}

function SideNavGroup({ item, defaultOpen = false }: { item: SideNavItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return <SideNavLeaf item={item} />;
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between rounded-sm px-3 py-2",
            "text-sm font-medium transition-colors select-none",
            "text-krds-gray-90 hover:bg-krds-gray-10",
            "focus:ring-krds-primary-50 focus:ring-2 focus:outline-none"
          )}
        >
          <span>{item.label}</span>
          <ChevronRightIcon
            className={cn("size-4 shrink-0 transition-transform duration-200", open && "rotate-90")}
            aria-hidden="true"
          />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="border-krds-gray-20 mt-0.5 ml-3 flex flex-col gap-0.5 border-l pl-2">
          {item.children!.map((child, idx) => (
            <li key={idx}>
              <SideNavLeaf item={child} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function SideNavigation({ items, className, "aria-label": ariaLabel = "사이드 내비게이션" }: SideNavigationProps) {
  return (
    <nav role="navigation" aria-label={ariaLabel} className={cn("flex w-56 flex-col gap-0.5", className)}>
      <ul className="flex flex-col gap-0.5">
        {items.map((item, idx) => (
          <li key={idx}>
            <SideNavGroup item={item} defaultOpen={idx === 0 && !!item.children?.length} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export type { SideNavItem as SideNavigationItem, SideNavigationProps };
export { SideNavigation };
