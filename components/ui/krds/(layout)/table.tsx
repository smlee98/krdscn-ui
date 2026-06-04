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
export type TableScrollProps = React.ComponentProps<"div"> & {
  /** Bleed full-width on small screens (negative margin + padding). Default false. */
  mobileFullBleed?: boolean;
};

// Horizontal-scroll wrapper. Reference table.html wraps the table in a scroll
// container so wide tables scroll horizontally (notably on mobile).
function TableScroll({ className, mobileFullBleed = false, ...props }: TableScrollProps) {
  return (
    <div
      data-slot="krds-table-scroll"
      className={cn(
        "w-full overflow-x-auto",
        mobileFullBleed && "-mx-4 px-4 md:mx-0 md:px-0",
        className
      )}
      {...props}
    />
  );
}

function Table({ className, ...props }: TableProps) {
  return <ShadcnTable data-slot="krds-table" className={cn("w-full", className)} {...props} />;
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <ShadcnTableHeader
      data-slot="krds-table-header"
      className={cn("bg-krds-surface-secondary-subtle [&_tr:hover]:bg-krds-surface-secondary-subtle [&_tr]:border-b-krds-secondary-10", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: TableBodyProps) {
  return (
    <ShadcnTableBody data-slot="krds-table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  );
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <ShadcnTableFooter
      data-slot="krds-table-footer"
      className={cn("bg-krds-surface-secondary-subtle border-t border-krds-secondary-10", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <ShadcnTableHead
      data-slot="krds-table-head"
      className={cn(
        "h-auto min-w-[80px] px-4 py-2 text-left align-middle text-krds-body-sm font-bold break-words whitespace-normal text-krds-foreground-bolder",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <ShadcnTableRow
      data-slot="krds-table-row"
      className={cn("border-krds-border-light hover:bg-krds-surface-subtler border-b", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <ShadcnTableCell
      data-slot="krds-table-cell"
      className={cn(
        "min-w-[80px] px-4 py-3 align-middle text-krds-body-md break-words whitespace-normal text-krds-foreground-subtle",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  // KRDS/a11y: caption at top (shadcn primitive defaults to caption-bottom).
  return (
    <ShadcnTableCaption
      data-slot="krds-table-caption"
      className={cn("caption-top text-krds-foreground-disabled", className)}
      {...props}
    />
  );
}

export { Table, TableScroll, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
