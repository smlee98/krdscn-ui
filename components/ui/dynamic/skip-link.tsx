"use client"
import { SkipLink as KrdsSkipLink } from "@/components/ui/krds/(navigation)/skip-link"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

type SkipLinkProps = React.ComponentProps<typeof KrdsSkipLink>

// Dual-render dispatcher (cf. accordion.tsx). KRDS mode keeps the chromed
// KrdsSkipLink; shadcn mode degrades to an always-visible, shadcn-token styled
// inline anchor. The KRDS-only visual chrome (fixed bar height/width, gray-90
// fill) is intentionally dropped.

export function SkipLink({ className, href = "#main-content", children = "본문 바로가기" }: SkipLinkProps) {
  const system = useUISystem()
  if (system === "krds") {
    return (
      <KrdsSkipLink className={className} href={href}>
        {children}
      </KrdsSkipLink>
    )
  }
  return (
    <a
      href={href}
      className={cn(
        "bg-background text-foreground inline-flex items-center rounded-md px-4 py-2 no-underline",
        "ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        "border-border border",
        className
      )}
    >
      {children}
    </a>
  )
}

export type { SkipLinkProps }
