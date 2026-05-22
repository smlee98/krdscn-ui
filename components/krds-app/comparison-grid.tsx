/**
 * Visual-diff comparison grid — satisfies scripts/krds/visual-diff-vs-storybook.mjs
 *
 * The script navigates to `/?theme=light` and waits for `[data-krds-comparison-grid]`.
 * Each migrated component gets one <section> with an <h2>Phase N — Name</h2> heading.
 * The script extracts the name after "Phase N — " and matches it against its COMPONENT_MAP.
 *
 * Import source per phase:
 *   T-0.7  → KRDS direct (dispatcher not yet built)
 *   T-1.1+ → switch to dispatcher: @/components/ui/dynamic/<name>
 */

// T-1.1+: dispatcher import — routes to KRDS or shadcn per UISystem context.
import { Spinner } from "@/components/ui/dynamic/spinner";

export function ComparisonGrid() {
  return (
    <div data-krds-comparison-grid className="border-t px-8 py-10">
      <p className="text-muted-foreground mb-6 text-xs font-medium tracking-widest uppercase">
        Component comparison grid (dev)
      </p>

      {/* ── Phase 1 ─────────────────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="mb-4 text-base font-semibold">Phase 1 — Spinner</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Spinner size="small" aria-label="small 로딩 중" />
          <Spinner size="medium" aria-label="medium 로딩 중" />
          <Spinner size="large" aria-label="large 로딩 중" />
        </div>
      </section>
    </div>
  );
}
