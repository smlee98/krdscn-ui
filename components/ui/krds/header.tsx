// rsc:client
"use client";

/**
 * KRDS Header — composition pattern.
 * Usage:
 *   <Header>
 *     <HeaderBrand href="/">사이트명</HeaderBrand>
 *     <HeaderActions><HeaderActionButton>로그인</HeaderActionButton></HeaderActions>
 *     <HeaderNav>
 *       <HeaderNavItem href="#">메뉴</HeaderNavItem>
 *     </HeaderNav>
 *   </Header>
 *
 * Header automatically places Brand + Actions in the top row and Nav in the bottom row.
 * WAI Skip Navigation: SkipLink is always the first child (F7 requirement).
 */

import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";
import { SkipLink } from "@/components/ui/krds/skip-link";
import { Masthead } from "@/components/ui/krds/masthead";

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeaderBrand({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="krds-header-brand"
      className={cn(
        "inline-flex items-center gap-2",
        "text-krds-gray-90 text-lg font-bold",
        "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
}

function HeaderNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="krds-header-nav"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function HeaderNavItem({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="krds-header-nav-item"
      className={cn(
        "px-3 py-2 text-sm font-medium",
        "text-krds-gray-70 hover:text-krds-gray-90 hover:bg-krds-gray-5",
        "rounded-md transition-colors",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
}

function HeaderActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-header-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function HeaderActionButton({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="krds-header-action-button"
      className={cn(
        "text-krds-gray-70 text-sm font-medium",
        "hover:text-krds-primary-50 hover:underline",
        "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  );
}

// ─── Header (root) ────────────────────────────────────────────────────────────

function Header({ className, children, ...props }: React.ComponentProps<"header">) {
  // Separate Nav from Brand+Actions so they can be placed in different layout rows
  const childrenArray = React.Children.toArray(children);
  const navChild = childrenArray.find(
    (c) => React.isValidElement(c) && c.type === HeaderNav
  );
  const topChildren = childrenArray.filter(
    (c) => !(React.isValidElement(c) && c.type === HeaderNav)
  );

  return (
    <header
      data-slot="krds-header"
      className={cn("bg-krds-gray-0 border-krds-gray-10 w-full border-b", className)}
      {...props}
    >
      {/* 1. SkipLink — FIRST CHILD per WAI Skip Navigation pattern (F7) */}
      <SkipLink />

      {/* 2. Masthead row */}
      <Masthead />

      {/* 3. Brand + Actions row */}
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        {topChildren}
      </div>

      {/* 4. Nav row (only rendered when HeaderNav is present) */}
      {navChild && (
        <div className="border-krds-gray-10 border-t">
          <div className="mx-auto max-w-screen-xl px-4 py-1">{navChild}</div>
        </div>
      )}
    </header>
  );
}

export {
  Header,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem,
  HeaderActions,
  HeaderActionButton,
};
