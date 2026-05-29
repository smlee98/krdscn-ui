"use client";

import * as React from "react";
import * as Krds from "@/components/ui/krds/(navigation)/breadcrumb";
import * as Shadcn from "@/components/ui/breadcrumb";
import { useUISystem } from "@/lib/ui-system";

export function Breadcrumb(props: React.ComponentProps<typeof Krds.Breadcrumb>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.Breadcrumb {...props} /> : <Shadcn.Breadcrumb {...props} />;
}

export function BreadcrumbList(props: React.ComponentProps<typeof Krds.BreadcrumbList>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.BreadcrumbList {...props} /> : <Shadcn.BreadcrumbList {...props} />;
}

export function BreadcrumbItem(props: React.ComponentProps<typeof Krds.BreadcrumbItem>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.BreadcrumbItem {...props} /> : <Shadcn.BreadcrumbItem {...props} />;
}

export function BreadcrumbLink(props: React.ComponentProps<typeof Krds.BreadcrumbLink>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.BreadcrumbLink {...props} /> : <Shadcn.BreadcrumbLink {...props} />;
}

export function BreadcrumbPage(props: React.ComponentProps<typeof Krds.BreadcrumbPage>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.BreadcrumbPage {...props} /> : <Shadcn.BreadcrumbPage {...props} />;
}

export function BreadcrumbSeparator(props: React.ComponentProps<typeof Krds.BreadcrumbSeparator>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.BreadcrumbSeparator {...props} /> : <Shadcn.BreadcrumbSeparator {...props} />;
}

export function BreadcrumbEllipsis(props: React.ComponentProps<typeof Krds.BreadcrumbEllipsis>) {
  const system = useUISystem();
  return system === "krds" ? <Krds.BreadcrumbEllipsis {...props} /> : <Shadcn.BreadcrumbEllipsis {...props} />;
}

// KRDS-only subpart — shadcn has no equivalent.
export function BreadcrumbHome(props: React.ComponentProps<typeof Krds.BreadcrumbHome>) {
  return <Krds.BreadcrumbHome {...props} />;
}
