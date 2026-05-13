"use client";

import { useState } from "react";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  totalPages: number;
  currentPage?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  boundaryCount?: 0 | 1 | 2 | 3;
  siblingCount?: 0 | 1 | 2 | 3;
  disabled?: boolean;
  className?: string;
}

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

function PrevIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-4">
      <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-4">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Pagination({
  totalPages,
  currentPage: controlledPage,
  defaultPage = 1,
  onChange,
  prevLabel = "이전",
  nextLabel = "다음",
  boundaryCount = 1,
  siblingCount = 1,
  disabled,
  className,
  ...rest
}: PaginationProps) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const isControlled = controlledPage !== undefined;
  const current = isControlled ? controlledPage : internalPage;

  function go(page: number) {
    if (disabled || page < 1 || page > totalPages || page === current) return;
    if (!isControlled) setInternalPage(page);
    onChange?.(page);
  }

  const items = buildPageItems(current, totalPages, boundaryCount, siblingCount);

  const btnBase = cn(
    "inline-flex items-center justify-center rounded h-9 min-w-9 px-2",
    "text-sm font-medium leading-none transition-colors select-none",
    "bg-transparent text-krds-gray-90",
    "hover:bg-krds-gray-10",
    "active:bg-krds-gray-20",
    disabled && "opacity-40 cursor-not-allowed pointer-events-none"
  );

  const activeBtnCls = cn(btnBase, "bg-krds-primary-90 text-white", "hover:bg-krds-primary-90");

  return (
    <div role="navigation" aria-label="pagination" className={cn("flex items-center gap-1.5", className)} {...rest}>
      <button
        type="button"
        aria-label={prevLabel}
        disabled={disabled || current <= 1}
        onClick={() => go(current - 1)}
        className={cn(btnBase, "gap-1 pr-1.5 pl-1")}
      >
        <PrevIcon />
        <span>{prevLabel}</span>
      </button>

      {items.map((item, idx) =>
        item === "dots" ? (
          <span
            key={`dots-${idx}`}
            aria-hidden="true"
            className="text-krds-gray-50 inline-flex h-9 min-w-9 items-center justify-center text-sm select-none"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`${item}페이지`}
            aria-current={item === current ? "page" : undefined}
            disabled={disabled}
            onClick={() => go(item)}
            className={item === current ? activeBtnCls : btnBase}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        aria-label={nextLabel}
        disabled={disabled || current >= totalPages}
        onClick={() => go(current + 1)}
        className={cn(btnBase, "gap-1 pr-1 pl-1.5")}
      >
        <span>{nextLabel}</span>
        <NextIcon />
      </button>
    </div>
  );
}

export type { PaginationProps };
export { Pagination };
