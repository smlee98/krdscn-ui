"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/lib/cn";

type TooltipVariant = "vertical" | "horizontal" | "box";
type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  text: React.ReactNode;
  variant?: TooltipVariant;
  side?: TooltipSide;
  align?: TooltipAlign;
  className?: string;
  children: React.ReactNode;
  delayDuration?: number;
}

const DEFAULT_SIDE: Record<TooltipVariant, TooltipSide> = {
  vertical: "top",
  horizontal: "right",
  box: "top",
};

function Tooltip({
  text,
  variant = "vertical",
  side,
  align = "center",
  className,
  children,
  delayDuration = 0,
}: TooltipProps) {
  const resolvedSide = side ?? DEFAULT_SIDE[variant];
  const isBox = variant === "box";

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="krds-tooltip"
            data-variant={variant}
            side={resolvedSide}
            align={align}
            sideOffset={isBox ? 10 : 8}
            collisionPadding={8}
            className={cn(
              "relative z-50 text-krds-body-sm",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              isBox
                ? "max-w-[360px] rounded-[12px] border border-krds-border bg-white p-6 text-krds-fg"
                : "whitespace-nowrap rounded-[4px] bg-krds-surface-inverse px-3 py-1 text-white",
              className
            )}
          >
            {text}
            <TooltipArrowMark isBox={isBox} side={resolvedSide} align={align} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

function TooltipArrowMark({
  isBox,
  side,
  align,
}: {
  isBox: boolean;
  side: TooltipSide;
  align: TooltipAlign;
}) {
  const sizeCls = isBox ? "h-3 w-3" : "h-2 w-2";

  const offsetCls: Record<TooltipSide, string> = isBox
    ? {
        top: "bottom-[-6px]",
        bottom: "top-[-6px]",
        left: "right-[-6px]",
        right: "left-[-6px]",
      }
    : {
        top: "bottom-[-4px]",
        bottom: "top-[-4px]",
        left: "right-[-4px]",
        right: "left-[-4px]",
      };

  const colorCls = isBox
    ? cn(
        "bg-white border border-krds-border",
        side === "top" && "border-t-transparent border-l-transparent",
        side === "bottom" && "border-b-transparent border-r-transparent",
        side === "left" && "border-l-transparent border-b-transparent",
        side === "right" && "border-r-transparent border-t-transparent"
      )
    : "bg-krds-surface-inverse";

  let alignCls = "";
  if (side === "top" || side === "bottom") {
    alignCls =
      align === "start"
        ? "left-[24px] -translate-x-1/2"
        : align === "end"
        ? "right-[24px] translate-x-1/2"
        : "left-1/2 -translate-x-1/2";
  } else {
    alignCls =
      align === "start"
        ? "top-[24px] -translate-y-1/2"
        : align === "end"
        ? "bottom-[24px] translate-y-1/2"
        : "top-1/2 -translate-y-1/2";
  }

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute block rotate-45",
        sizeCls,
        offsetCls[side],
        colorCls,
        alignCls
      )}
    />
  );
}

export { Tooltip };
