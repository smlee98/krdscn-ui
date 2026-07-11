// rsc:safe
import * as React from "react"
import { ChevronRight, Info, Siren, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/dynamic/button"
import { cn } from "@/lib/cn"

// ─── Type config ──────────────────────────────────────────────────────────────

export type CriticalAlertType = "emergency" | "safety" | "info"

const TYPE_CONFIG: Record<
  CriticalAlertType,
  {
    bgClass: string
    icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>
    label: string
  }
> = {
  emergency: { bgClass: "bg-krds-danger-50", icon: Siren, label: "긴급" },
  safety: { bgClass: "bg-krds-success-50", icon: TriangleAlert, label: "안전" },
  info: { bgClass: "bg-krds-info-50", icon: Info, label: "안내" },
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export type CriticalAlertProps = {
  type?: CriticalAlertType
  className?: string
  children?: React.ReactNode
}

// KRDS `--krds-critical-alerts--banner-shadow` (resources/scss/component/_critical_alerts.scss):
//   0 0 0.2rem 0 alpha-shadow1, 0 0.4rem 0.8rem 0 alpha-shadow2
const CRITICAL_ALERT_SHADOW = "shadow-[0_0_2px_0_rgba(0,0,0,0.08),0_4px_8px_0_rgba(0,0,0,0.08)]"

function CriticalAlert({ type = "emergency", className, children }: CriticalAlertProps) {
  const { bgClass, icon: Icon, label } = TYPE_CONFIG[type]
  return (
    <div
      role="alert"
      data-slot="krds-critical-alert"
      data-type={type}
      className={cn(
        "border-krds-border-light bg-krds-surface flex w-full items-center gap-4 rounded-[10px] border p-4",
        CRITICAL_ALERT_SHADOW,
        className
      )}
    >
      <div
        data-slot="krds-critical-alert-badge"
        className={cn(
          "inline-flex h-12 shrink-0 items-center gap-1 rounded-[6px] py-2 pr-2.5 pl-2",
          "text-krds-body-md font-bold whitespace-nowrap text-white",
          bgClass
        )}
      >
        <Icon size={24} aria-hidden={true} />
        <span>{label}</span>
      </div>
      {children}
    </div>
  )
}

// ─── Message ──────────────────────────────────────────────────────────────────

export type CriticalAlertMessageProps = {
  className?: string
  children?: React.ReactNode
}

function CriticalAlertMessage({ className, children }: CriticalAlertMessageProps) {
  return (
    <p
      data-slot="krds-critical-alert-message"
      className={cn("text-krds-body-md text-krds-foreground-bolder flex-1 font-bold", className)}
    >
      {children}
    </p>
  )
}

// ─── Action (trailing link/button with chevron) ───────────────────────────────

export type CriticalAlertActionProps = {
  className?: string
  children?: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  "aria-label"?: string
}

function CriticalAlertAction({
  className,
  children,
  href,
  onClick,
  "aria-label": ariaLabel,
}: CriticalAlertActionProps) {
  const sharedClassName = cn(
    "text-krds-foreground inline-flex h-8 shrink-0 items-center gap-1 rounded-[4px] px-0.5",
    "text-krds-body-md",
    "hover:underline",
    "focus:krds-focus-ring",
    className
  )

  const inner = (
    <>
      <span>{children}</span>
      <ChevronRight size={20} aria-hidden={true} className="text-krds-foreground shrink-0" />
    </>
  )

  if (href) {
    return (
      <a
        data-slot="krds-critical-alert-action"
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        className={sharedClassName}
      >
        {inner}
      </a>
    )
  }

  return (
    <Button
      type="button"
      variant="text"
      size="sm"
      data-slot="krds-critical-alert-action"
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
      className={cn("shrink-0 gap-1 hover:underline", className)}
    >
      {inner}
    </Button>
  )
}

// ─── List wrapper (multiple alerts) ────────────────────────────────────────────
// Reference (critical_alerts.html) wraps alerts in <ul class="krds-critical-alerts">
// with each <CriticalAlert> as an <li>. Single <CriticalAlert> remains usable
// standalone. When `children` are CriticalAlerts, pass `wrapItems` to auto-wrap each
// in an <li>; otherwise author the <li>s directly.

export type CriticalAlertListProps = {
  className?: string
  children?: React.ReactNode
  /** Wrap each child in an `<li>` automatically. Default false (author `<li>`s yourself). */
  wrapItems?: boolean
  "aria-label"?: string
}

function CriticalAlertList({
  className,
  children,
  wrapItems = false,
  "aria-label": ariaLabel,
}: CriticalAlertListProps) {
  return (
    <ul
      data-slot="krds-critical-alert-list"
      aria-label={ariaLabel}
      className={cn("flex w-full flex-col gap-6", className)}
    >
      {wrapItems ? React.Children.map(children, (child, i) => <li key={i}>{child}</li>) : children}
    </ul>
  )
}

export { CriticalAlert, CriticalAlertList, CriticalAlertMessage, CriticalAlertAction }
