/**
 * KRDS Button — Figma nodes 305:2236 (button) + 300:26102 (button_text)
 *
 *  variant:
 *   - primary    : 파란 fill #256ef4 (hover #0b50d0 → pressed #083891)
 *   - secondary  : 옅은 파랑 fill #ecf2fe + 파란 테두리/텍스트 (#0b50d0)
 *   - tertiary   : 투명 fill + 회색 테두리(#58616a) + 본문 텍스트(#1e2124)
 *   - text       : button_text — 투명 fill, hover/pressed 만 회색 surface, 텍스트 #1e2124
 *   - link       : (legacy) 텍스트 링크 스타일 버튼
 *   - icon       : (legacy) 아이콘 전용 정사각형
 *
 *  size (button: xsmall–xlarge / button_text: xsmall–large):
 *   - xsmall : 32h · px-2.5 · gap-0.5 · text-15 · radius-4
 *   - small  : 40h · px-3   · gap-1   · text-15 · radius-6
 *   - medium : 48h · px-4   · gap-1   · text-17 · radius-6
 *   - large  : 56h · px-5   · gap-1   · text-17 · radius-8
 *   - xlarge : 64h · px-6   · gap-1   · text-19 · radius-8
 *
 *  text 변형은 Figma button_text 의 더 컴팩트한 높이(20/24/32/40)를 사용.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text" | "link" | "icon";
type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-normal leading-[1.5] tracking-normal transition-colors outline-none",
    "disabled:pointer-events-none",
    "focus-visible:outline-2 focus-visible:outline-krds-primary-50 focus-visible:outline-offset-2"
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "border border-[#256ef4] bg-[#256ef4] text-white",
          "hover:border-[#0b50d0] hover:bg-[#0b50d0]",
          "active:border-[#083891] active:bg-[#083891]",
          "disabled:border-[#cdd1d5] disabled:bg-[#cdd1d5] disabled:text-[#6d7882]"
        ].join(" "),
        secondary: [
          "border border-[#256ef4] bg-[#ecf2fe] text-[#0b50d0]",
          "hover:bg-[#d8e5fd]",
          "active:bg-[#b1cefb]",
          "disabled:border-[#b1b8be] disabled:bg-transparent disabled:text-[#6d7882]"
        ].join(" "),
        tertiary: [
          "border border-[#58616a] bg-transparent text-[#1e2124]",
          "hover:bg-[#f4f5f6]",
          "active:bg-[#e6e8ea]",
          "disabled:border-[#b1b8be] disabled:bg-transparent disabled:text-[#6d7882]"
        ].join(" "),
        text: [
          "border border-transparent bg-transparent text-[#1e2124]",
          "hover:bg-[#eef2f7]",
          "active:bg-[#d6e0eb]",
          "disabled:bg-transparent disabled:text-[#8a949e]"
        ].join(" "),
        link: [
          "border border-transparent bg-transparent text-[#256ef4] underline underline-offset-2",
          "hover:text-[#0b50d0]",
          "active:text-[#083891]",
          "disabled:text-[#8a949e] disabled:no-underline"
        ].join(" "),
        icon: [
          "aspect-square border border-[#58616a] bg-transparent p-0 text-[#1e2124]",
          "hover:bg-[#f4f5f6]",
          "active:bg-[#e6e8ea]",
          "disabled:border-[#b1b8be] disabled:bg-transparent disabled:text-[#6d7882]"
        ].join(" ")
      },
      size: {
        xsmall: "h-8 gap-0.5 rounded-[4px] text-[15px]",
        small: "h-10 gap-1 rounded-[6px] text-[15px]",
        medium: "h-12 gap-1 rounded-[6px] text-[17px]",
        large: "h-14 gap-1 rounded-[8px] text-[17px]",
        xlarge: "h-16 gap-1 rounded-[8px] text-[19px]"
      }
    },
    compoundVariants: [
      // ── 일반 fill 타입: 가로 padding + min-width ──
      {
        variant: ["primary", "secondary", "tertiary"],
        size: "xsmall",
        class: "min-w-[60px] px-2.5"
      },
      {
        variant: ["primary", "secondary", "tertiary"],
        size: "small",
        class: "min-w-[64px] px-3"
      },
      {
        variant: ["primary", "secondary", "tertiary"],
        size: "medium",
        class: "min-w-[78px] px-4"
      },
      {
        variant: ["primary", "secondary", "tertiary"],
        size: "large",
        class: "min-w-[90px] px-5"
      },
      {
        variant: ["primary", "secondary", "tertiary"],
        size: "xlarge",
        class: "min-w-[98px] px-6"
      },
      // ── text / link: 컴팩트 padding + button_text 높이 ──
      { variant: ["text", "link"], size: "xsmall", class: "h-5 px-0.5" },
      { variant: ["text", "link"], size: "small", class: "h-6 px-0.5" },
      { variant: ["text", "link"], size: "medium", class: "h-8 px-0.5" },
      { variant: ["text", "link"], size: "large", class: "h-10 px-0.5" },
      { variant: ["text", "link"], size: "xlarge", class: "h-10 px-0.5" },
      // ── icon: 정사각형 (size 그대로 너비로 사용) ──
      { variant: "icon", size: "xsmall", class: "w-8" },
      { variant: "icon", size: "small", class: "w-10" },
      { variant: "icon", size: "medium", class: "w-12" },
      { variant: "icon", size: "large", class: "w-14" },
      { variant: "icon", size: "xlarge", class: "w-16" }
    ],
    defaultVariants: {
      variant: "primary",
      size: "medium"
    }
  }
);

function Button({
  className,
  variant = "primary",
  size = "medium",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="krds-button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonVariant, ButtonSize };
