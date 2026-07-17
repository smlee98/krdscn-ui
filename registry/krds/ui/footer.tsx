// rsc:safe
import * as React from "react"
import { Slot } from "radix-ui"
import { ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// KRDS footer composition kit (reference: html/code/footer.html, scss/component/_footer.scss).
// Region map: foot-quick → FooterQuick/FooterQuickLink, f-logo → FooterLogo, f-info → FooterInfo
// (info-addr → FooterAddress, info-cs → FooterContact/FooterContactItem), f-link → FooterLinks
// (link-go → FooterLinkActions/FooterLinkAction, link-sns → FooterSns/FooterSnsLink), f-btm →
// FooterBottom (f-menu → FooterMenu/FooterMenuLink, f-copy → FooterCopyright). The krds-identifier
// region is composed from the existing Identifier component by consumers, not defined here.

// ─── Footer (root) ──────────────────────────────────────────────────────────────

function Footer({ className, children, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer data-slot="krds-footer" className={cn("bg-krds-surface-subtler w-full", className)} {...props}>
      {children}
    </footer>
  )
}

// ─── FooterQuick (foot-quick related-sites strip) ─────────────────────────────────

function FooterQuick({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-footer-quick"
      className={cn("bg-krds-surface border-krds-border-light w-full border-y", className)}
      {...props}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col sm:flex-row">{children}</div>
    </div>
  )
}

function FooterQuickLink({
  asChild = false,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="krds-footer-quick-link"
      type={asChild ? undefined : "button"}
      className={cn(
        // KRDS(_footer.scss:26): background-color: var(--krds-color-action-secondary), which resolves
        // (krds_tokens.css:397) to --krds-color-light-alpha-white0 = #ffffff00 — CONFIRMED transparent
        // at rest. hover=secondary-5(#eef2f7, :398)/pressed=secondary-10(#d6e0eb, :399) below are correct.
        // Height: size-height-8(56px) - 0.2rem border = 54px desktop/tablet; mobile min-height
        // size-height-7(48px) - 0.2rem = 46px (_footer.scss:24,56).
        "border-krds-border-light flex min-h-[46px] flex-1 items-center justify-between gap-2 px-4 sm:h-[54px]",
        "text-krds-foreground text-krds-body-md bg-transparent",
        "border-t sm:border-t-0 sm:border-l sm:first:border-l-0",
        "hover:bg-krds-surface-secondary-subtle",
        "active:bg-krds-surface-secondary-pressed",
        "focus-visible:krds-focus-ring-inset",
        className
      )}
      {...props}
    >
      {children}
      <Plus size={20} aria-hidden="true" className="shrink-0" />
    </Comp>
  )
}

// ─── FooterLogo (org logo slot) ───────────────────────────────────────────────────

function FooterLogo({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-footer-logo"
      className={cn("text-krds-foreground inline-flex h-8 items-center text-xl font-bold", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── FooterInfo (f-info container) ────────────────────────────────────────────────

function FooterInfo({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="krds-footer-info" className={cn("flex flex-1 flex-col gap-4", className)} {...props} />
}

function FooterAddress({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="krds-footer-address"
      className={cn("text-krds-foreground-subtle text-krds-body-md", className)}
      {...props}
    />
  )
}

function FooterContact({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="krds-footer-contact" className={cn("flex flex-col gap-2", className)} {...props} />
}

type FooterContactItemProps = {
  className?: string
  label: React.ReactNode
  note?: React.ReactNode
}

function FooterContactItem({ className, label, note }: FooterContactItemProps) {
  return (
    <li data-slot="krds-footer-contact-item" className={cn("flex flex-wrap items-center gap-2", className)}>
      <strong className="text-krds-foreground text-krds-body-md font-bold">{label}</strong>
      {note && <span className="text-krds-foreground-subtle text-krds-body-sm">{note}</span>}
    </li>
  )
}

// ─── FooterLinks (f-link container) ───────────────────────────────────────────────

function FooterLinks({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="krds-footer-links" className={cn("flex shrink-0 flex-col gap-10", className)} {...props} />
}

function FooterLinkActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="krds-footer-link-actions" className={cn("flex flex-col gap-1", className)} {...props} />
}

function FooterLinkAction({
  asChild = false,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a"
  return (
    <Comp
      data-slot="krds-footer-link-action"
      className={cn(
        "inline-flex w-fit items-center gap-1",
        "text-krds-foreground text-krds-body-md",
        "hover:underline",
        "focus-visible:krds-focus-ring rounded-sm",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight size={16} aria-hidden="true" />
    </Comp>
  )
}

function FooterSns({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="krds-footer-sns" className={cn("flex flex-wrap gap-3", className)} {...props} />
}

type FooterSnsLinkProps = React.ComponentProps<"a"> & {
  label: React.ReactNode
}

function FooterSnsLink({ className, children, label, target = "_blank", ...props }: FooterSnsLinkProps) {
  const rel = target === "_blank" ? "noopener noreferrer" : undefined
  return (
    <a
      data-slot="krds-footer-sns-link"
      target={target}
      rel={rel}
      className={cn(
        // KRDS SNS 버튼 = .krds-btn xlarge icon border: 원형(rounded-full) + 흰 배경 + 회색 보더
        "border-krds-border bg-krds-surface inline-flex size-12 items-center justify-center rounded-full border",
        "text-krds-foreground [&>svg]:size-6",
        "hover:bg-krds-surface-subtle",
        "focus-visible:krds-focus-ring",
        className
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {children}
    </a>
  )
}

// ─── FooterBottom (f-btm) ─────────────────────────────────────────────────────────

function FooterBottom({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-footer-bottom"
      className={cn("border-krds-border-light flex flex-col gap-10 border-t pt-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function FooterMenu({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="krds-footer-menu" className={cn("flex flex-wrap items-center gap-2", className)} {...props} />
}

type FooterMenuLinkProps = React.ComponentProps<"a"> & {
  point?: boolean
}

function FooterMenuLink({ className, point = false, ...props }: FooterMenuLinkProps) {
  return (
    <a
      data-slot="krds-footer-menu-link"
      data-point={point ? "" : undefined}
      className={cn(
        "text-krds-body-sm focus-visible:krds-focus-ring rounded-sm hover:underline",
        point ? "text-krds-foreground-secondary font-bold" : "text-krds-foreground-subtle",
        className
      )}
      {...props}
    />
  )
}

function FooterCopyright({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="krds-footer-copyright"
      className={cn("text-krds-foreground-subtle text-krds-body-sm", className)}
      {...props}
    />
  )
}

export {
  Footer,
  FooterQuick,
  FooterQuickLink,
  FooterLogo,
  FooterInfo,
  FooterAddress,
  FooterContact,
  FooterContactItem,
  FooterLinks,
  FooterLinkActions,
  FooterLinkAction,
  FooterSns,
  FooterSnsLink,
  FooterBottom,
  FooterMenu,
  FooterMenuLink,
  FooterCopyright,
}
