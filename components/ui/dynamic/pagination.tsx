"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import {
  Pagination as KrdsPagination,
  PaginationContent as KrdsPaginationContent,
  PaginationPrev as KrdsPaginationPrev,
  PaginationNext as KrdsPaginationNext,
  PaginationItem as KrdsPaginationItem,
  PaginationEllipsis as KrdsPaginationEllipsis,
  PaginationJump as KrdsPaginationJump,
  PaginationJumpInput as KrdsPaginationJumpInput,
  PaginationJumpTotal as KrdsPaginationJumpTotal,
  PaginationJumpButton as KrdsPaginationJumpButton,
  buildPageItems,
} from "@/components/ui/krds/(navigation)/pagination"
import { buttonVariants } from "@/components/ui/button"
import { useUISystem } from "@/lib/ui-system"
import { cn } from "@/lib/cn"

export type PaginationProps = React.ComponentProps<typeof KrdsPagination>

// ─── Root ───────────────────────────────────────────────────────────────────

export function Pagination({ className, children, "aria-label": ariaLabel }: PaginationProps) {
  const system = useUISystem()
  if (system === "krds") {
    return (
      <KrdsPagination className={className} aria-label={ariaLabel}>
        {children}
      </KrdsPagination>
    )
  }
  // shadcn mode: plain nav wrapper (shadcn Pagination is <nav role="navigation" ...>)
  return (
    <nav
      role="navigation"
      aria-label={ariaLabel ?? "페이지 네비게이션"}
      className={cn("mx-auto flex w-full flex-col items-center justify-center gap-6", className)}
    >
      {children}
    </nav>
  )
}

// ─── Content ──────────────────────────────────────────────────────────────────

export function PaginationContent(props: React.ComponentProps<typeof KrdsPaginationContent>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationContent {...props} />
  const { className, children } = props
  return <div className={cn("flex items-center gap-1", className)}>{children}</div>
}

// ─── Prev / Next ────────────────────────────────────────────────────────────

export function PaginationPrev(props: React.ComponentProps<typeof KrdsPaginationPrev>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationPrev {...props} />
  const { className, children, disabled, onClick, "aria-label": ariaLabel = "이전" } = props
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonVariants({ variant: "ghost", size: "default" }), className)}
    >
      <ChevronLeft className="size-4" aria-hidden="true" />
      <span>{children ?? "이전"}</span>
    </button>
  )
}

export function PaginationNext(props: React.ComponentProps<typeof KrdsPaginationNext>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationNext {...props} />
  const { className, children, disabled, onClick, "aria-label": ariaLabel = "다음" } = props
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonVariants({ variant: "ghost", size: "default" }), className)}
    >
      <span>{children ?? "다음"}</span>
      <ChevronRight className="size-4" aria-hidden="true" />
    </button>
  )
}

// ─── Item (numbered page) ───────────────────────────────────────────────────

export function PaginationItem(props: React.ComponentProps<typeof KrdsPaginationItem>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationItem {...props} />
  const { className, children, active, disabled, onClick } = props
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonVariants({ variant: active ? "outline" : "ghost", size: "icon" }), className)}
    >
      {children}
    </button>
  )
}

// ─── Ellipsis ─────────────────────────────────────────────────────────────────

export function PaginationEllipsis(props: React.ComponentProps<typeof KrdsPaginationEllipsis>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationEllipsis {...props} />
  const { className } = props
  return (
    <span aria-hidden="true" className={cn("flex size-9 items-center justify-center", className)}>
      <MoreHorizontal className="size-4" aria-hidden="true" />
    </span>
  )
}

// ─── Jump (stateful form) ─────────────────────────────────────────────────────
// The shadcn Jump parts coordinate via their own context mirroring KRDS's
// (draft / setDraft / totalPages) so Input/Total/Button stay in sync without
// touching the KRDS module's private context. handleSubmit mirrors KRDS semantics
// (validate 1..total, then onJump).

type ShadcnJumpContextValue = {
  draft: string
  setDraft: (v: string) => void
  totalPages: number
}

const ShadcnPaginationJumpContext = React.createContext<ShadcnJumpContextValue>({
  draft: "1",
  setDraft: () => {},
  totalPages: 1,
})

function ShadcnPaginationJump({
  className,
  children,
  total,
  value,
  defaultValue = 1,
  onJump,
}: React.ComponentProps<typeof KrdsPaginationJump>) {
  const [draft, setDraft] = React.useState(String(value ?? defaultValue))
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== prevValue) {
    setPrevValue(value)
    if (value !== undefined) setDraft(String(value))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const n = Number(draft)
    if (!Number.isFinite(n) || n < 1 || n > total) return
    onJump?.(n)
  }

  return (
    <ShadcnPaginationJumpContext.Provider value={{ draft, setDraft, totalPages: total }}>
      <form onSubmit={handleSubmit} className={cn("flex items-center justify-center gap-2", className)}>
        {children}
      </form>
    </ShadcnPaginationJumpContext.Provider>
  )
}

export function PaginationJump(props: React.ComponentProps<typeof KrdsPaginationJump>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationJump {...props} />
  return <ShadcnPaginationJump {...props} />
}

function ShadcnPaginationJumpInput({
  value,
  defaultValue: _defaultValue,
  onValueChange,
  "aria-label": ariaLabel = "이동할 페이지 번호",
  className,
  ...props
}: React.ComponentProps<typeof KrdsPaginationJumpInput>) {
  const ctx = React.useContext(ShadcnPaginationJumpContext)
  const inputValue = value !== undefined ? String(value) : ctx.draft

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (value === undefined) ctx.setDraft(raw)
    const n = Number(raw)
    onValueChange?.(raw === "" || !Number.isFinite(n) ? undefined : n)
  }

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      aria-label={ariaLabel}
      value={inputValue}
      onChange={handleChange}
      className={cn(
        "border-input bg-background h-9 w-14 rounded-md border px-3 text-center text-sm",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
}

export function PaginationJumpInput(props: React.ComponentProps<typeof KrdsPaginationJumpInput>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationJumpInput {...props} />
  return <ShadcnPaginationJumpInput {...props} />
}

function ShadcnPaginationJumpTotal({
  total,
  className,
  ...props
}: React.ComponentProps<typeof KrdsPaginationJumpTotal>) {
  const ctx = React.useContext(ShadcnPaginationJumpContext)
  const totalPages = total ?? ctx.totalPages
  return (
    <span className={cn("text-muted-foreground flex h-9 items-center px-2 text-sm", className)} {...props}>
      /{totalPages}
    </span>
  )
}

export function PaginationJumpTotal(props: React.ComponentProps<typeof KrdsPaginationJumpTotal>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationJumpTotal {...props} />
  return <ShadcnPaginationJumpTotal {...props} />
}

function ShadcnPaginationJumpButton({
  children,
  type = "submit",
  className,
  ...props
}: React.ComponentProps<typeof KrdsPaginationJumpButton>) {
  return (
    <button type={type} className={cn(buttonVariants({ variant: "secondary", size: "default" }), className)} {...props}>
      {children ?? "이동"}
    </button>
  )
}

export function PaginationJumpButton(props: React.ComponentProps<typeof KrdsPaginationJumpButton>) {
  const system = useUISystem()
  if (system === "krds") return <KrdsPaginationJumpButton {...props} />
  return <ShadcnPaginationJumpButton {...props} />
}

export { buildPageItems }
