// rsc:client
"use client";

import { useContext } from "react";
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

// Unified toggle: changes BOTH color theme (next-themes data-theme) and
// component dispatch system (UISystem context) together.
// Value source: useUISystem() — hydration-safe (useSyncExternalStore with
// matching server/client snapshots); no mounted gate needed.
function SystemToggle() {
  const system = useUISystem();
  const { setTheme } = useTheme();
  const { setSystem } = useContext(UISystemContext);

  return (
    <ToggleGroup
      type="single"
      value={system}
      onValueChange={(value) => {
        if (value) {
          setTheme(value);
          setSystem(value as UISystem);
        }
      }}
      variant="outline"
      size="sm"
      data-slot="krds-system-toggle"
      aria-label="UI 시스템 토글"
    >
      <ToggleGroupItem value="krds" aria-label="KRDS 컴포넌트">
        <KrdsLogo className="size-4" />
        KRDS
      </ToggleGroupItem>
      <ToggleGroupItem value="shadcn" aria-label="shadcn 컴포넌트">
        <ShadcnLogo className="size-4" />
        shadcn/ui
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
      <SystemToggle />
    </header>
  );
}
