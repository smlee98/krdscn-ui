"use client";

import * as React from "react";
import { Root as Slot } from "@radix-ui/react-slot";
import {
  Footer as KrdsFooter,
  FooterColumn as KrdsFooterColumn,
  FooterColumnLinks as KrdsFooterColumnLinks,
  FooterColumnTitle as KrdsFooterColumnTitle,
  FooterColumns as KrdsFooterColumns,
  FooterCopyright as KrdsFooterCopyright,
  FooterLink as KrdsFooterLink,
  FooterOrg as KrdsFooterOrg
} from "@/components/ui/krds/(identity)/footer";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/modal.tsx).
// The public surface is the KRDS Footer compound API; each part renders either the
// KRDS-chromed wrapper or a neutral shadcn-token equivalent based on <UISystemProvider>.
//
// shadcn has no Footer primitive, so the shadcn branch is reconstructed from shadcn
// design tokens (border-t / bg-muted/30 / text-muted-foreground / link tokens) rather
// than mapped to an existing primitive. The Korean-government chrome (krds-* color
// tokens, max-w-screen-xl identity shell) is intentionally pared back to a minimal,
// system-neutral footer. Link href / children / aria attributes are preserved on both
// paths; only the visual chrome differs.

// Public-surface prop types mirror the KRDS part signatures so consumers see one API.
type FooterProps = React.ComponentProps<typeof KrdsFooter>;
type FooterOrgProps = React.ComponentProps<typeof KrdsFooterOrg>;
type FooterColumnsProps = React.ComponentProps<typeof KrdsFooterColumns>;
type FooterColumnProps = React.ComponentProps<typeof KrdsFooterColumn>;
type FooterColumnTitleProps = React.ComponentProps<typeof KrdsFooterColumnTitle>;
type FooterColumnLinksProps = React.ComponentProps<typeof KrdsFooterColumnLinks>;
type FooterLinkProps = React.ComponentProps<typeof KrdsFooterLink>;
type FooterCopyrightProps = React.ComponentProps<typeof KrdsFooterCopyright>;

// ─── shadcn-mode parts (neutral, system-token footer) ───────────────────────────

function ShadcnFooter({ className, children, ...props }: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("bg-muted/30 w-full border-t", className)} {...props}>
      <div className="mx-auto max-w-screen-xl px-6 py-10">{children}</div>
    </footer>
  );
}

function ShadcnFooterOrg({ className, ...props }: FooterOrgProps) {
  return (
    <p data-slot="footer-org" className={cn("text-foreground mb-6 text-base font-semibold", className)} {...props} />
  );
}

function ShadcnFooterColumns({ className, ...props }: FooterColumnsProps) {
  return (
    <div data-slot="footer-columns" className={cn("grid grid-cols-1 gap-8 sm:grid-cols-3", className)} {...props} />
  );
}

function ShadcnFooterColumn({ className, ...props }: FooterColumnProps) {
  return <div data-slot="footer-column" className={cn("flex flex-col gap-3", className)} {...props} />;
}

function ShadcnFooterColumnTitle({ className, ...props }: FooterColumnTitleProps) {
  return (
    <p data-slot="footer-column-title" className={cn("text-foreground text-sm font-semibold", className)} {...props} />
  );
}

function ShadcnFooterColumnLinks({ className, ...props }: FooterColumnLinksProps) {
  return <ul data-slot="footer-column-links" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function ShadcnFooterLink({ asChild = false, className, ...props }: FooterLinkProps) {
  const Comp = asChild ? Slot : "a";
  return (
    <li data-slot="footer-link">
      <Comp
        className={cn(
          "text-muted-foreground text-sm",
          "hover:text-foreground hover:underline",
          "focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none",
          className
        )}
        {...props}
      />
    </li>
  );
}

function ShadcnFooterCopyright({ className, ...props }: FooterCopyrightProps) {
  return <p data-slot="footer-copyright" className={cn("text-muted-foreground mt-8 text-xs", className)} {...props} />;
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function Footer(props: FooterProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooter {...props} />;
  return <ShadcnFooter {...props} />;
}

export function FooterOrg(props: FooterOrgProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterOrg {...props} />;
  return <ShadcnFooterOrg {...props} />;
}

export function FooterColumns(props: FooterColumnsProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterColumns {...props} />;
  return <ShadcnFooterColumns {...props} />;
}

export function FooterColumn(props: FooterColumnProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterColumn {...props} />;
  return <ShadcnFooterColumn {...props} />;
}

export function FooterColumnTitle(props: FooterColumnTitleProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterColumnTitle {...props} />;
  return <ShadcnFooterColumnTitle {...props} />;
}

export function FooterColumnLinks(props: FooterColumnLinksProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterColumnLinks {...props} />;
  return <ShadcnFooterColumnLinks {...props} />;
}

export function FooterLink(props: FooterLinkProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterLink {...props} />;
  return <ShadcnFooterLink {...props} />;
}

export function FooterCopyright(props: FooterCopyrightProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsFooterCopyright {...props} />;
  return <ShadcnFooterCopyright {...props} />;
}
