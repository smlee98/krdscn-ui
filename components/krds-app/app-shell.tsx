// rsc:client
"use client";

import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { KrdsSidebar } from "@/components/krds-app/sidebar";
import { KrdsPageHeader } from "@/components/krds-app/page-header";
import { ThemeProvider } from "@/components/krds-app/theme-provider";

export { KrdsAppShell };

function KrdsAppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <KrdsSidebar />
        <SidebarInset>
          <KrdsPageHeader />
          <div className="px-6 py-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
