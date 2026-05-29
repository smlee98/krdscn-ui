"use client";
import { SkipLink as KrdsSkipLink } from "@/components/ui/krds/(navigation)/skip-link";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

type SkipLinkProps = React.ComponentProps<typeof KrdsSkipLink>;

// Dual-render dispatcher (cf. accordion.tsx). KRDS mode keeps the chromed
// KrdsSkipLink; shadcn mode degrades to a vanilla accessibility skip link —
// visually hidden until focused, then surfaced via shadcn tokens. The KRDS-only
// visual chrome (fixed bar height/width, gray-90 fill) is intentionally dropped.

export function SkipLink({ className, href = "#main-content", children = "본문 바로가기" }: SkipLinkProps) {
  const system = useUISystem();
  if (system === "krds") {
    return (
      <KrdsSkipLink className={className} href={href}>
        {children}
      </KrdsSkipLink>
    );
  }
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "focus:inline-flex focus:items-center focus:rounded-md focus:px-4 focus:py-2",
        "focus:bg-background focus:text-foreground focus:no-underline",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      {children}
    </a>
  );
}

export type { SkipLinkProps };
