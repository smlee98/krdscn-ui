"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type TextListType = "decimal" | "dash" | "hollow" | "ordered";

export type TextListProps = Omit<React.HTMLAttributes<HTMLUListElement | HTMLOListElement>, "type"> & {
  type?: TextListType;
};

export type TextListItemProps = React.ComponentProps<"li"> & {
  number?: string;
};

function TextList({ type = "dash", className, ...rest }: TextListProps) {
  const isOrdered = type === "decimal" || type === "ordered";

  const listStyle = {
    decimal: "list-decimal pl-5",
    ordered: "list-decimal pl-5",
    dash: "list-none pl-0",
    hollow: "list-none pl-0"
  }[type];

  if (isOrdered) {
    return (
      <ol
        data-slot="krds-text-list"
        data-type={type}
        className={cn(listStyle, "flex flex-col gap-1", "text-krds-gray-90 text-sm", className)}
        {...(rest as React.HTMLAttributes<HTMLOListElement>)}
      />
    );
  }

  return (
    <ul
      data-slot="krds-text-list"
      data-type={type}
      className={cn(listStyle, "flex flex-col gap-1", "text-krds-gray-90 text-sm", className)}
      {...(rest as React.HTMLAttributes<HTMLUListElement>)}
    />
  );
}

function TextListItem({ className, number, children, ...props }: TextListItemProps) {
  return (
    <li
      data-slot="krds-text-list-item"
      className={cn("flex items-start gap-1", className)}
      {...props}
    >
      {number !== undefined && (
        <span aria-hidden="true" className="shrink-0">
          {number}.
        </span>
      )}
      <span>{children}</span>
    </li>
  );
}

export { TextList, TextListItem };
