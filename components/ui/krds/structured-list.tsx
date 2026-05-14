// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

export type StructuredListProps = React.ComponentProps<"dl">;

export type StructuredListItemProps = React.ComponentProps<"div"> & {
  label: React.ReactNode;
  value: React.ReactNode;
};

export type StructuredListLabelProps = React.ComponentProps<"dt">;

export type StructuredListValueProps = React.ComponentProps<"dd">;

/** 루트 `<dl>` 컨테이너 */
function StructuredList({ className, ...props }: StructuredListProps) {
  return (
    <dl
      data-slot="krds-structured-list"
      className={cn("divide-krds-gray-10 w-full divide-y", "border-krds-gray-20 border-t", className)}
      {...props}
    />
  );
}

/** dt + dd 한 쌍을 감싸는 행 */
function StructuredListItem({ label, value, className, ...props }: StructuredListItemProps) {
  return (
    <div
      data-slot="krds-structured-list-item"
      className={cn("flex min-h-[3rem] items-start", "border-krds-gray-10 border-b", className)}
      {...props}
    >
      <StructuredListLabel>{label}</StructuredListLabel>
      <StructuredListValue>{value}</StructuredListValue>
    </div>
  );
}

/** `<dt>` — 라벨 셀 */
function StructuredListLabel({ className, ...props }: StructuredListLabelProps) {
  return (
    <dt
      data-slot="krds-structured-list-label"
      className={cn("w-1/3 shrink-0 px-4 py-3", "text-krds-gray-70 text-sm font-medium", "bg-krds-gray-5", className)}
      {...props}
    />
  );
}

/** `<dd>` — 값 셀 */
function StructuredListValue({ className, ...props }: StructuredListValueProps) {
  return (
    <dd
      data-slot="krds-structured-list-value"
      className={cn("flex-1 px-4 py-3", "text-krds-gray-90 text-sm", className)}
      {...props}
    />
  );
}

export { StructuredList, StructuredListItem, StructuredListLabel, StructuredListValue };
