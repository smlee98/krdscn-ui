"use client";

import * as React from "react";
import { ChevronDown, RotateCcw, Type } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
import { useUISystem } from "@/lib/ui-system";
import { Resize as KrdsResize, type ResizeProps, type ResizeScale } from "@/components/ui/krds/(settings)/resize";

export type { ResizeProps, ResizeScale } from "@/components/ui/krds/(settings)/resize";

// Dual-render dispatcher. resize had no dispatcher → examples imported the KRDS
// component directly and rendered KRDS chrome (custom Popover bubble + krds hex) in
// BOTH systems. shadcn has no resize primitive but DropdownMenu is the canonical
// shadcn surface for this. The shadcn branch rebuilds the scale picker as a
// DropdownMenu radio group (the growing "가" preview is kept as the item glyph) plus
// a reset item, using shadcn tokens. Public API (value/onChange/labels/etc.) is
// preserved.

const DEFAULT_LABELS: Record<ResizeScale, string> = {
  sm: "작게",
  md: "보통",
  lg: "조금 크게",
  xlg: "크게",
  xxlg: "가장 크게"
};

const SCALE_ORDER: ResizeScale[] = ["sm", "md", "lg", "xlg", "xxlg"];

// Container/font size (px) for the growing "가" preview glyph — mirrors KRDS.
const ICON_CONTAINER_SIZE: Record<ResizeScale, number> = { sm: 22, md: 24, lg: 26, xlg: 28, xxlg: 30 };
const ICON_FONT_SIZE: Record<ResizeScale, number> = { sm: 13, md: 15, lg: 17, xlg: 19, xxlg: 21 };

function ShadcnResize({
  value,
  defaultValue = "md",
  onChange,
  buttonText = "화면크기",
  resetText = "초기화",
  labels,
  className
}: ResizeProps) {
  const [internalValue, setInternalValue] = React.useState<ResizeScale>(defaultValue);
  const [open, setOpen] = React.useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const resolvedLabels: Record<ResizeScale, string> = { ...DEFAULT_LABELS, ...labels };

  function handleSelect(scale: ResizeScale) {
    if (!isControlled) setInternalValue(scale);
    onChange?.(scale);
    setOpen(false);
  }

  function handleReset() {
    if (!isControlled) setInternalValue(defaultValue);
    onChange?.(defaultValue);
    setOpen(false);
  }

  return (
    <div data-slot="shadcn-resize" className={cn("relative inline-flex flex-col items-center", className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label={buttonText}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-md px-2 text-sm transition-colors outline-none",
              "hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent",
              "focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            )}
          >
            <Type className="size-4" />
            <span>{buttonText}</span>
            <ChevronDown className="size-4 opacity-50" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" sideOffset={8} className="min-w-[220px]">
          <DropdownMenuRadioGroup value={currentValue} onValueChange={(v) => handleSelect(v as ResizeScale)}>
            {SCALE_ORDER.map((scale) => {
              const isSelected = currentValue === scale;
              return (
                <DropdownMenuRadioItem key={scale} value={scale} className="gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex shrink-0 items-center justify-center rounded-sm",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "border-input text-foreground border bg-background"
                    )}
                    style={{ width: ICON_CONTAINER_SIZE[scale], height: ICON_CONTAINER_SIZE[scale] }}
                  >
                    <span style={{ fontSize: ICON_FONT_SIZE[scale], lineHeight: 1 }}>가</span>
                  </span>
                  <span className={cn("text-sm", isSelected && "font-bold")}>{resolvedLabels[scale]}</span>
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => handleReset()} className="justify-center">
            <RotateCcw className="size-4" />
            {resetText}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function Resize(props: ResizeProps) {
  const system = useUISystem();
  if (system === "krds") return <KrdsResize {...props} />;
  return <ShadcnResize {...props} />;
}
