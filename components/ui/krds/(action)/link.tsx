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
 *  size: large 19px / medium 17px / small 15px (모두 leading-1.5, tracking 0)
 *  gap : large·medium 4px (gap/2) / small 2px (gap/1)
 *  padding: 좌우 2px (padding/1)
 *  disabled: text/disabled #8a949e, no underline, pointer-events: none
 */
type LinkType = "default" | "subtle" | "subtle_none";
type LinkSize = "small" | "medium" | "large";

/** @deprecated 이전 variant API — `type` 으로 마이그레이션 권장 */
type LinkVariant = "default" | "basic" | "unstyled";
/** @deprecated 밑줄 표시는 이제 `type` 으로 결정됨 — override 용으로만 사용 */
type LinkUnderline = "always" | "hover" | "none";
/** API 입력용 — 내부에서 정식 3-스케일로 정규화 */
type LinkSizeProp = LinkSize | "xsmall" | "xlarge";

const linkVariants = cva("inline-flex items-center px-0.5 leading-[1.5] tracking-normal", {
  variants: {
    type: {
      default: "text-[#256ef4] underline hover:text-[#0b50d0] active:text-[#083891] visited:text-[#5917b8]",
      subtle:
        "text-[#1e2124] no-underline hover:text-[#0b50d0] hover:underline active:text-[#083891] active:underline visited:text-[#5917b8] visited:underline",
      subtle_none: "text-[#1e2124] no-underline hover:text-[#0b50d0] active:text-[#083891] visited:text-[#5917b8]"
    },
    size: {
      small: "gap-0.5 text-[15px]",
      medium: "gap-1 text-[17px]",
      large: "gap-1 text-[19px]"
    }
  },
  defaultVariants: { type: "default", size: "medium" }
});

const VARIANT_TO_TYPE: Record<LinkVariant, LinkType> = {
  default: "default",
  basic: "subtle",
  unstyled: "subtle_none"
};

const SIZE_TO_CANONICAL: Record<LinkSizeProp, LinkSize> = {
  xsmall: "small",
  small: "small",
  medium: "medium",
  large: "large",
  xlarge: "large"
};

const ICON_PX: Record<LinkSize, number> = { small: 16, medium: 20, large: 24 };

function resolveUnderlineOverride(underline?: LinkUnderline): string {
  switch (underline) {
    case "always":
      return "underline hover:underline active:underline visited:underline";
    case "hover":
      return "no-underline hover:underline";
    case "none":
      return "no-underline hover:no-underline active:no-underline visited:no-underline";
    default:
      return "";
  }
}

function Link({
  type,
  variant,
  size = "medium",
  underline,
  icon,
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
  /** @deprecated `type` 으로 마이그레이션 (basic → subtle, unstyled → subtle_none) */
  variant?: LinkVariant;
  size?: LinkSizeProp;
  /** @deprecated 밑줄은 `type` 으로 결정됨 — 특수 케이스 override 용 */
  underline?: LinkUnderline;
  asChild?: boolean;
  preserveColorOnHover?: boolean;
  icon?: React.ReactNode;
  external?: boolean;
  disabled?: boolean;
}) {
  const resolvedSize = SIZE_TO_CANONICAL[size];
  const resolvedType: LinkType = type ?? (variant ? VARIANT_TO_TYPE[variant] : "default");

  const classes = cn(
    linkVariants({ type: resolvedType, size: resolvedSize, className }),
    resolveUnderlineOverride(underline),
    disabled && "pointer-events-none text-[#8a949e] no-underline hover:text-[#8a949e] hover:no-underline",
    preserveColorOnHover && resolvedType === "default" && "hover:text-[#256ef4]"
  );

  const externalProps = external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

  const iconPx = ICON_PX[resolvedSize];
  const content = (
    <>
      {children}
      {icon && (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center"
          style={{ width: iconPx, height: iconPx }}
        >
          {icon}
        </span>
      )}
    </>
  );

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
        {content}
      </span>
    );
  }

  return (
    <NextLink data-slot="krds-link" href={href} className={classes} {...externalProps} {...props}>
      {content}
    </NextLink>
  );
}

export { Link, linkVariants };
export type { LinkType, LinkSize, LinkSizeProp, LinkVariant, LinkUnderline };
