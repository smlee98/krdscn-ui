// rsc:client
"use client";

/**
 * KRDS Resize — S/M/L font-scale toggle.
 *
 * R2 constraint: writes `--krds-font-scale` on the closest [data-krds-resize-scope]
 * ancestor element ONLY. MUST NOT mutate document.documentElement.style.fontSize.
 *
 * Consumer wraps both Resize and the text demo block in a parent with
 * data-krds-resize-scope, then applies:
 *   style={{ fontSize: "calc(1rem * var(--krds-font-scale, 1))" }}
 * on the text target.
 */

import * as React from "react";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

const SCALE_MAP = { S: 0.875, M: 1, L: 1.125 } as const;
export type ScaleKey = keyof typeof SCALE_MAP;

export interface ResizeProps {
  /** Initial active scale key (default: "M"). */
  defaultScale?: ScaleKey;
  /** Called when scale changes. */
  onScaleChange?: (scale: ScaleKey) => void;
  className?: string;
}

// ─── Resize ───────────────────────────────────────────────────────────────────

function Resize({ defaultScale = "M", onScaleChange, className }: ResizeProps) {
  const [active, setActive] = React.useState<ScaleKey>(defaultScale);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scope = el.closest("[data-krds-resize-scope]") as HTMLElement | null;
    if (scope) {
      scope.style.setProperty("--krds-font-scale", String(SCALE_MAP[active]));
    }
    // NOTE: document.documentElement.style.fontSize is intentionally NOT touched (R2).
  }, [active]);

  function handleClick(key: ScaleKey) {
    setActive(key);
    onScaleChange?.(key);
  }

  return (
    <div
      ref={ref}
      role="group"
      aria-label="글자 크기 조절"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border p-0.5",
        "border-krds-gray-20 bg-krds-gray-0",
        className
      )}
    >
      {(["S", "M", "L"] as ScaleKey[]).map((key) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={isActive}
            aria-label={`글자 크기 ${key}`}
            onClick={() => handleClick(key)}
            className={cn(
              "inline-flex h-7 w-8 items-center justify-center rounded text-sm font-medium",
              "transition-colors",
              "focus-visible:ring-2 focus-visible:outline-none",
              "focus-visible:ring-krds-primary-50 focus-visible:ring-offset-1",
              isActive ? "bg-krds-primary-50 text-white" : "text-krds-gray-70 hover:bg-krds-gray-5"
            )}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export { Resize };
