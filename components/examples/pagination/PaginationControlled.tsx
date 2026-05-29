"use client";

import * as React from "react";
import { Pagination, PaginationContent, PaginationNext, PaginationPrev } from "@/components/ui/dynamic/pagination";

export default function PaginationControlled() {
  const total = 20;
  const [current, setCurrent] = React.useState(4);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrev disabled={current === 1} onClick={() => setCurrent((p) => Math.max(1, p - 1))} />
        <span className="text-krds-gray-90 px-2 text-[17px] leading-[1.5]">
          {current} / {total}
        </span>
        <PaginationNext disabled={current === total} onClick={() => setCurrent((p) => Math.min(total, p + 1))} />
      </PaginationContent>
    </Pagination>
  );
}
