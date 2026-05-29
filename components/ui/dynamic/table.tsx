"use client";

import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCaption as ShadcnTableCaption,
  TableCell as ShadcnTableCell,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow
} from "@/components/ui/table";
import {
  Table as KrdsTable,
  TableBody as KrdsTableBody,
  TableCaption as KrdsTableCaption,
  TableCell as KrdsTableCell,
  TableFooter as KrdsTableFooter,
  TableHead as KrdsTableHead,
  TableHeader as KrdsTableHeader,
  TableRow as KrdsTableRow
} from "@/components/ui/krds/(layout)/table";
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeadProps,
  TableHeaderProps,
  TableProps,
  TableRowProps
} from "@/components/ui/krds/(layout)/table";
import { useUISystem } from "@/lib/ui-system";

export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
  TableCaptionProps
} from "@/components/ui/krds/(layout)/table";

// Real branching dispatcher (cf. accordion.tsx). The public surface is the KRDS
// Table compound API. Each part renders either the KRDS-chromed wrapper (krds-table*
// data-slot, KRDS typography/spacing/color tokens) or the vanilla shadcn primitive.
// KRDS Table props are the underlying native HTML element props (table/thead/…),
// identical to shadcn's primitive props — there is no KRDS-only variant/size/stripe
// axis, so the shadcn branch maps 1:1 and drops nothing.

export function Table(props: TableProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTable {...props} />;
  return <ShadcnTable {...props} />;
}

export function TableHeader(props: TableHeaderProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableHeader {...props} />;
  return <ShadcnTableHeader {...props} />;
}

export function TableBody(props: TableBodyProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableBody {...props} />;
  return <ShadcnTableBody {...props} />;
}

export function TableFooter(props: TableFooterProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableFooter {...props} />;
  return <ShadcnTableFooter {...props} />;
}

export function TableHead(props: TableHeadProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableHead {...props} />;
  return <ShadcnTableHead {...props} />;
}

export function TableRow(props: TableRowProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableRow {...props} />;
  return <ShadcnTableRow {...props} />;
}

export function TableCell(props: TableCellProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableCell {...props} />;
  return <ShadcnTableCell {...props} />;
}

export function TableCaption(props: TableCaptionProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTableCaption {...props} />;
  return <ShadcnTableCaption {...props} />;
}
