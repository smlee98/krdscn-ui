"use client";

import type * as React from "react";
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

// KRDS Table already composes shadcn Table primitives with KRDS chrome
// (data-slot rebrand, KRDS typography/spacing). Render KRDS regardless
// of active UI system.
export function Table(props: React.ComponentProps<typeof KrdsTable>) {
  return <KrdsTable {...props} />;
}

export function TableHeader(props: React.ComponentProps<typeof KrdsTableHeader>) {
  return <KrdsTableHeader {...props} />;
}

export function TableBody(props: React.ComponentProps<typeof KrdsTableBody>) {
  return <KrdsTableBody {...props} />;
}

export function TableFooter(props: React.ComponentProps<typeof KrdsTableFooter>) {
  return <KrdsTableFooter {...props} />;
}

export function TableHead(props: React.ComponentProps<typeof KrdsTableHead>) {
  return <KrdsTableHead {...props} />;
}

export function TableRow(props: React.ComponentProps<typeof KrdsTableRow>) {
  return <KrdsTableRow {...props} />;
}

export function TableCell(props: React.ComponentProps<typeof KrdsTableCell>) {
  return <KrdsTableCell {...props} />;
}

export function TableCaption(props: React.ComponentProps<typeof KrdsTableCaption>) {
  return <KrdsTableCaption {...props} />;
}
