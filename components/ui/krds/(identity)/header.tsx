// rsc:client
"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { SkipLink } from "@/components/ui/dynamic/skip-link";
import { Masthead } from "@/components/ui/dynamic/masthead";

// ─── HeaderUtility ────────────────────────────────────────────────────────────

type HeaderUtilityProps = {
  className?: string;
  children?: React.ReactNode;
};

function HeaderUtility({ className, children }: HeaderUtilityProps) {
  return (
    <div
      data-slot="krds-header-utility"
      className={cn("mx-auto flex h-8 max-w-[1200px] items-center justify-end gap-3 px-4 pt-3", className)}
    >
      {children}
    </div>
  );
}

type HeaderUtilityItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  asSelect?: boolean;
};

function HeaderUtilityItem({ className, children, href, asSelect }: HeaderUtilityItemProps) {
  const baseClass = cn(
    "inline-flex items-center gap-1",
    "text-krds-foreground text-krds-body-sm",
    "hover:underline",
    "focus:krds-focus-ring rounded-sm",
    className
  );
  const content = (
    <>
      {children}
      {asSelect && <ChevronDown size={16} aria-hidden="true" />}
    </>
  );
  if (href) {
    return (
      <a data-slot="krds-header-utility-item" href={href} className={baseClass}>
        {content}
      </a>
    );
  }
  return (
    <button data-slot="krds-header-utility-item" type="button" className={baseClass}>
      {content}
    </button>
  );
}

// Divider between utility items
function HeaderUtilityDivider() {
  return <span aria-hidden="true" className="bg-krds-surface-disabled inline-block h-4 w-px" />;
}

// ─── HeaderBrand ──────────────────────────────────────────────────────────────

type HeaderBrandProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
};

function HeaderBrand({ className, children, href }: HeaderBrandProps) {
  return (
    <a
      data-slot="krds-header-brand"
      href={href}
      className={cn(
        "inline-flex h-12 items-center",
        "text-krds-foreground text-lg font-bold",
        "focus:krds-focus-ring rounded-sm",
        className
      )}
    >
      {children}
    </a>
  );
}

// ─── HeaderActions ────────────────────────────────────────────────────────────

type HeaderActionsProps = {
  className?: string;
  children?: React.ReactNode;
};

function HeaderActions({ className, children }: HeaderActionsProps) {
  return (
    <div data-slot="krds-header-actions" className={cn("flex flex-1 items-start justify-end gap-2", className)}>
      {children}
    </div>
  );
}

type HeaderActionItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
};

function HeaderActionItem({ className, children, href, icon }: HeaderActionItemProps) {
  const baseClass = cn(
    "inline-flex h-10 items-center gap-2 rounded-md px-3",
    "text-krds-body-md font-bold text-krds-foreground",
    "hover:bg-krds-surface-subtler",
    "focus:krds-focus-ring",
    className
  );
  const content = (
    <>
      {icon && (
        <span className="size-5 shrink-0 [&>svg]:size-5" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </>
  );
  if (href) {
    return (
      <a data-slot="krds-header-action-item" href={href} className={baseClass}>
        {content}
      </a>
    );
  }
  return (
    <button data-slot="krds-header-action-item" type="button" className={baseClass}>
      {content}
    </button>
  );
}

// ─── HeaderNav ────────────────────────────────────────────────────────────────

type HeaderNavProps = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function HeaderNav({ className, children, "aria-label": ariaLabel }: HeaderNavProps) {
  return (
    <nav
      data-slot="krds-header-nav"
      aria-label={ariaLabel}
      className={cn("mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-4", className)}
    >
      {children}
    </nav>
  );
}

type HeaderNavItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  hasSubmenu?: boolean;
};

function HeaderNavItem({ className, children, href, hasSubmenu }: HeaderNavItemProps) {
  return (
    <a
      data-slot="krds-header-nav-item"
      href={href}
      className={cn(
        "inline-flex h-14 items-center gap-2 px-4",
        "text-krds-foreground-subtle text-krds-body-lg font-bold",
        "hover:text-krds-foreground",
        "focus:krds-focus-ring rounded-sm",
        className
      )}
    >
      {children}
      {hasSubmenu && <ChevronDown size={20} aria-hidden="true" />}
    </a>
  );
}

// ─── Header (root) ────────────────────────────────────────────────────────────

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

function Header({ className, children }: HeaderProps) {
  const childrenArray = React.Children.toArray(children);

  const utilityChild = childrenArray.find((c) => React.isValidElement(c) && c.type === HeaderUtility);
  const navChild = childrenArray.find((c) => React.isValidElement(c) && c.type === HeaderNav);
  const topChildren = childrenArray.filter(
    (c) => !(React.isValidElement(c) && c.type === HeaderUtility) && !(React.isValidElement(c) && c.type === HeaderNav)
  );

  return (
    <header data-slot="krds-header" className={cn("w-full", className)}>
      <SkipLink href="#main-content">본문 바로가기</SkipLink>
      <Masthead />
      <div className="bg-krds-surface w-full">
        {utilityChild}
        <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-4 pb-4">{topChildren}</div>
      </div>
      {navChild && <div className="border-krds-border-light bg-krds-surface w-full border-y">{navChild}</div>}
    </header>
  );
}

export {
  Header,
  HeaderBrand,
  HeaderUtility,
  HeaderUtilityItem,
  HeaderUtilityDivider,
  HeaderActions,
  HeaderActionItem,
  HeaderNav,
  HeaderNavItem
};
