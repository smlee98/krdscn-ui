"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ModeToggle } from "@/components/krds-app/mode-toggle"
import { UISystemToggle } from "@/components/krds-app/ui-system-toggle"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { SearchButton } from "@/components/search-button"
import { normalizePath } from "@/lib/page-tree"
import type { source } from "@/lib/source"

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "컴포넌트" },
  { href: "/docs/registry", label: "레지스트리" },
  { href: "/docs/theming", label: "테마" },
  { href: "/docs/krds-guideline", label: "KRDS 가이드라인" },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="bg-background flex size-7 items-center justify-center rounded-md border">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-5" aria-hidden="true">
          <rect width="256" height="256" fill="none" />
          <line
            x1="208"
            y1="128"
            x2="128"
            y2="208"
            fill="none"
            stroke="#256EF4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
          <line
            x1="192"
            y1="40"
            x2="40"
            y2="192"
            fill="none"
            stroke="#E71825"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
      </span>
      <span className="hidden sm:inline-block">krdscn/ui</span>
    </Link>
  )
}

export function SiteHeader({ tree }: { tree: typeof source.pageTree }) {
  const pathname = normalizePath(usePathname())

  if (pathname.startsWith("/preview")) {
    return null
  }

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--header-height) items-center gap-3">
          <MobileNav tree={tree} items={navItems} className="lg:hidden" />
          <Logo />
          <nav className="ml-3 hidden items-center gap-0 lg:flex">
            {navItems.map((item) => {
              const active =
                item.href === "/docs"
                  ? pathname === normalizePath(item.href)
                  : pathname === normalizePath(item.href) || pathname.startsWith(`${normalizePath(item.href)}/`)

              return (
                <Button key={item.href} asChild variant="ghost" size="sm">
                  <Link
                    href={item.href}
                    data-active={active}
                    className="text-muted-foreground data-[active=true]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
          <div className="ml-auto flex h-8 items-center gap-2">
            <SearchButton />
            <div className="bg-border hidden h-4 w-px shrink-0 lg:block" />
            <UISystemToggle />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
