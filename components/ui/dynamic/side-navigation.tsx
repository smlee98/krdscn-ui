"use client"

import * as React from "react"
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import * as Krds from "@/components/ui/krds/(navigation)/side-navigation"
import { cn } from "@/lib/cn"
import { useUISystem } from "@/lib/ui-system"

// Dual-render dispatcher (template: dynamic/accordion.tsx, dynamic/main-menu.tsx).
// The public surface is the KRDS SideNavigation compound API; each exported part
// renders either the KRDS-chromed wrapper or the vanilla shadcn rendering based on
// <UISystemProvider>. The KRDS collapsible group (open/toggle context consumed by
// Trigger + List) is reproduced here with its own shadcn-mode context so the
// shadcn parts coordinate among themselves; KRDS-specific colors/sizes are dropped
// for vanilla tokens while structure & a11y are preserved.

// ─── shadcn-mode group context (mirrors KRDS SideNavigationGroup) ──────────────

type ShadcnSideNavGroupCtx = { open: boolean; toggle: () => void }
const ShadcnSideNavGroupContext = React.createContext<ShadcnSideNavGroupCtx | null>(null)

// ─── shadcn-mode parts ──────────────────────────────────────────────────────────

function ShadcnSideNavigation({
  className,
  children,
  "aria-label": ariaLabel = "사이드 내비게이션",
}: React.ComponentProps<typeof Krds.SideNavigation>) {
  return (
    <nav aria-label={ariaLabel} className={cn("flex w-[248px] flex-col", className)}>
      {children}
    </nav>
  )
}

function ShadcnSideNavigationTitle({ className, children }: React.ComponentProps<typeof Krds.SideNavigationTitle>) {
  return (
    <div className={cn("border-border flex w-full items-center border-b px-2 pt-6 pb-4", className)}>
      <span className="text-foreground flex-1 text-2xl font-bold">{children}</span>
    </div>
  )
}

function ShadcnSideNavigationBackTitle({
  className,
  children,
  href,
  onBack,
  backLabel = "뒤로 가기",
}: React.ComponentProps<typeof Krds.SideNavigationBackTitle>) {
  const baseClass = cn(
    "flex w-full flex-col items-start gap-1 rounded-lg p-2 text-left text-foreground hover:bg-accent focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
    className
  )
  const content = (
    <>
      <ArrowLeft size={24} aria-hidden="true" />
      <span className="text-lg font-bold">{children}</span>
    </>
  )
  if (href) {
    return (
      <a href={href} aria-label={backLabel} className={baseClass}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" onClick={onBack} aria-label={backLabel} className={baseClass}>
      {content}
    </button>
  )
}

function ShadcnSideNavigationGroup({
  className,
  children,
  defaultOpen,
  open: controlledOpen,
  onOpenChange,
}: React.ComponentProps<typeof Krds.SideNavigationGroup>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen ?? false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const toggle = React.useCallback(() => {
    const next = !open
    if (!isControlled) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }, [open, isControlled, onOpenChange])

  return (
    <ShadcnSideNavGroupContext.Provider value={{ open, toggle }}>
      <div
        data-state={open ? "open" : "closed"}
        className={cn("border-border flex w-full flex-col border-b", className)}
      >
        {children}
      </div>
    </ShadcnSideNavGroupContext.Provider>
  )
}

function ShadcnSideNavigationTrigger({ className, children }: React.ComponentProps<typeof Krds.SideNavigationTrigger>) {
  const ctx = React.useContext(ShadcnSideNavGroupContext)
  const Icon = ctx?.open ? ChevronUp : ChevronDown
  return (
    <button
      type="button"
      aria-expanded={ctx?.open ?? false}
      onClick={ctx?.toggle}
      className={cn(
        "text-foreground hover:bg-accent focus-visible:ring-ring flex w-full items-center gap-2 px-2 py-4 text-left text-base font-bold focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <span className="flex-1">{children}</span>
      <Icon size={20} aria-hidden="true" />
    </button>
  )
}

function ShadcnSideNavigationList({
  className,
  children,
  bordered,
}: React.ComponentProps<typeof Krds.SideNavigationList>) {
  const ctx = React.useContext(ShadcnSideNavGroupContext)
  if (ctx && !ctx.open) return null
  return (
    <ul className={cn("flex w-full flex-col", ctx && "py-2", bordered && "border-border border-y py-4", className)}>
      {children}
    </ul>
  )
}

function ShadcnSideNavigationItem({
  className,
  children,
  href,
  external,
  active,
}: React.ComponentProps<typeof Krds.SideNavigationItem>) {
  return (
    <li className="w-full">
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "text-foreground hover:bg-accent focus-visible:ring-ring flex w-full items-center gap-1 rounded-md px-4 py-2 text-base focus-visible:ring-2 focus-visible:outline-none",
          active && "font-bold",
          className
        )}
      >
        <span className="flex items-center pr-2">
          <span aria-hidden="true" className="bg-foreground inline-block size-1 rounded-full" />
        </span>
        <span className="flex-1">{children}</span>
        {external && <ExternalLink size={20} aria-hidden="true" />}
      </a>
    </li>
  )
}

// ─── Dispatched parts (public surface preserved) ────────────────────────────────

export function SideNavigation(props: React.ComponentProps<typeof Krds.SideNavigation>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigation {...props} />
  return <ShadcnSideNavigation {...props} />
}

export function SideNavigationTitle(props: React.ComponentProps<typeof Krds.SideNavigationTitle>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigationTitle {...props} />
  return <ShadcnSideNavigationTitle {...props} />
}

export function SideNavigationBackTitle(props: React.ComponentProps<typeof Krds.SideNavigationBackTitle>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigationBackTitle {...props} />
  return <ShadcnSideNavigationBackTitle {...props} />
}

export function SideNavigationGroup(props: React.ComponentProps<typeof Krds.SideNavigationGroup>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigationGroup {...props} />
  return <ShadcnSideNavigationGroup {...props} />
}

export function SideNavigationTrigger(props: React.ComponentProps<typeof Krds.SideNavigationTrigger>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigationTrigger {...props} />
  return <ShadcnSideNavigationTrigger {...props} />
}

export function SideNavigationList(props: React.ComponentProps<typeof Krds.SideNavigationList>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigationList {...props} />
  return <ShadcnSideNavigationList {...props} />
}

export function SideNavigationItem(props: React.ComponentProps<typeof Krds.SideNavigationItem>) {
  const system = useUISystem()
  if (system === "krds") return <Krds.SideNavigationItem {...props} />
  return <ShadcnSideNavigationItem {...props} />
}
