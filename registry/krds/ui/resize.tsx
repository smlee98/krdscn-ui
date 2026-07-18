// rsc:client
"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type ResizeScale = "sm" | "md" | "lg" | "xlg" | "xxlg"

type ResizeProps = {
  value?: ResizeScale
  defaultValue?: ResizeScale
  onChange?: (scale: ResizeScale) => void
  buttonText?: string
  resetText?: string
  labels?: Partial<Record<ResizeScale, string>>
  className?: string
}

const DEFAULT_LABELS: Record<ResizeScale, string> = {
  sm: "작게",
  md: "보통",
  lg: "조금 크게",
  xlg: "크게",
  xxlg: "가장크게",
}

const SCALE_ORDER: ResizeScale[] = ["sm", "md", "lg", "xlg", "xxlg"]

// Container size (px) for the "가" preview icon
const ICON_CONTAINER_SIZE: Record<ResizeScale, number> = {
  sm: 22,
  md: 24,
  lg: 26,
  xlg: 28,
  xxlg: 30,
}

// Font size (px) for the "가" character inside the preview icon
const ICON_FONT_SIZE: Record<ResizeScale, number> = {
  sm: 13,
  md: 15,
  lg: 17,
  xlg: 19,
  xxlg: 21,
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconReset({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 12a8 8 0 1 0 2.5-5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Resize ───────────────────────────────────────────────────────────────────

function Resize({
  value,
  defaultValue = "md",
  onChange,
  buttonText = "화면크기",
  resetText = "초기화",
  labels,
  className,
}: ResizeProps) {
  const [internalValue, setInternalValue] = React.useState<ResizeScale>(defaultValue)
  const [open, setOpen] = React.useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const resolvedLabels: Record<ResizeScale, string> = {
    ...DEFAULT_LABELS,
    ...labels,
  }

  function handleSelect(scale: ResizeScale) {
    if (!isControlled) setInternalValue(scale)
    onChange?.(scale)
    setOpen(false)
  }

  function handleReset() {
    const resetValue = defaultValue
    if (!isControlled) setInternalValue(resetValue)
    onChange?.(resetValue)
    setOpen(false)
  }

  return (
    <div data-slot="krds-resize" className={cn("relative inline-flex flex-col items-center", className)}>
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            aria-label={buttonText}
            aria-expanded={open}
            className={cn(
              "inline-flex h-6 items-center gap-0.5 rounded-[4px] px-0.5 transition-colors",
              "text-krds-foreground hover:bg-krds-surface-secondary-subtle data-[state=open]:bg-krds-surface-secondary-subtle",
              "focus-visible:krds-focus-ring"
            )}
          >
            {/* KRDS resize trigger (resize.html:3) is text + toggle chevron only — no leading
                icon. The previous "eye" glyph here was a project invention. */}
            <span className="text-krds-body-sm">{buttonText}</span>
            <IconChevronDown className="size-4" />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="center"
            sideOffset={16}
            className={cn(
              // KRDS .drop-menu z-index:6 (_dropdown.scss:36) — 페이지 스태킹 컨텍스트 위로. 프로젝트 오버레이 관례 z-50 사용.
              "z-50 border-none bg-transparent p-0 outline-hidden",
              // KRDS --krds-dropdown--menu-color-alpha-shadow: 0 0 0.2rem shadow1, 0 0.4rem 0.8rem shadow2 (_dropdown.scss:17)
              "shadow-[0_0_2px_0_rgba(0,0,0,0.05),0_4px_8px_0_rgba(0,0,0,0.08)]",
              "dark:shadow-[0_0_2px_0_rgba(0,0,0,0.12),0_4px_8px_0_rgba(0,0,0,0.2)]",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            )}
          >
            <div className="border-krds-border-light bg-krds-surface relative min-w-[150px] rounded-[8px] border p-2">
              {/* Caret */}
              <span
                aria-hidden
                className="border-krds-border-light bg-krds-surface pointer-events-none absolute -top-[6px] left-1/2 block h-3 w-3 -translate-x-1/2 rotate-45 border border-r-transparent border-b-transparent"
              />

              {/* Options */}
              <div className="flex flex-col">
                {SCALE_ORDER.map((scale) => {
                  const isSelected = currentValue === scale
                  const containerSize = ICON_CONTAINER_SIZE[scale]
                  const charFontSize = ICON_FONT_SIZE[scale]

                  return (
                    <button
                      key={scale}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(scale)}
                      className={cn(
                        "focus-visible:krds-focus-ring flex h-12 w-full items-center gap-2 rounded-[6px] px-4 transition-colors",
                        isSelected
                          ? "bg-krds-surface-secondary-subtle"
                          : "hover:bg-krds-surface-secondary-subtle active:bg-krds-surface-secondary-pressed bg-transparent"
                      )}
                    >
                      {/* "가" preview icon */}
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center justify-center rounded-[4px]",
                          isSelected ? "bg-krds-secondary-bold" : "border-krds-border bg-krds-surface border"
                        )}
                        style={{ width: containerSize, height: containerSize }}
                      >
                        <span
                          aria-hidden
                          // selected "가" sits on bg-krds-secondary-bold (saturated blue in
                          // both modes) → mode-fixed white; unselected sits on bg-krds-surface
                          // (white→black) so it must auto-switch via the foreground token.
                          className={isSelected ? "text-krds-gray-0" : "text-krds-foreground"}
                          style={{ fontSize: charFontSize, lineHeight: 1 }}
                        >
                          가
                        </span>
                      </span>

                      {/* Label */}
                      <span
                        className={cn(
                          "text-krds-body-md",
                          isSelected ? "text-krds-foreground-secondary font-bold" : "text-krds-foreground font-normal"
                        )}
                      >
                        {resolvedLabels[scale]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Divider + Reset */}
              <div className="border-krds-border-light flex h-12 items-center justify-center border-t">
                <button
                  type="button"
                  onClick={handleReset}
                  className={cn(
                    "inline-flex h-8 items-center gap-1 rounded-[4px] px-0.5",
                    "hover:bg-krds-surface-secondary-subtle transition-colors",
                    "focus-visible:krds-focus-ring"
                  )}
                >
                  <IconReset className="size-5" />
                  <span className="text-krds-body-md text-krds-foreground">{resetText}</span>
                </button>
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  )
}

export { Resize }
export type { ResizeScale, ResizeProps }
