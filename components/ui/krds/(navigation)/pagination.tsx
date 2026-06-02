// rsc:client
"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/dynamic/button";
import { cn } from "@/lib/cn";

// ─── Page list builder ────────────────────────────────────────────────────────

function buildPageItems(current: number, total: number, boundary: number, sibling: number): (number | "dots")[] {
  if (total <= 1) return [1];

  const pages = new Set<number>();

  for (let i = 1; i <= Math.min(boundary, total); i++) pages.add(i);
  for (let i = Math.max(total - boundary + 1, 1); i <= total; i++) pages.add(i);
  for (let i = Math.max(current - sibling, 1); i <= Math.min(current + sibling, total); i++) pages.add(i);

  const sorted = Array.from(pages).sort((a, b) => a - b);

  const result: (number | "dots")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push("dots");
    result.push(p);
    prev = p;
  }
  return result;
}

// ─── Pagination (root) ────────────────────────────────────────────────────────

type PaginationProps = {
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
};

function Pagination({ className, children, "aria-label": ariaLabel = "페이지 네비게이션" }: PaginationProps) {
  return (
    <nav
      data-slot="krds-pagination"
      aria-label={ariaLabel}
      className={cn("flex flex-col items-center gap-6", className)}
    >
      {children}
    </nav>
  );
}

// ─── PaginationContent (number-button row) ────────────────────────────────────

type PaginationContentProps = {
  className?: string;
  children?: React.ReactNode;
};

function PaginationContent({ className, children }: PaginationContentProps) {
  return (
    <div data-slot="krds-pagination-content" className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  );
}

// ─── Base button style ────────────────────────────────────────────────────────

const btnBase = cn(
  "inline-flex h-10 items-center justify-center rounded-[6px] bg-transparent select-none",
  "text-krds-body-md text-krds-foreground-subtle",
  "hover:bg-krds-surface-subtler active:bg-krds-surface-subtle",
  "focus:krds-focus-ring",
  "disabled:cursor-not-allowed disabled:bg-transparent disabled:text-krds-foreground-disabled disabled:pointer-events-none"
);

// ─── PaginationPrev ───────────────────────────────────────────────────────────

type PaginationPrevProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

function PaginationPrev({
  className,
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel = "이전"
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
      <ArrowLeft size={20} aria-hidden="true" />
      <span>{children ?? "이전"}</span>
    </button>
  );
}

// ─── PaginationNext ───────────────────────────────────────────────────────────

type PaginationNextProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

function PaginationNext({
  className,
  children,
  disabled,
  onClick,
  "aria-label": ariaLabel = "다음"
}: PaginationNextProps) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-next"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(btnBase, "gap-1 pr-1 pl-2", className)}
    >
      <span>{children ?? "다음"}</span>
      <ArrowRight size={20} aria-hidden="true" />
    </button>
  );
}

// ─── PaginationItem (numbered page) ───────────────────────────────────────────

type PaginationItemProps = {
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

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
        "w-10",
        active && "bg-krds-secondary-bold font-bold text-white hover:bg-krds-secondary-bold active:bg-krds-secondary-bold",
        className
      )}
    >
      {children}
    </button>
  );
}

// ─── PaginationEllipsis ───────────────────────────────────────────────────────

type PaginationEllipsisProps = {
  className?: string;
};

function PaginationEllipsis({ className }: PaginationEllipsisProps) {
  return (
    <span
      data-slot="krds-pagination-ellipsis"
      aria-hidden="true"
      className={cn("text-krds-foreground-subtle inline-flex h-10 w-10 items-center justify-center select-none", className)}
    >
      <MoreHorizontal size={24} aria-hidden="true" />
    </span>
  );
}

// ─── PaginationJump context ───────────────────────────────────────────────────

type PaginationJumpContextValue = {
  draft: string;
  setDraft: (v: string) => void;
  totalPages: number;
};

const PaginationJumpContext = React.createContext<PaginationJumpContextValue>({
  draft: "1",
  setDraft: () => {},
  totalPages: 1
});

// ─── PaginationJump (form root) ───────────────────────────────────────────────

type PaginationJumpProps = {
  className?: string;
  children?: React.ReactNode;
  total: number;
  value?: number;
  defaultValue?: number;
  onJump?: (page: number) => void;
};

function PaginationJump({ className, children, total, value, defaultValue = 1, onJump }: PaginationJumpProps) {
  const [draft, setDraft] = React.useState(String(value ?? defaultValue));
  const [prevValue, setPrevValue] = React.useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (value !== undefined) setDraft(String(value));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = Number(draft);
    if (!Number.isFinite(n) || n < 1 || n > total) return;
    onJump?.(n);
  };

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
  );
}

// ─── PaginationJumpInput ──────────────────────────────────────────────────────

type PaginationJumpInputProps = Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> & {
  value?: number;
  defaultValue?: number;
  onValueChange?: (n: number | undefined) => void;
};

function PaginationJumpInput({
  value,
  defaultValue: _defaultValue,
  onValueChange,
  "aria-label": ariaLabel = "이동할 페이지 번호",
  className,
  ...props
}: PaginationJumpInputProps) {
  const ctx = React.useContext(PaginationJumpContext);
  // Use explicit numeric value if provided; otherwise read draft from context
  const inputValue = value !== undefined ? String(value) : ctx.draft;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (value === undefined) ctx.setDraft(raw);
    const n = Number(raw);
    onValueChange?.(raw === "" || !Number.isFinite(n) ? undefined : n);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      aria-label={ariaLabel}
      value={inputValue}
      onChange={handleChange}
      className={cn(
        "h-10 w-14 rounded-[6px] border border-krds-border-dark bg-krds-surface px-4",
        "text-krds-foreground text-center text-krds-body-sm",
        "focus:krds-focus-ring",
        className
      )}
      {...props}
    />
  );
}

// ─── PaginationJumpTotal ──────────────────────────────────────────────────────

type PaginationJumpTotalProps = React.ComponentProps<"span"> & { total?: number };

function PaginationJumpTotal({ total, className, ...props }: PaginationJumpTotalProps) {
  const ctx = React.useContext(PaginationJumpContext);
  const totalPages = total ?? ctx.totalPages;
  return (
    <span
      className={cn(
        "text-krds-foreground-subtle flex h-10 w-10 items-center justify-center px-2 text-krds-body-sm",
        className
      )}
      {...props}
    >
      /{totalPages}
    </span>
  );
}

// ─── PaginationJumpButton ─────────────────────────────────────────────────────

type PaginationJumpButtonProps = React.ComponentProps<"button">;

function PaginationJumpButton({ children, type = "submit", className, ...props }: PaginationJumpButtonProps) {
  return (
    <Button type={type} variant="secondary" size="sm" className={cn("min-w-16", className)} {...props}>
      {children ?? "이동"}
    </Button>
  );
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
  PaginationJumpButton
};
