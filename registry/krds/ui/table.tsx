// rsc:safe
import * as React from "react"

import { cn } from "@/lib/utils"

export type TableProps = React.ComponentProps<"table">
export type TableHeaderProps = React.ComponentProps<"thead">
export type TableBodyProps = React.ComponentProps<"tbody">
export type TableFooterProps = React.ComponentProps<"tfoot">
export type TableHeadProps = React.ComponentProps<"th">
export type TableRowProps = React.ComponentProps<"tr">
export type TableCellProps = React.ComponentProps<"td">
export type TableCaptionProps = React.ComponentProps<"caption">
export type TableColgroupProps = React.ComponentProps<"colgroup">
export type TableColProps = React.ComponentProps<"col">
export type TableScrollProps = React.ComponentProps<"div"> & {
  /** Bleed full-width on small screens (negative margin + padding). Default false. */
  mobileFullBleed?: boolean
}

// Horizontal-scroll wrapper. Reference table.html wraps the table in a scroll
// container so wide tables scroll horizontally (notably on mobile).
function TableScroll({ className, mobileFullBleed = false, ...props }: TableScrollProps) {
  return (
    <div
      data-slot="krds-table-scroll"
      className={cn("w-full overflow-x-auto", mobileFullBleed && "-mx-4 px-4 md:mx-0 md:px-0", className)}
      {...props}
    />
  )
}

function Table({ className, ...props }: TableProps) {
  return (
    <div data-slot="krds-table-container" className="relative w-full overflow-x-auto">
      {/* KRDS size-medium(모바일) 이하에서 .tbl min-width 73.2rem → 표가 찌그러지지 않고 TableScroll에서 가로 스크롤 (_table.scss:87). */}
      <table
        data-slot="krds-table"
        className={cn("w-full caption-bottom text-sm max-md:min-w-[732px]", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: TableHeaderProps) {
  return (
    <thead
      data-slot="krds-table-header"
      className={cn(
        "bg-krds-surface-secondary-subtle [&_tr:hover]:bg-krds-surface-secondary-subtle [&_tr]:border-b-krds-secondary-10 [&_tr]:border-b",
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: TableBodyProps) {
  return <tbody data-slot="krds-table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <tfoot
      data-slot="krds-table-footer"
      className={cn(
        "bg-krds-surface-secondary-subtle border-krds-secondary-10 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="krds-table-head"
      className={cn(
        "text-krds-body-sm text-krds-foreground-bolder h-auto min-w-[80px] px-4 py-2 text-left align-middle font-bold break-words whitespace-normal [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="krds-table-row"
      className={cn(
        "has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-krds-border-light hover:bg-krds-surface-subtler border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      data-slot="krds-table-cell"
      className={cn(
        "text-krds-body-md text-krds-foreground-subtle min-w-[80px] p-2 px-4 py-3 align-middle break-words whitespace-normal [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: TableCaptionProps) {
  // KRDS/a11y: caption at top (native <caption> defaults to caption-side: bottom via `caption-bottom` on <table>).
  return (
    <caption
      data-slot="krds-table-caption"
      className={cn("text-krds-foreground-disabled mt-4 caption-top text-sm", className)}
      {...props}
    />
  )
}

// KRDS 원본 `.tbl.col`은 <colgroup>/<col>로 열 너비를 고정한다(table.html:5-8).
// 네이티브 요소 그대로 — <col>은 style/width 로 열 폭을 지정한다.
function TableColgroup({ ...props }: TableColgroupProps) {
  return <colgroup data-slot="krds-table-colgroup" {...props} />
}

function TableCol({ ...props }: TableColProps) {
  return <col data-slot="krds-table-col" {...props} />
}

export {
  Table,
  TableScroll,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableColgroup,
  TableCol,
}
