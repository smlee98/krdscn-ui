// rsc:client
"use client";

import * as React from "react";
import NextLink from "next/link";
import { cva } from "class-variance-authority";
import { Root as Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/cn";

/**
 * KRDS Link (button_link) — Figma node 306:26203
 *
 *  type:
 *   - default      : 파란 링크, 항상 밑줄 (#256ef4 → hover #0b50d0 → pressed #083891 → visited #5917b8)
 *   - subtle       : 본문 검정(#1e2124) + 밑줄 없음; hover/pressed/visited 시 색 변화 + 밑줄
 *   - subtle_none  : 본문 검정 + 밑줄 전혀 없음; hover/pressed/visited 는 색만 변경
 *
 *  size: lg 19px / default 17px / sm 15px (모두 leading-1.5, tracking 0)
 *  gap : lg·default 4px (gap/2) / sm 2px (gap/1)
 *  padding: 좌우 2px (padding/1)
 *  disabled: text/disabled #8a949e, no underline, pointer-events: none
 */
type LinkType = "default" | "subtle" | "subtle_none";
type LinkSize = "sm" | "default" | "lg";

const linkVariants = cva("inline-flex items-center px-0.5 leading-[1.5] tracking-normal", {
  variants: {
    type: {
      default: "text-[#256ef4] underline hover:text-[#0b50d0] active:text-[#083891] visited:text-[#5917b8]",
      subtle:
        "text-[#1e2124] no-underline hover:text-[#0b50d0] hover:underline active:text-[#083891] active:underline visited:text-[#5917b8] visited:underline",
      subtle_none: "text-[#1e2124] no-underline hover:text-[#0b50d0] active:text-[#083891] visited:text-[#5917b8]"
    },
    size: {
      sm: "gap-0.5 text-[15px]",
      default: "gap-1 text-[17px]",
      lg: "gap-1 text-[19px]"
    }
  },
  defaultVariants: { type: "default", size: "default" }
});

function Link({
  type,
  size = "default",
  external = false,
  disabled = false,
  asChild = false,
  preserveColorOnHover = false,
  children,
  className,
  href,
  ...props
}: Omit<React.ComponentProps<"a">, "size" | "type"> & {
  type?: LinkType;
  size?: LinkSize;
  asChild?: boolean;
  preserveColorOnHover?: boolean;
  external?: boolean;
  disabled?: boolean;
}) {
  const effectiveType = type ?? "default";

  const classes = cn(
    linkVariants({ type: effectiveType, size, className }),
    disabled && "pointer-events-none text-[#8a949e] no-underline hover:text-[#8a949e] hover:no-underline",
    preserveColorOnHover && effectiveType === "default" && "hover:text-[#256ef4]"
  );

  const externalProps = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  if (asChild) {
    return (
      <Slot data-slot="krds-link" className={classes} {...externalProps} {...props}>
        {children}
      </Slot>
    );
  }

  if (!href || disabled) {
    return (
      <span data-slot="krds-link" role="link" aria-disabled={disabled} className={classes}>
        {children}
      </span>
    );
  }

  return (
    <NextLink data-slot="krds-link" href={href} className={classes} {...externalProps} {...props}>
      {children}
    </NextLink>
  );
}

export { Link, linkVariants };
export type { LinkType, LinkSize };
