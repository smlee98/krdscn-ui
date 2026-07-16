"use client"

import * as React from "react"
import Link from "next/link"

import { ComponentSidebarMarker, docsSections } from "@/components/docs/docs-sidebar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getPagesFromFolder } from "@/lib/page-tree"
import type { source } from "@/lib/source"
import { cn } from "@/lib/cn"

export function MobileNav({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree
  items: { href: string; label: string }[]
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  const componentsFolder = tree.children.find((item) => item.$id === "components" && item.type === "folder")
  const componentPages = componentsFolder?.type === "folder" ? getPagesFromFolder(componentsFolder) : []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className={cn(
            "touch-manipulation hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent",
            className
          )}
        >
          <div className="relative size-4">
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                open ? "top-[0.4rem] -rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                open ? "top-[0.4rem] rotate-45" : "top-2.5"
              )}
            />
          </div>
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100 data-[state=open]:animate-none!"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-10 px-4 py-6">
          <MobileNavGroup title="메뉴">
            {items.map((item) => (
              <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                {item.label}
              </MobileLink>
            ))}
          </MobileNavGroup>
          <MobileNavGroup title="섹션">
            {docsSections.map((item) => (
              <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                {item.title}
              </MobileLink>
            ))}
          </MobileNavGroup>
          {componentPages.length > 0 && (
            <MobileNavGroup title="컴포넌트">
              {componentPages.map((page) => (
                <MobileLink key={page.url} href={page.url} onOpenChange={setOpen}>
                  {page.name}
                  <ComponentSidebarMarker slug={page.$id} />
                </MobileLink>
              ))}
            </MobileNavGroup>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function MobileNavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-muted-foreground text-sm font-medium">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn("text-foreground flex items-center gap-2 text-lg font-medium", className)}
    >
      {children}
    </Link>
  )
}
