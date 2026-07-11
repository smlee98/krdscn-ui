"use client"

import * as React from "react"
import * as Krds from "@/components/ui/krds/(navigation)/breadcrumb"
import * as Shadcn from "@/components/ui/breadcrumb"
import { useUISystem } from "@/lib/ui-system"
import { Home } from "lucide-react"
import { cn } from "@/lib/cn"

export function Breadcrumb(props: React.ComponentProps<typeof Krds.Breadcrumb>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.Breadcrumb {...props} /> : <Shadcn.Breadcrumb {...props} />
}

export function BreadcrumbList(props: React.ComponentProps<typeof Krds.BreadcrumbList>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.BreadcrumbList {...props} /> : <Shadcn.BreadcrumbList {...props} />
}

export function BreadcrumbItem(props: React.ComponentProps<typeof Krds.BreadcrumbItem>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.BreadcrumbItem {...props} /> : <Shadcn.BreadcrumbItem {...props} />
}

export function BreadcrumbLink(props: React.ComponentProps<typeof Krds.BreadcrumbLink>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.BreadcrumbLink {...props} /> : <Shadcn.BreadcrumbLink {...props} />
}

export function BreadcrumbPage(props: React.ComponentProps<typeof Krds.BreadcrumbPage>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.BreadcrumbPage {...props} /> : <Shadcn.BreadcrumbPage {...props} />
}

export function BreadcrumbSeparator(props: React.ComponentProps<typeof Krds.BreadcrumbSeparator>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.BreadcrumbSeparator {...props} /> : <Shadcn.BreadcrumbSeparator {...props} />
}

export function BreadcrumbEllipsis(props: React.ComponentProps<typeof Krds.BreadcrumbEllipsis>) {
  const system = useUISystem()
  return system === "krds" ? <Krds.BreadcrumbEllipsis {...props} /> : <Shadcn.BreadcrumbEllipsis {...props} />
}

// Dual-render dispatcher. KRDS keeps the chromed BreadcrumbHome; shadcn
// degrades to a plain breadcrumb link with a lucide Home icon (shadcn has no
// Home subpart).
export function BreadcrumbHome({
  className,
  children = "홈",
  href = "/",
  ...rest
}: React.ComponentProps<typeof Krds.BreadcrumbHome>) {
  const system = useUISystem()
  if (system === "krds") {
    return (
      <Krds.BreadcrumbHome className={className} href={href} {...rest}>
        {children}
      </Krds.BreadcrumbHome>
    )
  }
  // inline-flex + items-center: Tailwind Preflight makes <svg> display:block, so
  // without flex the Home icon and label stack vertically inside the <a>.
  return (
    <Shadcn.BreadcrumbLink href={href} className={cn("inline-flex items-center gap-1.5", className)} {...rest}>
      <Home size={16} aria-hidden="true" />
      {children}
    </Shadcn.BreadcrumbLink>
  )
}
