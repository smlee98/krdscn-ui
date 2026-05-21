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
        "text-krds-gray-70 text-[19px] leading-[1.5] font-bold",
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
  title?: React.ReactNode;
  shortcutHref?: string;
  shortcutLabel?: React.ReactNode;
  sidebar?: React.ReactNode;
};

function MainMenuPanel({
  className,
  children,
  title,
  shortcutHref,
  shortcutLabel = "바로가기",
  sidebar
}: MainMenuPanelProps) {
  const titleRow = title && (
    <div className="flex w-full items-center gap-4">
      <div className="flex h-14 items-center px-1">
        <span className="text-krds-gray-90 text-[24px] leading-[1.5] font-bold">{title}</span>
      </div>
      {shortcutHref && (
        <a
          href={shortcutHref}
          className={cn(
            "inline-flex items-center gap-0.5 px-0.5",
            "text-krds-gray-90 text-[15px] leading-[1.5]",
            "focus-visible:ring-krds-primary-50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          )}
        >
          <span className="underline">{shortcutLabel}</span>
          <ChevronRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  );

  if (sidebar) {
    return (
      <div
        data-slot="krds-main-menu-panel"
        className={cn("mx-auto flex w-full max-w-[1200px] items-stretch", className)}
      >
        <aside className="bg-krds-secondary-5 flex w-[266px] flex-col py-4">{sidebar}</aside>
        <div className="bg-krds-gray-0 flex flex-1 flex-col gap-4 px-10 py-4">
          {titleRow}
          <div className="flex w-full items-start gap-6">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      data-slot="krds-main-menu-panel"
      className={cn("bg-krds-gray-0 mx-auto flex w-full max-w-[1200px] flex-col gap-4 px-4 py-4", className)}
    >
      {titleRow}
      <div className="flex w-full items-start gap-6">{children}</div>
    </div>
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
        "text-krds-gray-90 text-[17px] leading-[1.5]",
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
        "text-[17px] leading-[1.5]",
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

export { MainMenu, MainMenuBar, MainMenuBarItem, MainMenuPanel, MainMenuColumn, MainMenuLink, MainMenuSidebarItem };
