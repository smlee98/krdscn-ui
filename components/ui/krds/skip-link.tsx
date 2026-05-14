// rsc:safe
import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";

function SkipLink({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="krds-skip-link"
      className={cn(
        "sr-only",
        "focus:not-sr-only",
        "focus:absolute focus:top-3 focus:left-3 focus:z-50",
        "focus:inline-flex focus:items-center focus:gap-1",
        "focus:rounded focus:px-4 focus:py-2",
        "focus:bg-krds-primary-50 focus:text-krds-gray-0",
        "focus:text-sm focus:leading-none focus:font-medium",
        "focus:ring-krds-primary-90 focus:ring-2 focus:ring-offset-2 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

export { SkipLink };
