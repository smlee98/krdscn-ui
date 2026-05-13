import { type HTMLAttributes } from "react";
import * as React from "react";
import { Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  text: string;
  href: string;
  disabled?: boolean;
}

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
}

function Breadcrumb({ items, className, ariaLabel = "breadcrumb", ...rest }: BreadcrumbProps) {
  return (
    <ShadcnBreadcrumb aria-label={ariaLabel} className={cn("inline-flex items-center", className)} {...rest}>
      <BreadcrumbList className="flex-wrap items-center gap-0 text-xs leading-none">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome = index === 0;
          return (
            <React.Fragment key={item.href + index}>
              <ShadcnBreadcrumbItem className="inline-flex items-center gap-0">
                {isLast ? (
                  <BreadcrumbPage className="text-krds-gray-90 inline-flex items-center gap-1 rounded-sm px-1 text-xs leading-none font-medium">
                    {isHome && <HomeIcon aria-hidden="true" className="size-3.5" />}
                    {item.text}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.disabled ? undefined : item.href}
                    aria-disabled={item.disabled}
                    tabIndex={item.disabled ? -1 : undefined}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-sm px-1 text-xs leading-none transition-colors",
                      item.disabled
                        ? "text-krds-gray-30 pointer-events-none cursor-not-allowed"
                        : "text-krds-gray-90 hover:bg-krds-gray-10 active:bg-krds-gray-20 hover:underline"
                    )}
                  >
                    {isHome && <HomeIcon aria-hidden="true" className="size-3.5" />}
                    {item.text}
                  </BreadcrumbLink>
                )}
              </ShadcnBreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="inline-flex items-center [&>svg]:size-3.5">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="text-krds-gray-90"
                  >
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}

export type { BreadcrumbProps, BreadcrumbItem };
export { Breadcrumb };
