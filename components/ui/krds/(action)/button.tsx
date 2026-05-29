/**
 * KRDS Button — Figma nodes 305:2236 (button) + 300:26102 (button_text)
 *
 *  variant:
 *   - default    : 파란 fill #256ef4 (hover #0b50d0 → pressed #083891)
 *   - secondary  : 옅은 파랑 fill #ecf2fe + 파란 테두리/텍스트 (#0b50d0)
 *   - outline    : 투명 fill + 회색 테두리(#58616a) + 본문 텍스트(#1e2124) [shadcn-compat]
 *   - ghost      : 투명 fill, hover/pressed 만 회색 surface [shadcn-compat]
 *   - link       : 텍스트 링크 스타일 버튼
 *   - tertiary   : 투명 fill + 회색 테두리(#58616a) + 본문 텍스트(#1e2124) [KRDS extension]
 *   - text       : button_text — 투명 fill, hover/pressed 만 회색 surface [KRDS extension]
 *
 *  size (button: xs–xl / button_text: xs–lg):
 *   - xs      : 32h · px-2.5 · gap-0.5 · text-15 · radius-4
 *   - sm      : 40h · px-3   · gap-1   · text-15 · radius-6
 *   - default : 48h · px-4   · gap-1   · text-17 · radius-6
 *   - lg      : 56h · px-5   · gap-1   · text-17 · radius-8
 *   - xl      : 64h · px-6   · gap-1   · text-19 · radius-8
 *   - icon    : 48×48 (size-12) · p-0
 *
 *  text 변형은 Figma button_text 의 더 컴팩트한 높이(20/24/32/40)를 사용.
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Root as Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/cn";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link" | "tertiary" | "text";
type ButtonSize = "xs" | "sm" | "default" | "lg" | "xl" | "icon";

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
        default: [
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
        outline: [
          "border border-[#58616a] bg-transparent text-[#1e2124]",
          "hover:bg-[#f4f5f6]",
          "active:bg-[#e6e8ea]",
          "disabled:border-[#b1b8be] disabled:bg-transparent disabled:text-[#6d7882]"
        ].join(" "),
        ghost: [
          "border border-transparent bg-transparent text-[#1e2124]",
          "hover:bg-[#f4f5f6]",
          "active:bg-[#e6e8ea]",
          "disabled:bg-transparent disabled:text-[#8a949e]"
        ].join(" "),
        link: [
          "border border-transparent bg-transparent text-[#256ef4] underline underline-offset-2",
          "hover:text-[#0b50d0]",
          "active:text-[#083891]",
          "disabled:text-[#8a949e] disabled:no-underline"
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
        ].join(" ")
      },
      size: {
        xs: "h-8 gap-0.5 rounded-[4px] text-[15px]",
        sm: "h-10 gap-1 rounded-[6px] text-[15px]",
        default: "h-12 gap-1 rounded-[6px] text-[17px]",
        lg: "h-14 gap-1 rounded-[8px] text-[17px]",
        xl: "h-16 gap-1 rounded-[8px] text-[19px]",
        icon: "size-12 gap-1 rounded-[6px] text-[17px] p-0"
      }
    },
    compoundVariants: [
      // ── 일반 fill 타입: 가로 padding + min-width ──
      {
        variant: ["default", "secondary", "tertiary", "outline"],
        size: "xs",
        class: "min-w-[60px] px-2.5"
      },
      {
        variant: ["default", "secondary", "tertiary", "outline"],
        size: "sm",
        class: "min-w-[64px] px-3"
      },
      {
        variant: ["default", "secondary", "tertiary", "outline"],
        size: "default",
        class: "min-w-[78px] px-4"
      },
      {
        variant: ["default", "secondary", "tertiary", "outline"],
        size: "lg",
        class: "min-w-[90px] px-5"
      },
      {
        variant: ["default", "secondary", "tertiary", "outline"],
        size: "xl",
        class: "min-w-[98px] px-6"
      },
      // ── text / link / ghost: 컴팩트 padding + button_text 높이 ──
      { variant: ["text", "link", "ghost"], size: "xs", class: "h-5 px-0.5" },
      { variant: ["text", "link", "ghost"], size: "sm", class: "h-6 px-0.5" },
      { variant: ["text", "link", "ghost"], size: "default", class: "h-8 px-0.5" },
      { variant: ["text", "link", "ghost"], size: "lg", class: "h-10 px-0.5" },
      { variant: ["text", "link", "ghost"], size: "xl", class: "h-10 px-0.5" },
      // ── icon size: 정사각형 스타일 보강 ──
      { variant: ["outline", "tertiary"], size: "icon", class: "border bg-transparent" },
      { variant: ["ghost", "text"], size: "icon", class: "border-transparent bg-transparent" }
    ],
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant = "default", size = "default", asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
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
export type { ButtonProps, ButtonVariant, ButtonSize };
