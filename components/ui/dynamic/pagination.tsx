"use client";

import * as React from "react";
import {
  Pagination as KrdsPagination,
  PaginationContent,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
  PaginationJump,
  PaginationJumpInput,
  PaginationJumpTotal,
  PaginationJumpButton,
  buildPageItems
} from "@/components/ui/krds/(navigation)/pagination";
import { useUISystem } from "@/lib/ui-system";
import { cn } from "@/lib/cn";

export type PaginationProps = React.ComponentProps<typeof KrdsPagination>;

export function Pagination({ className, children, "aria-label": ariaLabel }: PaginationProps) {
  const system = useUISystem();
  if (system === "krds") {
    return (
      <KrdsPagination className={className} aria-label={ariaLabel}>
        {children}
      </KrdsPagination>
    );
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
  );
}

export {
  PaginationContent,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
  PaginationJump,
  PaginationJumpInput,
  PaginationJumpTotal,
  PaginationJumpButton,
  buildPageItems
};
