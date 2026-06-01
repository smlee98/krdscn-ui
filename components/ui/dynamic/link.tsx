"use client";

import type * as React from "react";

import { Link as KrdsLink } from "@/components/ui/krds/(action)/link";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

// Public surface stays the KRDS Link API; the active <UISystemProvider> decides
// whether each Link renders KRDS chrome or a vanilla shadcn anchor.
export type LinkProps = React.ComponentProps<typeof KrdsLink>;

export type { LinkType, LinkSize } from "@/components/ui/krds/(action)/link";

// shadcn has no Link primitive — its only "link" surface is the Button `link`
// variant (`text-primary underline-offset-4 hover:underline`). We render a plain
// anchor with those tokens. KRDS-only axes (type / size / preserveColorOnHover /
// asChild) have no shadcn counterpart and are intentionally dropped; only the
// standard anchor contract plus the a11y-meaningful `disabled`/`external` carry over.
function ShadcnLink({
  type: _type,
  size: _size,
  asChild: _asChild,
  preserveColorOnHover: _preserveColorOnHover,
  external = false,
  disabled = false,
  href,
  children,
  className,
  ...rest
}: LinkProps) {
  const classes = cn(
    // inline-flex items-center mirrors the KRDS Link (cva base) so an icon child
    // sits inline with the text. A plain inline <a> lets Preflight's `svg{display:block}`
    // push the icon onto its own line (same bug fixed for breadcrumb home).
    "inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm",
    disabled && "pointer-events-none opacity-50",
    className
  );

  const externalProps = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  if (!href || disabled) {
    return (
      <span data-slot="shadcn-link" role="link" aria-disabled={disabled} className={classes}>
        {children}
      </span>
    );
  }

  return (
    <a data-slot="shadcn-link" href={href} className={classes} {...externalProps} {...rest}>
      {children}
    </a>
  );
}

export function Link(props: LinkProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsLink {...props} />;
  return <ShadcnLink {...props} />;
}
