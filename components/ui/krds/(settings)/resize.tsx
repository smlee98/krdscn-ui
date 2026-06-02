// rsc:client
"use client";

import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type ResizeScale = "sm" | "md" | "lg" | "xlg" | "xxlg";

type ResizeProps = {
  value?: ResizeScale;
  defaultValue?: ResizeScale;
  onChange?: (scale: ResizeScale) => void;
  buttonText?: string;
  resetText?: string;
  labels?: Partial<Record<ResizeScale, string>>;
  className?: string;
};

const DEFAULT_LABELS: Record<ResizeScale, string> = {
  sm: "작게",
  md: "보통",
  lg: "조금 크게",
  xlg: "크게",
  xxlg: "가장 크게",
};

const SCALE_ORDER: ResizeScale[] = ["sm", "md", "lg", "xlg", "xxlg"];

// Container size (px) for the "가" preview icon
const ICON_CONTAINER_SIZE: Record<ResizeScale, number> = {
  sm: 22,
  md: 24,
  lg: 26,
  xlg: 28,
  xxlg: 30,
};

// Font size (px) for the "가" character inside the preview icon
const ICON_FONT_SIZE: Record<ResizeScale, number> = {
  sm: 13,
  md: 15,
  lg: 17,
  xlg: 19,
  xxlg: 21,
};

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

function IconViewMode({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.53346 7.3332C2.53346 7.19458 2.62839 6.88743 2.91565 6.45576C3.18861 6.04556 3.59305 5.58668 4.10154 5.15739C5.12375 4.2944 6.50621 3.59987 8.00013 3.59987C9.49405 3.59987 10.8765 4.2944 11.8987 5.15739C12.4072 5.58668 12.8116 6.04556 13.0846 6.45576C13.3719 6.88743 13.4668 7.19458 13.4668 7.3332C13.4668 7.41162 13.4328 7.56035 13.3089 7.77637C13.1623 8.03186 13.2506 8.3578 13.5061 8.50438C13.7616 8.65097 14.0875 8.56269 14.2341 8.3072C14.408 8.00415 14.5335 7.66823 14.5335 7.3332C14.5335 6.87183 14.2926 6.34565 13.9726 5.86482C13.6384 5.36251 13.1641 4.82972 12.5868 4.34235C11.4375 3.37201 9.81992 2.5332 8.00013 2.5332C6.18034 2.5332 4.5628 3.37201 3.41344 4.34235C2.83614 4.82972 2.3619 5.36251 2.02763 5.86482C1.70766 6.34565 1.4668 6.87183 1.4668 7.3332C1.4668 7.79458 1.70766 8.32076 2.02763 8.80159C2.3619 9.3039 2.83614 9.83668 3.41344 10.3241C4.5628 11.2944 6.18034 12.1332 8.00013 12.1332C8.29468 12.1332 8.53346 11.8944 8.53346 11.5999C8.53346 11.3053 8.29468 11.0665 8.00013 11.0665C6.50621 11.0665 5.12375 10.372 4.10154 9.50901C3.59305 9.07972 3.18861 8.62084 2.91565 8.21065C2.62839 7.77898 2.53346 7.47183 2.53346 7.3332ZM6.28346 7.3332C6.28346 6.45513 7.03131 5.70654 8.00013 5.70654C8.96895 5.70654 9.7168 6.45513 9.7168 7.3332C9.7168 8.21128 8.96895 8.95987 8.00013 8.95987C7.03131 8.95987 6.28346 8.21128 6.28346 7.3332ZM8.00013 4.63987C6.48367 4.63987 5.2168 5.82541 5.2168 7.3332C5.2168 8.841 6.48367 10.0265 8.00013 10.0265C9.51659 10.0265 10.7835 8.841 10.7835 7.3332C10.7835 5.82541 9.51659 4.63987 8.00013 4.63987ZM13.5122 9.51146V10.9873L13.8668 10.9873C14.0141 10.9873 14.1335 11.1067 14.1335 11.254V11.5833C14.1335 11.7306 14.0141 11.85 13.8668 11.85H13.5122V13.8662C13.5122 14.0135 13.3928 14.1329 13.2456 14.1329H12.7849C12.6377 14.1329 12.5183 14.0135 12.5183 13.8662V9.51146C12.5183 9.36418 12.6377 9.24479 12.7849 9.24479H13.2456C13.3928 9.24479 13.5122 9.36418 13.5122 9.51146ZM11.7772 11.8577C11.4505 12.4239 10.9406 12.9103 10.1964 13.295C10.0799 13.3552 9.9383 13.32 9.86188 13.2162L9.61261 12.8777C9.51372 12.7434 9.56209 12.5569 9.70371 12.4808C10.5962 12.0013 11.084 11.4024 11.2336 10.5721H10.0373C9.89003 10.5721 9.77064 10.4527 9.77064 10.3055V9.97613C9.77064 9.82885 9.89003 9.70946 10.0373 9.70946H11.993C12.1394 9.70946 12.2616 9.82874 12.258 9.9793C12.2419 10.6562 12.1034 11.2923 11.7772 11.8577ZM13.3789 9.51146C13.3789 9.43782 13.3192 9.37812 13.2456 9.37812H12.7849C12.7762 9.37812 12.7676 9.37897 12.7594 9.38057C12.7674 9.37905 12.7758 9.37826 12.7843 9.37826H13.2449C13.3185 9.37826 13.3782 9.43795 13.3782 9.51159V10.9874C13.3782 11.0611 13.4379 11.1208 13.5116 11.1208H13.8662C13.9398 11.1208 13.9995 11.1805 13.9995 11.2541V11.5834C13.9995 11.6483 13.9531 11.7024 13.8917 11.7143C13.9535 11.7026 14.0002 11.6484 14.0002 11.5833V11.254C14.0002 11.1803 13.9405 11.1206 13.8668 11.1206H13.5122C13.4386 11.1206 13.3789 11.0609 13.3789 10.9873V9.51146ZM13.3782 11.8501C13.3782 11.785 13.4249 11.7307 13.4867 11.7191C13.4253 11.731 13.3789 11.7851 13.3789 11.85V13.8662C13.3789 13.9314 13.3322 13.9856 13.2705 13.9973C13.3319 13.9853 13.3782 13.9313 13.3782 13.8664V11.8501ZM12.1247 9.97613C12.1265 9.90251 12.0666 9.8428 11.993 9.8428H10.0373C10.0283 9.8428 10.0196 9.84368 10.0111 9.84537C10.0194 9.84377 10.0279 9.84293 10.0366 9.84293H11.9923C12.066 9.84293 12.1258 9.90264 12.1241 9.97626C12.0926 11.2979 11.5838 12.4276 10.1346 13.1766C10.1235 13.1824 10.1119 13.1864 10.1001 13.1887C10.1121 13.1864 10.1239 13.1823 10.1352 13.1765C11.5845 12.4275 12.0933 11.2978 12.1247 9.97613Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconReset({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 12a8 8 0 1 0 2.5-5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
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
  const [internalValue, setInternalValue] = React.useState<ResizeScale>(defaultValue);
  const [open, setOpen] = React.useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const resolvedLabels: Record<ResizeScale, string> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  function handleSelect(scale: ResizeScale) {
    if (!isControlled) setInternalValue(scale);
    onChange?.(scale);
    setOpen(false);
  }

  function handleReset() {
    const resetValue = defaultValue;
    if (!isControlled) setInternalValue(resetValue);
    onChange?.(resetValue);
    setOpen(false);
  }

  return (
    <div
      data-slot="krds-resize"
      className={cn("relative inline-flex flex-col items-center", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={buttonText}
            aria-expanded={open}
            className={cn(
              "inline-flex h-6 items-center gap-0.5 rounded-[4px] px-0.5 transition-colors",
              "text-krds-foreground hover:bg-krds-surface-secondary-subtle data-[state=open]:bg-krds-surface-secondary-subtle",
              "focus:krds-focus-ring"
            )}
          >
            <IconViewMode className="size-4" />
            <span className="text-krds-body-sm">{buttonText}</span>
            <IconChevronDown className="size-4" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="center"
          sideOffset={8}
          className={cn(
            "border-none bg-transparent p-0 shadow-none",
            "drop-shadow-[0_0_1px_rgba(0,0,0,0.05)] drop-shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
          )}
        >
          <div className="relative min-w-[220px] rounded-[8px] border border-krds-border-light bg-krds-surface p-2">
            {/* Caret */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-[4px] left-1/2 -translate-x-1/2 block h-2 w-2 rotate-45 border border-krds-border-light border-b-transparent border-r-transparent bg-krds-surface"
            />

            {/* Options */}
            <div className="flex flex-col">
              {SCALE_ORDER.map((scale) => {
                const isSelected = currentValue === scale;
                const containerSize = ICON_CONTAINER_SIZE[scale];
                const charFontSize = ICON_FONT_SIZE[scale];

                return (
                  <button
                    key={scale}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(scale)}
                    className={cn(
                      "flex h-12 w-full items-center gap-2 rounded-[6px] px-4 transition-colors focus:krds-focus-ring",
                      isSelected
                        ? "bg-krds-surface-secondary-subtle"
                        : "bg-transparent hover:bg-krds-surface-secondary-subtle"
                    )}
                  >
                    {/* "가" preview icon */}
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center justify-center rounded-[4px]",
                        isSelected
                          ? "bg-krds-secondary-bold"
                          : "border border-krds-border-light bg-krds-surface"
                      )}
                      style={{ width: containerSize, height: containerSize }}
                    >
                      <span
                        aria-hidden
                        style={{
                          fontSize: charFontSize,
                          color: isSelected ? "#ffffff" : "#1e2124",
                          lineHeight: 1,
                        }}
                      >
                        가
                      </span>
                    </span>

                    {/* Label */}
                    <span
                      className={cn(
                        "text-krds-body-md",
                        isSelected
                          ? "font-bold text-krds-foreground-secondary"
                          : "font-normal text-krds-foreground"
                      )}
                    >
                      {resolvedLabels[scale]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Divider + Reset */}
            <div className="flex h-12 items-center justify-center border-t border-krds-border-light">
              <button
                type="button"
                onClick={handleReset}
                className={cn(
                  "inline-flex h-8 items-center gap-1 rounded-[4px] px-0.5",
                  "hover:bg-krds-surface-secondary-subtle transition-colors",
                  "focus:krds-focus-ring"
                )}
              >
                <IconReset className="size-5" />
                <span className="text-krds-body-md text-krds-foreground">{resetText}</span>
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { Resize };
export type { ResizeScale, ResizeProps };
