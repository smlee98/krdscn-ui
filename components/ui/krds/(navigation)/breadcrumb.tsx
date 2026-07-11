// rsc:safe
import * as React from "react";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Breadcrumb (root nav) ────────────────────────────────────────────────────

type BreadcrumbProps = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function Breadcrumb({ className, children, "aria-label": ariaLabel = "현재 경로" }: BreadcrumbProps) {
  return (
    <nav data-slot="krds-breadcrumb" aria-label={ariaLabel} className={cn("inline-flex items-center", className)}>
      {children}
    </nav>
  );
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

type BreadcrumbListProps = {
  className?: string;
  children?: React.ReactNode;
};

function BreadcrumbList({ className, children }: BreadcrumbListProps) {
  return (
    <ol
      data-slot="krds-breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1",
        // KRDS mobile: collapse intermediate crumbs, keep home (first) + current (last),
        // and surface an ellipsis indicator before the last item. The ellipsis is only
        // rendered when something is actually collapsed (last item is past nth-child(2)),
        // so single-item / home+page breadcrumbs render unchanged.
        "max-md:[&>*:not(:first-child):not(:last-child)]:sr-only",
        "max-md:[&>*:last-child:not(:first-child):not(:nth-child(2))]:before:content-['…']",
        "max-md:[&>*:last-child:not(:first-child):not(:nth-child(2))]:before:mr-1",
        "max-md:[&>*:last-child:not(:first-child):not(:nth-child(2))]:before:text-krds-foreground",
        className
      )}
    >
      {children}
    </ol>
  );
}

// ─── BreadcrumbItem ───────────────────────────────────────────────────────────

type BreadcrumbItemProps = {
  className?: string;
  children?: React.ReactNode;
};

function BreadcrumbItem({ className, children }: BreadcrumbItemProps) {
  return (
    <li data-slot="krds-breadcrumb-item" className={cn("inline-flex items-center", className)}>
      {children}
    </li>
  );
}

// ─── BreadcrumbLink ───────────────────────────────────────────────────────────

const linkBaseClass = cn(
  "inline-flex h-6 items-center gap-1 rounded-[6px] px-1",
  "text-krds-foreground text-krds-body-sm underline",
  "hover:bg-krds-surface-secondary-subtle",
  "active:bg-krds-surface-secondary-pressed",
  "focus:krds-focus-ring-inset"
);

type BreadcrumbLinkProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
};

function BreadcrumbLink({ className, children, href }: BreadcrumbLinkProps) {
  return (
    <a data-slot="krds-breadcrumb-link" href={href} className={cn(linkBaseClass, className)}>
      {children}
    </a>
  );
}

// ─── BreadcrumbHome ───────────────────────────────────────────────────────────

type BreadcrumbHomeProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
};

function BreadcrumbHome({ className, children = "홈", href = "/" }: BreadcrumbHomeProps) {
  return (
    <a data-slot="krds-breadcrumb-home" href={href} className={cn(linkBaseClass, className)}>
      <Home size={16} aria-hidden="true" />
      {children}
    </a>
  );
}

// ─── BreadcrumbPage (current page) ────────────────────────────────────────────

type BreadcrumbPageProps = {
  className?: string;
  children?: React.ReactNode;
};

function BreadcrumbPage({ className, children }: BreadcrumbPageProps) {
  return (
    <span
      data-slot="krds-breadcrumb-page"
      aria-current="page"
      className={cn(
        "inline-flex h-6 items-center rounded-[6px] px-1",
        "text-krds-foreground text-krds-body-sm underline",
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── BreadcrumbEllipsis (overflow placeholder) ────────────────────────────────

type BreadcrumbEllipsisProps = {
  className?: string;
};

function BreadcrumbEllipsis({ className }: BreadcrumbEllipsisProps) {
  return (
    <span
      data-slot="krds-breadcrumb-ellipsis"
      role="presentation"
      className={cn("text-krds-foreground inline-flex h-6 items-center rounded-[6px] px-1", className)}
    >
      <MoreHorizontal size={16} aria-hidden="true" />
      <span className="sr-only">생략된 경로</span>
    </span>
  );
}

// ─── BreadcrumbSeparator ──────────────────────────────────────────────────────

type BreadcrumbSeparatorProps = {
  className?: string;
  children?: React.ReactNode;
};

function BreadcrumbSeparator({ className, children }: BreadcrumbSeparatorProps) {
  return (
    <li
      data-slot="krds-breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("text-krds-foreground inline-flex items-center", className)}
    >
      {children ?? <ChevronRight size={16} />}
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbHome,
  BreadcrumbPage,
  BreadcrumbEllipsis,
  BreadcrumbSeparator
};
