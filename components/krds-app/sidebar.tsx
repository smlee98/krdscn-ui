// rsc:client
"use client";

import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/cn";
import { SIDEBAR_GROUPS } from "@/lib/sidebar-nav";

export { KrdsSidebar };

function KrdsSidebar() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>("h2[data-section-id]");
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.sectionId;
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: "-10% 0px -75% 0px" }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }

  return (
    <Sidebar collapsible="none" className="sticky top-0 h-svh w-56 shrink-0">
      <SidebarContent aria-label="컴포넌트 네비게이션">
        {SIDEBAR_GROUPS.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel className="text-krds-gray-50 text-[10px] font-semibold tracking-widest uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) =>
                  item.implemented ? (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={activeId === item.id}
                        className={cn(
                          activeId === item.id
                            ? "bg-krds-primary-5 text-krds-primary-60 font-medium"
                            : "text-krds-gray-70 hover:bg-krds-gray-5 hover:text-krds-gray-90"
                        )}
                      >
                        <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
                          {item.labelKo}
                        </a>
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
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
