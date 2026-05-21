// rsc:client
"use client";

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
import { cn } from "@/lib/cn";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";

export { KrdsSidebar };

function KrdsSidebar() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";

  return (
    <Sidebar collapsible="none" className="sticky top-0 h-svh w-56 shrink-0">
      <SidebarContent aria-label="컴포넌트 네비게이션">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isHomeActive}
                  className={cn(
                    isHomeActive
                      ? "bg-krds-primary-5 text-krds-primary-60 font-medium"
                      : "text-krds-gray-70 hover:bg-krds-gray-5 hover:text-krds-gray-90"
                  )}
                >
                  <Link href="/" aria-current={isHomeActive ? "page" : undefined}>
                    홈
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {SIDEBAR_GROUPS.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel className="text-krds-gray-50 text-[10px] font-semibold tracking-widest uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
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
                      <SidebarMenuButton disabled aria-disabled="true" className="text-krds-gray-30 cursor-not-allowed">
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
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
