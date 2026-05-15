"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
  PaginationContent,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
  buildPageItems
} from "@/components/ui/krds";

const ALL_ROWS = Array.from({ length: 20 }, (_, i) => ({
  id: `2024-${String(i + 1).padStart(3, "0")}`,
  name: ["주민등록등본", "건강보험확인서", "소득확인서", "납세완납증명"][i % 4]!,
  date: `2024.03.${String((i % 28) + 1).padStart(2, "0")}`
}));

const PAGE_SIZE = 5;

export default function TableWithPagination() {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(ALL_ROWS.length / PAGE_SIZE);
  const rows = ALL_ROWS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageItems = buildPageItems(page, totalPages, 1, 1);

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>접수번호</TableHead>
            <TableHead>민원명</TableHead>
            <TableHead>신청일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationPrev onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
            {pageItems.map((item, idx) =>
              item === "dots" ? (
                <PaginationEllipsis key={`dots-${idx}`} />
              ) : (
                <PaginationItem key={item} active={item === page} onClick={() => setPage(item)}>
                  {item}
                </PaginationItem>
              )
            )}
            <PaginationNext
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
