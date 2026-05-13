// rsc:safe
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/*  StructuredList — <dl> 기반 라벨/값 그리드                            */
/* ------------------------------------------------------------------ */

export interface StructuredListProps extends HTMLAttributes<HTMLDListElement> {
  children?: ReactNode;
  className?: string;
}

export interface StructuredListItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}

export interface StructuredListLabelProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

export interface StructuredListValueProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
}

/** 루트 `<dl>` 컨테이너 */
function StructuredList({ children, className, ...rest }: StructuredListProps) {
  return (
    <dl className={cn("divide-krds-gray-10 w-full divide-y", "border-krds-gray-20 border-t", className)} {...rest}>
      {children}
    </dl>
  );
}

/** dt + dd 한 쌍을 감싸는 행 */
function StructuredListItem({ label, value, className, ...rest }: StructuredListItemProps) {
  return (
    <div className={cn("flex min-h-[3rem] items-start", "border-krds-gray-10 border-b", className)} {...rest}>
      <StructuredListLabel>{label}</StructuredListLabel>
      <StructuredListValue>{value}</StructuredListValue>
    </div>
  );
}

/** `<dt>` — 라벨 셀 */
function StructuredListLabel({ children, className, ...rest }: StructuredListLabelProps) {
  return (
    <dt
      className={cn("w-1/3 shrink-0 px-4 py-3", "text-krds-gray-70 text-sm font-medium", "bg-krds-gray-5", className)}
      {...rest}
    >
      {children}
    </dt>
  );
}

/** `<dd>` — 값 셀 */
function StructuredListValue({ children, className, ...rest }: StructuredListValueProps) {
  return (
    <dd className={cn("flex-1 px-4 py-3", "text-krds-gray-90 text-sm", className)} {...rest}>
      {children}
    </dd>
  );
}

export { StructuredList, StructuredListItem, StructuredListLabel, StructuredListValue };
