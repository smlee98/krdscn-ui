// rsc:safe
import * as React from "react";
import { ArrowRight, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── MainMenu (root) ──────────────────────────────────────────────────────────

type MainMenuProps = {
  className?: string;
  children?: React.ReactNode;
};

function MainMenu({ className, children }: MainMenuProps) {
  return (
    <div data-slot="krds-main-menu" className={cn("bg-krds-gray-0 flex w-full flex-col items-center", className)}>
      {children}
    </div>
  );
}

// ─── MainMenuBar ──────────────────────────────────────────────────────────────

type MainMenuBarProps = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function MainMenuBar({ className, children, "aria-label": ariaLabel }: MainMenuBarProps) {
  return (
    <nav
      data-slot="krds-main-menu-bar"
      aria-label={ariaLabel}
      className={cn("border-krds-gray-20 bg-krds-gray-0 w-full border-y", className)}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-4 px-4">{children}</div>
    </nav>
  );
}

type MainMenuBarItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  hasSubmenu?: boolean;
};

function MainMenuBarItem({ className, children, href, hasSubmenu }: MainMenuBarItemProps) {
  return (
    <a
      data-slot="krds-main-menu-bar-item"
      href={href}
      className={cn(
        "inline-flex h-14 items-center gap-2 px-4",
        "text-krds-gray-70 text-krds-body-lg font-bold",
        "hover:text-krds-gray-90",
        "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      {children}
      {hasSubmenu && <ChevronDown size={20} aria-hidden="true" />}
    </a>
  );
}

// ─── MainMenuPanel (open content area below bar) ──────────────────────────────

type MainMenuPanelProps = {
  className?: string;
  children?: React.ReactNode;
};

function MainMenuPanel({ className, children }: MainMenuPanelProps) {
  return (
    <div data-slot="krds-main-menu-panel" className={cn("mx-auto flex w-full max-w-[1200px]", className)}>
      {children}
    </div>
  );
}

// ─── MainMenuPanelHeader (title row container) ────────────────────────────────

function MainMenuPanelHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="krds-main-menu-panel-header" className={cn("flex h-14 items-center px-1", className)} {...props}>
      <span className="text-krds-gray-90 text-krds-heading-md font-bold">{children}</span>
    </div>
  );
}

// ─── MainMenuPanelShortcut (바로가기 link) ────────────────────────────────────

function MainMenuPanelShortcut({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="krds-main-menu-panel-shortcut"
      className={cn(
        "inline-flex items-center gap-0.5 px-0.5",
        "text-krds-gray-90 text-krds-body-sm",
        "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      <span className="underline">{children ?? "바로가기"}</span>
      <ChevronRight size={16} aria-hidden="true" />
    </a>
  );
}

// ─── MainMenuPanelSidebar (optional sidebar column) ──────────────────────────

function MainMenuPanelSidebar({ className, children, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="krds-main-menu-panel-sidebar"
      className={cn("bg-krds-secondary-5 flex w-[266px] flex-col py-4", className)}
      {...props}
    >
      {children}
    </aside>
  );
}

// ─── MainMenuColumn (column of last-depth items) ──────────────────────────────

type MainMenuColumnProps = {
  className?: string;
  children?: React.ReactNode;
};

function MainMenuColumn({ className, children }: MainMenuColumnProps) {
  return (
    <div data-slot="krds-main-menu-column" className={cn("flex min-w-0 flex-1 flex-col gap-2", className)}>
      {children}
    </div>
  );
}

// ─── MainMenuLink (last-depth bulleted link) ──────────────────────────────────

type MainMenuLinkProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  external?: boolean;
};

function MainMenuLink({ className, children, href, external }: MainMenuLinkProps) {
  return (
    <a
      data-slot="krds-main-menu-link"
      href={href}
      className={cn(
        "flex items-center gap-1 rounded-md px-2 py-2.5",
        "text-krds-gray-90 text-krds-body-md",
        "hover:bg-krds-gray-5",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <span className="flex items-center pr-2">
        <span aria-hidden="true" className="bg-krds-gray-90 inline-block size-1 rounded-full" />
      </span>
      <span className="flex-1">{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
    </a>
  );
}

// ─── MainMenuSidebarItem (2-depth sidebar row) ────────────────────────────────

type MainMenuSidebarItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  active?: boolean;
  hasMore?: boolean;
  external?: boolean;
};

function MainMenuSidebarItem({ className, children, href, active, hasMore, external }: MainMenuSidebarItemProps) {
  const showArrow = hasMore || active;
  return (
    <a
      data-slot="krds-main-menu-sidebar-item"
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center px-6 py-4",
        "text-krds-body-md",
        "focus-visible:ring-krds-primary-50 focus-visible:ring-2 focus-visible:outline-none",
        showArrow ? "gap-6" : "gap-2",
        active ? "bg-krds-gray-0 font-bold text-[#052b57]" : "text-krds-gray-90",
        className
      )}
    >
      <span className={cn(showArrow ? "min-w-0 flex-1" : "")}>{children}</span>
      {external && <ExternalLink size={20} aria-hidden="true" />}
      {showArrow && !external && <ArrowRight size={20} aria-hidden="true" />}
      {!showArrow && !external && <ChevronRight size={20} aria-hidden="true" />}
    </a>
  );
}

export {
  MainMenu,
  MainMenuBar,
  MainMenuBarItem,
  MainMenuPanel,
  MainMenuPanelHeader,
  MainMenuPanelShortcut,
  MainMenuPanelSidebar,
  MainMenuColumn,
  MainMenuLink,
  MainMenuSidebarItem
};
