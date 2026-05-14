// rsc:safe

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export { ExamplePreview };

function ExamplePreview({
  children,
  label,
  description,
  className
}: {
  children: ReactNode;
  label?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div data-slot="example-preview" className={cn("bg-background rounded-lg border p-6", className)}>
      {(label || description) && (
        <div className="mb-3 space-y-1">
          {label && <p className="text-foreground text-xs font-semibold">{label}</p>}
          {description && <p className="text-muted-foreground text-xs">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
