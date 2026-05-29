"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge as ShadcnBadge } from "@/components/ui/badge";
import {
  Tag as KrdsTag,
  TagDelete as KrdsTagDelete,
  tagVariants,
  type TagProps as KrdsTagProps,
  type LinkTagProps
} from "@/components/ui/krds/(selection)/tag";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";

export type TagProps = KrdsTagProps;

// KRDS Tag has no color axis — only size + deletable/link kind. shadcn's Badge
// has no pill/size/link semantics, so in shadcn mode every KRDS Tag maps to the
// neutral "secondary" Badge (closest vanilla pill), and the KRDS-only props
// (size / interactive / asChild) are dropped (cf. badge.tsx variant fallback).
// The only KRDS surplus we preserve is link semantics: an href renders the
// Badge as an <a> via asChild.
export function Tag(props: TagProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTag {...props} />;

  const { children, className } = props;

  if (props.variant === "link") {
    const { href, target, rel } = props as LinkTagProps;
    return (
      <ShadcnBadge asChild variant="secondary" className={cn("cursor-pointer", className)}>
        <a href={href} target={target} rel={rel}>
          {children}
        </a>
      </ShadcnBadge>
    );
  }

  return (
    <ShadcnBadge variant="secondary" className={className}>
      {children}
    </ShadcnBadge>
  );
}

// shadcn mode: minimal inline delete affordance (lucide X) using shadcn tokens.
export function TagDelete(props: React.ComponentProps<"button">) {
  const system = useUISystem();
  if (system === "krds") return <KrdsTagDelete {...props} />;

  const { className, ...rest } = props;
  return (
    <button
      type="button"
      aria-label="태그 삭제"
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-full",
        "text-muted-foreground hover:text-foreground",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      {...rest}
    >
      <X className="size-3" />
    </button>
  );
}

export { tagVariants };
