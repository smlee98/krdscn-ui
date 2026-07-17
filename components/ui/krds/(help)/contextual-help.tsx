// rsc:client
"use client"

import * as React from "react"
import { Info, X } from "lucide-react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { cn } from "@/lib/cn"

// ─── ContextualHelp ───────────────────────────────────────────────────────────
//
// Matches KRDS storybook ContextualHelp API and Figma design (node 343:54748).
// Single component with a question-mark trigger button and an anchored
// popover panel. Position controls vertical side; alignment controls
// horizontal anchor (left/center/right). Arrow is rendered manually as
// inline SVG at a fixed 24px offset from the popover edge (per Figma),
// since Radix's PopoverArrow can't replicate the exact placement.
//
// Compose ContextualHelpTitle as the first child for a bold panel heading.
// Compose ContextualHelpLabel as a sibling before <ContextualHelp> for a trigger label.

type ContextualHelpProps = {
  /** Popover body content. Compose ContextualHelpTitle as first child for a heading. */
  children: React.ReactNode
  /** Vertical position of the popover relative to the trigger. */
  position?: "top" | "bottom"
  /** Horizontal anchor alignment of the popover. */
  alignment?: "left" | "center" | "right"
  /** Controlled open state. */
  open?: boolean
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean
  /** Called when open state changes. */
  onOpenChange?: (open: boolean) => void
  /** Class applied to the outer wrapper. */
  className?: string
}

// Geometry for the arrow placement.
//   - Trigger button: 24×24, center at 12px from its edge.
//   - Arrow: 22×12, drawn 24px from the popover edge (center at 24 + 11 = 35px).
// For align=start (left): default popover-left == trigger-left.
//   To make arrow center coincide with trigger center we must shift the popover
//   left by 35 - 12 = 23px → alignOffset = -23.
// For align=end (right): Radix internally negates alignOffset, so the same -23
//   produces a +23 shift (popover slides right) which puts its mirrored arrow
//   center on the trigger center.
const ALIGN_OFFSET = -23

function ContextualHelp({
  children,
  position = "top",
  alignment = "left",
  open,
  defaultOpen,
  onOpenChange,
  className,
}: ContextualHelpProps) {
  const align = alignment === "left" ? "start" : alignment === "right" ? "end" : "center"
  const alignOffset = alignment === "center" ? 0 : ALIGN_OFFSET

  return (
    <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <div
        data-slot="krds-contextual-help"
        data-position={position}
        data-alignment={alignment}
        className={cn("inline-flex items-center gap-2", className)}
      >
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            aria-label="도움말"
            className={cn(
              "inline-flex size-6 items-center justify-center rounded-[4px]",
              "bg-transparent transition-colors",
              "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-subtle",
              "focus-visible:krds-focus-ring"
            )}
          >
            <span className="sr-only">도움말</span>
            <Info className="text-krds-foreground-information size-5" aria-hidden="true" />
          </button>
        </PopoverPrimitive.Trigger>
      </div>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side={position}
          align={align}
          sideOffset={8}
          alignOffset={alignOffset}
          collisionPadding={8}
          role="tooltip"
          data-alignment={alignment}
          className={cn(
            "group/cxh border-krds-border bg-krds-surface relative w-[360px] rounded-[12px] border p-6",
            "flex flex-col gap-2",
            // KRDS --krds-contextual-help--popover-shadow: 0 0 0.2rem shadow2, 0 0.8rem 1.6rem shadow3 (_contextual_help.scss:29,73)
            "shadow-[0_0_2px_0_rgba(0,0,0,0.08),0_8px_16px_0_rgba(0,0,0,0.12)]",
            "dark:shadow-[0_0_2px_0_rgba(0,0,0,0.2),0_8px_16px_0_rgba(0,0,0,0.4)]",
            "z-50 origin-(--radix-popover-content-transform-origin) outline-hidden",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="text-krds-body-sm text-krds-foreground flex flex-1 flex-col gap-2">{children}</div>
              <PopoverPrimitive.Close
                aria-label="닫기"
                className={cn(
                  "text-krds-foreground inline-flex size-4 shrink-0 items-center justify-center",
                  "hover:text-krds-foreground-primary",
                  "focus-visible:krds-focus-ring"
                )}
              >
                <X className="size-4" aria-hidden="true" />
              </PopoverPrimitive.Close>
            </div>
          </div>

          {/* Arrow follows the actually rendered side via Radix's data-side attribute, so it stays
              correct when collision detection flips the popover on scroll. 16px square rotated 45deg
              with the top+left borders erased (KRDS --bubble-arrow-size: 1.6rem, _contextual_help.scss:
              60,74-84) — same border-square technique as language-switcher's caret span. side=bottom
              needs an extra 180deg (→225deg total) since the transparent borders must face the opposite
              corner to point up instead of down. Hidden below the mobile breakpoint (:164-172,164-180). */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute block h-4 w-4 rotate-45",
              "border-krds-border bg-krds-surface border border-t-transparent border-l-transparent",
              "group-data-[side=top]/cxh:-bottom-2",
              "group-data-[side=bottom]/cxh:-top-2 group-data-[side=bottom]/cxh:rotate-[225deg]",
              alignment === "left" ? "left-6" : alignment === "right" ? "right-6" : "left-1/2 -translate-x-1/2",
              "max-md:hidden"
            )}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

// ─── ContextualHelpTitle ──────────────────────────────────────────────────────
// Compose as the first child of <ContextualHelp> for a bold panel heading.

function ContextualHelpTitle({ className, children, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4 className={cn("text-krds-body-md text-krds-foreground-bolder font-bold", className)} {...props}>
      {children}
    </h4>
  )
}

// ─── ContextualHelpLabel ──────────────────────────────────────────────────────
// Compose as a sibling before <ContextualHelp> (not inside it) for a trigger label.

function ContextualHelpLabel({ className, children, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-krds-foreground text-krds-body-sm", className)} {...props}>
      {children}
    </p>
  )
}

export { ContextualHelp, ContextualHelpTitle, ContextualHelpLabel }
export type { ContextualHelpProps }
