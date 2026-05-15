"use client";

import * as React from "react";
import { Pagination, PaginationContent, PaginationNext, PaginationPrev } from "@/components/ui/krds/pagination";

export default function PaginationCompact() {
  const total = 12;
  const [current, setCurrent] = React.useState(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrev disabled={current === 1} onClick={() => setCurrent((p) => Math.max(1, p - 1))} />
        <span className="text-krds-gray-90 text-sm">
          {current} / {total}
        </span>
        <PaginationNext disabled={current === total} onClick={() => setCurrent((p) => Math.min(total, p + 1))} />
      </PaginationContent>
    </Pagination>
  );
}
