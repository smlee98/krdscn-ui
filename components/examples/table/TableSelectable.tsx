"use client";

import * as React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, Checkbox } from "@/components/ui/krds";

const ROWS = [
  { id: "r1", name: "주민등록등본", date: "2024.03.15", status: "완료" },
  { id: "r2", name: "건강보험 납부확인서", date: "2024.03.14", status: "처리중" },
  { id: "r3", name: "소득확인증명서", date: "2024.03.13", status: "완료" }
];

export default function TableSelectable() {
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const allSelected = selected.size === ROWS.length;

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(ROWS.map((r) => r.id)) : new Set());
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {selected.size > 0 && <p className="text-krds-primary-50 text-sm">{selected.size}개 선택됨</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox checked={allSelected} onChange={toggleAll} aria-label="전체 선택" />
            </TableHead>
            <TableHead>민원명</TableHead>
            <TableHead>신청일</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.id} className={selected.has(row.id) ? "bg-krds-primary-5" : ""}>
              <TableCell>
                <Checkbox
                  checked={selected.has(row.id)}
                  onChange={(checked) => toggleRow(row.id, checked)}
                  aria-label={row.name}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
