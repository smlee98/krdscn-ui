// rsc:client
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

// ─── Utility ───────────────────────────────────────────────────────────────────

function buildPageItems(
  current: number,
  total: number,
  boundary: number,
  sibling: number
): (number | "dots")[] {
  if (total <= 1) return [1];

  const pages = new Set<number>();

  for (let i = 1; i <= Math.min(boundary, total); i++) pages.add(i);
  for (let i = Math.max(total - boundary + 1, 1); i <= total; i++) pages.add(i);
  for (let i = Math.max(current - sibling, 1); i <= Math.min(current + sibling, total); i++)
    pages.add(i);

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

// ─── Icons ─────────────────────────────────────────────────────────────────────

function PrevIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="size-4"
    >
      <path
        d="M10 4L6 8l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="size-4"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Base button style ─────────────────────────────────────────────────────────

const btnBase =
  "inline-flex items-center justify-center rounded h-9 min-w-9 px-2 text-sm font-medium leading-none transition-colors select-none bg-transparent text-krds-gray-90 hover:bg-krds-gray-10 active:bg-krds-gray-20 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

// ─── Root ──────────────────────────────────────────────────────────────────────

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="krds-pagination"
      role="navigation"
      aria-label="pagination"
      className={cn("", className)}
      {...props}
    />
  );
}

// ─── Content ───────────────────────────────────────────────────────────────────

function PaginationContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-pagination-content"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

// ─── Prev ──────────────────────────────────────────────────────────────────────

function PaginationPrev({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-prev"
      aria-label="이전"
      className={cn(btnBase, "gap-1 pr-1.5 pl-1", className)}
      {...props}
    >
      <PrevIcon />
      <span>{children ?? "이전"}</span>
    </button>
  );
}

// ─── Next ──────────────────────────────────────────────────────────────────────

function PaginationNext({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-next"
      aria-label="다음"
      className={cn(btnBase, "gap-1 pr-1 pl-1.5", className)}
      {...props}
    >
      <span>{children ?? "다음"}</span>
      <NextIcon />
    </button>
  );
}

// ─── Item ──────────────────────────────────────────────────────────────────────

function PaginationItem({
  className,
  active,
  children,
  ...props
}: React.ComponentProps<"button"> & { active?: boolean }) {
  return (
    <button
      type="button"
      data-slot="krds-pagination-item"
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      className={cn(
        btnBase,
        active && "bg-krds-primary-90 text-white hover:bg-krds-primary-90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── Ellipsis ──────────────────────────────────────────────────────────────────

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="krds-pagination-ellipsis"
      aria-hidden="true"
      className={cn(
        "text-krds-gray-50 inline-flex h-9 min-w-9 items-center justify-center text-sm select-none",
        className
      )}
      {...props}
    >
      …
    </span>
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
};
