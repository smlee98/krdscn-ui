// rsc:client
"use client"

import * as React from "react"
import NextLink from "next/link"
import { cva } from "class-variance-authority"
import { Root as Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

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
type LinkType = "default" | "subtle" | "subtle_none"
type LinkSize = "sm" | "default" | "lg"

const linkVariants = cva(
  "inline-flex items-center rounded-[6px] px-0.5 leading-[1.5] tracking-normal outline-none focus-visible:krds-focus-ring",
  {
    variants: {
      type: {
        default:
          // 색 사다리(50→60→70; 고대비 30→20→10): base/pressed는 numeric+dark:, hover는 foreground-primary(60/고대비20)가 이미 일치
          "text-krds-primary-50 dark:text-krds-primary-30 underline hover:text-krds-foreground-primary active:text-krds-primary-70 dark:active:text-krds-primary-10 visited:text-krds-foreground-visited",
        subtle:
          "text-krds-foreground no-underline hover:text-krds-foreground-primary hover:underline active:text-krds-foreground-primary active:underline visited:text-krds-foreground-visited visited:underline",
        subtle_none:
          "text-krds-foreground no-underline hover:text-krds-foreground-primary active:text-krds-foreground-primary visited:text-krds-foreground-visited",
      },
      size: {
        sm: "gap-0.5 text-krds-body-sm",
        default: "gap-1 text-krds-body-md",
        lg: "gap-1 text-krds-body-lg",
      },
    },
    defaultVariants: { type: "default", size: "default" },
  }
)

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
  type?: LinkType
  size?: LinkSize
  asChild?: boolean
  preserveColorOnHover?: boolean
  external?: boolean
  disabled?: boolean
}) {
  const effectiveType = type ?? "default"

  const classes = cn(
    linkVariants({ type: effectiveType, size, className }),
    disabled &&
      "pointer-events-none text-krds-foreground-disabled no-underline hover:text-krds-foreground-disabled hover:no-underline",
    preserveColorOnHover && effectiveType === "default" && "hover:text-krds-primary-50 dark:hover:text-krds-primary-30"
  )

  const externalProps = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {}

  if (asChild) {
    return (
      <Slot data-slot="krds-link" className={classes} {...externalProps} {...props}>
        {children}
      </Slot>
    )
  }

  if (!href || disabled) {
    return (
      <span data-slot="krds-link" role="link" aria-disabled={disabled} className={classes}>
        {children}
      </span>
    )
  }

  return (
    <NextLink data-slot="krds-link" href={href} className={classes} {...externalProps} {...props}>
      {children}
    </NextLink>
  )
}

export { Link, linkVariants }
export type { LinkType, LinkSize }
