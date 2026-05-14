import type { ReactNode } from "react";

import { KrdsAppShell } from "@/components/krds-app/app-shell";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return <KrdsAppShell>{children}</KrdsAppShell>;
}
