// rsc:client
"use client";

import { useContext, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";
import { KrdsLogo } from "../logo/krds";
import { ShadcnLogo } from "../logo/shadcn";
import { UISystemContext, useUISystem, type UISystem } from "@/lib/ui-system";

export { KrdsPageHeader };

// useSyncExternalStore-based mount check: avoids setState-in-effect lint rule
// server snapshot = false (not mounted), client snapshot = true (mounted)
const isMounted = () => true;
const isNotMounted = () => false;
const noSubscribe = () => () => {};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noSubscribe, isMounted, isNotMounted);

  return (
    <ToggleGroup
      type="single"
      value={mounted ? (theme ?? "krds") : "krds"}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      variant="outline"
      size="sm"
      data-slot="krds-theme-toggle"
      aria-label="컬러셋 토글"
    >
      <ToggleGroupItem value="krds" aria-label="KRDS 컬러">
        <KrdsLogo className="size-4" />
        KRDS
      </ToggleGroupItem>
      <ToggleGroupItem value="shadcn" aria-label="shadcn 기본">
        <ShadcnLogo className="size-4" />
        shadcn/ui
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

// UISystemToggle reads system via useUISystem() (useSyncExternalStore — hydration-safe,
// no mounted guard needed: getServerSnapshot returns "krds" matching SSR output)
function UISystemToggle() {
  const system = useUISystem();
  const { setSystem } = useContext(UISystemContext);

  return (
    <ToggleGroup
      type="single"
      value={system}
      onValueChange={(value) => {
        if (value) setSystem(value as UISystem);
      }}
      variant="outline"
      size="sm"
      data-slot="krds-ui-system-toggle"
      aria-label="UI 시스템 토글"
    >
      <ToggleGroupItem value="krds" aria-label="KRDS 컴포넌트">
        <KrdsLogo className="size-4" />
        KRDS
      </ToggleGroupItem>
      <ToggleGroupItem value="shadcn" aria-label="shadcn 컴포넌트">
        <ShadcnLogo className="size-4" />
        shadcn
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function useBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 3 && segments[0] === "components") {
    const group = SIDEBAR_GROUPS.find((g) => g.id === segments[1]);
    const item = group?.items.find((i) => i.id === segments[2]);
    if (group && item) {
      return { groupTitle: group.title, itemLabel: item.labelKo };
    }
  }
  return null;
}

function KrdsPageHeader() {
  const crumbs = useBreadcrumb();

  return (
    <header
      data-slot="krds-page-header"
      className="bg-background sticky top-0 z-30 flex w-full shrink-0 items-center gap-2 border-b px-6 py-2.5"
    >
      <div className="mr-auto flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4!" />
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="text-muted-foreground">{crumbs.groupTitle}</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{crumbs.itemLabel}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>홈</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator orientation="vertical" className="h-4!" />
      <UISystemToggle />
      <ThemeToggle />
    </header>
  );
}
