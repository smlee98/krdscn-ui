// rsc:safe
import * as React from "react";
import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableRow as ShadcnTableRow,
  TableCell as ShadcnTableCell,
  TableCaption as ShadcnTableCaption
} from "@/components/ui/table";
import { cn } from "@/lib/cn";

export type TableProps = React.ComponentProps<"table">;
export type TableHeaderProps = React.ComponentProps<"thead">;
export type TableBodyProps = React.ComponentProps<"tbody">;
export type TableFooterProps = React.ComponentProps<"tfoot">;
export type TableHeadProps = React.ComponentProps<"th">;
export type TableRowProps = React.ComponentProps<"tr">;
export type TableCellProps = React.ComponentProps<"td">;
export type TableCaptionProps = React.ComponentProps<"caption">;

function Table({ className, ...props }: TableProps) {
  return (
    <ShadcnTable
      data-slot="krds-table"
      className={cn("border-krds-gray-20 overflow-hidden rounded-lg border", className)}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <ShadcnTableHeader
      data-slot="krds-table-header"
      className={cn("bg-krds-gray-5 [&_tr]:border-krds-gray-20", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <ShadcnTableBody
      data-slot="krds-table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <ShadcnTableFooter
      data-slot="krds-table-footer"
      className={cn("bg-krds-gray-5 border-krds-gray-20 border-t", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <ShadcnTableHead
      data-slot="krds-table-head"
      className={cn("text-krds-gray-90 font-semibold", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <ShadcnTableRow
      data-slot="krds-table-row"
      className={cn("border-krds-gray-20 hover:bg-krds-gray-5 border-b", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <ShadcnTableCell
      data-slot="krds-table-cell"
      className={cn("text-krds-gray-90", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  return (
    <ShadcnTableCaption
      data-slot="krds-table-caption"
      className={cn("text-krds-gray-50", className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
