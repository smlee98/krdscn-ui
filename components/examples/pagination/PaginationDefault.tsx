"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrev,
  buildPageItems
} from "@/components/ui/dynamic/pagination";

export default function PaginationDefault() {
  const total = 10;
  const [current, setCurrent] = React.useState(4);
  const items = buildPageItems(current, total, 1, 3);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrev disabled={current === 1} onClick={() => setCurrent((p) => Math.max(1, p - 1))} />
        {items.map((it, idx) =>
          it === "dots" ? (
            <PaginationEllipsis key={`dots-${idx}`} />
          ) : (
            <PaginationItem key={it} active={it === current} onClick={() => setCurrent(it)}>
              {it}
            </PaginationItem>
          )
        )}
        <PaginationNext disabled={current === total} onClick={() => setCurrent((p) => Math.min(total, p + 1))} />
      </PaginationContent>
    </Pagination>
  );
}
