// rsc:client
"use client";

/**
 * KRDS Header — P5 composition-of-wrappers.
 * Composes: SkipLink → Masthead → logo row → MainMenu row (LanguageSwitcher + Resize).
 * WAI Skip Navigation: SkipLink MUST be the first child of <header> (F7 requirement).
 */

import * as React from "react";
import { cn } from "@/lib/cn";
import { SkipLink } from "@/components/ui/krds/skip-link";
import { Masthead } from "@/components/ui/krds/masthead";
import { MainMenu } from "@/components/ui/krds/main-menu";
import { LanguageSwitcher } from "@/components/ui/krds/language-switcher";
import { Resize } from "@/components/ui/krds/resize";
import type { MainMenuItem } from "@/components/ui/krds/main-menu";
import type { LanguageOption } from "@/components/ui/krds/language-switcher";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Site logo — accepts an <img> or SVG node */
  logo?: React.ReactNode;
  /** Site name displayed next to the logo */
  siteName?: string;
  /** Home href for logo/site-name link */
  homeHref?: string;
  /** Navigation items passed to MainMenu */
  menuItems?: MainMenuItem[];
  /** Available languages for LanguageSwitcher */
  languages?: LanguageOption[];
  /**
   * Authenticated state.
   * true  → shows user-name slot (pass children or userName prop).
   * false → shows "로그인" link.
   */
  isAuthenticated?: boolean;
  /** User display name shown when isAuthenticated=true */
  userName?: string;
  /** Login page href (used when isAuthenticated=false) */
  loginHref?: string;
  /** Slot for additional utility-area elements */
  utilitySlot?: React.ReactNode;
  className?: string;
}

// ─── Default demo menu items ──────────────────────────────────────────────────

const DEFAULT_MENU_ITEMS: MainMenuItem[] = [
  {
    label: "정책정보",
    children: [
      { label: "주요정책", href: "#" },
      { label: "정책자료", href: "#" }
    ]
  },
  {
    label: "알림·소식",
    children: [
      { label: "공지사항", href: "#" },
      { label: "보도자료", href: "#" }
    ]
  },
  { label: "민원서비스", href: "#" },
  { label: "기관소개", href: "#" }
];

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  logo,
  siteName = "대한민국 정부",
  homeHref = "/",
  menuItems = DEFAULT_MENU_ITEMS,
  languages,
  isAuthenticated = false,
  userName,
  loginHref = "/login",
  utilitySlot,
  className,
  ...rest
}: HeaderProps) {
  return (
    <header className={cn("bg-krds-gray-0 border-krds-gray-10 w-full border-b", className)} {...rest}>
      {/* 1. SkipLink — FIRST CHILD per WAI Skip Navigation pattern (F7) */}
      <SkipLink />

      {/* 2. Masthead row */}
      <Masthead />

      {/* 3. Logo row */}
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        <a
          href={homeHref}
          className={cn(
            "inline-flex items-center gap-2",
            "focus-visible:ring-2 focus-visible:outline-none",
            "focus-visible:ring-krds-primary-50 rounded-sm"
          )}
          aria-label={`${siteName} 홈으로 이동`}
        >
          {logo && <span className="shrink-0">{logo}</span>}
          <span className="text-krds-gray-90 text-lg font-bold">{siteName}</span>
        </a>

        {/* Utility area: auth + language + resize */}
        <div className="flex items-center gap-2">
          {utilitySlot}

          {isAuthenticated ? (
            <span className="text-krds-gray-90 text-sm font-medium">
              {userName ?? "사용자"}
              <span className="text-krds-gray-50 ml-0.5 font-normal">님</span>
            </span>
          ) : (
            <a
              href={loginHref}
              className={cn(
                "text-krds-gray-70 text-sm font-medium",
                "hover:text-krds-primary-50 hover:underline",
                "focus-visible:ring-2 focus-visible:outline-none",
                "focus-visible:ring-krds-primary-50 rounded-sm"
              )}
            >
              로그인
            </a>
          )}

          <LanguageSwitcher languages={languages} />
          <Resize />
        </div>
      </div>

      {/* 4. MainMenu row */}
      <div className="border-krds-gray-10 border-t">
        <div className="mx-auto max-w-screen-xl px-2">
          <MainMenu items={menuItems} />
        </div>
      </div>
    </header>
  );
}

export { Header };
