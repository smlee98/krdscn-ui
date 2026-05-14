// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

function Identifier({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="krds-identifier"
      role="contentinfo"
      className={cn(
        "flex flex-col gap-1 px-4 py-3",
        "bg-krds-gray-5 border-krds-gray-20 border-t",
        "text-krds-gray-70 text-sm",
        className
      )}
      {...props}
    />
  );
}

function IdentifierOrg({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="krds-identifier-org"
      className={cn("text-krds-gray-90 font-semibold", className)}
      {...props}
    />
  );
}

function IdentifierLinks({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="krds-identifier-links"
      className={cn("mt-1 flex flex-wrap gap-x-3 gap-y-1", className)}
      {...props}
    />
  );
}

function IdentifierLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <li data-slot="krds-identifier-link">
      <a
        className={cn(
          "text-krds-primary-50 hover:text-krds-primary-70 underline",
          className
        )}
        {...props}
      />
    </li>
  );
}

export { Identifier, IdentifierOrg, IdentifierLinks, IdentifierLink };
