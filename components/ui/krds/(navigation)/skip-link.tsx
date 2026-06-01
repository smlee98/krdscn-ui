// rsc:safe
import * as React from "react";
import { cn } from "@/lib/cn";

type SkipLinkProps = {
  className?: string;
  href?: string;
  children?: React.ReactNode;
};

function SkipLink({ className, href = "#main-content", children = "본문 바로가기" }: SkipLinkProps) {
  return (
    <a
      data-slot="krds-skip-link"
      href={href}
      className={cn(
        "flex h-8 w-full items-center justify-center",
        "bg-krds-gray-90 text-krds-gray-0 text-krds-body-sm",
        "no-underline",
        "focus-visible:outline-krds-primary-50 focus-visible:outline focus-visible:-outline-offset-2",
        className
      )}
    >
      {children}
    </a>
  );
}

export { SkipLink };
