"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type TooltipVariant = "horizontal" | "vertical" | "box";

interface TooltipProps {
  children: ReactNode;
  text: string;
  variant?: TooltipVariant;
  className?: string;
}

const contentStyles: Record<TooltipVariant, string> = {
  horizontal:
    "bg-krds-gray-90 text-white border-0 rounded-sm px-2 py-1 [&_svg]:!bg-krds-gray-90 [&_svg]:!fill-krds-gray-90",
  vertical:
    "bg-krds-gray-90 text-white border-0 rounded-sm px-2 py-1 [&_svg]:!bg-krds-gray-90 [&_svg]:!fill-krds-gray-90",
  box: "bg-krds-gray-5 text-krds-gray-90 border border-krds-gray-20 rounded-xl px-4 py-3 [&_svg]:!bg-krds-gray-5 [&_svg]:!fill-krds-gray-5"
};

const sideMap: Record<TooltipVariant, "top" | "right" | "bottom" | "left"> = {
  horizontal: "right",
  vertical: "top",
  box: "top"
};

function Tooltip({ children, text, variant = "horizontal", className }: TooltipProps) {
  return (
    <ShadcnTooltip delayDuration={0}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={sideMap[variant]}
        sideOffset={4}
        className={cn("z-50 max-w-[15rem] text-xs leading-snug", contentStyles[variant], className)}
      >
        {text}
      </TooltipContent>
    </ShadcnTooltip>
  );
}

export type { TooltipProps, TooltipVariant };
export { Tooltip };
