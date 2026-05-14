// rsc:safe
import * as React from "react";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink as ShadcnBreadcrumbLink,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/cn";

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <ShadcnBreadcrumb
      data-slot="krds-breadcrumb"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ShadcnBreadcrumbList
      data-slot="krds-breadcrumb-list"
      className={cn("flex-wrap items-center gap-0 text-xs leading-none", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <ShadcnBreadcrumbItem
      data-slot="krds-breadcrumb-item"
      className={cn("inline-flex items-center gap-0", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  return (
    <ShadcnBreadcrumbLink
      data-slot="krds-breadcrumb-link"
      asChild={asChild}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-1 text-xs leading-none transition-colors",
        "text-krds-gray-90 hover:bg-krds-gray-10 active:bg-krds-gray-20 hover:underline",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <ShadcnBreadcrumbPage
      data-slot="krds-breadcrumb-page"
      className={cn(
        "text-krds-gray-90 inline-flex items-center gap-1 rounded-sm px-1 text-xs leading-none font-medium",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <ShadcnBreadcrumbSeparator
      data-slot="krds-breadcrumb-separator"
      className={cn("inline-flex items-center [&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
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
      )}
    </ShadcnBreadcrumbSeparator>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
