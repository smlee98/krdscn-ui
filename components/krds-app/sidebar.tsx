// rsc:client
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";

export { KrdsSidebar };

function KrdsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  return (
    <Sidebar collapsible="none" className="sticky top-0 h-svh w-56 shrink-0">
      <SidebarContent aria-label="컴포넌트 네비게이션">
        <div className="px-3 py-2">
          <Input
            type="search"
            placeholder="컴포넌트 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 text-sm"
            aria-label="사이드바 검색"
          />
        </div>
        {SIDEBAR_GROUPS.map((group) => {
          const filteredItems = q
            ? group.items.filter(
                (item) => item.labelKo.toLowerCase().includes(q) || item.labelEn.toLowerCase().includes(q)
              )
            : group.items;

          if (filteredItems.length === 0) return null;

          return (
            <SidebarGroup key={group.id}>
              <SidebarGroupLabel className="text-krds-gray-50 text-[10px] font-semibold tracking-widest uppercase">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredItems.map((item) => {
                    const href = `/components/${group.id}/${item.id}`;
                    const isActive = pathname === href;
                    return item.implemented ? (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className={cn(
                            isActive
                              ? "bg-krds-primary-5 text-krds-primary-60 font-medium"
                              : "text-krds-gray-70 hover:bg-krds-gray-5 hover:text-krds-gray-90"
                          )}
                        >
                          <Link href={href} aria-current={isActive ? "page" : undefined}>
                            {item.labelKo}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ) : (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          disabled
                          aria-disabled="true"
                          className="text-krds-gray-30 cursor-not-allowed"
                        >
                          <span>
                            {item.labelKo} <span className="text-xs">(준비중)</span>
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
