// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

// ─── InPageNavigation (root) ──────────────────────────────────────────────────

type InPageNavigationProps = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function InPageNavigation({
  className,
  children,
  "aria-label": ariaLabel = "이 페이지의 구성"
}: InPageNavigationProps) {
  return (
    <nav
      data-slot="krds-in-page-navigation"
      aria-label={ariaLabel}
      className={cn("flex w-[160px] flex-col gap-4", className)}
    >
      {children}
    </nav>
  );
}

// ─── InPageNavigationHeader (eyebrow + title wrapper) ─────────────────────────

type InPageNavigationHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

function InPageNavigationHeader({ className, children }: InPageNavigationHeaderProps) {
  return (
    <div data-slot="krds-in-page-navigation-header" className={cn("flex w-full flex-col gap-1", className)}>
      {children}
    </div>
  );
}

// ─── InPageNavigationEyebrow (13px caption) ───────────────────────────────────

type InPageNavigationEyebrowProps = {
  className?: string;
  children?: React.ReactNode;
};

function InPageNavigationEyebrow({ className, children }: InPageNavigationEyebrowProps) {
  return (
    <span
      data-slot="krds-in-page-navigation-eyebrow"
      className={cn("text-krds-foreground text-krds-body-xs", className)}
    >
      {children}
    </span>
  );
}

// ─── InPageNavigationTitle (17px Bold) ────────────────────────────────────────

type InPageNavigationTitleProps = {
  className?: string;
  children?: React.ReactNode;
};

function InPageNavigationTitle({ className, children }: InPageNavigationTitleProps) {
  return (
    <strong
      data-slot="krds-in-page-navigation-title"
      className={cn("text-krds-foreground text-krds-body-md font-bold", className)}
    >
      {children}
    </strong>
  );
}

// ─── InPageNavigationList ─────────────────────────────────────────────────────

type InPageNavigationListProps = {
  className?: string;
  children?: React.ReactNode;
};

function InPageNavigationList({ className, children }: InPageNavigationListProps) {
  return (
    <ul data-slot="krds-in-page-navigation-list" className={cn("flex w-full flex-col gap-1", className)}>
      {children}
    </ul>
  );
}

// ─── InPageNavigationItem ─────────────────────────────────────────────────────

type InPageNavigationItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

function InPageNavigationItem({ className, children, href, active, onClick }: InPageNavigationItemProps) {
  return (
    <li className="w-full">
      <a
        data-slot="krds-in-page-navigation-item"
        href={href}
        onClick={onClick}
        aria-current={active ? "true" : undefined}
        data-active={active || undefined}
        className={cn(
          "flex w-full items-center rounded-[4px] px-2 py-1",
          "text-krds-body-sm",
          "hover:bg-krds-surface-subtler",
          "focus-visible:ring-krds-border-primary focus-visible:ring-2 focus-visible:outline-none",
          active ? "bg-krds-surface-secondary-subtle font-bold text-krds-foreground-secondary" : "text-krds-foreground-subtle",
          className
        )}
      >
        {children}
      </a>
    </li>
  );
}

// ─── InPageNavigationFooter (button + description wrapper) ────────────────────

type InPageNavigationFooterProps = {
  className?: string;
  children?: React.ReactNode;
};

function InPageNavigationFooter({ className, children }: InPageNavigationFooterProps) {
  return (
    <div
      data-slot="krds-in-page-navigation-footer"
      className={cn("flex w-full flex-col items-center gap-2", className)}
    >
      {children}
    </div>
  );
}

// ─── InPageNavigationDescription (15px center caption under button) ───────────

type InPageNavigationDescriptionProps = {
  className?: string;
  children?: React.ReactNode;
};

function InPageNavigationDescription({ className, children }: InPageNavigationDescriptionProps) {
  return (
    <p
      data-slot="krds-in-page-navigation-description"
      className={cn("text-krds-foreground-subtle w-full text-center text-krds-body-sm", className)}
    >
      {children}
    </p>
  );
}

export {
  InPageNavigation,
  InPageNavigationHeader,
  InPageNavigationEyebrow,
  InPageNavigationTitle,
  InPageNavigationList,
  InPageNavigationItem,
  InPageNavigationFooter,
  InPageNavigationDescription
};
