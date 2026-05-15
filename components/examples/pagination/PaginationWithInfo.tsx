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
} from "@/components/ui/krds/pagination";

export default function PaginationWithInfo() {
  const perPage = 10;
  const totalRows = 287;
  const totalPages = Math.ceil(totalRows / perPage);
  const [current, setCurrent] = React.useState(3);
  const items = buildPageItems(current, totalPages, 1, 2);

  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, totalRows);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-krds-gray-70 text-sm">
        전체 <span className="text-krds-gray-90 font-medium">{totalRows}</span>건 중{" "}
        <span className="text-krds-gray-90 font-medium">
          {start}-{end}
        </span>
      </p>
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
          <PaginationNext
            disabled={current === totalPages}
            onClick={() => setCurrent((p) => Math.min(totalPages, p + 1))}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
}
