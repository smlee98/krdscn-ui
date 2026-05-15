"use client";

import * as React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/krds";

const DATA = [
  { name: "홍길동", dept: "행정안전부", date: "2024.03.15" },
  { name: "김철수", dept: "보건복지부", date: "2024.02.20" },
  { name: "이영희", dept: "교육부", date: "2024.03.10" },
  { name: "박민준", dept: "환경부", date: "2024.01.05" }
];

type SortKey = "name" | "dept" | "date";
type SortDir = "asc" | "desc";

export default function TableSortable() {
  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const sorted = [...DATA].sort((a, b) => {
    const cmp = a[sortKey].localeCompare(b[sortKey], "ko");
    return sortDir === "asc" ? cmp : -cmp;
  });

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (col !== sortKey) return <ChevronUpIcon className="size-3 opacity-30" />;
    return sortDir === "asc" ? (
      <ChevronUpIcon className="text-krds-primary-50 size-3" />
    ) : (
      <ChevronDownIcon className="text-krds-primary-50 size-3" />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {(["name", "dept", "date"] as SortKey[]).map((col) => (
            <TableHead key={col}>
              <button
                onClick={() => handleSort(col)}
                className="hover:text-krds-primary-50 inline-flex items-center gap-1"
              >
                {{ name: "이름", dept: "소속기관", date: "신청일" }[col]}
                <SortIcon col={col} />
              </button>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.dept}</TableCell>
            <TableCell>{row.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
