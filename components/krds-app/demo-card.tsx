// rsc:client
"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export { DemoCard, DemoSection, GroupHeading };

function DemoCard({
  title,
  description,
  className,
  children,
}: {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-white p-6 space-y-3", className)}>
      {title && <div className="text-sm font-semibold text-foreground">{title}</div>}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      <div className="flex flex-wrap gap-4 items-start">{children}</div>
    </div>
  );
}

function DemoSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2
        id={id}
        data-section-id={id}
        className="text-base font-semibold mb-4 pb-2 border-b border-border"
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function GroupHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-14 mb-6 first:mt-0">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-2">
        {children}
      </p>
      <hr className="border-border" />
    </div>
  );
}
