// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

function InPageNavigation({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="krds-in-page-navigation"
      role="navigation"
      aria-label="페이지 내 탐색"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function InPageNavigationItem({
  className,
  active,
  ...props
}: React.ComponentProps<"a"> & { active?: boolean }) {
  return (
    <a
      data-slot="krds-in-page-navigation-item"
      aria-current={active ? "true" : undefined}
      data-active={active || undefined}
      className={cn(
        "block py-1.5 pr-3 text-sm transition-colors",
        "hover:text-krds-gray-90",
        active
          ? "border-krds-primary-50 text-krds-primary-50 border-l-2 pl-2.5 font-medium"
          : "text-krds-gray-70 border-l-2 border-transparent pl-2.5",
        className
      )}
      {...props}
    />
  );
}

export { InPageNavigation, InPageNavigationItem };
