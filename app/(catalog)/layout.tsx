import type { ReactNode } from "react";

import { KrdsAppShell } from "@/components/krds-app/app-shell";
import { UISystemProvider } from "@/lib/ui-system";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return (
    <UISystemProvider>
      <KrdsAppShell>{children}</KrdsAppShell>
    </UISystemProvider>
  );
}
