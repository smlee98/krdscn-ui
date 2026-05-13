"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export type TextListType = "decimal" | "dash" | "hollow" | "ordered";

export interface TextListProps extends Omit<React.HTMLAttributes<HTMLUListElement | HTMLOListElement>, "type"> {
  type?: TextListType;
  children?: React.ReactNode;
  className?: string;
}

export interface TextListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  className?: string;
  number?: string;
}

function TextList({ type = "dash", children, className, ...rest }: TextListProps) {
  const isOrdered = type === "decimal" || type === "ordered";

  const listStyle = {
    decimal: "list-decimal pl-5",
    ordered: "list-decimal pl-5",
    dash: "list-none pl-0",
    hollow: "list-none pl-0",
  }[type];

  if (isOrdered) {
    return (
      <ol
        data-type={type}
        className={cn(
          listStyle,
          "flex flex-col gap-1",
          "text-sm text-krds-gray-90",
          className
        )}
        {...(rest as React.HTMLAttributes<HTMLOListElement>)}
      >
        {children}
      </ol>
    );
  }

  return (
    <ul
      data-type={type}
      className={cn(
        listStyle,
        "flex flex-col gap-1",
        "text-sm text-krds-gray-90",
        className
      )}
      {...(rest as React.HTMLAttributes<HTMLUListElement>)}
    >
      {children}
    </ul>
  );
}

function TextListItem({ children, className, number, ...rest }: TextListItemProps) {
  return (
    <li
      className={cn("flex items-start gap-1", className)}
      {...rest}
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
