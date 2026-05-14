// rsc:client
"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export { DemoCard };

function DemoCard({
  title,
  description,
  className,
  children
}: {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("border-border space-y-3 rounded-lg border bg-white p-6", className)}>
      {title && <div className="text-foreground text-sm font-semibold">{title}</div>}
      {description && <p className="text-muted-foreground text-xs">{description}</p>}
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}
