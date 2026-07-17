// rsc:client
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/dynamic/button"
import { cn } from "@/lib/cn"

// ─── Page list builder ────────────────────────────────────────────────────────

function buildPageItems(current: number, total: number, boundary: number, sibling: number): (number | "dots")[] {
  if (total <= 1) return [1]

  const pages = new Set<number>()

  for (let i = 1; i <= Math.min(boundary, total); i++) pages.add(i)
  for (let i = Math.max(total - boundary + 1, 1); i <= total; i++) pages.add(i)
  for (let i = Math.max(current - sibling, 1); i <= Math.min(current + sibling, total); i++) pages.add(i)

  const sorted = Array.from(pages).sort((a, b) => a - b)

  const result: (number | "dots")[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) result.push("dots")
    result.push(p)
    prev = p
  }
  return result
}

// ─── Pagination (root) ────────────────────────────────────────────────────────

type PaginationProps = {
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
}

function Pagination({ className, children, "aria-label": ariaLabel = "페이지 네비게이션" }: PaginationProps) {
  return (
    <nav
      data-slot="krds-pagination"
      aria-label={ariaLabel}
      className={cn("flex flex-col items-center gap-6", className)}
    >
      {children}
    </nav>
  )
}

// ─── PaginationContent (number-button row) ────────────────────────────────────

type PaginationContentProps = {
  className?: string
  children?: React.ReactNode
}

function PaginationContent({ className, children }: PaginationContentProps) {
  return (
    <div
      data-slot="krds-pagination-content"
      className={cn("flex items-center gap-2", "max-md:w-full max-md:flex-wrap max-md:justify-center", className)}
    >
      {/* KRDS mobile: prev/next share the top row (order 0/1) while the number
          links wrap onto their own full-width row below — equivalent to KRDS's
          `.page-links{width:100%}` line break (_pagination.scss:143-159). This
          zero-height, full-basis spacer forces that wrap without requiring
          callers to group their PaginationItem/PaginationEllipsis children. */}
      <span
        aria-hidden="true"
        data-slot="krds-pagination-content-break"
        className="hidden max-md:order-2 max-md:block max-md:h-0 max-md:basis-full"
      />
      {children}
    </div>
  )
}

// ─── Base button style ────────────────────────────────────────────────────────

const btnBase = cn(
  "inline-flex h-10 items-center justify-center rounded-[6px] bg-transparent select-none",
  "text-krds-body-md text-krds-foreground-subtle",
  "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-pressed",
  "focus-visible:krds-focus-ring",
  "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-krds-foreground-disabled disabled:pointer-events-none"
)

// ─── PaginationPrev ───────────────────────────────────────────────────────────

type PaginationPrevProps = {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  "aria-label"?: string
}

function PaginationPrev({
  className,
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel = "이전",
}: PaginationPrevProps) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-prev"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(btnBase, "gap-1 pr-2 pl-1", className)}
    >
      <ChevronLeft size={20} aria-hidden="true" />
      <span>{children ?? "이전"}</span>
    </button>
  )
}

// ─── PaginationNext ───────────────────────────────────────────────────────────

type PaginationNextProps = {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  "aria-label"?: string
}

function PaginationNext({
  className,
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel = "다음",
}: PaginationNextProps) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-next"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(btnBase, "gap-1 pr-1 pl-2", "max-md:order-1", className)}
    >
      <span>{children ?? "다음"}</span>
      <ChevronRight size={20} aria-hidden="true" />
    </button>
  )
}

// ─── PaginationItem (numbered page) ───────────────────────────────────────────

type PaginationItemProps = {
  className?: string
  children?: React.ReactNode
  active?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function PaginationItem({ className, children, active, disabled, onClick }: PaginationItemProps) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-item"
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        btnBase,
        "w-10 max-md:order-3",
        active &&
          "bg-krds-secondary-bold hover:bg-krds-secondary-bold active:bg-krds-secondary-bold font-bold text-white",
        className
      )}
    >
      {children}
    </button>
  )
}

// ─── PaginationEllipsis ───────────────────────────────────────────────────────

type PaginationEllipsisProps = {
  className?: string
}

function PaginationEllipsis({ className }: PaginationEllipsisProps) {
  return (
    <span
      data-slot="krds-pagination-ellipsis"
      aria-hidden="true"
      className={cn(
        "text-krds-foreground-subtle inline-flex h-10 w-10 items-center justify-center select-none max-md:order-3",
        className
      )}
    >
      <MoreHorizontal size={24} aria-hidden="true" />
    </span>
  )
}

// ─── PaginationJump (project extension — no KRDS reference equivalent) ────────
// `PaginationJump`/`PaginationJumpInput`/`PaginationJumpTotal`/`PaginationJumpButton`
// below are not part of the KRDS uiux pagination spec (no `_pagination.scss` or
// `pagination.html` counterpart); they're an internal "jump to page" affordance.

// ─── PaginationJump context ───────────────────────────────────────────────────

type PaginationJumpContextValue = {
  draft: string
  setDraft: (v: string) => void
  totalPages: number
}

const PaginationJumpContext = React.createContext<PaginationJumpContextValue>({
  draft: "1",
  setDraft: () => {},
  totalPages: 1,
})

// ─── PaginationJump (form root) ───────────────────────────────────────────────

type PaginationJumpProps = {
  className?: string
  children?: React.ReactNode
  total: number
  value?: number
  defaultValue?: number
  onJump?: (page: number) => void
}

function PaginationJump({ className, children, total, value, defaultValue = 1, onJump }: PaginationJumpProps) {
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
    <PaginationJumpContext.Provider value={{ draft, setDraft, totalPages: total }}>
      <form
        data-slot="krds-pagination-jump"
        onSubmit={handleSubmit}
        className={cn("flex items-center justify-center gap-4", className)}
      >
        {children}
      </form>
    </PaginationJumpContext.Provider>
  )
}

// ─── PaginationJumpInput ──────────────────────────────────────────────────────

type PaginationJumpInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (n: number | undefined) => void
}

function PaginationJumpInput({
  value,
  defaultValue: _defaultValue,
  onValueChange,
  "aria-label": ariaLabel = "이동할 페이지 번호",
  className,
  ...props
}: PaginationJumpInputProps) {
  const ctx = React.useContext(PaginationJumpContext)
  // Use explicit numeric value if provided; otherwise read draft from context
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
        "border-krds-border-dark bg-krds-surface h-10 w-14 rounded-[6px] border px-4",
        "text-krds-foreground text-krds-body-sm text-center",
        "focus-visible:krds-focus-ring",
        className
      )}
      {...props}
    />
  )
}

// ─── PaginationJumpTotal ──────────────────────────────────────────────────────

type PaginationJumpTotalProps = React.ComponentProps<"span"> & { total?: number }

function PaginationJumpTotal({ total, className, ...props }: PaginationJumpTotalProps) {
  const ctx = React.useContext(PaginationJumpContext)
  const totalPages = total ?? ctx.totalPages
  return (
    <span
      className={cn(
        "text-krds-foreground-subtle text-krds-body-sm flex h-10 w-10 items-center justify-center px-2",
        className
      )}
      {...props}
    >
      /{totalPages}
    </span>
  )
}

// ─── PaginationJumpButton ─────────────────────────────────────────────────────

type PaginationJumpButtonProps = React.ComponentProps<"button">

function PaginationJumpButton({ children, type = "submit", className, ...props }: PaginationJumpButtonProps) {
  return (
    <Button type={type} variant="secondary" size="sm" className={cn("min-w-16", className)} {...props}>
      {children ?? "이동"}
    </Button>
  )
}

export {
  buildPageItems,
  Pagination,
  PaginationContent,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
  PaginationJump,
  PaginationJumpInput,
  PaginationJumpTotal,
  PaginationJumpButton,
}
