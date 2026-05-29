"use client";

import * as React from "react";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";
import {
  MainMenu as KrdsMainMenu,
  MainMenuBar as KrdsMainMenuBar,
  MainMenuBarItem as KrdsMainMenuBarItem,
  MainMenuColumn as KrdsMainMenuColumn,
  MainMenuLink as KrdsMainMenuLink,
  MainMenuPanel as KrdsMainMenuPanel,
  MainMenuPanelHeader as KrdsMainMenuPanelHeader,
  MainMenuPanelShortcut as KrdsMainMenuPanelShortcut,
  MainMenuPanelSidebar as KrdsMainMenuPanelSidebar,
  MainMenuSidebarItem as KrdsMainMenuSidebarItem
} from "@/components/ui/krds/(navigation)/main-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx). The
// public surface is the KRDS MainMenu compound API; each part renders either the
// KRDS-chromed wrapper or the vanilla shadcn NavigationMenu primitive based on
// <UISystemProvider>.
//
// Structural note: the KRDS compound lays the open panel out as a SIBLING of the
// bar (always-visible mega-menu), while Radix NavigationMenu nests Content inside
// an Item next to its Trigger and gates it on open-state. Because each exported
// part dispatches independently (matching accordion/modal), the shadcn path maps
// the closest standalone primitive per part rather than reproducing Radix's strict
// Trigger↔Content nesting. KRDS chevrons are dropped where the shadcn primitive
// supplies its own (Trigger). KRDS-only layout props with no NavigationMenu axis
// (active / hasMore on the sidebar item) are mapped to data-active or dropped.

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnMainMenu({ className, children }: React.ComponentProps<typeof KrdsMainMenu>) {
  return (
    <NavigationMenu viewport={false} className={cn("max-w-full", className)}>
      {children}
    </NavigationMenu>
  );
}

function ShadcnMainMenuBar({ className, children, ...rest }: React.ComponentProps<typeof KrdsMainMenuBar>) {
  const { "aria-label": ariaLabel } = rest;
  return (
    <NavigationMenuList aria-label={ariaLabel} className={className}>
      {children}
    </NavigationMenuList>
  );
}

function ShadcnMainMenuBarItem({
  className,
  children,
  href,
  hasSubmenu
}: React.ComponentProps<typeof KrdsMainMenuBarItem>) {
  // hasSubmenu selects Trigger (own chevron) vs Link; KRDS ChevronDown is dropped.
  return (
    <NavigationMenuItem>
      {hasSubmenu ? (
        <NavigationMenuTrigger className={className}>{children}</NavigationMenuTrigger>
      ) : (
        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), className)}>
          <a href={href}>{children}</a>
        </NavigationMenuLink>
      )}
    </NavigationMenuItem>
  );
}

function ShadcnMainMenuPanel({ className, children }: React.ComponentProps<typeof KrdsMainMenuPanel>) {
  return <NavigationMenuContent className={className}>{children}</NavigationMenuContent>;
}

function ShadcnMainMenuPanelHeader({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof KrdsMainMenuPanelHeader>) {
  return (
    <div className={cn("flex h-14 items-center px-1", className)} {...rest}>
      <span className="text-lg font-bold">{children}</span>
    </div>
  );
}

function ShadcnMainMenuPanelShortcut({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof KrdsMainMenuPanelShortcut>) {
  return (
    <NavigationMenuLink asChild>
      <a className={cn("inline-flex items-center gap-0.5 px-0.5 text-sm", className)} {...rest}>
        <span className="underline">{children ?? "바로가기"}</span>
        <ChevronRight size={16} aria-hidden="true" />
      </a>
    </NavigationMenuLink>
  );
}

function ShadcnMainMenuPanelSidebar({
  className,
  children,
  ...rest
}: React.ComponentProps<typeof KrdsMainMenuPanelSidebar>) {
  return (
    <aside className={cn("bg-muted flex w-[266px] flex-col py-4", className)} {...rest}>
      {children}
    </aside>
  );
}

function ShadcnMainMenuColumn({ className, children }: React.ComponentProps<typeof KrdsMainMenuColumn>) {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>{children}</div>;
}

function ShadcnMainMenuLink({ className, children, href, external }: React.ComponentProps<typeof KrdsMainMenuLink>) {
  return (
    <NavigationMenuLink asChild>
      <a href={href} className={cn("flex items-center gap-1 px-2 py-2.5 text-sm", className)}>
        <span className="flex-1">{children}</span>
        {external && <ExternalLink size={20} aria-hidden="true" />}
      </a>
    </NavigationMenuLink>
  );
}

function ShadcnMainMenuSidebarItem({
  className,
  children,
  href,
  active,
  hasMore,
  external
}: React.ComponentProps<typeof KrdsMainMenuSidebarItem>) {
  // active → data-active (NavigationMenuLink styles data-[active=true]); hasMore →
  // trailing arrow parity. The KRDS chevron-vs-arrow split collapses here.
  const showArrow = hasMore || active;
  return (
    <NavigationMenuLink asChild active={active}>
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn("flex w-full items-center gap-2 px-6 py-4 text-sm", showArrow && "gap-6", className)}
      >
        <span className={cn(showArrow && "min-w-0 flex-1")}>{children}</span>
        {external && <ExternalLink size={20} aria-hidden="true" />}
        {showArrow && !external && <ArrowRight size={20} aria-hidden="true" />}
        {!showArrow && !external && <ChevronRight size={20} aria-hidden="true" />}
      </a>
    </NavigationMenuLink>
  );
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function MainMenu(props: React.ComponentProps<typeof KrdsMainMenu>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenu {...props} />;
  return <ShadcnMainMenu {...props} />;
}

export function MainMenuBar(props: React.ComponentProps<typeof KrdsMainMenuBar>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuBar {...props} />;
  return <ShadcnMainMenuBar {...props} />;
}

export function MainMenuBarItem(props: React.ComponentProps<typeof KrdsMainMenuBarItem>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuBarItem {...props} />;
  return <ShadcnMainMenuBarItem {...props} />;
}

export function MainMenuPanel(props: React.ComponentProps<typeof KrdsMainMenuPanel>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuPanel {...props} />;
  return <ShadcnMainMenuPanel {...props} />;
}

export function MainMenuPanelHeader(props: React.ComponentProps<typeof KrdsMainMenuPanelHeader>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuPanelHeader {...props} />;
  return <ShadcnMainMenuPanelHeader {...props} />;
}

export function MainMenuPanelShortcut(props: React.ComponentProps<typeof KrdsMainMenuPanelShortcut>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuPanelShortcut {...props} />;
  return <ShadcnMainMenuPanelShortcut {...props} />;
}

export function MainMenuPanelSidebar(props: React.ComponentProps<typeof KrdsMainMenuPanelSidebar>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuPanelSidebar {...props} />;
  return <ShadcnMainMenuPanelSidebar {...props} />;
}

export function MainMenuColumn(props: React.ComponentProps<typeof KrdsMainMenuColumn>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuColumn {...props} />;
  return <ShadcnMainMenuColumn {...props} />;
}

export function MainMenuLink(props: React.ComponentProps<typeof KrdsMainMenuLink>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuLink {...props} />;
  return <ShadcnMainMenuLink {...props} />;
}

export function MainMenuSidebarItem(props: React.ComponentProps<typeof KrdsMainMenuSidebarItem>) {
  const system = useUISystem();
  if (system === "krds") return <KrdsMainMenuSidebarItem {...props} />;
  return <ShadcnMainMenuSidebarItem {...props} />;
}
