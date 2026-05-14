// rsc:client
"use client";

import { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "next-themes";

export { KrdsPageHeader };

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
        KRDS
      </ToggleGroupItem>
      <ToggleGroupItem value="shadcn" aria-label="shadcn 기본">
        shadcn
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function KrdsPageHeader() {
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
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>KRDS 컴포넌트 라이브러리</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ThemeToggle />
    </header>
  );
}
